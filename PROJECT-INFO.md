# Just-Speak — 프로젝트 정보

## 기본 정보
- **프로젝트명**: Just-Speak — 상황별 영어 쉐도잉 마스터
- **설명**: 공항·식당·호텔 등 실전 상황 10가지 × 20문장 = 200개 대화 영어 쉐도잉 학습 앱
- **버전**: 0.1.0

## 라이브 URL
- **웹앱**: https://just-speak.vercel.app (배포 후)
- **GitHub**: https://github.com/nokeunsu-creator/Just-Speak
- **Play Store**: 미예정 (TWA 빌드 후 등록 가능)

## 기술 스택
- React 19 + TypeScript + Vite 8
- Tailwind CSS 4
- Web Speech API (`window.speechSynthesis`) — 외부 TTS 라이브러리 없음
- localStorage 데이터 저장
- nanoid
- Vitest
- PWA (Service Worker + manifest.json)

## 배포 정보

### Vercel (웹)
- **프로젝트**: just-speak
- **URL**: https://just-speak.vercel.app
- **배포 명령어**: `npx vercel --prod --yes`
- **SSL 우회 필요 시**: `NODE_TLS_REJECT_UNAUTHORIZED=0 npx vercel --prod --yes`

### Google Play Store (Android, 향후)
- **빌드 방식**: TWA (Trusted Web Activity) via Bubblewrap
- **패키지명 후보**: `app.vercel.justspeak.twa`
- **Digital Asset Links 위치**: `public/.well-known/assetlinks.json` (생성 예정)
- **키스토어/비밀번호/SHA256**: 로컬 별도 보관 (리포에 커밋하지 않음)

## 수익 모델
- **하단 배너 광고**: Google AdSense — `src/components/ads/AdBanner.tsx`의 `AD_CLIENT`/`AD_SLOT` 미설정 시 플레이스홀더 노출
- **전면 광고**: 카테고리 완주 시, 30분+ 재방문 시 (`InterstitialAd.tsx`)
- **보상형 광고 (잠금 해금)**: `RewardedModal.tsx` — 15초 카운트다운으로 흉내. TWA + AdMob 전환 시 실제 SDK 연동
- **AdSense 설정 파일**: `src/components/ads/AdBanner.tsx`, `index.html`(스크립트 주석), `public/ads.txt`

## 빌드 & 실행
```bash
npm install
npm run icons     # 192/512 PNG 생성
npm run dev       # 개발 서버 (localhost:5173)
npm run build     # 프로덕션 빌드
npm run preview   # 빌드 미리보기
npm run test      # Vitest 테스트
```

## TWA APK 빌드 (향후)
```bash
cd android
bubblewrap init   # 첫 설정
bubblewrap build  # 인터랙티브 빌드
# 또는
./gradlew.bat assembleRelease
# zipalign + apksigner로 서명
```

## 폴더 구조
```
Just-Speak/
├── src/                   # 소스 코드
│   ├── components/        # React 컴포넌트
│   │   ├── category/
│   │   ├── dialogue/
│   │   ├── ads/
│   │   ├── onboarding/
│   │   └── settings/
│   ├── data/              # dialogues.json (200개)
│   ├── engine/            # TTS 엔진
│   ├── hooks/             # useTTS
│   ├── models/            # 타입 + CATEGORIES
│   ├── state/             # AppContext (Context + useReducer)
│   └── storage/           # localStorage CRUD
├── public/                # PWA 자산, 정적 페이지(SEO/AdSense)
├── scripts/               # generate-icons.mjs
├── android/               # TWA 프로젝트 (생성 예정)
├── dist/                  # 빌드 산출물
└── CLAUDE.md              # AI 개발 가이드
```

## 핵심 기능
- 10 카테고리 × 20문장 (총 200개) 대화 학습
- 한 줄 듣기 (🔊) + 전체 자동 재생 (▶ Listen)
- 영문 탭 → 한글 해석 슬라이드다운
- 학습 진도 자동 저장 (localStorage)
- 카테고리 잠금/해금 (광고 시청 후 영구 해금)
- 다크 모드
- TTS 속도/톤/줄간격 사용자 조절
- PWA 오프라인 지원
- 카테고리 완주 / 30분+ 재방문 시 전면 광고

## 새 프로젝트 참고 사항
- Vercel 배포: `npx vercel --prod --yes`
- PWA: `public/manifest.json` + `public/sw.js` + `index.html`에 SW 등록
- TWA 패키징: `npm install -g @bubblewrap/cli` → `bubblewrap init`
- Android SDK: `C:\Users\nokeu\.bubblewrap\` (ChonMap에서 사용한 환경 그대로)
- JDK: `C:\Program Files\Java\jdk-21`
- bubblewrap config: `C:\Users\nokeu\.bubblewrap\config.json`
- Google Play Console: https://play.google.com/console
