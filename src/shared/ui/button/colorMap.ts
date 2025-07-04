import { colors } from '../theme/colors';

export const buttonColorMap = {
    light: {
        primary: {
            background: colors.primary,
            text: '#fff',
            border: colors.primary,
            shadow: colors.primary,
            indicator: '#fff',
        },
        secondary: {
            background: colors.card,
            text: colors.primary,
            border: colors.primary,
            shadow: colors.primary,
            indicator: colors.primary,
        },
        disabled: {
            background: colors.skeleton,
            text: colors.finished,
            border: colors.skeleton,
            shadow: 'transparent',
            indicator: colors.finished,
        },
    },
    dark: {
        primary: {
            background: colors.primary,
            text: '#fff',
            border: colors.primary,
            shadow: colors.primary,
            indicator: '#fff',
        },
        secondary: {
            background: '#222',
            text: colors.primary,
            border: colors.primary,
            shadow: colors.primary,
            indicator: colors.primary,
        },
        disabled: {
            background: '#333',
            text: colors.textSecondary,
            border: '#333',
            shadow: 'transparent',
            indicator: colors.textSecondary,
        },
    },
}; 