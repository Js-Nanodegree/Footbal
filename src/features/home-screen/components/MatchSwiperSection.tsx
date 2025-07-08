// MatchSwiperSection: секция свайпера live-матчей, поддержка лоадеров, ошибок, пустого состояния, fade transition, accessibility
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import MatchSwiper from 'src/features/match-swiper/MatchSwiper';
import SkeletonSwiper from 'src/features/match-swiper/SkeletonSwiper';
import { Match } from 'src/features/team-api/types/match';
import { useFadeTransition } from 'src/shared/hooks/useFadeTransition';
import Spacer from 'src/shared/ui/Spacer';
import { colors } from 'src/shared/ui/theme/colors';
import { shadows } from 'src/shared/ui/theme/shadows';
// import { t } from '@lingui/macro'; // TODO: подключить lingui.js

const SECTION_SPACING = 20;

interface MatchSwiperSectionProps
{
    matches: Match[];
    loading?: boolean;
    error?: string | null;
    selectedMatchId?: number;
    onMatchPress?: ( match: any ) => void;
    initialMatchId?: number;
}

const MatchSwiperSection = React.memo(
    ( { matches, loading, error, selectedMatchId, onMatchPress, initialMatchId }: MatchSwiperSectionProps ) =>
    {
        const loadingStyle = useFadeTransition( !!loading );
        const errorStyle = useFadeTransition( !!error || !matches || matches.length === 0 );
        const contentStyle = useFadeTransition( !loading && !error && matches && matches.length > 0 );

        return (
            <>
                <View style={[ styles.root, shadows.section ]} testID="match-swiper-section">
                    {/* LOADING */}
                    <Animated.View style={[ StyleSheet.absoluteFill, loadingStyle ]} pointerEvents={loading ? 'auto' : 'none'}>
                        {loading && (
                            <SkeletonSwiper msg={/* TODO: {t`Загрузка live-матчей...`} */ 'Загрузка live-матчей...'} />
                        )}
                    </Animated.View>
                    {/* ERROR/EMPTY */}
                    <Animated.View style={[ StyleSheet.absoluteFill, errorStyle ]} pointerEvents={error || !matches || matches.length === 0 ? 'auto' : 'none'}>
                        {( error || !matches || matches.length === 0 ) && (
                            <SkeletonSwiper msg={/* TODO: {t`На текущий момент live-матчей нет.`} */ 'На текущий момент\nlive-матчей нет.'} />
                        )}
                    </Animated.View>
                    {/* CONTENT */}
                    <Animated.View style={[ StyleSheet.absoluteFill, contentStyle ]} pointerEvents={!loading && !error && matches && matches.length > 0 ? 'auto' : 'none'}>
                        {!loading && !error && matches && matches.length > 0 && (
                            <MatchSwiper
                                matches={matches}
                                selectedMatchId={selectedMatchId}
                                onMatchPress={onMatchPress}
                                initialMatchId={initialMatchId}
                            />
                        )}
                    </Animated.View>
                </View>
                <Spacer size={SECTION_SPACING} />
            </>
        );
    }
);

const styles = StyleSheet.create( {
    root: {
        minHeight: 230,
        position: 'relative',
        backgroundColor: colors.transparent,
    },
} );

export default MatchSwiperSection;
