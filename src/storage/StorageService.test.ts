import { describe, it, expect, beforeEach } from 'vitest';
import { StorageService } from './StorageService';
import { DEFAULT_SETTINGS } from '../models/types';

describe('StorageService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns empty progress by default', () => {
    expect(StorageService.loadProgress()).toEqual({});
  });

  it('saves and loads progress', () => {
    StorageService.saveProgress({ '공항': [1, 2, 3] });
    expect(StorageService.loadProgress()).toEqual({ '공항': [1, 2, 3] });
  });

  it('returns empty unlocked by default', () => {
    expect(StorageService.loadUnlocked()).toEqual([]);
  });

  it('saves and loads unlocked categories', () => {
    StorageService.saveUnlocked(['전화', '면접']);
    expect(StorageService.loadUnlocked()).toEqual(['전화', '면접']);
  });

  it('returns default settings when nothing saved', () => {
    expect(StorageService.loadSettings()).toEqual(DEFAULT_SETTINGS);
  });

  it('merges partial saved settings with defaults', () => {
    localStorage.setItem('@js:settings', JSON.stringify({ ttsRate: 1.2 }));
    const loaded = StorageService.loadSettings();
    expect(loaded.ttsRate).toBe(1.2);
    expect(loaded.dark).toBe(DEFAULT_SETTINGS.dark);
  });

  it('handles corrupted JSON gracefully', () => {
    localStorage.setItem('@js:progress', '{not valid json');
    expect(StorageService.loadProgress()).toEqual({});
  });

  it('clears all keys', () => {
    StorageService.saveProgress({ '공항': [1] });
    StorageService.saveUnlocked(['전화']);
    StorageService.clearAll();
    expect(StorageService.loadProgress()).toEqual({});
    expect(StorageService.loadUnlocked()).toEqual([]);
  });

  it('persists onboarded flag', () => {
    expect(StorageService.loadOnboarded()).toBe(false);
    StorageService.saveOnboarded(true);
    expect(StorageService.loadOnboarded()).toBe(true);
  });
});
