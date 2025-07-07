import React, { useState } from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react-native';
import ToastModal from '../ToastModal';
import { Button } from 'react-native';

const TestComponent = () => {
  const [open, setOpen] = useState(false);

  const showToast = () => {
    setOpen(true);
  };

  return (
    <>
      <Button title="show toast" onPress={showToast} />
      {open && (
        <ToastModal
          message="Тост сообщение"
          onClose={() => setOpen(false)}
          duration={800}
        />
      )}
    </>
  );
};

describe('ToastModal (react-native)', () => {
  it('показывает и скрывает тост', () => {
    jest.useFakeTimers();
    render(<TestComponent />);
    expect(screen.queryByText('Тост сообщение')).toBeNull();

    fireEvent.press(screen.getByText('show toast'));
    expect(screen.getByText('Тост сообщение')).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(800);
    });
    expect(screen.queryByText('Тост сообщение')).toBeNull();
    jest.useRealTimers();
  });
}); 