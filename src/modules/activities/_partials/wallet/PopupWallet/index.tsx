import React, { useEffect, useState } from 'react';
import joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { Modal } from 'flowbite-react';
import { formatValue, notationsInterface } from '@/utils/app';
import { useWallet } from '@/modules/context/WalletContext';
import { removeQuote } from '@/utils/format';
import Http from '@/utils/http';
import endpoints from '@/utils/constants/endpoints';
import { useSocket } from '@/modules/context/SocketContext';
import PaymentPending from '@/modules/activities/_partials/wallet/paymentStatus/PaymentPending';
import PaymentSuccess from '@/modules/activities/_partials/wallet/paymentStatus/PaymentSuccess';
import PaymentError from '@/modules/activities/_partials/wallet/paymentStatus/PaymentError';

enum paymentStatus {
  PENDING = 'PENDING',
  ERROR = 'ERROR',
  DONE = 'DONE',
}
const fields: any = {
  telephoneNumber: joi
    .string()
    .required()
    .regex(/^07[2389][0-9]{7}$/)
    .messages({
      'string.empty': 'Please enter a telephone number.',
      'object.regex':
        'Invalid telephone number. The number must start with 07, followed by 2, 3, 8 or 9, and must be 10 digits long.',
      'string.pattern.base':
        'Invalid telephone number. The number must start with 07, followed by 2, 3, 8 or 9, and must be 10 digits long.',
    }),
  amount: joi.number().required().min(1000),
};
const schema = joi.object(fields);
const PopupWallet = () => {
  const { wallet, refreshWallet } = useWallet();
  const { socket } = useSocket();
  const [transactionId, setTransactionId] = useState<string>('');
  const [transactionsStatus, setTransactionsStatus] = useState<any>({});
  const [showingModal, setShowingModal] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });

  useEffect(() => {
    if (!socket || !transactionId) return;
    socket.on(`payment:done:${transactionId}` as string, data => {
      refreshWallet();
      setTransactionsStatus((prevState: any) => {
        return {
          ...prevState,
          [transactionId]: paymentStatus.DONE,
        };
      });
    });

    socket.on(`payment:error:${transactionId}` as string, data => {
      setTransactionsStatus((prevState: any) => {
        return {
          ...prevState,
          [transactionId]: paymentStatus.ERROR,
        };
      });
    });
  }, [socket, transactionId]);
  useEffect(() => {
    if (!transactionsStatus[transactionId]) {
      return;
    }
    setShowingModal(true);
  }, [transactionsStatus]);
  const onSubmit = (query: any) => {
    const { telephoneNumber: phone, ...others } = query;
    const data = {
      ...others,
      telephoneNumber: `25${phone}`,
      description: 'Pay',
    };
    Http.axios
      .post(endpoints.TRANSFER_OLTRANZ, data)
      .then(response => {
        const {
          data: { data: result, referenceId },
        } = response;
        console.warn('referenceId is :', referenceId);
        if (result.code === '200' && result.status === 'PENDING') {
          setTransactionId(referenceId);
          setTransactionsStatus((prevState: any) => {
            return {
              ...prevState,
              [referenceId]: paymentStatus.PENDING,
            };
          });
          // swal(
          //   'Check you phone',
          //   'Call *182*7*1# to complete transaction',
          //   'success',
          // ).catch((err: any) => {
          //   console.error(err);
          // });
        } else {
          console.error(result);
          swal(
            'Opps, Something is not well!',
            result.description || 'please contact us',
            'warning',
          ).catch((err: any) => {
            console.error(err);
          });
        }
      })
      .catch(error => {
        console.error(error);
        swal(
          'Opps, Something went wrong!',
          error?.response?.data?.message || 'please contact us',
          'error',
        ).catch((err: any) => {
          console.error(err);
        });
      });
  };
  return (
    <div className="flex flex-col gap-5 mx-3">
      <div className="flex justify-between flex-row">
        <h2 className="font-sans text-2xl"> Top up Balance</h2>
      </div>
      <div className="flex flex-col gap-5 px-2 py-2 bg-white/10 rounded-2xl">
        <form
          onSubmit={event => {
            handleSubmit(onSubmit)(event);
          }}
          className="w-full flex flex-col gap-2 items-start px-0"
        >
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="id_e22" className="font-sans">
            Phone
          </label>
          <input
            id="id_e22"
            type="tel"
            className="self-center placeholder-black/50 text-black bg-white/90 rounded-xl text-center border-2 border-brand-blue-light text-3xl w-full"
            placeholder="07.."
            {...register('telephoneNumber')}
          />
          {errors.telephoneNumber?.message && (
            <p className="mt-1 text-red-500 max-w-sm">
              {removeQuote(`${errors.telephoneNumber.message}`)}
            </p>
          )}
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="id_e3" className="font-sans">
            Amount
          </label>
          <input
            id="id_e3"
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
            type="submit"
            className="rounded-2xl text-white px-5 py-2 bg-brand-blue-light text-2xl font-sans self-center mt-5"
          >
            Top up
          </button>
        </form>
      </div>
      <Modal onClose={() => setShowingModal(false)} popup show={showingModal}>
        <Modal.Header>
          <h2>Payment status</h2>
        </Modal.Header>
        <Modal.Body>
          <div className="py-12 px-12 flex flex-col gap-3">
            {transactionsStatus[transactionId as string] ===
            paymentStatus.PENDING ? (
              <PaymentPending />
            ) : null}
            {transactionsStatus[transactionId as string] ===
            paymentStatus.ERROR ? (
              <PaymentError />
            ) : null}
            {transactionsStatus[transactionId as string] ===
            paymentStatus.DONE ? (
              <PaymentSuccess />
            ) : null}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PopupWallet;
