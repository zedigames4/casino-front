import AdminScaffold from '@/modules/layouts/AdminScaffold';
import ProfileActivity from '@/modules/activities/ProfileActivity';
import MetaData from '@/components/partials/MetaData';

export const getServerSideProps = ({ query: { id } }: any) => {
  return {
    props: {
      id: id || null,
      protected: true,
    },
  };
};
const Profile = ({ id }: { id: string | null }) => {
  return (
    <>
      <MetaData>
        <title>Profile | Zeddi - Earn money via playing games</title>
      </MetaData>
      <AdminScaffold>
        <div>
          <ProfileActivity id={id} />
        </div>
      </AdminScaffold>
    </>
  );
};

export default Profile;
