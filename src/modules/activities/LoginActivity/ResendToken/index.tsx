import { Toast, Button, Modal } from 'flowbite-react';
import React from 'react';
import Http from '@/utils/http';

const ResendToken = ({ show = false, userData = null, onClose = () => {} }) => {
  const [isReady, setReady] = React.useState(false);
  const [resultMessage, setResultMessage] = React.useState<string | null>(null);
  const onResendToken = async () => {
    if (!userData) {
      return;
    }
    setResultMessage(null);
    const { data } = await Http.axios.post('/api/v1/auth/resend-token', {
      userId: (userData as any).userId,
    });
    setResultMessage(data.message);
    onClose();
  };

  React.useEffect(() => {
    setReady(true);
  }, []);

  if (!isReady) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {resultMessage && (
        <div className="flex flex-col items-center">
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
              <span className="material-icons">done</span>
            </div>
            <div className="ml-3 text-sm font-normal">{resultMessage}</div>
            <Toast.Toggle />
          </Toast>
        </div>
      )}
      <Modal show={show} size="md" popup onClose={onClose} className="z-60">
        <Modal.Header />
        <Modal.Body>
          <Toast hidden={show} className="shadow-none">
            <div className="flex w-full">
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500 dark:bg-blue-900 dark:text-blue-300">
                <span className="material-icons">warning</span>
              </div>
              <div className="ml-3 text-sm font-normal">
                <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                  Verify your email
                </span>
                <div className="mb-2 text-sm font-normal">
                  {(userData as any)?.message}
                </div>
                <div className="flex gap-2 w-full">
                  <div className="w-full">
                    <Button color="light" size="xs" onClick={onClose}>
                      Not now
                    </Button>
                  </div>
                  <div className="w-full">
                    <Button size="xs" onClick={onResendToken}>
                      Resend Email
                    </Button>
                  </div>
                </div>
              </div>
              <Toast.Toggle onClick={onClose} />
            </div>
          </Toast>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ResendToken;
