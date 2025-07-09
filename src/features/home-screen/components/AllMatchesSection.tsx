// AllMatchesSection: секция всех матчей, отображает карточки, лоадеры, ошибки, с поддержкой единого стиля
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { DateFormatAdapter } from 'src/features/match-history/adapters';
import { Match } from 'src/features/team-api/types/match';
import Spacer from 'src/shared/ui/Spacer';
import { colors } from 'src/shared/ui/theme/colors';
import { shadows } from 'src/shared/ui/theme/shadows';
import TodayMatchCard from 'src/shared/ui/today-match-card/TodayMatchCard';
import TodayMatchCardSkeleton from 'src/shared/ui/today-match-card/TodayMatchCardSkeleton';

const SECTION_SPACING = 20;

const AllMatchesSection = React.memo(
  ( { match, loading, error }: { match: Match; loading?: boolean; error?: string | null } ) =>
  {
    const navigation = useNavigation();
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
    if (loading )
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

    const handlePress = () => {
      navigation.navigate( 'MatchHistory', {
        matchId: match.id,
        homeId: match.homeTeam?.id,
        awayId: match.awayTeam?.id,
        venue: 'home',
      } );
    };

    return (
      <View style={{ backgroundColor: colors.card }}>
        <TodayMatchCard
          homeTeam={{
            id: match.homeTeam?.id,
            name: match.homeTeam?.name,
            crest: match.homeTeam?.crest || match.homeTeam?.logo || '',
          }}
          awayTeam={{
            id: match.awayTeam?.id,
            name: match.awayTeam?.name,
            crest: match.awayTeam?.crest || match.awayTeam?.logo || '',
          }}
          time={match.time}
          date={DateFormatAdapter.formatCompactDate(match.date)}
          onPress={handlePress}
          testID="all-match-card"
          accessibilityLabel={`Матч: ${ match.homeTeam?.name } - ${ match.time } - ${ match.awayTeam?.name }`}
        />
      </View>
    );
  },
);

export default AllMatchesSection;
