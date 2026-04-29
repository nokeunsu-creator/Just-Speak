import { t, type Lang } from '../../i18n/strings';

interface Props {
  isPlaying: boolean;
  lang: Lang;
  onClick: () => void;
}

export function ListenButton({ isPlaying, lang, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={[
        'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow transition active:scale-95',
        isPlaying ? 'bg-rose-500 text-white hover:bg-rose-600' : 'bg-indigo-500 text-white hover:bg-indigo-600',
      ].join(' ')}
      aria-label={isPlaying ? t('listenStop', lang) : t('listenStart', lang)}
    >
      {isPlaying ? t('listenStop', lang) : t('listenStart', lang)}
    </button>
  );
}
