// src/shared/components/icons/InAppNudgesIcon.tsx
import React from 'react';
import Svg, { Rect } from 'react-native-svg';

type Props = {
  size?: number;
  color?: string;
};

const InAppNudgesIcon: React.FC<Props> = ({ size = 20, color = '#666' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Rect
      x="3"
      y="4"
      width="18"
      height="16"
      rx="2"
      stroke={color}
      strokeWidth="2"
      fill="none"
    />
    <Rect x="6" y="7" width="12" height="3" fill={color} />
    <Rect x="6" y="12" width="8" height="3" fill={color} />
  </Svg>
);

export default InAppNudgesIcon;
