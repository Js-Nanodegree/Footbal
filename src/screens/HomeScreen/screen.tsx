import React from 'react';
import { SectionList, View } from 'react-native';
import { useHomeScreenSections } from 'src/features/home-screen/hooks/useHomeScreenSections';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeScreen = () =>
{
  const { sections, loading, error, onRefresh, onPaginate } = useHomeScreenSections();
  const insets = useSafeAreaInsets();

  console.log( 'HomeScreen ререндер' );
  console.log( 'sections:', sections.map( s => s.title ) );
  sections.forEach( ( section, idx ) =>
  {
    console.log( `Section[${ idx }]:`, section.title, 'data.length:', section.data?.length );
  } );
  console.log( 'loading:', loading );
  console.log( 'error:', error );

  return (
    <View style={{ flex: 1 }}>
      <SectionList
        sections={sections}
        keyExtractor={( item, index ) =>
          typeof item === 'object' && item !== null && 'id' in item
            ? String( item.id )
            : String( item ) + '-' + index
        }
        renderItem={( { item, section } ) =>
        {
          console.log( 'renderItem', section.title, item );
          return section.title === 'Все матчи'
            ? section.renderItem( { item } )
            : section.renderItem();
        }}
        refreshing={loading.matches}
        onRefresh={() =>
        {
          console.log( 'onRefresh triggered' );
          onRefresh();
        }}
        onEndReached={() =>
        {
          console.log( 'onEndReached triggered' );
          onPaginate();
        }}
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      />
    </View>
  );
};

export default HomeScreen;
