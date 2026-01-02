// src/shared/styles/theme.ts

export const theme = {
  colors: {
    background: '#FFFFFF',
    surface: '#F8F9FA',
    border: '#E0E0E0',

    primary: '#2563EB',
    secondary: '#6c757d',
    primaryText: '#FFFFFF',

    textPrimary: '#111827',
    textSecondary: '#6B7280',

    success: '#16A34A',
    error: '#DC2626',
    warning: '#D97706',
    danger: '#dc3545',

    card: '#FFFFFF',
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },

  radius: {
    sm: 6,
    md: 10,
    lg: 14,
  },

  text: {
    title: {
      fontSize: 18,
      fontWeight: '600' as const,
    },
    body: {
      fontSize: 14,
    },
    caption: {
      fontSize: 12,
      color: '#6B7280',
    },
  },
};
