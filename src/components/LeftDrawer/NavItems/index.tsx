import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { INavItems, defaultNavItems } from '@/interfaces/nav.interface';
import { useAuth } from '@/modules/context/AuthContext';

const scrollTo = (id: string) => {
  const element = document.querySelector(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
const DahboardNavItems = ({
  navItems = defaultNavItems,
  clickNavItem = (param: boolean) => {},
}: {
  navItems: INavItems[];
  clickNavItem: (param: boolean) => void;
}) => {
  const { pathname } = useRouter();
  const { user } = useAuth();
  return (
    <div className="flex flex-col mt-4 rounded-t-2xl bg-primary flex-grow items-start gap-4">
      <Link href="/">
        <p
          className={`cursor-pointer font-bold uppercase px-10 py-3 ${
            pathname === '/' ? 'text-[#01FEDF]' : ''
          }`}
        >
          Home
        </p>
      </Link>
      {pathname === '/' && (
        <button
          type="button"
          onClick={() => scrollTo('#games_available')}
          className="cursor-pointer px-10 font-bold uppercase py-3"
        >
          Games
        </button>
      )}
      <Link href="/bonus">
        <p
          className={`cursor-pointer font-bold uppercase px-10 py-3 ${
            pathname === '/bonus' ? 'text-[#01FEDF]' : ''
          }`}
        >
          Bonus
        </p>
      </Link>
      <Link href="/help">
        <p
          className={`cursor-pointer font-bold uppercase px-10 py-3 ${
            pathname.includes('/help') ? 'text-[#01FEDF]' : ''
          }`}
        >
          Help
        </p>
      </Link>
      {!user && (
        <div className="flex flex-col px-10 space-y-4">
          <Link href="#pages">
            <p className="cursor-pointer font-bold uppercase py-3">Pages</p>
          </Link>
          <Link href="/login">
            <p className="cursor-pointer font-bold uppercase px-10 py-3 rounded-xl bg-[#4E00CE]">
              Register
            </p>
          </Link>
          <Link href="/login">
            <p className="cursor-pointer font-bold uppercase px-12 py-3 rounded-xl bg-[#7400D3]">
              Login
            </p>
          </Link>
        </div>
      )}
      <div className="mt-auto pt-12" />
      {user && (
        <Link href="/logout">
          <p
            className={`cursor-pointer font-bold uppercase px-10 py-3 ${
              pathname === '/logout' ? 'text-[#01FEDF]' : ''
            }`}
          >
            Logout
          </p>
        </Link>
      )}
    </div>
  );
};

export default DahboardNavItems;
