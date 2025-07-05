import React from 'react';
import { render } from '@testing-library/react-native';
import CompetitionDetailsScreen from '../CompetitionDetailsScreen';

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useRoute: () => ({
      params: {
        competition: {
          id: 1,
          name: 'Premier League',
          code: 'PL',
          area: { id: 2072, name: 'England', code: 'ENG', flag: '' },
          lastUpdated: '',
          type: 'LEAGUE',
          emblem: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg',
          currentSeason: {
            id: 100,
            startDate: '2023-08-01',
            endDate: '2024-05-31',
          },
        },
      },
    }),
  };
});

describe('CompetitionDetailsScreen', () => {
  it('отображает все основные поля турнира', () => {
    const { getByText, getByRole } = render(<CompetitionDetailsScreen />);
    expect(getByText('Premier League')).toBeTruthy();
    expect(getByText('England')).toBeTruthy();
    expect(getByText('ID: 1')).toBeTruthy();
    expect(getByText('Code: PL')).toBeTruthy();
    expect(getByText('Type: LEAGUE')).toBeTruthy();
    expect(getByText('Season: 2023-08-01 — 2024-05-31')).toBeTruthy();
    // Проверяем наличие эмблемы
    expect(getByRole('image')).toBeTruthy();
  });
}); 