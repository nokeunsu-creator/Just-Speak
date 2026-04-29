import type { CategoryMeta } from '../../models/types';

interface Props {
  category: CategoryMeta;
  total: number;
  done: number;
  onSelect: () => void;
}

export function CategoryCard({ category, total, done, onSelect }: Props) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <button
      onClick={onSelect}
      className="flex flex-col items-start gap-2 rounded-2xl border border-indigo-100 bg-white p-4 text-left shadow-sm transition active:scale-[0.98] dark:border-slate-700 dark:bg-slate-800"
      aria-label={`${category.name} 카테고리`}
    >
      <span className="text-3xl">{category.emoji}</span>

      <div className="text-base font-bold text-slate-900 dark:text-slate-100">
        {category.name}
      </div>
      <div className="text-xs text-slate-500 dark:text-slate-400">
        {category.description}
      </div>

      <div className="mt-2 w-full">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-indigo-100 dark:bg-slate-700">
          <div
            className="h-full bg-indigo-500 transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
          {done} / {total}
        </div>
      </div>
    </button>
  );
}
