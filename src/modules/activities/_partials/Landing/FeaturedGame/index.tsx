import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { GameInterface } from '@/interfaces/game.interface';
import CustomImage from '@/components/CustomImage';
import { scrollElementIntoView } from '@/utils/helpers/scroll';
import { motionContainer, motionItem } from '@/utils/motions/styles';

const DynamicTryPreview = dynamic(() => import('@/components/TryPreview'), {
  loading: () => <p>Loading...</p>,
});

const FeaturedGame = ({ games }: { games: GameInterface[] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [current, setCurrent] = useState<GameInterface | null>(null);
  return (
    <div id="games_featured" className="flex flex-col w-full">
      <div className="flex justify-between items-center gap-4 md:items-start mx-12 flex-wrap">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold">FEATURED GAMES</h2>
          <p>To meet today&apos;s challenges & earn money via playing games </p>
        </div>
        <button
          type="button"
          className="capitalize rounded-3xl px-12 py-3 bg-[#7400D3] hover:bg-[#7400D3]/70"
          onClick={() => scrollElementIntoView('#games_available')}
        >
          show all
        </button>
      </div>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        exit="exit"
        variants={motionContainer}
        className="mt-16 flex flex-wrap gap-5 py-4"
      >
        {games.length === 0 ? (
          <div className="w-[221px] h-[221px]" />
        ) : (
          games.map(each => {
            return (
              <motion.div
                key={`${each._id}featuredGames`}
                className="mx-auto flex flex-col"
                variants={motionItem}
              >
                <CustomImage
                  src={each.images.length > 0 ? each.images[0] : ''}
                  className="rounded-2xl min-w-max"
                  width="433px"
                  height="221px"
                  layout="fixed"
                  objectFit="cover"
                />
                <a
                  href={each.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center"
                >
                  {each.title}
                </a>
                <div className="mt-4 md:mt-6 flex items-center justify-center space-x-6 md:space-x-12">
                  <a
                    href={each.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-3xl md:px-6 p-3 bg-[#7400D3] hover:bg-[#7400D3]/70"
                  >
                    Start Game
                  </a>
                  {/* <button
                    type='button'
                    onClick={() => setCurrent(each)}
                    className='rounded-3xl md:px-6 p-3 bg-[#FF0033] hover:bg-[#FF0033]/70'
                  >
                    Try Preview
                  </button> */}
                </div>
              </motion.div>
            );
          })
        )}
      </motion.div>
      <DynamicTryPreview
        show={!!current}
        link={current?.url ? `${current?.url}?play-type=demo` : ''}
        title={`${current?.title}(Preview)`}
        onClose={() => setCurrent(null)}
      />
    </div>
  );
};

export default FeaturedGame;
