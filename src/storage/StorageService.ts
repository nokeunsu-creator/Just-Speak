import type { Settings } from '../models/types';
import { DEFAULT_SETTINGS } from '../models/types';

const KEY_PROGRESS = '@js:progress';
const KEY_UNLOCKED = '@js:unlocked';
const KEY_SETTINGS = '@js:settings';
const KEY_LAST_VISIT = '@js:lastVisit';
const KEY_ONBOARDED = '@js:onboarded';

function safeGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeSet(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota / privacy mode → ignore */
  }
}

export const StorageService = {
  loadProgress(): Record<string, number[]> {
    return safeGet<Record<string, number[]>>(KEY_PROGRESS, {});
  },
  saveProgress(progress: Record<string, number[]>): void {
    safeSet(KEY_PROGRESS, progress);
  },

  loadUnlocked(): string[] {
    return safeGet<string[]>(KEY_UNLOCKED, []);
  },
  saveUnlocked(unlocked: string[]): void {
    safeSet(KEY_UNLOCKED, unlocked);
  },

  loadSettings(): Settings {
    const stored = safeGet<Partial<Settings>>(KEY_SETTINGS, {});
    return { ...DEFAULT_SETTINGS, ...stored };
  },
  saveSettings(settings: Settings): void {
    safeSet(KEY_SETTINGS, settings);
  },

  loadLastVisit(): number {
    return safeGet<number>(KEY_LAST_VISIT, 0);
  },
  saveLastVisit(ts: number): void {
    safeSet(KEY_LAST_VISIT, ts);
  },

  loadOnboarded(): boolean {
    return safeGet<boolean>(KEY_ONBOARDED, false);
  },
  saveOnboarded(value: boolean): void {
    safeSet(KEY_ONBOARDED, value);
  },

  clearAll(): void {
    [KEY_PROGRESS, KEY_UNLOCKED, KEY_SETTINGS, KEY_LAST_VISIT, KEY_ONBOARDED].forEach((k) => {
      try { localStorage.removeItem(k); } catch { /* ignore */ }
    });
  },
};

let saveTimer: ReturnType<typeof setTimeout> | null = null;

export function debouncedSave(fn: () => void, delay = 300): void {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(fn, delay);
}

export function flushDebouncedSave(): void {
  if (saveTimer) {
    clearTimeout(saveTimer);
    saveTimer = null;
  }
}
