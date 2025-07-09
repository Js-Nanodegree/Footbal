// Секция статистики для истории очных матчей с табами (Stats, Line-up, Summary)
// Использует Typography, прогресс-бары, табы, получает сезон и venue из navigation params через useMatchHistoryParams
// [ПРАВИЛО] Тесты для этой секции писать не обязательно, по решению команды.
import React, { useState } from 'react';
import Typography from '../../shared/ui/typography/Typography';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from 'src/roads/RootNavigator';
import type { RouteProp } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import StatsBar from '../../shared/ui/stats-bar/StatsBar';
import { statsBarColorMap } from '../../shared/ui/stats-bar/colorMap';
import MatchEventTimeline from '../../shared/ui/match-event-timeline/MatchEventTimeline';
import { colors } from '../../shared/ui/theme/colors';
import Button from '../../shared/ui/button/Button';
import { durationMap, formatSeason, formatStage, useMatchStatsMappings } from './mappings/matchStatsMappings';
import Total from './by-feature/Total';
import { useMatchHistoryParams } from '../match-history/hooks/useMatchHistoryParams';

const TABS = [ 'Stats', 'Line-up', 'Summary' ];

const stats = [
  { label: 'Shots on goal', home: 2, away: 6 },
  { label: 'Shots', home: 4, away: 15 },
  { label: 'Possession %', home: 26, away: 74, isPercent: true },
  { label: 'Yellow card', home: 3, away: 2 },
  { label: 'Corner kicks', home: 0, away: 2 },
  { label: 'Crosses', home: 10, away: 23 },
  { label: 'Goalkeeper saves', home: 3, away: 2 },
  { label: 'Goalk kicks', home: 10, away: 2 },
];

const PINK = '#E94057';
const BG = '#F7F7F9';

export interface MatchHistoryStatsSectionProps {
  match?: any;
  loading?: boolean;
  error?: any;
}

export const MatchHistoryStatsSection: React.FC<MatchHistoryStatsSectionProps> = ( {
  match,
  loading,
  error,
} ) =>
{

  const [tab, setTab] = useState<'Stats' | 'Line-up' | 'Summary'>('Stats');
  const { stageMap, durationMap } = useMatchStatsMappings();
  if ( !match ) return <View />;
  // Общая информация о матче
  const generalInfo: { label: string; value: string }[] = [
    match.competition?.name ? { label: 'Турнир', value: match.competition.name } : null,
    match.matchday ? { label: 'Тур', value: String( match.matchday ) } : null,
    match.stage ? { label: 'Стадия', value: formatStage( match.stage, stageMap ) } : null,
    match.area?.name ? { label: 'Страна', value: match.area.name } : null,
    match.utcDate
      ? {
        label: 'Дата',
        value: new Date( match.utcDate ).toLocaleString( 'ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        } ),
      }
      : null,
    match.season?.startDate && match.season?.endDate
      ? { label: 'Сезон', value: formatSeason( match.season.startDate, match.season.endDate ) }
      : null,
    Array.isArray( match.referees ) && match.referees.length > 0
      ? { label: 'Судьи', value: match.referees.map( ( r: any ) => r.name ).join( ', ' ) }
      : null,
  ].filter( Boolean ) as { label: string; value: string }[];

  // Динамическая генерация статистики по всем возможным полям score + моковые метрики
  const stats: any[] = [
    match.score?.fullTime &&
      ( typeof match.score.fullTime.home === 'number' || typeof match.score.fullTime.away === 'number' )
      ? {
        label: 'Счёт (Full Time)',
        home: match.score.fullTime.home ?? '—',
        away: match.score.fullTime.away ?? '—',
        disabled: false,
      }
      : null,
    match.score?.halfTime &&
      ( typeof match.score.halfTime.home === 'number' || typeof match.score.halfTime.away === 'number' )
      ? {
        label: 'Счёт (1-й тайм)',
        home: match.score.halfTime.home ?? '—',
        away: match.score.halfTime.away ?? '—',
        disabled: false,
      }
      : null,
    match.score?.extraTime &&
      ( typeof match.score.extraTime.home === 'number' ||
        typeof match.score.extraTime.away === 'number' )
      ? {
        label: 'Счёт (Extra Time)',
        home: match.score.extraTime.home ?? '—',
        away: match.score.extraTime.away ?? '—',
        disabled: false,
      }
      : null,
    match.score?.penalties &&
      ( typeof match.score.penalties.home === 'number' ||
        typeof match.score.penalties.away === 'number' )
      ? {
        label: 'Счёт (Пенальти)',
        home: match.score.penalties.home ?? '—',
        away: match.score.penalties.away ?? '—',
        disabled: false,
      }
      : null,
    match.score?.winner
      ? {
        label: 'Победитель',
        home: match.score.winner === 'HOME_TEAM' ? '🏆' : '',
        away: match.score.winner === 'AWAY_TEAM' ? '🏆' : '',
        disabled: false,
      }
      : null,
    match.score?.duration
      ? {
        label: 'Тип матча',
        home: durationMap[ match.score.duration ] || match.score.duration,
        away: durationMap[ match.score.duration ] || match.score.duration,
        disabled: false,
      }
      : null,
    match.status
      ? {
        label: 'Статус',
        home: match.status,
        away: match.status,
        disabled: false,
      }
      : null,
    // Моковые метрики (дизейбл)
    { label: 'Угловые', home: '—', away: '—', disabled: true },
    { label: 'Пенальти (удары)', home: '—', away: '—', disabled: true },
    { label: 'Касания к воротам', home: '—', away: '—', disabled: true },
    { label: 'Удары по воротам', home: '—', away: '—', disabled: true },
    { label: 'Владение мячом', home: '—', away: '—', disabled: true },
    { label: 'xG', home: '—', away: '—', disabled: true },
    { label: 'Фолы', home: '—', away: '—', disabled: true },
    { label: 'Жёлтые карточки', home: '—', away: '—', disabled: true },
    { label: 'Красные карточки', home: '—', away: '—', disabled: true },
  ].filter( Boolean );

  const homeLineup = match.homeTeam?.lineup || [];
  const awayLineup = match.awayTeam?.lineup || [];
  const summaryEvents = [
    ...( match.goals || [] ).map( ( goal: any ) => ( { type: 'goal', ...goal } ) ),
    ...( match.bookings || [] ).map( ( card: any ) => ( { type: 'yellow-card', ...card } ) ),
    ...( match.substitutions || [] ).map( ( sub: any ) => ( { type: 'substitution', ...sub } ) ),
  ];

  return (
    <>
      <View style={{ marginHorizontal: 12, marginBottom: 8, marginTop: 22 }}>
        <Typography variant="h2" style={{ marginTop: 12, fontWeight: '700' }}>Общая информация</Typography>
      </View>
    <View style={styles.section}>
      {/* Общая информация */}
      <Total generalInfo={generalInfo} />
      {/* Статистика и табы */}
      <View style={styles.tabsRow}>
        {TABS.map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tab, tab === t && styles.tabActive]}
            onPress={() => setTab(t as any)}
            activeOpacity={0.85}
          >
            <Typography variant="body" style={[ styles.tabText, tab === t && styles.tabTextActive ]}>
              {t}
            </Typography>
          </TouchableOpacity>
        ))}
      </View>
      {tab === 'Stats' && (
        <View style={{ padding: 16 }}>
          {stats.length > 0 ? (
            stats.map( ( s, i ) => (
              <StatsBar
                key={s.label}
                leftValue={s.home}
                rightValue={s.away}
                label={s.label}
                valueType={
                  typeof s.home === 'number' && typeof s.away === 'number' ? 'number' : undefined
                }
                leftColor={s.disabled ? '#ccc' : statsBarColorMap.left}
                rightColor={s.disabled ? '#ccc' : statsBarColorMap.right}
                backgroundColor={s.disabled ? '#f2f2f2' : statsBarColorMap.background}
                style={{ marginVertical: 4, opacity: s.disabled ? 0.5 : 1 }}
              />
            ) )
          ) : (
              <View style={{ marginTop: 12, alignItems: 'center' }}>
                <Typography style={{ marginTop: 12, textAlign: 'center', color: '#aaa' }}>
                  Нет данных по счёту для этого матча
                </Typography>
              </View>
          )}
        </View>
      )}
      {tab === 'Line-up' && (
        <View style={styles.lineupBlock}>
          <View style={styles.lineupHeader}>
            <Typography variant="body" style={styles.lineupTeam}>
              {match.homeTeam?.name}
            </Typography>
            <Typography variant="body" style={styles.lineupTeam}>
              {match.awayTeam?.name}
            </Typography>
          </View>
          <View style={styles.lineupRows}>
            <View style={styles.lineupCol}>
              {homeLineup.length > 0 ? (
                homeLineup.map( ( player: any ) => (
                  <Typography key={player.id} variant="body">
                    {player.name}
                  </Typography>
                ) )
              ) : (
                <Typography variant="caption">Нет данных</Typography>
              )}
            </View>
            <View style={styles.lineupCol}>
              {awayLineup.length > 0 ? (
                awayLineup.map( ( player: any ) => (
                  <Typography key={player.id} variant="body">
                    {player.name}
                  </Typography>
                ) )
              ) : (
                <Typography variant="caption">Нет данных</Typography>
              )}
            </View>
          </View>
        </View>
      )}
      {tab === 'Summary' && (
        <View style={styles.summaryBlock}>
          {summaryEvents.length > 0 ? (
            <MatchEventTimeline events={summaryEvents} />
          ) : (
            <Typography variant="caption" style={{ textAlign: 'center' }}>
              Нет событий
            </Typography>
          )}
        </View>
      )}

      <View style={{ marginTop: 12, alignItems: 'center',marginHorizontal:12 }}>
        <Button
          title="Купить подписку"
          onPress={() => { }}
          style={{ marginTop: 12, width: '100%' }}
        />
        <Typography style={{ marginTop: 12, textAlign: 'center', color: colors.grayMedium }}>
          Детальная статистика
        </Typography>
        <Typography style={{ marginBottom: 12, textAlign: 'center', color: colors.grayMedium }}>
          недоступна для этого матча
        </Typography>
      </View>
    </View>
    </>

  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: BG,
    borderRadius: 16,
    padding: 0,
    marginVertical: 12,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: BG,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: BG,
  },
  tabActive: {
    backgroundColor: '#fff',
    borderBottomWidth: 3,
    borderBottomColor: PINK,
  },
  tabText: {
    color: '#B0B0B0',
    fontWeight: '600',
    fontSize: 16,
  },
  tabTextActive: {
    color: PINK,
    fontWeight: 'bold',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
  },
  value: {
    width: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  barBlock: {
    flex: 1,
    alignItems: 'center',
  },
  barBg: {
    flexDirection: 'row',
    width: '100%',
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F3F3F3',
    marginBottom: 4,
    overflow: 'hidden',
  },
  barLeft: {
    height: 6,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  barRight: {
    height: 6,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },
  label: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    marginTop: 2,
  },
  placeholder: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineupBlock: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 16,
    alignItems: 'center',
  },
  lineupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  lineupTeam: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  lineupRows: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  lineupCol: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  summaryBlock: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 16,
  },
  summaryTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8,
  },
  summaryTime: {
    width: 48,
    textAlign: 'right',
    color: '#888',
  },
  summaryType: {
    width: 64,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  summaryPlayer: {
    flex: 1,
    textAlign: 'left',
  },
  summaryTeam: {
    width: 80,
    textAlign: 'right',
    color: '#888',
  },
} );
