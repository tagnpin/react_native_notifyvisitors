import { useEffect, useState } from 'react';
import SDKManager from '../../../sdk/SDKManager';

export const useNVknownUserInfo = (options?: { logOnly?: boolean }) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = SDKManager.knownUserIdentified(payload => {
      if (options?.logOnly) {
        console.log('[SDK known user identified]', payload);
        return;
      }
      setData({
        eventId: Date.now(),
        payload,
      });
    });

    return () => unsubscribe();
  }, []);

  return data;
};
