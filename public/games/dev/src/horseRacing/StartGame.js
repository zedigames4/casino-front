import { getWallet } from '../system/GlobalFunctions.js';
import { horseOnWinOrFail, onHorseRacingBets } from './index.js';

async function startGame() {
  let money = 0;
  try {
    let wallet = await getWallet();
    money = wallet.balanceInCoin.toFixed(1);
  } catch (err) {
    console.log(err);
  }

  var oMain = new CMain({
    money: money, //USER MONEY
    min_bet: 1, //MINIMUM BET
    max_bet: 100, //MAXIMUM BET
    win_occurrence: 20, //WIN OCCURRENCE
    game_cash: 100, //GAME CASH. STARTING MONEY THAT THE GAME CAN DELIVER.
    chip_values: [1, 5, 10, 25, 50, 100], //VALUE OF CHIPS
    audio_enable_on_startup: false, //ENABLE/DISABLE AUDIO WHEN GAME STARTS
    show_credits: true, //SET THIS VALUE TO FALSE IF YOU DON'T TO SHOW CREDITS BUTTON
    fullscreen: true, //SET THIS TO FALSE IF YOU DON'T WANT TO SHOW FULLSCREEN BUTTON
    check_orientation: true, //SET TO FALSE IF YOU DON'T WANT TO SHOW ORIENTATION ALERT ON MOBILE DEVICES
    num_levels_for_ads: 2, //NUMBER OF TURNS PLAYED BEFORE AD SHOWING //
    //////// THIS FEATURE  IS ACTIVATED ONLY WITH CTL ARCADE PLUGIN//////////////////////////
    /////////////////// YOU CAN GET IT AT: /////////////////////////////////////////////////////////
    // http://codecanyon.net/item/ctl-arcade-wordpress-plugin/13856421///////////
  });

  $(oMain).on('recharge', function (evt) {
    //INSERT HERE YOUR RECHARGE SCRIPT THAT RETURN MONEY TO RECHARGE
    var iMoney = 100;
    if (s_oBetPanel !== null) {
      s_oBetPanel.setMoney(iMoney);
    }
  });

  $(oMain).on('start_session', function (evt) {
    if (getParamValue('ctl-arcade') === 'true') {
      parent.__ctlArcadeStartSession();
    }
  });

  $(oMain).on('end_session', function (evt) {
    console.log('on end_session');
    if (getParamValue('ctl-arcade') === 'true') {
      parent.__ctlArcadeEndSession();
    }
  });

  $(oMain).on('bet_placed', async function (evt, iTotBet) {
    //...ADD YOUR CODE HERE EVENTUALLY
    console.log('on bet_placed', iTotBet);
    try {
      const data = await onHorseRacingBets(iTotBet);
      console.log(data);
    } catch (error) {
      console.log('horse catch on dfffdfd');
      console.error(error);
      await Swal.fire({
        icon: 'error',
        title: 'Something went wrong ',
        text: 'Please contact us !',
        footer: '<a href="/help">go to contact us?</a>',
      });
      window.location.href = '/help';
    }
  });

  $(oMain).on('save_score', async function (evt, iScore) {
    const playLoad = {
      _iWinGlobal,
      _bUpdate,
      _bWin,
      _bCheckArrival,
      _bCachingTrack,
      _iTotBet,
      _iWin,
      _aWinList,
    };
    try {
      const data = await horseOnWinOrFail(
        _iWin,
        variables.horseRacing.recentBetId,
        playLoad,
      );
    } catch (err) {
      console.error(err);
    } finally {
      variables.horseRacing.recentBetId = undefined;
    }
    if (getParamValue('ctl-arcade') === 'true') {
      parent.__ctlArcadeSaveScore({ score: iScore });
    }
  });

  $(oMain).on('show_interlevel_ad', function (evt) {
    console.log('on show_interlevel_ad');
    if (getParamValue('ctl-arcade') === 'true') {
      parent.__ctlArcadeShowInterlevelAD();
    }
  });

  $(oMain).on('share_event', function (evt, iScore) {
    console.log('share_event', iScore);
    if (getParamValue('ctl-arcade') === 'true') {
      parent.__ctlArcadeShareEvent({
        img: TEXT_SHARE_IMAGE,
        title: TEXT_SHARE_TITLE,
        msg: TEXT_SHARE_MSG1 + iScore + TEXT_SHARE_MSG2,
        msg_share: TEXT_SHARE_SHARE1 + iScore + TEXT_SHARE_SHARE1,
      });
    }
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
