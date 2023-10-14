import React from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import joi from 'joi';
import { useAuth } from '@/modules/context/AuthContext';
import Http from '@/utils/http';

const ContactActivity = () => {
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [successMessage, setSuccessMessage] = React.useState(null);
  const { user } = useAuth();

  const formFields = {
    message: joi.string().required(),
  };
  if (!user) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    formFields.email = joi.string().required();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    formFields.name = joi.string().required();
  }
  const schema: any = joi.object(formFields).required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });

  const onSubmit = async (data: any) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);
    if (user) {
      data = { ...data, ...user };
    }
    await Http.axios
      .post('/api/v1/contacts', data)
      .then(response => {
        if (response.status === 201 || response.status === 200) {
          reset();
          setSuccessMessage(
            response?.data?.message || 'Thank you for contact us !',
          );
        } else {
          setErrorMessage(
            response?.data?.message || 'Something bad happed! try again later ',
          );
        }
      })
      .catch(result => {
        const error = result.response?.data || result.response || result;
        setErrorMessage(error?.message || 'Something went wrong, try again');
      });
    setLoading(false);

    setTimeout(() => {
      setSuccessMessage(null);
      setErrorMessage(null);
    }, 5000);
  };
  const ourContacts = {
    lacation: 'Kigali Rwanda, Building',
    email: 'info@zeddi.rw',
    call: '+250 788 204 315',
    open_ours: 'Mon-Sat: 11AM - 23PM',
  };
  return (
    <div className="flex flex-col w-full relative -translate-y-24 md:pb-12">
      <div className="flex flex-col z-50">
        <h1 className="text-dark-green text-2xl md:text-4xl px-5 self-center font-bold tracking-wide">
          Contact us
        </h1>
        <div className="flex justify-around flex-col md:flex-row pt-20 px-6">
          <div className=" flex gap-4 flex-col self-center">
            <div className="hover:opacity-80 flex gap-2 items-center  rounded-lg px-3 py-2 font-bold">
              <span className="material-icons text-brand-bold relative">
                phone
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-[#5A6980]">Phone</span>
                <span className="text-[#7E92B2]">{ourContacts.call}</span>
              </span>
            </div>
            <div className="hover:opacity-80 flex gap-2 items-center  rounded-lg px-3 py-2 font-bold">
              <span className="material-icons text-brand-bold">email</span>
              <span className="flex flex-col gap-1">
                <span className="text-[#5A6980]">Email</span>
                <span className="text-[#7E92B2]">{ourContacts.email}</span>
              </span>
            </div>
            <div className="hover:opacity-80 flex gap-2 items-center  rounded-lg px-3 py-2 font-bold">
              <span className="material-icons  text-brand-bold">place</span>
              <span className="flex flex-col gap-1">
                <span className="text-[#5A6980]">Location</span>
                <span className="text-[#7E92B2]">{ourContacts.lacation}</span>
              </span>
            </div>
          </div>

          <div className="from-brand-bold/70 bg-gradient-to-br w-full max-w-2xl rounded-2xl border-2 border-brand-bold">
            <form
              onSubmit={event => {
                handleSubmit(onSubmit)(event);
              }}
              className="items-center flex-grow h-full flex flex-col p-4 md:p-8 w-full"
            >
              {errorMessage ? (
                <div className="mt-3 flex flex-col items-center rounded-lg bg-red-500 px-4 py-3 ">
                  <p className="text-white text-sm first-letter:uppercase">
                    {errorMessage}
                  </p>
                </div>
              ) : null}
              {successMessage ? (
                <div className="mt-3 flex flex-col items-center rounded-lg bg-green-500 px-4 py-3  self-center">
                  <p className="text-white text-sm first-letter:uppercase">
                    {successMessage}
                  </p>
                </div>
              ) : null}

              <div className="pt-6 flex flex-col max-w-4xl gap-3 w-full flex-wrap items-center">
                {user ? null : (
                  <div className="relative flex items-center rounded-full  w-full">
                    <span className="material-icons text-[#7E92B2] absolute left-2">
                      person
                    </span>
                    <input
                      type="text"
                      {...register('name')}
                      placeholder="Write your Name"
                      className="rounded-full placeholder-[#7E92B2] border border-white py-3 px-4 w-full pl-9"
                    />
                    <p className="text-red-500 text-xs mt-1" />
                  </div>
                )}

                {user ? null : (
                  <div className="relative flex items-center rounded-full  w-full mt-2">
                    <span className="material-icons text-[#7E92B2] absolute left-2">
                      mail
                    </span>
                    <input
                      type="email"
                      {...register('email')}
                      placeholder="Write your Email"
                      className="flex-grow placeholder-[#7E92B2] rounded-full border border-white py-3 px-4 w-full pl-9"
                    />
                    <p className="text-red-500 text-xs mt-1" />
                  </div>
                )}
                <div className="relative flex  rounded-full  w-full mt-2">
                  <span className="material-icons text-[#7E92B2] absolute left-2 self-start mt-4">
                    edit
                  </span>
                  <textarea
                    {...register('message')}
                    id=""
                    rows={4}
                    placeholder="Write your Messages..."
                    className="text-black resize-none placeholder-[#7E92B2] rounded-3xl border border-white py-3 px-4 w-full pl-9"
                  />
                  <p className="text-red-500 text-xs mt-1" />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-white disabled:cursor-not-allowed disabled:opacity-25 text-base font-bold border-2 py-1 tracking-wide rounded-full mt-6 self-stretch"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactActivity;
