// AllMatchesSection: секция всех матчей, отображает карточки, лоадеры, ошибки, с поддержкой единого стиля
import React from 'react';
import { View } from 'react-native';
import Spacer from 'src/shared/ui/Spacer';
import { colors } from 'src/shared/ui/theme/colors';
import { shadows } from 'src/shared/ui/theme/shadows';
import TodayMatchCard from 'src/shared/ui/today-match-card/TodayMatchCard';
import TodayMatchCardSkeleton from 'src/shared/ui/today-match-card/TodayMatchCardSkeleton';
import { useNavigation } from '@react-navigation/native';
import { DateFormatAdapter } from 'src/features/match-history/adapters';
// import { t } from '@lingui/macro'; // TODO: подключить lingui.js

function formatCompactDate( dateStr: string )
{
  if ( !dateStr ) return '';
  const [ year, month, day ] = dateStr.split( '-' );
  return `${ month }.${ day }.${ year.slice( 2 ) }`;
}

const SECTION_SPACING = 20;

const AllMatchesSection = React.memo(
  ( { match, loading, error }: { match: any; loading?: boolean; error?: string | null } ) =>
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

    const handlePress = () => {
      navigation.navigate('MatchHistory', { matchId: match.id });
    };

    return (
      <View style={{ backgroundColor: colors.card }}>
        <TodayMatchCard
          homeTeam={match.homeTeam}
          awayTeam={match.awayTeam}
          time={match.time}
          date={DateFormatAdapter.formatCompactDate( match.date )}
          onPress={handlePress}
          testID="all-match-card"
          accessibilityLabel={`Матч: ${ match.homeTeam?.name } - ${ match.time } - ${ match.awayTeam?.name }`}
        />
      </View>
    );
  },
);

export default AllMatchesSection;
