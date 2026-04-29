import { useMemo } from 'react';
import dialogues from '../../data/dialogues.json';
import type { CategoryGroup, Dialogue } from '../../models/types';
import { CATEGORIES } from '../../models/types';
import { useApp } from '../../state/AppContext';
import { CategoryCard } from './CategoryCard';
import { t } from '../../i18n/strings';

const DATA = dialogues as Dialogue[];

const GROUP_ORDER: CategoryGroup[] = ['일상', '업무', '이동', '여가', '생활'];

const GROUP_LABEL: Record<CategoryGroup, { ko: string; en: string; emoji: string }> = {
  '일상': { ko: '일상', en: 'Daily life', emoji: '🌞' },
  '업무': { ko: '업무', en: 'Work', emoji: '💼' },
  '이동': { ko: '이동', en: 'Travel', emoji: '🧳' },
  '여가': { ko: '여가', en: 'Leisure', emoji: '🎨' },
  '생활': { ko: '생활', en: 'Living', emoji: '🏠' },
};

export function CategoryList() {
  const { state, dispatch } = useApp();
  const lang = state.settings.language;

  const totals = useMemo(() => {
    const map: Record<string, number> = {};
    for (const d of DATA) map[d.category] = (map[d.category] ?? 0) + 1;
    return map;
  }, []);

  const q = state.search.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!q) return CATEGORIES;
    const matchedByDialogue = new Set<string>();
    for (const d of DATA) {
      if (
        d.english.toLowerCase().includes(q) ||
        d.korean.includes(q)
      ) {
        matchedByDialogue.add(d.category);
      }
    }
    return CATEGORIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        matchedByDialogue.has(c.id)
    );
  }, [q]);

  const grouped = useMemo(() => {
    const buckets: Record<CategoryGroup, typeof CATEGORIES> = {
      '일상': [], '업무': [], '이동': [], '여가': [], '생활': [],
    };
    for (const c of filtered) buckets[c.group].push(c);
    return buckets;
  }, [filtered]);

  return (
    <div className="px-4 pb-24 pt-4">
      <header className="mb-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
          {t('listHeading', lang)}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">{t('listIntro', lang)}</p>
      </header>

      <div className="mb-4 flex items-center gap-2">
        <input
          type="search"
          value={state.search}
          onChange={(e) => dispatch({ type: 'SET_SEARCH', q: e.target.value })}
          placeholder={t('searchPlaceholder', lang)}
          className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm focus:border-indigo-400 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
        {state.search && (
          <button
            onClick={() => dispatch({ type: 'SET_SEARCH', q: '' })}
            className="shrink-0 rounded-full bg-slate-200 px-3 py-2 text-xs dark:bg-slate-700 dark:text-slate-200"
            aria-label={t('searchClear', lang)}
          >
            ✕
          </button>
        )}
      </div>

      {filtered.length === 0 && (
        <p className="rounded-xl bg-slate-100 px-4 py-6 text-center text-sm text-slate-500 dark:bg-slate-800 dark:text-slate-400">
          {t('searchEmpty', lang)}
        </p>
      )}

      {GROUP_ORDER.map((g) => {
        const list = grouped[g];
        if (list.length === 0) return null;
        const label = GROUP_LABEL[g];
        return (
          <section key={g} className="mb-5">
            <h3 className="mb-2 text-sm font-bold text-slate-500 dark:text-slate-400">
              {label.emoji} {lang === 'ko' ? label.ko : label.en}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {list.map((cat) => {
                const total = totals[cat.id] ?? 0;
                const done = (state.progress[cat.id] ?? []).length;
                return (
                  <CategoryCard
                    key={cat.id}
                    category={cat}
                    total={total}
                    done={done}
                    lang={lang}
                    onSelect={() => dispatch({ type: 'OPEN_CATEGORY', categoryId: cat.id })}
                  />
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
