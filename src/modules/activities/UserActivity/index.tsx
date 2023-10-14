import React, { useEffect, useState } from 'react';
import { Pagination } from 'flowbite-react';
import { useRouter } from 'next/router';
import UserList from '@/modules/activities/UserActivity/partials/UserList';
import Http from '@/utils/http';
import endpoints from '@/utils/constants/endpoints';
import { UserProfileInterface } from '@/interfaces/profile.interface';
import RoundedMaterialBtn from '@/modules/activities/UserActivity/partials/RoundedMaterialBtn';
import AddOrEditUser from '@/modules/activities/_partials/users/AddOrEditUser';
import DeleteUser from '@/modules/activities/_partials/users/DeleteUser';
import VerifyUser from '@/modules/activities/_partials/users/VerifyUser';
import { useFetcher } from '@/utils/fetcher';
import Search from '@/modules/activities/UserActivity/partials/Search';

const UserManagement = ({
  user: eachUser,
  onRemoveUser: removeUser,
  onUpdateUser: updateUser,
}: {
  user: any;
  onRemoveUser?: (id: string) => void;
  onUpdateUser?: (user: UserProfileInterface) => void;
}) => {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <DeleteUser
        id={eachUser._id}
        onComplete={() => {
          if (removeUser) {
            removeUser(eachUser._id);
          }
        }}
      >
        <span className="flex gap-3 text-red-700 rounded-2xl px-2 items-center hover:bg-red-200 w-full">
          <span className="material-icons p-2 rounded-2xl">delete</span>
          Delete
        </span>
      </DeleteUser>

      {eachUser.verified ? null : (
        <VerifyUser onComplete={updateUser} id={eachUser._id}>
          <span className="flex gap-3 rounded-2xl px-2 items-center hover:bg-primary">
            <span className="material-icons p-2 rounded-2xl">done</span>
            Validate
          </span>
        </VerifyUser>
      )}
      <AddOrEditUser updateUser={updateUser} user={eachUser}>
        <span className="flex gap-3 rounded-2xl px-2 items-center hover:bg-primary">
          <span className="material-icons p-2 rounded-2xl">edit</span>
          Edit
        </span>
      </AddOrEditUser>
    </div>
  );
};
UserManagement.defaultProps = {
  onRemoveUser(id: string) {},
  onUpdateUser(user: UserProfileInterface) {},
};
const UserActivity = () => {
  const [users, setUsers] = useState<UserProfileInterface[]>([]);
  const [verifiedCount, setVerifiedCount] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const route = useRouter();
  useEffect(() => {
    const verified = users.reduce((previousValue, currentValue) => {
      return previousValue + (currentValue.verified ? 1 : 0);
    }, 0);
    setVerifiedCount(verified);
  }, [users]);
  const { data: fetchingResponse, isLoading } = useFetcher(
    `${endpoints.USERS}?page=${pagination.page}&search=${searchText}`,
  );
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

  const updateUser = (editedUser: UserProfileInterface) => {
    setUsers(i => {
      return i.map(each => {
        if (each._id === editedUser._id) {
          return {
            ...editedUser,
            createdAt: new Date(editedUser.createdAt),
            updatedAt: new Date(editedUser.updatedAt),
          };
        }
        return each;
      });
    });
  };

  const addUser = (user: UserProfileInterface) => {
    setUsers(i => [...i, user]);
  };

  const removeUser = (id: string) => {
    setUsers(each => [...each.filter(user => user._id !== id)]);
  };
  function viewProfile(id: string) {
    route.push(`/profile?id=${id}`).catch(e => console.error(e));
  }
  return (
    <div className="text-white flex flex-col gap-10 pt-10">
      <div className="rounded-2xl flex flex-wrap justify-between px-10 py-6 bg-[#270B71]">
        <RoundedMaterialBtn
          iconName="group"
          title="Total user"
          value={users.length}
        />
        <RoundedMaterialBtn
          iconName="person"
          title="Clients"
          value={users.length}
        />
        <RoundedMaterialBtn iconName="person_off" title="Disabled" value={0} />
        <RoundedMaterialBtn
          iconName="verified"
          title="Verified"
          value={verifiedCount}
        />
      </div>

      <div className="flex justify-between flex-wrap">
        <h4 className="font-sans text-2xl">Users</h4>
        <Search setSearchText={setSearchText} isLoading={isLoading} />

        <div className="flex gap-5 mr-10">
          {/* <select className="px-7 py-2 rounded-2xl font-sans bg-transparent border-white border-2"> */}
          {/*   <option className="font-sans text-black">Newest</option> */}
          {/*   <option className="font-sans text-black">Oldest</option> */}
          {/* </select> */}
          <AddOrEditUser addUser={addUser}>
            <span className="font-sans bg-brand-bold px-5 py-2 rounded-2xl">
              Add user
            </span>
          </AddOrEditUser>
        </div>
      </div>

      <UserList
        onClick={user => {
          viewProfile(user._id);
        }}
        Actions={UserManagement}
        updateUser={updateUser}
        removeUser={removeUser}
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
  );
};

export default UserActivity;
