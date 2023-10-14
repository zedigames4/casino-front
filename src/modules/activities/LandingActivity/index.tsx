import React, { useEffect, useState } from 'react';
import FeaturedGame from '@/modules/activities/_partials/Landing/FeaturedGame';
import JoinOthers from '@/modules/activities/_partials/Landing/JoinOthers';
import BiggestWinners from '@/components/BiggestWinners';
import AvailableGames from '@/modules/activities/_partials/Landing/AvailableGames';
import LevelUpGetRewards from '@/modules/activities/_partials/Landing/LevelUpGetRewards';
import LatestActivities from '@/components/LatestActivities';
import CommonQuestions from '@/components/CommonQuestions';
import TotalPaid from '@/components/TotalPaid';
import { GameInterface } from '@/interfaces/game.interface';
import Http from '@/utils/http';
import endpoints from '@/utils/constants/endpoints';
import LandingHeader from '@/components/LandingHeader';
import Subscribe from '@/modules/activities/_partials/Landing/Subscribe';

const LandingActivity = () => {
  const [games, setGames] = useState<GameInterface[]>([]);
  useEffect(() => {
    Http.axios
      .get(endpoints.GAMES)
      .then(response => {
        const {
          data: { data },
        } = response;
        setGames([...data]);
      })
      .catch(error => {
        console.error('useEffectError', error);
      });
  }, []);
  return (
    <div className="flex flex-col relative bg-brand-blue w-full overflow-x-hidden overflow-y-auto text-white">
      <LandingHeader />
      <div className="mt-16">
        <FeaturedGame games={[...games.filter((each, index) => index <= 2)]} />
      </div>
      <JoinOthers />
      <div id="games" className="pt-16">
        <AvailableGames games={games} />
      </div>
      <div className="mt-12">
        <LevelUpGetRewards />
      </div>
      <BiggestWinners />
      <TotalPaid />
      <LatestActivities />
      <CommonQuestions />
      <Subscribe />
    </div>
  );
};
export default LandingActivity;
