import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TableEntry } from '../features/team-api/types/standing';

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
  return (
    <View />
  )

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