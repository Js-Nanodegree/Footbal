import React from 'react';
import { View, StyleSheet } from 'react-native';
import MatchSwiper from 'src/features/match-swiper/MatchSwiper';
import SkeletonSwiper from 'src/features/match-swiper/SkeletonSwiper';
import Spacer from 'src/shared/ui/Spacer';
import Animated from 'react-native-reanimated';
import { useFadeTransition } from 'src/shared/hooks/useFadeTransition';

const SECTION_SPACING = 20;

interface MatchSwiperSectionProps
{
    matches: any[]; // Можно уточнить тип, если есть FeaturedMatchCardProps
    loading?: boolean;
    error?: string | null;
}

const MatchSwiperSection = React.memo( ( { matches, loading, error }: MatchSwiperSectionProps ) =>
{
    const loadingStyle = useFadeTransition( !!loading );
    const errorStyle = useFadeTransition( !!error || !matches || matches.length === 0 );
    const contentStyle = useFadeTransition( !loading && !error && matches && matches.length > 0 );

    return (
        <>
            <View style={styles.root}>
                {/* LOADING */}
                <Animated.View style={[ StyleSheet.absoluteFill, loadingStyle ]} pointerEvents={loading ? 'auto' : 'none'}>
                    {loading && (
                        <SkeletonSwiper msg="Загрузка live-матчей..." />
                    )}
                </Animated.View>
                {/* ERROR/EMPTY */}
                <Animated.View style={[ StyleSheet.absoluteFill, errorStyle ]} pointerEvents={error || !matches || matches.length === 0 ? 'auto' : 'none'}>
                    {( error || !matches || matches.length === 0 ) && (
                        <SkeletonSwiper msg="Извините, на текущий момент live-матчей нет." />
                    )}
                </Animated.View>
                {/* CONTENT */}
                <Animated.View style={[ StyleSheet.absoluteFill, contentStyle ]} pointerEvents={!loading && !error && matches && matches.length > 0 ? 'auto' : 'none'}>
                    {!loading && !error && matches && matches.length > 0 && (
                        <MatchSwiper matches={matches} />
                    )}
                </Animated.View>
            </View>
            <Spacer size={SECTION_SPACING} />
        </>
    );
} );

const styles = StyleSheet.create( {
    root: {
        minHeight: 230,
        position: 'relative',
    },
} );

export default MatchSwiperSection;
