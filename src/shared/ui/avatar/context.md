# Avatar: context.md

**Назначение:**
Аватар пользователя, игрока или команды. Поддержка фото, инициалов, статусов, разных цветов и размеров.

**Варианты:**
- С фото (src)
- С инициалами (initials)
- Круглый/квадратный (shape)
- С рамкой (border)
- Цветовые варианты (colorVariant)
- Размеры (small, medium, large)
- Статус (online, offline, busy)

**Цвета:**
Использует avatarColorMap и tokens/colors.ts для всех вариантов.

**Рекомендации:**
- Inline-цвета запрещены.
- Для новых вариантов — расширять avatarColorMap.
- Showcase всех вариантов — только в Style Guide. 