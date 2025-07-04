import { colors } from '../theme/colors';

export const badgeColorMap = {
    primary: {
        solid: {
            background: colors.primary,
            text: colors.white,
            border: colors.primary,
        },
        outline: {
            background: colors.transparent,
            text: colors.primary,
            border: colors.primary,
        },
    },
    secondary: {
        solid: {
            background: colors.secondary,
            text: colors.white,
            border: colors.secondary,
        },
        outline: {
            background: colors.transparent,
            text: colors.secondary,
            border: colors.secondary,
        },
    },
    success: {
        solid: {
            background: colors.success,
            text: colors.white,
            border: colors.success,
        },
        outline: {
            background: colors.transparent,
            text: colors.success,
            border: colors.success,
        },
    },
    error: {
        solid: {
            background: colors.error,
            text: colors.white,
            border: colors.error,
        },
        outline: {
            background: colors.transparent,
            text: colors.error,
            border: colors.error,
        },
    },
    warning: {
        solid: {
            background: colors.warning,
            text: colors.text,
            border: colors.warning,
        },
        outline: {
            background: colors.transparent,
            text: colors.warning,
            border: colors.warning,
        },
    },
    info: {
        solid: {
            background: colors.info,
            text: colors.white,
            border: colors.info,
        },
        outline: {
            background: colors.transparent,
            text: colors.info,
            border: colors.info,
        },
    },
    disabled: {
        solid: {
            background: colors.skeleton,
            text: colors.textSecondary,
            border: colors.skeleton,
        },
        outline: {
            background: colors.transparent,
            text: colors.textSecondary,
            border: colors.skeleton,
        },
    },
}; 