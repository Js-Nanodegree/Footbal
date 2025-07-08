import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Team } from '../types/team';
import { Match } from '../types/match';
import { Competition } from '../types/competition';
import { Standing } from '../types/standing';
import { tmpApiAxios } from '../clients/tmpApiAxios';
import { MatchDetails } from '../types/match';

const API_KEY = 'bf63b2eaacf54ac0b42620ac5c820ec7';

export enum statusMatches
{
    SCHEDULED = 'SCHEDULED',
    LIVE = 'LIVE',
    IN_PLAY = 'IN_PLAY',
    PAUSED = 'PAUSED',
    FINISHED = 'FINISHED',
}

export const footballApi = createApi( {
    reducerPath: 'footballApi',
    baseQuery: async ( { url, method = 'get', params, data } ) =>
    {
        try
        {
            const result = await tmpApiAxios.request( {
                url,
                method,
                params,
                data,
                headers: { 'X-Auth-Token': API_KEY },
      } );
        return { data: result };
        } catch ( error: any )
        {
            return { error: { status: error.response?.status, data: error.message } };
        }
    },
    endpoints: ( builder ) => ( {
        getLeagues: builder.query<
            Competition[],
            {
                season?: string;
            }
        >( {
            query: () => ( {
                url: `/competitions`,
            } ),
            transformResponse: ( response: any ) => response.competitions,
        } ),
        getAllLeagueMatches: builder.query<
            Match[],
            {
                competitionId: Competition[ 'code' ];
            }
        >( {
            query: ( { competitionId }: { competitionId: Competition[ 'code' ] } ) => ( {
                url: `/competitions/${ competitionId }/matches`,
            } ),
            transformResponse: ( response: any ) => response.matches,
        } ),
        getTeams: builder.query<Team[], { page?: number; pageSize?: number }>( {
            query: ( { page = 1, pageSize = 20 } = {} ) => ( {
                url: `/teams`,
            params: { limit: pageSize, offset: ( page - 1 ) * pageSize },
        } ),
        transformResponse: ( response: any ) => response.teams,
    } ),
      getTeamDetails: builder.query<Team, number>( {
          query: ( teamId ) => ( { url: `/teams/${ teamId }` } ),
          transformResponse: ( response: any ) => response,
      } ),
        getTeamMatches: builder.query<
            Match[],
            {
                teamId: number;
                dateFrom?: string;
                dateTo?: string;
                status?: statusMatches;
                venue?: 'home' | 'away';
                opponentId?: number;
            }
        >( {
            query: ( { teamId, dateFrom, dateTo, status, venue, opponentId } ) =>
            {
                const params: Record<string, any> = {};
                if ( dateFrom ) params.dateFrom = dateFrom;
                if ( dateTo ) params.dateTo = dateTo;
                if ( status ) params.status = status;
                if ( venue ) params.venue = venue;
                if ( opponentId ) params.opponent = opponentId;
                return {
                    url: `/teams/${ teamId }/matches`,
                    params,
                };
            },
            transformResponse: ( response: any ) => response.matches,
        } ),
      getCompetitions: builder.query<Competition[], void>( {
          query: () => ( { url: `/competitions` } ),
          transformResponse: ( response: any ) => response.competitions,
      } ),
      getStandings: builder.query<Standing[], number>( {
          query: ( competitionId ) => ( { url: `/competitions/${ competitionId }/standings` } ),
          transformResponse: ( response: any ) => response.standings,
      } ),
      getCompetitionsTeams: builder.query<
          Team[],
          {
              competitionId: number;
              season?: string;
          }
      >( {
          query: ( { competitionId, season = '2025' } ) => ( {
              url: `/competitions/${ competitionId }/teams`,
              params: {
                  season: '2025',
              },
          } ),
          transformResponse: ( response: any ) => response,
      } ),
      getLiveMatches: builder.query<
          Match[],
          {
              competitionId: Competition[ 'code' ];
              status?: statusMatches;
          }
      >( {
          query: ( { competitionId, status = statusMatches.LIVE }: { competitionId: Competition[ 'code' ], status?: statusMatches } ) =>
          {
              const now = new Date();
              const dateFrom = now.toISOString().slice( 0, 10 );
              const dateTo = new Date( now.getTime() + 24 * 60 * 60 * 1000 ).toISOString().slice( 0, 10 );

            return {
                url: `/competitions/${ competitionId }/matches`,
                headers: {
                    'X-Auth-Token': API_KEY,
                    'Content-Type': 'application/json',
                    'X-Unfold-Goals': true,
                },
                params: {
                    status,
                },
            };
        },
    } ),
    getMatchDetails: builder.query<MatchDetails, number>({
        query: (matchId) => ({ url: `/matches/${matchId}` }),
        transformResponse: (response: any) => response.match ?? response,
    }),
    } ),
} );

export const {
    useGetTeamsQuery,
    useGetTeamDetailsQuery,
    useGetTeamMatchesQuery,
    useGetCompetitionsQuery,
    useGetStandingsQuery,
    useGetLeaguesQuery,
    useGetMatchDetailsQuery,
} = footballApi;
