interface Props {
  onClose: () => void;
}

export function Welcome({ onClose }: Props) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-800">
        <h2 className="mb-2 text-xl font-extrabold text-slate-900 dark:text-slate-100">
          Just-Speak에 오신 걸 환영해요 👋
        </h2>
        <ul className="mb-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <li>• 카드를 탭해 카테고리 학습 시작</li>
          <li>• 영문을 탭하면 한글 해석이 보여요</li>
          <li>• 🔊 듣기로 한 줄씩, ▶ Listen으로 자동 재생</li>
          <li>• 🔒 카테고리는 광고 시청 후 해금</li>
        </ul>
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
