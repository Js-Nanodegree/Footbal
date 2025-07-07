// CompetitionArea — страна или регион проведения
export interface CompetitionArea {
  id: number;
  name: string;
  code?: string;
  flag?: string;
}

// CompetitionSeason — информация о сезоне
export interface CompetitionSeason {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday?: number | null;
  winner?: unknown | null;
}

// Competition — основная структура соревнования
export interface Competition {
  id: number;
  area: CompetitionArea;
  name: string;
  code?: string;
  type?: string;
  emblem?: string;
  plan?: string;
  currentSeason?: CompetitionSeason;
  numberOfAvailableSeasons?: number;
  lastUpdated: string;
}

// Краткая информация о команде (для winner)
export interface TeamShort {
  id: number;
  name: string;
  crestUrl?: string;
}

// Типы для турниров (Competition) и регионов (Area)
export interface Area {
  id: number;
  name: string;
  code?: string;
  flag?: string;
}

export interface Competition
{
  id: number;
  area: Area;
  name: string;
  code: string;
  type?: string;
  emblem?: string;
  plan?: string;
  currentSeason?: CompetitionSeason;
  numberOfAvailableSeasons?: number;
  lastUpdated: string;
} 