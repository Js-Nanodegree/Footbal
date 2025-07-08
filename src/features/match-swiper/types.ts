import type { MatchScore } from '../../features/team-api/types/match';

export interface TeamInfo {
  id: number;
  name: string;
  logo: string;
}

export interface MatchCardProps {
  id: string | number;
  homeTeam: TeamInfo;
  awayTeam: TeamInfo;
  score: MatchScore;
  league?: string;
  status?: string;
  time?: string;
  stadium?: string;
  isLive?: boolean;
  badgeText?: string;
  variant?: string;
  backgroundLogo?: string;
}

export interface CardProps extends MatchCardProps {
  index: number;
  currentIndex: number;
  onPress?: () => void;
}

export interface WrapperProps {
  data: MatchCardProps[];
  loading: boolean;
  error: string | null;
  onCardPress?: (index: number) => void;
} 