# Just-Speak — 상황별 영어 쉐도잉 마스터

## 작업 규칙
- 기능 추가 / 구조 변경 / 버그 수정 후 이 파일의 관련 섹션을 최신 상태로 업데이트할 것
- 새로 추가된 파일, 변경된 아키텍처, 중요한 결정사항을 반영할 것
- **개발 완료 시 반드시 배포**: 기능 구현이 완료되면 항상 `npx vercel --prod --yes`로 즉시 배포할 것
- 배포 명령어: `NODE_TLS_REJECT_UNAUTHORIZED=0 npx vercel --prod --yes` (사내망 SSL 우회)

## 프로젝트 개요
공항·식당·호텔 등 실전 상황 25가지 × 20문장 (총 500개) 영어 쉐도잉 학습 웹앱.
TTS로 음성을 들으며 따라말하기, 진도/즐겨찾기/학습 통계 자동 저장. 마이크 녹음으로 발음 비교, 한/영 UI 토글, Android 뒤로가기 매핑(TWA 호환).

- **라이브 URL**: https://just-speak-blue.vercel.app
- **GitHub**: https://github.com/nokeunsu-creator/Just-Speak
- **배포**: Vercel (정적 호스팅) → 추후 TWA로 Android Play Store 래핑 예정

## 기술 스택
- React 19 + TypeScript + Vite 8
- Tailwind CSS 4
- Web Speech API (`window.speechSynthesis`) — 외부 TTS 라이브러리 없이 TTS
- localStorage 데이터 저장 (서버 없음)
- nanoid
- Vitest
- PWA (Service Worker + manifest.json)

## 핵심 아키텍처

### 데이터 모델 (`src/models/types.ts`, `src/data/categories.ts`)
- `Dialogue`: id, category, speaker(A/B), english, korean, tip?:{ word, meaning }
- `CategoryMeta`: id, name, emoji, description, situation, keyPhrases, **level**(beginner|intermediate|advanced), **group**(일상|업무|이동|여가|생활), **grammarNotes**(GrammarNote[])
- `GrammarNote`: { pattern, desc, examples[] } — 카테고리당 1~2개
- `KeyPhrase`: { en, ko } — 카테고리별 5개 핵심 표현
- `LearningStep`: { num, title, desc } — 쉐도잉 4단계
- `DailyStats`: { date(YYYY-MM-DD), count } — 일별 학습 카운트 (최근 60일)
- `Settings`: ttsRate, ttsPitch, gapMs, dark, **language**('ko'|'en')
- `Tab`: 'list' | 'study' | 'settings' | **'favorites'**
- `AppState`: tab, currentCategory, **search**, progress, **favorites**, **dailyStats**, settings, onboarded
- `CATEGORIES` (categories.ts): 25개 메타 + level + group + grammarNotes
- `LEARNING_STEPS`, `BEGINNER_PICKS` (categories.ts)

### TTS 엔진 (`src/engine/tts.ts`)
- Web Speech API 래퍼. iOS Safari 첫 사용자 제스처 unlock 처리
- `speak(text, opts)`: 단일 문장 Promise 기반 재생
- `speakQueue(lines, opts)`: Listen 모드 — 줄 순차 재생, `gapMs` 간격, `shouldStop` 콜백으로 인터럽트
- `pickEnglishVoice()`: en-US > en-GB > en-AU 우선순위로 voice 선택
- 'canceled'/'interrupted' 에러는 큐 정상화를 위해 reject가 아닌 resolve로 처리

### 상태 관리 (`src/state/AppContext.tsx`)
- React Context + `useReducer`
- 액션: `SET_TAB`, `OPEN_CATEGORY`, `CLOSE_CATEGORY`, `MARK_VIEWED`, `UPDATE_SETTINGS`, `COMPLETE_ONBOARDING`, `RESET_PROGRESS`
- `MARK_VIEWED`는 중복 ID 추가 차단
- `useEffect`로 graph 변경 시 디바운스 저장 (300ms) + `beforeunload` 즉시 저장

### 스토리지 (`src/storage/StorageService.ts`)
- localStorage 키: `@js:progress`, `@js:settings`, `@js:onboarded`
- `safeGet/safeSet`: JSON 파싱 실패 / quota 초과 시 fallback 처리
- `debouncedSave(fn, delay)` + `flushDebouncedSave()` 패턴

## 폴더 구조
```
src/
├── App.tsx                      # 헤더, 탭 전환, 다크모드
├── main.tsx
├── index.css                    # tailwind 진입점 + 다크모드
├── data/
│   ├── dialogues.json           # 500개 대화 (25×20)
│   └── categories.ts            # CATEGORIES(25) + LEARNING_STEPS + BEGINNER_PICKS
├── models/types.ts              # 타입 + CATEGORIES 상수
├── engine/
│   ├── tts.ts                   # Web Speech API 래퍼
│   └── tts.test.ts              # speak/speakQueue 테스트
├── state/AppContext.tsx          # Context + useReducer + 자동저장
├── storage/
│   ├── StorageService.ts        # localStorage CRUD + debounce
│   └── StorageService.test.ts
├── hooks/
│   └── useTTS.ts                # speakOne/playQueue/stop, playingIndex/queueRunning 상태
├── components/
│   ├── category/
│   │   ├── CategoryCard.tsx     # 카드 (진도바 포함)
│   │   └── CategoryList.tsx
│   ├── dialogue/
│   │   ├── DialogueScreen.tsx   # 학습 화면 (sticky 헤더, 자동스크롤, 가이드 패널)
│   │   ├── DialogueLine.tsx     # 줄 카드 (영문→탭→한글, 🔊 듣기)
│   │   ├── CategoryGuide.tsx    # 상황 설명 + 핵심표현 + 4단계 학습법 (펼침 토글)
│   │   └── ListenButton.tsx
│   ├── onboarding/Welcome.tsx
│   └── settings/SettingsPage.tsx
public/
├── manifest.json                # PWA 메타
├── sw.js                        # Service Worker (network-first HTML, cache-first 정적)
├── icons/icon.svg               # 마스터 (PNG는 npm run icons로 생성)
├── about.html / guide.html / privacy.html / terms.html
├── ads.txt / robots.txt / sitemap.xml
scripts/
└── generate-icons.mjs            # sharp 기반 PNG 생성
```

## 카테고리 (25)
일상: 공항 ✈️ · 식당 🍽️ · 호텔 🏨 · 병원 🏥 · 쇼핑 🛍️ · 길묻기 🧭 · 카페 ☕ · 자기소개 🤝
업무: 비즈니스 미팅 💼 · 전화 응대 📞 · 영어 면접 🎤
이동: 택시·교통 🚖 · 자동차·정비 🔧
여가: 영화관 🎬 · 미술관·박물관 🖼️ · 공원·산책 🌳
생활: 긴급상황 🚨 · 은행·환전 🏦 · 우체국·택배 📮 · 미용실 💇 · 약국 💊 · 헬스장 🏋️ · 식료품·마트 🛒 · 도서관 📚 · 학교·수업 🎓

## 빌드 & 실행
```bash
npm install
npm run icons      # public/icons/icon-192.png, icon-512.png 생성 (sharp)
npm run dev        # 개발 서버 (localhost:5173)
npm run build      # 프로덕션 빌드 (tsc -b && vite build)
npm run preview    # 빌드 결과 미리보기
npm run test       # Vitest
```

## 배포
```bash
NODE_TLS_REJECT_UNAUTHORIZED=0 npx vercel --prod --yes --name just-speak
```

## 미완료 / 추후 작업
- [ ] 광고 시스템 (배너 / 전면 / 보상형) 재도입 — 카테고리 잠금/해금 시스템과 함께 설계
- [ ] PNG 아이콘 디자인 다듬기 (`public/icons/icon.svg` 교체 후 `npm run icons`)
- [ ] Bubblewrap TWA 패키징 → Play Store 등록
- [ ] (TWA 단계) AdMob Rewarded Ad SDK 통합

## 주의사항
- **iOS Safari TTS 제약**: `window.speechSynthesis.speak`는 사용자 제스처 안에서 첫 호출되어야 함. `useTTS.speakOne/playQueue` 진입 시 `unlock()`을 호출.
- **TTS 큐 인터럽트**: 한 줄 재생 중 다른 줄 🔊 누르면 `cancel()` → 새 utterance 시작. `stopFlag` ref로 큐 루프를 빠져나옴.
- **광고 제거**: 초기 버전에 있던 AdBanner/InterstitialAd/RewardedModal과 잠금 카테고리 시스템 모두 제거됨. 모든 카테고리 무료 학습 가능. 추후 광고 재도입 시 잠금/해금 reducer/state도 함께 복구.
- **localStorage quota**: ~5MB. 진도 300개 ID = 1KB 내외라 안전.
- **CSP**: `vercel.json`에 googlesyndication 허용 그대로 둠 (광고 재도입 시 즉시 활용).
- **dialogues.json 변경 시**: id는 1~300 유니크 유지. 카테고리 추가 시 `models/types.ts`의 `CATEGORIES` 배열도 함께 갱신.
- **다크모드**: `App.tsx`의 useEffect에서 `<html class="dark">` 토글. Tailwind 4 `:root.dark` 셀렉터 사용 중.
