import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

const AnimatedLinearGradient = Animated.createAnimatedComponent( LinearGradient );

interface AnimatedShimmerProps
{
    style?: ViewStyle;
    borderRadius?: number;
    colors?: string[];
}

const SHIMMER_WIDTH = 150;

const AnimatedShimmer: React.FC<AnimatedShimmerProps> = ( { style, borderRadius = 0, colors: shimmerColors } ) =>
{
    const translateX = useSharedValue( -SHIMMER_WIDTH );

    React.useEffect( () =>
    {
        translateX.value = withRepeat(
            withTiming( SHIMMER_WIDTH * 2, { duration: 4200 } ),
            -1,
            false
        );
    }, [] );

    const animatedStyle = useAnimatedStyle( () => ( {
        transform: [ { translateX: translateX.value } ],
    } ) );

    const gradientColors = shimmerColors || [ '#E32C2C', '#2C5DE3', '#E32C2C', '#2C5DE3' ];

    return (
        <View style={[ styles.container, style, { borderRadius } ]}>
            <AnimatedLinearGradient
                colors={gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[ StyleSheet.absoluteFill, animatedStyle, { borderRadius } ]}
                locations={[ 0, 0.5, 0.75, 0.25 ]}
            />
        </View>
    );
};

const styles = StyleSheet.create( {
    container: {
        overflow: 'hidden',
        backgroundColor: '#E32C2C',
    },
} );

export default AnimatedShimmer; 