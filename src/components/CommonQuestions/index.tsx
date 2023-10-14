import Image from 'next/image';
import React from 'react';
import { motion, useInView } from 'framer-motion';
import CommonQuestionList from '@/components/CommonQuestions/data';
import { imageVariants } from '@/utils/motions/styles';
import FAQ from '../FAQ';
import convertToSlug from '../../../server/app/utils/slug';

const CommonQuestions = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref);
  return (
    <div className="flex flex-col items-center px-4 md:px-8 -translate-y-24 pb-24">
      <h1 className="text-3xl text-center items-center md:text-5xl tracking-wide font-black flex flex-col leading-relaxed">
        <span>OUR MOST COMMON</span>
        <span>QUESTIONS</span>
      </h1>
      <p className="mt-3 text-center">
        Do you have a question about gogame? Please contact us! We would love to
        answer your questions
      </p>
      <div className="mt-8 md:grid grid-cols-2 gap-x-10 gap-y-5 w-full max-w-6xl overflow-x-hidden">
        <motion.img
          src="/images/faq.png"
          alt=""
          ref={ref}
          width={445}
          height={445}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={imageVariants}
          whileHover={{ rotateY: 180 }}
          whileTap={{ rotateY: 360 }}
        />
        <div className="flex flex-col space-y-4 overflow-y-hidden">
          {CommonQuestionList.map(element => (
            <FAQ
              question={element.question}
              answer={element.answer}
              key={convertToSlug(element.question)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommonQuestions;
