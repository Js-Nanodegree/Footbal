// Секция карточек матчей для истории очных встреч
// Использует MatchCard с variant='white' или 'purple', без градиента
// [ПРАВИЛО] Тесты для этой секции писать не обязательно, по решению команды.
import React from 'react';
import MatchCard from '../../shared/ui/match-card/MatchCard';
import { MatchCardProps } from '../../shared/ui/match-card/types';
import Typography from '../../shared/ui/typography/Typography';
import { useMatchHistoryQueryState } from '../match-history/context/MatchHistoryQueryContext';
import { useGetMatchDetailsQuery } from '../../features/team-api/services/footballApi';

// TODO: заменить на реальные данные из API/контекста
const mockMatch: MatchCardProps = {
  homeTeam: { name: 'Chelsea', logo: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg' },
  awayTeam: { name: 'Arsenal', logo: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg' },
  homeScore: 2,
  awayScore: 1,
  league: 'Premier League',
  time: '19:00',
  stadium: 'Stamford Bridge',
  isLive: false,
  badgeText: 'FT',
  variant: 'purple', // теперь всегда purple
  backgroundLogo: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg',
};

export interface MatchHistoryCardSectionProps {
  match?: any;
  loading?: boolean;
  error?: any;
}

export const MatchHistoryCardSection: React.FC<MatchHistoryCardSectionProps> = ({ match, loading, error }) => {
  const { matchId, teamId, season, venue } = useMatchHistoryQueryState();
  const { data, isLoading, error: queryError } = useGetMatchDetailsQuery(matchId);

  if (loading) return <Typography>Загрузка...</Typography>;
  if (error) return <Typography>Ошибка загрузки</Typography>;
  if (!match) return <Typography>Нет данных</Typography>;

  // Отображаем все данные из backend и аргументы
  return (
    <>
      <Typography variant="body" style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>
        matchId: {String(matchId)} | teamId: {String(teamId)} | season: {season} | venue: {venue}
      </Typography>
      <Typography variant="body" style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>
        isLoading: {String(isLoading)} | error: {JSON.stringify(queryError)}
      </Typography>
      <Typography variant="body" style={{ fontSize: 10, color: '#444', marginBottom: 8 }}>
        data: {JSON.stringify(data, null, 2)}
      </Typography>
    </>
  );
}; 