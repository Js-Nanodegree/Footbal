import React from 'react';
import { SectionList, View } from 'react-native';
import { useHomeScreenSections } from 'src/features/home-screen/hooks/useHomeScreenSections';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Competition } from 'src/features/team-api/types/competition';
import { Team } from 'src/features/team-api/types/team';
import { Match } from 'src/features/team-api/types/match';
import { usePullToRefresh } from 'src/shared/hooks/usePullToRefresh';
import Loader from 'src/shared/ui/loader';

interface HomeScreenProps
{
  competitions: Competition[];
  teams: Team[];
  matches: Match[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onPaginate: () => void;
}

const HomeScreen = ( { competitions, teams, matches, loading, error, onRefresh, onPaginate }: HomeScreenProps ) =>
{
  const sectionsData = useHomeScreenSections( { competitions, teams, matches, loading, error, onRefresh, onPaginate } );
  const { sections } = sectionsData;
  const insets = useSafeAreaInsets();

  const { refreshing, onRefresh: handleRefresh, refreshControl } = usePullToRefresh( { onRefresh } );

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
          return section.title === 'Все матчи'
            ? section.renderItem( { item } )
            : section.renderItem();
        }}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        refreshControl={refreshControl}
        onEndReached={onPaginate}
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      />
    </View>
  );
};

export default HomeScreen;
