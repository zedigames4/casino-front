import { ReactNode } from 'react';
import swal from 'sweetalert';
import Http from '@/utils/http';
import Constants from '@/utils/constants';
import { UserProfileInterface } from '@/interfaces/profile.interface';

const VerifyUser = ({
  children,
  id,
  onComplete,
}: {
  children: ReactNode;
  id: string;
  onComplete?: (user: UserProfileInterface) => void;
}) => {
  const verifyUser = () => {
    swal({
      title: ' Are you sure?',
      text: 'We are about to verify user, click "yes" if you are aware ',
      icon: 'warning',
      buttons: ['No', 'Yes'],
      dangerMode: true,
    }).then(isConfirm => {
      if (isConfirm) {
        Http.axios
          .put(`${Constants.endpoints.USERS}/${id}`, { verified: true })
          .then(response => {
            const {
              data: { data },
            } = response;

            swal(
              'USER verified successful!',
              `${data?.firstName} is verified`,
              'success',
            ).catch(er => console.error(er));
            if (onComplete) {
              onComplete({ ...data });
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
      }
    });
  };

  return (
    <button
      onClick={() => {
        verifyUser();
      }}
      type="button"
    >
      {children}
    </button>
  );
};

VerifyUser.defaultProps = {
  onComplete: undefined,
};
export default VerifyUser;
