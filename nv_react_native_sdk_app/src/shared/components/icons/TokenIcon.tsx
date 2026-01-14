// src/shared/components/icons/TokenIcon.tsx
import React from 'react';
import Svg, { Circle } from 'react-native-svg';

const TokenIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 24,
  color = '#000',
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} />
  </Svg>
);

export default TokenIcon;
