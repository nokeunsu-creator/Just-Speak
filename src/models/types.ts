export type Speaker = 'A' | 'B';

export interface DialogueTip {
  word: string;
  meaning: string;
}

export interface Dialogue {
  id: number;
  category: string;
  speaker: Speaker;
  english: string;
  korean: string;
  tip?: DialogueTip;
}

export interface KeyPhrase {
  en: string;
  ko: string;
}

export interface GrammarNote {
  pattern: string;
  desc: string;
  examples: string[];
}

export type CategoryLevel = 'beginner' | 'intermediate' | 'advanced';
export type CategoryGroup = '일상' | '업무' | '이동' | '여가' | '생활';

export interface CategoryMeta {
  id: string;
  name: string;
  emoji: string;
  description: string;
  situation: string;
  keyPhrases: KeyPhrase[];
  level: CategoryLevel;
  group: CategoryGroup;
  grammarNotes: GrammarNote[];
}

export interface LearningStep {
  num: number;
  title: string;
  desc: string;
}

export interface Settings {
  ttsRate: number;
  ttsPitch: number;
  gapMs: number;
  dark: boolean;
  language: 'ko' | 'en';
}

export type Tab = 'list' | 'study' | 'settings' | 'favorites';

export interface DailyStats {
  date: string;        // YYYY-MM-DD (UTC)
  count: number;       // dialogues marked viewed that day
}

export interface AppState {
  tab: Tab;
  currentCategory: string | null;
  search: string;
  progress: Record<string, number[]>;
  favorites: number[];
  dailyStats: DailyStats[];
  settings: Settings;
  onboarded: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  ttsRate: 0.95,
  ttsPitch: 1.0,
  gapMs: 600,
  dark: false,
  language: 'ko',
};

export { CATEGORIES, LEARNING_STEPS, BEGINNER_PICKS } from '../data/categories';
