import React, { useState } from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { SectionList, Text, Button, TouchableOpacity } from 'react-native';

// Моковые данные
const sections = [
  { title: 'A', data: [{ id: 1, name: 'Arsenal' }] },
  { title: 'B', data: [{ id: 2, name: 'Barcelona' }] },
];

const TestComponent = () => {
  const [filter, setFilter] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredSections = filter
    ? sections.filter((section) => section.title === filter)
    : sections;

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  return (
    <>
      <Button title="filter A" onPress={() => setFilter('A')} />
      <Button title="filter B" onPress={() => setFilter('B')} />
      <Button title="reset" onPress={() => setFilter(null)} />
      <SectionList
        sections={filteredSections}
        keyExtractor={(item) => item.id.toString()}
        renderSectionHeader={({ section }) => (
          <Text testID={`header-${section.title}`}>{section.title}</Text>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
            <Text testID={`team-${item.id}`}>
              {item.name}
              {favorites.includes(item.id) ? ' ★' : ''}
            </Text>
          </TouchableOpacity>
        )}
      />
    </>
  );
};

describe('TeamListScreen SectionList (react-native)', () => {
  it('фильтрует секции и отмечает избранное', () => {
    render(<TestComponent />);
    // По умолчанию видны обе секции
    expect(screen.getByTestId('header-A')).toBeTruthy();
    expect(screen.getByTestId('header-B')).toBeTruthy();

    // Фильтр по A
    fireEvent.press(screen.getByText('filter A'));
    expect(screen.getByTestId('header-A')).toBeTruthy();
    expect(screen.queryByTestId('header-B')).toBeNull();

    // Сброс фильтра
    fireEvent.press(screen.getByText('reset'));
    expect(screen.getByTestId('header-B')).toBeTruthy();

    // Отметить избранное
    fireEvent.press(screen.getByTestId('team-2'));
    expect(screen.getByText('Barcelona ★')).toBeTruthy();
  });
}); 