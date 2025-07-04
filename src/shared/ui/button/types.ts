import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
} 