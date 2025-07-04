export interface MatchTeamInfo
{
    name: string;
    logo: string;
}

export interface MatchInfoCardProps
{
    homeTeam: MatchTeamInfo;
    awayTeam: MatchTeamInfo;
    time: string;
    date?: string;
    stadium?: string;
    style?: any;
} 