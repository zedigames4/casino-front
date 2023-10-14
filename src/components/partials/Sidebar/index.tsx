/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import TopupContent from '@/components/TopupContent/TopupContent';
import { dashboardNavs } from '@/system/static';
import { useAuth } from '@/modules/context/AuthContext';
import CustomImage from '@/components/CustomImage';
import { useProfile } from '@/modules/context/ProfileContext';

const Sidebar = ({
  sidebarOpen = true,
  setSidebarOpen = (param: boolean) => {},
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (param: boolean) => void;
}) => {
  const router = useRouter();
  const { pathname } = router;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const { user } = useAuth();
  const { profile } = useProfile();

  useEffect(() => {
    const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
    setSidebarExpanded(
      storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
    );
  }, []);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: any }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [sidebarOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: any }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [sidebarOpen]);

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', String(sidebarExpanded));
    const body = document.querySelector('body');
    if (sidebarExpanded) {
      if (body) {
        body.classList.add('sidebar-expanded');
      }
    } else if (body) {
      body.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <div className="max-w-1/6">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute h-100 z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-brand-blue p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            type="button"
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <Link href="/">
            <span className="relative h-14 min-w-36 rounded-xl self-stretch sm:hidden lg:block">
              <Image layout="fill" src="/images/zaddi/logo.svg" />
            </span>
          </Link>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
            </h3>
            <ul className="mt-3">
              {dashboardNavs?.map(each => {
                const active = pathname.includes(each.path);
                if (
                  each.permissionLevel >= 1 &&
                  !(user?.role === 'manager' || user?.role === 'admin')
                ) {
                  return null;
                }
                if (each.permissionLevel >= 2 && !(user?.role === 'admin')) {
                  return null;
                }
                return (
                  <li
                    key={each.label + each.path}
                    className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                      active && 'bg-slate-900'
                    }`}
                  >
                    <Link href={each.path}>
                      <a
                        className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                          active && 'hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="material-icons">{each.icon}</span>
                          <span className="text-sm font-sans font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            {each.label}
                          </span>
                        </div>
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button
              type="button"
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
            >
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-slate-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>

        <div className=" justify-end mt-auto ">
          <TopupContent
            items={[
              {
                label: 'Profile',
                path: '/profile',
                iconName: '',
              },
              {
                label: 'Logout',
                path: '/logout',
                iconName: '',
              },
            ]}
            classNames="text-white hover:text-white hover:bg-brand/90 cursor-pointer"
          >
            <button
              type="button"
              ref={trigger}
              className="inline-flex bg-[#4E00CE] p-3 rounded text-white justify-center items-center group"
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
                <span className="truncate font-sans ml-2 hidden 2xl:block text-sm font-medium group-hover:text-slate-800">
                  {profile?.firstName || user?.firstName}
                </span>
                <svg
                  className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
                  viewBox="0 0 12 12"
                >
                  <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                </svg>
              </div>
            </button>
          </TopupContent>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
