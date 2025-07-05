// MatchTeam — информация о команде в матче
export interface MatchTeam {
    id: number;
    name: string;
    crestUrl?: string;
}

// MatchScore — счёт матча
export interface MatchScore {
    winner?: 'HOME_TEAM' | 'AWAY_TEAM' | 'DRAW' | null;
    fullTime: {
        homeTeam: number | null;
        awayTeam: number | null;
    };
    halfTime?: {
        homeTeam: number | null;
        awayTeam: number | null;
    };
}

// MatchEvent — событие матча (упрощённо)
export interface MatchEvent {
    id: number;
    type: string;
    minute: number;
    team: MatchTeam;
    player?: Player;
    assist?: Player;
}

// Match — основная структура матча
export interface Match {
    id: number;
    competition: {
        id: number;
        name: string;
    };
    season: {
        id: number;
        startDate: string;
        endDate: string;
    };
    utcDate: string;
    status: string;
    matchday?: number;
    stage?: string;
    group?: string;
    homeTeam: MatchTeam;
    awayTeam: MatchTeam;
    score: MatchScore;
    events?: MatchEvent[];
    lastUpdated: string;
} 