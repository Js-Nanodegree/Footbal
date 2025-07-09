import React from 'react';
import { ScrollView, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

export const CompetitionsScreen = () =>
{
  const { t } = useTranslation();
  return (
      <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>{t( 'competition.listTitle' )}</Text>
 
    </ScrollView>
  );
};

export default CompetitionsScreen;
