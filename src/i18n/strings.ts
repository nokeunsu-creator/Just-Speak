export type Lang = 'ko' | 'en';

export const STR = {
  appTitle: { ko: 'Just-Speak', en: 'Just-Speak' },
  appTagline: { ko: '상황별 영어 쉐도잉', en: 'English shadowing by scene' },

  tabLearn: { ko: '📚 학습', en: '📚 Learn' },
  tabFavorites: { ko: '⭐ 즐겨찾기', en: '⭐ Favorites' },
  tabSettings: { ko: '⚙️ 설정', en: '⚙️ Settings' },

  listHeading: { ko: '상황별 영어 쉐도잉', en: 'English shadowing by scene' },
  listIntro: {
    ko: '따라 말하면서 입에 익혀보세요. 카드를 탭해 학습을 시작합니다.',
    en: 'Practice by repeating out loud. Tap a card to start.',
  },
  searchPlaceholder: { ko: '카테고리 또는 영어 표현 검색...', en: 'Search categories or English...' },
  searchEmpty: { ko: '검색 결과가 없어요.', en: 'No results.' },
  searchClear: { ko: '검색 지우기', en: 'Clear search' },

  groupDaily: { ko: '일상', en: 'Daily life' },
  groupWork: { ko: '업무', en: 'Work' },
  groupTravel: { ko: '이동', en: 'Travel' },
  groupLeisure: { ko: '여가', en: 'Leisure' },
  groupLife: { ko: '생활', en: 'Living' },

  levelBeginner: { ko: '초급', en: 'Beginner' },
  levelIntermediate: { ko: '중급', en: 'Intermediate' },
  levelAdvanced: { ko: '고급', en: 'Advanced' },

  back: { ko: '← 뒤로', en: '← Back' },
  listenStart: { ko: '▶ Listen', en: '▶ Listen' },
  listenStop: { ko: '⏸ 정지', en: '⏸ Stop' },
  listenLine: { ko: '🔊 듣기', en: '🔊 Listen' },
  tapForKorean: { ko: '탭하면 해석이 보입니다', en: 'Tap to see translation' },
  guideTitle: { ko: '학습 가이드', en: 'Learning guide' },
  guideExpand: { ko: '펼치기 ▾', en: 'Expand ▾' },
  guideCollapse: { ko: '접기 ▴', en: 'Collapse ▴' },
  guideSituation: { ko: '🎬 어떤 상황인가요?', en: '🎬 What is this scene?' },
  guideKeyPhrases: { ko: '⭐ 핵심 표현', en: '⭐ Key phrases' },
  guideSteps: { ko: '🪜 학습 4단계 (쉐도잉)', en: '🪜 4-step shadowing' },
  guideGrammar: { ko: '📝 문법 포인트', en: '📝 Grammar points' },

  favoriteAdd: { ko: '⭐ 즐겨찾기 추가', en: '⭐ Add to favorites' },
  favoriteRemove: { ko: '⭐ 즐겨찾기 해제', en: '⭐ Remove favorite' },

  recordStart: { ko: '🎤 녹음', en: '🎤 Record' },
  recordStop: { ko: '⏹ 정지', en: '⏹ Stop' },
  recordPlay: { ko: '▶ 내 녹음', en: '▶ My voice' },
  recordCompare: { ko: '🔁 비교 재생', en: '🔁 Compare' },
  recordPermissionDenied: {
    ko: '마이크 권한이 거부되었습니다. 브라우저 설정에서 허용해 주세요.',
    en: 'Microphone permission denied. Please allow in browser settings.',
  },

  welcomeTitle: { ko: 'Just-Speak에 오신 걸 환영해요 👋', en: 'Welcome to Just-Speak 👋' },
  welcomeSubtitle: {
    ko: '25개 실전 상황으로 영어 회화를 입에 익혀보세요.',
    en: 'Master English with 25 real-life scenes.',
  },
  welcomeStepsHeading: { ko: '🪜 학습 4단계 (쉐도잉)', en: '🪜 4-step shadowing' },
  welcomeBeginnerHeading: { ko: '🌱 처음이라면', en: '🌱 Beginner picks' },
  welcomeBeginnerHint: {
    ko: '가벼운 일상 회화부터 시작해보세요.',
    en: 'Start with these easy everyday scenes.',
  },
  welcomeStart: { ko: '시작하기', en: 'Get started' },

  favoritesTitle: { ko: '⭐ 즐겨찾기', en: '⭐ Favorites' },
  favoritesEmpty: {
    ko: '아직 즐겨찾기한 문장이 없어요. 학습 화면에서 ⭐를 눌러 모아보세요.',
    en: 'No favorites yet. Tap ⭐ in the study screen to collect.',
  },

  settingsTitle: { ko: '설정', en: 'Settings' },
  settingsStats: { ko: '학습 통계', en: 'Stats' },
  settingsTotal: { ko: '학습한 문장', en: 'Sentences learned' },
  settingsFavorites: { ko: '즐겨찾기', en: 'Favorites' },
  settingsStreak: { ko: '연속 학습 일수', en: 'Streak' },
  settingsCategories: { ko: '카테고리', en: 'Categories' },
  settingsVoice: { ko: '음성', en: 'Voice' },
  settingsRate: { ko: '재생 속도', en: 'Rate' },
  settingsPitch: { ko: '톤', en: 'Pitch' },
  settingsGap: { ko: '줄 간 간격', en: 'Line gap' },
  settingsDisplay: { ko: '표시', en: 'Display' },
  settingsDark: { ko: '다크 모드', en: 'Dark mode' },
  settingsLanguage: { ko: '언어', en: 'Language' },
  settingsLanguageKo: { ko: '한국어', en: '한국어' },
  settingsLanguageEn: { ko: 'English', en: 'English' },
  settingsReset: { ko: '데이터 초기화', en: 'Reset data' },
  settingsResetWarning: {
    ko: '진도와 설정이 모두 삭제됩니다.',
    en: 'All progress and settings will be deleted.',
  },
  settingsResetConfirm: {
    ko: '정말 모든 학습 데이터를 초기화할까요?',
    en: 'Really reset all learning data?',
  },
  settingsResetButton: { ko: '초기화', en: 'Reset' },
  settingsActivity: { ko: '최근 7일 활동', en: 'Last 7 days' },
  daysUnit: { ko: '일', en: 'days' },
  countUnit: { ko: '개', en: '' },
} as const;

export type StringKey = keyof typeof STR;

export function t(key: StringKey, lang: Lang): string {
  return STR[key][lang];
}
