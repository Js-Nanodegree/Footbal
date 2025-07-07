import React from 'react';
import { render, screen, act, fireEvent, Text } from '@testing-library/react-native';
import { OverlayProvider } from '../../OverlayContext';
import { useToast } from '../useToast';

jest.useFakeTimers();

describe('useToast', () => {
  const TestComponent = () => {
    const showToast = useToast();
    return <Text onPress={() => showToast('Toast!')}>Show</Text>;
  };

  it('показывает ToastModal и auto-close работает', () => {
    render(
      <OverlayProvider>
        <TestComponent />
      </OverlayProvider>
    );
    act(() => {
      fireEvent.press(screen.getByText('Show'));
    });
    expect(screen.getByText('Toast!')).toBeTruthy();
    act(() => {
      jest.advanceTimersByTime(2000);
      jest.advanceTimersByTime(200);
    });
    expect(screen.queryByText('Toast!')).toBeNull();
  });
}); 