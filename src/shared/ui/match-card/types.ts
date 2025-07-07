export interface TeamInfo
{
    name: string;
    logo: string; // URL логотипа
}

export interface CompetitionInfo
{
    name: string;
    code: string;
    emblem: string; // URL эмблемы
}

export type MatchCardVariant = 'gradient' | 'white' | 'purple';

export interface MatchCardProps
{
    homeTeam: TeamInfo;
    awayTeam: TeamInfo;
    competition?: CompetitionInfo;
    homeScore: number | string;
    awayScore: number | string;
    league?: string;
    status?: string;
    time?: string;
    stadium?: string;
    isLive?: boolean;
    badgeText?: string;
    badgeColor?: string;
    variant?: MatchCardVariant;
    backgroundLogo?: string; // URL эмблемы для фона
    homeLabel?: string; // подпись Home
    awayLabel?: string; // подпись Away
} 