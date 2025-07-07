import React from 'react';
import { View, StyleSheet } from 'react-native';
import Typography from 'src/shared/ui/typography/Typography';
import AnimatedShimmer from 'src/shared/ui/shimmer/AnimatedShimmer';

const SkeletonSwiper = ({ msg }: { msg?: string }) => (
  <View style={styles.container}>
    {[...Array(3)].map((_, i) => (
      <View key={i} style={styles.skeletonCard}>
        <AnimatedShimmer style={StyleSheet.absoluteFill} borderRadius={28} />
        {msg && (
          <View style={styles.msgContainer}>
            <Typography variant="caption" color="white" style={styles.msgText}>
              {msg}
            </Typography>
          </View>
        )}
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  msgContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    padding: 32,
  },
  msgText: {
    textAlign: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 180,
  },
  skeletonCard: {
    width: 280,
    height: 220,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#eee',
    marginHorizontal: 8,
  },
});

export default SkeletonSwiper;
