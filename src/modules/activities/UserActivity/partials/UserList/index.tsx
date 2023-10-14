import React from 'react';
import { UserProfileInterface } from '@/interfaces/profile.interface';
import DropChildren from '@/components/DropChildren';
import { formatValue, notationsInterface } from '@/utils/app';

interface ActionsProps {
  user: any;
  onRemoveUser?: (id: string) => void;
  onUpdateUser?: (user: UserProfileInterface) => void;
}
const UserList = ({
  users,
  removeUser,
  updateUser,
  onClick,
  Actions,
}: {
  users: UserProfileInterface[];
  removeUser?: (id: string) => void;
  updateUser?: (user: UserProfileInterface) => void;
  onClick?: (userId: UserProfileInterface) => void;
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
                  <div className="font-sans text-center">Income</div>
                </th>
                <th className="p-2">
                  <div className="font-sans text-center">Verified</div>
                </th>
                <th className="p-2">
                  <div className="font-sans text-center">Role</div>
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
              {users &&
                users.map(eachUser => (
                  <tr
                    className="cursor-pointer hover:bg-brand-bold"
                    key={`${eachUser._id}UserList`}
                  >
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                    <td
                      className="p-2"
                      onClick={() => onClick && onClick(eachUser)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="material-icons text-2xl py-1 px-2 rounded-full bg-brand-blue">
                          person
                        </span>
                        <div className="font-sans">{`${eachUser.firstName} ${eachUser.lastName}`}</div>
                      </div>
                    </td>
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                    <td
                      className="p-2"
                      onClick={() => onClick && onClick(eachUser)}
                    >
                      <div className="text-center font-sans">
                        {formatValue(
                          eachUser.balance || 0,
                          notationsInterface.standard,
                          7,
                        )}
                      </div>
                    </td>
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                    <td
                      className="p-2"
                      onClick={() => onClick && onClick(eachUser)}
                    >
                      <div className="text-center font-sans text-green-500">
                        {formatValue(
                          eachUser.income || 0,
                          notationsInterface.standard,
                          7,
                        )}
                      </div>
                    </td>
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                    <td
                      className="p-2"
                      onClick={() => onClick && onClick(eachUser)}
                    >
                      <div className="text-center font-sans">
                        {eachUser.verified ? 'verified' : 'unverified'}
                      </div>
                    </td>
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                    <td
                      className="p-2"
                      onClick={() => onClick && onClick(eachUser)}
                    >
                      <div className="text-center font-sans">
                        {eachUser.role}
                      </div>
                    </td>
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                    <td
                      className="p-2"
                      onClick={() => onClick && onClick(eachUser)}
                    >
                      <div className="text-center font-sans text-sky-500">
                        {eachUser.createdAt.toDateString()}
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
                          <Actions
                            user={eachUser}
                            onRemoveUser={removeUser}
                            onUpdateUser={updateUser}
                          />
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

UserList.defaultProps = {
  removeUser: undefined,
  updateUser: undefined,
  onClick(userId: string) {},
  Actions: undefined,
};
export default UserList;
