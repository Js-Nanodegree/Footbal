import React from 'react';
import { View, ScrollView, TouchableOpacity, Image, Text } from 'react-native';

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
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingLeft: 8, marginBottom: 12 }}>
            {leagues.map( league =>
            {
                const isActive = activeLeagueId === league.id;
                return (
                    <TouchableOpacity
                        key={league.id}
                        onPress={() => onLeagueChange( league.id )}
                        activeOpacity={0.85}
                        style={{ marginRight: 12 }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: isActive ? '#FF2D7A' : '#F5F5F5',
                                borderRadius: 24,
                                paddingHorizontal: 18,
                                paddingVertical: 10,
                                minWidth: 44,
                                minHeight: 44,
                                shadowColor: isActive ? '#FF2D7A' : undefined,
                                shadowOpacity: isActive ? 0.08 : 0,
                                shadowRadius: isActive ? 4 : 0,
                            }}
                        >
                            {league.icon && (
                                <Image
                                    source={{ uri: league.icon }}
                                    style={{ width: 22, height: 22, marginRight: 8, tintColor: isActive ? '#fff' : '#bbb' }}
                                    resizeMode="contain"
                                />
                            )}
                            <Text
                                style={{
                                    color: isActive ? '#fff' : '#bbb',
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                    letterSpacing: 0.1,
                                }}
                            >
                                {league.name}
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
            } )}
        </ScrollView>
    );
};

export default React.memo( LeagueFilterBar ); 