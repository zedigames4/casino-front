import Image from 'next/image';
import joi from 'joi';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';
import swal from 'sweetalert';
import { useRouter } from 'next/router';
import Constants from '@/utils/constants';

const forgetPasswordFields = {
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required(),
};
const forgetPasswordSchema = joi.object(forgetPasswordFields);
const ForgetPasswordActivity = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(forgetPasswordSchema),
  });
  const submit = async (query: any) => {
    axios
      .post(Constants.BACKEND_URL + Constants.endpoints.FORGET_PASSPORT, {
        ...query,
      })
      .then(response => {
        swal(
          'We send next step to your Inbox!',
          response.data.message || 'check your email to reset your password',
        ).then(() => {
          router.push('/');
        });
      })
      .catch(error => {
        console.error(error);
        swal(
          'Login fail!',
          error.response.data.message || 'user not found',
          'error',
        );
      });
  };
  return (
    <div>
      <div>
        <div className="container mx-auto sm:px-4 container-login">
          <div className="forms-container">
            <div className="signin-signup">
              <form
                onSubmit={event => {
                  handleSubmit(submit)(event);
                }}
                className="sign-in-form"
              >
                <h2 className="title">Forget password</h2>
                <div className="input-field">
                  <i className="material-icons">person</i>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="Email"
                  />
                </div>
                <input
                  type="submit"
                  value="Submit"
                  className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline solid"
                />
              </form>
            </div>
          </div>

          <div className="panels-container">
            <div className="panel left-panel">
              <div className="content">
                <h3>Dont worry ?</h3>
                <p className="max-w-xs">
                  We will send you the email that will help you to reset your
                  password
                </p>
              </div>
              <Image
                src="/images/img/log.svg"
                width="600px"
                height="600px"
                className="image"
                alt=""
              />
            </div>
            <div className="panel right-panel">
              <div className="content">
                <h3>One of us ?</h3>
                <p>
                  we are happy to see you again! let drive in. click{' '}
                  <b>SIGN IN</b>
                </p>
                <button
                  type="button"
                  className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline transparent"
                  id="sign-in-btn"
                >
                  Sign in
                </button>
              </div>
              <Image
                src="/images/img/register.svg"
                width="600px"
                height="600px"
                className="image"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordActivity;
