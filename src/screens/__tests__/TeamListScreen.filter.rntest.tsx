import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TeamListScreen from '../TeamListScreen';

jest.mock('../features/team-api/hooks/useTeams', () => ({
  useTeams: () => ({
    teams: [
      { id: 1, name: 'Arsenal', area: { name: 'England' }, crestUrl: 'logo1' },
      { id: 2, name: 'Barcelona', area: { name: 'Spain' }, crestUrl: 'logo2' },
    ],
    loading: false,
    error: null,
    refresh: jest.fn(),
  }),
}));

describe('TeamListScreen фильтрация', () => {
  it('фильтрует команды по названию', () => {
    const { getByPlaceholderText, queryByText } = render(<TeamListScreen />);
    const input = getByPlaceholderText('Поиск команды');
    fireEvent.changeText(input, 'Barc');
    expect(queryByText('Arsenal')).toBeNull();
    expect(queryByText('Barcelona')).toBeTruthy();
  });
}); 