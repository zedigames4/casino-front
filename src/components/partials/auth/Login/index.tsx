import Link from 'next/link';
import joi from 'joi';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';
import swal from 'sweetalert';
import { removeQuote } from '@/utils/format';
import Constants from '@/utils/constants';
import Secure from '@/utils/helpers/secureLs';
import Keys from '@/utils/constants/keys';
import { useProfile } from '@/modules/context/ProfileContext';

const loginFields = {
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .label('Email')
    .required(),
  password: joi.string().required().label('Password'),
};
const loginSchema = joi.object(loginFields);
const Login = ({ setVerifyError }: { setVerifyError: (a: any) => void }) => {
  const { setProfile } = useProfile();
  const {
    register: loginRegister,
    handleSubmit: loginSubmit,
    setValue: loginSetValue,
    getValues: loginGetValues,
    reset: loginReset,
    formState: { errors: loginError },
  } = useForm({
    resolver: joiResolver(loginSchema),
  });
  const onLogin = async (query: any) => {
    setVerifyError(null);
    axios
      .post(Constants.BACKEND_URL + Constants.endpoints.LOGIN, { ...query })
      .then(response => {
        const {
          data: { tokenData, data: userInfo },
        } = response;
        const { token } = tokenData;
        Secure.setToken(token);
        Secure.set(
          Keys.TOKEN_DATA,
          JSON.stringify({ ...tokenData, now: new Date() }),
        );
        Secure.set(Keys.USER_INFO, userInfo);
        setProfile({
          ...userInfo,
          createdAt: Date.parse(userInfo.createdAt),
          updatedAt: Date.parse(userInfo.updatedAt),
        });
        const redirectLink = Secure.get(Keys.REDIRECT_LINK);
        Secure.remove(Keys.REDIRECT_LINK);
        window.location.href = redirectLink || '/dashboard';
      })
      .catch(error => {
        console.error(error);
        if (error.response.status === 401) {
          setVerifyError(error.response.data);
        } else {
          swal(
            'Login fail!',
            error.response.data.message || 'incorrect username or password',
            'error',
          );
          setVerifyError(null);
        }
      });
  };
  return (
    <form
      onSubmit={event => {
        loginSubmit(onLogin)(event);
      }}
      className="sign-in-form"
    >
      <h2 className="title">Sign in</h2>
      <div className="input-field">
        <i className="material-icons">person</i>
        <input {...loginRegister('email')} type="email" placeholder="Email" />
      </div>
      {loginError.email?.message && (
        <p className="text-xs text-red-500">
          {removeQuote(loginError.email?.message as string)}
        </p>
      )}
      <div className="input-field">
        <i className="material-icons">lock</i>
        <input
          {...loginRegister('password')}
          type="password"
          placeholder="Password"
        />
      </div>
      {loginError.password?.message && (
        <p className="text-xs text-red-500">
          {removeQuote(loginError.password?.message as string)}
        </p>
      )}
      <Link href="/forget-password">
        <span className="self-end pr-12 cursor-pointer">Forget password ?</span>
      </Link>
      <button
        type="submit"
        className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-3 bg-blue-400 hover:bg-blue-600 text-white mt-6 px-8 md:px-12 leading-normal no-underline solid"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
