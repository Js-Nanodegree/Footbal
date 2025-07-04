export type StatsBarValueType = 'number' | 'percent';

export interface StatsBarProps {
  leftValue: number | string;
  rightValue: number | string;
  label: string;
  valueType?: StatsBarValueType;
  leftColor?: string;
  rightColor?: string;
  backgroundColor?: string;
  style?: any;
} 