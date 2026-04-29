import { useMemo, useState } from 'react';
import dialogues from '../../data/dialogues.json';
import type { Dialogue } from '../../models/types';
import { CATEGORIES } from '../../models/types';
import { useApp } from '../../state/AppContext';
import { CategoryCard } from './CategoryCard';
import { RewardedModal } from '../ads/RewardedModal';

const DATA = dialogues as Dialogue[];

export function CategoryList() {
  const { state, dispatch } = useApp();
  const [pendingUnlock, setPendingUnlock] = useState<string | null>(null);

  const totals = useMemo(() => {
    const map: Record<string, number> = {};
    for (const d of DATA) {
      map[d.category] = (map[d.category] ?? 0) + 1;
    }
    return map;
  }, []);

  const handleSelect = (categoryId: string) => {
    const meta = CATEGORIES.find((c) => c.id === categoryId);
    if (!meta) return;
    const isLocked = meta.locked && !state.unlocked.includes(categoryId);
    if (isLocked) {
      setPendingUnlock(categoryId);
      return;
    }
    dispatch({ type: 'OPEN_CATEGORY', categoryId });
  };

  const handleUnlocked = (categoryId: string) => {
    dispatch({ type: 'UNLOCK', categoryId });
    setPendingUnlock(null);
    dispatch({ type: 'OPEN_CATEGORY', categoryId });
  };

  return (
    <div className="px-4 pb-24 pt-4">
      <header className="mb-4">
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
          상황별 영어 쉐도잉
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          따라 말하면서 입에 익혀보세요. 카드를 탭해 학습을 시작합니다.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3">
        {CATEGORIES.map((cat) => {
          const total = totals[cat.id] ?? 0;
          const done = (state.progress[cat.id] ?? []).length;
          const isLocked = cat.locked && !state.unlocked.includes(cat.id);
          return (
            <CategoryCard
              key={cat.id}
              category={cat}
              total={total}
              done={done}
              isLocked={isLocked}
              onSelect={() => handleSelect(cat.id)}
            />
          );
        })}
      </div>

      {pendingUnlock && (
        <RewardedModal
          categoryName={CATEGORIES.find((c) => c.id === pendingUnlock)?.name ?? ''}
          onClose={() => setPendingUnlock(null)}
          onRewarded={() => handleUnlocked(pendingUnlock)}
        />
      )}
    </div>
  );
}
