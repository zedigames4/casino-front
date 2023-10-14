import { GetStaticProps } from 'next';
import AdminScaffold from '@/modules/layouts/AdminScaffold';
import UserActivity from '@/modules/activities/UserActivity';
import { allowedRoles } from '@/utils/constants';
import MetaData from '@/components/partials/MetaData';

const Users = () => {
  return (
    <>
      <MetaData>
        <title>Users | Zeddi - Earn money via playing games</title>
      </MetaData>
      <AdminScaffold>
        <UserActivity />
      </AdminScaffold>
    </>
  );
};

export const getStaticProps: GetStaticProps = context => {
  return {
    props: {
      protected: true,
      allowedRoles,
    },
  };
};

export default Users;
