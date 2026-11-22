// Every AI failure reaches members as one plain sentence: no codes, no "quota", no "rate limit".
const FALLBACK = "AI couldn't help this time. Your draft is unchanged.";
const BUSY = 'AI is busy for a moment. Please try again in a few seconds.';

export const formatResetTime = (iso: string, locale?: string, timeZone?: string) =>
  new Date(iso).toLocaleTimeString(locale, { hour: 'numeric', minute: '2-digit', timeZone }).toLowerCase();

export const aiErrorMessage = (error: unknown, locale?: string, timeZone?: string): string => {
  const first = (error as any)?.graphQLErrors?.[0];
  const code = first?.extensions?.code;
  const resetsAt = first?.extensions?.resetsAt;
  const time = resetsAt ? formatResetTime(resetsAt, locale, timeZone) : 'tomorrow';
  switch (code) {
    case 'AI_MEMBER_LIMIT':
      return `You've used today's AI help. It's back at ${time}.`;
    case 'AI_DAILY_LIMIT':
      return `AI help is resting for now. Your draft is safe — try again after ${time}.`;
    case 'AI_BUSY':
    case 'TOO_MANY_REQUESTS':
      return BUSY;
    case 'AI_UNAVAILABLE':
      return 'AI writing help is switched off right now. Your draft is unchanged.';
    case 'BAD_REQUEST':
      // Server copy for input problems ("Please add some text first.") is already plain.
      return first?.message || FALLBACK;
    default:
      return FALLBACK;
  }
};
