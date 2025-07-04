# MatchCard: context.md (Badge, ScoreBlock)

**Назначение:**
Badge — бейдж для статусов/лейблов, ScoreBlock — блок счета матча. Pixel-perfect стилизация, строгая типизация.

**Структура:**
- Используют централизованные badgeColorMap и scoreBlockColorMap для всех цветов и стилей.
- Поддержка light/dark тем через структуру colorMap.
- Все inline-цвета и дефолты убраны.

**Рекомендации:**
- Для новых вариантов — расширять соответствующие colorMap.
- Для темизации — использовать ThemeProvider/context. 