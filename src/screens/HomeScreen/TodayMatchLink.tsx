import React from 'react';
import { TouchableOpacity, StyleSheet, View, Pressable } from 'react-native';
import ChevronRightIcon from 'src/shared/ui/icons/ChevronRightIcon';
import Typography from 'src/shared/ui/typography/Typography';

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
}

function pluralizeGame( count: number ): string
{
    const mod10 = count % 10;
    const mod100 = count % 100;
    if ( mod10 === 1 && mod100 !== 11 ) return 'игра';
    if ( mod10 >= 2 && mod10 <= 4 && ( mod100 < 10 || mod100 >= 20 ) ) return 'игры';
    return 'игр';
}

const TodayMatchLink: React.FC<TodayMatchLinkProps> = ( { onPress, todayMatches } ) =>
{
    const count = todayMatches.length;
    return (
        <View style={styles.row}>
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', flex: 1 }}>
                <Typography variant="h2" weight="bold" font="Oswald" style={[ styles.text, { fontWeight: '700' } ]}>
                    Актуальные матчи
                </Typography>
                <Typography variant="caption" font="Inter" style={styles.count}>
                    {count > 0 ? `${ count } ${ pluralizeGame( count ) }` : 'Нет матчей'}
                </Typography>
            </View>
            <Pressable onPress={onPress}>
                <Typography variant="caption" font="Inter" numberOfLines={2} style={[ styles.count, {
                    fontSize: 14,
                    fontWeight: '700',
                } ]}>
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
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 1,
    },
    text: {
        fontSize: 20,
        lineHeight: 20,
        fontWeight: '400',
    },
    count: {
        color: '#FF8800',

    },
    more: {
        color: '#E94057',
        marginRight: 8,
        fontWeight: 'bold',
    },
} );

export default TodayMatchLink; 