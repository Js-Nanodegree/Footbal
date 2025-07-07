import React from 'react';
import { View, Text, Image } from 'react-native';
import Avatar from 'src/shared/ui/avatar/Avatar';

interface HeaderProps
{
    avatarUrl?: string;
    userInitial?: string;
}

const Header: React.FC<HeaderProps> = ( { avatarUrl, userInitial = 'A' } ) =>
{
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', letterSpacing: 0.5 }}>LiveSc</Text>
                {/* Можно заменить emoji на локальный asset */}
                <Text style={{ fontSize: 24, marginHorizontal: 2 }}>⚽️</Text>
                <Text style={{ fontSize: 24, fontWeight: 'bold', letterSpacing: 0.5 }}>re</Text>
            </View>
            <Avatar src={avatarUrl} initials={userInitial} size="medium" />
        </View>
    );
};

export default React.memo( Header ); 