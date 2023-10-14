import React from 'react';
import Image from 'next/image';
import { publicNavItems } from '@/utils/helpers/data/navigation';
import DahboardNavItems from './NavItems';

const LeftDrawer = ({ navItems = publicNavItems }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const sidebar = React.useRef<HTMLDivElement>(null);
  const trigger = React.useRef<HTMLButtonElement>(null);

  const onClose = () => {
    setSidebarOpen(false);
  };

  React.useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [sidebarOpen]);

  return (
    <>
      <button
        type="button"
        ref={trigger}
        className="lg:hidden dark:text-white"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <span className="material-icons text-brand text-3xl">menu</span>
      </button>
      <div
        id="sidebar"
        ref={sidebar}
        className={`bg-brand-blue-light flex lg:hidden flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 dark:bg-dark transition-all duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        <div className="flex p-2 py-3 pl-4">
          <span className="relative h-14 min-w-36 rounded-xl self-stretch">
            <Image layout="fill" src="/images/zaddi/logo.svg" />
          </span>
        </div>
        <DahboardNavItems navItems={navItems} clickNavItem={onClose} />
      </div>
    </>
  );
};

export default LeftDrawer;
