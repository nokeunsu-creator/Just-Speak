import { LEARNING_STEPS, BEGINNER_PICKS, CATEGORIES } from '../../models/types';

interface Props {
  onClose: () => void;
}

export function Welcome({ onClose }: Props) {
  const picks = CATEGORIES.filter((c) => BEGINNER_PICKS.includes(c.id));

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4"
    >
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-800">
        <h2 className="mb-1 text-xl font-extrabold text-slate-900 dark:text-slate-100">
          Just-Speak에 오신 걸 환영해요 👋
        </h2>
        <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
          25개 실전 상황으로 영어 회화를 입에 익혀보세요.
        </p>

        <section className="mb-4">
          <h3 className="mb-2 text-sm font-bold text-slate-700 dark:text-slate-200">🪜 학습 4단계 (쉐도잉)</h3>
          <ol className="space-y-2">
            {LEARNING_STEPS.map((s) => (
              <li key={s.num} className="flex gap-2 text-sm">
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
        </section>

        <section className="mb-5 rounded-xl bg-amber-50 p-3 dark:bg-amber-900/30">
          <h3 className="mb-1 text-xs font-bold text-amber-700 dark:text-amber-300">🌱 처음이라면</h3>
          <p className="mb-2 text-xs text-amber-800/90 dark:text-amber-200/90">
            가벼운 일상 회화부터 시작해보세요.
          </p>
          <div className="flex flex-wrap gap-1">
            {picks.map((p) => (
              <span
                key={p.id}
                className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-amber-700 shadow-sm dark:bg-slate-800 dark:text-amber-300"
              >
                {p.emoji} {p.name}
              </span>
            ))}
          </div>
        </section>

        <button
          onClick={onClose}
          className="w-full rounded-xl bg-indigo-500 py-3 text-base font-semibold text-white shadow hover:bg-indigo-600"
        >
          시작하기
        </button>
      </div>
    </div>
  );
}
