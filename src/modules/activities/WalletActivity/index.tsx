import React, { useEffect, useState } from 'react';
import LatestTransactions from '@/modules/activities/WalletActivity/partials/LatestTransactions';
import DashboardCard04 from '@/modules/activities/WalletActivity/partials/DashboardCard04';
import QuickTransfer from '@/modules/activities/_partials/wallet/QuickTransfer';
import WithDrawRequest from '@/modules/activities/_partials/wallet/WithDrawRequest';
import { useProfile } from '@/modules/context/ProfileContext';
import RequestToWithDraw from '@/modules/activities/_partials/wallet/RequestToWithDraw';
import { formatValue, notationsInterface, tailwindConfig } from '@/utils/app';
import PopupWallet from '@/modules/activities/_partials/wallet/PopupWallet';
import { useWallet } from '@/modules/context/WalletContext';
import IncomeThisMonth from '@/modules/activities/WalletActivity/partials/IncomeThisMonth';
import { useFetcher } from '@/utils/fetcher';
import endpoints from '@/utils/constants/endpoints';

const WalletActivity = () => {
  const { profile } = useProfile();
  const { wallet, setWallet } = useWallet();
  const [chartData, setChartData] = useState<any>(undefined);
  const { data: fetchingResponse } = useFetcher(endpoints.CHAT);
  useEffect(() => {
    if (!fetchingResponse) {
      return;
    }
    const { data } = fetchingResponse;
    const datasets = data.datasets.map((group: any) => ({
      ...group,
      barPercentage: 0.66,
      categoryPercentage: 0.66,
      backgroundColor:
        group.label === 'Expenses'
          ? tailwindConfig().theme.colors.blue[400]
          : tailwindConfig().theme.colors.blue[500],
      hoverBackgroundColor:
        group.label === 'Income'
          ? tailwindConfig().theme.colors.indigo[500]
          : tailwindConfig().theme.colors.indigo[600],
    }));
    setChartData({ ...data, datasets });
  }, [fetchingResponse]);
  return (
    <div className="text-white flex-col xl:flex-row flex gap-5 items-center justify-between">
      <div className="flex self-start flex-col xl:max-w-[70%] w-full">
        <div
          id="Balance info"
          className="flex flex-col rounded-2xl gap-5 p-5 bg-[#270B71]"
        >
          <div className="flex flex-col  w-full md:flex-row gap-5 overflow-x-auto scrollbar">
            <IncomeThisMonth />
            {chartData ? <DashboardCard04 chartData={chartData} /> : null}
          </div>
          <div className="flex justify-evenly gap-2">
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="rounded-2xl bg-[#6E4DF2] p-2 text-center ">
                <span className="material-icons text-5xl ">wallet</span>
              </div>
              <div className="flex flex-col">
                <h6 className="font-sans text-white/30">Income</h6>
                <p className="font-sans text-2xl">
                  {formatValue(
                    wallet?.income || 0,
                    notationsInterface.standard,
                    7,
                  )}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="rounded-2xl bg-[#6E4DF2] p-2 text-center ">
                <span className="material-icons text-5xl ">payments</span>
              </div>
              <div className="flex flex-col">
                <h6 className="font-sans text-white/30">Expenses</h6>
                <p className="font-sans text-2xl">
                  {formatValue(
                    wallet?.expenses || 0,
                    notationsInterface.standard,
                    7,
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-16 gap-5">
          <h2 className="font-sans text-2xl">Latest Transaction</h2>
          <LatestTransactions />
        </div>
      </div>
      <div className="rounded-2xl xl:max-w-[30%] flex-grow w-full h-full flex flex-col gap-10">
        <div className="flex flex-col bg-[#270B71] py-5 sm:mx-5 px-5 rounded-2xl">
          <h4 className="font-sans">Main Balance</h4>
          <p className="font-sans text-2xl font-bold">
            {formatValue(wallet?.balance || 0, notationsInterface.standard, 7)}
          </p>
          {/* <div className="flex flex-wrap gap-3 mt-5 justify-evenly"> */}
          {/*   <div> */}
          {/*     <h6 className="text-white/30 font-sans">Recent deposit</h6> */}
          {/*     <p className="font-sans">05/02/2022</p> */}
          {/*   </div> */}
          {/*   <div> */}
          {/*     <h6 className="text-white/30 font-sans">Recent withdraw</h6> */}
          {/*     <p className="font-sans">05/02/2022</p> */}
          {/*   </div> */}
          {/* </div> */}
        </div>
        {profile?.role === 'admin' || profile?.role === 'manager' ? (
          <QuickTransfer wallet={wallet} setWallet={setWallet} />
        ) : null}
        {profile?.role === 'admin' || profile?.role === 'manager' ? (
          <WithDrawRequest id="request_withdraw_div" />
        ) : (
          <RequestToWithDraw />
        )}
        <PopupWallet />
      </div>
    </div>
  );
};

export default WalletActivity;
