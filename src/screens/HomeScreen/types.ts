export interface HomeScreenProps
{
    matches: Array<{
        id: number;
        homeTeam: { name: string; logo: string };
        awayTeam: { name: string; logo: string };
        homeScore: number | string;
        awayScore: number | string;
        league?: string;
        time?: string;
        stadium?: string;
        backgroundLogo?: string;
    }>;
    competitions: Array<{
        id: number;
        name: string;
        area?: { name: string };
        emblemUrl?: string;
        emblem?: string;
    }>;
    teams: Array<{
        id: number;
        name: string;
        area?: { name: string };
        crestUrl?: string;
    }>;
    loading: boolean;
    error?: string | null;
    search: string;
    onSearchChange: ( text: string ) => void;
} 