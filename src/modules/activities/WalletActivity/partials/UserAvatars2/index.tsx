/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

interface shape {
  avatar: string;
  _id: string;
  firstName: string;
}

const UserAvatars2 = ({
  users,
  setActiveUser,
}: {
  users?: shape[];
  setActiveUser?: (user: shape) => void;
}) => {
  const [selectedAvatar, setSelectedAvatar] = useState('');
  return (
    <ul className="flex mb-8 sm:mb-0  -ml-px pb-2">
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
            className="block flex flex-col justify-center items-center"
          >
            <img
              className={`w-9 h-9 min-w-[36px] rounded-full object-cover ${selectedCss}`}
              src="/images/avatars/avatar.png"
              width={32}
              height={36}
              alt="User 02"
            />
            <span className="truncate px-1 w-[60px]">{each.firstName}</span>
          </button>
        );
      })}
    </ul>
  );
};
UserAvatars2.defaultProps = {
  users: [],
  setActiveUser() {},
};
export default UserAvatars2;
