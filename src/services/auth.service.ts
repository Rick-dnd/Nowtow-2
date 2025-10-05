import { createClient } from '@/lib/supabase/client';
import type { User, Session, AuthError } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

type Profile = Database['public']['Tables']['profiles']['Row'];
type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export interface SignUpData {
  email: string;
  password: string;
  fullName?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User | null;
  session: Session | null;
  error: AuthError | null;
}

export const authService = {
  async signUp(data: SignUpData): Promise<AuthResponse> {
    const supabase = createClient();
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
        },
      },
    });

    if (error) {
      return { user: null, session: null, error };
    }

    if (authData.user && data.fullName) {
      await supabase
        .from('profiles')
        .update({ full_name: data.fullName })
        .eq('id', authData.user.id);
    }

    return {
      user: authData.user,
      session: authData.session,
      error: null,
    };
  },

  async signIn(data: SignInData): Promise<AuthResponse> {
    const supabase = createClient();
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    return {
      user: authData.user,
      session: authData.session,
      error,
    };
  },

  async signOut(): Promise<{ error: AuthError | null }> {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  async getCurrentUser(): Promise<User | null> {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  async getCurrentSession(): Promise<Session | null> {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },

  async getProfile(userId: string): Promise<Profile | null> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to fetch profile: ${error.message}`);
    }

    return data;
  },

  async updateProfile(userId: string, updates: ProfileUpdate): Promise<Profile> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update profile: ${error.message}`);
    }

    return data;
  },

  async resetPassword(email: string): Promise<{ error: AuthError | null }> {
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback`,
    });
    return { error };
  },

  async updatePassword(newPassword: string): Promise<{ error: AuthError | null }> {
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    return { error };
  },

  onAuthStateChange(callback: (user: User | null) => void): () => void {
    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      callback(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  },
};
