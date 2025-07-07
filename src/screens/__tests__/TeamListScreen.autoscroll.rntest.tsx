import React, { useRef, useEffect } from 'react';
import { render, screen } from '@testing-library/react-native';
import { SectionList, Text } from 'react-native';

// Моковые данные с live-матчем
const sections = [
  { title: 'A', data: [{ id: 1, name: 'Arsenal', status: 'FINISHED' }] },
  { title: 'B', data: [{ id: 2, name: 'Barcelona', status: 'LIVE' }] },
];

const TestComponent = () => {
  const sectionListRef = useRef<SectionList>(null);

  useEffect(() => {
    // Найти индекс секции и элемента с live-матчем
    for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
      const section = sections[sectionIndex];
      const itemIndex = section.data.findIndex((match) => match.status === 'LIVE');
      if (itemIndex >= 0 && sectionListRef.current) {
        // Мокаем scrollToLocation
        (sectionListRef.current as any).scrollToLocation({
          sectionIndex,
          itemIndex,
          animated: true,
          viewPosition: 0.5,
        });
        break;
      }
    }
  }, []);

  return (
    <SectionList
      ref={sectionListRef}
      sections={sections}
      keyExtractor={(item) => item.id.toString()}
      renderSectionHeader={({ section }) => (
        <Text testID={`header-${section.title}`}>{section.title}</Text>
      )}
      renderItem={({ item }) => (
        <Text testID={`team-${item.id}`}>
          {item.name}
          {item.status === 'LIVE' ? ' (LIVE)' : ''}
        </Text>
      )}
    />
  );
};

describe('TeamListScreen SectionList autoscroll (react-native)', () => {
  it('автоскроллит к live-матчу', () => {
    // Мокаем scrollToLocation
    const scrollToLocationMock = jest.fn();
    jest.spyOn(SectionList.prototype, 'scrollToLocation').mockImplementation(scrollToLocationMock);

    render(<TestComponent />);
    // Проверяем, что scrollToLocation был вызван с нужными индексами
    expect(scrollToLocationMock).toHaveBeenCalledWith({
      sectionIndex: 1,
      itemIndex: 0,
      animated: true,
      viewPosition: 0.5,
    });

    // Проверяем, что live-матч отображается
    expect(screen.getByText('Barcelona (LIVE)')).toBeTruthy();
  });
}); 