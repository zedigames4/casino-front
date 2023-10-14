function CMsgBox() {
  var _oBg;
  var _oMsgText;
  var _oGroup;
  var _oButRecharge;

  this._init = function () {
    _oGroup = new createjs.Container();
    _oGroup.alpha = 0;
    _oGroup.visible = false;
    s_oStage.addChild(_oGroup);

    _oBg = createBitmap(s_oSpriteLibrary.getSprite('msg_box'));
    _oBg.on('click', function () {});
    _oGroup.addChild(_oBg);

    _oMsgText = new CTLText(
      _oGroup,
      CANVAS_WIDTH / 2 - 200,
      CANVAS_HEIGHT / 2 - 100,
      400,
      130,
      34,
      'center',
      '#fff',
      FONT1,
      1,
      0,
      0,
      '',
      true,
      true,
      true,
      false,
    );
    _oButRecharge = new CTextButton(
      CANVAS_WIDTH / 2,
      500,
      s_oSpriteLibrary.getSprite('but_bg'),
      TEXT_RECHARGE,
      FONT1,
      '#fff',
      30,
      _oGroup,
    );
    _oButRecharge.setVisible(true);
    _oButRecharge.addEventListener(ON_MOUSE_UP, this._onRecharge, this);
  };

  this.unload = function () {
    _oBg.off('click', function () {});
    _oButRecharge.unload();
  };

  this.show = function (szMsg) {
    _oMsgText.refreshText(szMsg);

    _oGroup.visible = true;

    var oParent = this;
    createjs.Tween.get(_oGroup).to({ alpha: 1 }, 500);
    setTimeout(function () {
      oParent._onExit();
    }, 6000);
  };

  this._onExit = function () {
    if (_oGroup.visible) {
      _oGroup.off('mousedown');
      _oGroup.visible = false;
    }
  };

  this._onRecharge = function () {
    // $(s_oMain).trigger('recharge');

    (async () => {
      try {
        let globalFunctions = await import(
          '../../dev/src/system/GlobalFunctions.js'
        );
        await globalFunctions
          .validateBalance(0)
          .catch(error => console.error(error));
      } catch (e) {
        console.error(e);
      }
    })();
    _oGroup.visible = false;
  };
  this._init();

  return this;
}
