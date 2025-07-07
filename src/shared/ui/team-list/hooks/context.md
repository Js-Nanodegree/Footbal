# useRippleScaleAnimation

**Назначение:**
Инкапсулирует анимацию появления/исчезновения с ripple и scale для элементов FlatList/компонентов. Позволяет реализовать плавные UX-анимации выбора, снятия выбора, drag&drop и др.

**API:**
- `scale: Animated.Value` — масштаб для анимации появления/исчезновения
- `opacity: Animated.Value` — прозрачность
- `rippleScale: Animated.Value` — масштаб ripple-эффекта
- `rippleOpacity: Animated.Value` — прозрачность ripple
- `animateIn(): void` — запуск анимации появления
- `animateOut(): void` — запуск анимации исчезновения
- `isAnimating: boolean` — индикатор анимации
- `onInEnd?: () => void` — колбэк по завершении animateIn
- `onOutEnd?: () => void` — колбэк по завершении animateOut
- `durationIn`, `durationOut`, `durationRipple` — настройка длительности

**Сценарии использования:**
- Анимированное появление/исчезновение карточек в списках
- Ripple-эффект при выборе/снятии выбора
- Drag&drop reorder с анимацией
- Переиспользование в других UI-компонентах для единообразия анимаций

**Пример:**
```tsx
const {
  scale, opacity, rippleScale, rippleOpacity,
  animateIn, animateOut, isAnimating
} = useRippleScaleAnimation({
  durationIn: 300,
  durationOut: 300,
  onInEnd: () => {},
  onOutEnd: () => {},
});
```

**Контекст:**
Используется в TeamList для анимации выбора/снятия выбора команд. Может быть интегрирован в любые FlatList/SectionList/карточки для современного UX. 