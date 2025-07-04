import React, { useRef } from 'react';
import { Animated, TouchableOpacity, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

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
        <LottieView
          source={require('../../../assets/lottie/football-spin.json')}
          autoPlay
          loop
          style={{ width: 35, height: 35 }}
        />
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