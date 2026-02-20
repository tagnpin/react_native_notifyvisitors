// src/shared/components/icons/AnalyticsIcon.tsx
import React from 'react';
import Svg, { Rect } from 'react-native-svg';

type Props = {
  size?: number;
  color?: string;
};

const AnalyticsIcon: React.FC<Props> = ({ size = 20, color = '#666' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Rect x="3" y="10" width="4" height="11" fill={color} />
    <Rect x="10" y="6" width="4" height="15" fill={color} />
    <Rect x="17" y="3" width="4" height="18" fill={color} />
  </Svg>
);

export default AnalyticsIcon;
