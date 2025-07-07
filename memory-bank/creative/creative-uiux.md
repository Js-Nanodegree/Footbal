# Креативная фаза: UI/UX дизайн-система FOOTBAL

## Описание компонента
Pixel-perfect дизайн-система для мобильного приложения FOOTBAL (React Native), интеграция с football-data.org API, строгая ориентация на референсы.

---

## VAN-анализ
- **Value:** Масштабируемый pixel-perfect UI, единый стиль, быстрая поддержка новых тем и вариантов.
- **Added Value:** Централизация цветов/шрифтов, готовность к dark mode, showcase для быстрой проверки.
- **Next:** Внедрить ThemeProvider/context для динамической смены темы, расширять colorMap для новых вариантов.

---

## Гайдлайны и решения
- Все цвета, шрифты, варианты вынесены в централизованные colorMap (buttonColorMap, badgeColorMap, scoreBlockColorMap).
- Компоненты Button, Badge, ScoreBlock используют только значения из colorMap.
- Структура colorMap поддерживает light/dark темы и расширяема для новых вариантов.
- Typography, MatchCard, Button, Badge, ScoreBlock используют централизованные стили.
- Showcase реализован через SectionList + FlatList.
- Для новых тем — расширять colorMap, не менять логику компонентов.
- Строгая типизация пропсов.

---

## Структура colorMap (пример)
```ts
export const buttonColorMap = {
  light: {
    primary: { background: '#FF2D7A', text: '#fff', border: '#FF2D7A', shadow: '#FF2D7A', indicator: '#fff' },
    secondary: { background: '#fff', text: '#FF2D7A', border: '#FF2D7A', shadow: '#FF2D7A', indicator: '#FF2D7A' },
    disabled: { background: '#F2F2F2', text: '#BDBDBD', border: '#F2F2F2', shadow: 'transparent', indicator: '#BDBDBD' },
  },
  dark: {
    primary: { background: '#FF2D7A', text: '#fff', border: '#FF2D7A', shadow: '#FF2D7A', indicator: '#fff' },
    secondary: { background: '#222', text: '#FF2D7A', border: '#FF2D7A', shadow: '#FF2D7A', indicator: '#FF2D7A' },
    disabled: { background: '#333', text: '#888', border: '#333', shadow: 'transparent', indicator: '#888' },
  },
};
```

---

## Чек-лист верификации
- [x] Все inline-цвета и дефолты убраны из компонентов
- [x] Все компоненты используют централизованные colorMap
- [x] Showcase отображает все варианты
- [x] Структура colorMap готова для темизации
- [x] Решения зафиксированы в Memory Bank

---

## Рекомендации
- Для поддержки новых тем — расширять colorMap.
- Для динамической темы — внедрить ThemeProvider/context.
- Для новых компонентов — сразу использовать централизованные таблицы стилей.

---

🎨🎨🎨 ENTERING CREATIVE PHASE: UI/UX-архитектура мобильного приложения

**Описание компонента:**
UI/UX-архитектура мобильного футбольного приложения на React Native (TypeScript, Redux Toolkit, MMKV, кастомные overlay-компоненты, SectionList, навигация, фильтры, избранное, история).

**Требования и ограничения:**
- Современный, отзывчивый и масштабируемый UI/UX.
- Поддержка overlay-инфраструктуры (BottomSheet, Toast, GlobalModal и др.).
- Адаптивность, skeleton/loader/error/empty state.
- Навигация между экранами, свайпы, фильтры, избранное, история просмотров.
- Кэширование (MMKV), redux-persist, типобезопасность.
- Локализация, dark mode, unit/e2e тесты.
- Готовность к интеграции с реальным API.

**Варианты реализации:**
| Вариант | Плюсы | Минусы |
|---------|-------|--------|
| 1. Кастомная overlay-инфраструктура (BottomSheet, Toast и др.) + SectionList + Redux Toolkit + MMKV | Максимальная гибкость, контроль над UX, легко расширять, оптимизация под mobile, поддержка всех edge cases | Требует больше времени на разработку, выше порог вхождения для новых разработчиков |
| 2. Использование готовых библиотек (react-native-bottom-sheet, react-native-modalize, react-query, AsyncStorage) | Быстрый старт, меньше кода, хорошая документация | Меньше контроля, сложнее кастомизировать, возможны ограничения по дизайну и edge cases, слабее интеграция с redux/MMKV |
| 3. Минималистичный подход: только стандартные модальные окна, FlatList, AsyncStorage, без кастомных overlay и сложных фильтров | Минимум кода, простота поддержки | Ограниченный UX, нет overlay-стека, слабая адаптивность, нет advanced-фильтров, skeleton, избранного, истории |

**Анализ:**
- Вариант 1 (выбран): Позволяет реализовать все требования Product Manager, поддерживает сложные сценарии (overlay-стек, кастомные snap-точки, фильтры, избранное, историю, кэширование, локализацию, dark mode). Легко масштабируется, интегрируется с redux-toolkit и MMKV, покрывается тестами. Минус — требует больше времени на архитектуру и разработку, но окупается гибкостью и качеством UX.
- Вариант 2: Быстрее на старте, но ограничивает кастомизацию и сложные сценарии (например, overlay-стек, фиксированные кнопки, skeleton). Возможны проблемы с интеграцией redux/MMKV и поддержкой edge cases.
- Вариант 3: Не покрывает требования по overlay, фильтрам, избранному, истории, skeleton/loader/error state. Не подходит для современного продукта с высоким UX.

**Рекомендация:**
Выбран Вариант 1 — кастомная overlay-инфраструктура, SectionList, redux-toolkit, MMKV, типобезопасность, поддержка всех состояний и сценариев.

**Гайдлайны по реализации:**
- Overlay-компоненты (BottomSheet, Toast, GlobalModal) реализовать с drag-зоной, snap-точками, overlay-стеком, unit-тестами и документацией.
- Все состояния (loading, error, empty, skeleton) реализовать для каждого экрана.
- Использовать SectionList для группировки команд/матчей, CupSwitcher/TeamSwitcher для быстрого перехода.
- Redux Toolkit + redux-persist для хранения фильтров, истории, избранного.
- MMKV для быстрого кэширования.
- Навигация через StackNavigator с типизацией параметров, поддержка свайпов.
- Локализация через lingui.js, поддержка dark mode.
- Все компоненты и экраны типизировать, покрыть unit/e2e тестами.
- Документировать архитектуру и сценарии в memory-bank/creative/creative-uiux.md, поддерживать changelog.

**Верификация:**
- Все overlay-компоненты реализованы, покрыты тестами и документацией.
- Каждый экран поддерживает loading/error/empty/skeleton.
- Навигация, фильтры, избранное, история работают и кэшируются.
- Архитектура покрывает все требования Product Manager.
- Решения зафиксированы в Memory Bank, кросс-ссылки обновлены.

🎨🎨🎨 EXITING CREATIVE PHASE 