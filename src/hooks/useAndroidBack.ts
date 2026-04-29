import { useEffect } from 'react';
import type { AppState } from '../models/types';

/**
 * Android(또는 브라우저) 뒤로가기 = 앱 내 화면 뒤로가기 매핑.
 *
 * 동작 모델:
 *  - state.tab !== 'list' (study/settings/favorites 등) 또는 onboarded=false 일 때 = "inner"
 *  - inner 진입 시 history에 layer 한 칸 추가 (pushState)
 *  - 뒤로가기 시(popstate) inner 상태에 맞춰 dispatch로 닫기
 *  - 앱 내 ← 뒤로 / 시작하기 / 모달 닫기 버튼은 history.back()으로 일원화
 *  - inner들 사이 전환 시(study↔settings)에는 history 깊이 1 유지 (replace 없음, 그냥 layer 그대로)
 *
 * TWA로 Android 패키징해도 시스템 뒤로가기가 popstate를 트리거하므로 동일 동작.
 */
export function useAndroidBack(state: AppState, dispatch: React.Dispatch<any>) {
  const isInner = state.tab !== 'list' || !state.onboarded;

  useEffect(() => {
    if (isInner) {
      if (window.history.state?.layer !== 'inner') {
        window.history.pushState({ layer: 'inner' }, '');
      }
    }
  }, [isInner]);

  useEffect(() => {
    const onPopState = () => {
      if (!state.onboarded) {
        dispatch({ type: 'COMPLETE_ONBOARDING' });
        return;
      }
      if (state.tab === 'study') {
        dispatch({ type: 'CLOSE_CATEGORY' });
        return;
      }
      if (state.tab === 'settings') {
        dispatch({ type: 'SET_TAB', tab: 'list' });
        return;
      }
      if (state.tab === 'favorites') {
        dispatch({ type: 'SET_TAB', tab: 'list' });
        return;
      }
      // list 탭에서는 처리 안 함 → TWA가 앱 종료 흐름
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [state.tab, state.onboarded, dispatch]);
}

/** ← 뒤로 / 시작하기 / 모달 닫기 등 모든 닫기 동작에서 호출. */
export function goBack(): void {
  window.history.back();
}
