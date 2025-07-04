# Button: context.md

**Назначение:**
Кнопка с поддержкой вариантов (primary, secondary, disabled), pixel-perfect стилизация, строгая типизация.

**Структура:**
- Использует централизованный buttonColorMap для всех цветов и стилей.
- Поддержка light/dark тем через структуру colorMap.
- Все inline-цвета и дефолты убраны.

**Рекомендации:**
- Для новых вариантов — расширять buttonColorMap.
- Для темизации — использовать ThemeProvider/context. 