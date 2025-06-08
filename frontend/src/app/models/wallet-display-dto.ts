import { Currency } from "./currency";

export interface WalletDTO {
    id: number;
    name: string;
    balance: number; 
    currency: Currency; 
    currencyId?: number;
    createdAt: string;
}
