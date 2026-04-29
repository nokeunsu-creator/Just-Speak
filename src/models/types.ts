export type Speaker = 'A' | 'B';

export interface Dialogue {
  id: number;
  category: string;
  speaker: Speaker;
  english: string;
  korean: string;
}

export interface KeyPhrase {
  en: string;
  ko: string;
}

export interface CategoryMeta {
  id: string;
  name: string;
  emoji: string;
  description: string;
  situation: string;
  keyPhrases: KeyPhrase[];
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
}

export type Tab = 'list' | 'study' | 'settings';

export interface AppState {
  tab: Tab;
  currentCategory: string | null;
  progress: Record<string, number[]>;
  settings: Settings;
  onboarded: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  ttsRate: 0.95,
  ttsPitch: 1.0,
  gapMs: 600,
  dark: false,
};

export { CATEGORIES, LEARNING_STEPS, BEGINNER_PICKS } from '../data/categories';
