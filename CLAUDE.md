# Just-Speak — 상황별 영어 쉐도잉 마스터

## 작업 규칙
- 기능 추가 / 구조 변경 / 버그 수정 후 이 파일의 관련 섹션을 최신 상태로 업데이트할 것
- 새로 추가된 파일, 변경된 아키텍처, 중요한 결정사항을 반영할 것
- **개발 완료 시 반드시 배포**: 기능 구현이 완료되면 항상 `npx vercel --prod --yes`로 즉시 배포할 것
- 배포 명령어: `npx vercel --prod --yes`

## 프로젝트 개요
공항·식당·호텔 등 실전 상황 10가지 × 20문장 (총 200개) 영어 쉐도잉 학습 웹앱.
TTS로 음성을 들으며 따라말하기, 진도 자동 저장, 일부 카테고리는 광고 시청으로 해금.

- **라이브 URL**: https://just-speak.vercel.app (배포 후)
- **GitHub**: https://github.com/nokeunsu-creator/Just-Speak
- **배포**: Vercel (정적 호스팅) → 추후 TWA로 Android Play Store 래핑 예정

## 기술 스택
- React 19 + TypeScript + Vite 8
- Tailwind CSS 4
- Web Speech API (`window.speechSynthesis`) — 외부 라이브러리 없이 TTS
- localStorage 데이터 저장 (서버 없음)
- nanoid (고유 ID)
- Vitest (테스트)
- PWA (Service Worker + manifest.json)

## 핵심 아키텍처

### 데이터 모델 (`src/models/types.ts`)
- `Dialogue`: id, category, speaker(A/B), english, korean
- `CategoryMeta`: id, name, emoji, locked, description
- `Settings`: ttsRate, ttsPitch, gapMs, dark
- `AppState`: tab, currentCategory, progress, unlocked, settings, lastVisit, onboarded
- `CATEGORIES` 상수: 10개 카테고리 메타 (무료 6 / 잠금 4)

### TTS 엔진 (`src/engine/tts.ts`)
- Web Speech API 래퍼. iOS Safari 첫 사용자 제스처 unlock 처리
- `speak(text, opts)`: 단일 문장 Promise 기반 재생
- `speakQueue(lines, opts)`: Listen 모드 — 줄 순차 재생, `gapMs` 간격, `shouldStop` 콜백으로 인터럽트
- `pickEnglishVoice()`: en-US > en-GB > en-AU 우선순위로 voice 선택
- 'canceled'/'interrupted' 에러는 큐 정상화를 위해 reject가 아닌 resolve로 처리

### 상태 관리 (`src/state/AppContext.tsx`)
- React Context + `useReducer`
- 액션: `SET_TAB`, `OPEN_CATEGORY`, `CLOSE_CATEGORY`, `MARK_VIEWED`, `UNLOCK`, `UPDATE_SETTINGS`, `SET_LAST_VISIT`, `COMPLETE_ONBOARDING`, `RESET_PROGRESS`
- `MARK_VIEWED`는 중복 ID 추가 차단
- `useEffect`로 graph 변경 시 디바운스 저장 (300ms) + `beforeunload` 즉시 저장

### 스토리지 (`src/storage/StorageService.ts`)
- localStorage 키: `@js:progress`, `@js:unlocked`, `@js:settings`, `@js:lastVisit`, `@js:onboarded`
- `safeGet/safeSet`: JSON 파싱 실패 / quota 초과 시 fallback 처리
- `debouncedSave(fn, delay)` + `flushDebouncedSave()` 패턴

### 광고 (`src/components/ads/`)
- `AdBanner.tsx`: 하단 고정 배너 (AdSense 미설정 시 플레이스홀더)
- `InterstitialAd.tsx`: 카테고리 완주 / 30분+ 재방문 시 모달 광고 (5초 카운트다운)
- `RewardedModal.tsx`: 잠금 카테고리 해금용 보상형 흉내 (15초 카운트다운 → 해금)
  - 웹 AdSense는 정식 보상형이 없어 흉내 구현. **TWA 전환 시 AdMob Rewarded SDK로 교체 가능하도록 onRewarded 콜백 분리**

## 폴더 구조
```
src/
├── App.tsx                      # 헤더, 탭 전환, 다크모드, 30분+ 재방문 광고
├── main.tsx
├── index.css                    # tailwind 진입점 + 다크모드
├── data/dialogues.json          # 200개 대화 (10×20)
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
│   │   ├── CategoryCard.tsx     # 카드 (진도바 + 자물쇠 오버레이)
│   │   └── CategoryList.tsx     # 그리드 + RewardedModal 트리거
│   ├── dialogue/
│   │   ├── DialogueScreen.tsx   # 학습 화면 (sticky 헤더, 자동스크롤)
│   │   ├── DialogueLine.tsx     # 줄 카드 (영문→탭→한글, 🔊 듣기)
│   │   └── ListenButton.tsx
│   ├── ads/
│   │   ├── AdBanner.tsx
│   │   ├── InterstitialAd.tsx
│   │   └── RewardedModal.tsx
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
npx vercel --prod --yes
```

## 미완료 / 추후 작업
- [ ] Google AdSense 승인 → `src/components/ads/AdBanner.tsx`의 `AD_CLIENT`/`AD_SLOT` 채우기 + `index.html` AdSense 스크립트 활성화
- [ ] `public/ads.txt` 퍼블리셔 ID 교체
- [ ] PNG 아이콘 생성 (`npm run icons`)
- [ ] Bubblewrap TWA 패키징 → Play Store 등록
- [ ] AdMob Rewarded Ad SDK 통합 (TWA 단계, `RewardedModal`의 카운트다운을 SDK 콜백으로 교체)

## 주의사항
- **iOS Safari TTS 제약**: `window.speechSynthesis.speak`는 사용자 제스처 안에서 첫 호출되어야 함. `useTTS.speakOne/playQueue` 진입 시 `unlock()`을 호출.
- **TTS 큐 인터럽트**: 한 줄 재생 중 다른 줄 🔊 누르면 `cancel()` → 새 utterance 시작. `stopFlag` ref로 큐 루프를 빠져나옴.
- **AdSense는 보상형 없음**: `RewardedModal`은 흉내 구현. 실제 보상형이 필요하면 TWA + AdMob 경로로.
- **localStorage quota**: ~5MB. 진도 200개 ID = 1KB 미만이라 안전.
- **CSP**: `vercel.json`에 googlesyndication 허용. AdSense 외 외부 스크립트 추가 시 CSP 갱신 필수.
- **dialogues.json 변경 시**: id는 1~200 유니크 유지. 카테고리 추가 시 `models/types.ts`의 `CATEGORIES` 배열도 함께 갱신.
- **다크모드**: `App.tsx`의 useEffect에서 `<html class="dark">` 토글. Tailwind 4 `:root.dark` 셀렉터 사용 중.
