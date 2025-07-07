import React from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl, Image, StyleSheet } from 'react-native';
import { useStandings } from '../features/team-api/hooks/useStandings';
import { RouteProp, useRoute } from '@react-navigation/native';
import { TableEntry } from '../features/team-api/types/standing';
import { useMMKVNetworkStatus } from '../shared/memory-bank/mmkvMemoryBank';
import ScreenWrapper from '../shared/ui/ScreenWrapper';

// Ожидаем competitionId через route.params
export type StandingsScreenParams = {
  competitionId: number;
};

function TableEntryItem({ item }: { item: TableEntry }) {
  return (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.position}</Text>
      {item.team.crest ? (
        <Image source={{ uri: item.team.crest }} style={styles.crest} />
      ) : null}
      <Text style={[styles.cell, { flex: 2 }]}>{item.team.name}</Text>
      <Text style={styles.cell}>{item.playedGames}</Text>
      <Text style={styles.cell}>{item.points}</Text>
      <Text style={styles.cell}>{item.won}</Text>
      <Text style={styles.cell}>{item.draw}</Text>
      <Text style={styles.cell}>{item.lost}</Text>
      <Text style={styles.cell}>{item.goalDifference}</Text>
    </View>
  );
}

export default function StandingsScreen() {
  const route = useRoute<RouteProp<{ params: StandingsScreenParams }, 'params'>>();
  const { competitionId } = route.params;
  let API_KEY = 'bf63b2eaacf54ac0b42620ac5c820ec7';

  const { standings, loading, error, refresh } = useStandings(competitionId, 'axios', API_KEY);
  const table = standings[0]?.table || [];
  const isConnected = useMMKVNetworkStatus();

  return (
    <ScreenWrapper
      loading={loading}
      isConnected={isConnected}
      hasData={table.length > 0}
      error={error}
    >
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.headerCell}>#</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>Команда</Text>
          <Text style={styles.headerCell}>И</Text>
          <Text style={styles.headerCell}>О</Text>
          <Text style={styles.headerCell}>В</Text>
          <Text style={styles.headerCell}>Н</Text>
          <Text style={styles.headerCell}>П</Text>
          <Text style={styles.headerCell}>+/-</Text>
        </View>
        <FlatList
          data={table}
          keyExtractor={item => item.team.id.toString()}
          renderItem={({ item }) => <TableEntryItem item={item} />}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />}
          contentContainerStyle={table.length === 0 ? styles.empty : undefined}
          ListEmptyComponent={<Text style={styles.emptyText}>Нет данных</Text>}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 8 },
  loader: { marginTop: 32 },
  error: { color: 'red', textAlign: 'center', marginTop: 32 },
  headerRow: { flexDirection: 'row', paddingVertical: 8, borderBottomWidth: 1, borderColor: '#eee', backgroundColor: '#f7f7f7' },
  headerCell: { flex: 1, fontWeight: 'bold', fontSize: 14, textAlign: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6, borderBottomWidth: 1, borderColor: '#f0f0f0' },
  cell: { flex: 1, fontSize: 13, textAlign: 'center' },
  crest: { width: 24, height: 24, marginRight: 6, borderRadius: 12, backgroundColor: '#eee' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#888', fontSize: 16 },
}); 