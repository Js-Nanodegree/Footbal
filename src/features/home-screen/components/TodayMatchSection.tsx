import React from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import TodayMatchLink from 'src/screens/HomeScreen/TodayMatchLink';
import Spacer from 'src/shared/ui/Spacer';
import { exampleMatches } from '../mocks/exampleMatches';
import { useAppContext } from '../context';
import TodayMatchCardSkeleton from 'src/shared/ui/today-match-card/TodayMatchCardSkeleton';
import ErrorState from 'src/shared/ui/error-state/ErrorState';
import Typography from 'src/shared/ui/typography/Typography';
import { exampleLeagues } from '../mocks/exampleLeagues';
import { exampleTeams } from '../mocks/exampleTeams';
import Animated from 'react-native-reanimated';
import { useFadeTransition } from 'src/shared/hooks/useFadeTransition';

const SECTION_SPACING = 20;

const TodayMatchSection = React.memo(() => {
  const { selectedLeagueId, selectedTeamId, loading, error } = useAppContext();
  // Фильтруем только live-матчи по выбранной лиге и команде
  const matches =
    exampleMatches?.filter((m) => {
      if (!m.isLive) return false;
      if (selectedLeagueId && m?.leagueId !== selectedLeagueId) return false;
      if (selectedTeamId && m?.homeTeamId !== selectedTeamId && m?.awayTeamId !== selectedTeamId)
        return false;
      return true;
    }) || [];
  const leagueName = selectedLeagueId
    ? exampleLeagues.find( ( l ) => l.id === selectedLeagueId )?.name || ''
    : '';
  const teamName = selectedTeamId
    ? exampleTeams.find( ( t ) => t.id === selectedTeamId )?.name || ''
    : '';

  const loadingStyle = useFadeTransition( !!loading.matches );
  const errorStyle = useFadeTransition( !!error && !loading.matches );
  const emptyStyle = useFadeTransition( !loading.matches && !error && matches.length === 0 );
  const contentStyle = useFadeTransition( !loading.matches && !error && matches.length > 0 );

  return (
    <View style={styles.root}>
      {/* LOADING */}
      <Animated.View style={[ StyleSheet.absoluteFill, loadingStyle ]} pointerEvents={loading.matches ? 'auto' : 'none'}>
        {loading.matches && (
          <View style={styles.cardBg}>
            {[ ...Array( 3 ) ].map( ( _, i ) => (
              <TodayMatchCardSkeleton key={i} />
            ) )}
          </View>
        )}
      </Animated.View>
      {/* ERROR */}
      <Animated.View style={[ StyleSheet.absoluteFill, errorStyle ]} pointerEvents={error && !loading.matches ? 'auto' : 'none'}>
        {error && !loading.matches && <ErrorState message={error} />}
      </Animated.View>
      {/* EMPTY */}
      <Animated.View style={[ StyleSheet.absoluteFill, emptyStyle ]} pointerEvents={!loading.matches && !error && matches.length === 0 ? 'auto' : 'none'}>
        {!loading.matches && !error && matches.length === 0 && (
          <View style={styles.cardBg}>
            <TodayMatchLink todayMatches={matches} onPress={() => { }} />
            <View style={styles.emptyBox}>
              <Typography variant="body" font="Inter" style={{ color: '#FF8800', marginBottom: 16 }}>
                На текущий момент нет матчей
              </Typography>
              <Typography
                variant="body"
                font="Inter"
                style={{ color: '#888', marginBottom: 16, textAlign: 'center' }}
              >
                Попробуйте изменить лигу или команду
              </Typography>
            </View>
          </View>
        )}
      </Animated.View>
      {/* CONTENT */}
      <Animated.View style={[ StyleSheet.absoluteFill, contentStyle ]} pointerEvents={!loading.matches && !error && matches.length > 0 ? 'auto' : 'none'}>
        {!loading.matches && !error && matches.length > 0 && (
          <View style={styles.cardBg}>
            <TodayMatchLink todayMatches={matches} onPress={() => { }} />
            <Spacer size={SECTION_SPACING} />
          </View>
        )}
      </Animated.View>
    </View>
  );
} );

const styles = StyleSheet.create( {
  root: {
    minHeight: 70,
    position: 'relative',
  },
  cardBg: {
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 15,
    shadowColor: 'black',
    shadowOffset: { width: 1.5, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'transparent',
  },
  emptyBox: {
    padding: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 50,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
});

export default TodayMatchSection;
