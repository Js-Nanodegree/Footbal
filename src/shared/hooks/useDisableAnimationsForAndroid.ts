// @ts-expect-error: типы react-native могут отсутствовать в среде, но Platform есть в рантайме
import { Platform } from 'react-native';

/**
 * Возвращает true, если анимации должны быть отключены (Android), иначе false (iOS/другое)
 */
export function useDisableAnimationsForAndroid(): boolean {
  return Platform.OS === 'android';
} 