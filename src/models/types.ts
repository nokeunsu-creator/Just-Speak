export type Speaker = 'A' | 'B';

export interface Dialogue {
  id: number;
  category: string;
  speaker: Speaker;
  english: string;
  korean: string;
}

export interface CategoryMeta {
  id: string;
  name: string;
  emoji: string;
  locked: boolean;
  description: string;
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
  unlocked: string[];
  settings: Settings;
  lastVisit: number;
  onboarded: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  ttsRate: 0.95,
  ttsPitch: 1.0,
  gapMs: 600,
  dark: false,
};

export const CATEGORIES: CategoryMeta[] = [
  { id: '공항', name: '공항', emoji: '✈️', locked: false, description: '입국 심사·탑승 게이트' },
  { id: '식당', name: '식당', emoji: '🍽️', locked: false, description: '주문·결제·메뉴 추천' },
  { id: '호텔', name: '호텔', emoji: '🏨', locked: false, description: '체크인·룸서비스' },
  { id: '병원', name: '병원', emoji: '🏥', locked: false, description: '증상 설명·처방' },
  { id: '쇼핑', name: '쇼핑', emoji: '🛍️', locked: false, description: '사이즈·반품·결제' },
  { id: '길묻기', name: '길묻기', emoji: '🧭', locked: false, description: '방향·랜드마크·교통' },
  { id: '비즈니스 미팅', name: '비즈니스 미팅', emoji: '💼', locked: true, description: '실적·전략·예산' },
  { id: '전화', name: '전화 응대', emoji: '📞', locked: true, description: '메시지 전달·약속' },
  { id: '면접', name: '영어 면접', emoji: '🎤', locked: true, description: '자기소개·강약점' },
  { id: '택시', name: '택시·교통', emoji: '🚖', locked: true, description: '경로·요금·영수증' },
];
