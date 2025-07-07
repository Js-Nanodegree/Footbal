import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';

type AnimatedModalWrapperProps = {
    visible: boolean;
    onFadeOutEnd?: () => void;
    style?: ViewStyle;
    children: React.ReactNode;
};

const AnimatedModalWrapper: React.FC<AnimatedModalWrapperProps> = ( {
    visible,
    onFadeOutEnd,
    style,
    children,
} ) =>
{
    const opacity = useRef( new Animated.Value( 0 ) ).current;

    useEffect( () =>
    {
        if ( visible )
        {
            Animated.timing( opacity, {
                toValue: 1,
                duration: 180,
                useNativeDriver: true,
            } ).start();
        } else
        {
            Animated.timing( opacity, {
                toValue: 0,
                duration: 120,
                useNativeDriver: true,
            } ).start( ( { finished } ) =>
            {
                if ( finished && onFadeOutEnd ) onFadeOutEnd();
            } );
        }
    }, [ visible, onFadeOutEnd, opacity ] );

    return (
        <Animated.View style={[ { opacity }, style ]}>
            {children}
        </Animated.View>
    );
};

export default AnimatedModalWrapper; 