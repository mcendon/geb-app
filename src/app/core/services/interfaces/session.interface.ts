export interface Session {
  id: number;
  userId: number;
  token: string;
  expiresAt: Date;
}
