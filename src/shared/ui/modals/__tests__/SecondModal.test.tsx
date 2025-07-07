import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import SecondModal from '../SecondModal';

describe('SecondModal', () => {
  it('renders modal content', () => {
    render(<SecondModal onClose={() => {}} />);
    expect(screen.getByText('Вторая модалка')).toBeTruthy();
    expect(screen.getByText('OverlayStack: вложенная модалка')).toBeTruthy();
    expect(screen.getByText('Закрыть вторую модалку')).toBeTruthy();
  });

  it('calls onClose when close button pressed', () => {
    const onClose = jest.fn();
    render(<SecondModal onClose={onClose} />);
    fireEvent.press(screen.getByText('Закрыть вторую модалку'));
    expect(onClose).toHaveBeenCalled();
  });
}); 