/* eslint-disable react/no-danger */
import React from 'react';
import { motion, useInView } from 'framer-motion';
import { listItemVariants, motionItem } from '@/utils/motions/styles';

const FAQ = ({
  question,
  answer = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sapien risus, laoreet et nisi at, fringilla congue nisi. Proin vitae fermentum ante.',
}: {
  question: string;
  answer: string;
}) => {
  const [show, setShow] = React.useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref);
  return (
    <motion.div
      ref={ref}
      variants={listItemVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="flex flex-col bg-[#08074B] rounded"
    >
      <div className="flex items-center justify-between px-6 py-2 space-x-6 rounded bg-[#282995]">
        <p className="uppercase">{question}</p>
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="whitespace-nowrap rounded-full font-black text-2xl bg-[#006778] w-8 h-8 flex flex-col justify-center items-center"
        >
          <span>{show ? '-' : '+'}</span>
        </button>
      </div>
      {show ? (
        <motion.div
          variants={motionItem}
          className="py-2 px-6"
          dangerouslySetInnerHTML={{ __html: answer }}
        />
      ) : null}
    </motion.div>
  );
};

export default FAQ;
