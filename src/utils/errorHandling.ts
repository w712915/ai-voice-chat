import { APIError } from '../types/errors';
import { isOpenAIError } from './typeGuards';
import { logger } from './logger';

export function handleAPIError(error: unknown): Error {
  logger.error('API Error:', error);

  if (isOpenAIError(error)) {
    return handleOpenAIError(error);
  }
  
  return new Error('通信エラーが発生しました。インターネット接続を確認してください。');
}

function handleOpenAIError(error: APIError): Error {
  switch (error.status) {
    case 429:
      return new Error('申し訳ありませんが、現在サービスが混み合っています。しばらく待ってから再度お試しください。');
    case 401:
      return new Error('APIの認証に失敗しました。設定を確認してください。');
    case 500:
      return new Error('サーバーエラーが発生しました。しばらく待ってから再度お試しください。');
    default:
      return new Error('予期せぬエラーが発生しました。もう一度お試しください。');
  }
}