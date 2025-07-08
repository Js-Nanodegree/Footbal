import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from 'src/roads/RootNavigator';
import { getCache, setCache } from 'src/shared/memory-bank/mmkvMemoryBank';

const MATCH_HISTORY_PARAMS_KEY = 'match_history_params';

export function useMatchHistoryParams() {
  const route = useRoute<RouteProp<RootStackParamList, 'MatchHistory'>>();
  // 1. Берём из navigation params
  let {
    matchId,
    homeId,
    awayId,
    venue,
    season,
  } = route.params ?? {};

  // 2. Если нет — берём из MMKV
  if (!matchId || !homeId || !awayId) {
    const cached = getCache<{
      matchId?: number;
      homeId?: number;
      awayId?: number;
      venue?: 'home' | 'away';
      season?: string;
    }>(MATCH_HISTORY_PARAMS_KEY) || {};
    matchId = matchId || cached.matchId;
    homeId = homeId || cached.homeId;
    awayId = awayId || cached.awayId;
    venue = venue || cached.venue;
    season = season || cached.season;
  }

  // 3. Если всё равно нет — дефолты
  if (!matchId) matchId = 123456;
  if (!venue) venue = 'home';

  // 4. Кэшируем актуальные параметры
  setCache(MATCH_HISTORY_PARAMS_KEY, { matchId, homeId, awayId, venue, season });

  return { matchId, homeId, awayId, venue, season };
} 