import { useState } from 'react';
import type { Dialogue } from '../../models/types';

interface Props {
  dialogue: Dialogue;
  isPlaying: boolean;
  isViewed: boolean;
  onSpeak: () => void;
  onMarkViewed: () => void;
}

export function DialogueLine({ dialogue, isPlaying, isViewed, onSpeak, onMarkViewed }: Props) {
  const [showKorean, setShowKorean] = useState(false);

  const toggleKorean = () => {
    setShowKorean((v) => !v);
    onMarkViewed();
  };

  const isA = dialogue.speaker === 'A';

  return (
    <div
      className={[
        'rounded-2xl border p-4 transition',
        isPlaying
          ? 'border-amber-400 bg-amber-50 shadow-md dark:border-amber-500 dark:bg-amber-900/30'
          : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800',
      ].join(' ')}
    >
      <div className="mb-2 flex items-center justify-between">
        <span
          className={[
            'inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white',
            isA ? 'bg-indigo-500' : 'bg-emerald-500',
          ].join(' ')}
        >
          {dialogue.speaker}
        </span>
        <div className="flex items-center gap-2">
          {isViewed && <span className="text-emerald-500" aria-label="학습 완료">✓</span>}
          <button
            onClick={() => { onSpeak(); onMarkViewed(); }}
            className="rounded-full bg-indigo-500 px-3 py-1 text-xs font-semibold text-white shadow hover:bg-indigo-600 active:scale-95"
            aria-label="이 줄 듣기"
          >
            🔊 듣기
          </button>
        </div>
      </div>

      <button
        onClick={toggleKorean}
        className="block w-full text-left"
        aria-label="한글 해석 토글"
      >
        <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          {dialogue.english}
        </p>
        <div
          className={[
            'overflow-hidden text-slate-600 transition-all duration-200 dark:text-slate-300',
            showKorean ? 'mt-2 max-h-20 opacity-100' : 'max-h-0 opacity-0',
          ].join(' ')}
        >
          <p className="text-sm">{dialogue.korean}</p>
        </div>
        {!showKorean && (
          <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
            탭하면 해석이 보입니다
          </p>
        )}
      </button>
    </div>
  );
}
