[2025-07-04] docs: Финализированы и актуализированы правила и контекст проекта под стек React Native/Expo, TypeScript, мобильный фронт, автоматизацию, тесты, CI/CD, безопасность, документацию (cursor/rules.md, cursor/context.md)

[2025-07-04] feat: Завершена инициализация проекта FOOTBAL (структура, линтинг, тесты, Storybook, context.md, README, pre-commit хуки, запуск dev-сервера).

[2024-06-18] feat: Централизация цветов/стилей для Button, Badge, ScoreBlock, поддержка темизации через colorMap, фиксация решений в Memory Bank (creative-uiux.md)

[2024-06-18] feat: Добавлен Loader (Spinner) — colorMap, типы, компонент, тесты, context.md, готов к showcase в Style Guide.

[2024-06-18] feat: добавлен кастомный хук useRippleScaleAnimation для анимации появления/исчезновения с ripple и scale, с документацией и API для переиспользования в TeamList и других компонентах.

[2024-06-18] refactor: Интегрирован TMPApiAxios в TeamApiService, исправлена типизация прогресса (AxiosProgressEvent), добавлены контекстные комментарии и JSDoc для автогенерации документации. (Интеграция современного HTTP-клиента, подготовка к расширению тестов и production-ready API)

[2024-06-20] feat: Внедрён паттерн UI/UX-архитектуры (ADR, action item, README, systemPatterns.md, Memory Bank)

[2024-06-19] feat: D. Интеграция SVG-логотипов для топ-команд в TeamList с fallback на placeholder или Image.

[2024-06-18] feat: Завершены задачи по TodayMatch, TeamList, TV-кнопке, отступам, placeholder, анимациям. Начата новая задача: pixel-perfect рефакторинг FeaturedMatchCard.

[2024-06-19] task: Создана задача на pixel-perfect доработку FeaturedMatchCard, работа передана frontend-разработчику. Проведён аудит, требования зафиксированы в taskmd.

[2024-06-18] feat: Добавлен epic и задачи на pixel-perfect карточку матча и свайпер (HomeScreen), зафиксированы все нерешённые проблемы и требования по референсу (UI/UX, анимация, overlay, edge-to-edge, snap-to-center, LIVE, бейдж, overlay, адаптивность).

[2024-06-19] feat: Добавить плавные переходы между состояниями loading → content → empty/error (HomeScreen, секции)

[2024-06-19] feat: Реализовать shimmer-эффект для скелетонов (если не реализовано)

[2024-06-19] feat: В TodayMatchSection и MatchSwiperSection добавить визуальное отображение выбранных фильтров (бейджи с названием лиги/команды)

[2024-06-19] feat: Добавить тени, скругления, плавные градиенты для карточек и секций

[2024-06-19] feat: Для пустого состояния добавить иконку, подробный текст и call-to-action (например, "Попробуйте выбрать другую лигу")

[2024-06-19] refactor: Использовать React.memo и useCallback для всех секций и карточек

[2024-06-19] test: Добавить тесты для состояний loading/empty/error, onPress, фильтрации, переходов

[2024-06-19] docs: Обновить документацию и context.md для секций/фичей

[2024-06-19] feat: Добавить пользовательские сценарии (pull-to-refresh, быстрый переход, call-to-action)

[2024-06-20] refactor: В TeamApiService.getTeams теперь при любой ошибке (в том числе Zod) возвращаются mockTeams. TODO: В будущем разделить обработку ошибок API и ошибок валидации Zod, чтобы возвращать моки только при ошибке схемы, а не при любой ошибке.

[2024-06-20] refactor: В TeamApiService.getTeamDetails и getTeamMatches теперь при любой ошибке (в том числе Zod) возвращаются моки (первый mockTeams для details, [] для matches). TODO: В будущем разделить обработку ошибок API и ошибок валидации Zod, чтобы возвращать моки только при ошибке схемы, а не при любой ошибке.

[2024-06-20] feat: Проведен аудит моковых данных (mockTeams, mockMatches, mockCompetitions, mockStandings) и их соответствия интерфейсам Team, Match, Competition, Standing. Добавить/уточнить поля в моках для соответствия фильтрам и UI.

[2024-06-20] feat: Гарантировать возврат моков в хуках useTeams, useMatches, useCompetitions, useStandings при любой ошибке API или валидации. Покрыть unit-тестами.

[2024-06-20] feat: Проверить фильтрацию и отображение моков на главном экране (HomeScreen), чтобы всегда были видны команды, матчи, турниры даже без API.

[2024-06-20] feat: Добавить логирование причин fallback (ошибка API, ошибка схемы, пустой ответ) для отладки.

[2024-06-20] docs: Описать fallback-логику и работу с моками в context.md и README.md.

[2024-06-20] test: Покрыть хуки useTeams, useMatches, useCompetitions unit-тестами на возврат моков при ошибке API или валидации. 