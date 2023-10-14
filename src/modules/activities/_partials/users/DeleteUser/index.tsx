import { ReactNode } from 'react';
import swal from 'sweetalert';
import Http from '@/utils/http';
import Constants from '@/utils/constants';

const DeleteUser = ({
  children,
  id,
  onComplete,
}: {
  children: ReactNode;
  id: string;
  onComplete?: () => void;
}) => {
  function deleteUser() {
    swal({
      title: ' Are you sure?',
      text: 'We are about to user, click "yes" if you are aware ',
      icon: 'warning',
      buttons: ['No', 'Yes'],
      dangerMode: true,
    }).then(isConfirm => {
      if (isConfirm) {
        Http.axios
          .delete(`${Constants.endpoints.USERS}/${id}`)
          .then(response => {
            const {
              data: { data, message },
            } = response;
            swal({
              title: `${message}`,
              text: `Deleting ${data.firstName}  complete successfully !`,
              icon: 'success',
            }).then(() => {
              if (onComplete) {
                onComplete();
              }
            });
          })
          .catch(error => {
            console.error(error);
            swal(
              'Delete Fail',
              `Deleting fail, try agail later !`,
              'error',
            ).catch(err => console.error(err));
          });
      } else {
        swal('Cancelled', 'Do it when you are ready :)', 'error').catch(err =>
          console.error(err),
        );
      }
    });
  }
  return (
    <button className="w-full" onClick={() => deleteUser()} type="button">
      {children}
    </button>
  );
};

DeleteUser.defaultProps = {
  onComplete: undefined,
};
export default DeleteUser;
