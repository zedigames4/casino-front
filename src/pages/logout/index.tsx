import { useEffect } from 'react';
import { GetStaticProps } from 'next';
import Http from '@/utils/http';
import SecureLs from '@/utils/helpers/secureLs';
import Keys from '@/utils/constants/keys';
import MetaData from '@/components/partials/MetaData';

const Logout = () => {
  useEffect(() => {
    Http.axios
      .post('/api/v1/auth/logout')
      .then(() => {
        SecureLs.removeToken();
        SecureLs.remove(Keys.USER_INFO);
      })
      .catch(error => {
        SecureLs.removeToken();
        SecureLs.remove(Keys.USER_INFO);
        // console.error(error);
      })
      .finally(() => {
        window.location.href = '/login';
      });
  }, []);
  return (
    <>
      <MetaData>
        <title>Zeddi - Earn money via playing games</title>
      </MetaData>
      <div className="flex h-screen w-screen bg-primary text-white justify-center items-center">
        Loading....
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = context => {
  return {
    props: {
      protected: true,
    },
  };
};

export default Logout;
