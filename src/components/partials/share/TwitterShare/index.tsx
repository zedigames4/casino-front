import { TwitterShareButton } from 'react-share';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/router';
import keys from '@/utils/constants/keys';

const TwitterShare = () => {
  const [isReady, setReady] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    setReady(true);
  }, []);

  if (!isReady) {
    return <p>Loading...</p>;
  }

  return (
    <TwitterShareButton url={`${keys.HOST}/${router.asPath}`}>
      <button
        type="button"
        className="flex gap-2 items-center px-6 pb-4 pt-8 border-l-2 border-l-[#EAEAEA] cursor-pointer hover:bg-primary/20"
      >
        <Image
          src="/images/social_media/twitter_brand.svg"
          width={20}
          height={20}
          alt=""
        />
        Share on Twitter
      </button>
    </TwitterShareButton>
  );
};
export default TwitterShare;
