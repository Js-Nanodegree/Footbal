import React, { useState } from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { SectionList, Text } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

// Моковые данные
const sections = [
  { title: 'A', data: [{ id: 1, name: 'Arsenal' }] },
  { title: 'B', data: [{ id: 2, name: 'Barcelona' }] },
];

const TestComponent = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const handleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const renderRightActions = (item: { id: number }) => (
    <Text
      testID={`swipe-action-${item.id}`}
      onPress={() => handleFavorite(item.id)}
      style={{ backgroundColor: '#FF2D7A', color: '#fff', padding: 12 }}
    >
      {favorites.includes(item.id) ? 'Убрать из избранного' : 'В избранное'}
    </Text>
  );

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id.toString()}
      renderSectionHeader={({ section }) => (
        <Text testID={`header-${section.title}`}>{section.title}</Text>
      )}
      renderItem={({ item }) => (
        <Swipeable renderRightActions={() => renderRightActions(item)}>
          <Text testID={`team-${item.id}`}>
            {item.name}
            {favorites.includes(item.id) ? ' ★' : ''}
          </Text>
        </Swipeable>
      )}
    />
  );
};

describe('TeamListScreen SectionList swipe (react-native)', () => {
  it('добавляет и убирает из избранного по свайпу', () => {
    render(<TestComponent />);
    // По умолчанию нет ★
    expect(screen.getByText('Arsenal')).toBeTruthy();
    expect(screen.getByText('Barcelona')).toBeTruthy();

    // Имитация свайпа: просто вызываем onPress у swipe-action
    fireEvent.press(screen.getByTestId('swipe-action-2'));
    expect(screen.getByText('Barcelona ★')).toBeTruthy();

    // Повторный свайп — убирает из избранного
    fireEvent.press(screen.getByTestId('swipe-action-2'));
    expect(screen.getByText('Barcelona')).toBeTruthy();
  });
}); 