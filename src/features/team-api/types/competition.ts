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
  currentMatchday?: number;
  winner?: TeamShort;
}

// Competition — основная структура соревнования
export interface Competition {
  id: number;
  area: CompetitionArea;
  name: string;
  code: string;
  emblemUrl?: string;
  plan?: string;
  currentSeason?: CompetitionSeason;
  seasons?: CompetitionSeason[];
  numberOfAvailableSeasons?: number;
  lastUpdated: string;
}

// Краткая информация о команде (для winner)
export interface TeamShort {
  id: number;
  name: string;
  crestUrl?: string;
} 