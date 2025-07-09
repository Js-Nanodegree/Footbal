import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { Competition } from '../features/team-api/types/competition';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../roads/RootNavigator';
import { useTranslation } from 'react-i18next';

// Тип для параметров навигации
export type CompetitionDetailsParams = {
  competition: Competition;
};

export default function CompetitionDetailsScreen() {
  const { t } = useTranslation();
  const route = useRoute<RouteProp<{ params: CompetitionDetailsParams }, 'params'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { competition } = route.params;

  return (
    <View style={styles.container}>
      {competition.emblem ? (
        <Image source={{ uri: competition.emblem }} style={styles.emblem} />
      ) : null}
      <Text style={styles.title}>{competition.name}</Text>
      <Text style={styles.subtitle}>{competition.area.name}</Text>
      <Text style={styles.info}>{t('competition.id', { id: competition.id })}</Text>
      <Text style={styles.info}>{t('competition.code', { code: competition.code })}</Text>
      {competition.type && <Text style={styles.info}>{t('competition.type', { type: competition.type })}</Text>}
      {competition.currentSeason && (
        <Text style={styles.info}>
          {t('competition.season', { start: competition.currentSeason.startDate, end: competition.currentSeason.endDate })}
        </Text>
      )}
      <Button title={t('competition.tableButton')} onPress={() => navigation.navigate('Standings', { competitionId: competition.id })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', padding: 24 },
  emblem: { width: 80, height: 80, marginBottom: 16, borderRadius: 40, backgroundColor: '#eee' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  subtitle: { fontSize: 18, color: '#666', marginBottom: 12 },
  info: { fontSize: 16, color: '#444', marginBottom: 4 },
}); 