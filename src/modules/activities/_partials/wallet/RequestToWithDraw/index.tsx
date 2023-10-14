import React, { useEffect, useState } from 'react';
import joi from 'joi';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import swal from 'sweetalert';
import { useProfile } from '@/modules/context/ProfileContext';
import UserCard1 from '@/modules/activities/_partials/wallet/UserCard1';
import { useWallet } from '@/modules/context/WalletContext';
import { formatValue, notationsInterface } from '@/utils/app';
import Http from '@/utils/http';
import endpoints from '@/utils/constants/endpoints';
import { removeQuote } from '@/utils/format';

const RequestToWithDraw = () => {
  const { profile } = useProfile();
  const { wallet } = useWallet();
  const [disableButton, setDisableButton] = useState(true);

  const max = Math.floor(wallet?.balance || 0) || 0;
  const fields: any = {
    amount: joi.number().required().max(max).min(100),
    receiverPhoneNumber: joi
      .string()
      .required()
      .regex(/^07[2389][0-9]{7}$/)
      .messages({
        'object.regex':
          'Invalid telephone number. The number must start with 07, followed by 2, 3, 8 or 9, and must be 10 digits long.',
        'string.pattern.base':
          'Invalid telephone number. The number must start with 07, followed by 2, 3, 8 or 9, and must be 10 digits long.',
      }),
  };
  const schema = joi.object(fields);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });
  useEffect(() => {
    if (!wallet) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [wallet]);

  const watchedAmount = watch('amount', 'defaultValue');

  useEffect(() => {
    if (watchedAmount) {
      if ((wallet?.balance || 0) < watchedAmount) {
        setDisableButton(true);
      } else {
        setDisableButton(false);
      }
    } else {
      setDisableButton(true);
    }
  }, [watchedAmount]);
  const onSubmit = (query: any) => {
    Http.axios
      .post(endpoints.WITHDRAW_REQUESTS, query)
      .then(() => {
        swal('Request send!', 'Keep checking the status ', 'success').catch(
          (err: any) => {
            console.error(err);
          },
        );
      })
      .catch(error => {
        console.error(error);
        swal(
          'Opps, Something went wrong!',
          error?.response?.data?.message || 'please Try again later!',
          'error',
        ).catch((err: any) => {
          console.error(err);
        });
      });
  };
  return (
    <div className="flex flex-col gap-5 mx-3">
      <div className="flex justify-between flex-row">
        <h2 className="font-sans text-2xl"> Withdraw Request</h2>
      </div>

      <div className="flex flex-col gap-5 px-2 py-2 bg-white/10 rounded-2xl">
        <div id="active_user_account" className="flex gap-2 ">
          <UserCard1 user={profile} />
        </div>
        <form
          onSubmit={event => {
            handleSubmit(onSubmit)(event);
          }}
          className="w-full flex flex-col gap-2 items-start px-0"
        >
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="font-sans">Insert Amount</label>
          <input
            id="id_e2"
            type="number"
            className="self-center placeholder-black/50 text-black bg-white/90 rounded-xl text-center border-2 border-brand-blue-light text-3xl w-full"
            placeholder="000000"
            {...register('amount')}
          />
          {errors.amount?.message && (
            <p className="mt-1 text-red-500 max-w-sm">
              {removeQuote(`${errors.amount.message}`)}
            </p>
          )}
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="font-sans">Receiver phone number</label>
          <input
            id="id_e22"
            type="tel"
            className="self-center placeholder-black/50 text-black bg-white/90 rounded-xl text-center border-2 border-brand-blue-light text-3xl w-full"
            placeholder="07.."
            {...register('receiverPhoneNumber')}
          />

          {errors.receiverPhoneNumber?.message && (
            <p className="mt-1 text-red-500 max-w-sm">
              {removeQuote(`${errors.receiverPhoneNumber.message}`)}
            </p>
          )}
          <div className="flex gap-2 justify-between w-full">
            <span className="font-sans text-white/30">Your Balance</span>
            <span className="font-sans text-white/30">
              {formatValue(
                wallet?.balance || 0,
                notationsInterface.standard,
                7,
              )}
            </span>
          </div>
          <button
            disabled={disableButton}
            type="submit"
            className="rounded-2xl disabled:text-white/50 px-5 py-2 disable:bg-brand-blue-light/50 bg-brand-blue-light text-2xl font-sans self-center mt-5"
          >
            Request Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestToWithDraw;
