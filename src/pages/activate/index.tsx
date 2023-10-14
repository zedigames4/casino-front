import { useRouter } from 'next/router';
import React from 'react';
import swal from 'sweetalert';
import Http from '@/utils/http';
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

const ActivateAccount = ({ token }: { token: string }) => {
  const { push } = useRouter();
  const [error, setError] = React.useState<any>(null);
  React.useEffect(() => {
    Http.axios
      .post('/api/v1/auth/verify', { token })
      .then(response => {
        if (response.status === 200 || response.status === 201) {
          swal(
            'Activated',
            response.data.message ||
              'Account has been activate successfully, now you can login',
            'success',
          ).then(() => {
            push('/login').catch(error_ => console.error(error_));
          });
        } else {
          setError('something went wrong');
        }
      })
      .catch(error_ => {
        setError(error_.message || 'Something went wrong');
      });
  }, [token]);

  return (
    <>
      <MetaData>
        <title>Activate Account | Zeddi - Earn money via playing games</title>
      </MetaData>
      <div className="flex flex-col items-center justify-center min-h-screen">
        {error ? (
          <div className="flex flex-col items-center max-w-sm">
            <p className="px-6 py-3 rounded-lg bg-red-500 text-white">
              Something went wrong while activating your account. Please check
              your email and try again or contact admin for more support.
            </p>

            <button
              type="button"
              onClick={() => {
                push('/');
              }}
              className="px-6 py-2.5 bg-dark-green text-white rounded-full mt-6"
            >
              Back Home
            </button>
          </div>
        ) : (
          <h1 className="text-2xl md:text-4xl font-black tracking-wide text-brand-green">
            Please wait....
          </h1>
        )}
      </div>
    </>
  );
};

export default ActivateAccount;
