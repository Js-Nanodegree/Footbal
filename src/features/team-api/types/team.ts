export interface Team
{
    id: number;
    name: string;
    crestUrl: string;
    shortName?: string;
    tla?: string;
    area?: {
        name: string;
    };
} 