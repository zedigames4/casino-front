import React from 'react';
import Link from 'next/link';
import { useProfile } from '@/modules/context/ProfileContext';

const BottomBar = () => {
  const { profile } = useProfile();
  return (
    <div className="fixed z-50 inset-x-0 bottom-0">
      <div
        id="tabs"
        className="flex w-full bg-brand-blue/90 rounded text-slate-200 hover:text-white justify-between"
      >
        <button
          type="button"
          className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
        >
          <Link href="/dashboard">
            <div>
              <span className="material-icons">dashboard</span>
              <span className="tab tab-home block text-xs font-sans">
                Dashboard
              </span>
            </div>
          </Link>
        </button>
        <button
          type="button"
          className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
        >
          <Link href="/wallet">
            <div>
              <span className="material-icons">wallet</span>
              <span className="tab tab-home block text-xs font-sans">
                Wallet
              </span>
            </div>
          </Link>
        </button>
        <button
          type="button"
          className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
        >
          <Link href="/games">
            <div>
              <span className="material-icons">sports_esports</span>
              <span className="tab tab-home block text-xs font-sans">
                games
              </span>
            </div>
          </Link>
        </button>

        <button
          type="button"
          className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
        >
          {profile?.role === 'admin' ? (
            <Link href="/users">
              <div>
                <span className="material-icons">person</span>
                <span className="tab tab-home block text-xs font-sans">
                  users
                </span>
              </div>
            </Link>
          ) : (
            <Link href="/help">
              <div>
                <span className="material-icons">help</span>
                <span className="tab tab-home block text-xs font-sans">
                  Help
                </span>
              </div>
            </Link>
          )}
        </button>
      </div>
    </div>
  );
};

export default BottomBar;
