// src/shared/components/icons/InAppMessageIcon.tsx
import React from 'react';
import Svg, { Rect } from 'react-native-svg';

type Props = {
  size?: number;
  color?: string;
};

const InAppMessageIcon: React.FC<Props> = ({ size = 20, color = '#666' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Rect
      x="3"
      y="5"
      width="18"
      height="14"
      rx="2"
      stroke={color}
      strokeWidth="2"
      fill="none"
    />
    <Rect x="7" y="9" width="10" height="2" fill={color} />
    <Rect x="7" y="13" width="6" height="2" fill={color} />
  </Svg>
);

export default InAppMessageIcon;
