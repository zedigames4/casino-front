import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { Pagination } from 'flowbite-react';
import DashboardAvatars from '@/modules/activities/WalletActivity/partials/DashboardAvatars';
import endpoints from '@/utils/constants/endpoints';
import { useFetcher } from '@/utils/fetcher';
import { WithdrawRequestInterface } from '@/interfaces/withdraw_request.interface';
import RequesterCard1 from '@/modules/activities/_partials/wallet/ReqeusterCard';
import Http from '@/utils/http';
import { StatusEnum } from '@/enum/withdraw_request_status.enum';
import Modal from '@/components/Modal';
import WithdrawRequestList from '@/components/partials/WithdrawRequestList';

const WithDrawRequest = ({ ...props }) => {
  const [selectedWithdrawRequest, setSelectedWithdrawRequest] =
    useState<WithdrawRequestInterface>();
  const [withdrawRequests, setWithdrawRequest] = useState<
    WithdrawRequestInterface[]
  >([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [forceCloseModal, setForceCloseModal] = useState(true);
  const { data: fetchingResponse } = useFetcher(
    `${endpoints.WITHDRAW_REQUESTS}?status=${StatusEnum.PENDING}&page=${pagination.page}`,
  );
  useEffect(() => {
    if (fetchingResponse) {
      const { data: requestData } = fetchingResponse;
      setWithdrawRequest(requestData);
    }
  }, [fetchingResponse]);

  const onApproveRequest = (withdrawR?: WithdrawRequestInterface) => {
    if (!withdrawR) {
      return;
    }
    Http.axios
      .post(`${endpoints.WITHDRAW_REQUESTS}/${withdrawR._id}/decide`, {
        decision: StatusEnum.APPROVED,
      })
      .then(response => {
        const {
          data: { data },
        } = response;
        setSelectedWithdrawRequest(undefined);
        swal('Approved', `withdraw approved`, 'success').catch(err =>
          console.error(err),
        );
        setWithdrawRequest(i => {
          return [
            ...i.map(each => {
              if (each._id === data._id) {
                return { ...each, status: data.status };
              }
              return each;
            }),
          ];
        });
      })
      .catch(error => {
        console.error(error);
        swal(
          'error!',
          error?.response?.data?.message ||
            'something went wrong, please try again later',
          'error',
        ).catch(err => console.error(err));
      });
  };
  return (
    <div className="flex flex-col gap-5 mx-3" {...props}>
      <div className="flex justify-between flex-row">
        <h2 className="font-sans text-2xl"> Withdraw requests </h2>
      </div>
      <div className="flex flex-col gap-5 px-2 py-2 bg-white/10 rounded-2xl">
        <div className="flex justify-between flex-row">
          <h2 className="font-sans"> withdraw request</h2>
          <Modal
            forceCloseOnChange={forceCloseModal}
            header={<div className="text-primary text-xl">Select </div>}
            toggle={
              <button type="button" className="font-sans">
                See All
              </button>
            }
          >
            <div className="flex flex-col items-center gap-5">
              <WithdrawRequestList
                onClick={req => {
                  setSelectedWithdrawRequest(req);
                  setForceCloseModal(i => !i);
                }}
                withdrawRequests={withdrawRequests}
              />
              {pagination.pages <= 1 ? null : (
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
              )}
            </div>
          </Modal>
        </div>
        <DashboardAvatars
          users={withdrawRequests.map(each => {
            return {
              ...each.requester,
              _id: each._id,
            };
          })}
          setActiveUser={(user: any) => {
            setSelectedWithdrawRequest(
              withdrawRequests.find(each => each._id === user._id),
            );
          }}
        />
        <h2 className="font-sans"> Selected user</h2>
        {selectedWithdrawRequest ? (
          <RequesterCard1 withdrawRequest={selectedWithdrawRequest} />
        ) : null}

        <button
          onClick={() => {
            onApproveRequest(selectedWithdrawRequest);
          }}
          disabled={
            !selectedWithdrawRequest ||
            selectedWithdrawRequest?.status === StatusEnum.APPROVED
          }
          type="button"
          className="rounded-2xl disabled:text-white/50  px-5 py-2 disabled:bg-brand-blue-light/50 bg-brand-blue-light text-2xl font-sans self-center mt-5"
        >
          Accept
        </button>
      </div>
    </div>
  );
};
export default WithDrawRequest;
