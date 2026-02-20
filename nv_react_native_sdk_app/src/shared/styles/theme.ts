// src/shared/styles/theme.ts

import { Layout } from '../utils/Layout';

const scale = (size: number) => (Layout.isTablet ? size * 1.2 : size);

export const theme = {
  colors: {
    background: '#FFFFFF',
    surface: '#F8F9FA',
    border: '#E0E0E0',

    primary: '#0067A5',
    secondary: '#6c757d',
    primaryText: '#FFFFFF',

    textPrimary: '#111827',
    textSecondary: '#6B7280',

    success: '#16A34A',
    error: '#DC2626',
    warning: '#D97706',
    danger: '#dc3545',

    card: '#FFFFFF',
    backdrop: 'rgba(0,0,0,0.45)',
  },

  // radius: {
  //   sm: 6,
  //   md: 10,
  //   lg: 14,
  // },

  radius: {
    sm: scale(6),
    md: scale(10),
    lg: scale(14),
  },

  spacing: {
    xs: scale(4),
    sm: scale(8),
    md: scale(12),
    lg: scale(16),
    xl: scale(24),
  },
  text: {
    title: {
      fontSize: scale(18),
      fontWeight: '600' as const,
    },
    body: {
      fontSize: scale(14),
    },
    caption: {
      fontSize: scale(12),
    },
  },
};
