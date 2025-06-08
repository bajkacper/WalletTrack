export interface Transaction {
    id?: number;
    walletId?: number;
    amount?: any; 
    transactionType?: 'DEPOSIT' | 'WITHDRAWAL';
    transactionDate?: Date; 
}