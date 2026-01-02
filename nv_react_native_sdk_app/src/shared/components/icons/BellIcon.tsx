// src/shared/components/icons/BellIcon.tsx
import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const BellIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 24,
  color = '#000',
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 24c1.104 0 2-.897 2-2H10c0 1.103.896 2 2 2zm6.364-6V11c0-3.07-1.63-5.64-4.364-6.32V4a2 2 0 1 0-4 0v.68C7.267 5.36 5.636 7.93 5.636 11v7l-1.636 1v1h18v-1l-1.636-1z"
      fill={color}
    />
  </Svg>
);

export default BellIcon;
