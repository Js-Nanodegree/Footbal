// Карточка события матча: светлый стиль, крупный аватар, цветные иконки, переводы событий, все цвета через colorMap
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { MatchEvent } from './types';
import { matchEventColorMap } from './colorMap';
import Typography from '../typography/Typography';
import { colors } from '../theme/colors';

const eventIcons: Record<string, string> = {
  goal: '⚽',
  'yellow-card': '🟨',
  'red-card': '🟥',
  substitution: '🔄',
  'own-goal': '🥅',
  penalty: '🎯',
  timeout: '⏱️',
  other: '•',
};

const eventTitles: Record<string, string> = {
  goal: 'Гол',
  'yellow-card': 'Жёлтая карточка',
  'red-card': 'Красная карточка',
  substitution: 'Замена',
  'own-goal': 'Автогол',
  penalty: 'Пенальти',
  timeout: 'Тайм-аут',
  other: 'Событие',
};

interface MatchEventCardProps
{
  event: MatchEvent;
  collapsed?: boolean;
  onToggle?: () => void;
}

const MatchEventCard: React.FC<MatchEventCardProps> = ( { event, collapsed, onToggle } ) =>
{
  const color = matchEventColorMap[event.type] || matchEventColorMap.default;
  const isYellow = event.type === 'yellow-card';
  const bgColor = isYellow ? colors.yellowCard : colors.secondary;
  const iconColor = isYellow ? colors.black : colors.white;
  const textColor = colors.white;

  if ( collapsed )
  {
    return (
      <View style={[ styles.collapsedCard, { backgroundColor: bgColor } ]}
        onTouchEnd={onToggle}
      >
        <Typography variant="body" weight="bold" style={[ styles.collapsedIcon, { color: iconColor } ]}>
          {eventIcons[event.type] || eventIcons.other}
        </Typography>
        <Typography variant="body" weight="bold" style={[ styles.collapsedTitle, { color: textColor } ]}>
          {eventTitles[ event.type ] || eventTitles.other}
        </Typography>
        {event.score && (
          <Typography variant="body" weight="bold" style={[ styles.collapsedScore, { color: textColor } ]}>
            {event.score}
          </Typography>
        )}
      </View>
    );
  }

  return (
    <View style={[ styles.card, { backgroundColor: matchEventColorMap.background } ]} onTouchEnd={onToggle}>
      <View style={styles.header}>
        <Typography variant="body" weight="bold" style={[ styles.icon, { color } ]}>
          {eventIcons[ event.type ] || eventIcons.other}
        </Typography>
        <Typography variant="body" weight="bold" style={[ styles.title, { color } ]}>
          {eventTitles[ event.type ] || eventTitles.other}
        </Typography>
        {event.score && (
          <Typography variant="body" weight="bold" style={[ styles.score, { color } ]}>
            {event.score}
          </Typography>
        )}
      </View>
      {event.player && (
        <View style={styles.playerRow}>
          {event.player.avatar && (
            <Image source={{ uri: event.player.avatar }} style={styles.avatar} />
          )}
          <View style={{ flex: 1 }}>
            <Typography variant="body" weight="bold">{event.player.name}</Typography>
            <Typography variant="caption" color={matchEventColorMap.default}>
              {event.player.position} #{event.player.number} • {event.player.team}
            </Typography>
          </View>
        </View>
      )}
      {event.assist && (
        <Typography variant="caption" color={matchEventColorMap.assist} style={{ marginTop: 2 }}>
          Ассист: <Typography variant="caption" weight="bold" color={matchEventColorMap.assist}>{event.assist.name}</Typography>
        </Typography>
      )}
      {event.type === 'substitution' && event.inPlayer && event.outPlayer && (
        <View style={{ marginTop: 4 }}>
          <View style={styles.playerRow}>
            {event.inPlayer.avatar && (
              <Image source={{ uri: event.inPlayer.avatar }} style={styles.avatar} />
            )}
            <View style={{ flex: 1 }}>
              <Typography variant="caption" color={matchEventColorMap.in} style={{ fontWeight: 'bold' }}>IN</Typography>
              <Typography variant="body" weight="bold">{event.inPlayer.name}</Typography>
              <Typography variant="caption" color={matchEventColorMap.default}>
                {event.inPlayer.position} #{event.inPlayer.number} • {event.inPlayer.team}
              </Typography>
            </View>
          </View>
          <View style={styles.playerRow}>
            {event.outPlayer.avatar && (
              <Image source={{ uri: event.outPlayer.avatar }} style={styles.avatar} />
            )}
            <View style={{ flex: 1 }}>
              <Typography variant="caption" color={matchEventColorMap.out} style={{ fontWeight: 'bold' }}>OUT</Typography>
              <Typography variant="body" weight="bold">{event.outPlayer.name}</Typography>
              <Typography variant="caption" color={matchEventColorMap.default}>
                {event.outPlayer.position} #{event.outPlayer.number} • {event.outPlayer.team}
              </Typography>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 22,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  score: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#eee',
  },
  collapsedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 16,
    minHeight: 48,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  collapsedIcon: {
    fontSize: 22,
    marginRight: 12,
  },
  collapsedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  collapsedScore: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 12,
  },
});

export default MatchEventCard;
