// StandingTeam — команда в таблице
export interface StandingTeam {
  id: number;
  name: string;
  crestUrl?: string;
}

// StandingTable — строка таблицы
export interface StandingTable {
  position: number;
  team: StandingTeam;
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

// Standing — основная структура таблицы
export interface Standing {
  stage: string;
  type: string;
  group?: string;
  table: TableEntry[];
}

export interface TeamStandingInfo
{
  id: number;
  name: string;
  crest?: string;
}

export interface TableEntry
{
  position: number;
  team: TeamStandingInfo;
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
} 