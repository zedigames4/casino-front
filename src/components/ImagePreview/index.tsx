import React from 'react';
import DrawerLayout from '../DrawerLayout';

const ImagePreview = ({
  children,
  src,
  title,
}: {
  children: any;
  src: string;
  title: string;
}) => {
  const [toggle, setToggle] = React.useState(false);
  if (!src) {
    return null;
  }
  return (
    <DrawerLayout toggle={toggle} setToggle={setToggle} title={title}>
      {children}
      <div className="flex flex-col w-full">
        {/* <CustomImage*/}
        {/*    alt={""}*/}
        {/*  src={src}*/}
        {/*  width="600"*/}
        {/*  height="500"*/}
        {/* />*/}
      </div>
    </DrawerLayout>
  );
};

export default ImagePreview;
