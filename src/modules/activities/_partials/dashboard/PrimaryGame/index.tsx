import Link from 'next/link';
import React from 'react';
import CustomImage from '@/components/CustomImage';
import { GameInterface } from '@/interfaces/game.interface';

const PrimaryGame = ({ featuredGame }: { featuredGame: GameInterface }) => {
  return (
    <div
      id="primary_game"
      className="flex flex-col md:flex-row rounded-2xl gap-5 p-5 bg-[#270B71]"
    >
      <div>
        {featuredGame ? (
          <a
            href={featuredGame?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex bg-sky-300/10 rounded-2xl p-2"
          >
            <CustomImage
              src={featuredGame?.images[0]}
              className="rounded-2xl min-w-max"
              width="333px"
              height="321px"
              layout="fixed"
              objectFit="cover"
            />
          </a>
        ) : (
          <div className="w-[333px] h-[321px] flex bg-sky-300/10 rounded-2xl p-2" />
        )}
      </div>
      <div className="flex flex-col place-content-evenly">
        <div>
          <h2 className="font-sans text-3xl">{featuredGame?.title}</h2>
          <span className="font-sans text-sm text-white/50">
            product ID : {featuredGame?._id}
          </span>
        </div>

        {/* <div className="flex justify-between rounded-2xl gap-6 bg-white/10 px-10 py-5"> */}
        {/*   <div> */}
        {/*     <h5 className="font-sans">Current earning</h5> */}
        {/*     <p className="font-sans">34, 400 RWF</p> */}
        {/*   </div> */}
        {/*   <div> */}
        {/*     <h5 className="font-sans">Spend</h5> */}
        {/*     <p className="font-sans">34, 400 RWF</p> */}
        {/*   </div> */}
        {/* </div> */}
        <div className="flex justify-evenly mt-4">
          <Link href={`/games/${featuredGame?._id}`}>
            <button
              type="button"
              className="font-sans border px-7 py-2 rounded-2xl   "
            >
              Details
            </button>
          </Link>
          <a
            href={featuredGame?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans px-7 py-2 rounded-2xl bg-[#4E00CE]"
          >
            Play
          </a>
        </div>
      </div>
      <div />
    </div>
  );
};

export default PrimaryGame;
