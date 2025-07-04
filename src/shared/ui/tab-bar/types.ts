import { ReactNode } from 'react';

export type TabBarVariant = 'default' | 'withIcon' | 'withBadge';

export interface TabBarItem
{
    key: string;
    label: string;
    icon?: ReactNode;
    badge?: number | string;
    disabled?: boolean;
}

export interface TabBarProps
{
    items: TabBarItem[];
    activeKey: string;
    onTabPress: ( key: string ) => void;
    variant?: TabBarVariant;
    style?: any;
} 