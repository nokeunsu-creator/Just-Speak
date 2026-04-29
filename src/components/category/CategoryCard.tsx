import type { CategoryMeta } from '../../models/types';

interface Props {
  category: CategoryMeta;
  total: number;
  done: number;
  isLocked: boolean;
  onSelect: () => void;
}

export function CategoryCard({ category, total, done, isLocked, onSelect }: Props) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <button
      onClick={onSelect}
      className="relative flex flex-col items-start gap-2 rounded-2xl border border-indigo-100 bg-white p-4 text-left shadow-sm transition active:scale-[0.98] dark:border-slate-700 dark:bg-slate-800"
      aria-label={`${category.name} 카테고리 ${isLocked ? '(잠금)' : ''}`}
    >
      <div className="flex w-full items-center justify-between">
        <span className="text-3xl">{category.emoji}</span>
        {isLocked && <span className="text-xl" aria-hidden>🔒</span>}
      </div>

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

      {isLocked && (
        <div className="absolute inset-0 rounded-2xl bg-slate-900/40 backdrop-blur-[1px]" aria-hidden />
      )}
      {isLocked && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-slate-900 shadow">
            광고 보고 해금
          </span>
        </div>
      )}
    </button>
  );
}
