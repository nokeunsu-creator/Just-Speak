import { useMemo } from 'react';
import dialogues from '../../data/dialogues.json';
import type { Dialogue } from '../../models/types';
import { CATEGORIES } from '../../models/types';
import { useApp } from '../../state/AppContext';
import { useTTS } from '../../hooks/useTTS';
import { DialogueLine } from '../dialogue/DialogueLine';
import { goBack } from '../../hooks/useAndroidBack';
import { t } from '../../i18n/strings';

const DATA = dialogues as Dialogue[];

export function FavoritesView() {
  const { state, dispatch } = useApp();
  const lang = state.settings.language;
  const { speakOne, playingIndex } = useTTS();

  const items = useMemo<Dialogue[]>(() => {
    const set = new Set(state.favorites);
    return DATA.filter((d) => set.has(d.id));
  }, [state.favorites]);

  const labelFor = (catId: string) => {
    const c = CATEGORIES.find((x) => x.id === catId);
    return c ? `${c.emoji} ${c.name}` : catId;
  };

  return (
    <div className="px-4 pb-24 pt-3">
      <div className="sticky top-0 z-10 -mx-4 mb-3 border-b border-slate-200 bg-white/85 px-4 py-3 backdrop-blur dark:border-slate-700 dark:bg-slate-900/85">
        <div className="flex items-center gap-2">
          <button
            onClick={goBack}
            className="rounded-full bg-slate-100 px-3 py-1 text-sm dark:bg-slate-800 dark:text-slate-200"
            aria-label={t('back', lang)}
          >
            {t('back', lang)}
          </button>
          <h2 className="flex-1 text-center text-base font-bold text-slate-900 dark:text-slate-100">
            {t('favoritesTitle', lang)} ({items.length})
          </h2>
          <span className="w-12" />
        </div>
      </div>

      {items.length === 0 ? (
        <p className="rounded-xl bg-slate-100 px-4 py-8 text-center text-sm text-slate-500 dark:bg-slate-800 dark:text-slate-400">
          {t('favoritesEmpty', lang)}
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((d, i) => (
            <div key={d.id}>
              <div className="mb-1 px-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                {labelFor(d.category)}
              </div>
              <DialogueLine
                dialogue={d}
                isPlaying={playingIndex === i}
                isViewed={false}
                isFavorite={true}
                lang={lang}
                onSpeak={() => speakOne(d.english)}
                onMarkViewed={() => {}}
                onToggleFavorite={() => dispatch({ type: 'TOGGLE_FAVORITE', dialogueId: d.id })}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
