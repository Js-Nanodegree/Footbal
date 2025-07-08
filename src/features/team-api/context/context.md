# Team API — Архитектура (обновлено)

## Назначение

Централизованный слой получения, enrichment и кэширования данных для команд, матчей, standings и лиг. Использует строгую типизацию, fallback на моки, поддержку оффлайн и production-ready API-клиенты.

---

## Архитектура (Folder by Feature)

- **api/services/** — только API-клиенты (teamApi, competitionApi)
- **components/** — UI-компоненты (TeamList, TeamDetails и т.д.)
- **context/** — контекст, провайдеры, context.md
- **hooks/** — useTeams, useMatches, useCompetitions и т.д.
- **mocks/** — mockMatches, mockTeams и др.
- **redux/** — teamSlice, matchSlice, playerSlice, teamPastMatchesSlice
- **services/** — бизнес-логика, обработка ошибок, моки, enrichment:
  - `DataEnrichmentService.ts` — enrichment, фильтрация, сортировка, поиск, edge-cases
  - `ErrorHandler.ts` — универсальный обработчик ошибок (handle)
  - `MockDataProvider.ts` — централизованный сервис для мок-данных
- **tests/** — unit-тесты, интеграционные тесты
- **types/** — типы для матчей, команд, лиг, standings
- **utils/** — вспомогательные приватные функции (если нужны)

---

## Ключевые сервисы

- **DataEnrichmentService**
  - enrichTeamsFromMatches, enrichLeaguesFromMatches, ensureAllFields
  - filterMatches, sortMatches, searchMatches
  - Гарантирует валидность и полноту данных, покрывает edge-cases
- **ErrorHandler**
  - handle(fn, fallback): универсальная обработка ошибок, fallback на моки, логирование
- **MockDataProvider**
  - getMock(type): выдача мок-данных по типу (matches, teams и др.)
  - Гарантирует типизацию и расширяемость моков

---

## Взаимодействие

1. Хуки и redux получают данные через сервисы (enrichment, fallback, моки)
2. Все enrichment и обработка ошибок централизованы в сервисах
3. UI всегда работает с валидными enriched данными

---

## Преимущества
- Модульность (folder by feature)
- Строгая типизация (TypeScript)
- Оффлайн-режим и кэширование
- Нет дублей, все поля заполнены (enrichment)
- Лёгкая поддержка и расширение (сервисы, тесты)
- Покрытие тестами (unit)

---

## Тесты
- `services/DataEnrichmentService.test.ts` — enrichment-утилиты
- `services/MockDataProvider.test.ts` — выдача моков, edge-cases
- `services/ErrorHandler.test.ts` — fallback, обработка ошибок

---

## TODO/Расширение
- Подключение real API (заменить моки)
- Доработка enrichment (фильтрация, сортировка, поиск)
- Расширение структуры (standings, players, live TTL, история)
- E2E-тесты UI
- Провести аудит других features на повторяющуюся логику и вынести в shared/services

---

## Принципы
- Вся бизнес- и enrichment-логика — только в сервисах
- UI и redux работают только с валидными enriched данными
- Все повторяющиеся функции — в сервисах или shared/utils
- Тесты рядом с кодом feature
- Документация всегда актуальна (context.md)

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

## Расширение getTeamMatches

Теперь endpoint getTeamMatches поддерживает параметры:
- dateFrom, dateTo — фильтрация по дате
- status — статус матча (FINISHED, SCHEDULED и т.д.)
- venue — домашние/гостевые (home/away)
- opponentId — id соперника

Пример:
```ts
useGetTeamMatchesQuery({
  teamId: 81, // Барселона
  dateFrom: '1988-01-01',
  dateTo: '1988-12-31',
  status: statusMatches.FINISHED,
  venue: 'home',
  opponentId: 86, // Реал Мадрид
})
```

---

_Документ обновлён автоматически после внедрения production-ready API-клиента и тестовой инфраструктуры._ 