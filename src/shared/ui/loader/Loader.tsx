import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { LoaderProps, LoaderVariant, LoaderSize } from './types';
import { loaderColorMap } from './colorMap';

const sizeMap: Record<LoaderSize, number> = {
    small: 20,
    medium: 32,
    large: 48,
};

const Loader: React.FC<LoaderProps> = ( {
    variant = 'primary',
    size = 'medium',
    inline = false,
    background = false,
    style,
} ) =>
{
    const color = loaderColorMap[ variant ];
    const bgColor = background ? loaderColorMap.background : 'transparent';
    const dimension = sizeMap[ size ];

    return (
        <View
            testID="loader"
            style={[
                styles.container,
                inline && styles.inline,
                { backgroundColor: bgColor, width: dimension * 2, height: dimension * 2, borderRadius: dimension },
                style,
            ]}
        >
            <ActivityIndicator color={color} size={dimension} />
        </View>
    );
};

const styles = StyleSheet.create( {
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    inline: {
        flexDirection: 'row',
        display: 'flex',
    },
} );

export default Loader; 