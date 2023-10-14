import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useFetcher } from '@/utils/fetcher';
import endpoints from '@/utils/constants/endpoints';
import { LatestBetsInterface } from '@/interfaces/latestBets.interface';
import { formatName } from '@/utils/functions';
import { rowVariants, tableVariants } from '@/utils/motions/styles';

const LatestActivities = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref);
  const [latestBets, setLatestBest] = useState<LatestBetsInterface[]>([]);
  const { data } = useFetcher(endpoints.LATEST_WINNER);
  useEffect(() => {
    if (data) {
      setLatestBest(data.data);
    }
  }, [data]);
  return (
    <>
      <div className="mt-12 flex flex-col px-4 md:px-8 py-12 pb-60 bg-[#151553]">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-4xl uppercase font-bold">
              LATEST ACTIVITIES
            </h1>
            <p className="mt-1">
              To meet today&apos;s challenges &#38; earn money via playing games
            </p>
          </div>
          <Link href="/games">
            <button
              type="button"
              className="hidden md:block bg-[#4E00CE] uppercase rounded-full px-12 py-3"
            >
              Get started
            </button>
          </Link>
        </div>
      </div>
      <div className="whitespace-nowrap text-xs sm:text-base px-4 md:px-8 flex flex-col -translate-y-48">
        <div className="flex flex-col bg-gradient-to-b from-[#1B0D7C] to-[#1B0D7C00] md:p-4 md:px-6">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{}}
            transition={{ repeat: Infinity, repeatType: 'loop', duration: 3 }}
            className="flex flex-col bg-[#030248]/70 overflow-x-auto"
          >
            <motion.table
              ref={ref}
              className="table"
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={tableVariants}
            >
              <thead className="bg-[#252595]">
                <tr>
                  <th className="uppercase p-2 font-semibold">Game</th>
                  <th className="uppercase p-2 font-semibold">PLAYER</th>
                  <th className="uppercase p-2 font-semibold">Bet id</th>
                  <th className="uppercase p-2 font-semibold">Profit</th>
                </tr>
              </thead>
              <tbody>
                {latestBets.map((element, index) => (
                  <motion.tr
                    key={`game_${element.betId}`}
                    variants={rowVariants}
                    className={`${
                      index < latestBets.length - 1
                        ? 'border-b-[0.5px] border-[#F2F1F1]'
                        : ''
                    }`}
                  >
                    <td className="uppercase p-2">{element.game.title}</td>
                    <td className="uppercase p-2">
                      {formatName(element.user)}
                    </td>
                    <td className="uppercase p-2">{element.betId}</td>
                    <td className="uppercase p-2 text-[#01F06F]">
                      {element.profit}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </motion.table>
          </motion.div>
        </div>
      </div>
    </>
  );
};
export default LatestActivities;
