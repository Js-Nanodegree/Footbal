import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import FinishedMatchesSection from './FinishedMatchesSection';
import { useHomeScreenSections } from '../hooks/useHomeScreenSections';
import { Match } from 'src/features/team-api/types/match';
import Typography from 'src/shared/ui/typography/Typography';
import { useRoute, useNavigation } from '@react-navigation/native';
import { AppContextProvider } from '../context';
import { useSelector } from 'react-redux';
import ChevronRightIcon from 'src/shared/ui/icons/ChevronRightIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const FinishedMatchesScreenInner = () => {
  const navigation = useNavigation();
  const route = useRoute();
  // @ts-ignore
  const { leagueId } = route.params || {};
  // Получаем данные из redux
  const { competitions, teams, matches, loading, error } = useSelector(
    (state: any) => state.homeScreen,
  );
  // Получаем finishedMatches из хука
  const { finishedMatches } = useHomeScreenSections({
    competitions,
    teams,
    matches,
    loading,
    error,
    onRefresh: () => {},
    onPaginate: () => {},
  });

  // Фильтруем по выбранной лиге, если leagueId задан
  const filteredMatches = leagueId
    ? finishedMatches.filter((m) => m.competition?.id === leagueId)
    : finishedMatches;

  // Адаптер для передачи нужных полей
  const renderItem = ({ item }: { item: Match }) => {
    const adaptedMatch = {
      homeTeam: {
        name: item.homeTeam?.name,
        crestUrl: item.homeTeam?.crestUrl,
      },
      awayTeam: {
        name: item.awayTeam?.name,
        crestUrl: item.awayTeam?.crestUrl,
      },
      time: item.utcDate ? item.utcDate.split('T')[1]?.slice(0, 5) : '',
      date: item.utcDate ? item.utcDate.split('T')[0] : '',
      score: item.score,
    };
    return <FinishedMatchesSection match={adaptedMatch} />;
  };

  const insets = useSafeAreaInsets();

  // Отступ между карточками
  const renderSeparator = () => <View style={{ height: 16 }} />;

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
              backgroundColor: '#fff',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 16,
          paddingBottom: 8,
          paddingHorizontal: 8,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ padding: 8, marginRight: 8 }}
        >
          <View style={{ transform: [{ rotate: '180deg' }] }}>
            <ChevronRightIcon size={28} color={'#222'} />
          </View>
        </TouchableOpacity>
              <Typography variant="h1" font="Oswald" weight="bold" style={{ fontSize: 24, color: '#222', fontWeight: '600' }}>
          Завершённые матчи
        </Typography>
      </View>
      <FlatList
        data={filteredMatches}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
              ListEmptyComponent={
                  <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
                      <Typography style={{ textAlign: 'center', color: '#222', fontSize: 16 }}>
                          Извините, но в вашем приложении ещё не синхронизировано.
                      </Typography>
                  </View>
              }
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}
              style={{ flex: 1, backgroundColor: '#fff' }}
      />
    </View>
  );
};

const FinishedMatchesScreen = () => {
  return (
    <AppContextProvider>
      <FinishedMatchesScreenInner />
    </AppContextProvider>
  );
};

export default FinishedMatchesScreen;
