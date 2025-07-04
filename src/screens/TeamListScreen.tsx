// context.md
// Purpose: Экран списка команд. Использует SectionList для отображения showcase компонентов и списка команд. Вся бизнес-логика вынесена в хуки. Соответствует архитектуре: тупой UI, только отображение, без бизнес-логики.
// Navigation: Используется в Stack.Navigator как TeamListScreen.
// Showcase: Включает демонстрацию Input, MatchCard и других компонентов дизайн-системы.
import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, ScrollView, SectionList } from 'react-native';
import { useTeams } from '../features/team-api/hooks/useTeams';
import MatchCard from '../shared/ui/match-card/MatchCard';
import Button from '../shared/ui/button/Button';
import Input from '../shared/ui/input/Input';
import Loader from '../shared/ui/loader/Loader';

const mockData = [
    {
        homeTeam: { name: 'Newcastle', logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg' },
        awayTeam: { name: 'Chelsea', logo: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg' },
        homeScore: 0,
        awayScore: 3,
        league: 'Premier League',
        status: '83',
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

const inputShowcaseData = [
    {
        key: 'default',
        props: { placeholder: 'Обычный', value: '', onChangeText: () => { } },
        label: 'Default',
    },
    {
        key: 'focused',
        props: { placeholder: 'Фокус', value: '', onChangeText: () => { }, state: 'focused' as const },
        label: 'Focused',
    },
    {
        key: 'error',
        props: { placeholder: 'Ошибка', value: '', onChangeText: () => { }, state: 'error' as const, status: 'error' as const, helperText: 'Ошибка' },
        label: 'Error',
    },
    {
        key: 'disabled',
        props: { placeholder: 'Disabled', value: '', onChangeText: () => { }, state: 'disabled' as const },
        label: 'Disabled',
    },
    {
        key: 'success',
        props: { placeholder: 'Success', value: '', onChangeText: () => { }, status: 'success' as const, helperText: 'Успех' },
        label: 'Success',
    },
];

const InputsHorizontalShowcase = () => (
    <View style={{ marginVertical: 16 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>Inputs</Text>
        <FlatList
            data={inputShowcaseData}
            horizontal
            keyExtractor={item => item.key}
            renderItem={( { item } ) => (
                <View style={{ width: 220, marginRight: 12 }}>
                    <Input {...item.props} />
                    <Text style={{ textAlign: 'center', marginTop: 4, fontSize: 12 }}>{item.label}</Text>
                </View>
            )}
            showsHorizontalScrollIndicator={false}
        />
    </View>
);

const styleguideData = [
    {
        title: 'Inputs',
        data: inputShowcaseData,
    },
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
                badgeText: '45+2',
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
                sections={styleguideData as any}
                keyExtractor={( _, idx ) => idx.toString()}
                renderSectionHeader={( { section: { title } } ) => (
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 }}>{title}</Text>
                )}
                renderItem={( { item, section } ) =>
                {
                    if ( section.title === 'Inputs' && item.props )
                    {
                        return (
                            <View style={{ marginBottom: 16 }}>
                                <Text style={{ fontSize: 14, marginBottom: 4 }}>{item.label}</Text>
                                <Input {...item.props} />
                            </View>
                        );
                    }
                    if ( section.title === 'Gradient' || section.title === 'White' || section.title === 'Purple' )
                    {
                        return <MatchCard {...item} />;
                    }
                    return null;
                }}
                stickySectionHeadersEnabled={false}
                style={{ marginBottom: 24 }}
            />
            <InputsHorizontalShowcase />
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>Список команд</Text>
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
                <Button title="Premier League" variant="primary" onPress={() => { }} />
                <Button title="La Liga" variant="secondary" onPress={() => { }} />
            </View>
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
                <Button title="Disabled" variant="primary" onPress={() => { }} disabled />
                <Button title="Loading" variant="secondary" onPress={() => { }} loading />
            </View>
            {loading && <Loader size="large" variant="primary" />}
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