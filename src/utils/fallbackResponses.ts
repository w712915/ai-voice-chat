const FALLBACK_RESPONSES = [
  'すみません、現在システムが混み合っているため、すぐにお答えできません。',
  'ご不便をおかけして申し訳ありません。しばらく経ってから再度お試しください。',
  'システムメンテナンス中です。後ほど再度お試しください。',
  'ただいま一時的にサービスを利用できません。',
  'システムの応答に問題が発生しています。しばらくお待ちください。'
];

export function getFallbackResponse(userMessage: string): string {
  const randomIndex = Math.floor(Math.random() * FALLBACK_RESPONSES.length);
  return FALLBACK_RESPONSES[randomIndex];
}