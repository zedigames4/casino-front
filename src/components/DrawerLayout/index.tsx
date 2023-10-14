import { Dispatch, SetStateAction } from 'react';

const DrawerLayout = ({
  children,
  toggle,
  setToggle,
  title,
}: {
  children: any;
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
  title: string;
}) => {
  return (
    // eslint-disable-next-line no-constant-condition
    <div className={`absolute top-0 ${toggle}` ? 'opacity-100' : 'opacity-0'}>
      {children}
    </div>
  );
};

export default DrawerLayout;
