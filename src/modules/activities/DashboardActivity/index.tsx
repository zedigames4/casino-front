/* eslint-disable react/require-default-props */
import React from 'react';
import { useGames } from '@/modules/context/GamesContext';
import { GameInterface } from '@/interfaces/game.interface';
import TopPlayers from '@/modules/activities/_partials/dashboard/TopPlayers';
import { useProfile } from '@/modules/context/ProfileContext';
import TotalEarning from '@/modules/activities/_partials/dashboard/TotalEarning';
import RecentBets from '@/modules/activities/_partials/dashboard/RecentActivity';
import PopularGame from '@/modules/activities/_partials/dashboard/PopularGame';
import PrimaryGame from '@/modules/activities/_partials/dashboard/PrimaryGame';
import { useWallet } from '@/modules/context/WalletContext';
import MyWithdrawRequests from '@/modules/activities/_partials/dashboard/MywithdrawRequests';

const DashboardActivity = ({
  featuredGameId = null,
}: {
  featuredGameId?: string | null;
}) => {
  const { profile } = useProfile();
  const { games } = useGames();
  const { wallet } = useWallet();
  const load = () => {
    let mainGame;
    let others;
    if (featuredGameId) {
      others = games.filter(each => {
        if (each._id === featuredGameId) {
          mainGame = each;
        }
        return each._id !== featuredGameId;
      });
    }
    if (!featuredGameId || !mainGame) {
      const [varMain, ...varOther] = games;
      mainGame = varMain;
      others = varOther;
    }
    return { featuredGame: mainGame, otherGames: others || [] };
  };
  const {
    featuredGame,
    otherGames,
  }: { featuredGame: GameInterface; otherGames: GameInterface[] } = load();
  return (
    <div className="text-white flex-col xl:flex-row flex gap-5 items-center justify-between">
      <div className="flex self-start flex-col xl:max-w-[70%] w-full">
        <PrimaryGame featuredGame={featuredGame} />
        <PopularGame otherGames={otherGames} />
      </div>
      <div className="rounded-2xl xl:max-w-[30%] flex-grow w-full h-full flex flex-col gap-20 bg-[#270B71]">
        <TotalEarning wallet={wallet} />
        {/* {profile?.role === 'admin' || profile?.role === 'manager' ? ( */}
        {/*   <TopPlayers /> */}
        {/* ) : null} */}
        <RecentBets />
        <MyWithdrawRequests />
      </div>
    </div>
  );
};

export default DashboardActivity;
