import { Wallet } from './wallet';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: number;
  wallets: Wallet[];
  enabled: boolean;
}