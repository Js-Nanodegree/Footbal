import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import { configureStore } from '@reduxjs/toolkit';
import reducer, { fetchPastMatches } from '../teamPastMatchesSlice';
import { useAppDispatch } from '../../../../shared/hooks/useAppDispatch';
import { useAppSelector } from '../../../../shared/hooks/useAppSelector';
import { Text, Button } from 'react-native';

const TestComponent = () => {
  const dispatch = useAppDispatch();
  const { sections, loading, error } = useAppSelector((s) => s.teamPastMatches);

  return (
    <>
      <Button title="load" onPress={() => dispatch(fetchPastMatches(123) as any)} />
      {loading && <Text testID="loading">loading</Text>}
      {error && <Text testID="error">{error}</Text>}
      {sections.length > 0 && (
        <Text testID="result">{sections[0].data[0].homeTeam}</Text>
      )}
    </>
  );
};

describe('TeamPastMatchesScreen async thunk (react-native)', () => {
  it('отображает результат после успешного fetch', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => [{ id: 1, homeTeam: 'A', awayTeam: 'B', score: '2:1' }],
    });

    const store = configureStore({ reducer: { teamPastMatches: reducer } });

    render(
      <Provider store={store}>
        <TestComponent />
      </Provider>
    );

    fireEvent.press(screen.getByText('load'));
    expect(screen.getByTestId('loading')).toBeTruthy();

    await waitFor(() => expect(screen.getByTestId('result').props.children).toBe('A'));
  });

  it('отображает ошибку при неудачном fetch', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    const store = configureStore({ reducer: { teamPastMatches: reducer } });

    render(
      <Provider store={store}>
        <TestComponent />
      </Provider>
    );

    fireEvent.press(screen.getByText('load'));
    expect(screen.getByTestId('loading')).toBeTruthy();

    await waitFor(() => expect(screen.getByTestId('error').props.children).toBe('Network error'));
  });
}); 