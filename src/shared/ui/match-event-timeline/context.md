# MatchEventTimeline: context.md

**Назначение:**
Таймлайн событий матча: голы, карточки, замены и др. Визуализация по времени, с карточками событий.

**Варианты:**
- Гол (goal)
- Жёлтая карточка (yellow-card)
- Замена (substitution)
- Красная карточка (red-card)
- Автогол (own-goal)
- Пенальти (penalty)
- Другое (other)

**Цвета:**
Только через matchEventColorMap и tokens/colors.ts.

**Best practices:**
- Inline-цвета запрещены.
- Для текста использовать только Typography.
- Showcase всех вариантов — только в Style Guide.
- Для новых вариантов — расширять matchEventColorMap. 