import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeamsThunk, setOffset, setLimit } from '../redux/teamSlice';
import { RootState } from '../../../shared/api/store';

export const useTeams = () => {
    const dispatch = useDispatch();
    const { teams, count, offset, limit, links, loading, error } = useSelector((state: RootState) => state.teams);

    useEffect(() => {
        dispatch(fetchTeamsThunk({ offset, limit }));
    }, [dispatch, offset, limit]);

    const nextPage = () => {
        if (offset + limit < count) {
            dispatch(setOffset(offset + limit));
        }
    };

    const prevPage = () => {
        if (offset - limit >= 0) {
            dispatch(setOffset(offset - limit));
        }
    };

    const setPageSize = (newLimit: number) => {
        dispatch(setLimit(newLimit));
        dispatch(setOffset(0));
    };

    return {
        teams,
        count,
        offset,
        limit,
        links,
        loading,
        error,
        nextPage,
        prevPage,
        setPageSize,
    };
}; 