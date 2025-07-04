import { useCallback, useState, useEffect } from 'react';
import { SectionList, FlatList } from 'react-native';

export const useFabScrollToTop = (
    listRef: React.RefObject<SectionList<any> | FlatList<any>>,
    scrollY: number,
    threshold: number = 300
) =>
{
    const [ showFab, setShowFab ] = useState( false );

    useEffect( () =>
    {
        setShowFab( scrollY > threshold );
    }, [ scrollY, threshold ] );

    const scrollToTop = useCallback( () =>
    {
        if ( listRef.current )
        {
            // @ts-ignore
            listRef.current.scrollToOffset( { offset: 0, animated: true } );
        }
    }, [ listRef ] );

    return { showFab, scrollToTop };
}; 