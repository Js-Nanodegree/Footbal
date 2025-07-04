import { colors } from '../theme/colors';

export const inputColorMap = {
  default: {
        background: colors.card,
        text: colors.text,
        placeholder: colors.textSecondary,
        border: colors.border,
  },
  focused: {
      background: colors.card,
      text: colors.text,
      placeholder: colors.textSecondary,
      border: colors.primary,
  },
  error: {
        background: colors.card,
        text: colors.text,
        placeholder: colors.textSecondary,
        border: colors.error,
    },
    success: {
        background: colors.card,
        text: colors.text,
        placeholder: colors.textSecondary,
        border: colors.success,
    },
    info: {
        background: colors.card,
        text: colors.text,
        placeholder: colors.textSecondary,
        border: colors.info,
  },
  disabled: {
      background: colors.skeleton,
      text: colors.textSecondary,
      placeholder: colors.textSecondary,
      border: colors.skeleton,
  },
}; 