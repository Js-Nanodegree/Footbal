# HomeScreen Data Layer — Архитектура

## Назначение

Централизованный слой получения, enrichment и кэширования данных для HomeScreen (афишка, матчи, команды, лиги) с приоритетом MMKV Storage, fallback на моки, быстрым стартом и поддержкой оффлайн.

---

## Архитектура (Folder by Feature)

- **dataProvider.ts** — сервис получения данных:
  - 1) Читает из MMKV (быстро, оффлайн, TTL 24ч)
  - 2) Если нет/устарело — возвращает моки (exampleMatches, exampleTeams, exampleLeagues)
  - 3) Применяет enrichment (достраивает команды/лиги, обязательные поля)
  - 4) Сохраняет новые enriched данные в MMKV
- **utils/dataEnrichment.ts** — enrichment-утилиты:
  - enrichTeamsFromMatches, enrichLeaguesFromMatches, ensureAllFields
- **redux/homeScreenSlice.ts** — Redux slice:
  - fetchHomeScreenData диспатчит централизованно enriched данные
  - UI всегда работает с валидными, согласованными данными
- **mocks/** — генерация мок-данных для fallback и тестов
- **dataEnrichment.test.ts, dataProvider.test.ts** — unit-тесты покрытия enrichment и слоя данных

---

## Взаимодействие

1. HomeScreen (и все секции) получают данные из Redux (state.homeScreen)
2. fetchHomeScreenData вызывает getHomeScreenData (dataProvider)
3. dataProvider:
   - Читает из MMKV (если не устарело)
   - Иначе — enrichment моков, запись в MMKV
4. UI всегда мгновенно показывает валидные enriched данные (даже без сети)

---

## Преимущества
- Мгновенный старт (MMKV)
- Оффлайн-режим и кэширование
- Нет дублей, все поля заполнены (enrichment)
- Лёгкая поддержка и расширение (Folder by Feature)
- Покрытие тестами (unit)

---

## Тесты
- `utils/dataEnrichment.test.ts` — enrichment-утилиты
- `dataProvider.test.ts` — слой данных, fallback, кэш

---

## TODO/Расширение
- Подключение real API (заменить моки)
- Доработка enrichment (фильтрация, сортировка)
- Расширение структуры (live TTL, история)
- E2E-тесты UI 