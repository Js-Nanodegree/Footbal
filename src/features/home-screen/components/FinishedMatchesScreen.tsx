// FinishedMatchesScreen: экран завершённых матчей, поддержка единого стиля, локализации, типографики, accessibility
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { Match } from 'src/features/team-api/types/match';
import ChevronRightIcon from 'src/shared/ui/icons/ChevronRightIcon';
import { colors } from 'src/shared/ui/theme/colors';
import { shadows } from 'src/shared/ui/theme/shadows';
import Typography from 'src/shared/ui/typography/Typography';
import { AppContextProvider } from '../context';
import { useHomeScreenSections } from '../hooks/useHomeScreenSections';
import FinishedMatchesSection from './FinishedMatchesSection';
// import { t } from '@lingui/macro'; // TODO: подключить lingui.js

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
        backgroundColor: colors.card,
        ...shadows.section,
      }}
      testID="finished-matches-screen"
      accessibilityLabel="finished-matches-screen"
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 16,
          paddingBottom: 8,
          paddingHorizontal: 8,
        }}
        testID="finished-matches-header"
        accessibilityLabel="finished-matches-header"
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ padding: 8, marginRight: 8 }}
          testID="back-button"
          accessibilityLabel="back-button"
        >
          <View style={{ transform: [{ rotate: '180deg' }] }}>
            <ChevronRightIcon size={28} color={colors.text} />
          </View>
        </TouchableOpacity>
        <Typography variant="h1" font="Oswald" weight="bold" style={{ fontSize: 24, color: colors.text, fontWeight: '600' }}>
          {/* TODO: {t`Завершённые матчи`} */}
          Завершённые матчи
        </Typography>
      </View>
      <FlatList
        data={filteredMatches}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={{ flex: 1, backgroundColor: colors.card, justifyContent: 'center', alignItems: 'center', minHeight: 300, ...shadows.section }}>
            <Typography style={{ textAlign: 'center', color: colors.text, fontSize: 16 }}>
              {/* TODO: {t`Извините, но в вашем приложении ещё не синхронизировано.`} */}
              Извините, но в вашем приложении ещё не синхронизировано.
            </Typography>
          </View>
        }
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}
        style={{ flex: 1, backgroundColor: colors.card }}
        testID="finished-matches-list"
        accessibilityLabel="finished-matches-list"
        ItemSeparatorComponent={renderSeparator}
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
