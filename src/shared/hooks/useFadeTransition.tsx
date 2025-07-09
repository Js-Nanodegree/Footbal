import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';
import { useDisableAnimationsForAndroid } from 'src/shared/hooks/useDisableAnimationsForAndroid';

export function useFadeTransition( visible: boolean, duration: number = 320 )
{
    const isAndroidNoAnim = useDisableAnimationsForAndroid();
    if (isAndroidNoAnim) return { opacity: 1 };
    const opacity = useSharedValue( visible ? 1 : 0 );
    useEffect( () =>
    {
        opacity.value = withTiming( visible ? 1 : 0, { duration } );
    }, [ visible, duration ] );
    const style = useAnimatedStyle( () => ( { opacity: opacity.value } ) );
    return style;
} 