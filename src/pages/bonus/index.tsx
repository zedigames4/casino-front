import Script from 'next/script';
import MetaData from '@/components/partials/MetaData';
import Scaffold from '@/modules/layouts/Scaffold';

const Bonus = () => {
  return (
    <>
      <MetaData>
        <title>Bonus | Zeddi - Earn money via playing games</title>
      </MetaData>
      <Scaffold>
        <div className="w-full bg-primary text-white">
          <iframe
            title="Trivia Quiz"
            src="https://sepurane-dev.github.io/trivia-quiz/"
            width="100%"
            className="w-full h-[600px] border-none"
            allow="geolocation 'self'; autoplay 'self'"
            allowFullScreen
          />
        </div>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2752561628469141"
          crossOrigin="anonymous"
        />
      </Scaffold>
    </>
  );
};

export default Bonus;
