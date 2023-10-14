import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import EditOrAddGame from '@/modules/activities/_partials/games/EditOrAddGame';
import { GameInterface } from '@/interfaces/game.interface';
import CustomImage from '@/components/CustomImage';
import { useAuth } from '@/modules/context/AuthContext';
import Modal from '@/components/Modal';
import FacebookShare from '@/components/partials/share/FacebookShare';
import TwitterShare from '@/components/partials/share/TwitterShare';

const GameActivity = ({ data }: { data: GameInterface[] }) => {
  const [otherGames, setOtherGames] = useState<GameInterface[]>([]);
  const [mainGame, setMainGame] = useState<GameInterface | null>(null);
  const { user } = useAuth();
  const route = useRouter();
  const { id } = route.query;
  useEffect(() => {
    let mainGame_ = null;
    let otherGames_;
    if (!id && data.length) {
      const [main, ...other] = data;
      mainGame_ = main;
      otherGames_ = other;
    } else {
      otherGames_ = data.filter((each: GameInterface) => {
        if (each._id === id) {
          mainGame_ = each;
        }
        return each._id !== id;
      });
    }
    setMainGame(mainGame_);
    setOtherGames(otherGames_ || []);
  }, [data, id]);
  const addGame = (game: GameInterface) => {
    if (game) {
      setOtherGames(i => [...i, game]);
    }
  };
  const removeMainGame = () => {
    const [newMain] = otherGames;
    route.push(`/games/${newMain._id}`).catch(error => console.error(error));
  };
  return (
    <div className="flex flex-col gap-10 bg-brand-blue-light text-white rounded-2xl">
      <div className="flex flex-col lg:flex-row gap-10 mt-5 mx-2 p-5 justify-center items-center lg:items-start">
        <div className="mx-2 w-full flex-col flex items-center">
          {mainGame ? (
            <a href={mainGame.url} target="_blank" rel="noopener noreferrer">
              <CustomImage
                src={mainGame.images[0]}
                className="rounded-2xl"
                width="533px"
                height="621px"
                layout="intrinsic"
                objectFit="contain"
              />
            </a>
          ) : (
            <div className="min-w-[533px] min-h-[621px]" />
          )}
          <div className="mt-3 w-full justify-between flex gap-2 overflow-x-auto max-w-xl py-4">
            {otherGames.map(each => (
              <Link key={each._id} href={`/games/${each._id}`}>
                <a
                  href="#game"
                  className="relative min-w-[163px] items-center flex flex-col border-2 border-solid border-brand-bold p-2 rounded-2xl"
                >
                  <CustomImage
                    src={each.images[0]}
                    className="rounded-2xl"
                    width={133}
                    height={121}
                    layout="intrinsic"
                    objectFit="cover"
                    alt=""
                  />
                  <span className="">{each.title}</span>
                </a>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-5 w-full">
          <h6 className="font-sans">{mainGame?.title}</h6>
          <div className="flex gap-4">
            <div className="py-2 px-3 flex gap-2 bg-brand-bold/50 rounded-2xl">
              <span className="material-icons">visibility</span>
              <span>200</span>
            </div>
            <div className="py-2 px-3 flex gap-2 bg-brand-bold/50 rounded-2xl">
              <span className="material-icons">favorite</span>
              <span>200</span>
            </div>
            <span className="flex-1" />
            <Modal
              header={<div className="text-black">Share</div>}
              toggle={
                <button
                  type="button"
                  className="material-icons py-2 px-3 flex gap-2 bg-brand-bold/50 rounded-2xl"
                >
                  share
                </button>
              }
            >
              <div className="flex flex-col justify-start  items-start mx-auto text-black">
                <FacebookShare />
                <TwitterShare />
              </div>
            </Modal>
            {user?.role === 'admin' ? (
              <EditOrAddGame
                updateMainGame={setMainGame}
                removeMainGame={removeMainGame}
                game={mainGame}
              >
                <span className="material-icons py-2 px-3 flex gap-2 bg-brand-bold/50 rounded-2xl">
                  edit
                </span>
              </EditOrAddGame>
            ) : null}
          </div>
          {/* <div className="bg-white/10 rounded-2xl px-5 py-2 gap-5 flex justify-between w-full"> */}
          {/*   <div className="flex flex-col"> */}
          {/*     <h6 className="font-sans text-white/30">Income</h6> */}
          {/*     <data className="font-sans text-xl">-- RWF</data> */}
          {/*   </div> */}
          {/*   <div className="flex flex-col"> */}
          {/*     <h6 className="font-sans text-white/30">Expenses</h6> */}
          {/*     <data className="font-sans text-xl">--- RWF</data> */}
          {/*   </div> */}
          {/* </div> */}
          <h5 className="font-sans">Description</h5>
          <p className="font-sans text-white/50">{mainGame?.description}</p>

          <div className="flex gap-4 items-center">
            <a
              href={mainGame?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans px-5 py-2 bg-brand-bold self-start rounded-2xl"
            >
              Play now
            </a>
            {/* <a
              href={`${mainGame?.url}?play-type=demo`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans px-5 py-2 bg-primary/10 text-white/70 hover:text-white self-start rounded-2xl"
            >
              View demo
            </a> */}
          </div>
          {/* <div className="flex flex-col gap-5 mx-3"> */}
          {/*   <div className="flex justify-between flex-row"> */}
          {/*     <h2 className="font-sans"> Recent Activities</h2> */}
          {/*     <button type="button" className="font-sans"> */}
          {/*       See All */}
          {/*     </button> */}
          {/*   </div> */}
          {/*   <div> */}
          {/*     <div className="flex flex-row justify-between items-center"> */}
          {/*       <div className="flex flex-row gap-5"> */}
          {/*         <svg width="32" height="32" viewBox="0 0 32 32"> */}
          {/*           <defs> */}
          {/*             <linearGradient */}
          {/*               x1="28.538%" */}
          {/*               y1="20.229%" */}
          {/*               x2="100%" */}
          {/*               y2="108.156%" */}
          {/*               id="logo-a" */}
          {/*             > */}
          {/*               <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" /> */}
          {/*               <stop stopColor="#A5B4FC" offset="100%" /> */}
          {/*             </linearGradient> */}
          {/*             <linearGradient */}
          {/*               x1="88.638%" */}
          {/*               y1="29.267%" */}
          {/*               x2="22.42%" */}
          {/*               y2="100%" */}
          {/*               id="logo-b" */}
          {/*             > */}
          {/*               <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" /> */}
          {/*               <stop stopColor="#38BDF8" offset="100%" /> */}
          {/*             </linearGradient> */}
          {/*           </defs> */}
          {/*           <rect fill="#6366F1" width="32" height="32" rx="16" /> */}
          {/*           <path */}
          {/*             d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z" */}
          {/*             fill="#4F46E5" */}
          {/*           /> */}
          {/*           <path */}
          {/*             d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z" */}
          {/*             fill="url(#logo-a)" */}
          {/*           /> */}
          {/*           <path */}
          {/*             d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z" */}
          {/*             fill="url(#logo-b)" */}
          {/*           /> */}
          {/*         </svg> */}
          {/*         <div> */}
          {/*           <h5 className="font-sans">Eric Manyaga</h5> */}
          {/*           <span className="font-sans text-sm text-white/50"> */}
          {/*             eric@gmail.com */}
          {/*           </span> */}
          {/*         </div> */}
          {/*       </div> */}

          {/*       <span className="px-5 py-2 text-white/50 font-sans">4:20</span> */}
          {/*     </div> */}
          {/*   </div> */}
          {/* </div> */}
        </div>
      </div>
      <div className="px-6 flex justify-between py-4">
        <span />
        {user?.role === 'admin' ? (
          <EditOrAddGame addGame={addGame}>
            <span className="font-sans px-7 py-2 rounded-2xl bg-[#4E00CE]">
              Add game
            </span>
          </EditOrAddGame>
        ) : null}
      </div>
    </div>
  );
};

export default GameActivity;
