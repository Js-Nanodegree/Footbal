import { useMemo } from 'react';
import { Animated } from 'react-native';

export const useCollapsibleHeader = ( scrollY: Animated.Value, headerHeight: number = 120 ) =>
{
    const headerStyle = useMemo(
        () => ( {
            transform: [
                {
                    translateY: scrollY.interpolate( {
                        inputRange: [ 0, headerHeight ],
                        outputRange: [ 0, -headerHeight ],
                        extrapolate: 'clamp',
                    } ),
                },
            ],
        } ),
        [ scrollY, headerHeight ]
    );
    return { headerStyle };
}; 