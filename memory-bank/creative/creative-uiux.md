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