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
    duration: string;
    fullTime: {
        home: number | null;
        away: number | null;
    };
    halfTime?: {
        home: number | null;
        away: number | null;
    };
    extraTime?: {
        home: number | null;
        away: number | null;
    };
    penalties?: {
        home: number | null;
        away: number | null;
    };
}

// Match — основная структура матча
// Поддерживает фильтрацию по дате, статусу, venue и сопернику через endpoint getTeamMatches
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

// Goal — гол в матче
export interface Goal {
    minute: number;
    type: string;
    team: MatchTeam;
    scorer: Player;
    assist?: Player;
    score: {
        home: number;
        away: number;
    };
}

// Booking — карточка
export interface Booking {
    minute: number;
    team: MatchTeam;
    player: Player;
    card: 'YELLOW' | 'RED';
}

// Substitution — замена
export interface Substitution {
    minute: number;
    team: MatchTeam;
    playerOut: Player;
    playerIn: Player;
}

// Player — игрок
export interface Player {
    id: number;
    name: string;
    position?: string;
    shirtNumber?: number;
    nationality?: string;
}

// Coach — тренер
export interface Coach {
    id: number;
    name: string;
    nationality?: string;
}

// MatchDetails — расширенная структура матча
export interface MatchDetails extends Match {
    goals: Goal[];
    bookings: Booking[];
    substitutions: Substitution[];
    homeTeam: MatchTeam & {
        lineup: Player[];
        bench: Player[];
        formation?: string;
        coach?: Coach;
    };
    awayTeam: MatchTeam & {
        lineup: Player[];
        bench: Player[];
        formation?: string;
        coach?: Coach;
    };
    // Можно добавить другие поля по необходимости
}

// Типы для истории матчей (seasonMatches)
export interface TeamInfo
{
    id: number;
    name: string;
    shortName?: string;
    tla?: string;
    crest?: string;
}

export interface ScoreTime
{
    home: number | null;
    away: number | null;
}

export interface MatchScore
{
    winner: string | null;
    duration: string;
    fullTime: ScoreTime;
    halfTime?: ScoreTime;
    extraTime?: ScoreTime;
    penalties?: ScoreTime;
}

export interface AreaInfo
{
    id: number;
    name: string;
    code: string;
    flag?: string;
}

export interface CompetitionInfo
{
    id: number;
    name: string;
    code: string;
    type?: string;
    emblem?: string;
}

export interface SeasonInfo
{
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday?: number;
    winner?: string | null;
}

export interface MatchHistoryItem
{
    area: AreaInfo;
    competition: CompetitionInfo;
    season: SeasonInfo;
    id: number;
    utcDate: string;
    status: 'SCHEDULED' | 'TIMED' | 'IN_PLAY' | 'PAUSED' | 'FINISHED' | 'POSTPONED' | string;
    matchday?: number;
    stage?: string;
    group?: string | null;
    lastUpdated?: string;
    homeTeam: TeamInfo;
    awayTeam: TeamInfo;
    score: MatchScore;
    odds?: { msg?: string };
    referees?: any[];
}

// Ответ на /teams/{teamId}/matches?opponent={opponentId}
export interface TeamMatchesApiResponse
{
    filters: {
        competitions?: string;
        permission?: string;
        limit?: number;
    };
    resultSet: {
        count: number;
        competitions: string;
        first: string;
        last: string;
        played: number;
        wins: number;
        draw: number;
        losses: number;
    };
    matches: Match[];
} 