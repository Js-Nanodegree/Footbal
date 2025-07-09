// LeagueFilterBar: фильтр по лигам, поддержка единого стиля, локализации, accessibility
import React, { useEffect, useRef } from 'react';
import { Image, FlatList, TouchableOpacity, View } from 'react-native';
import { colors } from 'src/shared/ui/theme/colors';
import { shadows } from 'src/shared/ui/theme/shadows';
import Typography from 'src/shared/ui/typography/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedLeagueId, selectSelectedLeagueId } from '../leagueSlice';

export interface League
{
    id: number;
    name: string;
    icon?: string;
}

interface LeagueFilterBarProps
{
    leagues: League[];
}

const LeagueFilterBar: React.FC<LeagueFilterBarProps> = ( { leagues } ) =>
{
    const dispatch = useDispatch();
    const selectedLeagueId = useSelector(selectSelectedLeagueId);
    const flatListRef = useRef<FlatList>( null );


    useEffect( () =>
    {
        const index = leagues.findIndex( l => l.id === selectedLeagueId );
        if ( index !== -1 && flatListRef.current )
        {
            flatListRef.current.scrollToIndex( { index, animated: true, viewPosition: 0.5 } );
        }
    }, [ leagues, selectedLeagueId ] );

    const handleLeagueChange = ( id: number ) =>
    {
        dispatch( setSelectedLeagueId( id ) );
    };

    const handleScrollToIndexFailed = ( info: { index: number; averageItemLength: number } ) =>
    {
        // Скроллим в конец, затем повторяем scrollToIndex
        flatListRef.current?.scrollToOffset( { offset: info.averageItemLength * info.index, animated: true } );
        setTimeout( () =>
        {
            flatListRef.current?.scrollToIndex( { index: info.index, animated: true, viewPosition: 0.5 } );
        }, 100 );
    };

    const renderItem = ( { item: league }: { item: League } ) =>
    {
        const isActive = selectedLeagueId === league.id;

        return (
            <TouchableOpacity
                key={league.id}
                onPress={() => handleLeagueChange( league.id )}
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
                    {league.emblem && (
                        <Image
                            source={{ uri: league.emblem }}
                            style={{ width: 22, height: 22, marginRight: 8, tintColor: isActive ? colors.card : colors.primary }}
                            resizeMode="contain"
                        />
                    )}
                    <Typography
                        style={{
                            color: isActive ? colors.card : colors.primary,
                            fontWeight: 'bold',
                            fontSize: 12,
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
    };

    return (
        <FlatList
            ref={flatListRef}
            data={leagues}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{ paddingLeft: 8, marginBottom: 12 }}
            testID="league-filter-bar"
            accessibilityLabel="league-filter-bar"
            onScrollToIndexFailed={handleScrollToIndexFailed}
        />
    );
};

export default React.memo( LeagueFilterBar ); 