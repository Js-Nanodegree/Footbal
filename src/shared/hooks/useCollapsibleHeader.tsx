import { useMemo } from 'react';
import { Animated } from 'react-native';
import { useDisableAnimationsForAndroid } from 'src/shared/hooks/useDisableAnimationsForAndroid';

export const useCollapsibleHeader = ( scrollY: Animated.Value, headerHeight: number = 120 ) => {
    const isAndroidNoAnim = useDisableAnimationsForAndroid();
    const headerStyle = useMemo(
        () => (
            isAndroidNoAnim
                ? {}
                : {
                      transform: [
                          {
                              translateY: scrollY.interpolate({
                                  inputRange: [0, headerHeight],
                                  outputRange: [0, -headerHeight],
                                  extrapolate: 'clamp',
                              }),
                          },
                      ],
                  }
        ),
        [scrollY, headerHeight, isAndroidNoAnim]
    );
    return { headerStyle };
}; 