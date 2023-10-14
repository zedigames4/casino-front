import { GetStaticProps, NextPage } from 'next';
import React from 'react';
import ForgetPasswordActivity from '@/modules/activities/ForgetPasswrod';
import TopNav from '@/components/TopNav';
import MetaData from '@/components/partials/MetaData';

const ForgetPassword: NextPage = () => {
  return (
    <>
      <MetaData>
        <title>Forget password | Zeddi - Earn money via playing games</title>
      </MetaData>
      <TopNav />
      <ForgetPasswordActivity />
    </>
  );
};

export const getStaticProps: GetStaticProps = context => {
  return {
    props: {
      guest: true,
    },
  };
};

export default ForgetPassword;
