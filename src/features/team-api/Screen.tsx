import React from 'react';
import { View, Text, Button, FlatList, ActivityIndicator } from 'react-native';
import { useTeams } from './hooks/useTeams';

export const TeamListScreen = () =>
{
    const { teams, count, offset, limit, loading, error, nextPage, prevPage } = useTeams();
    const currentPage = Math.floor( offset / limit ) + 1;
    const totalPages = Math.ceil( count / limit );

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>Список команд</Text>
            {loading && <ActivityIndicator size="large" />}
            {error && <Text style={{ color: 'red' }}>{error}</Text>}
            <FlatList
                data={teams}
                keyExtractor={( item ) => item.id.toString()}
                renderItem={( { item } ) => (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                        <Text style={{ fontSize: 16 }}>{item.name}</Text>
                    </View>
                )}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
                <Button title="Назад" onPress={prevPage} disabled={offset === 0 || loading} />
                <Text>
                    Страница {currentPage} из {totalPages}
                </Text>
                <Button title="Вперёд" onPress={nextPage} disabled={offset + limit >= count || loading} />
            </View>
        </View>
    );
}; 