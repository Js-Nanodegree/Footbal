import { useCallback, useEffect, useMemo, useState } from 'react';
import { MMKV } from 'react-native-mmkv';
import React from 'react';
const MAX_SELECTION = 6;

export function useTeamListSelection( allTeamIds: string[], initialSelectedIds: string[] = [] )
{
  const [ selectedIds, setSelectedIds ] = useState<string[]>( initialSelectedIds );
  const [dragging, setDragging] = useState(false);

  // Выбрать команду
  const select = useCallback((id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id) || prev.length >= MAX_SELECTION) return prev;
      return [...prev, id];
    });
  }, []);

  // Снять выбор
  const unselect = useCallback((id: string) => {
    setSelectedIds((prev) => prev.filter((x) => x !== id));
  }, []);

  // Переместить выбранную команду (drag&drop)
  const reorder = useCallback((fromIdx: number, toIdx: number) => {
    setSelectedIds((prev) => {
      const arr = [...prev];
      const [item] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, item);
      return arr;
    });
  }, []);

  // Можно ли выбрать ещё?
  const canSelectMore = selectedIds.length < MAX_SELECTION;

  // Disable id если лимит и не выбран
  const isDisabled = useCallback(
    (id: string) => !selectedIds.includes(id) && !canSelectMore,
    [selectedIds, canSelectMore]
  );

  // Сбросить всё
  const reset = useCallback(() => setSelectedIds([]), []);

  return {
    selectedIds,
    select,
    unselect,
    reorder,
    isDisabled,
    canSelectMore,
    dragging,
    setDragging,
    reset,
  };
} 