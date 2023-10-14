import Scaffold from '@/modules/layouts/Scaffold';
import LandingActivity from '@/modules/activities/LandingActivity';
import MetaData from '@/components/partials/MetaData';

const LandingPage = () => {
  return (
    <>
      <MetaData>
        <title>Zeddi - Earn money via playing games</title>
      </MetaData>
      <Scaffold>
        <LandingActivity />
      </Scaffold>
    </>
  );
};

export default LandingPage;
