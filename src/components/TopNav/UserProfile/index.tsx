import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import DropChildren from '@/components/DropChildren';
import { useAuth } from '@/modules/context/AuthContext';
import CustomImage from '@/components/CustomImage';
import { useProfile } from '@/modules/context/ProfileContext';

const UserProfile = () => {
  const { user } = useAuth();
  const { profile } = useProfile();
  return (
    <DropChildren
      toggle={
        <div
          className="inline-flex bg-[#4E00CE] p-3 rounded text-white justify-center items-center group max-w-[150px]"
          aria-haspopup="true"
        >
          <CustomImage
            className="w-8 h-8 rounded-full border border-white"
            src={
              `${profile?.avatar}`.startsWith('http')
                ? (profile?.avatar as string)
                : '/images/avatars/avatar.png'
            }
            errorImage="/images/avatars/avatar.png"
            width="32px"
            height="32px"
            alt="User"
          />

          <div className="flex items-center truncate">
            <span className="truncate font-sans ml-2 hidden 2xl:block text-sm font-medium group-hover:text-white/80">
              {profile?.firstName || user?.firstName}
            </span>
            <svg
              className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
              viewBox="0 0 12 12"
            >
              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
            </svg>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-2">
        <Link href="/profile">
          <a
            href="#zeddi"
            className="px-10 font-bold w-full hover:bg-brand-bold py-3"
          >
            Profile
          </a>
        </Link>
        <Link href="/help">
          <a
            href="#zeddi"
            className="px-10 font-bold w-full hover:bg-brand-bold py-3"
          >
            Help
          </a>
        </Link>
        <Link href="/logout">
          <a
            href="#zeddi"
            className="px-10 font-bold w-full hover:bg-brand-bold py-3"
          >
            Logout
          </a>
        </Link>
      </div>
    </DropChildren>
  );
};

export default UserProfile;
