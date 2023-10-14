import LoadComplete, {
  onRoll,
  diceOnWinOrFail,
} from '../dice/LoadComplete/index.js';
import { onStartRacing } from '../horseRacing/index.js';
import endpointsV1 from './endpointsV1.js';
import keys from './keys.js';
import { getHeaders } from '../utils/functions.js';
import * as secureLs from './secureLs.js';
import { getDemoWallet } from './demoMocs.js';
export async function GameLoadComplete(gameId) {
  console.log(gameId + ' complete loading');
  try {
    let wallet = await getWallet();
    console.log('wallet', wallet);
    if (gameId === ids.diceGame.id) {
      await LoadComplete(wallet).catch(error => console.error(error));
    }
  } catch (e) {
    const token = await secureLs.getToken();
    console.log(e.response.status);
    if (token && e.response.status === 409) {
      console.log('dffdfdfd232323343');
      Swal.fire({
        icon: 'warning',
        title: "Your don't have wallet ",
        text: 'You have to your wallet first!',
        footer: '<a href="/wallet">go to my wallet?</a>',
      }).then(() => {
        window.location.href = '/wallet';
      });
    }
    console.error(e);
  }
}
export const getWallet = async () => {
  if (playType === playTypes.demo) {
    return getDemoWallet();
  }
  const {
    data: { data },
  } = await axios.get(
    `${keys.DEFAULT_API}${endpointsV1.MY_WALLET}`,
    await getHeaders(),
  );
  return data;
};
export const startGame = async gameId => {
  try {
    if (playType === playTypes.demo) {
      return;
    }
    const token = await secureLs.getToken();
    if (!token) {
      // const keys = await import('../system/keys.js');
      Swal.fire({
        icon: 'warning',
        title: 'Ops, You have to login first !',
        text: 'You have to be logged in first, or switch to demo play mode',
        // footer: `<button class='text-blue-500' onclick='switchToDemo()'>Switch to demo</button>`,
      }).then(() => {
        secureLs.set(keys.REDIRECT_LINK, `/play/${ids.commonId}/horse-racing`);
        window.location.href = '/login';
      });
    } else {
      let decoded = jwt_decode(token);
      console.log(decoded);
      if (decoded.role === 'admin') {
        Swal.fire({
          icon: 'warning',
          title: 'Ops, You are admin !',
          text: 'You are not allowed to play. You can create other regular account to play !',
        }).then(() => {
          window.location.href = '/games';
        });
      }
    }
  } catch (e) {
    window.location.href = '/help';
    console.error(e);
  }
};
export const finishBet = async gameId => {
  if (gameId === ids.diceGame.id) {
    await onRoll();
  } else if (gameId === ids.horseRacing.id) {
    await onStartRacing();
  }
};
export const onWinOrFail = async (gameId, data) => {
  if (gameId === ids.diceGame.id) {
    await diceOnWinOrFail(data);
  }
};
export const validateBalance = async balance => {
  if (balance <= 0) {
    const model = document.getElementById('authentication-modal');
    const toggleTopUpModel = () => {
      model.classList.toggle('hidden');
      document.body.classList.remove('open');
    };
    toggleTopUpModel();
  }
};
