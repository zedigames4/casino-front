import { GetStaticProps } from 'next';
import AdminScaffold from '@/modules/layouts/AdminScaffold';
import GameActivity from '@/modules/activities/GameActivity';
import MetaData from '@/components/partials/MetaData';
import Http from '@/utils/http';
import endpoints from '@/utils/constants/endpoints';
import { GameInterface } from '@/interfaces/game.interface';

export const getStaticProps: GetStaticProps = async context => {
  let games: GameInterface[] = [];
  try {
    const { data } = await Http.axios.get(endpoints.GAMES);
    games = data.data || [];
  } catch (error) {
    // console.log(error);
  }
  return {
    props: {
      protected: true,
      games,
    },
    revalidate: 10,
  };
};

const Game = ({ games }: { games: GameInterface[] }) => {
  return (
    <>
      <MetaData>
        <title>Games | Zeddi - Earn money via playing games</title>
      </MetaData>
      <AdminScaffold>
        <GameActivity data={games || []} />
      </AdminScaffold>
    </>
  );
};

export default Game;
