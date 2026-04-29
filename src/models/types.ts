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
  settings: Settings;
  onboarded: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  ttsRate: 0.95,
  ttsPitch: 1.0,
  gapMs: 600,
  dark: false,
};

export const CATEGORIES: CategoryMeta[] = [
  { id: '공항', name: '공항', emoji: '✈️', description: '입국 심사·탑승 게이트' },
  { id: '식당', name: '식당', emoji: '🍽️', description: '주문·결제·메뉴 추천' },
  { id: '호텔', name: '호텔', emoji: '🏨', description: '체크인·룸서비스' },
  { id: '병원', name: '병원', emoji: '🏥', description: '증상 설명·처방' },
  { id: '쇼핑', name: '쇼핑', emoji: '🛍️', description: '사이즈·반품·결제' },
  { id: '길묻기', name: '길묻기', emoji: '🧭', description: '방향·랜드마크·교통' },
  { id: '카페', name: '카페', emoji: '☕', description: '음료 주문·매장 안내' },
  { id: '자기소개', name: '자기소개', emoji: '🤝', description: '스몰토크·취미 공유' },
  { id: '비즈니스 미팅', name: '비즈니스 미팅', emoji: '💼', description: '실적·전략·예산' },
  { id: '전화', name: '전화 응대', emoji: '📞', description: '메시지 전달·약속' },
  { id: '면접', name: '영어 면접', emoji: '🎤', description: '자기소개·강약점' },
  { id: '택시', name: '택시·교통', emoji: '🚖', description: '경로·요금·영수증' },
  { id: '영화관', name: '영화관', emoji: '🎬', description: '예매·좌석·상영관' },
  { id: '긴급상황', name: '긴급상황', emoji: '🚨', description: '분실·도난·신고' },
  { id: '은행', name: '은행·환전', emoji: '🏦', description: '환전·계좌 개설' },
];
