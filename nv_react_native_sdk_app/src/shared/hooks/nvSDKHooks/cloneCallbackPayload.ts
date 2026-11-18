const cloneCallbackPayload = <T,>(payload: T): T => {
  if (payload === null || payload === undefined) {
    return payload;
  }

  if (typeof payload !== 'object') {
    return payload;
  }

  try {
    return JSON.parse(JSON.stringify(payload)) as T;
  } catch {
    if (Array.isArray(payload)) {
      return [...payload] as T;
    }
    return { ...(payload as Record<string, unknown>) } as T;
  }
};

export { cloneCallbackPayload };
