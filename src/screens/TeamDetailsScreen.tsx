import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useMMKVNetworkStatus } from '../shared/memory-bank/localMemoryBank';
import ScreenWrapper from '../shared/ui/ScreenWrapper';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../roads/RootNavigator';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

const TeamDetailsScreen = () => {
    const isConnected = useMMKVNetworkStatus();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'TeamDetails'>>();
    const route = useRoute<RouteProp<RootStackParamList, 'TeamDetails'>>();
    const { teamId } = route.params;
    // TODO: получить teamName из данных команды (здесь заглушка)
    const teamName = 'Chelsea';
    return (
        <ScreenWrapper
            loading={false}
            isConnected={isConnected}
            hasData={true}
            error={null}
        >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Team Details Screen (заглушка)</Text>
                <TouchableOpacity
                    style={{ marginTop: 24, backgroundColor: '#E94057', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 24 }}
                    onPress={() => navigation.navigate( 'TeamPastMatches', { teamId, teamName } )}
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Смотреть прошедшие матчи</Text>
                </TouchableOpacity>
            </View>
        </ScreenWrapper>
    );
};

export default TeamDetailsScreen; 