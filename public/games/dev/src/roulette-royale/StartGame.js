import { getWallet } from '../system/GlobalFunctions.js';
import { onBets, onWinOrFail } from '../utils/functions.js';

async function startGame() {
  let money = 0.0;
  try {
    let wallet = await getWallet();
    console.log('wallet', wallet);
    money = wallet.balanceInCoin.toFixed(2);
  } catch (err) {
    console.error(err);
  }
  var oMain = new CMain({
    money: money, //STARING CREDIT FOR THE USER
    min_bet: 0.1, //MINIMUM BET
    max_bet: money, //MAXIMUM BET
    time_bet: 0, //TIME TO WAIT FOR A BET IN MILLISECONDS. SET 0 IF YOU DON'T WANT BET LIMIT
    time_winner: 1500, //TIME FOR WINNER SHOWING IN MILLISECONDS
    win_occurrence: 30, //Win occurrence percentage (100 = always win).
    //SET THIS VALUE TO -1 IF YOU WANT WIN OCCURRENCE STRICTLY RELATED TO PLAYER BET ( SEE DOCUMENTATION)
    casino_cash: money, //The starting casino cash that is recharged by the money lost by the user
    fullscreen: true, //SET THIS TO FALSE IF YOU DON'T WANT TO SHOW FULLSCREEN BUTTON
    check_orientation: true, //SET TO FALSE IF YOU DON'T WANT TO SHOW ORIENTATION ALERT
    show_credits: true, //ENABLE/DISABLE CREDITS BUTTON IN THE MAIN SCREEN
    num_hand_before_ads: 10, //NUMBER OF HANDS PLAYED BEFORE AD SHOWN
    //
    //// THIS FUNCTIONALITY IS ACTIVATED ONLY WITH CTL ARCADE PLUGIN.///////////////////////////
    /////////////////// YOU CAN GET IT AT: /////////////////////////////////////////////////////////
    // http://codecanyon.net/item/ctl-arcade-wordpress-plugin/13856421 ///////////
  });

  $(oMain).on('recharge', function (evt) {
    //alert("recharge");
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

  $(oMain).on('bet_placed', async function (evt, iTotBet) {
    try {
      const data = await onBets(iTotBet);
      console.log('betData', data);
      variables.roulette_royale.recentBetId = data._id;
    } catch (error) {
      console.log('3323232');
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

  $(oMain).on('save_score', async function (evt, iMoney) {
    try {
      let payload = {
        iMoney,
        getCredit: _oMySeat.getCredit(),
        getCurBet: _oMySeat.getCurBet(),
        getNumberSelected: _oMySeat.getNumberSelected(),
        getNumbersBetted: _oMySeat.getNumbersBetted(),
      };
      const data = await onWinOrFail(
        _oWheelAnim.getIWin(),
        variables.roulette_royale.recentBetId,
        payload,
      );
      console.log('response after bet win or lose', data);
    } catch (err) {
      console.log('dfdgdfh43');
      console.error(err);
      await Swal.fire({
        icon: 'error',
        title: 'Something went wrong ',
        text: 'Please contact us !',
        footer: '<a href="/help">go to contact us?</a>',
      });
      window.location.href = '/help';
    } finally {
      variables.roulette_royale.recentBetId = undefined;
    }

    if (getParamValue('ctl-arcade') === 'true') {
      parent.__ctlArcadeSaveScore({ score: iMoney });
    }
    //...ADD YOUR CODE HERE EVENTUALLY
  });

  $(oMain).on('show_interlevel_ad', function (evt) {
    if (getParamValue('ctl-arcade') === 'true') {
      parent.__ctlArcadeShowInterlevelAD();
    }
    //...ADD YOUR CODE HERE EVENTUALLY
  });

  $(oMain).on('share_event', function (evt, iMoney) {
    if (getParamValue('ctl-arcade') === 'true') {
      parent.__ctlArcadeShareEvent({
        img: '200x200.jpg',
        title: TEXT_CONGRATULATIONS,
        msg: TEXT_SHARE_1 + iMoney + TEXT_SHARE_2,
        msg_share: TEXT_SHARE_3 + iMoney + TEXT_SHARE_4,
      });
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
