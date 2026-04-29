import { useRef, useState } from 'react';
import type { Dialogue } from '../../models/types';
import { useRecorder } from '../../hooks/useRecorder';
import { t, type Lang } from '../../i18n/strings';

interface Props {
  dialogue: Dialogue;
  isPlaying: boolean;
  isViewed: boolean;
  isFavorite: boolean;
  lang: Lang;
  onSpeak: () => void;
  onMarkViewed: () => void;
  onToggleFavorite: () => void;
}

export function DialogueLine({
  dialogue, isPlaying, isViewed, isFavorite, lang,
  onSpeak, onMarkViewed, onToggleFavorite,
}: Props) {
  const [showKorean, setShowKorean] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const recorder = useRecorder();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleKorean = () => {
    setShowKorean((v) => !v);
    onMarkViewed();
  };

  const isA = dialogue.speaker === 'A';

  const playRecording = () => {
    if (!recorder.audioUrl) return;
    if (!audioRef.current) audioRef.current = new Audio(recorder.audioUrl);
    else audioRef.current.src = recorder.audioUrl;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  };

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
        <div className="flex items-center gap-2">
          <span
            className={[
              'inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white',
              isA ? 'bg-indigo-500' : 'bg-emerald-500',
            ].join(' ')}
          >
            {dialogue.speaker}
          </span>
          {dialogue.tip && (
            <button
              onClick={() => setShowTip((v) => !v)}
              className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300"
              aria-label="단어 팁"
            >
              ⓘ {dialogue.tip.word}
            </button>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          {isViewed && <span className="text-emerald-500" aria-label="학습 완료">✓</span>}
          <button
            onClick={onToggleFavorite}
            className={`rounded-full px-2 py-1 text-xs ${isFavorite ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'}`}
            aria-label={isFavorite ? t('favoriteRemove', lang) : t('favoriteAdd', lang)}
          >
            {isFavorite ? '⭐' : '☆'}
          </button>
          <button
            onClick={() => { onSpeak(); onMarkViewed(); }}
            className="rounded-full bg-indigo-500 px-3 py-1 text-xs font-semibold text-white shadow hover:bg-indigo-600 active:scale-95"
            aria-label={t('listenLine', lang)}
          >
            🔊
          </button>
        </div>
      </div>

      <button onClick={toggleKorean} className="block w-full text-left" aria-label="한글 해석 토글">
        <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{dialogue.english}</p>
        <div
          className={[
            'overflow-hidden text-slate-600 transition-all duration-200 dark:text-slate-300',
            showKorean ? 'mt-2 max-h-20 opacity-100' : 'max-h-0 opacity-0',
          ].join(' ')}
        >
          <p className="text-sm">{dialogue.korean}</p>
        </div>
        {!showKorean && (
          <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">{t('tapForKorean', lang)}</p>
        )}
      </button>

      {showTip && dialogue.tip && (
        <div className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs dark:bg-amber-900/30">
          <span className="font-bold text-amber-800 dark:text-amber-200">{dialogue.tip.word}</span>
          <span className="mx-1 text-amber-700/60 dark:text-amber-300/60">·</span>
          <span className="text-amber-800/90 dark:text-amber-200/90">{dialogue.tip.meaning}</span>
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {!recorder.isRecording ? (
          <button
            onClick={() => recorder.start()}
            className="rounded-full bg-rose-100 px-2.5 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-200 dark:bg-rose-900/40 dark:text-rose-300"
          >
            {t('recordStart', lang)}
          </button>
        ) : (
          <button
            onClick={() => recorder.stop()}
            className="animate-pulse rounded-full bg-rose-500 px-2.5 py-1 text-xs font-semibold text-white"
          >
            {t('recordStop', lang)}
          </button>
        )}
        {recorder.audioUrl && !recorder.isRecording && (
          <>
            <button
              onClick={playRecording}
              className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300"
            >
              {t('recordPlay', lang)}
            </button>
            <button
              onClick={async () => {
                onSpeak();
                setTimeout(playRecording, 250);
              }}
              className="rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-semibold text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/40 dark:text-indigo-300"
            >
              {t('recordCompare', lang)}
            </button>
          </>
        )}
        {recorder.error === 'NotAllowedError' && (
          <span className="text-[10px] text-rose-600 dark:text-rose-400">
            {t('recordPermissionDenied', lang)}
          </span>
        )}
      </div>
    </div>
  );
}
