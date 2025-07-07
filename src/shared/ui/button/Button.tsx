// Button: универсальная кнопка, поддерживает все варианты, цвета из colorMap (основан на theme/colors), тени из theme/shadows, Typography для текста, accessibility через пропсы. TODO: поддержка динамической темы.
import React from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator, View } from 'react-native';
import { ButtonProps } from './types';
import { buttonColorMap } from './colorMap';
import Typography from '../typography/Typography';
import { shadows } from '../theme/shadows';

const theme = 'light'; // TODO: заменить на динамическую тему при необходимости

const Button: React.FC<ButtonProps & { accessibilityLabel?: string; testID?: string }> = ( {
    title,
    onPress,
    variant = 'primary',
    disabled = false,
    loading = false,
    icon,
    style,
    accessibilityLabel,
    testID,
} ) =>
{
    const colors = buttonColorMap[ theme ][ variant ];
    const disabledColors = buttonColorMap[ theme ].disabled;
    const isDisabled = disabled || loading;
    const appliedColors = isDisabled ? disabledColors : colors;

    return (
        <TouchableOpacity
            style={[
                styles.button,
                shadows.button,
                {
                    backgroundColor: appliedColors.background,
                    borderColor: appliedColors.border,
                },
                variant === 'secondary' && { borderWidth: 2 },
                isDisabled && { shadowColor: appliedColors.shadow },
                style,
            ]}
            onPress={onPress}
            activeOpacity={0.85}
            disabled={isDisabled}
            accessibilityLabel={accessibilityLabel}
            testID={testID}
        >
            {loading ? (
                <ActivityIndicator color={appliedColors.indicator} />
            ) : (
                <View style={styles.contentRow}>
                    {icon && <View style={styles.icon}>{icon}</View>}
                    <Typography
                        variant="body"
                        weight="bold"
                        font="Inter"
                        style={[
                            styles.title,
                            { color: appliedColors.text },
                        ]}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {title}
                    </Typography>
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create( {
    button: {
        minHeight: 48,
        borderRadius: 24,
        paddingHorizontal: 28,
        paddingVertical: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 0,
        marginHorizontal: 0,
        // тени теперь только через shadows.button
    },
    contentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginRight: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.2,
        lineHeight: 22,
        textAlign: 'center',
    },
} );

export default Button; 