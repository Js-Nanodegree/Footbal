import React from 'react';
import { render, screen, act } from '@testing-library/react-native';
import ToastModal from '../ToastModal';

jest.useFakeTimers();

describe('ToastModal', () => {
  it('renders toast message', () => {
    render(<ToastModal message="Hello toast!" onClose={() => {}} />);
    expect(screen.getByText('Hello toast!')).toBeTruthy();
  });

  it('calls onClose after duration', () => {
    const onClose = jest.fn();
    render(<ToastModal message="Bye!" onClose={onClose} duration={1500} />);
    expect(onClose).not.toHaveBeenCalled();
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    // Ждём завершения fade-out (120ms)
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(onClose).toHaveBeenCalled();
  });
}); 