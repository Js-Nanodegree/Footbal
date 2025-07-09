import React, { useRef, useState } from 'react';
import { SectionList, View, Text } from 'react-native';
import FABScrollToTop from '../shared/ui/FABScrollToTop/FABScrollToTop';
import { useTranslation } from 'react-i18next';

const FABScrollToTopDemoScreen = () =>
{
    const { t } = useTranslation();
    const listRef = useRef<SectionList<any>>( null );
    const [ showFab, setShowFab ] = useState( false );
    const sections = [
        { title: t( 'fabDemo.section' ), data: Array.from( { length: 60 }, ( _, i ) => ( { id: i, name: t( 'fabDemo.item', { index: i + 1 } ) } ) ) },
    ];
    return (
        <View style={{ flex: 1 }}>
            <SectionList
                ref={listRef}
                sections={sections}
                keyExtractor={item => item.id.toString()}
                renderSectionHeader={( { section: { title } } ) => null}
                renderItem={( { item } ) => (
                    <View style={{ padding: 16 }}>
                        <View style={{ height: 40, backgroundColor: '#eee', borderRadius: 8, justifyContent: 'center', paddingLeft: 12 }}>
                            <Text>{item.name}</Text>
                        </View>
                    </View>
                )}
                contentContainerStyle={{ padding: 16 }}
                onScroll={e => setShowFab( e.nativeEvent.contentOffset.y > 600 )}
            />
            {showFab && <FABScrollToTop onPress={() => listRef.current?.scrollToLocation( { sectionIndex: 0, itemIndex: 0, animated: true } )} />}
        </View>
    );
};

export default FABScrollToTopDemoScreen; 