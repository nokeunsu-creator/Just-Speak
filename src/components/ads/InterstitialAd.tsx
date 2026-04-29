import { useEffect, useState } from 'react';

interface Props {
  reason?: string;
  onClose: () => void;
}

// 전면 광고 (학습 1개 카테고리 완주 시, 30분 이상 재방문 시 등)
// AdSense는 정식 "전면 광고"가 없으므로 디스플레이 광고를 모달에 띄우는 형태로 운영.
// TODO[adMob]: TWA 빌드 시 AdMob Interstitial SDK로 교체 가능.
export function InterstitialAd({ reason, onClose }: Props) {
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl dark:bg-slate-800">
        <h3 className="mb-2 text-base font-bold text-slate-900 dark:text-slate-100">잠시 광고 안내</h3>
        {reason && <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">{reason}</p>}

        <div
          className="flex items-center justify-center rounded-xl border border-dashed border-indigo-300 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-slate-700 dark:to-slate-600"
          style={{ minHeight: 220 }}
        >
          <span className="text-sm text-slate-500 dark:text-slate-300">📣 전면 광고 영역</span>
        </div>

        <button
          onClick={onClose}
          disabled={seconds > 0}
          className={[
            'mt-4 w-full rounded-xl py-3 text-sm font-semibold shadow transition',
            seconds > 0
              ? 'cursor-not-allowed bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
              : 'bg-indigo-500 text-white hover:bg-indigo-600',
          ].join(' ')}
        >
          {seconds > 0 ? `${seconds}초 후 닫기` : '닫기'}
        </button>
      </div>
    </div>
  );
}
