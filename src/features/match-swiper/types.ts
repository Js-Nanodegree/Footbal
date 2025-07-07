export interface TeamInfo {
  name: string;
  logo: string;
}

export interface MatchCardProps {
  homeTeam: TeamInfo;
  awayTeam: TeamInfo;
  homeScore: string | number;
  awayScore: string | number;
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