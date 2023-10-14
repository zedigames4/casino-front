import React, { useEffect, useState } from 'react';
import joi from 'joi';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import swal from 'sweetalert';
import { Pagination } from 'flowbite-react';
import { WalletInterface } from '@/interfaces/wallet.interface';
import { formatValue, notationsInterface } from '@/utils/app';
import UserCard1 from '@/modules/activities/_partials/wallet/UserCard1';
import endpoints from '@/utils/constants/endpoints';
import { UserProfileInterface } from '@/interfaces/profile.interface';
import { useFetcher } from '@/utils/fetcher';
import UserAvatars2 from '@/modules/activities/WalletActivity/partials/UserAvatars2';
import Http from '@/utils/http';
import Modal from '@/components/Modal';
import UserList from '@/modules/activities/UserActivity/partials/UserList';
import Search from '@/modules/activities/UserActivity/partials/Search';

const QuickTransfer = ({
  wallet,
  setWallet,
}: {
  wallet?: WalletInterface;
  setWallet: React.Dispatch<React.SetStateAction<WalletInterface | undefined>>;
}) => {
  const [users, setUsers] = useState<UserProfileInterface[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserProfileInterface>();
  const [transferAmountError, setTransferAmountError] = useState('');
  const fetchLimit = 10;
  const [disableButton, setDisableButton] = useState(true);
  const [closeUserSelector, setCloseUserSelector] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [searchText, setSearchText] = useState('');
  const max = Math.floor(wallet?.balance || 0) || 0;
  const fields: any = {
    amount: joi.number().required().max(max),
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
  const { data: fetchingResponse, isLoading } = useFetcher(
    `${endpoints.USERS}?page=${pagination.page}&limit=${fetchLimit}&search=${searchText}`,
  );
  useEffect(() => {
    if (selectedUser) {
      setDisableButton(true);
    }
  }, [selectedUser]);
  useEffect(() => {
    if (fetchingResponse) {
      const { data, pagination: pg } = fetchingResponse;
      setPagination(pg);
      setUsers([
        ...data.map((each_: any) => {
          return {
            ...each_,
            createdAt: new Date(each_.createdAt),
            updatedAt: new Date(each_.updatedAt),
          };
        }),
      ]);
    }
  }, [fetchingResponse]);
  const validateAmountToTransfer = (value: any) => {
    try {
      if ((wallet ? wallet.balance : 0) < Number(value)) {
        setTransferAmountError('your exceed your wallet!');
      } else {
        setTransferAmountError('');
      }
    } catch (er) {
      console.error(er);
    }
  };

  const watchedAmount = watch('amount', 'defaultValue');

  useEffect(() => {
    if (watchedAmount) {
      validateAmountToTransfer(watchedAmount);
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
      .post(endpoints.TRANSFER, { ...query, receiver: selectedUser?._id })
      .then(response => {
        const {
          data: { data },
        } = response;
        if (setWallet) {
          setWallet((i: any) => {
            if (!i) {
              return {};
            }
            return {
              ...i,
              balance: i.balance - data.amount,
            };
          });
        }

        swal(
          'Transfer successful!',
          ` you have transferred ${data.amount} RWF`,
          'success',
        ).catch((err: any) => {
          console.error(err);
        });
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
        <h2 className="font-sans text-2xl"> Quick Transfer</h2>
      </div>

      <div className="flex flex-col gap-5 px-2 py-2 bg-white/10 rounded-2xl">
        {selectedUser ? <UserCard1 user={selectedUser} /> : null}

        <div className="flex justify-between flex-row">
          <h2 className="font-sans"> Users</h2>
          <Modal
            forceCloseOnChange={closeUserSelector}
            header={
              <div className="text-primary flex items-center justify-center">
                <span>Select user</span>
                <Search
                  setSearchText={setSearchText}
                  defaultValue={searchText}
                  isLoading={isLoading}
                />
              </div>
            }
            toggle={<span className="font-sans">See All</span>}
          >
            <div className="flex flex-col gap-2 items-center overflow-y-auto h-full">
              <UserList
                onClick={user => {
                  setSelectedUser(user);
                  setCloseUserSelector(i => !i);
                }}
                users={users}
              />
              <Pagination
                currentPage={pagination.page}
                onPageChange={newPage => {
                  setPagination(i => {
                    return {
                      ...i,
                      page: newPage,
                    };
                  });
                }}
                showIcons
                totalPages={pagination.pages}
                className="mx-auto flex"
              />
            </div>
          </Modal>
        </div>
        <div className="overflow-x-auto scrollbar">
          <UserAvatars2
            setActiveUser={(user: any) => {
              setSelectedUser(user);
            }}
            users={users as any[]}
          />
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
            className="self-center bg-transparent text-center border-b-2 border-b-brand-blue-light text-3xl w-full"
            placeholder="000000"
            {...register('amount')}
          />
          <span className="text-red-900">{transferAmountError}</span>
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
            className="rounded-2xl disabled:text-white/50 px-5 py-2 disabled:bg-brand-blue-light/50 bg-brand-blue-light text-2xl font-sans self-center mt-5"
          >
            Transfer Now
          </button>
        </form>
      </div>
    </div>
  );
};

QuickTransfer.defaultProps = {
  wallet: undefined,
};

export default QuickTransfer;
