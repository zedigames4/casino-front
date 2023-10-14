function CCreditsPanel() {
  var _oFade;
  var _oPanelContainer;
  var _oButExit;
  var _oLogo;
  var _oHitArea;
  var _oListener;

  var _pStartPanelPos;

  this._init = function () {
    _oFade = new createjs.Shape();
    _oFade.graphics
      .beginFill('black')
      .drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    _oFade.alpha = 0;
    s_oStage.addChild(_oFade);

    _oHitArea = new createjs.Shape();
    _oHitArea.graphics
      .beginFill('#0f0f0f')
      .drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    _oHitArea.alpha = 0.01;
    _oListener = _oHitArea.on('click', this._onLogoButRelease);
    s_oStage.addChild(_oHitArea);

    createjs.Tween.get(_oFade).to({ alpha: 0.7 }, 500);

    _oPanelContainer = new createjs.Container();
    s_oStage.addChild(_oPanelContainer);

    var oSprite = s_oSpriteLibrary.getSprite('msg_box');
    var oPanel = createBitmap(oSprite);
    oPanel.regX = oSprite.width / 2;
    oPanel.regY = oSprite.height / 2;
    _oPanelContainer.addChild(oPanel);

    _oPanelContainer.x = CANVAS_WIDTH / 2;
    _oPanelContainer.y = CANVAS_HEIGHT + oSprite.height / 2;
    _pStartPanelPos = { x: _oPanelContainer.x, y: _oPanelContainer.y };
    createjs.Tween.get(_oPanelContainer).to(
      { y: CANVAS_HEIGHT / 2 - 40 },
      500,
      createjs.Ease.quartIn,
    );

    var oTitle = new createjs.Text(
      'DEVELOPED BY',
      ' 50px ' + PRIMARY_FONT,
      '#ffffff',
    );
    oTitle.y = -100;
    oTitle.textAlign = 'center';
    oTitle.textBaseline = 'middle';
    oTitle.lineWidth = 300;
    _oPanelContainer.addChild(oTitle);

    var oLink = new createjs.Text(
      'www.codethislab.com',
      ' 50px ' + PRIMARY_FONT,
      '#ffffff',
    );
    oLink.y = 90;
    oLink.textAlign = 'center';
    oLink.textBaseline = 'middle';
    oLink.lineWidth = 300;
    _oPanelContainer.addChild(oLink);

    var oSprite = s_oSpriteLibrary.getSprite('ctl_logo');
    _oLogo = createBitmap(oSprite);
    _oLogo.regX = oSprite.width / 2;
    _oLogo.regY = oSprite.height / 2;
    _oPanelContainer.addChild(_oLogo);

    var oSprite = s_oSpriteLibrary.getSprite('but_exit');
    _oButExit = new CGfxButton(298, -200, oSprite, _oPanelContainer);
    _oButExit.addEventListener(ON_MOUSE_UP, this.unload, this);
  };

  this.unload = function () {
    _oButExit.setClickable(false);

    createjs.Tween.get(_oFade).to({ alpha: 0 }, 500);
    createjs.Tween.get(_oPanelContainer)
      .to({ y: _pStartPanelPos.y }, 400, createjs.Ease.backIn)
      .call(function () {
        s_oStage.removeChild(_oFade);
        s_oStage.removeChild(_oPanelContainer);
        s_oStage.removeChild(_oHitArea);

        _oButExit.unload();
      });

    _oHitArea.off('click', _oListener);
  };

  this._onLogoButRelease = function () {
    window.open('https://www.urutare.rw/');
  };

  this._onMoreGamesReleased = function () {
    window.open('https://www.urutare.rw/');
  };

  this._init();
}
