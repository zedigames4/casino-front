import * as secureLs from '../system/secureLs.js';
import keys from '../system/keys.js';
import endpointsV1 from '../system/endpointsV1.js';

export async function getHeaders() {
  return {
    headers: { Authorization: `Bearer ${await secureLs.getToken()}` },
  };
}

export const onWinOrFail = async (win, betId, playLoad) => {
  if (playType === playTypes.demo) {
    return { message: 'you are in demo mode' };
  }
  console.log('onWinOrFail');
  if (!betId) {
    console.log('554rdf');
    await Swal.fire({
      icon: 'error',
      title: 'Oops, Something went wrong! ',
      text: 'Please contact us',
      footer: '<a href="/help">go to contact us page?</a>',
    });
    window.location.href = '/help';
    return;
  }
  const bets = {
    game: ids.commonId,
    iWin: 0,
    iToBet: 0,
    status: '',
    playerData: playLoad || {},
    currency: 'COIN',
  };
  if (win > 0) {
    bets.iWin = win;
    bets.status = 'WIN';
  } else {
    bets.status = 'LOOSE';
  }
  console.log('bets__', bets, 'winning', win);
  const {
    data: { data },
  } = await axios.put(
    `${keys.DEFAULT_API}${endpointsV1.BETS}/${betId}`,
    { ...bets },
    await getHeaders(),
  );
  return data;
};
export const onBets = async iBet => {
  if (playType === playTypes.demo) {
    return { message: 'you are in demo mode' };
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
  return data;
};
