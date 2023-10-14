export interface WalletInterface {
  balance: number;
  balanceInCoin: number;
  expenses: number;
  income: number;
  user: {
    firstName: string;
    email: string;
  };
}
