import React from 'react';
import Footer from '@/components/Footer';
import LandingHeader from '@/components/LandingHeader';
import TopNav from '@/components/TopNav';

const Scaffold = ({ children }: { children: any }) => {
  return (
    <>
      <TopNav />
      {children}
      <Footer />
    </>
  );
};

export default Scaffold;
