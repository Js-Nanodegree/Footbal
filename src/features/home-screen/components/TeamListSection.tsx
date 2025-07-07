import React from 'react';
import { Alert, Button, FlatList, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Spacer from 'src/shared/ui/Spacer';
import ErrorState from 'src/shared/ui/error-state/ErrorState';
import SkeletonTeamAvatar from 'src/shared/ui/team-list/SkeletonTeamAvatar';
import TeamList from 'src/shared/ui/team-list/TeamList';
import Typography from 'src/shared/ui/typography/Typography';
import { useAppContext } from '../context';
import { exampleTeams } from '../mocks/exampleTeams';

const SECTION_SPACING = 20;

// Хук для fade-перехода между состояниями
function useFadeTransition( visible: boolean )
{
  const opacity = useSharedValue( visible ? 1 : 0 );
  React.useEffect( () =>
  {
    opacity.value = withTiming( visible ? 1 : 0, { duration: 320 } );
  }, [ visible ] );
  const style = useAnimatedStyle( () => ( { opacity: opacity.value } ) );
  return style;
}

const TeamListSection = React.memo(
  ( {
    teamIds,
    loading,
    error,
  }: {
    teamIds: number[];
    loading?: boolean;
    error?: string | null;
  } ) =>
  {
    const { selectedLeagueId, setSelectedTeamIds, selectedTeamIds } = useAppContext();
    // Фильтруем команды по выбранной лиге
    const teams = teamIds
      .map( ( id ) => exampleTeams.find( ( t ) => t.id === id ) )
      .filter( ( t ): t is NonNullable<typeof t> => Boolean( t ) )
      .filter( ( t ) => selectedLeagueId == null || t.leagueId === selectedLeagueId );

    const handleTeamSelect = ( id: number | 'tv' ) =>
    {
      if ( id === 'tv' ) return; // обработка TV отдельно через onTvPress
      setSelectedTeamIds( id );
    };

    // Fade стили для состояний
    const loadingStyle = useFadeTransition( !!loading );
    const errorStyle = useFadeTransition( !!error && !loading );
    const emptyStyle = useFadeTransition( !loading && !error && teams.length === 0 );
    const contentStyle = useFadeTransition( !loading && !error && teams.length > 0 );

    // Анимация высоты
    const height = useSharedValue( selectedTeamIds.length === 0 ? 150 :225 );

    React.useEffect( () =>
    {
      height.value = withTiming( selectedTeamIds.length === 0 ? 150 : 225, { duration: 320 } );
    }, [ selectedTeamIds.length ] );
    const animatedRootStyle = useAnimatedStyle( () => ( { height: height.value } ) );

    console.log( 'selectedTeamIds', selectedTeamIds );

    return (
      <Animated.View style={[ styles.root, animatedRootStyle ]}>
        {/* LOADING */}
        <Animated.View
          style={[ StyleSheet.absoluteFill, loadingStyle ]}
          pointerEvents={loading ? 'auto' : 'none'}
        >
          {loading && (
            <View style={{ paddingVertical: 8, minHeight: 150 }}>
              <FlatList
                data={[ ...Array( 8 ) ]}
                horizontal
                keyExtractor={( _, i ) => i.toString()}
                renderItem={() => <SkeletonTeamAvatar />}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 8, paddingRight: 8 }}
              />
            </View>
          )}
        </Animated.View>
        {/* ERROR */}
        <Animated.View
          style={[ StyleSheet.absoluteFill, errorStyle ]}
          pointerEvents={error && !loading ? 'auto' : 'none'}
        >
          {error && !loading && <ErrorState message={error} />}
        </Animated.View>
        {/* EMPTY */}
        <Animated.View
          style={[ StyleSheet.absoluteFill, emptyStyle ]}
          pointerEvents={!loading && !error && teams.length === 0 ? 'auto' : 'none'}
        >
          {!loading && !error && teams.length === 0 && (
            <>
              <Spacer size={SECTION_SPACING} />
              <View style={{ marginLeft: 16, marginTop: 8 }}>
                <Typography variant="body" font="Inter" style={{ marginLeft: 16, marginBottom: 8 }}>
                  Нет команд для отображения
                </Typography>
                <Typography variant="body" font="Inter" style={{ marginLeft: 16, marginBottom: 8 }}>

                </Typography>
              </View>
            </>
          )}
        </Animated.View>
        {/* CONTENT */}
        <Animated.View
          style={[ StyleSheet.absoluteFill, contentStyle ]}
          pointerEvents={!loading && !error && teams.length > 0 ? 'auto' : 'none'}
        >
          {!loading && !error && teams.length > 0 && (
            <>
              <Typography variant="h1" weight="bold" font="Oswald" style={{ marginLeft: 16 }}>
                Выбор команды
              </Typography>
              <TeamList
                teams={teams}
                initialSelectedIds={selectedTeamIds}
                onTeamSelect={handleTeamSelect}
                onTvPress={() => Alert.alert( 'Переход к ТВ-матчам или трансляциям' )}
              />
            </>
          )}
        </Animated.View>
        {/* <Spacer size={SECTION_SPACING} /> */}
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create( {
  root: {
    position: 'relative',
  },
});

export default TeamListSection;
