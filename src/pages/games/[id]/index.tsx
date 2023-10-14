import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import AdminScaffold from '@/modules/layouts/AdminScaffold';
import GameActivity from '@/modules/activities/GameActivity';
import MetaData from '@/components/partials/MetaData';
import Http from '@/utils/http';
import endpoints from '@/utils/constants/endpoints';
import { GameInterface } from '@/interfaces/game.interface';

export async function getStaticPaths() {
  const gamePaths: any[] = [];
  try {
    const { data } = await Http.axios.get(endpoints.GAMES);
    const results: any[] = data.data || [];
    results.forEach((item: any) => {
      gamePaths.push({
        params: { id: item._id },
      });
    });
  } catch (error) {
    // console.error('--------------------------errr', error);
  }
  return {
    paths: gamePaths,
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async context => {
  let games: GameInterface[] | [] = [];
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
const Game = ({ games = [] }: { games: GameInterface[] }) => {
  const router = useRouter();
  const matchGames = games.filter(item => item._id === router.query.id);
  const currentGame = matchGames.length ? matchGames[0] : null;
  return (
    <>
      <MetaData>
        <title>
          {currentGame?.title || 'Games'} | Zeddi - Earn money via playing games
        </title>
      </MetaData>
      <AdminScaffold>
        <GameActivity data={games} />
      </AdminScaffold>
    </>
  );
};

export default Game;
