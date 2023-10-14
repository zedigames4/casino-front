import { useRouter } from 'next/router';
import { useState, ReactNode } from 'react';
import Sidebar from '@/components/partials/Sidebar';
import BottomBar from '@/components/partials/BottomBar';

const AdminScaffold = ({ children }: { children: ReactNode }) => {
  const { pathname } = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className="flex bg-brand-blue w-full h-screen overflow-hidden">
        <Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
        <div className="flex flex-col flex-grow items-center overflow-y-auto">
          <main className="relative flex flex-col p-4 w-full max-w-7xl">
            {children}
          </main>
          <p className="mt-12 text-xs text-gray-400 py-2 px-4 text-center">
            &copy; {new Date().getFullYear()} play in rwanda
          </p>
        </div>
      </div>
      <div className="lg:hidden">
        <BottomBar />
      </div>
    </>
  );
};

export default AdminScaffold;
