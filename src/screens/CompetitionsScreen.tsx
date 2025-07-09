import React from 'react';
import { ScrollView, Text } from 'react-native';

export const CompetitionsScreen = () =>
{

  return (
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>Список турниров</Text>
 
    </ScrollView>
  );
};

export default CompetitionsScreen;
