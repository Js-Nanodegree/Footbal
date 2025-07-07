import React, { useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import CollapsibleHeader from '../shared/ui/CollapsibleHeader/CollapsibleHeader';

const team = {
    name: 'Chelsea',
    crest: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg',
    venue: 'Stamford Bridge',
    area: { name: 'England' },
};

const sections = [
    { title: 'Игроки', data: Array.from( { length: 20 }, ( _, i ) => ( { id: i, name: `Player ${ i + 1 }` } ) ) },
];

const CollapsibleHeaderDemoScreen = () =>
{
    const scrollY = useRef( new Animated.Value( 0 ) ).current;
    const headerHeight = scrollY.interpolate( {
        inputRange: [ 0, 120 ],
        outputRange: [ 120, 60 ],
        extrapolate: 'clamp',
    } );
    return (
        <View style={{ flex: 1 }}>
            <CollapsibleHeader team={team} headerHeight={headerHeight as any} />
            <Animated.SectionList
                sections={sections}
                keyExtractor={item => item.id.toString()}
                renderSectionHeader={( { section: { title } } ) => (
                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 16 }}>{title}</Text>
                )}
                renderItem={( { item } ) => (
                    <View style={{ padding: 12 }}>
                        <Text>{item.name}</Text>
                    </View>
                )}
                contentContainerStyle={{ paddingTop: 130 }}
                onScroll={Animated.event(
                    [ { nativeEvent: { contentOffset: { y: scrollY } } } ],
                    { useNativeDriver: false }
                )}
            />
        </View>
    );
};

export default CollapsibleHeaderDemoScreen; 