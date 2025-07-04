import { colors } from '../theme/colors';

export type TypographyMode = 'light' | 'dark';
export type TypographyFont = 'Inter' | 'Oswald';
export type TypographyVariant = 'h1' | 'h2' | 'body' | 'caption';

export const typographyColorMap: Record<TypographyMode, Record<TypographyFont, Record<TypographyVariant, string>>> = {
    light: {
        Inter: {
            h1: colors.text,
            h2: colors.text,
            body: colors.text,
            caption: colors.textSecondary,
        },
        Oswald: {
            h1: colors.text,
            h2: colors.text,
            body: colors.text,
            caption: colors.textSecondary,
        },
    },
    dark: {
        Inter: {
            h1: colors.white,
            h2: colors.white,
            body: colors.white,
            caption: colors.grayMedium,
        },
        Oswald: {
            h1: colors.white,
            h2: colors.white,
            body: colors.white,
            caption: colors.grayMedium,
        },
    },
}; 