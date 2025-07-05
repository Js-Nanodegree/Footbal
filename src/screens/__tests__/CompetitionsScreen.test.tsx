import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CompetitionsScreen from '../CompetitionsScreen';

jest.mock('../../features/team-api/hooks/useCompetitions');
const useCompetitions = require('../../features/team-api/hooks/useCompetitions').useCompetitions;

const mockCompetitions = [
  { id: 1, name: 'Premier League', code: 'PL', area: { id: 2072, name: 'England', code: 'ENG', flag: '' }, lastUpdated: '', type: 'LEAGUE', emblem: '' },
  { id: 2, name: 'La Liga', code: 'LL', area: { id: 2224, name: 'Spain', code: 'ESP', flag: '' }, lastUpdated: '', type: 'LEAGUE', emblem: '' },
];

describe('CompetitionsScreen', () => {
  it('отображает лоадер при загрузке', () => {
    useCompetitions.mockReturnValue({ competitions: [], loading: true, error: null, refresh: jest.fn() });
    const { getByTestId } = render(<CompetitionsScreen />);
    expect(getByTestId('ActivityIndicator')).toBeTruthy();
  });

  it('отображает список турниров', () => {
    useCompetitions.mockReturnValue({ competitions: mockCompetitions, loading: false, error: null, refresh: jest.fn() });
    const { getByText } = render(<CompetitionsScreen />);
    expect(getByText('Premier League')).toBeTruthy();
    expect(getByText('La Liga')).toBeTruthy();
    expect(getByText('England')).toBeTruthy();
    expect(getByText('Spain')).toBeTruthy();
  });

  it('отображает ошибку', () => {
    useCompetitions.mockReturnValue({ competitions: [], loading: false, error: 'Ошибка', refresh: jest.fn() });
    const { getByText } = render(<CompetitionsScreen />);
    expect(getByText('Ошибка')).toBeTruthy();
  });

  it('вызывает refresh при pull-to-refresh', async () => {
    const refreshMock = jest.fn();
    useCompetitions.mockReturnValue({ competitions: mockCompetitions, loading: false, error: null, refresh: refreshMock });
    const { getByTestId } = render(<CompetitionsScreen />);
    // FlatList не поддерживает onRefresh напрямую, поэтому эмулируем вызов
    fireEvent(getByTestId('FlatList'), 'refresh');
    expect(refreshMock).toHaveBeenCalled();
  });
}); 