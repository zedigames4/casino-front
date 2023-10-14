import Link from 'next/link';
import React from 'react';
import { WalletInterface } from '@/interfaces/wallet.interface';
import { formatValue, notationsInterface } from '@/utils/app';

const TotalEarning = ({ wallet }: { wallet?: WalletInterface }) => {
  return (
    <div className="flex flex-col items-center bg-white/10 py-5 mx-5 my-10 rounded-2xl justify-between h-[200px]">
      <h4 className="font-sans">Your total earnings</h4>
      <p className="font-sans text-3xl text-[#4E00CE] font-bold whitespace-nowrap">
        {formatValue(wallet?.income || 0, notationsInterface.standard, 7)}
      </p>
      <span className="font-sans text-white/50">From start</span>
      <Link href="/wallet/#request_withdraw_div">
        <button
          type="button"
          className="px-5 py-2 rounded-2xl bg-black/30 font-sans"
        >
          Withdraw
        </button>
      </Link>
    </div>
  );
};
TotalEarning.defaultProps = {
  wallet: undefined,
};
export default TotalEarning;
