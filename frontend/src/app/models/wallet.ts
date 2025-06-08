import { Currency } from "./currency";
import { Transaction } from "./transaction";
import { User } from "./user";

export interface Wallet {
  id: number;
  user: User;
  currency: Currency;
  balance: number; 
  createdAt: string;
  transactions: Transaction[];
}