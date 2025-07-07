# ScreenWrapper

## Назначение

ScreenWrapper — универсальная обёртка для экранов, которая централизует обработку всех ключевых UI-состояний:
- Загрузка (loading)
- Нет сети + skeleton (offline)
- Ошибка (error)
- Пустой экран (empty)
- Основной контент (children)

## Пропсы
- `loading?: boolean` — состояние загрузки
- `isConnected?: boolean` — статус сети (обычно из useMMKVNetworkStatus)
- `hasData?: boolean` — есть ли данные для отображения
- `error?: string | null` — текст ошибки
- `emptyComponent?: React.ReactNode` — кастомный компонент для пустого экрана
- `loaderComponent?: React.ReactNode` — кастомный лоадер
- `skeletonComponent?: React.ReactNode` — кастомный skeleton
- `errorComponent?: (msg: string) => React.ReactNode` — кастомный error-компонент
- `children: React.ReactNode` — основной контент экрана

## Пример использования
```tsx
import ScreenWrapper from './ScreenWrapper';
import { useMMKVNetworkStatus } from '../memory-bank/mmkvMemoryBank';

const isConnected = useMMKVNetworkStatus();

<ScreenWrapper
  loading={loading}
  isConnected={isConnected}
  hasData={data.length > 0}
  error={error}
>
  <MainContent data={data} />
</ScreenWrapper>
```

## Best practices
- Используйте ScreenWrapper на всех экранах, где есть загрузка, offline, ошибки или пустые состояния.
- Для overlay, retry, refresh, кастомных empty/error/skeleton — используйте соответствующие пропсы.
- Не дублируйте логику отображения состояний в самих экранах — всё через Wrapper.
- Для глобальных overlay/модалок используйте отдельный контекст или слот в Wrapper.

## Расширение
- Можно добавить overlay, retry, refresh, кастомные компоненты через пропсы.
- Можно интегрировать с глобальным контекстом для overlay/модалок/нотификаций.

# OverlayContext

## Назначение

OverlayContext — глобальный контекст для управления overlay/модалками из любого места приложения. Позволяет показывать и скрывать overlay, которые рендерятся поверх всего приложения.

## API
- `OverlayProvider` — провайдер, оборачивает всё приложение.
- `useOverlay()` — хук для доступа к overlay-методам:
  - `showOverlay(node: ReactNode)` — показать overlay/модалку
  - `hideOverlay()` — скрыть overlay
  - `overlay: ReactNode` — текущее содержимое overlay

## Пример интеграции
```tsx
import { OverlayProvider, useOverlay } from './OverlayContext';

// В App.tsx:
<OverlayProvider>
  <App />
</OverlayProvider>

// В любом компоненте:
const { showOverlay, hideOverlay } = useOverlay();

const handleOpenModal = () => {
  showOverlay(
    <MyModal onClose={hideOverlay} />
  );
};
```

## Best practices
- Оборачивайте всё приложение в OverlayProvider (на самом верхнем уровне).
- Для overlay используйте отдельные компоненты (например, модалки, bottom sheet, toast).
- Не храните бизнес-логику в overlay, только UI и обработчики событий.
- Для сложных сценариев (стек модалок, очереди) расширяйте OverlayContext по аналогии.

## Расширение
- Можно добавить поддержку нескольких overlay (стек), очереди, анимаций.
- Можно интегрировать с глобальными событиями (например, закрытие overlay по back press). 