import React from 'react';
import { Button, FlatList, Text } from 'react-native';
import { useTeams } from './hooks/useTeams';

export const TeamListTestComponent = () => {
  const { teams, loadNextPage, loading } = useTeams(2);

  return (
    <>
      <FlatList
        data={teams}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <Text testID={`team-${item.id}`}>{item.name}</Text>}
      />
      <Button title="Load more" onPress={loadNextPage} disabled={loading} testID="load-more-btn" />
    </>
  );
}; 