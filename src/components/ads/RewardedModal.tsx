import { useEffect, useState } from 'react';

interface Props {
  categoryName: string;
  onClose: () => void;
  onRewarded: () => void;
}

const COUNTDOWN = 15; // 초

/**
 * 보상형 광고 흉내 모달.
 *
 * 웹(AdSense)에는 진짜 Rewarded Ad가 없기 때문에:
 *  - 사용자가 [광고 시청] 버튼을 누르면 디스플레이 광고를 모달에 노출하고
 *  - {COUNTDOWN}초 카운트다운이 끝나면 [잠금 해제] 버튼이 활성화된다.
 *  - 도중에 닫으면 해금되지 않는다.
 *
 * TODO[adMob]: TWA 전환 시 실제 AdMob Rewarded Ad SDK로 교체.
 *  1) android/ Bubblewrap 설정에 AdMob 모듈 통합
 *  2) WebView ↔ Native 브릿지로 SDK 호출
 *  3) onUserEarnedReward 콜백에서 onRewarded() 호출하도록 교체
 *  4) COUNTDOWN 타이머 로직 제거
 */
export function RewardedModal({ categoryName, onClose, onRewarded }: Props) {
  const [phase, setPhase] = useState<'intro' | 'watching' | 'done'>('intro');
  const [seconds, setSeconds] = useState(COUNTDOWN);

  useEffect(() => {
    if (phase !== 'watching') return;
    if (seconds <= 0) {
      setPhase('done');
      return;
    }
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, seconds]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl dark:bg-slate-800">
        <h3 className="mb-1 text-lg font-bold text-slate-900 dark:text-slate-100">
          🔒 {categoryName} 잠금 해제
        </h3>
        <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
          짧은 광고를 끝까지 시청하시면 영구 해금됩니다.
        </p>

        {phase === 'intro' && (
          <>
            <div
              className="flex items-center justify-center rounded-xl border border-dashed border-indigo-300 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-slate-700 dark:to-slate-600"
              style={{ minHeight: 220 }}
            >
              <span className="text-sm text-slate-500 dark:text-slate-300">광고 시청 후 해금</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                onClick={onClose}
                className="rounded-xl bg-slate-200 py-3 text-sm font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-200"
              >
                취소
              </button>
              <button
                onClick={() => setPhase('watching')}
                className="rounded-xl bg-indigo-500 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-600"
              >
                광고 시청 ({COUNTDOWN}초)
              </button>
            </div>
          </>
        )}

        {phase === 'watching' && (
          <>
            <div
              className="flex items-center justify-center rounded-xl border border-dashed border-indigo-300 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-slate-700 dark:to-slate-600"
              style={{ minHeight: 220 }}
            >
              <span className="text-sm text-slate-500 dark:text-slate-300">📣 광고 재생 중...</span>
            </div>
            <p className="mt-3 text-center text-sm text-slate-700 dark:text-slate-300">
              {seconds}초 남음 — 닫지 말고 기다려 주세요
            </p>
            <button
              onClick={onClose}
              className="mt-3 w-full rounded-xl bg-slate-200 py-2 text-xs text-slate-600 dark:bg-slate-700 dark:text-slate-300"
            >
              취소(해금 안 됨)
            </button>
          </>
        )}

        {phase === 'done' && (
          <>
            <div className="flex items-center justify-center rounded-xl bg-emerald-50 p-6 dark:bg-emerald-900/30">
              <span className="text-3xl">🎉</span>
            </div>
            <p className="mt-3 text-center text-sm text-slate-700 dark:text-slate-300">
              시청해 주셔서 감사합니다. 카테고리가 해금되었습니다.
            </p>
            <button
              onClick={onRewarded}
              className="mt-4 w-full rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-600"
            >
              학습 시작하기
            </button>
          </>
        )}
      </div>
    </div>
  );
}
