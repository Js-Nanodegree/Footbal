import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { SectionList, Text, TouchableOpacity } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Моковый redux-slice избранного
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [] as number[],
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) =>
      state.includes(action.payload)
        ? state.filter((id) => id !== action.payload)
        : [...state, action.payload],
  },
});
const { toggleFavorite } = favoritesSlice.actions;

const store = configureStore({
  reducer: { favorites: favoritesSlice.reducer },
});

// Моковые данные
const sections = [
  { title: 'A', data: [{ id: 1, name: 'Arsenal' }] },
  { title: 'B', data: [{ id: 2, name: 'Barcelona' }] },
];

const TestComponent = () => {
  const favorites = useSelector((state: { favorites: number[] }) => state.favorites);
  const dispatch = useDispatch();

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id.toString()}
      renderSectionHeader={({ section }) => (
        <Text testID={`header-${section.title}`}>{section.title}</Text>
      )}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => dispatch(toggleFavorite(item.id))}>
          <Text testID={`team-${item.id}`}>
            {item.name}
            {favorites.includes(item.id) ? ' ★' : ''}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

describe('TeamListScreen SectionList + redux (react-native)', () => {
  it('отмечает и снимает избранное через redux', () => {
    render(
      <Provider store={store}>
        <TestComponent />
      </Provider>
    );
    // По умолчанию нет ★
    expect(screen.getByText('Arsenal')).toBeTruthy();
    expect(screen.getByText('Barcelona')).toBeTruthy();

    // Добавить в избранное
    fireEvent.press(screen.getByTestId('team-2'));
    expect(screen.getByText('Barcelona ★')).toBeTruthy();

    // Снять из избранного
    fireEvent.press(screen.getByTestId('team-2'));
    expect(screen.getByText('Barcelona')).toBeTruthy();
  });
}); 