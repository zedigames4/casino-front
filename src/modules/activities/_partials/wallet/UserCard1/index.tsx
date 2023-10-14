import React from 'react';
import { UserProfileInterface } from '@/interfaces/profile.interface';

const UserCard1 = ({ user }: { user?: UserProfileInterface | null }) => {
  return (
    <div className="flex gap-2 justify-between w-full items-center bg-white/20 rounded-2xl px-3 py-2">
      <span className="material-icons text-5xl p-2 rounded-2xl bg-white/60">
        person
      </span>
      <div className="flex flex-col gap-2">
        <p className="font-sans">{user?.firstName}</p>
        {/* personal account number*/}
        <p className="font-sans text-white/30">{user?.phoneNumber}</p>
      </div>
      <div>
        <span className="material-icons bg-brand-blue-light rounded-full p-2">
          done
        </span>
      </div>
    </div>
  );
};
UserCard1.defaultProps = {
  user: undefined,
};
export default UserCard1;
