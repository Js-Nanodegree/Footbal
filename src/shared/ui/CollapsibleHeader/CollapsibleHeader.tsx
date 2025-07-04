import React from 'react';
import { Animated, StyleSheet, Image, View } from 'react-native';
import Typography from '../typography/Typography';

interface Team {
  name: string;
  crest: string;
  venue?: string;
  area?: { name: string };
}

interface CollapsibleHeaderProps {
  style?: any;
  team: Team;
  headerHeight?: number;
}

const CollapsibleHeader: React.FC<CollapsibleHeaderProps> = ({ style, team, headerHeight = 120 }) => {
  return (
    <Animated.View style={[styles.header, { height: headerHeight }, style]}>
      <View style={styles.row}>
        <Image source={{ uri: team.crest }} style={styles.logo} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Typography variant="h2" weight="bold">{team.name}</Typography>
          {team.venue && (
            <Typography variant="caption" color="#888">{team.venue}</Typography>
          )}
          {team.area?.name && (
            <Typography variant="caption" color="#888">{team.area.name}</Typography>
          )}
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
  },
});

export default CollapsibleHeader; 