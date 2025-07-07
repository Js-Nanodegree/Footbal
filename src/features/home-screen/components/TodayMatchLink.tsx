// TodayMatchLink: ссылка на все актуальные матчи, поддержка единого стиля, локализации, accessibility
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors } from 'src/shared/ui/theme/colors';
import { shadows } from 'src/shared/ui/theme/shadows';
import Typography from 'src/shared/ui/typography/Typography';
// import { t } from '@lingui/macro'; // TODO: подключить lingui.js

interface TodayMatchLinkProps
{
    onPress: () => void;
    todayMatches: Array<{
        id: number;
        homeTeam: { name: string; logo: string };
        awayTeam: { name: string; logo: string };
        time: string;
        date: string;
    }>;
    testID?: string;
    accessibilityLabel?: string;
}

function pluralizeGame( count: number ): string
{
    const mod10 = count % 10;
    const mod100 = count % 100;
    if ( mod10 === 1 && mod100 !== 11 ) return 'игра';
    if ( mod10 >= 2 && mod10 <= 4 && ( mod100 < 10 || mod100 >= 20 ) ) return 'игры';
    return 'игр';
}

const TodayMatchLink: React.FC<TodayMatchLinkProps> = ( { onPress, todayMatches, testID, accessibilityLabel } ) =>
{
    const count = todayMatches.length;
    return (
        <View style={[ styles.row, shadows.card ]} testID={testID} accessibilityLabel={accessibilityLabel}>
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', flex: 1 }}>
                <Typography variant="h2" weight="bold" font="Oswald" style={[ styles.text, { fontWeight: '700' } ]}>
                    {/* TODO: {t`Актуальные матчи`} */}
                    Актуальные матчи
                </Typography>
                <Typography variant="caption" font="Inter" style={[ styles.count, { color: colors.primary } ]}>
                    {count > 0 ? `${ count } ${ pluralizeGame( count ) }` : /* TODO: {t`Нет матчей`} */ 'Нет матчей'}
                </Typography>
            </View>
            <Pressable onPress={onPress} testID="today-match-link-pressable" accessibilityLabel="today-match-link-pressable">
                <Typography variant="caption" font="Inter" numberOfLines={2} style={[ styles.count, {
                    fontSize: 14,
                    fontWeight: '700',
                    color: colors.primary,
                } ]}>
                    {/* TODO: {t`Все`} */}
                    Все
                </Typography>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create( {
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    text: {
        fontSize: 20,
        lineHeight: 20,
        fontWeight: '400',
    },
    count: {
        // color задаётся через props
    },
    more: {
        color: colors.primary,
        marginRight: 8,
        fontWeight: 'bold',
    },
} );

export default TodayMatchLink; 