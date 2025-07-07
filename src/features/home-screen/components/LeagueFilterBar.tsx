// LeagueFilterBar: фильтр по лигам, поддержка единого стиля, локализации, accessibility
import React, { useEffect } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { colors } from 'src/shared/ui/theme/colors';
import { shadows } from 'src/shared/ui/theme/shadows';
import Typography from 'src/shared/ui/typography/Typography';
// import { t } from '@lingui/macro'; // TODO: подключить lingui.js

export interface League
{
    id: number;
    name: string;
    icon?: string;
}

interface LeagueFilterBarProps
{
    leagues: League[];
    activeLeagueId: number | null;
    onLeagueChange: ( id: number ) => void;
}

const LeagueFilterBar: React.FC<LeagueFilterBarProps> = ( { leagues, activeLeagueId, onLeagueChange } ) =>
{
    const log = ( msg: string, data?: any ) =>
    {
        console.log( `[Reactotron] ${ msg }`, data );
    };

    useEffect( () =>
    {
        log( 'LeagueFilterBar: props', { leagues, activeLeagueId, onLeagueChange } );
        log( 'LeagueFilterBar: leagues', { count: leagues?.length, leagues } );
    }, [ leagues, activeLeagueId, onLeagueChange ] );

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingLeft: 8, marginBottom: 12 }} testID="league-filter-bar" accessibilityLabel="league-filter-bar">
            {leagues.map( league =>
            {
                const isActive = activeLeagueId === league.id;
                return (
                    <TouchableOpacity
                        key={league.id}
                        onPress={() => onLeagueChange( league.id )}
                        activeOpacity={0.85}
                        style={{ marginRight: 12 }}
                        testID={`league-btn-${ league.id }`}
                        accessibilityLabel={`league-btn-${ league.id }`}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: isActive ? colors.primary : colors.card,
                                borderRadius: 24,
                                paddingHorizontal: 18,
                                paddingVertical: 10,
                                minWidth: 44,
                                minHeight: 44,
                                borderWidth: isActive ? 0 : 2,
                                borderColor: isActive ? colors.transparent : colors.primary,
                                ...( isActive ? shadows.button : {} ),
                            }}
                        >
                            {league.icon && (
                                <Image
                                    source={{ uri: league.icon }}
                                    style={{ width: 22, height: 22, marginRight: 8, tintColor: isActive ? colors.card : colors.primary }}
                                    resizeMode="contain"
                                />
                            )}
                            <Typography
                                style={{
                                    color: isActive ? colors.card : colors.primary,
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                    letterSpacing: 0.1,
                                }}
                                variant="body"
                                font="Oswald"
                                weight="bold"
                                numberOfLines={1}
                            >
                                {/* TODO: {t`${league.name}`} */}
                                {league.name}
                            </Typography>
                        </View>
                    </TouchableOpacity>
                );
            } )}
        </ScrollView>
    );
};

export default React.memo( LeagueFilterBar ); 