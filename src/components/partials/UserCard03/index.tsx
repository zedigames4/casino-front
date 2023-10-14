import React from 'react';
import { UserProfileInterface } from '@/interfaces/profile.interface';

const UserCard03 = ({
  user,
  onClick,
}: {
  user?: UserProfileInterface | null;
  onClick?: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={() => onClick && onClick()}
      className="flex gap-2 justify-between min-w-72 items-center bg-white/20 rounded-2xl px-3 py-2"
    >
      <span className="material-icons text-5xl p-2 rounded-2xl bg-white/60">
        person
      </span>
      <div className="flex flex-col gap-2">
        <p className="font-sans">{user?.firstName}</p>
        {/* personal account number*/}
        <p className="font-sans text-white/30">{user?.email}</p>
      </div>
      <div>
        <span className="bg-brand-blue-light rounded-full p-2">
          {user?.referralCode}
        </span>
      </div>
    </button>
  );
};
UserCard03.defaultProps = {
  user: undefined,
  onClick() {},
};
export default UserCard03;
