import { MatchHistoryItem } from '../team-api/types/match';
import { Match } from '../team-api/types/match';

// Адаптер для матчей: приводит матч к формату, который нужен MatchSwiperSection/карточке
export function adaptMatchForSwiper(m: any) {
  return {
    id: m.id,
    homeTeam: { name: m.homeTeam?.name, logo: m.homeTeam?.crest || '' },
    awayTeam: { name: m.awayTeam?.name, logo: m.awayTeam?.crest || '' },
    score: m.score,
    status: m.status,
    utcDate: m.utcDate,
    competition: m.competition,
    // ...добавь нужные поля для карточки/свайпера
  };
}

// Преобразует массив MatchHistoryItem[] в Match[]
export function adaptSeasonMatchesToMatch(seasonMatches: MatchHistoryItem[]): Match[] {
  return seasonMatches
    .filter((m): m is MatchHistoryItem => !!m && typeof m.status === 'string')
    .map((m) => {
      const match: Match = {
        ...m,
        status: m.status ? m.status.toLowerCase() : '',
        lastUpdated: m.lastUpdated ?? '',
        referees: m.referees ?? [],
      };
      return match;
    });
}

export class DateFormatAdapter
{
  static formatCompactDate( dateStr: string )
  {
    if ( !dateStr ) return '';
    // Оставляем только YYYY-MM-DD
    const [ datePart ] = dateStr.split( 'T' );
    const [ year, month, day ] = datePart.split( '-' );
    return `${ month }.${ day }.${ year.slice( 2 ) }`;
  }
} 