# Контекст: TeamApiService — эпизация и типизация ответов

## getTeamMatches (эпизация)

Ответ API содержит поля:
- `filters`: фильтры запроса (тип: unknown)
- `resultSet`: метаинформация о выдаче (тип: unknown)
- `matches`: массив матчей, каждый матч строго типизирован по структуре football-data.org (см. MatchesResponseSchema)

### MatchesResponseSchema (Zod)
- Полностью отражает структуру ответа football-data.org
- Включает все вложенные объекты (area, competition, season, homeTeam, awayTeam, score, odds, referees)
- Позволяет строгую валидацию и автогенерацию типов для TypeScript

## Применение
- Используется для валидации и типизации данных в хуках, сервисах, интеграционных тестах
- Готова к расширению под новые поля/endpoint'ы

---

_Документ обновлён автоматически после внедрения production-ready API-клиента и тестовой инфраструктуры._ 