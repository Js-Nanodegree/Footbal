import React, { useState } from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import BottomSheetModal from '../BottomSheetModal';
import { Text, Button } from 'react-native';

const TestComponent = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button title="open" onPress={() => setOpen(true)} />
      {open && (
        <BottomSheetModal
          title="Тест"
          onClose={() => setOpen(false)}
          snapPoints={['30%', '60%']}
        >
          <Text testID="modal-content">Контент модального окна</Text>
          <Button title="close" onPress={() => setOpen(false)} />
        </BottomSheetModal>
      )}
    </>
  );
};

describe('BottomSheetModal (react-native)', () => {
  it('открывает и закрывает модальное окно', () => {
    render(<TestComponent />);
    expect(screen.queryByTestId('modal-content')).toBeNull();

    fireEvent.press(screen.getByText('open'));
    expect(screen.getByTestId('modal-content')).toBeTruthy();

    fireEvent.press(screen.getByText('close'));
    expect(screen.queryByTestId('modal-content')).toBeNull();
  });
}); 