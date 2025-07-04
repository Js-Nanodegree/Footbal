# ListItem: context.md

**Назначение:**
Элемент списка (команда, игрок, матч и др.). Поддержка иконок, аватаров, подзаголовка, actions, selected, disabled.

**Варианты:**
- Обычный (default)
- С иконкой (withIcon)
- С аватаром (withAvatar)
- С подзаголовком (withSubtitle)
- С actions (withActions)
- Selected
- Disabled

**Цвета:**
Только через listItemColorMap и tokens/colors.ts.

**Best practices:**
- Inline-цвета запрещены.
- Для текста использовать только Typography.
- Showcase всех вариантов — только в Style Guide.
- Для новых вариантов — расширять listItemColorMap. 