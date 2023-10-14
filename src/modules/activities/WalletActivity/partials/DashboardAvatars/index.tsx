/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Link from 'next/link';
import { UserProfileInterface } from '@/interfaces/profile.interface';

interface shape {
  avatar: string;
  _id: string;
}

const DashboardAvatars = ({
  users,
  setActiveUser,
}: {
  users?: shape[];
  setActiveUser?: (user: shape) => void;
}) => {
  const [selectedAvatar, setSelectedAvatar] = useState('');
  return (
    <ul className="flex flex-wrap justify-center sm:justify-start mb-8 sm:mb-0 -space-x-3 -ml-px">
      {users?.map(each => {
        const selectedCss =
          selectedAvatar === each._id
            ? 'border-2 border-red-200 rounded-full p-1 z-50'
            : '';
        return (
          <button
            onClick={() => {
              setSelectedAvatar(each._id);
              if (setActiveUser) {
                setActiveUser(each);
              }
            }}
            key={each._id}
            type="button"
            className={`block ${selectedCss}`}
          >
            <img
              className="w-9 h-9 rounded-full"
              src="/images/avatars/avatar.png"
              width={32}
              height={36}
              alt="User 02"
            />
          </button>
        );
      })}
    </ul>
  );
};
DashboardAvatars.defaultProps = {
  users: [],
  setActiveUser() {},
};
export default DashboardAvatars;
