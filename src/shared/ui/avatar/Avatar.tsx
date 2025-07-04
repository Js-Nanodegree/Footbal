import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { AvatarProps, AvatarSize, AvatarShape, AvatarColorVariant } from './types';
import { avatarColorMap } from './colorMap';
import Typography from '../typography/Typography';

const sizeMap: Record<AvatarSize, number> = {
    small: 32,
    medium: 48,
    large: 72,
};

const fontSizeMap: Record<AvatarSize, number> = {
    small: 14,
    medium: 20,
    large: 32,
};

const Avatar: React.FC<AvatarProps> = ( {
    src,
    initials,
    size = 'medium',
    shape = 'circle',
    border = false,
    colorVariant = 'default',
    status,
    style,
} ) =>
{
    const colors = avatarColorMap[ colorVariant ];
    const dimension = sizeMap[ size ];
    const fontSize = fontSizeMap[ size ];
    const borderRadius = shape === 'circle' ? dimension / 2 : 8;

    return (
        <View style={[ { width: dimension, height: dimension, borderRadius, backgroundColor: colors.background, borderWidth: border ? 2 : 0, borderColor: colors.border, alignItems: 'center', justifyContent: 'center', position: 'relative' }, style ]}>
            {src ? (
                <Image source={{ uri: src }} style={{ width: dimension, height: dimension, borderRadius }} />
            ) : (
                <Typography variant="body" weight="bold" style={{ color: colors.text, fontSize }}>{initials || ''}</Typography>
            )}
            {status && (
                <View style={[ styles.statusDot, { backgroundColor: avatarColorMap.status[ status ], borderColor: colors.border, width: dimension / 3, height: dimension / 3, borderRadius: dimension / 6, bottom: 2, right: 2 } ]} />
            )}
        </View>
    );
};

const styles = StyleSheet.create( {
    statusDot: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderWidth: 2,
    },
} );

export default Avatar; 