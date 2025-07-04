import { colors } from '../theme/colors';

export const scoreBlockColorMap = {
    light: {
        default: {
            background: 'rgba(255,45,122,0.08)', // TODO: вынести в tokens, если потребуется
            text: colors.white,
        },
    },
    dark: {
        default: {
            background: 'rgba(255,45,122,0.16)', // TODO: вынести в tokens, если потребуется
            text: colors.white,
        },
    },
}; 