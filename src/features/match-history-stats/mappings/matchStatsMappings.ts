// Маппинги и форматтеры для статистики матча

export const durationMap: Record<string, string> = {
  REGULAR: 'Основное время',
  EXTRA_TIME: 'Доп. время',
  PENALTY_SHOOTOUT: 'Пенальти',
};

export const stageMap: Record<string, string> = {
  REGULAR_SEASON: 'Регулярный сезон',
  GROUP_STAGE: 'Групповой этап',
  PLAYOFFS: 'Плей-офф',
  FINAL: 'Финал',
  SEMI_FINALS: 'Полуфинал',
  QUARTER_FINALS: 'Четвертьфинал',
  LAST_16: '1/8 финала',
  LAST_32: '1/16 финала',
  LAST_64: '1/32 финала',
  THIRD_PLACE: 'Матч за 3-е место',
};

export function formatSeason(start: string, end: string): string {
  const [sy, sm, sd] = start.split('-');
  const [ey, em, ed] = end.split('-');
  if (sy === ey) {
    return `${sy}, ${sd}.${sm} — ${ed}.${em}`;
  }
  return `${sd}.${sm}.${sy} — ${ed}.${em}.${ey}`;
}

export function formatStage(stage?: string): string {
  if (!stage) return '';
  if (stageMap[stage]) return stageMap[stage];
  return stage
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase())
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase());
} 