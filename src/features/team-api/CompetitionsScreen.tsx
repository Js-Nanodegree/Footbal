import React, { useState } from 'react';
import { FlatList, Image } from 'react-native';
import { useCompetitions } from './hooks/useCompetitions';
import ListItem from 'src/shared/ui/list-item/ListItem';
import Input from 'src/shared/ui/input/Input';
import Loader from 'src/shared/ui/loader/Loader';
import ErrorState from 'src/shared/ui/error-state/ErrorState';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export default function CompetitionsScreen()
{
    const { competitions, loading, error, refresh } = useCompetitions();
    const [ search, setSearch ] = useState( '' );
    const navigation = useNavigation();
    const { t } = useTranslation();

    const filteredCompetitions = competitions.filter( c =>
        c.name.toLowerCase().includes( search.toLowerCase() )
    );

    if ( loading && competitions.length === 0 ) return <Loader />;
    if ( error && competitions.length === 0 ) return <ErrorState message={error} onRetry={refresh} />;
    if ( competitions.length === 0 ) return <ErrorState message={t('common.noData')} onRetry={refresh} />;

    return (
        <>
            <Input
                placeholder="Поиск турнира"
                value={search}
                onChangeText={setSearch}
                style={{ margin: 16 }}
            />
            <FlatList
                data={filteredCompetitions}
                keyExtractor={item => item.id.toString()}
                renderItem={( { item } ) => (
                    <ListItem
                        title={item.name}
                        subtitle={item.area?.name}
                        left={
                            <Image
                                source={{ uri: item.emblemUrl }}
                                style={{ width: 40, height: 40, borderRadius: 20 }}
                                resizeMode="contain"
                            />
                        }
                        onPress={() => navigation.navigate( 'Teams', { competitionId: item.id } )}
                    />
                )}
                refreshing={loading}
                onRefresh={refresh}
                contentContainerStyle={{ padding: 16 }}
                testID="competitions-list"
            />
        </>
    );
} 