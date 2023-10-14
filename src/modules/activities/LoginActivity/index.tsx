import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Signup from '@/components/partials/auth/Signup';
import Login from '@/components/partials/auth/Login';
import ResendToken from './ResendToken';

const LoginActivity = ({ login: loginProps }: { login: boolean }) => {
  const [verifyError, setVerifyError] = useState<any>(null);
  const [login, setLogin] = useState(loginProps);

  const containerRef = useRef<null | Element>(null);
  useEffect(() => {
    const signInBtn = document.querySelector('#sign-in-btn');
    const signUpBtn = document.querySelector('#sign-up-btn');
    const container = document.querySelector('.container');
    containerRef.current = container;
    signUpBtn?.addEventListener('click', () => {
      container?.classList.add('sign-up-mode');
    });

    signInBtn?.addEventListener('click', () => {
      container?.classList.remove('sign-up-mode');
    });
  }, []);
  useEffect(() => {
    if (login) {
      containerRef.current?.classList.remove('sign-up-mode');
    } else {
      containerRef.current?.classList.add('sign-up-mode');
    }
  }, [login, containerRef.current]);

  useEffect(() => {
    setLogin(loginProps);
  }, [loginProps]);
  return (
    <div>
      <div>
        <div className="container mx-auto sm:px-4 container-login">
          <div className="forms-container">
            <div className="signin-signup">
              <Login setVerifyError={setVerifyError} />
              <ResendToken
                userData={verifyError}
                show={!!verifyError}
                onClose={() => setVerifyError(null)}
              />
              <Signup setLogin={setLogin} />
            </div>
          </div>

          <div className="panels-container">
            <div className="panel left-panel">
              <div className="content">
                <h3>New here ?</h3>
                <p>
                  we want to save a status of your game, but can do that when we
                  know you! click <b>sign up</b> to create account
                </p>
                <button
                  type="button"
                  className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline transparent"
                  id="sign-up-btn"
                >
                  Sign up
                </button>
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
              <div className="content mt-10">
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

export default LoginActivity;
