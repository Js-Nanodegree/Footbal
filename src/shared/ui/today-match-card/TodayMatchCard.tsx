import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Typography from 'src/shared/ui/typography/Typography';
import { colors } from '../theme/colors';

interface Team {
  name: string;
  crestUrl: string; // URL из Football-Data.org
}

interface TodayMatchCardProps {
  homeTeam: Team;
  awayTeam: Team;
  time: string;
  date: string;
  onPress?: () => void;
}

const renderLeftActions = () => (
  <View
    style={{
      width: 70,
      // height: '90%',
      backgroundColor: colors.redCard,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 14,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      marginLeft: 0,
      paddingLeft: 0,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      shadowColor: colors.redCard,
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 2,
    }}
  >
    <Text style={{ color: colors.white, fontWeight: 'bold', fontSize: 15 }}>Детали</Text>
  </View>
);

const renderRightActions = () => (
  <View
    style={{
      width: 70,
      // height: '90%',
      marginLeft: 14,
      backgroundColor: colors.info,
      justifyContent: 'center',
      alignItems: 'center',
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      marginRight: 0,
      paddingRight: 0,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      shadowColor: colors.info,
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 2,
    }}
  >
    <Text style={{ color: colors.white, fontWeight: 'bold', fontSize: 15 }}>Детали</Text>
  </View>
);

const TodayMatchCard: React.FC<TodayMatchCardProps> = ({
  homeTeam,
  awayTeam,
  time,
  date,
  onPress,
}) => {
  console.log(homeTeam, awayTeam);
  return (
    <View style={styles.cardShadow}>
      <Swipeable
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}
        onSwipeableLeftOpen={() => {
          // TODO: обработка "Подробнее"
          // Можно открыть модалку или показать детали
        }}
        onSwipeableRightOpen={() => {
          // TODO: обработка "Перейти"
          // Можно перейти на экран компании/матча
        }}
      >
        <Pressable onPress={onPress} style={styles.card}>
          <LinearGradient
            colors={['#fff', '#f7f7fa']}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          <Typography style={styles.teamNameLeft} font="Oswald" weight="bold">
            {homeTeam.name}
          </Typography>
          {homeTeam.crest && (
            <View style={{ marginHorizontal: 6 }}>
              <Image source={{ uri: homeTeam.crest }} style={styles.logo} />
            </View>
          )}
          {/* <Image source={{ uri: homeTeam.crestUrl }} style={styles.logo} resizeMode="contain" /> */}
          <View style={styles.centerBlock}>
            <Typography style={styles.time} font="Oswald" weight="bold">
              {time}
            </Typography>
            <Typography style={styles.date} font="Oswald" weight="regular">
              {date}
            </Typography>
          </View>
          {awayTeam.crest && (
            <View style={{ marginHorizontal: 6 }}>
              <Image source={{ uri: awayTeam.crest }} style={styles.logo} />
            </View>
          )}
          <Typography style={styles.teamNameRight} font="Oswald" weight="bold">
            {awayTeam.name}
          </Typography>
        </Pressable>
      </Swipeable>
    </View>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
    borderRadius: 24,
    // marginHorizontal: 14,
    marginVertical: 12,
    backgroundColor: 'transparent',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 18,
    minHeight: 64,
    overflow: 'hidden',
    position: 'relative',
  },
  teamNameLeft: {
    flex: 1.2,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
    textAlign: 'right',
    marginRight: 3,
    maxWidth: 90,
  },
  teamNameRight: {
    flex: 1.2,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
    textAlign: 'left',
    marginLeft: 3,
    maxWidth: 90,
  },
  logo: {
    width: 50,
    height: 50,
    marginHorizontal: 3,
  },
  centerBlock: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF8800',
    marginBottom: 1,
  },
  date: {
    fontSize: 13,
    color: '#888',
    fontWeight: '500',
  },
});

export default TodayMatchCard;
