import React from 'react';
import dynamic from 'next/dynamic';
import { Spinner, CustomFlowbiteTheme, Flowbite } from 'flowbite-react';

const DynamicModel = dynamic(
  () => import('flowbite-react').then(item => item.Modal),
  {
    ssr: false,
  },
);

const DynamicModelHeader = dynamic(
  () => import('flowbite-react').then(item => item.Modal.Header),
  {
    ssr: false,
  },
);

const DynamicModelBody = dynamic(
  () => import('flowbite-react').then(item => item.Modal.Body),
  {
    ssr: false,
  },
);

const theme: CustomFlowbiteTheme = {
  modal: {
    header: {
      base: 'bg-brand-blue flex justify-between items-center px-4 py-2 rounded-t',
      title: 'text-white text-sm font-semibold',
      close: {
        base: 'text-white bg-red-500 rounded p-1 hover:bg-red-600',
      },
    },
    body: {
      base: 'bg-brand-blue',
    },
  },
};

const TryPreview = ({
  title = 'Dice Game',
  show = false,
  onClose = () => {},
  link = '',
}) => {
  const [loading, setLoading] = React.useState(true);
  const handleLoad = () => {
    setLoading(false);
  };
  const handleError = () => {
    setLoading(false);
  };
  const handleClose = () => {
    onClose();
  };

  return (
    <Flowbite theme={{ theme }}>
      <DynamicModel
        show={show}
        onClose={handleClose}
        size="7xl"
        position="top-left"
        className="z-[9999999999] bg-brand-blue"
      >
        <DynamicModelHeader>{title}</DynamicModelHeader>
        <DynamicModelBody>
          {loading && (
            <div className="text-white flex flex-col justify-center p-2 items-center">
              <Spinner />
            </div>
          )}
          <iframe
            title={title}
            src={link}
            width="100%"
            height="600"
            onLoad={handleLoad}
            onError={handleError}
          />
        </DynamicModelBody>
      </DynamicModel>
    </Flowbite>
  );
};

export default React.memo(TryPreview);
