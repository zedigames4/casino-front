import React from 'react';
import DropChildren from '@/components/DropChildren';
import { WithdrawRequestInterface } from '@/interfaces/withdraw_request.interface';
import { formatValue, notationsInterface } from '@/utils/app';

interface ActionsProps {
  withdrawRequest: any;
}
const WithdrawRequestList = ({
  withdrawRequests,
  onClick,
  Actions,
}: {
  withdrawRequests: WithdrawRequestInterface[];
  onClick?: (userId: WithdrawRequestInterface) => void;
  Actions?: React.FC<ActionsProps>;
}) => {
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
                  <div className="font-sans text-left">User name</div>
                </th>
                <th className="p-2">
                  <div className="font-sans text-center">Balance</div>
                </th>
                <th className="p-2">
                  <div className="font-sans text-center">W/D Request</div>
                </th>
                <th className="p-2">
                  <div className="font-sans text-center">Status</div>
                </th>
                <th className="p-2">
                  <div className="font-sans text-center">Currency</div>
                </th>

                <th className="p-2">
                  <div className="font-sans text-center">Created at</div>
                </th>
                <th className="p-2">
                  <div className="font-sans text-center" />
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100">
              {/* Row */}
              {withdrawRequests &&
                withdrawRequests.map(eachRequest => (
                  <tr
                    className="cursor-pointer hover:bg-brand-bold"
                    key={`${eachRequest._id}UserList`}
                  >
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                    <td
                      className="p-2"
                      onClick={() => onClick && onClick(eachRequest)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="material-icons text-2xl py-1 px-2 rounded-full bg-brand-blue">
                          person
                        </span>
                        <div className="font-sans">{`${eachRequest.requester.firstName} ${eachRequest.requester.lastName}`}</div>
                      </div>
                    </td>
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                    <td
                      className="p-2"
                      onClick={() => onClick && onClick(eachRequest)}
                    >
                      <div className="text-center font-sans">
                        {formatValue(
                          eachRequest.amount || 0,
                          notationsInterface.standard,
                          7,
                        )}
                      </div>
                    </td>
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                    <td
                      className="p-2"
                      onClick={() => onClick && onClick(eachRequest)}
                    >
                      <div className="text-center font-sans text-green-500">
                        0
                      </div>
                    </td>
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                    <td
                      className="p-2"
                      onClick={() => onClick && onClick(eachRequest)}
                    >
                      <div className="text-center font-sans">
                        {eachRequest.status}
                      </div>
                    </td>
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                    <td
                      className="p-2"
                      onClick={() => onClick && onClick(eachRequest)}
                    >
                      <div className="text-center font-sans">
                        {eachRequest.currency}
                      </div>
                    </td>
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                    <td
                      className="p-2"
                      onClick={() => onClick && onClick(eachRequest)}
                    >
                      <div className="text-center font-sans text-sky-500">
                        {eachRequest.createdAt
                          ? new Date(eachRequest.createdAt).toDateString()
                          : null}
                      </div>
                    </td>
                    <td className="p-2">
                      <DropChildren
                        toggle={
                          <button type="button" className="text-center">
                            <span className="material-icons">more_horiz</span>
                          </button>
                        }
                      >
                        {Actions ? (
                          <Actions withdrawRequest={eachRequest} />
                        ) : null}
                      </DropChildren>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

WithdrawRequestList.defaultProps = {
  onClick(withdrawRequest: string) {},
  Actions: undefined,
};
export default WithdrawRequestList;
