import React from 'react';
import { UserProfileInterface } from '@/interfaces/profile.interface';
import UserCard03 from '@/components/partials/UserCard03';

const UsersListCards = ({
  users,
  onClick,
}: {
  users: UserProfileInterface[];
  onClick?: (userId: UserProfileInterface) => void;
}) => {
  return (
    <div className="col-span-full xl:col-span-8 bg-brand-blue-light shadow-lg rounded-2xl flex w-full gap-2 justify-evenly py-24 px-24 flex-wrap">
      {users.map(eachUser => {
        return (
          <UserCard03
            user={eachUser}
            onClick={() => onClick && onClick(eachUser)}
          />
        );
      })}
    </div>
  );
};

UsersListCards.defaultProps = {
  onClick() {},
};
export default UsersListCards;
