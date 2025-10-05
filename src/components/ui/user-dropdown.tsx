'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Icon } from '@iconify/react';
import type { User } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface MenuItem {
  icon: string;
  label: string;
  action: string;
  iconClass?: string;
  badge?: { text: string; className: string };
  rightIcon?: string;
  showAvatar?: boolean;
}

interface StatusItem {
  value: string;
  icon: string;
  label: string;
}

interface UserDropdownProps {
  user: User;
  profile: Profile | null;
  onAction: (action: string) => void;
  onStatusChange?: (status: string) => void;
  selectedStatus?: string;
  promoDiscount?: string;
}

const MENU_ITEMS: {
  status: StatusItem[];
  profile: MenuItem[];
  premium: MenuItem[];
  support: MenuItem[];
  account: MenuItem[];
} = {
  status: [
    { value: 'focus', icon: 'solar:emoji-funny-circle-line-duotone', label: 'Fokussiert' },
    { value: 'offline', icon: 'solar:moon-sleep-line-duotone', label: 'Offline erscheinen' },
  ],
  profile: [
    { icon: 'solar:user-circle-line-duotone', label: 'Dein Profil', action: 'profile' },
    { icon: 'solar:bookmark-line-duotone', label: 'Gespeichert', action: 'saved' },
    { icon: 'solar:settings-line-duotone', label: 'Einstellungen', action: 'settings' },
    { icon: 'solar:bell-line-duotone', label: 'Benachrichtigungen', action: 'notifications' },
  ],
  premium: [
    {
      icon: 'solar:star-bold',
      label: 'Upgrade zu Pro',
      action: 'upgrade',
      iconClass: 'text-amber-600',
      badge: { text: '20% off', className: 'bg-amber-600 text-white text-[11px]' },
    },
    { icon: 'solar:gift-line-duotone', label: 'Empfehlungen', action: 'referrals' },
  ],
  support: [
    { icon: 'solar:download-line-duotone', label: 'App herunterladen', action: 'download' },
    {
      icon: 'solar:letter-unread-line-duotone',
      label: 'Was ist neu?',
      action: 'whats-new',
      rightIcon: 'solar:square-top-down-line-duotone',
    },
    {
      icon: 'solar:question-circle-line-duotone',
      label: 'Hilfe bekommen?',
      action: 'help',
      rightIcon: 'solar:square-top-down-line-duotone',
    },
  ],
  account: [
    {
      icon: 'solar:users-group-rounded-bold-duotone',
      label: 'Konto wechseln',
      action: 'switch',
      showAvatar: false,
    },
    { icon: 'solar:logout-2-bold-duotone', label: 'Abmelden', action: 'logout' },
  ],
};

export function UserDropdown({
  user,
  profile,
  onAction,
  onStatusChange = (): void => {},
  selectedStatus = 'online',
  promoDiscount = '20% off',
}: UserDropdownProps): React.ReactElement {
  // Extract user data with fallbacks
  const fullName = profile?.full_name ?? user.email?.split('@')[0] ?? 'Benutzer';
  const username = profile?.username ?? `@${user.email?.split('@')[0] ?? 'user'}`;
  const avatarUrl = profile?.avatar_url ?? '';
  const initials = fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  const userStatus = 'online'; // TODO: Integrate with Supabase Realtime Presence

  const renderMenuItem = (item: MenuItem, index: number): React.ReactElement => (
    <DropdownMenuItem
      key={index}
      className={cn(
        item.badge ?? item.showAvatar ?? item.rightIcon ? 'justify-between' : '',
        'p-2 rounded-lg cursor-pointer'
      )}
      onClick={(): void => onAction(item.action)}
    >
      <span className="flex items-center gap-1.5 font-medium">
        <Icon
          icon={item.icon}
          className={`size-5 ${item.iconClass ?? 'text-gray-500 dark:text-gray-400'}`}
        />
        {item.label}
      </span>
      {item.badge !== undefined && (
        <Badge className={item.badge.className}>{promoDiscount ?? item.badge.text}</Badge>
      )}
      {item.rightIcon !== undefined && (
        <Icon icon={item.rightIcon} className="size-4 text-gray-500 dark:text-gray-400" />
      )}
      {item.showAvatar && (
        <Avatar className="cursor-pointer size-6 shadow border border-white dark:border-gray-700">
          <AvatarImage src={avatarUrl} alt={fullName} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      )}
    </DropdownMenuItem>
  );

  const getStatusColor = (status: string): string => {
    const colors: Record<string, string> = {
      online:
        'text-green-600 bg-green-100 border-green-300 dark:text-green-400 dark:bg-green-900/30 dark:border-green-500/50',
      offline:
        'text-gray-600 bg-gray-100 border-gray-300 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600',
      busy: 'text-red-600 bg-red-100 border-red-300 dark:text-red-400 dark:bg-red-900/30 dark:border-red-500/50',
    };
    const color = colors[status.toLowerCase()];
    return color ?? colors.online ?? '';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer size-10 border border-white dark:border-gray-700">
          <AvatarImage src={avatarUrl} alt={fullName} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="no-scrollbar w-[310px] rounded-2xl bg-gray-50 dark:bg-black/90 p-0"
        align="end"
      >
        <section className="bg-white dark:bg-gray-100/10 backdrop-blur-lg rounded-2xl p-1 shadow border border-gray-200 dark:border-gray-700/20">
          <div className="flex items-center p-2">
            <div className="flex-1 flex items-center gap-2">
              <Avatar className="cursor-pointer size-10 border border-white dark:border-gray-700">
                <AvatarImage src={avatarUrl} alt={fullName} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                  {fullName}
                </h3>
                <p className="text-muted-foreground text-xs">{username}</p>
              </div>
            </div>
            <Badge
              className={`${getStatusColor(userStatus)} border-[0.5px] text-[11px] rounded-sm capitalize`}
            >
              {userStatus}
            </Badge>
          </div>

          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="cursor-pointer p-2 rounded-lg">
                <span className="flex items-center gap-1.5 font-medium text-gray-500 dark:text-gray-400">
                  <Icon
                    icon="solar:smile-circle-line-duotone"
                    className="size-5 text-gray-500 dark:text-gray-400"
                  />
                  Status aktualisieren
                </span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="bg-white dark:bg-white/10 backdrop-blur-lg">
                  <DropdownMenuRadioGroup value={selectedStatus} onValueChange={onStatusChange}>
                    {MENU_ITEMS.status.map(
                      (status, index): React.ReactElement => (
                        <DropdownMenuRadioItem className="gap-2" key={index} value={status.value}>
                          <Icon
                            icon={status.icon}
                            className="size-5 text-gray-500 dark:text-gray-400"
                          />
                          {status.label}
                        </DropdownMenuRadioItem>
                      )
                    )}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuGroup>{MENU_ITEMS.profile.map(renderMenuItem)}</DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuGroup>{MENU_ITEMS.premium.map(renderMenuItem)}</DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuGroup>{MENU_ITEMS.support.map(renderMenuItem)}</DropdownMenuGroup>
        </section>

        <section className="mt-1 p-1 rounded-2xl">
          <DropdownMenuGroup>{MENU_ITEMS.account.map(renderMenuItem)}</DropdownMenuGroup>
        </section>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserDropdown;
