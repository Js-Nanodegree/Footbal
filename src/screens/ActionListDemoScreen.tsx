import React, { useState } from 'react';
import { SectionList, View, Text, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import ListItem from '../shared/ui/list-item/ListItem';
import { useDisableAnimationsForAndroid } from 'src/shared/hooks/useDisableAnimationsForAndroid';
import { useTranslation } from 'react-i18next';

const ActionListDemoScreen = () =>
{
    const { t } = useTranslation();
    const [ selected, setSelected ] = useState<number | null>( null );
    const isAndroidNoAnim = useDisableAnimationsForAndroid();
    const sections = [
        {
            title: t( 'actionList.section1' ),
            data: [
                { id: 1, title: t( 'actionList.action1' ) },
                { id: 2, title: t( 'actionList.action2' ) },
            ],
        },
        {
            title: t( 'actionList.section2' ),
            data: [
                { id: 3, title: t( 'actionList.action3' ) },
                { id: 4, title: t( 'actionList.action4' ) },
            ],
        },
    ];
    return (
        <SectionList
            sections={sections}
            keyExtractor={item => item.id.toString()}
            renderSectionHeader={( { section: { title } } ) => (
                <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 16 }}>{title}</Text>
            )}
            renderItem={( { item } ) => (
                isAndroidNoAnim ? (
                    <View style={{ opacity: 1 }}>
                        <TouchableOpacity onPress={() => setSelected( item.id )}>
                            <ListItem title={item.title} selected={selected === item.id} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <Animated.View style={{ opacity: 1 }}>
                        <TouchableOpacity onPress={() => setSelected( item.id )}>
                            <ListItem title={item.title} selected={selected === item.id} />
                        </TouchableOpacity>
                    </Animated.View>
                )
            )}
            contentContainerStyle={{ padding: 16 }}
        />
    );
};

export default ActionListDemoScreen; 