import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BadgeProps, BadgeVariant, BadgeMode, BadgeSize } from './types';
import { badgeColorMap } from './colorMap';
import Typography from '../typography/Typography';

const sizeMap: Record<BadgeSize, { paddingHorizontal: number; paddingVertical: number; fontSize: number }> = {
    small: { paddingHorizontal: 8, paddingVertical: 2, fontSize: 12 },
    medium: { paddingHorizontal: 12, paddingVertical: 4, fontSize: 14 },
    large: { paddingHorizontal: 16, paddingVertical: 6, fontSize: 16 },
};

const Badge: React.FC<BadgeProps> = ( {
    children,
    variant = 'primary',
    mode = 'solid',
    size = 'medium',
    icon,
    disabled = false,
    style,
} ) =>
{
    const colors = badgeColorMap[ disabled ? 'disabled' : variant ][ mode ];
    const sizeStyle = sizeMap[ size ];

    return (
        <View
            style={[
                styles.badge,
                {
                    backgroundColor: colors.background,
                    borderColor: colors.border,
                    borderWidth: mode === 'outline' ? 1.5 : 0,
                    paddingHorizontal: sizeStyle.paddingHorizontal,
                    paddingVertical: sizeStyle.paddingVertical,
                    opacity: disabled ? 0.6 : 1,
                },
                style,
            ]}
        >
            {icon && <View style={styles.icon}>{icon}</View>}
            <Typography variant="caption" weight="bold" style={{ color: colors.text, fontSize: sizeStyle.fontSize }}>
                {children}
            </Typography>
        </View>
    );
};

const styles = StyleSheet.create( {
    badge: {
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        minHeight: 24,
        justifyContent: 'center',
    },
    icon: {
        marginRight: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
} );

export default Badge; 