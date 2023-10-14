import joi from 'joi';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';
import swal from 'sweetalert';
import Constants from '@/utils/constants';
import { removeQuote } from '@/utils/format';

const signUpFields = {
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .label('Email')
    .required(),
  password: joi.string().required().label('Password'),
  firstName: joi.string().required().label('First name'),
  lastName: joi.string().required().label('Last name'),
  phoneNumber: joi.string().required().label('Phone number'),
  referralCode: joi.string().allow('').length(6).label('Referral Code'),
};
const signUpSchema = joi.object(signUpFields);

const Signup = ({ setLogin }: { setLogin: (a: boolean) => void }) => {
  const {
    register: signUpRegister,
    handleSubmit: signUpSubmit,
    setValue: signUpSetValue,
    getValues: signUpGetValues,
    reset: signUpReset,
    formState: { errors: signUpError },
  } = useForm({
    resolver: joiResolver(signUpSchema),
  });

  const onSignUp = async (query: any) => {
    if (query.referralCode === '') {
      delete query.referralCode;
    }
    axios
      .post(Constants.BACKEND_URL + Constants.endpoints.SIGNUP, { ...query })
      .then(response => {
        const {
          data: { data: data_ },
        } = response;
        swal(
          'Sign up Success!',
          `Hello ${data_.firstName}, go ahead and login now`,
          'success',
        ).then(() => {
          setLogin(true);
        });
      })
      .catch(error => {
        console.error(error);
        swal(
          'Login fail!',
          error.response.data.message || 'incorrect username or password',
          'error',
        );
      });
  };
  return (
    <form
      onSubmit={event => {
        signUpSubmit(onSignUp)(event);
      }}
      className="sign-up-form"
    >
      <h2 className="title">Sign up</h2>
      <div className="input-field">
        <i className="material-icons">person</i>
        <input
          type="text"
          {...signUpRegister('firstName')}
          placeholder="First name"
        />
      </div>
      {signUpError.firstName?.message && (
        <p className="text-xs text-red-500">
          {removeQuote(signUpError.firstName?.message as string)}
        </p>
      )}
      <div className="input-field">
        <i className="material-icons">person</i>
        <input
          type="text"
          {...signUpRegister('lastName')}
          placeholder="First name"
        />
      </div>
      {signUpError.lastName?.message && (
        <p className="text-xs text-red-500">
          {removeQuote(signUpError.lastName?.message as string)}
        </p>
      )}

      <div className="input-field">
        <i className="material-icons">call</i>
        <input
          {...signUpRegister('phoneNumber')}
          type="tel"
          placeholder="Phone number"
        />
      </div>
      {signUpError.phoneNumber?.message && (
        <p className="text-xs text-red-500">
          {removeQuote(signUpError.phoneNumber?.message as string)}
        </p>
      )}
      <div className="input-field">
        <i className="material-icons">mail</i>
        <input {...signUpRegister('email')} type="email" placeholder="Email" />
      </div>
      {signUpError.email?.message && (
        <p className="text-xs text-red-500">
          {removeQuote(signUpError.email?.message as string)}
        </p>
      )}
      <div className="input-field">
        <i className="material-icons">lock</i>
        <input
          {...signUpRegister('password')}
          type="password"
          placeholder="Password"
        />
      </div>
      {signUpError.password?.message && (
        <p className="text-xs text-red-500">
          {removeQuote(signUpError.password?.message as string)}
        </p>
      )}

      <div className="input-field">
        <i className="material-icons">person</i>
        <input
          type="text"
          {...signUpRegister('referralCode')}
          placeholder="Referral Code(optional)"
        />
      </div>
      {signUpError.referralCode?.message && (
        <p className="text-xs text-red-500">
          {removeQuote(signUpError.referralCode?.message as string)}
        </p>
      )}
      <button
        type="submit"
        className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-3 bg-blue-400 hover:bg-blue-600 text-white mt-6 px-8 md:px-12 leading-normal no-underline"
      >
        Sign up
      </button>
    </form>
  );
};

export default Signup;
