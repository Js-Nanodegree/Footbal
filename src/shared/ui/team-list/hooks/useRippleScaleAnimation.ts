import { useRef, useCallback, useState } from 'react';
import { Animated } from 'react-native';
import { useDisableAnimationsForAndroid } from 'src/shared/hooks/useDisableAnimationsForAndroid';

interface UseRippleScaleAnimationProps {
    durationIn?: number;
    durationOut?: number;
    durationRipple?: number;
    onInEnd?: () => void;
    onOutEnd?: () => void;
}

export function useRippleScaleAnimation({
    durationIn = 350,
    durationOut = 350,
    durationRipple = 700,
    onInEnd,
    onOutEnd,
}: UseRippleScaleAnimationProps = {}) {
    const isAndroidNoAnim = useDisableAnimationsForAndroid();
    const scale = useRef(new Animated.Value(isAndroidNoAnim ? 1 : 0)).current;
    const opacity = useRef(new Animated.Value(isAndroidNoAnim ? 1 : 0)).current;
    const rippleScale = useRef(new Animated.Value(isAndroidNoAnim ? 2.2 : 0)).current;
    const rippleOpacity = useRef(new Animated.Value(isAndroidNoAnim ? 0 : 0.18)).current;
    const [isAnimating, setIsAnimating] = useState(false);

    // Анимация появления
    const animateIn = useCallback(() => {
        if (isAndroidNoAnim) {
            scale.setValue(1);
            opacity.setValue(1);
            rippleScale.setValue(2.2);
            rippleOpacity.setValue(0);
            setIsAnimating(false);
            onInEnd?.();
            return;
        }
        setIsAnimating(true);
        scale.setValue(0);
        opacity.setValue(0);
        rippleScale.setValue(0);
        rippleOpacity.setValue(0.18);
        Animated.parallel([
            Animated.timing(scale, {
                toValue: 1,
                duration: durationIn,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: durationIn,
                useNativeDriver: true,
            }),
            Animated.timing(rippleScale, {
                toValue: 2.2,
                duration: durationRipple,
                useNativeDriver: true,
            }),
            Animated.timing(rippleOpacity, {
                toValue: 0,
                duration: durationRipple,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setIsAnimating(false);
            onInEnd?.();
        });
    }, [scale, opacity, rippleScale, rippleOpacity, durationIn, durationRipple, onInEnd, isAndroidNoAnim]);

    // Анимация исчезновения
    const animateOut = useCallback(() => {
        if (isAndroidNoAnim) {
            scale.setValue(0);
            opacity.setValue(0);
            rippleScale.setValue(2.2);
            rippleOpacity.setValue(0);
            setIsAnimating(false);
            onOutEnd?.();
            return;
        }
        setIsAnimating(true);
        rippleScale.setValue(0);
        rippleOpacity.setValue(0.18);
        Animated.parallel([
            Animated.timing(rippleScale, {
                toValue: 2.2,
                duration: durationRipple,
                useNativeDriver: true,
            }),
            Animated.timing(rippleOpacity, {
                toValue: 0,
                duration: durationRipple,
                useNativeDriver: true,
            }),
            Animated.timing(scale, {
                toValue: 0,
                duration: durationOut,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: durationOut,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setIsAnimating(false);
            onOutEnd?.();
        });
    }, [scale, opacity, rippleScale, rippleOpacity, durationOut, durationRipple, onOutEnd, isAndroidNoAnim]);

    return {
        scale,
        opacity,
        rippleScale,
        rippleOpacity,
        animateIn,
        animateOut,
        isAnimating,
    };
} 