import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Image from 'next/image';
import LeftDrawer from '@/components/LeftDrawer';
import DropContent from '@/components/DropContent';
import DropChildren from '@/components/DropChildren';
import { useAuth } from '@/modules/context/AuthContext';
import { INavItems, pages } from '@/interfaces/nav.interface';
import UserProfile from './UserProfile';

const TopNav = () => {
  const router = useRouter();
  const [displayingPages, setDisplayingPages] = React.useState<INavItems[]>([]);
  const { user } = useAuth();
  useEffect(() => {
    let displayPages: INavItems[];
    if (user) {
      displayPages = pages.filter(eachNav => !eachNav.guestOnly);
      if (user.role === 'user') {
        displayPages = displayPages.filter(eachNav => !eachNav.staffOnly);
      }
      if (user.role === 'manager') {
        displayPages = displayPages.filter(eachNav => !eachNav.adminOnly);
      }
    } else {
      displayPages = pages.filter(
        eachNav =>
          !eachNav.requireLogin && !eachNav.staffOnly && !eachNav.adminOnly,
      );
    }
    setDisplayingPages([...displayPages]);
  }, [user]);
  const scrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex gap-x-4 lg:gap-x-12 w-full px-4 md:px-8 py-2 top-0 z-60 sticky bg-[#270B71] text-white">
      <LeftDrawer />
      <Link id="zeddi" href="/">
        <a
          href="#zeddi"
          className="relative h-14 min-w-36 rounded-xl self-stretch"
        >
          <Image layout="fill" src="/images/zaddi/logo.svg" />
        </a>
      </Link>
      <div className="ml-auto lg:hidden">{user && <UserProfile />}</div>
      <div className="lg:flex hidden space-x-8 items-center ml-auto">
        <Link href="/">
          <a
            href="#zeddi"
            className={`cursor-pointer font-bold uppercase py-3 ${
              router.pathname === '/' ? 'text-[#01FEDF]' : ''
            }`}
          >
            Home
          </a>
        </Link>
        <button
          type="button"
          onClick={() => scrollTo('#games_available')}
          className="cursor-pointer font-bold uppercase py-3"
        >
          Games
        </button>
        <Link href="/bonus">
          <a
            href="#bonus"
            className={`cursor-pointer font-bold uppercase py-3 ${
              router.pathname === '/bonus' ? 'text-[#01FEDF]' : ''
            }`}
          >
            Bonus
          </a>
        </Link>
        <DropContent
          items={displayingPages}
          classNames="text-brand hover:text-white  hover:bg-brand/90"
        >
          <span className="flex gap-1 items-center">
            <p className="cursor-pointer font-bold uppercase py-3">Pages</p>
            <button type="button" className="material-icons">
              arrow_drop_down
            </button>
          </span>
        </DropContent>
        <Link href="/help">
          <a
            href="#zeddi"
            className={`cursor-pointer font-bold uppercase py-3 ${
              router.pathname.includes('/help') ? 'text-[#01FEDF]' : ''
            }`}
          >
            Help
          </a>
        </Link>
        {user ? (
          <UserProfile />
        ) : (
          <>
            <Link href="/login?sign_up=true">
              <a
                href="#zeddi"
                className="cursor-pointer font-bold uppercase px-10 py-3 rounded-full bg-[#4E00CE]"
              >
                Register
              </a>
            </Link>
            <Link href="/login">
              <a
                href="#zeddi"
                className="cursor-pointer font-bold uppercase px-12 py-3 rounded-full bg-[#7400D3]"
              >
                Login
              </a>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default TopNav;
