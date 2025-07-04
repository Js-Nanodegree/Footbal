import React from 'react';
import { View, Text, FlatList, ActivityIndicator, ScrollView, SectionList } from 'react-native';
import { useTeams } from './hooks/useTeams';
import MatchCard from '../../shared/ui/match-card/MatchCard';
import Button from '../../shared/ui/button/Button';
import type { MatchCardProps } from '../../shared/ui/match-card/types';
import type { SectionListData } from 'react-native';

const mockData = [
    {
        homeTeam: { name: 'Newcastle', logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg' },
        awayTeam: { name: 'Chelsea', logo: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg' },
        homeScore: 0,
        awayScore: 3,
        league: 'Premier League',
        status: '83’',
        time: 'Week 10',
    },
    {
        homeTeam: { name: 'Man City', logo: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg' },
        awayTeam: { name: 'Arsenal', logo: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg' },
        homeScore: 2,
        awayScore: 2,
        league: 'Premier League',
        status: 'FT',
        time: 'Week 10',
    },
];

const styleguideData: { title: string; data: SectionListData<MatchCardProps>[] } = [
    {
        title: 'Gradient',
        data: [
            {
                variant: 'gradient',
                homeTeam: { name: 'Man United', logo: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg' },
                awayTeam: { name: 'Man City', logo: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg' },
                homeScore: 2,
                awayScore: 3,
                league: 'Premier League',
                time: 'Week 10',
                isLive: true,
                badgeText: 'LIVE',
                stadium: 'Old Trafford',
                backgroundLogo: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg',
            },
        ],
    },
    {
        title: 'White',
        data: [
            {
                variant: 'white',
                homeTeam: { name: 'Chelsea', logo: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg' },
                awayTeam: { name: 'Arsenal', logo: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg' },
                homeScore: 0,
                awayScore: 3,
                league: 'Premier League',
                time: 'Week 10',
                badgeText: 'FT',
                stadium: 'Stamford Bridge',
                backgroundLogo: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg',
            },
        ],
    },
    {
        title: 'Purple',
        data: [
            {
                variant: 'purple',
                homeTeam: { name: 'Newcastle', logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg' },
                awayTeam: { name: 'Liverpool', logo: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg' },
                homeScore: 1,
                awayScore: 1,
                league: 'Premier League',
                time: 'Week 10',
                badgeText: '45+2’',
                stadium: 'St. James Park',
                backgroundLogo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg',
            },
        ],
    },
];

export const TeamListScreen = () =>
{
    const { teams, count, offset, limit, loading, error, nextPage, prevPage } = useTeams();
    const currentPage = Math.floor( offset / limit ) + 1;
    const totalPages = Math.ceil( count / limit );

    return (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
            <SectionList
                sections={styleguideData}
                keyExtractor={( _, idx ) => idx.toString()}
                renderSectionHeader={( { section: { title } } ) => (
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 }}>{title} MatchCard</Text>
                )}
                renderItem={( { item } ) => <MatchCard {...item} />}
                stickySectionHeadersEnabled={false}
                style={{ marginBottom: 24 }}
            />
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>Список команд</Text>
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
                <Button title="Premier League" variant="primary" onPress={() => { }} />
                <Button title="La Liga" variant="secondary" onPress={() => { }} />
            </View>
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
                <Button title="Disabled" variant="primary" onPress={() => { }} disabled />
                <Button title="Loading" variant="secondary" onPress={() => { }} loading />
            </View>
            {loading && <ActivityIndicator size="large" />}
            {error && <Text style={{ color: 'red' }}>{error}</Text>}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
                <Button title="Назад" onPress={prevPage} disabled={offset === 0 || loading} />
                <Text>
                    Страница {currentPage} из {totalPages}
                </Text>
                <Button title="Вперёд" onPress={nextPage} disabled={offset + limit >= count || loading} />
            </View>
            {mockData.map( ( match, idx ) => (
                <MatchCard key={idx} {...match} />
            ) )}
        </ScrollView>
    );
};

export default TeamListScreen; 