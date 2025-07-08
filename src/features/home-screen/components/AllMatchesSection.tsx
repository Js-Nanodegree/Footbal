// AllMatchesSection: секция всех матчей, отображает карточки, лоадеры, ошибки, с поддержкой единого стиля
import React from 'react';
import { View } from 'react-native';
import Spacer from 'src/shared/ui/Spacer';
import { colors } from 'src/shared/ui/theme/colors';
import { shadows } from 'src/shared/ui/theme/shadows';
import TodayMatchCard from 'src/shared/ui/today-match-card/TodayMatchCard';
import TodayMatchCardSkeleton from 'src/shared/ui/today-match-card/TodayMatchCardSkeleton';
// import { t } from '@lingui/macro'; // TODO: подключить lingui.js

const SECTION_SPACING = 20;

const AllMatchesSection = React.memo(
  ( { match, loading, error }: { match: any; loading?: boolean; error?: string | null } ) =>
  {
    if ( error && !loading )
    {
      return (
        <View style={{ backgroundColor: colors.card, ...shadows.section }}>
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
        <View style={{ backgroundColor: colors.card, ...shadows.section }}>
          {[ ...Array( 5 ) ].map( ( _, i ) => (
            <TodayMatchCardSkeleton key={i} />
          ) )}
          <Spacer size={SECTION_SPACING} />
        </View>
      );
    }

    return (
      <View style={{ backgroundColor: colors.card }}>
        <TodayMatchCard
          homeTeam={match.homeTeam}
          awayTeam={match.awayTeam}
          time={match.time}
          date={match.date}
          testID="all-match-card"
          accessibilityLabel={`Матч: ${ match.homeTeam?.name } - ${ match.time } - ${ match.awayTeam?.name }`}
        />
      </View>
    );
  },
);

export default AllMatchesSection;
