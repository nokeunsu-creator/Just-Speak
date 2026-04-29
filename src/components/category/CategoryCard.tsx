import type { CategoryMeta } from '../../models/types';
import { t, type Lang } from '../../i18n/strings';

interface Props {
  category: CategoryMeta;
  total: number;
  done: number;
  lang: Lang;
  onSelect: () => void;
}

const LEVEL_BADGE: Record<CategoryMeta['level'], { ko: string; en: string; cls: string }> = {
  beginner:    { ko: '초급', en: 'Beginner',     cls: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' },
  intermediate:{ ko: '중급', en: 'Intermediate', cls: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' },
  advanced:    { ko: '고급', en: 'Advanced',     cls: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300' },
};

export function CategoryCard({ category, total, done, lang, onSelect }: Props) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const badge = LEVEL_BADGE[category.level];

  return (
    <button
      onClick={onSelect}
      className="flex flex-col items-start gap-2 rounded-2xl border border-indigo-100 bg-white p-4 text-left shadow-sm transition active:scale-[0.98] dark:border-slate-700 dark:bg-slate-800"
      aria-label={`${category.name}`}
    >
      <div className="flex w-full items-center justify-between">
        <span className="text-3xl">{category.emoji}</span>
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${badge.cls}`}>
          {lang === 'ko' ? badge.ko : badge.en}
        </span>
      </div>

      <div className="text-base font-bold text-slate-900 dark:text-slate-100">
        {category.name}
      </div>
      <div className="text-xs text-slate-500 dark:text-slate-400">
        {category.description}
      </div>

      <div className="mt-2 w-full">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-indigo-100 dark:bg-slate-700">
          <div className="h-full bg-indigo-500 transition-all" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">{done} / {total}</div>
      </div>
    </button>
  );
}

export { LEVEL_BADGE };
