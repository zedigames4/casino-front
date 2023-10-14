import { getWallet, validateBalance } from '../system/GlobalFunctions.js';
import { onBets, onWinOrFail } from '../utils/functions.js';

async function startGame() {
  let money = 0;
  try {
    let wallet = await getWallet();
    money = wallet.balanceInCoin.toFixed(1);
  } catch (err) {
    console.log(err);
  }
  var oMain = new CMain({
    start_credit: money, //Starting credits value
    start_bet: 1, //Base starting bet. Will increment with multiplier in game
    max_multiplier: 5, //Max multiplier value

    bank_cash: 100, //Starting credits owned by the bank. When a player win, founds will be subtract from here. When a player lose or bet, founds will be added here. If bank is 0, players always lose, in order to fill the bank.

    prize: [0, 2, 10, 5, 0, 1], //THE AMOUNT WON BY THE PLAYER;
    prize_probability: [10, 2, 1, 1, 10, 10], //THE OCCURENCY WIN OF THAT PRIZE. THE RATIO IS CALCULATED BY THE FORMULA: (single win occurrence/sum of all occurrence). For instance, in this case, prize 100 have 1/43 chance. Prize 50 have 4/43 chance.

    audio_enable_on_startup: false, //ENABLE/DISABLE AUDIO WHEN GAME STARTS
    show_credits: true, //SET THIS VALUE TO FALSE IF YOU DON'T WANT TO SHOW CREDITS BUTTON
    fullscreen: true, //SET THIS TO FALSE IF YOU DON'T WANT TO SHOW FULLSCREEN BUTTON
    check_orientation: true, //SET TO FALSE IF YOU DON'T WANT TO SHOW ORIENTATION ALERT ON MOBILE DEVICES

    //////////////////////////////////////////////////////////////////////////////////////////
    ad_show_counter: 5, //NUMBER OF BALL PLAYED BEFORE AD SHOWN
    //
    //// THIS FUNCTIONALITY IS ACTIVATED ONLY WITH CTL ARCADE PLUGIN.///////////////////////////
    /////////////////// YOU CAN GET IT AT: /////////////////////////////////////////////////////////
    // http://codecanyon.net/item/ctl-arcade-wordpress-plugin/13856421?s_phrase=&s_rank=27 ///////////
  });

  $(oMain).on('recharge', function (evt) {
    validateBalance(0).catch(error => console.error(error));
  });

  $(oMain).on('start_session', function (evt) {
    if (getParamValue('ctl-arcade') === 'true') {
      parent.__ctlArcadeStartSession();
    }
    //...ADD YOUR CODE HERE EVENTUALLY
  });

  $(oMain).on('end_session', function (evt) {
    if (getParamValue('ctl-arcade') === 'true') {
      parent.__ctlArcadeEndSession();
    }
    //...ADD YOUR CODE HERE EVENTUALLY
  });

  $(oMain).on('restart_level', function (evt, iLevel) {
    if (getParamValue('ctl-arcade') === 'true') {
      parent.__ctlArcadeRestartLevel({ level: iLevel });
    }
    //...ADD YOUR CODE HERE EVENTUALLY
  });

  $(oMain).on('save_score', async function (evt, iScore, szMode) {
    console.log('save_score .......');
    console.log(evt);
    console.log(iScore, szMode);
    try {
      const payload = {
        iScore,
        _bStartGame,
        iProfit,
        _iMultiply,
        _iCurBet,
        _iCurCredit,
        _iBankCash,
        _aProbability,
      };
      const data = await onWinOrFail(
        _iWin,
        variables.plinko.recentBetId,
        payload,
      );
      console.log('response after bet win or lose', data);
    } catch (err) {
      console.log('plinko catch on save_score');
      console.error(err);
      await Swal.fire({
        icon: 'error',
        title: 'Something went wrong ',
        text: 'Please contact us !',
        footer: '<a href="/help">go to contact us?</a>',
      });
      window.location.href = '/help';
    } finally {
      variables.plinko.recentBetId = undefined;
    }

    if (getParamValue('ctl-arcade') === 'true') {
      parent.__ctlArcadeSaveScore({ score: iScore, mode: szMode });
    }
    //...ADD YOUR CODE HERE EVENTUALLY
  });

  $(oMain).on('start_level', function (evt, iLevel) {
    if (getParamValue('ctl-arcade') === 'true') {
      parent.__ctlArcadeStartLevel({ level: iLevel });
    }
    //...ADD YOUR CODE HERE EVENTUALLY
  });

  $(oMain).on('end_level', function (evt, iLevel) {
    if (getParamValue('ctl-arcade') === 'true') {
      parent.__ctlArcadeEndLevel({ level: iLevel });
    }
    //...ADD YOUR CODE HERE EVENTUALLY
  });

  $(oMain).on('show_interlevel_ad', function (evt) {
    if (getParamValue('ctl-arcade') === 'true') {
      parent.__ctlArcadeShowInterlevelAD();
    }
    //...ADD YOUR CODE HERE EVENTUALLY
  });

  $(oMain).on('share_event', function (evt, iScore) {
    if (getParamValue('ctl-arcade') === 'true') {
      parent.__ctlArcadeShareEvent({
        img: TEXT_SHARE_IMAGE,
        title: TEXT_SHARE_TITLE,
        msg: TEXT_SHARE_MSG1 + iScore + TEXT_SHARE_MSG2,
        msg_share: TEXT_SHARE_SHARE1 + iScore + TEXT_SHARE_SHARE1,
      });
    }
    //...ADD YOUR CODE HERE EVENTUALLY
  });

  $(oMain).on('bet_placed', async function (evt, iTotBet) {
    try {
      const data = await onBets(iTotBet);
      console.log('betData', data);
      variables.plinko.recentBetId = data._id;
    } catch (error) {
      console.log('plinko catch on bet_placed');
      console.error(error);
      await Swal.fire({
        icon: 'error',
        title: 'Something went wrong ',
        text: 'Please contact us !',
        footer: '<a href="/help">go to contact us?</a>',
      });
      window.location.href = '/help';
    }
    //...ADD YOUR CODE HERE EVENTUALLY
  });

  if (isIOS()) {
    setTimeout(function () {
      sizeHandler();
    }, 200);
  } else {
    sizeHandler();
  }
}

$(document).ready(function () {
  startGame();
});
