export type MatchEventType = 'goal' | 'yellow-card' | 'substitution' | 'red-card' | 'own-goal' | 'penalty' | 'other';

export interface MatchEventPlayer {
  name: string;
  avatar?: string;
  position?: string;
  number?: string | number;
  team?: string;
}

export interface MatchEvent {
  id: string | number;
  type: MatchEventType;
  time: string | number;
  player?: MatchEventPlayer;
  assist?: MatchEventPlayer;
  inPlayer?: MatchEventPlayer;
  outPlayer?: MatchEventPlayer;
  score?: string;
  teamLogoLeft?: string;
  teamLogoRight?: string;
}

export interface MatchEventTimelineProps {
  events: MatchEvent[];
  style?: any;
} 