import React, { useEffect, useState } from 'react';
import Http from '@/utils/http';
import endpoints from '@/utils/constants/endpoints';
import { TransactionInterface } from '@/interfaces/transaction.interface';
import { formatValue } from '@/utils/app';

const LatestTransactions = () => {
  const [latestTransaction, setLatestTransaction] = useState<
    TransactionInterface[]
  >([]);
  useEffect(() => {
    Http.axios(`${endpoints.TRANSACTION}`)
      .then(response => {
        const {
          data: { data },
        } = response;
        setLatestTransaction(
          data.map((each: any) => {
            return {
              ...each,
              createdAt: new Date(each.createdAt),
              updatedAt: new Date(each.updatedAt),
            };
          }),
        );
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  return (
    <div className="col-span-full xl:col-span-8 bg-brand-blue-light shadow-lg rounded-2xl">
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 font-bold rounded-2xl">
              <tr>
                <th className="p-2">
                  <div className="font-sans text-left">Item list</div>
                </th>
                <th className="p-2">
                  <div className="font-sans text-center">Type</div>
                </th>
                <th className="p-2">
                  <div className="font-sans text-center">Status</div>
                </th>
                <th className="p-2">
                  <div className="font-sans text-center">Amount</div>
                </th>
                <th className="p-2">
                  <div className="font-sans text-center">Date</div>
                </th>
                <th className="p-2">
                  <div className="font-sans text-center" />
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100">
              {/* Row */}
              {latestTransaction.map(each => {
                return (
                  <tr key={each._id}>
                    <td className="p-2">
                      <div className="flex items-center">
                        <svg
                          className="shrink-0 mr-2 sm:mr-3"
                          width="36"
                          height="36"
                          viewBox="0 0 36 36"
                        >
                          <circle fill="#24292E" cx="18" cy="18" r="18" />
                          <path
                            d="M18 10.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V24c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z"
                            fill="#FFF"
                          />
                        </svg>
                        <div className="font-sans">{`${each.user?.firstName} ${each.user?.lastName}`}</div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center font-sans">{each.action}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center font-sans">{each.status}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center font-sans text-green-500">
                        {formatValue(each.amount)}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center font-sans text-sky-500">
                        {each.createdAt.toDateString()}
                      </div>
                    </td>
                    <td className="p-2">
                      <button
                        type="button"
                        className="text-center text-gray-50/20"
                      >
                        <span className="material-icons">more_horiz</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default LatestTransactions;
