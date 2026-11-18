import { useEffect, useState } from 'react';
import SDKManager from '../../../sdk/SDKManager';

export const useNVGetLinkInfo = (options?: { logOnly?: boolean }) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = SDKManager.getLinkInfo(
      payload => {
        if (options?.logOnly) {
          console.log('[SDK getLinkInfo]', payload);
          return;
        }
        setData({
          eventId: Date.now(),
          payload,
        });
      },
      { replayLast: true, consumeLast: true },
    );

    return () => unsubscribe();
  }, [options?.logOnly]);

  return data;
};
