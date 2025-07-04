import { colors } from '../theme/colors';

export type MatchCardVariant = 'gradient' | 'white' | 'purple';
export type MatchCardElement =
    | 'text'
    | 'score'
    | 'badgeBg'
    | 'badgeText'
    | 'label'
    | 'stadium'
    | 'badgeTextRound';

export type MatchCardColorMap = Record<MatchCardVariant, Record<MatchCardElement, string>>;

export const matchCardColorMap: MatchCardColorMap = {
    gradient: {
        text: colors.white,
        score: colors.white,
        badgeBg: colors.white, // белый бейдж на градиенте
        badgeText: colors.primary, // розовый текст бейджа
        label: colors.white,
        stadium: colors.white,
        badgeTextRound: colors.white,
    },
    purple: {
        text: colors.white,
        score: colors.white,
        badgeBg: colors.white, // белый бейдж на фиолетовом
        badgeText: colors.secondary, // фиолетовый текст бейджа
        label: colors.white,
        stadium: colors.white,
        badgeTextRound: colors.white,
    },
    white: {
        text: colors.text,
        score: colors.text,
        badgeBg: colors.primary, // розовый бейдж на белом
        badgeText: colors.white, // белый текст бейджа
        label: colors.textSecondary,
        stadium: colors.textSecondary,
        badgeTextRound: colors.white,
    },
};
