# Loader: context.md

**Назначение:**
Индикатор загрузки (спиннер). Поддержка разных цветов, размеров, inline, на фоне.

**Варианты:**
- Цвета: primary, secondary, success, error, info
- Размер: small, medium, large
- Inline
- На фоне (background)

**Цвета:**
Использует loaderColorMap и tokens/colors.ts для всех вариантов.

**Рекомендации:**
- Inline-цвета запрещены.
- Для новых вариантов — расширять loaderColorMap.
- Showcase всех вариантов — только в Style Guide.
- Для подписей/текста рядом с Loader использовать только Typography. 