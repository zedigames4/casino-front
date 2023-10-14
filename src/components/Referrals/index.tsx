import React, { useEffect, useState } from 'react';
import { Pagination } from 'flowbite-react';
import { UserProfileInterface } from '@/interfaces/profile.interface';
import { useFetcher } from '@/utils/fetcher';
import endpoints from '@/utils/constants/endpoints';
import UsersListCards from '@/modules/activities/UserActivity/partials/UsersListCards';

const Referrals = ({
  userId,
  onSingleClick,
  ...others
}: {
  userId?: string;
  id?: string;
  onSingleClick?: (user: UserProfileInterface) => void;
  className?: string;
}) => {
  const [users, setUsers] = useState<UserProfileInterface[]>([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });

  const { data: fetchingResponse, isLoading } = useFetcher(
    `${endpoints.USERS}/${userId}/referrals?page=${pagination.page}`,
  );

  useEffect(() => {
    if (!fetchingResponse) {
      return;
    }
    const { data } = fetchingResponse;
    setUsers(
      data.map((each: any) => ({
        ...each,
        createdAt: new Date(each.createdAt),
      })),
    );
  }, [fetchingResponse]);
  return (
    <div {...others}>
      <h2 className="text-white text-3xl">Referrals</h2>
      <div className="flex flex-col gap-2 items-center overflow-y-auto h-full">
        <UsersListCards onClick={onSingleClick} users={users} />
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
    </div>
  );
};

Referrals.defaultProps = {
  userId: undefined,
  id: undefined,
  className: '',
  onSingleClick() {},
};
export default Referrals;
