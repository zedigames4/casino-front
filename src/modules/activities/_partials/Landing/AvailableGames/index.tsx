import { useState } from 'react';
import dynamic from 'next/dynamic';
import CustomImage from '@/components/CustomImage';
import { GameInterface } from '@/interfaces/game.interface';
import { scrollElementIntoView } from '@/utils/helpers/scroll';

const DynamicTryPreview = dynamic(() => import('@/components/TryPreview'), {
  loading: () => <p>Loading...</p>,
});

const AvailableGames = ({ games }: { games: GameInterface[] }) => {
  const [current, setCurrent] = useState<GameInterface | null>(null);
  return (
    <div id="games_available" className="flex flex-col w-full">
      <div className="flex justify-center gap-4 items-start md:items-start mx-12 md:flex-row flex-col md:justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold">AVAILABLE GAMES</h2>
          <p>To meet today&apos;s challenges & earn money via playing games </p>
        </div>
        <button
          type="button"
          onClick={() => scrollElementIntoView('#games_featured')}
          className="rounded-3xl px-12 py-3 bg-[#7400D3] hover:bg-[#7400D3]/70"
        >
          Top games
        </button>
      </div>
      <div className="bg-cover mt-16 justify-center flex gap-5 gap-y-10 md:gap-y-12 flex-wrap bg-[url('/images/stars_bg.svg')]">
        {games.length === 0 ? (
          <div className="w-[221px] h-[221px]" />
        ) : (
          games.map(each => {
            return (
              <div key={each._id} className="relative flex flex-col mx-4">
                <CustomImage
                  src={each.images[0]}
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
              </div>
            );
          })
        )}
      </div>
      <DynamicTryPreview
        show={!!current}
        link={current?.url ? `${current?.url}?play-type=demo` : ''}
        title={`${current?.title}(Preview)`}
        onClose={() => setCurrent(null)}
      />
    </div>
  );
};

export default AvailableGames;
