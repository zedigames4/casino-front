import React, { useEffect, useState } from 'react';
import endpoints from '@/utils/constants/endpoints';
import { useFetcher } from '@/utils/fetcher';
import { useProfile } from '@/modules/context/ProfileContext';
import { WithdrawRequestInterface } from '@/interfaces/withdraw_request.interface';
import RequestView1 from '@/components/partials/dashboard/RequestView1';
import ArrowPagination from '@/components/ArrowPagination';

const MyWithdrawRequests = () => {
  const [withdrawRequests, setWithdrawRequests] = useState<
    WithdrawRequestInterface[]
  >([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const { profile } = useProfile();
  const { data: fetchingResponse } = useFetcher(
    `${endpoints.WITHDRAW_REQUESTS}?page=${pagination.page}&userId=${profile?._id}`,
  );
  useEffect(() => {
    if (fetchingResponse) {
      const { data, pagination: pg } = fetchingResponse;
      setWithdrawRequests(data);
      setPagination(pg);
    }
  }, [fetchingResponse]);
  return (
    <div className="flex flex-col gap-5 mx-3">
      <ArrowPagination
        currentPage={pagination.page}
        totalPages={pagination.pages}
        onPageChange={page => {
          setPagination(i => {
            return {
              ...i,
              page,
            };
          });
        }}
      >
        <h2 className="font-sans"> My withdraw requests</h2>
      </ArrowPagination>
      <div className="flex flex-col gap-2">
        {withdrawRequests.map(each => {
          return (
            <React.Fragment key={each._id}>
              <RequestView1 withdrawRequest={each} />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default MyWithdrawRequests;
