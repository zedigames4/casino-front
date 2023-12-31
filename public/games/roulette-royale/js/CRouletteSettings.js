function CRouletteSettings() {
  var _aFicheValues;
  var _aRedNumbers;
  var _aBlackNumbers;
  var _aFrameForBallSpin;
  var _aAttachFiches;

  this._init = function () {
    var oSprite = s_oSpriteLibrary.getSprite('hit_area_number');
    WIDTH_CELL_NUMBER = oSprite.width;
    HEIGHT_CELL_NUMBER = oSprite.height;

    this._initAttachFiches();

    _aFicheValues = [0.1, 1, 5, 10, 25, 100];
    _aBlackNumbers = [
      2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35,
    ];
    _aRedNumbers = [
      1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
    ];

    _aFrameForBallSpin = [];

    _aFrameForBallSpin[0] = [];
    _aFrameForBallSpin[0][0] = 70;
    _aFrameForBallSpin[0][1] = 8;
    _aFrameForBallSpin[0][2] = 54;
    _aFrameForBallSpin[0][3] = 76;
    _aFrameForBallSpin[0][4] = 59;
    _aFrameForBallSpin[0][5] = 19;
    _aFrameForBallSpin[0][6] = 43;
    _aFrameForBallSpin[0][7] = 86;
    _aFrameForBallSpin[0][8] = 27;
    _aFrameForBallSpin[0][9] = 96;
    _aFrameForBallSpin[0][10] = 21;
    _aFrameForBallSpin[0][11] = 32;
    _aFrameForBallSpin[0][12] = 81;
    _aFrameForBallSpin[0][13] = 38;
    _aFrameForBallSpin[0][14] = 3;
    _aFrameForBallSpin[0][15] = 65;
    _aFrameForBallSpin[0][16] = 13;
    _aFrameForBallSpin[0][17] = 48;
    _aFrameForBallSpin[0][18] = 92;
    _aFrameForBallSpin[0][19] = 62;
    _aFrameForBallSpin[0][20] = 5;
    _aFrameForBallSpin[0][21] = 57;
    _aFrameForBallSpin[0][22] = 95;
    _aFrameForBallSpin[0][23] = 24;
    _aFrameForBallSpin[0][24] = 16;
    _aFrameForBallSpin[0][25] = 51;
    _aFrameForBallSpin[0][26] = 73;
    _aFrameForBallSpin[0][27] = 40;
    _aFrameForBallSpin[0][28] = 84;
    _aFrameForBallSpin[0][29] = 89;
    _aFrameForBallSpin[0][30] = 30;
    _aFrameForBallSpin[0][31] = 0;
    _aFrameForBallSpin[0][32] = 68;
    _aFrameForBallSpin[0][33] = 11;
    _aFrameForBallSpin[0][34] = 46;
    _aFrameForBallSpin[0][35] = 78;
    _aFrameForBallSpin[0][36] = 35;
  };

  this._initAttachFiches = function () {
    _aAttachFiches = [];

    _aAttachFiches['bet_0'] = { x: 53, y: 117 };

    var iCurX = 127;
    var iCurY = 196;
    for (var i = 1; i < 37; i++) {
      _aAttachFiches['bet_' + i] = { x: iCurX, y: iCurY };

      if (i % 3 === 0) {
        iCurX += WIDTH_CELL_NUMBER + 3;
        iCurY = 196;
      } else {
        iCurY -= HEIGHT_CELL_NUMBER + 3;
      }
    }

    _aAttachFiches['bet_0_1'] = { x: 97, y: 195 };
    _aAttachFiches['bet_0_2'] = { x: 97, y: 120 };
    _aAttachFiches['bet_0_3'] = { x: 97, y: 45 };

    var iCurX = 159;
    var iCurY = 194;
    for (var j = 1; j < 34; j++) {
      _aAttachFiches['bet_' + j + '_' + (j + 3)] = { x: iCurX, y: iCurY };

      if (j % 3 === 0) {
        iCurX += WIDTH_CELL_NUMBER + 3;
        iCurY = 194;
      } else {
        iCurY -= HEIGHT_CELL_NUMBER + 3;
      }
    }

    var iCurX = 128;
    var iCurY = 157;
    var iCont = 1;
    for (var j = 1; j < 25; j++) {
      _aAttachFiches['bet_' + iCont + '_' + (iCont + 1)] = {
        x: iCurX,
        y: iCurY,
      };

      if (j % 2 === 0) {
        iCurX += WIDTH_CELL_NUMBER + 3;
        iCurY = 157;
        iCont += 2;
      } else {
        iCurY -= HEIGHT_CELL_NUMBER + 3;
        iCont++;
      }
    }

    _aAttachFiches['bet_0_1_2'] = { x: 96, y: 158 };
    _aAttachFiches['bet_0_2_3'] = { x: 96, y: 84 };

    var iCurX = 128;
    var iCurY = 232;
    var iCont = 1;
    for (var j = 1; j < 13; j++) {
      _aAttachFiches['bet_' + iCont + '_' + (iCont + 1) + '_' + (iCont + 2)] = {
        x: iCurX,
        y: iCurY,
      };

      iCurX += WIDTH_CELL_NUMBER + 3;
      iCont += 3;
    }

    _aAttachFiches['bet_0_1_2_3'] = { x: 96, y: 232 };

    var iCurX = 158;
    var iCurY = 158;
    var iCont = 1;
    for (var k = 1; k < 23; k++) {
      _aAttachFiches[
        'bet_' +
          iCont +
          '_' +
          (iCont + 1) +
          '_' +
          (iCont + 3) +
          '_' +
          (iCont + 4)
      ] = {
        x: iCurX,
        y: iCurY,
      };

      if (k % 2 === 0) {
        iCurX += WIDTH_CELL_NUMBER + 3;
        iCurY = 157;
        iCont += 2;
      } else {
        iCurY -= HEIGHT_CELL_NUMBER + 3;
        iCont++;
      }
    }

    var iCurX = 158;
    var iCurY = 232;
    var iCont = 1;
    for (var k = 1; k < 12; k++) {
      _aAttachFiches[
        'bet_' +
          iCont +
          '_' +
          (iCont + 1) +
          '_' +
          (iCont + 2) +
          '_' +
          (iCont + 3) +
          '_' +
          (iCont + 4) +
          '_' +
          (iCont + 5)
      ] = {
        x: iCurX,
        y: iCurY,
      };

      iCont += 3;
      iCurX += WIDTH_CELL_NUMBER + 3;
    }

    _aAttachFiches['col1'] = { x: 872, y: 194 };
    _aAttachFiches['col2'] = { x: 872, y: 120 };
    _aAttachFiches['col3'] = { x: 872, y: 46 };

    _aAttachFiches['first12'] = { x: 220, y: 289 };
    _aAttachFiches['second12'] = { x: 469, y: 289 };
    _aAttachFiches['third12'] = { x: 717, y: 289 };
    _aAttachFiches['first18'] = { x: 159, y: 400 };
    _aAttachFiches['even'] = { x: 281, y: 400 };
    _aAttachFiches['black'] = { x: 409, y: 400 };
    _aAttachFiches['red'] = { x: 533, y: 400 };
    _aAttachFiches['odd'] = { x: 656, y: 400 };
    _aAttachFiches['second18'] = { x: 778, y: 400 };

    _aAttachFiches['oDealerWin'] = { x: CANVAS_WIDTH / 2, y: -232 };
    _aAttachFiches['oReceiveWin'] = {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT + 100,
    };
  };

  this.generateFichesPileByIndex = function (iFichesValue) {
    var aFichesPile = [];
    var iValueRest;
    var iCont = _aFicheValues.length - 1;
    var iCurMaxFicheStake = _aFicheValues[iCont];

    do {
      iValueRest = iFichesValue % iCurMaxFicheStake;
      iValueRest = roundDecimal(iValueRest, 1);

      var iDivisionWithPrecision = roundDecimal(
        iFichesValue / iCurMaxFicheStake,
        1,
      );
      var iDivision = Math.floor(iDivisionWithPrecision);
      for (var i = 0; i < iDivision; i++) {
        aFichesPile.push(this.getFicheIndexByValue(iCurMaxFicheStake));
      }

      iCont--;
      iCurMaxFicheStake = _aFicheValues[iCont];
      iFichesValue = iValueRest;
    } while (iValueRest > 0 && iCont > -1);

    return aFichesPile;
  };

  this.getNumbersForButton = function (szName) {
    var aNumbers;
    switch (szName) {
      case 'col1': {
        aNumbers = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
        break;
      }

      case 'col2': {
        aNumbers = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
        break;
      }

      case 'col3': {
        aNumbers = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
        break;
      }

      case 'first12': {
        aNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        break;
      }

      case 'second12': {
        aNumbers = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
        break;
      }

      case 'third12': {
        aNumbers = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
        break;
      }

      case 'first18': {
        aNumbers = [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
        ];
        break;
      }

      case 'second18': {
        aNumbers = [
          19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
          36,
        ];
        break;
      }

      case 'even': {
        aNumbers = [
          2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36,
        ];
        break;
      }

      case 'black': {
        aNumbers = [
          2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35,
        ];
        break;
      }

      case 'red': {
        aNumbers = [
          1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
        ];
        break;
      }

      case 'odd': {
        aNumbers = [
          1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35,
        ];
        break;
      }

      case 'oBetVoisinsZero': {
        aNumbers = [
          22, 18, 29, 7, 28, 12, 35, 3, 26, 0, 32, 15, 19, 4, 21, 2, 25,
        ];
        break;
      }

      case 'oBetTier': {
        aNumbers = [27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33];
        break;
      }

      case 'oBetOrphelins': {
        aNumbers = [1, 6, 9, 14, 17, 20, 31, 34];
        break;
      }

      case 'oBetFinalsBet': {
        break;
      }
    }
    return aNumbers;
  };

  this.getBetMultiplierForButton = function (szName) {
    var iBetMultiplier;
    switch (szName) {
      case 'oBetFirstRow': {
        iBetMultiplier = 12;
        break;
      }

      case 'oBetSecondRow': {
        iBetMultiplier = 12;
        break;
      }

      case 'oBetThirdRow': {
        iBetMultiplier = 12;
        break;
      }

      case 'oBetFirst12': {
        iBetMultiplier = 12;
        break;
      }

      case 'oBetSecond12': {
        iBetMultiplier = 12;
        break;
      }

      case 'oBetThird12': {
        iBetMultiplier = 12;
        break;
      }

      case 'oBetFirst18': {
        iBetMultiplier = 18;
        break;
      }

      case 'oBetSecond18': {
        iBetMultiplier = 18;
        break;
      }

      case 'oBetEven': {
        iBetMultiplier = 18;
        break;
      }

      case 'oBetBlack': {
        iBetMultiplier = 18;
        break;
      }

      case 'oBetRed': {
        iBetMultiplier = 18;
        break;
      }

      case 'oBetOdd': {
        iBetMultiplier = 18;
        break;
      }

      case 'oBetVoisinsZero': {
        iBetMultiplier = 17;
        break;
      }

      case 'oBetTier': {
        iBetMultiplier = 12;
        break;
      }

      case 'oBetOrphelins': {
        iBetMultiplier = 8;
        break;
      }

      case 'oBetFinalsBet': {
        iBetMultiplier = 4;
        break;
      }
    }

    return iBetMultiplier;
  };

  this.getBetWinForButton = function (szName) {
    var iBetWin;
    switch (szName) {
      case 'oBetFirstRow': {
        iBetWin = 3;
        break;
      }

      case 'oBetSecondRow': {
        iBetWin = 3;
        break;
      }

      case 'oBetThirdRow': {
        iBetWin = 3;
        break;
      }

      case 'oBetFirst12': {
        iBetWin = 3;
        break;
      }

      case 'oBetSecond12': {
        iBetWin = 3;
        break;
      }

      case 'oBetThird12': {
        iBetWin = 3;
        break;
      }

      case 'oBetFirst18': {
        iBetWin = 2;
        break;
      }

      case 'oBetSecond18': {
        iBetWin = 2;
        break;
      }

      case 'oBetEven': {
        iBetWin = 2;
        break;
      }

      case 'oBetBlack': {
        iBetWin = 2;
        break;
      }

      case 'oBetRed': {
        iBetWin = 2;
        break;
      }

      case 'oBetOdd': {
        iBetWin = 2;
        break;
      }

      case 'oBetVoisinsZero': {
        iBetWin = 2;
        break;
      }

      case 'oBetTier': {
        iBetWin = 3;
        break;
      }

      case 'oBetOrphelins': {
        iBetWin = 4;
        break;
      }

      case 'oBetFinalsBet': {
        iBetWin = 4;
        break;
      }
    }

    return iBetWin;
  };

  this.getNumFichesPerBet = function (szName) {
    var iNumFiches;
    switch (szName) {
      case 'oBetVoisinsZero': {
        iNumFiches = 9;
        break;
      }

      case 'oBetTier': {
        iNumFiches = 6;
        break;
      }

      case 'oBetOrphelins': {
        iNumFiches = 5;
        break;
      }
    }

    return iNumFiches;
  };

  this.getFicheValues = function (iIndex) {
    return _aFicheValues[iIndex];
  };

  this.getFicheIndexByValue = function (iValue) {
    var iIndex = 0;
    for (var i = 0; i < _aFicheValues.length; i++) {
      if (iValue === _aFicheValues[i]) {
        iIndex = i;
        break;
      }
    }
    return iIndex;
  };

  this.getColorNumber = function (iNumber) {
    var i = 0;
    for (i = 0; i < _aBlackNumbers.length; i++) {
      if (_aBlackNumbers[i] === iNumber) {
        return COLOR_BLACK;
      }
    }

    for (i = 0; i < _aRedNumbers.length; i++) {
      if (_aRedNumbers[i] === iNumber) {
        return COLOR_RED;
      }
    }

    return COLOR_ZERO;
  };

  this.getFrameForBallSpin = function (iType, iNum) {
    return _aFrameForBallSpin[iType][iNum];
  };

  this.getAttachOffset = function (szAttach) {
    return _aAttachFiches[szAttach];
  };

  this._init();
}
