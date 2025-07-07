import React from 'react';
import { View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import TodayMatchCard from 'src/shared/ui/today-match-card/TodayMatchCard';
import Spacer from 'src/shared/ui/Spacer';
import { exampleTeams } from '../mocks/exampleTeams';
import TodayMatchCardSkeleton from 'src/shared/ui/today-match-card/TodayMatchCardSkeleton';
import ErrorState from 'src/shared/ui/error-state/ErrorState';

const SECTION_SPACING = 20;

const AllMatchesSection = React.memo(
  ( { match, loading, error }: { match: any; loading?: boolean; error?: string | null } ) =>
  {
    if ( !match ) return null;
    const homeTeamRaw = exampleTeams.find( ( t ) => t.id === match.homeTeamId );
    const awayTeamRaw = exampleTeams.find( ( t ) => t.id === match.awayTeamId );
    if ( !homeTeamRaw || !awayTeamRaw ) return null;
    const homeTeam = { ...homeTeamRaw, crestUrl: homeTeamRaw.logo };
    const awayTeam = { ...awayTeamRaw, crestUrl: awayTeamRaw.logo };

    if ( error && !loading )
    {
      return <ErrorState message={error} />;
    }
    if ( loading )
    {
      return (
        <View style={{ backgroundColor: 'white' }}>
          {[ ...Array( 5 ) ].map( ( _, i ) => (
            <TodayMatchCardSkeleton key={i} />
          ) )}
          <Spacer size={SECTION_SPACING} />
        </View>
      );
    }

    return (
      <View style={{ backgroundColor: 'white' }}>
        <View
          style={{
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.05,
            shadowRadius: 1,
            elevation: 0.05,
          }}
        >
          <TodayMatchCard
            homeTeam={homeTeam}
            awayTeam={awayTeam}
            time={match.time}
            date={match.date}
          />
        </View>
      </View>
    );
  },
);

export default AllMatchesSection;
