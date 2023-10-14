export interface TransactionInterface {
  action: string;
  amount: number;
  currency: string;
  mode: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  _id: string;
}
