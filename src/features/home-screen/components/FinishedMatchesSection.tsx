// FinishedMatchesSection: секция завершённых матчей, отображает карточку с итоговым счётом, поддержка единого стиля, accessibility
import React from 'react';
import TodayMatchCard from 'src/shared/ui/today-match-card/TodayMatchCard';
// import { t } from '@lingui/macro'; // TODO: подключить lingui.js

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
                testID="finished-match-card"
                accessibilityLabel={`Завершённый матч: ${ match.homeTeam?.name } - ${ homeScore } : ${ awayScore } - ${ match.awayTeam?.name }`}
            />
        );
    }
);

export default FinishedMatchesSection; 