import LoginActivity from '@/modules/activities/LoginActivity';
import TopNav from '@/components/TopNav';
import MetaData from '@/components/partials/MetaData';

export const getServerSideProps = ({ query: { sign_up: signUp } }: any) => {
  return {
    props: {
      login: !signUp,
      guest: true,
    },
  };
};

const Login = ({ login }: { login: boolean }) => {
  return (
    <>
      <MetaData>
        <title>Zeddi - Earn money via playing games</title>
      </MetaData>
      <TopNav />
      <LoginActivity login={login} />
    </>
  );
};

export default Login;
