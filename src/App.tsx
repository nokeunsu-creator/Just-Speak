import { useEffect } from 'react';
import { useApp } from './state/AppContext';
import { CategoryList } from './components/category/CategoryList';
import { DialogueScreen } from './components/dialogue/DialogueScreen';
import { SettingsPage } from './components/settings/SettingsPage';
import { Welcome } from './components/onboarding/Welcome';
import { FavoritesView } from './components/favorites/FavoritesView';
import { useAndroidBack, goBack } from './hooks/useAndroidBack';
import { t } from './i18n/strings';

export function App() {
  const { state, dispatch } = useApp();
  const lang = state.settings.language;

  useAndroidBack(state, dispatch);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.settings.dark);
  }, [state.settings.dark]);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-violet-50 backdrop-blur dark:border-slate-700 dark:from-slate-900 dark:to-slate-800">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400">
              {t('appTitle', lang)}
            </h1>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">{t('appTagline', lang)}</span>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {state.tab === 'list' && <CategoryList />}
        {state.tab === 'study' && <DialogueScreen />}
        {state.tab === 'favorites' && <FavoritesView />}
        {state.tab === 'settings' && <SettingsPage />}
      </main>

      <nav
        className="sticky bottom-0 z-20 grid grid-cols-3 border-t border-slate-200 bg-white/95 backdrop-blur dark:border-slate-700 dark:bg-slate-900/95"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <TabButton
          active={state.tab === 'list' || state.tab === 'study'}
          label={t('tabLearn', lang)}
          onClick={() => {
            if (state.tab !== 'list') goBack();
          }}
        />
        <TabButton
          active={state.tab === 'favorites'}
          label={t('tabFavorites', lang)}
          onClick={() => dispatch({ type: 'SET_TAB', tab: 'favorites' })}
        />
        <TabButton
          active={state.tab === 'settings'}
          label={t('tabSettings', lang)}
          onClick={() => dispatch({ type: 'SET_TAB', tab: 'settings' })}
        />
      </nav>

      {!state.onboarded && <Welcome />}
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
