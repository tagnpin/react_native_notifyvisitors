type QALinkPage = 'about-us' | 'contact-us';

const toSafeJSON = (value: any): string => {
  const seen = new WeakSet<object>();
  return JSON.stringify(value, (_key, currentValue) => {
    if (currentValue && typeof currentValue === 'object') {
      if (seen.has(currentValue)) return '[Circular]';
      seen.add(currentValue);
    }
    if (typeof currentValue === 'function') return '[Function]';
    if (typeof currentValue === 'symbol') return currentValue.toString();
    if (typeof currentValue === 'bigint') return currentValue.toString();
    return currentValue;
  });
};

const toObjectPayload = (payload: any): Record<string, any> | null => {
  if (!payload) return null;
  if (typeof payload === 'object') return payload;
  if (typeof payload !== 'string') return null;

  const trimmed = payload.trim();
  if (!trimmed) return null;

  try {
    const parsed = JSON.parse(trimmed);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
};

const resolveQALinkPage = (linkInfo: any): QALinkPage | null => {
  const payload = toObjectPayload(linkInfo);
  console.log('resolveQALinkPage payload = ', payload);
  if (!payload) return null;
  console.log('resolveQALinkPage payload found');
  const params = payload.parameters ?? {};
  const rawTarget =
    payload.ViewControllerToLoad ??
    payload.notifyvisitors_cta?.actionURL ??
    payload.actionURL ??
    params.ViewControllerToLoad ??
    params.notifyvisitors_cta?.actionURL ??
    params.actionURL ??
    '';
  console.log('resolveQALinkPage rawTarget = ', rawTarget);
  const target = String(rawTarget).toLowerCase();
  if (!target) return null;
  if (target.includes('about') || target.includes('about-us'))
    return 'about-us';
  if (target.includes('contact') || target.includes('contact-us'))
    return 'contact-us';
  return null;
};

export { resolveQALinkPage, toSafeJSON };
