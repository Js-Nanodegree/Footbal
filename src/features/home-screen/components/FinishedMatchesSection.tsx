import React from 'react';
import TodayMatchCard from 'src/shared/ui/today-match-card/TodayMatchCard';

const FinishedMatchesSection = React.memo(
    ( { match }: { match: any } ) =>
    {
        // Адаптируем под TodayMatchCard + добавляем счёт
        const homeScore = match.score?.fullTime?.homeTeam ?? '';
        const awayScore = match.score?.fullTime?.awayTeam ?? '';
        return (
            <TodayMatchCard
                homeTeam={match.homeTeam}
                awayTeam={match.awayTeam}
                time={[ homeScore, awayScore ].join( ' : ' )}
                date={match.date}
            />
        );
    }
);

export default FinishedMatchesSection; 