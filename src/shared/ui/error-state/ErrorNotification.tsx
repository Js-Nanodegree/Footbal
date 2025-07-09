import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp, TextStyle } from 'react-native';
import Typography from '../typography/Typography';
import { colors } from '../theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pressable } from 'react-native-gesture-handler';

interface ErrorNotificationProps
{
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
  timeStyle?: StyleProp<TextStyle>;
  primaryButtonStyle?: StyleProp<ViewStyle>;
  secondaryButtonStyle?: StyleProp<ViewStyle>;
  primaryButtonTextStyle?: StyleProp<TextStyle>;
  secondaryButtonTextStyle?: StyleProp<TextStyle>;
  title?: string;
  description?: string;
  errorType?: '400' | '403' | '404' | '429' | 'system';
  time?: string;
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
}

const errorConfig = {
  '400': { color: colors.warning, title: 'Некорректный запрос' },
  '403': { color: colors.error, title: 'Доступ запрещён' },
  '404': { color: colors.textSecondary, title: 'Не найдено' },
  '429': { color: colors.info, title: 'Слишком много запросов' },
  system: { color: colors.text, title: 'Ошибка' },
};

const ErrorNotification: React.FC<ErrorNotificationProps> = ( {
  title,
  description,
  errorType = 'system',
  time,
  primaryActionLabel,
  onPrimaryAction,
  secondaryActionLabel,
  onSecondaryAction,
}) => {
  const config = errorConfig[errorType];
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {
          marginTop: insets.top,
          backgroundColor: colors.grayLight,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: colors.grayMedium,
        },
      ]}
    >
      <View>
        <View
          style={[
            { paddingHorizontal: 20, paddingTop: 15 },
            primaryActionLabel || secondaryActionLabel
              ? { paddingBottom: 4 }
              : {
                  paddingBottom: 20,
                },
          ]}
        >
          <View style={styles.headerRow}>
            <Typography variant="body" numberOfLines={1} weight="semibold" style={styles.title}>
              {title || config.title}
            </Typography>
            {time && (
              <Typography variant="body" weight="semibold" numberOfLines={1} style={styles.time}>
                {time}
              </Typography>
            )}
          </View>
          {description ? (
            <Typography variant="caption" numberOfLines={2} style={styles.description}>
              {description}
            </Typography>
          ) : null}
        </View>
        {(primaryActionLabel || secondaryActionLabel) && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderWidth: 1,
              borderColor: colors.grayLight,
              flex: 1,
            }}
          >
            {primaryActionLabel && onPrimaryAction ? (
              <Pressable style={styles.primaryButton} onPress={onPrimaryAction}>
                <Typography variant="body" weight="bold" style={styles.primaryButtonText}>
                  {primaryActionLabel}
                </Typography>
              </Pressable>
            ) : (
              <View style={styles.secondaryButton} />
            )}
            {secondaryActionLabel && onSecondaryAction ? (
              <Pressable style={styles.secondaryButton} onPress={onSecondaryAction}>
                <Typography variant="body" weight="bold" style={styles.secondaryButtonText}>
                  {secondaryActionLabel}
                </Typography>
              </Pressable>
            ) : (
              <View style={styles.secondaryButton} />
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderRadius: 28, // убираем скругление
    overflow: 'hidden',
    margin: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    minWidth: 320,
    borderWidth: 1,
    borderColor: colors.grayLight,
    backgroundColor: colors.grayLight,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(191, 205, 251, 0.12)',
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { color: colors.grayDark, fontWeight: '500' },
  time: { color: colors.grayDark, marginLeft: 8, fontWeight: '500' },
  description: { color: colors.grayDark, marginTop: 4, fontWeight: '400' },
  actionsRow: { flexDirection: 'row', marginTop: 16 },
  primaryButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginRight: 8,
  },
  primaryButtonText: { color: colors.primary },
  secondaryButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  secondaryButtonText: { color: colors.grayDark },
});

export default ErrorNotification;
