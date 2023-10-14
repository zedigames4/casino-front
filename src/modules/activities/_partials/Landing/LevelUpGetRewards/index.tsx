import { useInView, motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { rotateImageVariants } from '@/utils/motions/styles';

const LevelUpGetRewards = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref);
  return (
    <div className="flex gap-5 justify-around flex-wrap">
      <motion.img
        src="/images/gaming_chair.svg"
        height="510px"
        width="676px"
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={rotateImageVariants}
        whileHover={{ rotateY: 180 }}
        whileTap={{ rotateY: 360 }}
      />
      <div className="flex flex-col md:mr-8 ">
        <h2 className="text-5xl">
          LEVEL UP! GET <br /> REWARDS{' '}
        </h2>
        <p>Each time you reach a new level you&apos;ll get a reward</p>
        <div className="flex gap-10">
          <Link href="/bonus">
            <div className="text-center cursor-pointer">
              <Image
                src="/images/bonus-removebg-preview 1.png"
                height="113px"
                width="107px"
              />
              <h5>Bonus</h5>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LevelUpGetRewards;
