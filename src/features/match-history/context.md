# match-history/context.md

**Назначение:**
Экран истории очных встреч между командами. Секции:
- Header (life score)
- Карточка матча (MatchCard)
- Статистика матча (MatchStatsSection)
- Участники команд (PlayerListSection)

**Архитектура (актуально):**
- Все параметры состояния (`matchId`, `homeId`, `awayId`, `venue`, `season`) передаются и обновляются только через navigation params (`route.params` и `navigation.setParams`).
- React Context для состояния не используется (DateSeasonContext и DateSeasonSwitcher удалены).
- Любой компонент экрана читает параметры через хук `useMatchHistoryParams` (обёртка над useRoute + in-memory + AsyncStorage fallback).
- Это обеспечивает централизованное и прозрачное управление состоянием экрана, облегчает интеграцию с другими экранами и навигацию.

**Пример использования:**
```tsx
const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'MatchHistory'>>();
const { matchId, homeId, awayId, venue, season } = useMatchHistoryParams();

// Для смены матча:
navigation.setParams({ matchId: newId, homeId: ..., awayId: ... });
// Для смены venue:
navigation.setParams({ venue: 'home' });
// Для смены сезона:
navigation.setParams({ season: '2023/2024' });
```

**Важно:**
- Все хуки и запросы (например, useGetMatchDetailsQuery) используют параметры только из useMatchHistoryParams (navigation params).
- SectionList и другие компоненты должны корректно обновляться при изменении параметров навигации.
- DateSeasonContext и DateSeasonSwitcher больше не используются. 