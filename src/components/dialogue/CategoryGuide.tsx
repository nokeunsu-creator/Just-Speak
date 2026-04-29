import { useState } from 'react';
import type { CategoryMeta } from '../../models/types';
import { LEARNING_STEPS } from '../../models/types';

interface Props {
  meta: CategoryMeta;
}

export function CategoryGuide({ meta }: Props) {
  const [open, setOpen] = useState(true);

  return (
    <section className="mb-3 overflow-hidden rounded-2xl border border-indigo-100 bg-indigo-50/50 dark:border-slate-700 dark:bg-slate-800/60">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
        aria-expanded={open}
        aria-controls="category-guide-body"
      >
        <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300">
          📖 학습 가이드 — {meta.name}
        </span>
        <span className="text-xs text-indigo-700/70 dark:text-indigo-300/70">
          {open ? '접기 ▴' : '펼치기 ▾'}
        </span>
      </button>

      {open && (
        <div id="category-guide-body" className="border-t border-indigo-100 px-4 py-3 dark:border-slate-700">
          <div className="mb-3">
            <h4 className="mb-1 text-xs font-bold text-slate-500 dark:text-slate-400">
              🎬 어떤 상황인가요?
            </h4>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              {meta.situation}
            </p>
          </div>

          <div className="mb-3">
            <h4 className="mb-1 text-xs font-bold text-slate-500 dark:text-slate-400">
              ⭐ 핵심 표현
            </h4>
            <ul className="space-y-1">
              {meta.keyPhrases.map((p, i) => (
                <li key={i} className="rounded-lg bg-white px-2 py-1 text-xs dark:bg-slate-800">
                  <span className="font-semibold text-indigo-700 dark:text-indigo-300">{p.en}</span>
                  <span className="mx-1 text-slate-400">·</span>
                  <span className="text-slate-600 dark:text-slate-300">{p.ko}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-1 text-xs font-bold text-slate-500 dark:text-slate-400">
              🪜 학습 4단계 (쉐도잉)
            </h4>
            <ol className="space-y-1.5">
              {LEARNING_STEPS.map((s) => (
                <li key={s.num} className="flex gap-2 text-xs">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold text-white">
                    {s.num}
                  </span>
                  <span className="leading-relaxed text-slate-700 dark:text-slate-200">
                    <strong className="text-slate-900 dark:text-slate-100">{s.title}</strong>
                    {' — '}
                    {s.desc}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </section>
  );
}
