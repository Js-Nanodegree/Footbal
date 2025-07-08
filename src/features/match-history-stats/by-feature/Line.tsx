import React from 'react';
import { View, StyleSheet } from 'react-native';
import Typography from '../../../shared/ui/typography/Typography';

export interface Player {
  id: string | number;
  name: string;
}

export interface LineProps {
  homeTeam: { name: string; lineup: Player[] };
  awayTeam: { name: string; lineup: Player[] };
}

// Составы команд (Line-up)
export const Line: React.FC<LineProps> = ({ homeTeam, awayTeam }) => (
  <View style={styles.lineupBlock}>
    <View style={styles.lineupHeader}>
      <Typography variant="body" style={styles.lineupTeam}>
        {homeTeam.name}
      </Typography>
      <Typography variant="body" style={styles.lineupTeam}>
        {awayTeam.name}
      </Typography>
    </View>
    <View style={styles.lineupRows}>
      <View style={styles.lineupCol}>
        {homeTeam.lineup.length > 0 ? (
          homeTeam.lineup.map((player) => (
            <Typography key={player.id} variant="body">
              {player.name}
            </Typography>
          ))
        ) : (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
              <Typography>Нет данных</Typography>
            </View>
        )}
      </View>
      <View style={styles.lineupCol}>
        {awayTeam.lineup.length > 0 ? (
          awayTeam.lineup.map((player) => (
            <Typography key={player.id} variant="body">
              {player.name}
            </Typography>
          ))
        ) : (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
              <Typography>Нет данных</Typography>
            </View>
        )}
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  lineupBlock: {
    padding: 16,
  },
  lineupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  lineupTeam: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
  lineupRows: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lineupCol: {
    flex: 1,
    alignItems: 'center',
  },
});

export default Line; 