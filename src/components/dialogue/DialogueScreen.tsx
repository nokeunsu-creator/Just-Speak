import { useEffect, useMemo, useRef, useState } from 'react';
import dialogues from '../../data/dialogues.json';
import type { Dialogue } from '../../models/types';
import { CATEGORIES } from '../../models/types';
import { useApp } from '../../state/AppContext';
import { useTTS } from '../../hooks/useTTS';
import { DialogueLine } from './DialogueLine';
import { ListenButton } from './ListenButton';
import { InterstitialAd } from '../ads/InterstitialAd';

const DATA = dialogues as Dialogue[];

export function DialogueScreen() {
  const { state, dispatch } = useApp();
  const categoryId = state.currentCategory;
  const meta = CATEGORIES.find((c) => c.id === categoryId);
  const lines = useMemo<Dialogue[]>(
    () => DATA.filter((d) => d.category === categoryId),
    [categoryId]
  );

  const { speakOne, playQueue, stop, playingIndex, queueRunning } = useTTS();
  const lineRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [showInterstitial, setShowInterstitial] = useState(false);
  const completionCelebratedRef = useRef(false);

  const seen = (categoryId && state.progress[categoryId]) || [];
  const total = lines.length;
  const done = seen.length;

  useEffect(() => {
    if (playingIndex == null) return;
    const el = lineRefs.current[playingIndex];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [playingIndex]);

  useEffect(() => {
    if (!categoryId || total === 0) return;
    if (done >= total && !completionCelebratedRef.current) {
      completionCelebratedRef.current = true;
      setShowInterstitial(true);
    }
  }, [done, total, categoryId]);

  if (!categoryId || !meta) {
    return (
      <div className="p-6 text-center text-slate-500">
        카테고리를 선택해주세요.
      </div>
    );
  }

  const markViewed = (dialogueId: number) => {
    dispatch({ type: 'MARK_VIEWED', categoryId, dialogueId });
  };

  const handleListenToggle = () => {
    if (queueRunning) {
      stop();
      return;
    }
    playQueue(
      lines.map((l) => l.english),
      (i) => markViewed(lines[i].id)
    );
  };

  return (
    <div className="px-4 pb-28 pt-3">
      <div className="sticky top-0 z-10 -mx-4 mb-3 border-b border-slate-200 bg-white/85 px-4 py-3 backdrop-blur dark:border-slate-700 dark:bg-slate-900/85">
        <div className="flex items-center gap-2">
          <button
            onClick={() => { stop(); dispatch({ type: 'CLOSE_CATEGORY' }); }}
            className="rounded-full bg-slate-100 px-3 py-1 text-sm dark:bg-slate-800 dark:text-slate-200"
            aria-label="뒤로 가기"
          >
            ← 뒤로
          </button>
          <h2 className="flex-1 text-center text-base font-bold text-slate-900 dark:text-slate-100">
            {meta.emoji} {meta.name}
          </h2>
          <ListenButton isPlaying={queueRunning} onClick={handleListenToggle} />
        </div>
        <div className="mt-2 flex items-center gap-2">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-indigo-100 dark:bg-slate-700">
            <div
              className="h-full bg-indigo-500 transition-all"
              style={{ width: `${total > 0 ? (done / total) * 100 : 0}%` }}
            />
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {done} / {total}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {lines.map((d, i) => (
          <div
            key={d.id}
            ref={(el) => { lineRefs.current[i] = el; }}
          >
            <DialogueLine
              dialogue={d}
              isPlaying={playingIndex === i}
              isViewed={seen.includes(d.id)}
              onSpeak={() => speakOne(d.english)}
              onMarkViewed={() => markViewed(d.id)}
            />
          </div>
        ))}
      </div>

      {showInterstitial && (
        <InterstitialAd
          reason="카테고리 완주! 잠시 광고 후 계속됩니다."
          onClose={() => setShowInterstitial(false)}
        />
      )}
    </div>
  );
}
