import Image from 'next/image';
import React from 'react';
import { motion, useInView } from 'framer-motion';
import { motionContainer, motionItem } from '@/utils/motions/styles';
import { scrollElementIntoView } from '@/utils/helpers/scroll';

const LandingHeader = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref);
  return (
    <div className="flex flex-col w-full bg-[#270B71] text-white">
      {/* <TopNav /> */}
      <div className="px-4 md:px-8 w-full">
        <div className="border-b border-[#E1DEDE] w-full" />
      </div>
      <div ref={ref} className="flex flex-col items-center mt-8 px-4 md:px-8">
        <h1 className="uppercase text-3xl md:text-4xl font-black tracking-wide">
          PLAY &#38; gAIN
        </h1>
        <h1 className="uppercase text-3xl md:text-4xl font-black tracking-wide text-[#01FEDF] mt-1">
          rEWARDS
        </h1>
        <p className="uppercase mt-3 text-center">
          Free, Fun &#38; fair reward for everyone
        </p>
      </div>
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={motionContainer}
        className="relative px-4 md:px-8 flex flex-col items-center w-full h-[300px] md:h-[618px]"
      >
        <motion.div variants={motionItem} className="z-10">
          <button
            type="button"
            onClick={() => scrollElementIntoView('#games')}
            className="rounded-full mt-12 py-3 px-12 bg-[#7400D3] text-white font-semibold uppercase"
          >
            Start playing
          </button>
        </motion.div>
        <Image
          layout="fill"
          src="/images/header.svg"
          priority
          alt=""
          className="z-0"
        />
      </motion.div>
      <div className="flex flex-col px-4 md:px-8 -translate-y-20">
        <div className="grid md:grid-cols-3 gap-x-10 gap-y-4 rounded-[30px] bg-[#0E0D59] px-3 md:px-12 py-5 md:py-10">
          <div className="flex items-center">
            <Image
              width={107}
              height={101}
              src="/images/play-icon.svg"
              alt=""
            />
            <div className="flex flex-col">
              <h1 className="font-bold uppercase">play</h1>
              <p className="first-letter:uppercase mt-1">
                a huge collection of web and mobile games.
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <Image width={107} height={101} src="/images/win-icon.svg" alt="" />
            <div className="flex flex-col">
              <h1 className="font-bold uppercase">win</h1>
              <p className="first-letter:uppercase mt-1">
                Points and cash from playing and competing.
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <Image
              width={107}
              height={101}
              src="/images/earn-icon.svg"
              alt=""
            />
            <div className="flex flex-col">
              <h1 className="font-bold uppercase">earn</h1>
              <p className="first-letter:uppercase mt-1">
                Your Wombucks or prize money from challenges.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingHeader;
