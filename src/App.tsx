import { useEffect } from 'react';
import { useApp } from './state/AppContext';
import { CategoryList } from './components/category/CategoryList';
import { DialogueScreen } from './components/dialogue/DialogueScreen';
import { SettingsPage } from './components/settings/SettingsPage';
import { Welcome } from './components/onboarding/Welcome';

export function App() {
  const { state, dispatch } = useApp();

  // dark mode → html class
  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.settings.dark);
  }, [state.settings.dark]);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/85 backdrop-blur dark:border-slate-700 dark:bg-slate-900/85">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400">
            Just-Speak
          </h1>
          <span className="text-xs text-slate-500 dark:text-slate-400">상황별 영어 쉐도잉</span>
        </div>
      </header>

      <main className="flex-1">
        {state.tab === 'list' && <CategoryList />}
        {state.tab === 'study' && <DialogueScreen />}
        {state.tab === 'settings' && <SettingsPage />}
      </main>

      <nav
        className="sticky bottom-0 z-20 grid grid-cols-2 border-t border-slate-200 bg-white/95 backdrop-blur dark:border-slate-700 dark:bg-slate-900/95"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <TabButton
          active={state.tab !== 'settings'}
          label="📚 학습"
          onClick={() => dispatch({ type: 'SET_TAB', tab: 'list' })}
        />
        <TabButton
          active={state.tab === 'settings'}
          label="⚙️ 설정"
          onClick={() => dispatch({ type: 'SET_TAB', tab: 'settings' })}
        />
      </nav>

      {!state.onboarded && (
        <Welcome onClose={() => dispatch({ type: 'COMPLETE_ONBOARDING' })} />
      )}
    </div>
  );
}

function TabButton({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={[
        'py-3 text-sm font-semibold transition',
        active ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400',
      ].join(' ')}
    >
      {label}
    </button>
  );
}
