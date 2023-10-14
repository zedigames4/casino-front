import React from 'react';
import swal from 'sweetalert';
import Http from '@/utils/http';
import Constants from '@/utils/constants';

const UploadAvatar = ({
  children,
  onUpload,
}: {
  children: React.ReactNode;
  onUpload: (avatarURL: string) => void;
}) => {
  const onUpdateAvatar = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.click();
    input.addEventListener('change', event => {
      // access selected file using `this.files[0]`
      const formData = new FormData();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (!input?.files[0]) {
        return;
      }
      formData.append('avatar', input.files[0]);
      Http.axios
        .put(`${Constants.endpoints.PROFILE}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(response => {
          const {
            data: { data },
          } = response;
          onUpload(data.avatar);
          swal(
            'Profile updated successful!',
            `${data?.firstName} is updated`,
            'success',
          ).catch(error => console.error(error));
          // if (updateUser) {
          //   updateUser({ ...data });
          // }
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
    });
  };
  return (
    <button
      onClick={() => {
        onUpdateAvatar();
      }}
      type="button"
    >
      {children}
    </button>
  );
};

export default UploadAvatar;
