import React, { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Animated, Pressable, Alert, Text } from 'react-native';
import Typography from '../typography/Typography';
import { useTeamListSelection } from '../../../features/team-api/team-list/hooks/useTeamListSelection';
import MuLogo from '../icons/mu';
import ManCityLogo from '../team-logos/ManCityLogo';
import BrentfordLogo from '../team-logos/BrentfordLogo';
import PalaceLogo from '../team-logos/PalaceLogo';
import TvIcon from '../icons/TvIcon';
import { useRippleScaleAnimation } from './hooks/useRippleScaleAnimation';

export interface Team
{
    id: number | 'tv';
    name: string;
    logo: string;
}

/**
 * @param onTeamSelect - вызывается при выборе команды (id: number)
 */
interface TeamListProps
{
    teams: Team[];
    initialSelectedIds?: number[];
    onTeamSelect?: ( id: number | 'tv' ) => void;
    playingTeamIds?: number[]; // id играющих команд
    onTvPress?: () => void;
}

const logoMap: Record<string, React.FC<{ size?: number }>> = {
    mu: MuLogo,
    mancity: ManCityLogo,
    brentford: BrentfordLogo,
    palace: PalaceLogo,
    tv: TvIcon,
};

const getLogoComponent = ( logo: string ) => logoMap[ logo ] || MuLogo;

const TeamListItem: React.FC<{
    item: Team;
    isActive: boolean;
    disabled: boolean;
    onSelect?: () => void;
    onDeselect?: () => void;
    style?: any;
    onPress?: () => void;
}> = ( { item, isActive, disabled, onSelect, onDeselect, style, onPress } ) =>
{
    const Logo = getLogoComponent( item.logo );
    const [ visible, setVisible ] = useState( true );
    const { scale, opacity, rippleScale, rippleOpacity, animateIn, animateOut, isAnimating } =
        useRippleScaleAnimation( {
            durationIn: 350,
            durationOut: 350,
            durationRipple: 700,
            onInEnd: undefined,
            onOutEnd: undefined,
    } );

  // Появление при монтировании/выборе
    useEffect( () =>
    {
        if ( visible ) animateIn();
    }, [ visible, animateIn ] );

  // Анимация исчезновения при снятии выбора
    const handleDeselect = useCallback( () =>
    {
        if ( visible && onDeselect )
        {
            animateOut();
            setTimeout( () =>
            {
                setVisible( false );
                onDeselect();
            }, 350 ); // durationOut
        }
    }, [ visible, onDeselect, animateOut ] );

  // Анимация исчезновения при выборе
    const handleSelect = useCallback( () =>
    {
        if ( visible && onSelect && !disabled )
        {
            animateOut();
            setTimeout( () =>
            {
                setVisible( false );
                onSelect();
            }, 350 ); // durationOut
        }
    }, [ visible, onSelect, disabled, animateOut ] );

    if ( !visible ) return null;

    return (
        <Pressable
            onPress={onPress ? onPress : isActive ? handleDeselect : handleSelect}
            disabled={disabled}
            style={( { pressed } ) => [
                styles.item,
                isActive && styles.selectedItem,
                disabled && styles.disabledItem,
                pressed && styles.pressed,
                style,
            ]}
            accessibilityLabel={isActive ? `Выбрана команда ${ item.name }` : `Команда ${ item.name }`}
            testID={`team-item-${ item.id }`}
        >
            <Animated.View
                style={[
                    styles.avatarBox,
                    isActive && styles.avatarBoxSelected,
                    disabled && styles.avatarBoxDisabled,
                    { transform: [ { scale } ], opacity: opacity },
                ]}
            >
                <Animated.View
                    pointerEvents="none"
                    style={[
                        StyleSheet.absoluteFill,
                        styles.ripple,
                        {
                            opacity: rippleOpacity,
                                transform: [ { scale: rippleScale } ],
                            },
                        ]}
                    />
                    <Logo size={40} />
                </Animated.View>
                <Animated.View style={{ opacity }}>
                    <Typography
                        font="Oswald"
                        weight={isActive ? 'bold' : 'regular'}
                        variant="caption"
                        numberOfLines={1}
                        style={{
                            maxWidth: 72,
                            textAlign: 'center',
                            color: isActive ? '#FF2D7A' : disabled ? '#ccc' : '#888',
                        }}
                    >
                        {item.name}
                    </Typography>
                </Animated.View>
            </Pressable>
        );
    };

const ITEM_WIDTH = 60;
const getItemLayout = ( _: any, index: number ) => ( {
    length: ITEM_WIDTH,
    offset: ITEM_WIDTH * index,
    index,
} );

const TeamList: React.FC<TeamListProps> = ( { teams, initialSelectedIds, onTeamSelect, playingTeamIds = [], onTvPress } ) =>
{
    // Сортируем команды: играющие впереди
    const sortedTeams = React.useMemo( () =>
    {
        return teams.slice().sort( ( a, b ) =>
        {
            const aPlaying = typeof a.id === 'number' && playingTeamIds.includes( a.id );
            const bPlaying = typeof b.id === 'number' && playingTeamIds.includes( b.id );
            if ( aPlaying === bPlaying ) return 0;
            return aPlaying ? -1 : 1;
        } );
    }, [ teams, playingTeamIds ] );

    // Добавляем кнопку ТВ в начало списка
    const teamsWithTv: Team[] = React.useMemo(
        () => [ { id: 'tv', name: 'TV', logo: 'tv' }, ...sortedTeams ],
        [ sortedTeams ]
    );
    const selectedIds = initialSelectedIds?.map( String ) ?? []

    // Две секции
    const selectedTeams = useMemo(
        () => teamsWithTv.filter( ( t ) => selectedIds.includes( String( t.id ) ) ),
        [ teamsWithTv, selectedIds ],
    );
    const unselectedTeams = useMemo(
        () => teamsWithTv.filter( ( t ) => !selectedIds.includes( String( t.id ) ) ),
        [ teamsWithTv, selectedIds ],
    );

  // FlatList выбранных
    const renderSelected = useCallback(
        ( { item, index }: { item: Team; index: number } ) =>
        {
            if ( !item || !item.id ) return null;
            return (
                <TeamListItem
                    item={item}
                    isActive={true}
                    disabled={false}
                    onDeselect={() =>
                    {
                        if ( typeof item.id === 'number' )
                        {
                            onTeamSelect?.( item.id );
                        }
                    }}
                    style={index === selectedTeams.length - 1 ? { marginRight: 0 } : undefined}
                />
            );
        },
        [ selectedTeams.length, onTeamSelect ],
    );

  // FlatList невыбранных
    const renderUnselected = useCallback(
        ( { item, index }: { item: Team; index: number } ) =>
        {
            if ( !item || !item.id ) return null;
            // Для TV делаем отдельный обработчик
            const isTv = String( item.id ) === 'tv';
            return (
                <TeamListItem
                    item={item}
                    isActive={false}
                    disabled={isTv}
                    onSelect={() =>
                    {
                        console.log( 'isTv', isTv );
                        console.log( 'item.id', item );
                        if ( isTv )
                        {
                            onTvPress?.();
                            return
                        } else if ( typeof item.id === 'number' )
                        {
                            onTeamSelect?.( item.id );
                        }
                    }}
                    style={index === unselectedTeams.length - 1 ? { marginRight: 0 } : undefined}
                />
            );
        },
        [ unselectedTeams.length, onTeamSelect, onTvPress ],
    );

    return (
        <View style={{ flexDirection: 'column', paddingVertical: 4 }}>
            {/* <Text>initialSelectedIds {JSON.stringify( initialSelectedIds )}</Text> */}
            {/* <Text>selectedIds {JSON.stringify( selectedIds )}</Text> */}
            {/* <Text>teams {JSON.stringify( teams )}</Text> */}
            <FlatList
                data={selectedTeams}
                renderItem={renderSelected}
                keyExtractor={( item ) => `team-${ item.id }-selectedTeams`}
                horizontal
                getItemLayout={getItemLayout}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={7}
                removeClippedSubviews={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 8, paddingLeft: 8, paddingHorizontal: 12 }}
            />
            {/* Секция невыбранных */}
            <FlatList
                data={unselectedTeams}
                horizontal
                keyExtractor={( item ) => `team-${ item.id }-unselectedTeams`}
                renderItem={renderUnselected}
                showsHorizontalScrollIndicator={false}
                style={{}}
                contentContainerStyle={{ paddingVertical: 8, paddingLeft: 8, paddingHorizontal: 12 }}
                extraData={selectedIds}
            />
        </View>
    );
};

const styles = StyleSheet.create( {
    item: {
        marginRight: 6,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 1,
    },
    selectedItem: {},
    disabledItem: {
        opacity: 0.4,
    },
    pressed: {
        opacity: 0.7,
    },
    avatarBox: {
        width: 48,
        height: 48,
        borderRadius: 50,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'transparent',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
    },
    avatarBoxSelected: {
        borderColor: '#FF2D7A',
        backgroundColor: '#fff0f6',
    },
    avatarBoxDisabled: {
        backgroundColor: '#f5f5f5',
        borderColor: '#eee',
    },
    ripple: {
        borderRadius: 50,
        backgroundColor: 'rgba(255,45,122,0.18)',
    },
} );

export default React.memo( TeamList );
