// enrichment утилиты для HomeScreen (MVP)
import { Match, MatchTeam } from '../../team-api/types/match';
import { Team } from '../../team-api/types/team';
import { Competition as League } from '../../team-api/types/competition';

// Преобразует MatchTeam в Team (минимально)
function matchTeamToTeam(mt: MatchTeam): Team {
  return {
    id: mt.id,
    name: mt.name,
    crestUrl: mt.crestUrl,
    lastUpdated: new Date().toISOString(),
  };
}

// Оставляем только приватные функции, если они нужны для других сервисов
// Все экспортируемые enrichment-функции теперь в DataEnrichmentService 