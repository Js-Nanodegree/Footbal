import React from 'react';
import { View } from 'react-native';

export default function Spacer( { size = 20 }: { size?: number } )
{
    return <View style={{ height: size }} />;
} 