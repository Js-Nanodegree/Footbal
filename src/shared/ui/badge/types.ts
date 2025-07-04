import { ReactNode } from 'react';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'disabled';
export type BadgeMode = 'solid' | 'outline';
export type BadgeSize = 'small' | 'medium' | 'large';

export interface BadgeProps
{
    children: ReactNode;
    variant?: BadgeVariant;
    mode?: BadgeMode;
    size?: BadgeSize;
    icon?: ReactNode;
    disabled?: boolean;
    style?: any;
} 