import React from 'react';
import ResetPasswordActivity from '@/modules/activities/ResetPasswordActivity';
import TopNav from '@/components/TopNav';
import MetaData from '@/components/partials/MetaData';

export const getServerSideProps = ({ query: { key } }: any) => {
  if (!key) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  return {
    props: {
      token: key,
    },
  };
};

const ResetPassword = ({ token }: { token: string }) => {
  return (
    <>
      <MetaData>
        <title>Reset Password | Zeddi - Earn money via playing games</title>
      </MetaData>
      <TopNav />
      <ResetPasswordActivity token={token} />
    </>
  );
};
export default ResetPassword;
