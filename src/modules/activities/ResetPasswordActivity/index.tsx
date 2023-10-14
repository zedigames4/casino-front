import joi from 'joi';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Http from '@/utils/http';
import endpoints from '@/utils/constants/endpoints';

const resetPassword = {
  password: joi.string().required(),
};
const resetPasswordSchema = joi.object(resetPassword);
const ResetPasswordActivity = ({ token }: { token: string }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(resetPasswordSchema),
  });

  const { push } = useRouter();
  useEffect(() => {
    if (!token) {
      push('/404').catch(error => console.error(error));
    }
  }, [token, push]);

  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState<string | null>(null);
  const [submitting, isSubmitting] = React.useState<boolean>(false);
  const onSubmit = (data: object) => {
    setErrorMessage(null);
    setMessage(null);
    isSubmitting(true);
    Http.axios
      .put(endpoints.RESET_PASSWORD, {
        ...data,
        token,
      })
      .then(response => {
        isSubmitting(false);
        if (response.status === 201 || response.status === 200) {
          setMessage(
            response?.data?.message || 'reset successfully, go to login ',
          );
          push('/login');
        } else {
          setErrorMessage('Something went wrong, try again.');
        }
        // setMessage(response.data.)
      })
      .catch(result => {
        isSubmitting(false);
        const { error } = result.response?.data || result.response || result;
        setErrorMessage(error?.message || 'Something went wrong, try again');
      });
  };

  return (
    <div className="bg-top bg-cover bg-no-repeat bg-[url(/images/zaddi/logo.svg)] flex flex-col items-center min-h-screen">
      <div className="flex flex-col bg-primary/60 flex-grow w-full items-center justify-center p-4 md:p-8">
        <div className="bg-white flex flex-col w-full md:max-w-md rounded shadow-xl border-t-[0.5px] border-gray-50 justify-center">
          <div className="flex flex-col items-center w-full p-6 py-12 md:px-12">
            <span className="relative h-14 min-w-36 rounded-xl self-stretch sm:hidden lg:block">
              <Image layout="fill" src="/images/zaddi/logo.svg" />
            </span>
            <h1 className="mt-6 text-2xl md:text-3xl font-bold tracking-wide">
              Set new password
            </h1>

            {errorMessage ? (
              <div className="mt-3 flex flex-col items-center rounded-lg bg-red-500 px-4 py-3">
                <p className="text-white text-sm first-letter:uppercase">
                  {errorMessage}
                </p>
              </div>
            ) : null}
            {message ? (
              <div className="mt-3 flex flex-col items-center rounded-lg bg-blue-500 px-4 py-3">
                <p className="text-white text-sm first-letter:uppercase">
                  {message}
                </p>
              </div>
            ) : null}

            <form
              onSubmit={event => {
                handleSubmit(onSubmit)(event);
              }}
              className="w-full flex flex-col mt-6"
            >
              <label htmlFor="user-password" className="flex flex-col">
                <span className="text-black-200 text-sm">New password</span>
                <input
                  id="user-password"
                  type="password"
                  {...register('password')}
                  className="mt-1 focus:border-primary bg-gray-202 outline-none rounded-lg border border-gray-201 px-3 py-2"
                />
                <p className="text-red-500 text-xs mt-1">
                  {errors.password?.message as string}
                </p>
              </label>
              {submitting ? (
                <button
                  disabled
                  type="submit"
                  className="mt-6 w-full font-semibold tracking-wide bg-primary/60 px-4 py-3 rounded-lg text-white"
                >
                  Submit
                </button>
              ) : (
                <button
                  type="submit"
                  className="mt-6 w-full font-semibold tracking-wide bg-brand-bold px-4 py-3 rounded-lg text-white"
                >
                  Submit
                </button>
              )}
            </form>

            <p className="text-primary mt-6">
              <Link href="/login">Back to Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordActivity;
