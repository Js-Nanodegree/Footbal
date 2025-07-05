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
export interface Team {
  id: number;
  name: string;
  shortName?: string;
  tla?: string;
  crestUrl?: string;
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
  };
  lastUpdated: string;
} 