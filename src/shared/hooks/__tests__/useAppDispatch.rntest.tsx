import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { store } from '../../api/store';
import { useAppDispatch } from '../useAppDispatch';
import { useAppSelector } from '../useAppSelector';
import { setDateFilter } from '../../../features/team-api/redux/teamPastMatchesSlice';
import { Text, Button } from 'react-native';

const TestComponent = () => {
  const dispatch = useAppDispatch();
  const date = useAppSelector((s) => s.teamPastMatches.dateFilter);
  return (
    <>
      <Text testID="date">{date || 'none'}</Text>
      <Button title="set date" onPress={() => dispatch(setDateFilter('2024-06-20'))} />
    </>
  );
};

describe('useAppDispatch (react-native)', () => {
  it('диспатчит экшен и меняет состояние redux', () => {
    render(
      <Provider store={store}>
        <TestComponent />
      </Provider>
    );
    expect(screen.getByTestId('date').props.children).toBe('none');
    fireEvent.press(screen.getByText('set date'));
    expect(screen.getByTestId('date').props.children).toBe('2024-06-20');
  });
}); 