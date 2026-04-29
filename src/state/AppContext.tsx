import { createContext, useContext, useEffect, useReducer, type ReactNode } from 'react';
import type { AppState, Settings, Tab } from '../models/types';
import { DEFAULT_SETTINGS } from '../models/types';
import { StorageService, debouncedSave, flushDebouncedSave } from '../storage/StorageService';

type Action =
  | { type: 'SET_TAB'; tab: Tab }
  | { type: 'OPEN_CATEGORY'; categoryId: string }
  | { type: 'CLOSE_CATEGORY' }
  | { type: 'MARK_VIEWED'; categoryId: string; dialogueId: number }
  | { type: 'UPDATE_SETTINGS'; patch: Partial<Settings> }
  | { type: 'COMPLETE_ONBOARDING' }
  | { type: 'RESET_PROGRESS' };

function initialState(): AppState {
  return {
    tab: 'list',
    currentCategory: null,
    progress: StorageService.loadProgress(),
    settings: StorageService.loadSettings(),
    onboarded: StorageService.loadOnboarded(),
  };
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_TAB':
      return { ...state, tab: action.tab };

    case 'OPEN_CATEGORY':
      return { ...state, tab: 'study', currentCategory: action.categoryId };

    case 'CLOSE_CATEGORY':
      return { ...state, tab: 'list', currentCategory: null };

    case 'MARK_VIEWED': {
      const seen = state.progress[action.categoryId] ?? [];
      if (seen.includes(action.dialogueId)) return state;
      return {
        ...state,
        progress: { ...state.progress, [action.categoryId]: [...seen, action.dialogueId] },
      };
    }

    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.patch } };

    case 'COMPLETE_ONBOARDING':
      return { ...state, onboarded: true };

    case 'RESET_PROGRESS':
      return {
        ...state,
        progress: {},
        settings: { ...DEFAULT_SETTINGS },
        onboarded: false,
      };

    default:
      return state;
  }
}

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);

  useEffect(() => {
    debouncedSave(() => {
      StorageService.saveProgress(state.progress);
      StorageService.saveSettings(state.settings);
      StorageService.saveOnboarded(state.onboarded);
    });
  }, [state.progress, state.settings, state.onboarded]);

  useEffect(() => {
    const flushOnExit = () => {
      flushDebouncedSave();
      StorageService.saveProgress(state.progress);
      StorageService.saveSettings(state.settings);
      StorageService.saveOnboarded(state.onboarded);
    };
    window.addEventListener('beforeunload', flushOnExit);
    return () => window.removeEventListener('beforeunload', flushOnExit);
  }, [state]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
