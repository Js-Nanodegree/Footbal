import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TeamListScreen from '../TeamListScreen';

const navigateMock = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: navigateMock,
  }),
}));

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

describe('TeamListScreen переход по ListItem', () => {
  it('вызывает navigate с правильным id', () => {
    const { getByText } = render(<TeamListScreen />);
    fireEvent.press(getByText('Arsenal'));
    expect(navigateMock).toHaveBeenCalledWith('TeamDetails', { teamId: 1 });
  });
}); 