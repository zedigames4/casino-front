import Link from 'next/link';
import React from 'react';
import CustomImage from '@/components/CustomImage';
import { GameInterface } from '@/interfaces/game.interface';

const PopularGame = ({ otherGames }: { otherGames: GameInterface[] }) => {
  return (
    <div className="flex flex-col mt-16 gap-5">
      <h2 className="font-sans text-2xl">Popular games</h2>
      <div className="flex flex-col items-center md:flex-row gap-5 w-full overflow-x-auto py-2">
        {!otherGames ? (
          <div className="w-[333px] h-[291px]" />
        ) : (
          otherGames.map(each => {
            return (
              <div
                key={`${each._id}unu4434`}
                className="rounded-2xl p-5 bg-[#270B71]"
              >
                <div className="relative">
                  {/* <div className="left-0 right-0 m-2 absolute bottom-0 z-10 flex justify-between rounded-2xl gap-6 bg-brand-blue/80 px-10 py-5"> */}
                  {/*   <div> */}
                  {/*     <h5 className="font-sans">Current earning</h5> */}
                  {/*     <p className="font-sans">34, 400 RWF</p> */}
                  {/*   </div> */}
                  {/*   <div> */}
                  {/*     <h5 className="font-sans">Spend</h5> */}
                  {/*     <p className="font-sans">34, 400 RWF</p> */}
                  {/*   </div> */}
                  {/* </div> */}
                  <div className="bg-white/50 rounded-2xl">
                    <CustomImage
                      src={each.images[0]}
                      className="rounded-2xl min-w-max"
                      width="333px"
                      height="221px"
                      layout="fixed"
                      objectFit="cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <h3 className="self-center font-sans text-2xl">
                    {each.title}
                  </h3>
                  <div className="flex justify-evenly">
                    <Link href={`/games/${each._id}`}>
                      <a
                        href="#game"
                        className="font-sans border px-7 py-2 rounded-2xl   "
                      >
                        Details
                      </a>
                    </Link>
                    <a
                      href={each.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans px-7 py-2 rounded-2xl bg-[#4E00CE]"
                    >
                      Play
                    </a>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
export default PopularGame;
