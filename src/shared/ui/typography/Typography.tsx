import React from 'react';
import { Text, TextProps, StyleSheet, View, ViewStyle, DimensionValue } from 'react-native';
import { colors } from '../theme/colors';
import { typographyColorMap, TypographyMode } from './colorMap';

export type TypographyVariant = 'h1' | 'h2' | 'body' | 'caption' | 'number' | 'skeleton';
export type TypographyWeight = 'regular' | 'bold' | 'semibold';
export type TypographyFont = 'Inter' | 'Oswald';

interface TypographyProps extends TextProps
{
    variant?: TypographyVariant;
    weight?: TypographyWeight;
    font?: TypographyFont;
    color?: string;
    width?: number | `${ number }%`;
    height?: number;
    children?: React.ReactNode;
}

const fontMap: Record<TypographyFont, Record<TypographyWeight, string>> = {
    Inter: {
        regular: 'Inter-Regular',
        bold: 'Inter-Bold',
        semibold: 'Inter-SemiBold',
    },
    Oswald: {
        regular: 'Oswald-Regular',
        bold: 'Oswald-Bold',
        semibold: 'Oswald-SemiBold',
    },
};

const sizeMap: Record<Exclude<TypographyVariant, 'skeleton'>, number> = {
    h1: 28,
    h2: 22,
    body: 16,
    caption: 13,
    number: 32,
};

const Typography: React.FC<TypographyProps> = ( {
    variant = 'body',
    weight = 'regular',
    font = 'Inter',
    color,
    width,
    height,
    style,
    children,
    ...rest
} ) =>
{
    const mode: TypographyMode = 'light';
    const colorMapVariants = ['h1', 'h2', 'body', 'caption'] as const;
    const isColorMapVariant = colorMapVariants.includes(variant as any);
    const resolvedColor = color
        || (isColorMapVariant
            ? typographyColorMap[mode][font][variant as keyof typeof typographyColorMap[typeof mode][typeof font]]
            : (variant === 'number' ? colors.text : colors.textSecondary));
    if ( variant === 'skeleton' )
    {
        const skeletonStyle: ViewStyle = {
            backgroundColor: colors.skeleton,
            borderRadius: 4,
            width: typeof width === 'string' ? width : width || 120,
            height: height || 18,
            marginVertical: 2,
        };
        return <View style={[ skeletonStyle, style ]} {...rest} />;
    }
    return (
        <Text
            style={[
                {
                    fontFamily: fontMap[ font ][ weight ],
                    fontSize: sizeMap[ variant as Exclude<TypographyVariant, 'skeleton'> ],
                    color: resolvedColor,
                },
                style,
            ]}
            {...rest}
        >
            {children}
        </Text>
    );
};

export default Typography; 