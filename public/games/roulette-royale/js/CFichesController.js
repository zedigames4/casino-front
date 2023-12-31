function CFichesController(oContainer) {
  var _aValueFichesInPos;
  var _aMcFichesInPos;
  var _aBetStackData;
  var _aBetStackTag;
  var _aFichesOnTable;

  var _oContainer;

  this._init = function (oContainer) {
    _oContainer = oContainer;
    this.reset();
  };

  this.reset = function () {
    this._removeAllFichesOnTable();

    _aValueFichesInPos = [];
    _aMcFichesInPos = [];
    _aBetStackData = [];
    _aBetStackTag = [];
    _aFichesOnTable = [];
  };

  this.setFicheOnTable = function (
    iIndexFicheSelected,
    szNameAttach,
    aMcFiches,
  ) {
    this.addFicheOnTable(iIndexFicheSelected, szNameAttach, aMcFiches);
    _aBetStackTag.push({ tag: 'oBetSingle', num: 1 });
  };

  this.addFicheOnTable = function (
    iIndexFicheSelected,
    szNameAttach,
    aMcFiches,
  ) {
    if (_aValueFichesInPos[szNameAttach] === undefined) {
      _aValueFichesInPos[szNameAttach] = 0;
    }

    var iFicheValue = s_oGameSettings.getFicheValues(iIndexFicheSelected);
    _aValueFichesInPos[szNameAttach] += iFicheValue;
    _aValueFichesInPos[szNameAttach] = roundDecimal(
      _aValueFichesInPos[szNameAttach],
      1,
    );

    var aFiches = s_oGameSettings.generateFichesPileByIndex(
      _aValueFichesInPos[szNameAttach],
    );
    aFiches.sort(function (a, b) {
      return a - b;
    });

    this._removeFichesPile(_aMcFichesInPos[szNameAttach]);
    _aMcFichesInPos[szNameAttach] = [];

    var oPos = s_oGameSettings.getAttachOffset(szNameAttach);
    var iXPos = oPos.x;
    var iYPos = oPos.y;
    for (var k = 0; k < aFiches.length; k++) {
      aMcFiches.push(
        this._attachFichesPile(aFiches[k], szNameAttach, iXPos, iYPos),
      );
      iYPos -= 5;
    }

    _aBetStackData.push({ index: szNameAttach, value: iIndexFicheSelected });
  };

  this._attachFichesPile = function (
    iIndexFicheSelected,
    szNameAttach,
    iXPos,
    iYPos,
  ) {
    var oFicheMc = new CFiche(iXPos, iYPos, iIndexFicheSelected, _oContainer);

    _aMcFichesInPos[szNameAttach].push(oFicheMc);
    _aFichesOnTable.push(oFicheMc);

    return oFicheMc;
  };

  this.createPileForVoisinZero = function (iIndexFicheSelected, aFichesMc) {
    this.addFicheOnTable(iIndexFicheSelected, 'bet_0_2_3', aFichesMc);
    this.addFicheOnTable(iIndexFicheSelected, 'bet_0_2_3', aFichesMc);

    this.addFicheOnTable(iIndexFicheSelected, 'bet_4_7', aFichesMc);
    this.addFicheOnTable(iIndexFicheSelected, 'bet_12_15', aFichesMc);
    this.addFicheOnTable(iIndexFicheSelected, 'bet_18_21', aFichesMc);
    this.addFicheOnTable(iIndexFicheSelected, 'bet_19_22', aFichesMc);

    this.addFicheOnTable(iIndexFicheSelected, 'bet_25_26_28_29', aFichesMc);
    this.addFicheOnTable(iIndexFicheSelected, 'bet_25_26_28_29', aFichesMc);

    this.addFicheOnTable(iIndexFicheSelected, 'bet_32_35', aFichesMc);

    _aBetStackTag.push({ tag: 'oBetVoisinsZero', num: 9 });
  };

  this.createPileForTier = function (iIndexFicheSelected, aFichesMc) {
    this.addFicheOnTable(iIndexFicheSelected, 'bet_5_8', aFichesMc);
    this.addFicheOnTable(iIndexFicheSelected, 'bet_10_11', aFichesMc);
    this.addFicheOnTable(iIndexFicheSelected, 'bet_13_16', aFichesMc);
    this.addFicheOnTable(iIndexFicheSelected, 'bet_23_24', aFichesMc);
    this.addFicheOnTable(iIndexFicheSelected, 'bet_27_30', aFichesMc);
    this.addFicheOnTable(iIndexFicheSelected, 'bet_33_36', aFichesMc);

    _aBetStackTag.push({ tag: 'oBetTier', num: 6 });
  };

  this.createPileForOrphelins = function (iIndexFicheSelected, aFichesMc) {
    this.addFicheOnTable(iIndexFicheSelected, 'bet_1', aFichesMc);
    this.addFicheOnTable(iIndexFicheSelected, 'bet_6_9', aFichesMc);
    this.addFicheOnTable(iIndexFicheSelected, 'bet_14_17', aFichesMc);
    this.addFicheOnTable(iIndexFicheSelected, 'bet_17_20', aFichesMc);
    this.addFicheOnTable(iIndexFicheSelected, 'bet_31_34', aFichesMc);

    _aBetStackTag.push({ tag: 'oBetOrphelins', num: 5 });
  };

  this.createPileForMultipleNumbers = function (
    iIndexFicheSelected,
    aNumbers,
    aFichesMc,
  ) {
    for (var i = 0; i < aNumbers.length; i++) {
      this.addFicheOnTable(
        iIndexFicheSelected,
        'bet_' + aNumbers[i],
        aFichesMc,
      );
    }

    _aBetStackTag.push({ tag: 'oBetMultiple', num: aNumbers.length });
  };

  this._removeAllFichesOnTable = function () {
    if (_aFichesOnTable) {
      for (var i = 0; i < _aFichesOnTable.length; i++) {
        if (_oContainer.contains(_aFichesOnTable[i].getSprite())) {
          _oContainer.removeChild(_aFichesOnTable[i].getSprite());
        }
      }
    }
  };

  this._removeFichesPile = function (aFiches) {
    for (var i in aFiches) {
      _oContainer.removeChild(aFiches[i].getSprite());
    }
  };

  this.clearLastBet = function () {
    if (_aBetStackTag.length === 0) {
      return 0;
    }

    var oBetTag = _aBetStackTag.pop();
    var iNumIteration = oBetTag.num;
    var iFicheValue;
    for (var i = 0; i < iNumIteration; i++) {
      var oBetInfo = _aBetStackData.pop();
      iFicheValue = s_oGameSettings.getFicheValues(oBetInfo.value);
      _aValueFichesInPos[oBetInfo.index] -= iFicheValue;
      _aValueFichesInPos[oBetInfo.index] = roundDecimal(
        _aValueFichesInPos[oBetInfo.index],
        1,
      );

      var aFiches = s_oGameSettings.generateFichesPileByIndex(
        _aValueFichesInPos[oBetInfo.index],
      );
      aFiches.sort(function (a, b) {
        return a - b;
      });

      this._removeFichesPile(_aMcFichesInPos[oBetInfo.index]);
      _aMcFichesInPos[oBetInfo.index] = [];

      var oPos = s_oGameSettings.getAttachOffset(oBetInfo.index);
      var iXPos = oPos.x;
      var iYPos = oPos.y;
      for (var k = 0; k < aFiches.length; k++) {
        this._attachFichesPile(aFiches[k], oBetInfo.index, iXPos, iYPos);
        iYPos -= 5;
      }
    }

    return iFicheValue * iNumIteration;
  };

  this.clearAllBets = function () {
    var iLen = _aBetStackData.length;
    for (var i = 0; i < iLen; i++) {
      this.clearLastBet();
    }
  };

  this._init(oContainer);
}
