import { useOverlay } from '../OverlayContext';
import ToastModal from './ToastModal';

export function useToast() {
  const { showOverlay, hideOverlay } = useOverlay();
  return (msg: string, duration?: number) => {
    showOverlay(<ToastModal message={msg} onClose={hideOverlay} duration={duration} />);
  };
} 