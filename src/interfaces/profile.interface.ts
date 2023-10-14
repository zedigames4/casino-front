export interface UserProfileInterface {
  _id: string;
  firstName: string;
  role: string;
  lastName: string;
  verified: boolean;
  phoneNumber: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  avatar?: string;
  balance?: number;
  income?: number;
  expenses: number;
  referralCode: string;
}
