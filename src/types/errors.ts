export interface APIError {
  status: number;
  error?: {
    message: string;
    type: string;
    code: string;
  };
}