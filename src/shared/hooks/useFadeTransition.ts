import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';

export function useFadeTransition( visible: boolean, duration: number = 320 )
{
    const opacity = useSharedValue( visible ? 1 : 0 );
    useEffect( () =>
    {
        opacity.value = withTiming( visible ? 1 : 0, { duration } );
    }, [ visible, duration ] );
    const style = useAnimatedStyle( () => ( { opacity: opacity.value } ) );
    return style;
} 