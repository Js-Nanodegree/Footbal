import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import BackIcon from '../icons/BackIcon';
import { colors } from '../theme/colors';
import Typography from '../typography/Typography';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  style?: ViewStyle;
}

const Header: React.FC<HeaderProps> = ({ title, onBack, style }: HeaderProps) => (
  <View style={[styles.root, style]}>
    {onBack && (
      <TouchableOpacity onPress={onBack} style={styles.backBtn} accessibilityLabel="Назад">
        <BackIcon color={colors.text} width={28} height={28} />
        <Typography
          variant="h1"
          weight="bold"
          font="Oswald"
          style={[ styles.title, Platform.OS === 'android' && { fontSize: 20 } ]}
        >
          {title}
        </Typography>
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
