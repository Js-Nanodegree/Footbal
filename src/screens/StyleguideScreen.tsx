import React from 'react';
import { SectionList, FlatList, View, Text } from 'react-native';
import Input from '../shared/ui/input/Input';
import Button from '../shared/ui/button/Button';
import MatchCard from '../shared/ui/match-card/MatchCard';
import ListItem from '../shared/ui/list-item/ListItem';
import Loader from '../shared/ui/loader/Loader';
import MatchEventTimeline from '../shared/ui/match-event-timeline/MatchEventTimeline';
import MatchInfoCard from '../shared/ui/match-info-card/MatchInfoCard';
import StatsBar from '../shared/ui/stats-bar/StatsBar';
import TabBar from '../shared/ui/tab-bar/TabBar';
import Typography from '../shared/ui/typography/Typography';
import Avatar from '../shared/ui/avatar/Avatar';
import Badge from '../shared/ui/badge/Badge';
import ErrorState from '../shared/ui/error-state/ErrorState';
import FABScrollToTop from '../shared/ui/FABScrollToTop/FABScrollToTop';
import CollapsibleHeader from '../shared/ui/CollapsibleHeader/CollapsibleHeader';
import { useNavigation } from '@react-navigation/native';

type StyleguideSection = {
    title: string;
    data: { label: string; element: React.ReactNode }[][];
};

const styleguideSections: StyleguideSection[] = [
    {
        title: 'Input',
        data: [ [
            { label: 'Default', element: <Input placeholder="Обычный" value="" onChangeText={() => { }} /> },
            { label: 'Focused', element: <Input placeholder="Фокус" value="" onChangeText={() => { }} state="focused" /> },
            { label: 'Error', element: <Input placeholder="Ошибка" value="" onChangeText={() => { }} state="error" status="error" helperText="Ошибка" /> },
            { label: 'Disabled', element: <Input placeholder="Disabled" value="" onChangeText={() => { }} state="disabled" /> },
            { label: 'Success', element: <Input placeholder="Success" value="" onChangeText={() => { }} status="success" helperText="Успех" /> },
        ] ],
    },
    {
        title: 'Button',
        data: [ [
            { label: 'Primary', element: <Button title="Primary" variant="primary" onPress={() => { }} /> },
            { label: 'Secondary', element: <Button title="Secondary" variant="secondary" onPress={() => { }} /> },
            { label: 'Disabled', element: <Button title="Disabled" variant="primary" disabled onPress={() => { }} /> },
            { label: 'Loading', element: <Button title="Loading" variant="secondary" loading onPress={() => { }} /> },
        ] ],
    },
    {
        title: 'MatchCard',
        data: [ [
            { label: 'Gradient', element: <MatchCard variant="gradient" homeTeam={{ name: 'Man United', logo: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg' }} awayTeam={{ name: 'Man City', logo: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg' }} homeScore={2} awayScore={3} league="Premier League" time="Week 10" isLive badgeText="LIVE" stadium="Old Trafford" backgroundLogo="https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg" /> },
            { label: 'White', element: <MatchCard variant="white" homeTeam={{ name: 'Chelsea', logo: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg' }} awayTeam={{ name: 'Arsenal', logo: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg' }} homeScore={0} awayScore={3} league="Premier League" time="Week 10" badgeText="FT" stadium="Stamford Bridge" backgroundLogo="https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg" /> },
            { label: 'Purple', element: <MatchCard variant="purple" homeTeam={{ name: 'Newcastle', logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg' }} awayTeam={{ name: 'Liverpool', logo: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg' }} homeScore={1} awayScore={1} league="Premier League" time="Week 10" badgeText="45+2'" stadium="St. James Park" backgroundLogo="https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg" /> },
        ] ],
    },
    {
        title: 'ListItem',
        data: [ [
            { label: 'Default', element: <ListItem title="Игрок 1" /> },
            { label: 'Subtitle', element: <ListItem title="Игрок 2" subtitle="Нападающий" /> },
            { label: 'With Avatar', element: <ListItem title="Игрок 3" left={<Avatar initials="A3" size="small" />} /> },
            { label: 'With Icon', element: <ListItem title="Игрок 4" left={<Text>⚽</Text>} /> },
        ] ],
    },
    {
        title: 'Loader',
        data: [ [
            { label: 'Primary', element: <Loader size="large" variant="primary" /> },
            { label: 'Secondary', element: <Loader size="small" variant="secondary" /> },
        ] ],
    },
    {
        title: 'MatchEventTimeline',
        data: [ [
            {
                label: 'Default', element: <MatchEventTimeline events={[
                    { id: 1, type: 'goal', time: 12, player: { name: 'Игрок 1' } },
                    { id: 2, type: 'yellow-card', time: 45, player: { name: 'Игрок 2' } }
                ]} />
            },
        ] ],
    },
    {
        title: 'MatchInfoCard',
        data: [ [
            { label: 'Default', element: <MatchInfoCard homeTeam={{ name: 'Chelsea', logo: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg' }} awayTeam={{ name: 'Arsenal', logo: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg' }} time="19:00" date="2024-06-20" stadium="Stamford Bridge" /> },
        ] ],
    },
    {
        title: 'StatsBar',
        data: [ [
            { label: 'Default', element: <StatsBar leftValue={60} rightValue={40} label="Владение мячом" /> },
        ] ],
    },
    {
        title: 'TabBar',
        data: [ [
            {
                label: 'Default', element: <TabBar items={[
                    { key: 'tab1', label: 'Tab 1' },
                    { key: 'tab2', label: 'Tab 2' }
                ]} activeKey="tab1" onTabPress={() => { }} />
            },
        ] ],
    },
    {
        title: 'Typography',
        data: [ [
            { label: 'H1 Oswald', element: <Typography variant="h1" font="Oswald" color="#222">Заголовок H1 (Oswald)</Typography> },
            { label: 'H2 Oswald', element: <Typography variant="h2" font="Oswald" color="#222">Заголовок H2 (Oswald)</Typography> },
            { label: 'Body Oswald', element: <Typography variant="body" font="Oswald" color="#222">Текст Body (Oswald)</Typography> },
            { label: 'Caption Oswald', element: <Typography variant="caption" font="Oswald" color="#222">Подпись Caption (Oswald)</Typography> },
            { label: 'H1 Inter', element: <Typography variant="h1" font="Inter">Заголовок H1 (Inter)</Typography> },
            { label: 'H2 Inter', element: <Typography variant="h2" font="Inter">Заголовок H2 (Inter)</Typography> },
            { label: 'Body Inter', element: <Typography variant="body" font="Inter">Текст Body (Inter)</Typography> },
            { label: 'Caption Inter', element: <Typography variant="caption" font="Inter">Подпись Caption (Inter)</Typography> },
        ] ],
    },
    {
        title: 'Avatar',
        data: [ [
            { label: 'Фото', element: <Avatar src="https://randomuser.me/api/portraits/men/32.jpg" size="medium" /> },
            { label: 'Инициалы', element: <Avatar initials="AB" size="medium" /> },
            { label: 'Круглый', element: <Avatar initials="CD" size="medium" shape="circle" /> },
            { label: 'Квадрат', element: <Avatar initials="EF" size="medium" shape="square" /> },
            { label: 'С рамкой', element: <Avatar initials="GH" size="medium" border /> },
            { label: 'Primary', element: <Avatar initials="IJ" size="medium" colorVariant="primary" /> },
            { label: 'Large', element: <Avatar initials="KL" size="large" /> },
            { label: 'Online', element: <Avatar initials="MN" size="medium" status="online" /> },
        ] ],
    },
    {
        title: 'Badge',
        data: [ [
            { label: 'Primary', element: <Badge>Primary</Badge> },
            { label: 'Secondary', element: <Badge variant="secondary">Secondary</Badge> },
            { label: 'Success', element: <Badge variant="success">Success</Badge> },
            { label: 'Error', element: <Badge variant="error">Error</Badge> },
            { label: 'Warning', element: <Badge variant="warning">Warning</Badge> },
            { label: 'Info', element: <Badge variant="info">Info</Badge> },
            { label: 'Outline', element: <Badge mode="outline">Outline</Badge> },
            { label: 'Small', element: <Badge size="small">Small</Badge> },
            { label: 'Large', element: <Badge size="large">Large</Badge> },
            { label: 'Disabled', element: <Badge disabled>Disabled</Badge> },
        ] ],
    },
    {
        title: 'ErrorState',
        data: [ [
            { label: 'Default', element: <ErrorState message="Что-то пошло не так" onRetry={() => { }} /> },
        ] ],
    },
    {
        title: 'FABScrollToTop',
        data: [ [
            { label: 'Default', element: <FABScrollToTop onPress={() => { }} /> },
        ] ],
    },
    {
        title: 'CollapsibleHeader',
        data: [ [
            { label: 'Default', element: <CollapsibleHeader team={{ name: 'Chelsea', crest: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg', venue: 'Stamford Bridge', area: { name: 'England' } }} /> },
        ] ],
    },
];

const StyleguideScreen = () =>
{
    const navigation = useNavigation();
    const interactiveSection = {
        title: 'Интерактивные примеры',
        data: [ [
            { label: 'Action List', element: <Button title="Action List Demo" onPress={() => navigation.navigate( 'ActionListDemo' as never )} /> },
            { label: 'Collapsible Header', element: <Button title="Collapsible Header Demo" onPress={() => navigation.navigate( 'CollapsibleHeaderDemo' as never )} /> },
            { label: 'Error State', element: <Button title="Error State Demo" onPress={() => navigation.navigate( 'ErrorStateDemo' as never )} /> },
            { label: 'FAB Scroll To Top', element: <Button title="FAB Scroll To Top Demo" onPress={() => navigation.navigate( 'FABScrollToTopDemo' as never )} /> },
        ] ],
    };
    const allSections = [ interactiveSection, ...styleguideSections ];
    return (
        <SectionList
            sections={allSections}
            keyExtractor={( _, idx ) => idx.toString()}
            renderSectionHeader={( { section: { title } } ) => (
                <Typography variant="h2" weight="bold" style={{ marginTop: 16, marginBottom: 8 }}>{title}</Typography>
            )}
            renderItem={( { item } ) => (
                <FlatList
                    data={item}
                    horizontal
                    keyExtractor={( _, idx ) => idx.toString()}
                    renderItem={( { item } ) => (
                        <View style={{ alignItems: 'center', marginRight: 16 }}>
                            <Text style={{ fontSize: 13, color: '#888', marginBottom: 6 }}>{item.label}</Text>
                            {item.element}
                        </View>
                    )}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 16, paddingBottom: 8, paddingHorizontal: 16 }}
                />
            )}
            stickySectionHeadersEnabled={false}
            contentContainerStyle={{ paddingBottom: 32 }}
            ListFooterComponent={<View style={{ height: 32 }} />}
        />
    );
};

export default StyleguideScreen; 