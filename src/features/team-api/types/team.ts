// TeamVenue — стадион
export interface TeamVenue {
  id?: number;
  name: string;
  city?: string;
  country?: string;
  capacity?: number;
}

// TeamCoach — тренер
export interface TeamCoach {
  id: number;
  name: string;
  nationality?: string;
  dateOfBirth?: string;
}

// TeamSquadMember — игрок команды
export interface TeamSquadMember {
  id: number;
  name: string;
  position?: string;
  dateOfBirth?: string;
  nationality?: string;
  shirtNumber?: number;
  role?: string;
}

// Team — основная структура команды
// История матчей доступна с фильтрацией по дате, статусу, venue и сопернику через getTeamMatches
export interface Team {
  id: number;
  name: string;
  shortName?: string;
  tla?: string;
  crest?: string;
  address?: string;
  phone?: string;
  website?: string;
  email?: string;
  founded?: number;
  clubColors?: string;
  venue?: string;
  coach?: TeamCoach;
  squad?: TeamSquadMember[];
  area?: {
    id: number;
    name: string;
    code?: string;
    flag?: string;
  };
  lastUpdated: string;
} 