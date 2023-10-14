import { CurrencyEnum } from '@/enum/Currency.enum';
import { RequesterInterface } from '@/interfaces/requester.interface';

export interface WithdrawRequestInterface {
  _id: string;
  amount: number;
  currency: CurrencyEnum;
  requester: RequesterInterface;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  receiverPhoneNumber?: string;
}
