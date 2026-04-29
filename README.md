# Just-Speak — 상황별 영어 쉐도잉

> 공항·식당·호텔 등 **25가지 실전 상황 × 20문장 = 500개 대화**를 따라말하기로 익히는 영어 회화 PWA.

🌐 **Live**: https://just-speak-blue.vercel.app

---

## ✨ 주요 기능

- **25가지 상황별 카테고리** — 일상·업무·이동·여가·생활 5그룹 / 초·중·고급 난이도
- **TTS 쉐도잉** — Web Speech API로 한 줄씩 듣고 따라 말하기, 전체 자동 재생(▶ Listen)
- **카테고리별 학습 가이드** — 상황 설명 + 핵심표현 5개 + 문법 패턴 + 4단계 학습법
- **줄별 단어 팁(ⓘ)** — `medium rare`, `wake-up call` 같은 어려운 표현 풀이
- **즐겨찾기 ⭐** — 어려운 줄만 모아 반복 학습
- **음성 녹음 비교 🎤** — 마이크로 녹음 → 원음과 비교 재생 (MediaRecorder)
- **검색 🔍** — 카테고리·문장(영/한) 통합 검색
- **학습 통계** — 학습 문장, 즐겨찾기, 연속 학습 일수(streak), 최근 7일 막대 그래프
- **다국어 UI** — 한국어 / English 토글
- **Android 뒤로가기 매핑** — 시스템 뒤로가기 = 화면 뒤로가기 (TWA 호환)
- **다크 모드 / 오프라인(PWA)** — Service Worker 캐시, manifest

## 🖼 스크린

```
┌─────────────────────────────┐    ┌─────────────────────────────┐
│ Just-Speak                  │    │ ✈️ 공항             ▶ Listen│
│ 상황별 영어 쉐도잉            │    │ ━━━━━━━━━━━━━━━━━━━ 8 / 20 │
│                             │    │                             │
│ 🌞 일상                      │    │ 📖 학습 가이드 — 공항        │
│ ┌─────────┐  ┌─────────┐    │    │ 🎬 어떤 상황인가요?           │
│ │ ✈️ 공항  │  │ 🍽️ 식당 │    │    │ 입국 심사대에서...           │
│ │ 초급     │  │ 초급    │    │    │ ⭐ 핵심 표현                 │
│ │ ▓▓▓░ 12 │  │ ░░░░  0 │    │    │ • purpose of your visit     │
│ └─────────┘  └─────────┘    │    │ 📝 문법 포인트                │
│                             │    │ I'm here for ~              │
│ 🔍 검색...                   │    │                             │
│                             │    │ A  May I see your passport? │
│ [📚 학습] [⭐ 즐겨찾기] [⚙]  │    │ ⓘ declare ☆ 🔊             │
└─────────────────────────────┘    └─────────────────────────────┘
```

## 🛠 기술 스택

| 영역 | 사용 기술 |
|---|---|
| Frontend | React 19 · TypeScript · Vite 8 · Tailwind 4 |
| TTS | Web Speech API (브라우저 내장, 외부 라이브러리 무) |
| 상태 관리 | React Context + useReducer |
| 저장소 | localStorage (debounced save) |
| 녹음 | MediaRecorder API |
| 테스트 | Vitest + jsdom |
| PWA | Service Worker + manifest.json |
| 배포 | Vercel (정적 호스팅) |
| 모바일 (예정) | Bubblewrap TWA → Google Play |

## 🚀 시작하기

### 요구 사항
- Node.js 20+
- npm 또는 pnpm

### 설치 & 실행
```bash
git clone https://github.com/nokeunsu-creator/Just-Speak.git
cd Just-Speak
npm install
npm run icons    # public/icons/icon-{192,512}.png 생성 (sharp)
npm run dev      # localhost:5173
```

### 빌드 & 테스트
```bash
npm run build    # tsc -b && vite build → dist/
npm run preview  # 빌드 결과 미리보기
npm run test     # Vitest
```

### 배포 (Vercel)
```bash
npx vercel --prod --yes --name just-speak
```

## 📁 폴더 구조

```
Just-Speak/
├── src/
│   ├── App.tsx                       # 헤더, 탭바, 다크모드, useAndroidBack
│   ├── main.tsx
│   ├── index.css                     # tailwind 진입점
│   ├── i18n/strings.ts               # 한/영 UI 텍스트 매핑
│   ├── data/
│   │   ├── dialogues.json            # 500개 대화 (25 × 20)
│   │   └── categories.ts             # 25개 메타 + 학습 단계 + 추천
│   ├── models/types.ts               # Dialogue, CategoryMeta, AppState 등
│   ├── engine/tts.ts                 # Web Speech API 래퍼
│   ├── hooks/
│   │   ├── useTTS.ts                 # speakOne / playQueue / stop
│   │   ├── useRecorder.ts            # MediaRecorder
│   │   └── useAndroidBack.ts         # popstate ↔ Tab 매핑 (TWA 호환)
│   ├── state/AppContext.tsx          # Context + useReducer + 자동 저장
│   ├── storage/StorageService.ts     # localStorage CRUD + debounce
│   └── components/
│       ├── category/{CategoryList,CategoryCard}.tsx
│       ├── dialogue/{DialogueScreen,DialogueLine,CategoryGuide,ListenButton}.tsx
│       ├── favorites/FavoritesView.tsx
│       ├── onboarding/Welcome.tsx
│       └── settings/SettingsPage.tsx
├── public/
│   ├── manifest.json / sw.js / icons/
│   ├── about.html / guide.html / privacy.html / terms.html
│   └── ads.txt / robots.txt / sitemap.xml
├── scripts/generate-icons.mjs        # sharp 기반 PNG 생성
├── vite.config.ts / vercel.json / tsconfig.json
├── CLAUDE.md                         # AI 작업 가이드 (자세한 아키텍처)
└── PROJECT-INFO.md                   # 프로젝트 메타 정보
```

## 📚 카테고리 (25)

| 그룹 | 카테고리 |
|---|---|
| 🌞 일상 | ✈️ 공항 · 🍽️ 식당 · 🏨 호텔 · 🏥 병원 · 🛍️ 쇼핑 · 🧭 길묻기 · ☕ 카페 · 🤝 자기소개 |
| 💼 업무 | 💼 비즈니스 미팅 · 📞 전화 응대 · 🎤 영어 면접 |
| 🧳 이동 | 🚖 택시·교통 · 🔧 자동차·정비 |
| 🎨 여가 | 🎬 영화관 · 🖼️ 미술관·박물관 · 🌳 공원·산책 |
| 🏠 생활 | 🚨 긴급상황 · 🏦 은행·환전 · 📮 우체국 · 💇 미용실 · 💊 약국 · 🏋️ 헬스장 · 🛒 식료품·마트 · 📚 도서관 · 🎓 학교 |

## 🎯 학습 흐름

1. **듣기 🔊** — 한 줄씩 발음·억양에 집중
2. **의미 확인 👀** — 영문 탭 → 한글 슬라이드, 어려운 단어는 ⓘ 팁
3. **따라 말하기 🗣️** — 천천히 → 원어민 속도로 쉐도잉, 🎤로 녹음 비교
4. **자동 재생 ▶** — 전체 흐름 익히기

## 🗺 로드맵

- [x] React + Vite + Tailwind + TS 기반 PWA 부트스트랩
- [x] 25 카테고리 × 20 = 500개 대화 데이터
- [x] 학습 가이드(상황·표현·문법·단계) + 줄별 단어 팁
- [x] 즐겨찾기 / 검색 / 학습 통계(streak)
- [x] 음성 녹음 비교 (MediaRecorder)
- [x] 한/영 다국어 UI
- [x] Android 뒤로가기 매핑 (popstate)
- [ ] Bubblewrap TWA → Google Play Store 등록
- [ ] AdMob 광고 재도입 (잠금 카테고리 보상형 해금)
- [ ] 음성 인식 평가 (Web Speech Recognition으로 발음 매칭 점수)
- [ ] 데이터 검수(원어민 리뷰) + 줄별 팁 확장

## 🔒 개인정보 & 데이터

- 회원가입·서버 전송 없음. 모든 학습 진도/즐겨찾기/설정은 **기기 내 localStorage**에만 저장
- 마이크 녹음은 브라우저에서만 처리, 외부 전송 없음
- 자세한 내용: [/privacy.html](https://just-speak-blue.vercel.app/privacy.html)

## 🤝 기여

이슈/PR 환영. 큰 변경은 먼저 이슈로 논의해주세요.

## 📝 라이선스

개인 프로젝트 — 라이선스 미지정. 사용/포크 전 문의 부탁드립니다.

---

Made with ☕ + 🗣 by [@nokeunsu-creator](https://github.com/nokeunsu-creator)
