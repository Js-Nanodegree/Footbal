# System Patterns: UI/UX-архитектура FOOTBAL

## Паттерн: UI/UX-архитектура мобильного приложения

**Описание:**
Масштабируемая архитектура для мобильного приложения с кастомной overlay-инфраструктурой (BottomSheet, Toast, GlobalModal), SectionList для группировки данных, Redux Toolkit + redux-persist для фильтров, истории, избранного, MMKV для быстрого кэширования, StackNavigator с поддержкой свайпов, локализацией (lingui.js), dark mode и полной типизацией.

**Ключевые элементы:**
- Overlay-компоненты с drag-зоной, snap-точками, overlay-стеком, unit-тестами и документацией
- SectionList для группировки команд/матчей
- Redux Toolkit + redux-persist для фильтров, истории, избранного
- MMKV для быстрого кэширования
- StackNavigator с типизацией параметров, поддержка свайпов
- Локализация через lingui.js, поддержка dark mode
- Все компоненты и экраны типизированы, покрыты unit/e2e тестами

**Преимущества:**
- Гибкость, контроль над UX, поддержка edge cases
- Масштабируемость и расширяемость
- Высокое качество пользовательского опыта

**Документация и стандарты:**
- [ADR: UI/UX-архитектура](memory-bank/creative/adr-uiux-architecture.md)
- [Креативная фаза UI/UX](memory-bank/creative/creative-uiux.md) 