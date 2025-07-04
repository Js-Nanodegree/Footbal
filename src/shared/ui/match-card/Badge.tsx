import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { badgeColorMap } from './badgeColorMap';

interface BadgeProps {
    text: string;
    variant?: 'solid' | 'outline';
    style?: object;
}

const theme = 'light'; // TODO: заменить на динамическую тему при необходимости

const Badge: React.FC<BadgeProps> = ({ text, variant = 'solid', style }) => {
    const colors = badgeColorMap[theme][variant];
    return (
        <View
            style={[
                styles.badge,
                {
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    borderWidth: variant === 'outline' ? 1 : 0,
                },
                style,
            ]}
        >
            <Text style={[styles.badgeText, { color: colors.text }]}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create( {
    badge: {
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 2,
        alignSelf: 'flex-start',
        minHeight: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        fontWeight: 'bold',
        fontSize: 13,
        letterSpacing: 0.1,
    },
} );

export default Badge; 