import { useTranslation } from 'react-i18next';
// Маппинги и форматтеры для статистики матча

export const useMatchStatsMappings = () => {
  const { t } = useTranslation();
  const durationMap: Record<string, string> = {
    REGULAR: t('matchStats.duration.REGULAR'),
    EXTRA_TIME: t('matchStats.duration.EXTRA_TIME'),
    PENALTY_SHOOTOUT: t('matchStats.duration.PENALTY_SHOOTOUT'),
  };
  const stageMap: Record<string, string> = {
    REGULAR_SEASON: t('matchStats.stage.REGULAR_SEASON'),
    GROUP_STAGE: t('matchStats.stage.GROUP_STAGE'),
    PLAYOFFS: t('matchStats.stage.PLAYOFFS'),
    FINAL: t('matchStats.stage.FINAL'),
    SEMI_FINALS: t('matchStats.stage.SEMI_FINALS'),
    QUARTER_FINALS: t('matchStats.stage.QUARTER_FINALS'),
    LAST_16: t('matchStats.stage.LAST_16'),
    LAST_32: t('matchStats.stage.LAST_32'),
    LAST_64: t('matchStats.stage.LAST_64'),
    THIRD_PLACE: t('matchStats.stage.THIRD_PLACE'),
  };
  return { durationMap, stageMap };
};

export function formatSeason(start: string, end: string): string {
  const [sy, sm, sd] = start.split('-');
  const [ey, em, ed] = end.split('-');
  if (sy === ey) {
    return `${sy}, ${sd}.${sm} — ${ed}.${em}`;
  }
  return `${sd}.${sm}.${sy} — ${ed}.${em}.${ey}`;
}

export function formatStage( stage?: string, stageMap: Record<string, string> ): string
{
  if (!stage) return '';
  if (stageMap[stage]) return stageMap[stage];
  return stage
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase())
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase());
} 