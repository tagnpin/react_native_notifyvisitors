import React, { useCallback } from 'react';
import ActionButton from './ActionButton';
import BellIcon from './icons/BellIcon';
import { theme } from '../styles/theme';
import SDKManager from '../../sdk/SDKManager';
import { useNotificationBadge } from '../store/NotificationBadgeContext';

const NavIconBellButton = () => {
  const { unreadCount, clearUnreadCount } = useNotificationBadge();

  const nvOpenNotificationCenter = useCallback(() => {
    SDKManager.showStdNotificationCenter({});
    clearUnreadCount();
  }, [clearUnreadCount]);

  return (
    <ActionButton
      icon={<BellIcon size={24} color={theme.colors.primaryText} />}
      iconPosition="right"
      badgeCount={unreadCount}
      layout="iconOnly"
      onPress={nvOpenNotificationCenter}
    />
  );
};

export default React.memo(NavIconBellButton);
