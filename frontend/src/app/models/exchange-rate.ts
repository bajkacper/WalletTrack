import { Currency } from "./currency";

export interface ExchangeRate {
    id: number;
    currency: Currency;
    rate: number; 
    fetchedAt: string;
}