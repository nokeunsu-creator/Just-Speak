import { useApp } from '../../state/AppContext';
import { StorageService, todayKey } from '../../storage/StorageService';
import { CATEGORIES } from '../../models/types';
import dialogues from '../../data/dialogues.json';
import type { Dialogue } from '../../models/types';
import { goBack } from '../../hooks/useAndroidBack';
import { t } from '../../i18n/strings';

const DATA = dialogues as Dialogue[];
const TOTAL_LINES = DATA.length;

function computeStreak(stats: { date: string; count: number }[]): number {
  if (!stats.length) return 0;
  const dates = new Set(stats.filter((s) => s.count > 0).map((s) => s.date));
  let streak = 0;
  const cur = new Date();
  for (let i = 0; i < 365; i++) {
    const k = `${cur.getFullYear()}-${String(cur.getMonth() + 1).padStart(2, '0')}-${String(cur.getDate()).padStart(2, '0')}`;
    if (dates.has(k)) {
      streak++;
      cur.setDate(cur.getDate() - 1);
    } else {
      // 오늘이 비어있어도 streak는 어제까지 이어진 게 있을 수 있으니 한 번만 허용
      if (i === 0) {
        cur.setDate(cur.getDate() - 1);
        continue;
      }
      break;
    }
  }
  return streak;
}

function last7Days(stats: { date: string; count: number }[]): { date: string; count: number }[] {
  const map = new Map(stats.map((s) => [s.date, s.count]));
  const out: { date: string; count: number }[] = [];
  const cur = new Date();
  cur.setDate(cur.getDate() - 6);
  for (let i = 0; i < 7; i++) {
    const k = `${cur.getFullYear()}-${String(cur.getMonth() + 1).padStart(2, '0')}-${String(cur.getDate()).padStart(2, '0')}`;
    out.push({ date: k, count: map.get(k) ?? 0 });
    cur.setDate(cur.getDate() + 1);
  }
  return out;
}

export function SettingsPage() {
  const { state, dispatch } = useApp();
  const lang = state.settings.language;

  const totalDone = Object.values(state.progress).reduce((sum, arr) => sum + arr.length, 0);
  const streak = computeStreak(state.dailyStats);
  const last7 = last7Days(state.dailyStats);
  const max7 = Math.max(1, ...last7.map((s) => s.count));
  const today = todayKey();

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
            {t('settingsTitle', lang)}
          </h2>
          <span className="w-12" />
        </div>
      </div>

      <section className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
        <h3 className="mb-3 text-sm font-bold text-slate-500 dark:text-slate-400">{t('settingsStats', lang)}</h3>
        <div className="mb-3 grid grid-cols-2 gap-2 text-center">
          <Stat label={t('settingsTotal', lang)} value={`${totalDone} / ${TOTAL_LINES}`} />
          <Stat label={t('settingsFavorites', lang)} value={`${state.favorites.length}`} />
          <Stat label={`${t('settingsStreak', lang)} (${t('daysUnit', lang)})`} value={`${streak}`} />
          <Stat label={t('settingsCategories', lang)} value={`${CATEGORIES.length}`} />
        </div>
        <h4 className="mb-2 text-xs font-bold text-slate-500 dark:text-slate-400">{t('settingsActivity', lang)}</h4>
        <div className="flex h-16 items-end gap-1.5">
          {last7.map((s) => {
            const h = Math.round((s.count / max7) * 100);
            const isToday = s.date === today;
            const dayLabel = s.date.slice(8);
            return (
              <div key={s.date} className="flex flex-1 flex-col items-center gap-1">
                <div className="flex h-12 w-full items-end">
                  <div
                    className={`w-full rounded-t ${isToday ? 'bg-indigo-500' : 'bg-indigo-300 dark:bg-indigo-700'}`}
                    style={{ height: `${Math.max(4, h)}%` }}
                    title={`${s.date}: ${s.count}`}
                  />
                </div>
                <span className="text-[9px] text-slate-500 dark:text-slate-400">{dayLabel}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
        <h3 className="mb-3 text-sm font-bold text-slate-500 dark:text-slate-400">{t('settingsVoice', lang)}</h3>
        <Slider
          label={`${t('settingsRate', lang)} ${state.settings.ttsRate.toFixed(2)}x`}
          min={0.6} max={1.4} step={0.05} value={state.settings.ttsRate}
          onChange={(v) => dispatch({ type: 'UPDATE_SETTINGS', patch: { ttsRate: v } })}
        />
        <Slider
          label={`${t('settingsPitch', lang)} ${state.settings.ttsPitch.toFixed(2)}`}
          min={0.6} max={1.4} step={0.05} value={state.settings.ttsPitch}
          onChange={(v) => dispatch({ type: 'UPDATE_SETTINGS', patch: { ttsPitch: v } })}
        />
        <Slider
          label={`${t('settingsGap', lang)} ${state.settings.gapMs}ms`}
          min={0} max={2000} step={100} value={state.settings.gapMs}
          onChange={(v) => dispatch({ type: 'UPDATE_SETTINGS', patch: { gapMs: v } })}
        />
      </section>

      <section className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
        <h3 className="mb-3 text-sm font-bold text-slate-500 dark:text-slate-400">{t('settingsDisplay', lang)}</h3>
        <label className="mb-2 flex items-center justify-between">
          <span className="text-slate-800 dark:text-slate-200">{t('settingsDark', lang)}</span>
          <input
            type="checkbox"
            checked={state.settings.dark}
            onChange={(e) => dispatch({ type: 'UPDATE_SETTINGS', patch: { dark: e.target.checked } })}
            className="h-5 w-5 accent-indigo-500"
          />
        </label>

        <div className="flex items-center justify-between">
          <span className="text-slate-800 dark:text-slate-200">{t('settingsLanguage', lang)}</span>
          <div className="inline-flex overflow-hidden rounded-full bg-slate-100 text-xs dark:bg-slate-700">
            {(['ko', 'en'] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => dispatch({ type: 'UPDATE_SETTINGS', patch: { language: opt } })}
                className={`px-3 py-1 ${state.settings.language === opt ? 'bg-indigo-500 text-white' : 'text-slate-600 dark:text-slate-300'}`}
              >
                {opt === 'ko' ? '한국어' : 'English'}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-900 dark:bg-rose-900/30">
        <h3 className="mb-2 text-sm font-bold text-rose-700 dark:text-rose-300">{t('settingsReset', lang)}</h3>
        <p className="mb-3 text-xs text-rose-700/80 dark:text-rose-300/80">{t('settingsResetWarning', lang)}</p>
        <button
          onClick={() => {
            if (confirm(t('settingsResetConfirm', lang))) {
              StorageService.clearAll();
              dispatch({ type: 'RESET_PROGRESS' });
            }
          }}
          className="rounded-xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-rose-600"
        >
          {t('settingsResetButton', lang)}
        </button>
      </section>

      <p className="mt-6 text-center text-[11px] text-slate-400">v0.4.0 · Just-Speak</p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-indigo-50 p-3 dark:bg-slate-700">
      <div className="text-lg font-bold text-indigo-700 dark:text-indigo-300">{value}</div>
      <div className="text-xs text-slate-500 dark:text-slate-400">{label}</div>
    </div>
  );
}

function Slider({ label, min, max, step, value, onChange }: {
  label: string; min: number; max: number; step: number; value: number; onChange: (v: number) => void;
}) {
  return (
    <div className="mb-3 last:mb-0">
      <label className="mb-1 block text-xs text-slate-600 dark:text-slate-300">{label}</label>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-indigo-500"
      />
    </div>
  );
}
