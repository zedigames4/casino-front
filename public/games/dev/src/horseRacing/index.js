import keys from '../system/keys.js';
import endpointsV1 from '../system/endpointsV1.js';
import { getHeaders, onWinOrFail } from '../utils/functions.js';

export const onStartRacing = async () => {
  console.log('onStart ricing');
};
export const horseOnWinOrFail = async (win, id, playLoad) => {
  return await onWinOrFail(win, id, playLoad);
};
export const onHorseRacingBets = async iBet => {
  if (playType === playTypes.demo) {
    return {
      message: 'You are in demo version',
    };
  }
  const bets = {
    game: ids.commonId,
    iWin: 0,
    iToBet: iBet,
    status: 'BETTING',
    playerData: {},
    currency: 'COIN',
  };
  const {
    data: { data },
  } = await axios.post(
    `${keys.DEFAULT_API}${endpointsV1.BETS}`,
    { ...bets },
    await getHeaders(),
  );
  variables.horseRacing.recentBetId = data._id;
  return data;
};
