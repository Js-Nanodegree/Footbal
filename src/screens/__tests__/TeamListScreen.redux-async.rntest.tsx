import React, { useEffect } from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import { SectionList, Text } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { configureStore, createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Моковый thunk для загрузки данных
const fetchTeams = createAsyncThunk('teams/fetch', async () => {
  return [
    { id: 1, name: 'Arsenal', section: 'A' },
    { id: 2, name: 'Barcelona', section: 'B' },
  ];
});

type Team = { id: number; name: string; section: string };
type State = { sections: { title: string; data: Team[] }[]; loading: boolean };

const teamsSlice = createSlice({
  name: 'teams',
  initialState: { sections: [], loading: false } as State,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeams.fulfilled, (state, action: PayloadAction<Team[]>) => {
        state.loading = false;
        state.sections = [
          { title: 'A', data: action.payload.filter((t) => t.section === 'A') },
          { title: 'B', data: action.payload.filter((t) => t.section === 'B') },
        ];
      });
  },
});

const store = configureStore({ reducer: { teams: teamsSlice.reducer } });

const TestComponent = () => {
  const dispatch = useDispatch();
  const { sections, loading } = useSelector((state: any) => state.teams);

  useEffect(() => {
    dispatch(fetchTeams() as any);
  }, [dispatch]);

  if (loading) return <Text testID="loading">loading</Text>;

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id.toString()}
      renderSectionHeader={({ section }) => (
        <Text testID={`header-${section.title}`}>{section.title}</Text>
      )}
      renderItem={({ item }) => (
        <Text testID={`team-${item.id}`}>{item.name}</Text>
      )}
    />
  );
};

describe('TeamListScreen SectionList + redux + async thunk (react-native)', () => {
  it('загружает и отображает данные через thunk', async () => {
    render(
      <Provider store={store}>
        <TestComponent />
      </Provider>
    );
    expect(screen.getByTestId('loading')).toBeTruthy();

    await waitFor(() => expect(screen.getByTestId('header-A')).toBeTruthy());
    expect(screen.getByTestId('team-1').props.children).toBe('Arsenal');
    expect(screen.getByTestId('team-2').props.children).toBe('Barcelona');
  });
}); 