import { ReactNode } from 'react';

export type ListItemVariant = 'default' | 'withIcon' | 'withAvatar' | 'withSubtitle' | 'withActions' | 'selected' | 'disabled';

export interface ListItemAction {
  icon: ReactNode;
  onPress: () => void;
  disabled?: boolean;
}

export interface ListItemProps {
  title: string;
  subtitle?: string;
  left?: ReactNode;
  right?: ReactNode;
  actions?: ListItemAction[];
  selected?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  variant?: ListItemVariant;
  style?: any;
} 