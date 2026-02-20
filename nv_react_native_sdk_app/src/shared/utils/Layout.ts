// src/shared/utils/Layout.ts
import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Layout = {
  width,
  height,
  isTablet: Math.min(width, height) >= 600,
  isLandscape: width > height,
};
