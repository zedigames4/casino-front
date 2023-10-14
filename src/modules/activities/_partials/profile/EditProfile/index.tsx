import React, { useState } from 'react';
import swal from 'sweetalert';
import Constants from '@/utils/constants';
import Modal from '@/components/Modal';
import { UserProfileInterface } from '@/interfaces/profile.interface';
import Http from '@/utils/http';
import EditUserForm from '@/modules/activities/_partials/users/EditUserForm';

/* @params children as modal toggle*/
const EditProfile = ({
  children,
  user,
  updateUser,
}: {
  children: any;
  user?: UserProfileInterface | null;
  updateUser?: (user: UserProfileInterface) => void;
}) => {
  const [toggleModalOnChange, setToggleModalOnChange] = useState(false);

  const editProfile = (query: any) => {
    if (query.password === '') {
      delete query.password;
    }
    Http.axios
      .put(`${Constants.endpoints.PROFILE}`, { ...query })
      .then(response => {
        const {
          data: { data },
        } = response;

        swal(
          'Profile updated successful!',
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
  const onSubmit = async (query: any) => {
    editProfile(query);
  };
  return (
    <Modal
      forceCloseOnChange={toggleModalOnChange}
      toggle={children}
      header={
        <div className="flex gap-5">
          <h3 className="text-3xl text-black font-semibold">Edit profile</h3>
        </div>
      }
    >
      <div className="flex items-center w-full py-4 z-60">
        <EditUserForm isProfile user={user} onSubmit={onSubmit} />
      </div>
    </Modal>
  );
};

EditProfile.defaultProps = {
  user: undefined,
  updateUser: null,
};
export default EditProfile;
