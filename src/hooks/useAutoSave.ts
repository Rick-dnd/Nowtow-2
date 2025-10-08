import { useEffect, useRef, useState, useCallback } from 'react';

interface AutoSaveOptions {
  key: string;
  delay?: number; // milliseconds
  enabled?: boolean;
}

interface AutoSaveReturn {
  lastSaved: Date | null;
  isSaving: boolean;
  clearSaved: () => void;
}

export function useAutoSave<T>(
  data: T,
  { key, delay = 30000, enabled = true }: AutoSaveOptions
): AutoSaveReturn {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const isInitialMount = useRef<boolean>(true);

  useEffect(() => {
    // Skip saving on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (!enabled || typeof window === 'undefined') return;

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for debounced save
    timeoutRef.current = setTimeout(() => {
      setIsSaving(true);

      try {
        localStorage.setItem(key, JSON.stringify(data));
        setLastSaved(new Date());
      } catch (error) {
        console.error('Failed to auto-save:', error);
      } finally {
        setIsSaving(false);
      }
    }, delay);

    return (): void => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, key, delay, enabled]);

  // Save on visibility change (tab switch/close)
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const handleVisibilityChange = (): void => {
      if (document.hidden && !isInitialMount.current) {
        try {
          localStorage.setItem(key, JSON.stringify(data));
          setLastSaved(new Date());
        } catch (error) {
          console.error('Failed to save on visibility change:', error);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return (): void => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [data, key, enabled]);

  const clearSaved = useCallback((): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
    setLastSaved(null);
  }, [key]);

  return { lastSaved, isSaving, clearSaved };
}

export function loadAutoSave<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;

  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to load auto-save:', error);
    return null;
  }
}
