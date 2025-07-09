import React, { useState, useCallback } from 'react';
import { RefreshControl } from 'react-native';
import { useTranslation } from 'react-i18next';

interface UsePullToRefreshProps {
  onRefresh: () => Promise<void> | void;
  timeout?: number;
  title?: string;
  colors?: string[];
}

interface UsePullToRefreshResult {
  refreshing: boolean;
  refreshControl: React.ReactElement<any>;
  onRefresh: () => void;
}

export const usePullToRefresh = ({
  onRefresh,
  timeout = 1200,
  title ,
  colors = ['#FF2D7A'],
}: UsePullToRefreshProps): UsePullToRefreshResult => {
  const [refreshing, setRefreshing] = useState(false);
  const { t } = useTranslation();

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await onRefresh();
    } catch (e) {
      // Можно добавить обработку ошибок
    } finally {
      setTimeout(() => setRefreshing(false), timeout);
    }
  }, [onRefresh, timeout]);

  const refreshControl = (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={handleRefresh}
      colors={colors}
      tintColor={colors[0]}
      title={title||t('pullToRefresh.title')}
      titleColor={colors[0]}
    />
  );

  return {
    refreshing,
    refreshControl,
    onRefresh: handleRefresh,
  };
};
