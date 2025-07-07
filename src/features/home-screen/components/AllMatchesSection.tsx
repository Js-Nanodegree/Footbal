import React from 'react';
import { View } from 'react-native';
import TodayMatchCard from 'src/shared/ui/today-match-card/TodayMatchCard';
import Spacer from 'src/shared/ui/Spacer';
import TodayMatchCardSkeleton from 'src/shared/ui/today-match-card/TodayMatchCardSkeleton';
import ErrorState from 'src/shared/ui/error-state/ErrorState';

const SECTION_SPACING = 20;

const AllMatchesSection = React.memo(
  ( { match, loading, error }: { match: any; loading?: boolean; error?: string | null } ) =>
  {
    if ( error && !loading )
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

    // Временно всегда рендерим карточку, даже если данные не идеальны
    return (
      <View style={{ backgroundColor: 'white' }}>
        <TodayMatchCard
          homeTeam={match.homeTeam}
          awayTeam={match.awayTeam}
          time={match.time}
          date={match.date}
        />
      </View>
    );
  },
);

export default AllMatchesSection;
