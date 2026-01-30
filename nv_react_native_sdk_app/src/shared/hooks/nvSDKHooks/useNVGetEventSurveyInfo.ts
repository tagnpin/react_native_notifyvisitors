import { useEffect, useState } from 'react';
import SDKManager from '../../../sdk/SDKManager';

export const useNVGetEventSurveyInfo = (options?: {
  enabled?: boolean;
  logOnly?: boolean;
}) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (options?.enabled === false) return;

    const unsubscribe = SDKManager.getEventSurveyInfo(payload => {
      if (options?.logOnly) {
        console.log('[EventSurvey]', payload);
        return;
      }
      setData(payload);
    });

    return () => unsubscribe();
  }, [options?.enabled, options?.logOnly]);

  return data;
};
