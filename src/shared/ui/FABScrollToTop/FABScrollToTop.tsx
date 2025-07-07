import React, { useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { Easing } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

const SoccerBallAnimation = () =>
{
  const spinValue = new Animated.Value( 0 );
  const glowValue = new Animated.Value( 0 );

  React.useEffect( () =>
  {
    Animated.loop(
      Animated.parallel( [
        Animated.timing( spinValue, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        } ),
        Animated.timing( glowValue, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut( Easing.ease ),
          useNativeDriver: false,
        } ),
      ] )
    ).start();
  }, [] );

  const spin = spinValue.interpolate( {
    inputRange: [ 0, 1 ],
    outputRange: [ '0deg', '360deg' ],
  } );

  const glow = glowValue.interpolate( {
    inputRange: [ 0, 0.5, 1 ],
    outputRange: [ '5', '15', '5' ],
  } );

  return (
    <Animated.View style={{ transform: [ { rotate: spin } ] }}>
      <Svg width={100} height={100} viewBox="0 0 100 100">
        <Circle cx="50" cy="50" r="40" fill="#fff" stroke="#000" strokeWidth="3" />
        <Path
          d="M50 20L60 40H40L50 20ZM50 80L60 60H40L50 80ZM20 50L40 60V40L20 50ZM80 50L60 40V60L80 50Z"
          fill="#000"
        />
        {/* <Animated.Circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#ff0"
          strokeWidth={glow}
          opacity="0.5"
        /> */}
      </Svg>
    </Animated.View>
  );
};

interface FABScrollToTopProps {
  onPress: () => void;
}


const FABScrollToTop: React.FC<FABScrollToTopProps> = ({ onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.5, duration: 120, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 0, duration: 120, useNativeDriver: true }),
    ]).start(() => {
      scaleAnim.setValue(1);
      onPress();
    });
  };

  return (
    <Animated.View style={[styles.fab, { transform: [{ scale: scaleAnim }] }]}> 
      <TouchableOpacity onPress={handlePress} activeOpacity={0.8} style={styles.touchable}>
        <SoccerBallAnimation />
        {/* <LottieView
          source={require('../../../assets/lottie/football-spin.json')}
          autoPlay
          loop
          style={{ width: 35, height: 35 }}
        /> */}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    backgroundColor: '#fff',
    borderRadius: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    zIndex: 100,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: 24,
  },
});

export default FABScrollToTop; 