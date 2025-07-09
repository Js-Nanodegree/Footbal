import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../theme/colors';

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

    const gradientColors = shimmerColors || [ colors.grayLight, colors.grayMedium, colors.grayLight, '#f8f8fa' ]

    return (
        <View style={[ styles.container, style, { borderRadius }, {borderWidth:1,borderColor:colors.grayMedium,backgroundColor:colors.grayLight} ]}>
            <AnimatedLinearGradient
                colors={gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[ StyleSheet.absoluteFill, animatedStyle, { borderRadius } ]}
                locations={[ 0.05, 0.15,0.25, 0.15 ]}
            />
        </View>
    );
};

const styles = StyleSheet.create( {
    container: {
        overflow: 'hidden',
        backgroundColor: colors.white,
    },
} );

export default AnimatedShimmer; 