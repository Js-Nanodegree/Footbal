// FinishedMatchesSection: секция завершённых матчей, отображает карточку с итоговым счётом, поддержка единого стиля, accessibility
import React from 'react';
import { StyleSheet } from 'react-native';
import TodayMatchCard from 'src/shared/ui/today-match-card/TodayMatchCard';

interface FinishedMatchesSectionProps
{
    match: any;
    onPress?: () => void;
}

const FinishedMatchesSection = React.memo(
    ( { match, onPress }: FinishedMatchesSectionProps ) =>
    {
        return (
            <TodayMatchCard
                homeTeam={match.homeTeam}
                awayTeam={match.awayTeam}
                time={match.time}
                date={match.date}
                onPress={onPress}
            />
        );
    }
);

const styles = StyleSheet.create( {
    cardShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 6,
        borderRadius: 24,
        // marginVertical: 12,
        backgroundColor: 'transparent',
    },
} );

export default FinishedMatchesSection; 