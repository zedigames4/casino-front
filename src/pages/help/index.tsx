import MetaData from '@/components/partials/MetaData';
import Scaffold from '@/modules/layouts/Scaffold';
import CommonQuestions from '@/components/CommonQuestions';
import ContactActivity from '@/modules/activities/ContactUs';

const Help = () => {
  return (
    <>
      <MetaData>
        <title>Help | Zeddi - Earn money via playing games</title>
      </MetaData>
      <Scaffold>
        <div className="w-full bg-primary text-white pt-48">
          <CommonQuestions />
          <ContactActivity />
        </div>
      </Scaffold>
    </>
  );
};

export default Help;
