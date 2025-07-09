// Секция карточек матчей для истории очных встреч
// Использует MatchCard с variant='white' или 'purple', без градиента
// [ПРАВИЛО] Тесты для этой секции писать не обязательно, по решению команды.
import React from 'react';
import MatchCard from '../../shared/ui/match-card/MatchCard';
import { MatchCardProps } from '../../shared/ui/match-card/types';
import Typography from '../../shared/ui/typography/Typography';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from 'src/roads/RootNavigator';
import type { RouteProp } from '@react-navigation/native';
import { useGetMatchDetailsQuery } from '../../features/team-api/services/footballApi';
import { useMatchHistoryParams } from '../hooks/useMatchHistoryParams';
import { uiDebugConfig } from 'src/shared/debug/ui-debug.config';
import { formatDateTime } from 'src/shared/utils/dateFormat';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

// TODO: заменить на реальные данные из API/контекста
const mockMatch: MatchCardProps = {
  homeTeam: {
    name: 'Chelsea',
    logo: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg',
  },
  awayTeam: {
    name: 'Arsenal',
    logo: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
  },
  homeScore: 2,
  awayScore: 1,
  league: 'Premier League',
  time: formatDateTime( '2025-08-08T19:00:00Z' ), // пример форматирования
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

export const MatchHistoryCardSection: React.FC<MatchHistoryCardSectionProps> = ( {
  match,
  loading,
  error,
} ) =>
{
  const { matchId, homeId: teamId, season, venue } = useMatchHistoryParams();
  const { data, isLoading, error: queryError } = useGetMatchDetailsQuery(matchId);
  const { t } = useTranslation();

  if ( loading ) return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <Typography>{t( 'common.loading' )}</Typography>
    </View>
  );
  if ( error ) return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <Typography>{t( 'common.loadingError' )}</Typography>
    </View>
  );
  if ( !match )
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <Typography>{t( 'common.noData' )}</Typography>
      </View>
    );

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
        data: {data && data.utcDate ? formatDateTime( data.utcDate ) : JSON.stringify( data, null, 2 )}
      </Typography>
    </>
  );
};
