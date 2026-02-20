// src/shared/components/icons/CopyIcon.tsx

import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { theme } from '../../styles/theme';

type Props = {
  size?: number;
  color?: string;
};

const CopyIcon: React.FC<Props> = ({
  size = 14,
  color = theme.colors.textSecondary,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v16h13a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 18H8V7h11v16z"
      fill={color}
    />
  </Svg>
);

export default CopyIcon;
