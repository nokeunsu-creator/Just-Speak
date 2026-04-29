import { useApp } from '../../state/AppContext';
import { StorageService } from '../../storage/StorageService';
import { CATEGORIES } from '../../models/types';

export function SettingsPage() {
  const { state, dispatch } = useApp();

  const totalDone = Object.values(state.progress).reduce((sum, arr) => sum + arr.length, 0);
  const unlockedCount = state.unlocked.length;

  return (
    <div className="px-4 pb-24 pt-4">
      <h2 className="mb-3 text-xl font-extrabold text-slate-900 dark:text-slate-100">설정</h2>

      <section className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
        <h3 className="mb-3 text-sm font-bold text-slate-500 dark:text-slate-400">학습 통계</h3>
        <div className="grid grid-cols-2 gap-2 text-center">
          <Stat label="총 학습한 문장" value={`${totalDone} / 200`} />
          <Stat label="해금한 카테고리" value={`${unlockedCount} / ${CATEGORIES.filter(c => c.locked).length}`} />
        </div>
      </section>

      <section className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
        <h3 className="mb-3 text-sm font-bold text-slate-500 dark:text-slate-400">음성</h3>

        <Slider
          label={`재생 속도 ${state.settings.ttsRate.toFixed(2)}x`}
          min={0.6} max={1.4} step={0.05}
          value={state.settings.ttsRate}
          onChange={(v) => dispatch({ type: 'UPDATE_SETTINGS', patch: { ttsRate: v } })}
        />
        <Slider
          label={`톤 ${state.settings.ttsPitch.toFixed(2)}`}
          min={0.6} max={1.4} step={0.05}
          value={state.settings.ttsPitch}
          onChange={(v) => dispatch({ type: 'UPDATE_SETTINGS', patch: { ttsPitch: v } })}
        />
        <Slider
          label={`줄 간 간격 ${state.settings.gapMs}ms`}
          min={0} max={2000} step={100}
          value={state.settings.gapMs}
          onChange={(v) => dispatch({ type: 'UPDATE_SETTINGS', patch: { gapMs: v } })}
        />
      </section>

      <section className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
        <h3 className="mb-3 text-sm font-bold text-slate-500 dark:text-slate-400">표시</h3>
        <label className="flex items-center justify-between">
          <span className="text-slate-800 dark:text-slate-200">다크 모드</span>
          <input
            type="checkbox"
            checked={state.settings.dark}
            onChange={(e) => dispatch({ type: 'UPDATE_SETTINGS', patch: { dark: e.target.checked } })}
            className="h-5 w-5 accent-indigo-500"
          />
        </label>
      </section>

      <section className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-900 dark:bg-rose-900/30">
        <h3 className="mb-2 text-sm font-bold text-rose-700 dark:text-rose-300">데이터 초기화</h3>
        <p className="mb-3 text-xs text-rose-700/80 dark:text-rose-300/80">
          진도, 해금 정보, 설정이 모두 삭제됩니다.
        </p>
        <button
          onClick={() => {
            if (confirm('정말 모든 학습 데이터를 초기화할까요?')) {
              StorageService.clearAll();
              dispatch({ type: 'RESET_PROGRESS' });
            }
          }}
          className="rounded-xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-rose-600"
        >
          초기화
        </button>
      </section>

      <p className="mt-6 text-center text-[11px] text-slate-400">v0.1.0 · Just-Speak</p>
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

function Slider({
  label, min, max, step, value, onChange,
}: { label: string; min: number; max: number; step: number; value: number; onChange: (v: number) => void }) {
  return (
    <div className="mb-3 last:mb-0">
      <label className="mb-1 block text-xs text-slate-600 dark:text-slate-300">{label}</label>
      <input
        type="range"
        min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-indigo-500"
      />
    </div>
  );
}
