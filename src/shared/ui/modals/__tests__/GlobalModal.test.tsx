import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import GlobalModal from '../GlobalModal';

describe('GlobalModal', () => {
  it('renders modal content', () => {
    render(<GlobalModal onClose={() => {}} />);
    expect(screen.getByText('Глобальная модалка')).toBeTruthy();
    expect(screen.getByText('Это пример overlay через OverlayContext')).toBeTruthy();
    expect(screen.getByText('Закрыть')).toBeTruthy();
  });

  it('calls onClose when close button pressed', () => {
    const onClose = jest.fn();
    render(<GlobalModal onClose={onClose} />);
    fireEvent.press(screen.getByText('Закрыть'));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onOpenSecond when button pressed', () => {
    const onOpenSecond = jest.fn();
    render(<GlobalModal onClose={() => {}} onOpenSecond={onOpenSecond} />);
    fireEvent.press(screen.getByText('Открыть вторую модалку'));
    expect(onOpenSecond).toHaveBeenCalled();
  });
}); 