const baseUrl = 'http://localhost:8080/api/'; 
const baseUrl2 = 'http://localhost:8080/'; 

export const Endpoints = {
    login: `${baseUrl}auth/login`,
    allTransactions: `${baseUrl}transactions`,
    transactionsByWallet: (walletId: string) => `${baseUrl}transactions/${walletId}`,
    register: `${baseUrl}auth/register`,
    getAllUsers: `${baseUrl}admin/users`,
    checkStatus: `${baseUrl2}check-auth`,
    logout: `${baseUrl2}logout`,
    deleteUser: (userId: string) => `${baseUrl}admin/users/${userId}`,
    addUsers: `${baseUrl}admin/users`,
    getAllCurrencies: `${baseUrl}currencies/`,
    getWalletTransactions: (walletId: string) => `${baseUrl}transactions/wallet/${walletId}`,
    addTransaction: `${baseUrl}transactions/add`,
    myWallets: `${baseUrl}wallets/my`,
    addWallet: `${baseUrl}wallets/add`,
    myTransactions: `${baseUrl}transactions/my`,
}
export type EndpointKeys = keyof typeof Endpoints; 
export type lambda = (param: any) => string; 