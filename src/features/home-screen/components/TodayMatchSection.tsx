// TodayMatchSection: секция актуальных матчей, с поддержкой лоадеров, ошибок, пустого состояния, локализации и единого стиля
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import TodayMatchLink from 'src/features/home-screen/components/TodayMatchLink';
import { Match } from 'src/features/team-api/types/match';
import { useFadeTransition } from 'src/shared/hooks/useFadeTransition';
import Spacer from 'src/shared/ui/Spacer';
import ErrorState from 'src/shared/ui/error-state/ErrorState';
import { colors } from 'src/shared/ui/theme/colors';
import { shadows } from 'src/shared/ui/theme/shadows';
import TodayMatchCardSkeleton from 'src/shared/ui/today-match-card/TodayMatchCardSkeleton';
import Typography from 'src/shared/ui/typography/Typography';
import { useAppContext } from '../context';
import { DateFormatAdapter } from 'src/features/match-history/adapters';
// import { t } from '@lingui/macro'; // TODO: подключить lingui.js и заменить строки на t()

function formatCompactDate( dateStr: string )
{
  if ( !dateStr ) return '';
  const [ year, month, day ] = dateStr.split( '-' );
  return `${ month }.${ day }.${ year.slice( 2 ) }`;
}

const SECTION_SPACING = 20;

const TodayMatchSection = React.memo( ( { matches = [], error }: { matches: Match[]; error?: string | null } ) =>
{
  const { loading, selectedLeagueId } = useAppContext();
  const navigation = useNavigation();

  const loadingStyle = useFadeTransition(!!loading?.matches);
  const errorStyle = useFadeTransition(!!error && !loading?.matches);
  const emptyStyle = useFadeTransition(!loading?.matches && !error && matches.length === 0);
  const contentStyle = useFadeTransition(!loading?.matches && !error && matches.length > 0);

  const handleAllPress = () =>
  {
    navigation.navigate( 'FinishedMatches', { leagueId: selectedLeagueId } );
  };

  // Преобразуем матчи к нужному формату для TodayMatchLink
  const todayMatches: {
    id: number;
    homeTeam: { name: string; logo: string };
    awayTeam: { name: string; logo: string };
    time: string;
    date: string;
  }[] = matches.map( ( m ) => ( {
    id: m.id,
    homeTeam: { name: m.homeTeam?.name, logo: m.homeTeam?.crestUrl || '' },
    awayTeam: { name: m.awayTeam?.name, logo: m.awayTeam?.crestUrl || '' },
    time: m.utcDate ? m.utcDate.split( 'T' )[ 1 ]?.slice( 0, 5 ) : '',
    date: DateFormatAdapter.formatCompactDate( m.utcDate ),
  } ) );

  return (
    <View style={styles.root} testID="today-match-section" accessibilityLabel="today-match-section">
      {/* LOADING */}
      <Animated.View style={[StyleSheet.absoluteFill, loadingStyle]} pointerEvents={loading?.matches ? 'auto' : 'none'}>
        {loading?.matches && (
          <View style={[ styles.cardBg, shadows.section ]}>
            {[...Array(3)].map((_, i) => (
              <TodayMatchCardSkeleton key={i} />
            ))}
          </View>
        )}
      </Animated.View>
      {/* ERROR */}
      <Animated.View style={[StyleSheet.absoluteFill, errorStyle]} pointerEvents={error && !loading?.matches ? 'auto' : 'none'}>
        {error && !loading?.matches && <ErrorState message={error} />}
      </Animated.View>
      {/* EMPTY */}
      <Animated.View style={[StyleSheet.absoluteFill, emptyStyle]} pointerEvents={!loading?.matches && !error && matches.length === 0 ? 'auto' : 'none'}>
        {!loading?.matches && !error && matches.length === 0 && (
          <View style={[ styles.cardBg, shadows.section ]}>
            <TodayMatchLink todayMatches={todayMatches} onPress={handleAllPress} testID="today-match-link-empty" accessibilityLabel="today-match-link-empty" />
            <View style={styles.emptyBox}>
              <Typography variant="body" font="Inter" style={{ color: colors.primary, marginBottom: 16 }}>
                {/* TODO: {t`На текущий момент нет матчей`} */}
                На текущий момент нет матчей
              </Typography>
              <Typography
                variant="body"
                font="Inter"
                style={{ color: colors.textSecondary, marginBottom: 16, textAlign: 'center' }}
              >
                {/* TODO: {t`Попробуйте изменить лигу или команду`} */}
                Попробуйте изменить лигу или команду
              </Typography>
            </View>
          </View>
        )}
      </Animated.View>
      {/* CONTENT */}
      <Animated.View style={[StyleSheet.absoluteFill, contentStyle]} pointerEvents={!loading?.matches && !error && matches.length > 0 ? 'auto' : 'none'}>
        {!loading?.matches && !error && matches.length > 0 && (
          <View style={[ styles.cardBg, shadows.section ]}>
            <TodayMatchLink todayMatches={todayMatches} onPress={handleAllPress} testID="today-match-link-content" accessibilityLabel="today-match-link-content" />
            <Spacer size={SECTION_SPACING} />
          </View>
        )}
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    minHeight: 70,
    position: 'relative',
  },
  cardBg: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 15,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.transparent,
  },
  emptyBox: {
    padding: 32,
    minHeight: 250,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderTopLeftRadius: 50,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
});

export default TodayMatchSection;
