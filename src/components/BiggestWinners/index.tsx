import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Http from '@/utils/http';
import endpoints from '@/utils/constants/endpoints';
import { useFetcher } from '@/utils/fetcher';
import { formatValue, notationsInterface } from '@/utils/app';

const BiggestWinners = () => {
  const [bestWinners, setBestWinners] = useState<any[]>([]);
  const { data: fetchingResponse } = useFetcher(endpoints.BIGGEST_WINNER);
  useEffect(() => {
    if (fetchingResponse) {
      const { data } = fetchingResponse;
      setBestWinners(data);
    }
  }, [fetchingResponse]);
  return (
    <div className="flex flex-col px-4 md:px-8 mt-12">
      <div className="flex flex-col md:grid md:grid-cols-4 gap-x-10 gap-y-4 rounded-[30px] bg-[#0E0D59] px-3 md:px-12 py-5 md:py-10">
        <h1 className="font-black tracking-wide text-3xl md:text-5xl uppercase flex flex-col justify-center space-y-1 mx-auto">
          <span>BIGGEST</span> <span className="text-[#01FEDF]">WINNERS</span>
          <span>TODAY</span>
        </h1>

        <div className="flex flex-col shrink-0 justify-center mx-auto">
          <Image
            width={206}
            layout="fixed"
            height={206}
            src="/images/cup.png"
            alt=""
          />
        </div>

        <div className="text-xs whitespace-nowrap sm:text-base flex flex-col col-span-2 items-center justify-center">
          <Image
            src="/images/best-winner.png"
            width={318}
            height={61}
            layout="fixed"
          />
          <div className="relative flex mt-6 w-full flex-col bg-[#3A2792]/80 rounded-lg p-4 border border-[#7364BB]/90">
            <div className="flex flex-col -top-2 -left-4 absolute">
              <Image src="/images/top-winner.png" width={85} height={72} />
            </div>
            <div className="overflow-x-auto flex space-x-3 items-center justify-between rounded-lg bg-[#282995] py-3 px-10">
              <div className="flex space-x-2 ml-3 items-center">
                <span className="material-icons text-green-500 text-2xl">
                  account_circle
                </span>
                <h1 className="font-bold uppercase">
                  {bestWinners.length > 0 ? bestWinners[0].user : null}
                </h1>
              </div>
              <p className="p-1 rounded-full text-[#01F06F] bg-[#150D96]">
                +
                {bestWinners.length > 2
                  ? formatValue(
                      bestWinners[0].totalWin || 0,
                      notationsInterface.standard,
                      7,
                    )
                  : null}
              </p>
            </div>

            <div className="overflow-x-auto relative mt-3 flex space-x-3 items-center justify-between rounded-lg bg-[#282995] py-3 px-10">
              <div className="flex flex-col -left-0 absolute">
                <Image src="/images/top-2.png" width={43} height={35} />
              </div>
              <div className="flex space-x-2 items-center">
                <span className="material-icons text-blue-400 text-2xl">
                  account_circle
                </span>
                <h1 className="font-bold uppercase">
                  {bestWinners.length > 1 ? bestWinners[1].user : null}
                </h1>
              </div>
              <p className="p-1 rounded-full text-[#01F06F] bg-[#150D96]">
                +
                {bestWinners.length > 2
                  ? formatValue(
                      bestWinners[1].totalWin || 0,
                      notationsInterface.standard,
                      7,
                    )
                  : null}
              </p>
            </div>

            <div className="overflow-x-auto relative mt-3 flex space-x-3 items-center justify-between rounded-lg bg-[#282995] py-3 px-10">
              <div className="flex flex-col -left-0 absolute">
                <Image src="/images/top-3.png" width={43} height={35} />
              </div>
              <div className="flex space-x-2 items-center">
                <span className="material-icons text-yellow-500 text-2xl">
                  account_circle
                </span>
                <h1 className="font-bold uppercase">
                  {bestWinners.length > 2 ? bestWinners[2].user : null}
                </h1>
              </div>
              <p className="p-1 rounded-full text-[#01F06F] bg-[#150D96]">
                +
                {bestWinners.length > 2
                  ? formatValue(
                      bestWinners[2].totalWin || 0,
                      notationsInterface.standard,
                      7,
                    )
                  : null}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiggestWinners;
