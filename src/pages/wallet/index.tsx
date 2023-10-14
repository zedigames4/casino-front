import { GetStaticProps } from 'next';
import AdminScaffold from '@/modules/layouts/AdminScaffold';
import WalletActivity from '@/modules/activities/WalletActivity';
import MetaData from '@/components/partials/MetaData';

const Wallet = () => {
  return (
    <>
      <MetaData>
        <title>Wallet | Zeddi - Earn money via playing games</title>
      </MetaData>
      <AdminScaffold>
        <WalletActivity />
      </AdminScaffold>
    </>
  );
};

export const getStaticProps: GetStaticProps = context => {
  return {
    props: {
      protected: true,
    },
  };
};

export default Wallet;
