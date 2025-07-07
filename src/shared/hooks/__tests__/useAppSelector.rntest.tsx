import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react-native';
import { store } from '../../api/store';
import { useAppSelector } from '../useAppSelector';

const TestComponent = () => {
  const state = useAppSelector((s) => s);
  return <>{state.teamPastMatches ? <Text testID="ok">ok</Text> : <Text testID="fail">fail</Text>}</>;
};

describe('useAppSelector (react-native)', () => {
  it('возвращает корректное состояние из redux', () => {
    render(
      <Provider store={store}>
        <TestComponent />
      </Provider>
    );
    expect(screen.getByTestId('ok')).toBeTruthy();
  });
}); 