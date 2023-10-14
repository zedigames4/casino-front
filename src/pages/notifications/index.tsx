import NotificationActivity from '@/modules/activities/NotificationActivity';
import MetaData from '@/components/partials/MetaData';
import TopNav from '@/components/TopNav';
import AdminScaffold from '@/modules/layouts/AdminScaffold';

const Notifications = () => {
  return (
    <>
      <MetaData>
        <title>Zeddi - Earn money via playing games</title>
      </MetaData>
      <AdminScaffold>
        <NotificationActivity />;
      </AdminScaffold>
    </>
  );
};

export default Notifications;
