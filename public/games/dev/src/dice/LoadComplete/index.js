import keys from '../../system/keys.js';
import * as secureLs from '../../system/secureLs.js';
import { getHeaders, onWinOrFail } from '../../utils/functions.js';
import endpointsV1 from '../../system/endpointsV1.js';
import { validateBalance } from '../../system/GlobalFunctions.js';
const LoadComplete = async wallet => {
  const balance = wallet.balanceInCoin.toFixed(1);

  await updateCredit(balance);
};
const updateCredit = async balance => {
  val.dice.gameData.betNumberPlus = 0;
  val.dice.gameData.betNumber = 0;
  val.dice.gameCredit = balance;
  val.dice.playerData.credit = balance;
  val.dice.playerData.creditSum = balance;
  fun.dice.updateBetNumber();

  await validateBalance(balance);
};
export const onRoll = async () => {
  if (playType === playTypes.demo) {
    return {
      message: 'you are in dem0',
    };
  }
  const bets = {
    game: ids.commonId,
    iWin: 0,
    iToBet: val.dice.playerData.newBet,
    status: 'BETTING',
    playerData: val.dice.playerData,
    currency: 'COIN',
  };
  // console.log('playerData', val.dice.playerData);
  // console.log('gameData', val.dice.gameData);
  // console.log('winslot_arr', val.dice.winslot_arr);
  // console.log('win', val.dice.win);
  // console.log('bets', bets);

  try {
    buttonRoll.visible = false;
    buttonRollDisabled.visible = true;
    const {
      data: { data },
    } = await axios.post(
      `${keys.DEFAULT_API}${endpointsV1.BETS}`,
      { ...bets },
      await getHeaders(),
    );
    variables.dice.recentBetId = data._id;
    console.log('Response ', data);
    buttonRoll.visible = true;
    buttonRollDisabled.visible = false;
  } catch (error) {
    buttonRoll.visible = true;
    buttonRollDisabled.visible = false;
    console.error(error);
    await Swal.fire({
      icon: 'error',
      title: 'Something went wrong ',
      text: 'Please contact us !',
      footer: '<a href="/help">go to contact us?</a>',
    });
    window.location.href = '/help';
  }
};
export const diceOnWinOrFail = async obj => {
  if (playType === playTypes.demo) {
    return {
      message: 'you are in demo',
    };
  }
  try {
    let data = await onWinOrFail(
      obj.win,
      variables.dice.recentBetId,
      val.dice.playerData,
    );
    const balance = data.balanceInCoin.toFixed(1);
    await updateCredit(balance);

    console.log('put bet', data);
  } catch (err) {
    console.error(err);
  } finally {
    variables.dice.recentBetId = undefined;
  }
};

export default LoadComplete;
