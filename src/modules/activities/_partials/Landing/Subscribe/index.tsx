import React from 'react';
import joi from 'joi';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';
import swal from 'sweetalert';
import Constants from '@/utils/constants';
import { removeQuote } from '@/utils/format';

const subscribeSchema = joi.object({
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required()
    .label('Email'),
});
const Subscribe = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(subscribeSchema),
  });

  const submit = async (query: any) => {
    axios
      .post(Constants.BACKEND_URL + Constants.endpoints.ADDING_SUBSCRIBER, {
        ...query,
      })
      .then(response => {
        swal(
          'Subscribed',
          response.data.message || 'you subscribe to the zaddi news',
          'success',
        );
      })
      .catch(error => {
        console.error(error);
        swal(
          'error!',
          error.response.data.message ||
            'something went wrong, please try again later',
          'error',
        );
      });
  };
  return (
    <div className="flex flex-col px-4 md:px-8 mt-12 -translate-y-32">
      <div className="flex md:px-12 py-10 flex-col items-center rounded-[30px] bg-[#310E9E] p-3">
        <h1 className="flex flex-col md:leading-loose items-center text-2xl md:text-5xl font-black tracking-wide ">
          <span>WANT GAMING NEWS</span>
          <span>STRAIGHT TO YOUR INBOX?</span>
        </h1>

        <form
          onSubmit={event => {
            handleSubmit(submit)(event);
          }}
          className="w-full flex flex-col"
        >
          <div className="mt-4 flex rounded-full bg-white p-2 w-full max-w-4xl">
            <input
              type="email"
              placeholder="Enter your email address..."
              className="w-full py-3 rounded-l-full text-black focus:outline-none outline-none px-4 md:px-6"
              {...register('email')}
            />

            <button
              type="submit"
              className="flex items-center space-x-1 uppercase font-semibold rounded-full bg-[#4E01CD] py-3 px-4 md:px-12"
            >
              <span className="hidden md:block">Subscribe</span>
              <span className="material-icons">arrow_forward</span>
            </button>
          </div>
          {errors.email?.message && (
            <p className="text-xs mt-1 text-red-500 w-full max-w-4xl">
              {removeQuote(errors.email?.message as string)}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
