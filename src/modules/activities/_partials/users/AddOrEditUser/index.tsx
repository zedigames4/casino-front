import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import Constants from '@/utils/constants';
import Modal from '@/components/Modal';
import { getHeaders } from '@/utils/constants/config';
import { UserProfileInterface } from '@/interfaces/profile.interface';
import DeleteUser from '@/modules/activities/_partials/users/DeleteUser';
import Http from '@/utils/http';
import EditUserForm from '@/modules/activities/_partials/users/EditUserForm';

/* @params children as modal toggle*/
const AddOrEditUser = ({
  removeUser,
  addUser,
  children,
  user,
  updateUser,
}: {
  removeUser?: undefined | (() => void);
  addUser?: undefined | ((a: UserProfileInterface) => void);
  children: any;
  user?: UserProfileInterface | null;
  updateUser?: (user: UserProfileInterface) => void;
}) => {
  const [toggleModalOnChange, setToggleModalOnChange] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (user) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  }, [user]);
  const editUser = (query: any) => {
    if (query.password === '') {
      delete query.password;
    }
    Http.axios
      .put(`${Constants.endpoints.USERS}/${user?._id}`, { ...query })
      .then(response => {
        const {
          data: { data },
        } = response;

        swal(
          'USER updated successful!',
          `${data?.firstName} is updated`,
          'success',
        ).then(() => {
          setToggleModalOnChange(i => !i);
        });
        if (updateUser) {
          updateUser({ ...data });
        }
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
  const saveNewUser = (query: any) => {
    axios
      .post(
        Constants.BACKEND_URL + Constants.endpoints.USERS,
        { ...query },
        getHeaders(),
      )
      .then(response => {
        const {
          data: { data },
        } = response;

        swal(
          'User created successful!',
          `${data?.firstName} is created`,
          'success',
        ).then(() => {
          setToggleModalOnChange(i => !i);
        });
        if (addUser) {
          addUser({
            ...data,
            createdAt: new Date(data.createdAt),
            updatedAt: new Date(data.updatedAt),
          });
        }
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
  const onSubmit = async (query: any) => {
    if (edit) {
      editUser(query);
    } else {
      saveNewUser(query);
    }
  };
  return (
    <Modal
      forceCloseOnChange={toggleModalOnChange}
      toggle={children}
      header={
        <div className="flex gap-5">
          {edit && (
            <DeleteUser
              onComplete={() => {
                setToggleModalOnChange(i => !i);
                if (removeUser) {
                  removeUser();
                }
              }}
              id={user?._id || ''}
            >
              <span className="material-icons text-red-700 rounded-2xl p-2 bg-red-300">
                delete
              </span>
            </DeleteUser>
          )}
          <h3 className="text-3xl text-black font-semibold">
            {edit ? 'Edit' : 'Create'} user
          </h3>
        </div>
      }
    >
      <div className="flex items-center w-full py-4 z-60">
        <EditUserForm
          actionName={edit ? 'Edit' : 'Create'}
          user={user}
          onSubmit={onSubmit}
        />
      </div>
    </Modal>
  );
};

AddOrEditUser.defaultProps = {
  removeUser: undefined,
  addUser: undefined,
  user: undefined,
  updateUser: null,
};
export default AddOrEditUser;
