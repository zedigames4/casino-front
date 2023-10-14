import React, { useEffect, useState } from 'react';
import { useFetcher } from '@/utils/fetcher';
import endpoints from '@/utils/constants/endpoints';
import { formatValue, notationsInterface } from '@/utils/app';

const IncomeThisMonth = () => {
  const { data: fetchingResponse } = useFetcher(`${endpoints.INCOME_EXPENSES}`);
  const [income, setIncome] = useState(0);
  const today = new Date();
  useEffect(() => {
    if (fetchingResponse) {
      const {
        data: { totalIncome },
      } = fetchingResponse;
      setIncome(totalIncome);
    }
  }, [fetchingResponse]);
  return (
    <div
      id="balanceInfo"
      className="flex self-center w-full flex-col justify-evenly"
    >
      <div>
        <h3 className="font-sans text-3xl">Your Income</h3>
        <p className="font-sans text-sm text-white/30">
          {today?.toDateString()}
        </p>
      </div>
      <div>
        <h3 className="font-sans text-white/30">this Month</h3>
        <p className="font-sans text-3xl">
          {formatValue(income || 0, notationsInterface.standard, 7)}
        </p>
      </div>
    </div>
  );
};

export default IncomeThisMonth;
