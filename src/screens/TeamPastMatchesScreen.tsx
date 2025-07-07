import React, { useEffect } from 'react';
import { View, Text, SectionList, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import type { RootState } from '../shared/api/store';
import { fetchTeamPastMatches, PastMatch } from '../features/team-api/redux/teamPastMatchesSlice';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../roads/RootNavigator';
import { useAppDispatch } from '../shared/api/store';

// Заглушка для фильтров
const FilterBar = () => (
    <View style={{ flexDirection: 'row', padding: 12, gap: 8 }}>
        <TouchableOpacity style={{ backgroundColor: '#eee', borderRadius: 8, padding: 8 }}>
            <Text>Фильтр по дате</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: '#eee', borderRadius: 8, padding: 8 }}>
            <Text>Фильтр по турниру</Text>
        </TouchableOpacity>
    </View>
);

// Заглушка для карточки матча
const MatchCard = ( { match }: { match: PastMatch } ) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderColor: '#eee' }}>
        <View style={{ width: 32, height: 32, backgroundColor: '#ddd', borderRadius: 16, marginRight: 12 }} />
        <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: 'bold' }}>{match.homeTeam} vs {match.awayTeam}</Text>
            <Text style={{ color: '#888' }}>{match.tournament}</Text>
        </View>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{match.score}</Text>
    </View>
);

function groupMatchesByDate( matches: PastMatch[] )
{
    const groups: { [ date: string ]: PastMatch[] } = {};
    matches.forEach( m =>
    {
        if ( !groups[ m.date ] ) groups[ m.date ] = [];
        groups[ m.date ].push( m );
    } );
    return Object.entries( groups ).map( ( [ title, data ] ) => ( { title, data } ) );
}

const TeamPastMatchesScreen = () =>
{
    const navigation = useNavigation();
    const route = useRoute<RouteProp<RootStackParamList, 'TeamPastMatches'>>();
    const { teamId, teamName } = route.params;
    const dispatch = useAppDispatch();
    const { matches, loading, error } = useSelector( ( state: RootState ) => state.teamPastMatches );

    useEffect( () =>
    {
        dispatch( fetchTeamPastMatches( { teamId } ) );
    }, [ dispatch, teamId ] );

    const sections = groupMatchesByDate( matches );

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 12 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 12 }}>
                    <Text style={{ fontSize: 18 }}>{'<'} Назад</Text>
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Прошедшие матчи: {teamName}</Text>
            </View>
            <FilterBar />
            {loading && <Text style={{ textAlign: 'center', marginTop: 32 }}>Загрузка...</Text>}
            {error && <Text style={{ color: 'red', textAlign: 'center', marginTop: 32 }}>Ошибка загрузки</Text>}
            {!loading && !error && (
                <SectionList
                    sections={sections}
                    keyExtractor={( item ) => item.id.toString()}
                    renderSectionHeader={( { section: { title } } ) => (
                        <Text style={{ fontWeight: 'bold', fontSize: 16, backgroundColor: '#f7f7f7', paddingVertical: 6, paddingHorizontal: 12 }}>{title}</Text>
                    )}
                    renderItem={( { item } ) => <MatchCard match={item} />}
                    ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 32 }}>Нет прошедших матчей</Text>}
                    contentContainerStyle={{ paddingBottom: 32 }}
                />
            )}
        </View>
    );
};

export default TeamPastMatchesScreen; 