import React, { useState } from 'react';
import { SectionList, View, Text, TouchableOpacity, Animated } from 'react-native';
import ListItem from '../shared/ui/list-item/ListItem';

const sections = [
    {
        title: 'Секция 1',
        data: [
            { id: 1, title: 'Action 1' },
            { id: 2, title: 'Action 2' },
        ],
    },
    {
        title: 'Секция 2',
        data: [
            { id: 3, title: 'Action 3' },
            { id: 4, title: 'Action 4' },
        ],
    },
];

const ActionListDemoScreen = () =>
{
    const [ selected, setSelected ] = useState<number | null>( null );
    return (
        <SectionList
            sections={sections}
            keyExtractor={item => item.id.toString()}
            renderSectionHeader={( { section: { title } } ) => (
                <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 16 }}>{title}</Text>
            )}
            renderItem={( { item } ) => (
                <Animated.View style={{ opacity: 1 }}>
                    <TouchableOpacity onPress={() => setSelected( item.id )}>
                        <ListItem title={item.title} selected={selected === item.id} />
                    </TouchableOpacity>
                </Animated.View>
            )}
            contentContainerStyle={{ padding: 16 }}
        />
    );
};

export default ActionListDemoScreen; 