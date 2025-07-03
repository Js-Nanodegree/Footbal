export interface Match
{
    id: number;
    utcDate: string;
    competition: {
        name: string;
    };
    homeTeam: {
        id: number;
        name: string;
    };
    awayTeam: {
        id: number;
        name: string;
    };
} 