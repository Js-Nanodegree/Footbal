# HomeScreen Data Layer — Архитектура (обновлено)

## Назначение

Централизованный слой получения, enrichment и кэширования данных для HomeScreen (афишка, матчи, команды, лиги) с приоритетом in-memory + AsyncStorage Storage, fallback на моки, быстрым стартом и поддержкой оффлайн.

---

## Архитектура (Folder by Feature)

- **api/** — только API-клиенты и endpoints
- **components/** — UI-компоненты (TeamListSection, MatchSwiperSection и т.д.)
- **context/** — контекст, провайдеры, AppContext.tsx
- **hooks/** — useHomeScreenSections, useMatchById и т.д.
- **mocks/** — exampleMatches, exampleTeams, exampleLeagues
- **redux/** — homeScreenSlice, async thunks
- **services/** — бизнес-логика, обработка ошибок, моки, enrichment:
  - `DataEnrichmentService.ts` — enrichment, фильтрация, сортировка, поиск, edge-cases
  - `ErrorHandler.ts` — универсальный обработчик ошибок (handle)
  - `MockDataProvider.ts` — централизованный сервис для мок-данных
- **tests/** — unit-тесты, интеграционные тесты
- **utils/** — вспомогательные приватные функции (если нужны)
- **context.md** — описание архитектуры и связей

---

## Ключевые сервисы

- **DataEnrichmentService**
  - enrichTeamsFromMatches, enrichLeaguesFromMatches, ensureAllFields
  - filterMatches, sortMatches, searchMatches
  - Гарантирует валидность и полноту данных, покрывает edge-cases
- **ErrorHandler**
  - handle(fn, fallback): универсальная обработка ошибок, fallback на моки, логирование
- **MockDataProvider**
  - getMock(type): выдача мок-данных по типу (matches, teams, leagues)
  - Гарантирует типизацию и расширяемость моков

---

## Взаимодействие

1. HomeScreen (и все секции) получают данные из Redux (state.homeScreen)
2. fetchHomeScreenData вызывает getHomeScreenData (dataProvider)
3. dataProvider:
   - Читает из in-memory + AsyncStorage (если не устарело)
   - Иначе — ErrorHandler.handle(fetchApi, fetchMock): enrichment моков, запись в in-memory + AsyncStorage
   - enrichment и адаптация через DataEnrichmentService
4. UI всегда мгновенно показывает валидные enriched данные (даже без сети)

---

## Преимущества
- Модульность (folder by feature)
- Мгновенный старт (in-memory + AsyncStorage)
- Оффлайн-режим и кэширование
- Нет дублей, все поля заполнены (enrichment)
- Лёгкая поддержка и расширение (сервисы, тесты)
- Покрытие тестами (unit)

---

## Тесты
- `services/DataEnrichmentService.test.ts` — enrichment-утилиты
- `services/MockDataProvider.test.ts` — выдача моков, edge-cases
- `services/ErrorHandler.test.ts` — fallback, обработка ошибок
- `dataProvider.test.ts` — слой данных, fallback, кэш

---

## TODO/Расширение
- Подключение real API (заменить моки)
- Доработка enrichment (фильтрация, сортировка, поиск)
- Расширение структуры (live TTL, история)
- E2E-тесты UI
- Провести аудит других features на повторяющуюся логику и вынести в shared/services

---

## Принципы
- Все бизнес- и enrichment-логика — только в сервисах
- UI и redux работают только с валидными enriched данными
- Все повторяющиеся функции — в сервисах или shared/utils
- Тесты рядом с кодом feature
- Документация всегда актуальна (context.md) 