import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TeamListTestComponent } from '../TeamListTestComponent';
import { TeamApiService } from '../services/teamApi';

jest.mock('../services/teamApi', () => ({
  TeamApiService: {
    getTeams: jest.fn(),
    getTeamDetails: jest.fn(),
    getTeamMatches: jest.fn(),
  },
}));

const mockTeams = [
  { id: 1, name: 'Team 1', lastUpdated: '' },
  { id: 2, name: 'Team 2', lastUpdated: '' },
];
const mockTeamsPage2 = [
  { id: 3, name: 'Team 3', lastUpdated: '' },
  { id: 4, name: 'Team 4', lastUpdated: '' },
];

describe('TeamListTestComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('загружает и пагинирует команды', async () => {
    (TeamApiService.getTeams as jest.Mock)
      .mockImplementationOnce(() => Promise.resolve(mockTeams))
      .mockImplementationOnce(() => Promise.resolve(mockTeamsPage2));

    const { getByTestId, findByText } = render(<TeamListTestComponent />);

    // Проверяем первую страницу
    expect(await findByText('Team 1')).toBeTruthy();
    expect(await findByText('Team 2')).toBeTruthy();

    // Кликаем "Load more"
    fireEvent.press(getByTestId('load-more-btn'));

    // Проверяем вторую страницу
    expect(await findByText('Team 3')).toBeTruthy();
    expect(await findByText('Team 4')).toBeTruthy();
  });
}); 