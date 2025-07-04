import { colors } from '../theme/colors';

export const avatarColorMap = {
    default: {
        background: colors.grayLight,
        border: colors.white,
        text: colors.text,
        placeholder: colors.textSecondary,
    },
    primary: {
        background: colors.primary,
        border: colors.white,
        text: colors.white,
        placeholder: colors.white,
    },
    secondary: {
        background: colors.secondary,
        border: colors.white,
        text: colors.white,
        placeholder: colors.white,
    },
    gray: {
        background: colors.grayMedium,
        border: colors.white,
        text: colors.white,
        placeholder: colors.white,
    },
    status: {
        online: colors.success,
        offline: colors.grayMedium,
        busy: colors.error,
    },
}; 