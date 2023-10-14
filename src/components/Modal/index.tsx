import React, { useEffect } from 'react';

export const Modal = ({
  children,
  toggle,
  header,
  forceCloseOnChange,
  notifyOnClose,
}: {
  children: any;
  toggle: any;
  header: any;
  forceCloseOnChange?: boolean;
  notifyOnClose?: () => void;
}) => {
  const [showModal, setShowModal] = React.useState(false);

  useEffect(() => {
    if (notifyOnClose && !showModal) {
      notifyOnClose();
    }
  }, [showModal]);
  useEffect(() => {
    setShowModal(i => false);
  }, [forceCloseOnChange]);
  return (
    <>
      <button
        type="button"
        className="ease-linear transition-all duration-150"
        onClick={() => setShowModal(true)}
      >
        {toggle}
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="rounded-lg shadow-lg mx-auto max-w-3xl flex flex-col w-full bg-white max-h-full overflow-y-auto">
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                {header}
                <button
                  type="button"
                  className="text-black text-2xl block material-icons p-2 bg-brand-bold/10 rounded-xl"
                  onClick={() => setShowModal(false)}
                >
                  close
                </button>
              </div>
              {/* body*/}
              {children}
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </>
      ) : null}
    </>
  );
};

Modal.defaultProps = {
  forceCloseOnChange: false,
  notifyOnClose: undefined,
};

export default Modal;
