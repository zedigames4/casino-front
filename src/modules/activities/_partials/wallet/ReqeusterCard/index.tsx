import React from 'react';
import { UserProfileInterface } from '@/interfaces/profile.interface';
import { RequesterInterface } from '@/interfaces/requester.interface';
import { WithdrawRequestInterface } from '@/interfaces/withdraw_request.interface';
import { StatusEnum } from '@/enum/withdraw_request_status.enum';

const RequesterCard1 = ({
  withdrawRequest,
}: {
  withdrawRequest?: WithdrawRequestInterface;
}) => {
  return (
    <div className="flex flex-col gap-2 w-full bg-white/20 rounded-2xl px-3 py-2">
      <div className="flex gap-2 justify-between w-full items-center">
        <span className="material-icons text-5xl p-2 rounded-2xl bg-white/60">
          person
        </span>
        <div className="flex flex-col gap-2">
          <p className="font-sans">{withdrawRequest?.requester?.firstName}</p>
          {/* personal account number*/}
          <p className="font-sans text-white/30">
            {withdrawRequest?.receiverPhoneNumber}
          </p>
        </div>
        <div>
          <span className="material-icons bg-brand-blue-light rounded-full p-2">
            {withdrawRequest?.status === StatusEnum.APPROVED
              ? 'done'
              : 'pending'}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          {withdrawRequest?.status}
        </span>
        <span className="items-center px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
          {withdrawRequest?.amount}
          <span className="ml-2 text-gray-600">
            {withdrawRequest?.currency}
          </span>
        </span>
      </div>
    </div>
  );
};
RequesterCard1.defaultProps = {
  withdrawRequest: undefined,
};
export default RequesterCard1;
