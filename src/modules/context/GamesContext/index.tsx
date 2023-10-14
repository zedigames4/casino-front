import React, { useEffect } from 'react';
import { GameInterface } from '@/interfaces/game.interface';
import Http from '@/utils/http';
import endpoints from '@/utils/constants/endpoints';

export interface gamesShape {
  games: GameInterface[];
  setGames: React.Dispatch<React.SetStateAction<GameInterface[]>>;
}
export const defaultValue: Readonly<gamesShape> = {
  games: [],
  setGames() {},
};
export const GamesContext = React.createContext<gamesShape>(defaultValue);
export const useGames = () => {
  return React.useContext(GamesContext);
};

const GameProvider = ({ children }: any) => {
  const [games, setGames] = React.useState<GameInterface[]>([]);

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

  // fetching garages

  const value = React.useMemo(() => {
    return {
      games,
      setGames,
    };
  }, [games]);

  return (
    <GamesContext.Provider value={value}>{children}</GamesContext.Provider>
  );
};

export default GameProvider;
