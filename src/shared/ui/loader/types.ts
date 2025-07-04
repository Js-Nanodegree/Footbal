export type LoaderVariant = 'primary' | 'secondary' | 'success' | 'error' | 'info';
export type LoaderSize = 'small' | 'medium' | 'large';

export interface LoaderProps
{
    variant?: LoaderVariant;
    size?: LoaderSize;
    inline?: boolean;
    background?: boolean;
    style?: any;
} 