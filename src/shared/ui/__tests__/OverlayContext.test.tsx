import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { OverlayProvider, useOverlay } from '../OverlayContext';
import { Text, Button } from 'react-native';

describe('OverlayContext', () => {
  const Modal = ({ onClose }: { onClose: () => void }) => (
    <>
      <Text>MODAL</Text>
      <Button title="Close" onPress={onClose} />
    </>
  );

  const TestComponent = () => {
    const { showOverlay, hideOverlay } = useOverlay();
    return (
      <>
        <Button title="Show" onPress={() => showOverlay(<Modal onClose={hideOverlay} />)} />
      </>
    );
  };

  it('shows and hides overlay', () => {
    render(
      <OverlayProvider>
        <TestComponent />
      </OverlayProvider>
    );
    expect(screen.queryByText('MODAL')).toBeNull();
    fireEvent.press(screen.getByText('Show'));
    expect(screen.getByText('MODAL')).toBeTruthy();
    fireEvent.press(screen.getByText('Close'));
    expect(screen.queryByText('MODAL')).toBeNull();
  });

  it('throws if used outside provider', () => {
    const Broken = () => {
      useOverlay();
      return null;
    };
    expect(() => render(<Broken />)).toThrow();
  });
}); 