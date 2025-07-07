import React from 'react';
import { Alert, Button, FlatList, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Spacer from 'src/shared/ui/Spacer';
import ErrorState from 'src/shared/ui/error-state/ErrorState';
import SkeletonTeamAvatar from 'src/shared/ui/team-list/SkeletonTeamAvatar';
import TeamList from 'src/shared/ui/team-list/TeamList';
import Typography from 'src/shared/ui/typography/Typography';
import { useAppContext } from '../context';
import { Team } from 'src/features/team-api/types/team';
import { colors } from 'src/shared/ui/theme/colors';

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
  ( { teams, loading, error }: { teams: Team[]; loading?: boolean; error?: string | null } ) =>
  {
    const { selectedTeamIds, setSelectedTeamIds } = useAppContext();

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
    const height = useSharedValue( selectedTeamIds.length === 0 ? 150 : 225 );

    React.useEffect( () =>
    {
      height.value = withTiming( selectedTeamIds.length === 0 ? 150 : 225, { duration: 320 } );
    }, [ selectedTeamIds.length ] );
    const animatedRootStyle = useAnimatedStyle( () => ( { height: height.value } ) );

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
          <>
          {!loading && !error && teams.length === 0 && (
              <View
                style={{
                  padding: 32,
                  backgroundColor: colors.white,
                  borderRadius: 36,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}
              >
                <Typography
                  variant="body"
                  font="Oswald"
                  style={{ marginLeft: 16, marginBottom: 8, color: colors.live }}
                >
                  Нет команд для отображения
                </Typography>
                <Typography
                  variant="body"
                  font="Oswald"
                  style={{ marginLeft: 16, marginBottom: 8, color: colors.live }}
                >
                  Попробуйте изменить лигу или команду
                </Typography>
              </View>
            )}
            <Spacer size={SECTION_SPACING} />
          </>
        </Animated.View>
        {/* CONTENT */}
        <Animated.View
          style={[ StyleSheet.absoluteFill, contentStyle ]}
          pointerEvents={!loading && !error && teams.length > 0 ? 'auto' : 'none'}
        >
          {!loading && !error && teams.length > 0 && (
            <>
              <Typography variant="h1" weight="bold" font="Oswald" style={{ marginLeft: 16, fontSize: 24, color: '#222', fontWeight: '600' }}>
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
