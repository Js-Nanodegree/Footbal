import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import BackIcon from '../icons/BackIcon';
import { colors } from '../theme/colors';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  style?: ViewStyle;
}

const Header: React.FC<HeaderProps> = ({ title, onBack, style }) => (
  <View style={[styles.root, style]}>
    {onBack && (
      <TouchableOpacity onPress={onBack} style={styles.backBtn} accessibilityLabel="Назад">
        <BackIcon color={colors.text} width={28} height={28} />
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
    // paddingHorizontal: 16,
    // backgroundColor: colors.background || '#fff',
    minHeight: 56,
  },
  backBtn: {
    // marginRight: 8,
    flexDirection: 'row',
    padding: 4,
    borderRadius: 16,
  },
  title: {
    fontFamily: 'Oswald',
    fontWeight: '600',
    fontSize: 24,
    marginLeft: 8,
    color: colors.text,
    flex: 1,
    textAlign: 'left',
  },
});

export default Header; 