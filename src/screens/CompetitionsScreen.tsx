import React from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Competition } from '../features/team-api/types/competition';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../roads/RootNavigator';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCompetitions } from '../features/team-api/hooks/useCompetitions';
import { FOOTBALL_DATA_API_KEY } from '@env';
import { useMMKVNetworkStatus } from '../shared/memory-bank/mmkvMemoryBank';
import ScreenWrapper from '../shared/ui/ScreenWrapper';

const API_KEY = FOOTBALL_DATA_API_KEY || '';

function CompetitionListItem( { item }: { item: Competition } )
{
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity onPress={() => navigation.navigate( 'CompetitionDetails', { competition: item } )}>
      <View style={styles.itemContainer}>
        {item.emblem ? (
          <Image source={{ uri: item.emblem }} style={styles.emblem} />
        ) : null}
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subtitle}>{item.area.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export const CompetitionsScreen = () =>
{
  const { competitions, loading, error } = useCompetitions( 'axios', API_KEY );
  const isConnected = useMMKVNetworkStatus();

  return (
    // <ScreenWrapper
    //   loading={loading}
    //   isConnected={isConnected}
    //   hasData={competitions.length > 0}
    //   error={error}
    // >
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>Список турниров</Text>
        {competitions.map( ( comp, idx ) => (
          <Text key={idx}>{comp.name}</Text>
        ) )}
      </ScrollView>
    // </ScreenWrapper>
  );
};

export default CompetitionsScreen;

const styles = StyleSheet.create( {
  container: { flex: 1, backgroundColor: '#fff' },
  loader: { marginTop: 32 },
  error: { color: 'red', textAlign: 'center', marginTop: 32 },
  itemContainer: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#eee' },
  emblem: { width: 40, height: 40, marginRight: 16, borderRadius: 20, backgroundColor: '#eee' },
  title: { fontSize: 16, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: '#666' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#888', fontSize: 16 },
} );
