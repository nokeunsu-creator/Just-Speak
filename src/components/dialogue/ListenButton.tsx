interface Props {
  isPlaying: boolean;
  onClick: () => void;
}

export function ListenButton({ isPlaying, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={[
        'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow transition active:scale-95',
        isPlaying
          ? 'bg-rose-500 text-white hover:bg-rose-600'
          : 'bg-indigo-500 text-white hover:bg-indigo-600',
      ].join(' ')}
      aria-label={isPlaying ? '재생 중지' : '전체 자동 재생'}
    >
      {isPlaying ? '⏸ 정지' : '▶ Listen'}
    </button>
  );
}
