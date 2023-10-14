import AdminScaffold from '@/modules/layouts/AdminScaffold';
import DashboardActivity from '@/modules/activities/DashboardActivity';
import MetaData from '@/components/partials/MetaData';

export const getServerSideProps = ({ query: { gameId } }: any) => {
  return {
    props: {
      gameId: gameId || null,
      protected: true,
    },
  };
};
const Dashboard = ({ gameId }: { gameId: string | null }) => {
  return (
    <>
      <MetaData>
        <title>Dashboard | Zeddi - Earn money via playing games</title>
      </MetaData>
      <AdminScaffold>
        <DashboardActivity featuredGameId={gameId} />
      </AdminScaffold>
    </>
  );
};

export default Dashboard;
