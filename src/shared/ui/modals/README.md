# Модалки (Modals)

## Назначение

Модальные окна (`GlobalModal`, `SecondModal`, `ToastModal`, `BottomSheetModal` и др.) используются для overlay-контента: подтверждения, уведомления, фильтры, быстрые действия и т.д.

## BottomSheetModal: кастомизация

### Пропсы
- `title: string` — заголовок
- `children: React.ReactNode` — контент
- `onClose: () => void` — обработчик закрытия
- `height?: number` — высота BottomSheet (по умолчанию 320)
- `containerStyle?: StyleProp<ViewStyle>` — стиль overlay-контейнера
- `sheetStyle?: StyleProp<ViewStyle>` — стиль самого BottomSheet
- `indicatorColor?: string` — цвет drag indicator (по умолчанию #ccc)

### Пример использования
```tsx
showOverlay(
  <BottomSheetModal
    title="Фильтры"
    onClose={hideOverlay}
    height={400}
    indicatorColor="#E94057"
    sheetStyle={{ backgroundColor: '#f7f7f7' }}
  >
    <Text>Кастомный контент</Text>
  </BottomSheetModal>
);
```

### Best practices
- Используйте кастомные стили для интеграции с дизайн-системой.
- Для drag indicator используйте фирменный цвет.
- Для сложных сценариев (fullscreen, partial) меняйте height и sheetStyle.
- Для фильтров, выбора опций, быстрых действий используйте BottomSheetModal вместо обычных модалок.
- Покрывайте overlay-компоненты unit- и e2e-тестами.

## Общие рекомендации
- Все overlay должны быть чистыми компонентами без бизнес-логики.
- Управляйте overlay только через OverlayContext (`showOverlay`, `hideOverlay`).
- Для вложенных/стековых overlay используйте стек OverlayContext.
- Не храните состояние внутри overlay — управляйте им через пропсы и OverlayContext.
- Для временных уведомлений используйте ToastModal с auto-close.
- Для глобальных ошибок, фильтров, подтверждений используйте модалки и BottomSheet.

## Best practices
- Все модалки должны быть чистыми компонентами без бизнес-логики.
- Для управления показом используйте OverlayContext (`showOverlay`, `hideOverlay`).
- Для вложенных/стековых модалок используйте стек OverlayContext.
- Стили модалок должны быть единообразны: фон, скругления, отступы, zIndex.
- Не храните состояние внутри модалки — управляйте им через пропсы и OverlayContext.
- Для сложных сценариев (bottom sheet, toast) создавайте отдельные компоненты.

## Пример использования
```tsx
import { useOverlay } from '../OverlayContext';
import GlobalModal from './GlobalModal';
import SecondModal from './SecondModal';

const { showOverlay, hideOverlay } = useOverlay();

const handleOpenModal = () => {
  showOverlay(
    <GlobalModal onClose={hideOverlay} onOpenSecond={handleOpenSecondModal} />
  );
};

const handleOpenSecondModal = () => {
  showOverlay(
    <SecondModal onClose={hideOverlay} />
  );
};
```

## Рекомендации по стилю
- Используйте прозрачный overlay (`rgba(0,0,0,0.4)`), скругления, тени.
- Центрируйте контент модалки.
- Кнопки "Закрыть" и "Действие" должны быть явно видны.
- Для вложенных модалок увеличивайте zIndex.

## Тестирование
- Покрывайте модалки unit-тестами (отображение, обработка onClose, вложенность).
- Тестируйте сценарии открытия/закрытия через OverlayContext. 