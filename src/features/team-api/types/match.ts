// MatchTeam — информация о команде в матче
export interface MatchTeam {
    id: number;
    name: string;
    shortName?: string;
    tla?: string;
    crest?: string;
}

// MatchScore — счёт матча
export interface MatchScore {
    winner: string | null;
    duration: string | null;
    fullTime: {
        home: number | null;
        away: number | null;
    };
    halfTime: {
        home: number | null;
        away: number | null;
    };
}

// Match — основная структура матча
export interface Match {
    id: number;
    area: {
        id: number;
        name: string;
        code?: string;
        flag?: string;
    };
    competition: {
        id: number;
        name: string;
        code?: string;
        type?: string;
        emblem?: string;
    };
    season: {
        id: number;
        startDate: string;
        endDate: string;
        currentMatchday?: number | null;
        winner?: unknown | null;
    };
    utcDate: string;
    status: string;
    matchday?: number | null;
    stage?: string | null;
    group?: string | null;
    lastUpdated: string;
    homeTeam: MatchTeam;
    awayTeam: MatchTeam;
    score: MatchScore;
    odds?: { msg?: string };
    referees: unknown[];
} 