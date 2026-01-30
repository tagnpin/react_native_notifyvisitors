import { createContext, useContext, useEffect, useState } from 'react';
import SDKManager from '../../sdk/SDKManager';

type NotificationBadgeContextType = {
  unreadCount: number;
  refreshUnreadCount: () => Promise<void>;
  clearUnreadCount: () => void;
};

const NotificationBadgeContext =
  createContext<NotificationBadgeContextType | null>(null);

export const NotificationBadgeProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  const refreshUnreadCount = async () => {
    try {
      const data = await SDKManager.getNotificationCenterUnreadCount({});
      const json = JSON.parse(data as string);
      setUnreadCount(json.totalCount ?? 0);
    } catch {
      setUnreadCount(0);
    }
  };

  const clearUnreadCount = () => {
    setUnreadCount(0);
  };

  // Initial fetch
  useEffect(() => {
    refreshUnreadCount();
  }, []);

  return (
    <NotificationBadgeContext.Provider
      value={{
        unreadCount,
        refreshUnreadCount,
        clearUnreadCount,
      }}
    >
      {children}
    </NotificationBadgeContext.Provider>
  );
};

export const useNotificationBadge = () => {
  const ctx = useContext(NotificationBadgeContext);
  if (!ctx) {
    throw new Error(
      'useNotificationBadge must be used inside NotificationBadgeProvider',
    );
  }
  return ctx;
};
