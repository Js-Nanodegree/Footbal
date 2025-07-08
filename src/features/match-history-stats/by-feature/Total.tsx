import React from 'react';
import { View, StyleSheet } from 'react-native';
import Typography from '../../../shared/ui/typography/Typography';
import { colors } from '../../../shared/ui/theme/colors';

export interface TotalProps {
  generalInfo: { label: string; value: string }[];
}

// Общая информация о матче (турнир, тур, стадия, страна, дата, сезон, судьи)
export const Total: React.FC<TotalProps> = ({ generalInfo }) => {
  if (!generalInfo.length) return null;
  return (
    <View style={styles.container}>
      <View style={styles.infoBlock}>
        {generalInfo.map((info) => (
          <View key={info.label} style={styles.row}>
            <Typography
              variant="caption"
              style={styles.label}
            >
              {info.label}:
            </Typography>
            <Typography
              variant="caption"
              style={styles.value}
            >
              {info.value}
            </Typography>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    padding: 6,
    margin: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fafbfc',
  },
  header: {
    marginBottom: 8,
  },
  infoBlock: {
    padding: 4,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 1,
    paddingBottom: 4,
    marginBottom: 2,
    borderBottomColor: colors.grayLight,
  },
  label: {
    textAlign: 'left',
    color: colors.grayMedium,
    marginRight: 8,
  },
  value: {
    textAlign: 'right',
    flex: 1,
    color: colors.grayDark,
  },
});

export default Total; 