"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _HttpException = require("../exceptions/HttpException");
var _keys = _interopRequireDefault(require("../keys"));
var _Bet = _interopRequireDefault(require("../models/Bet"));
var _Game = _interopRequireDefault(require("../models/Game"));
var _slug = _interopRequireDefault(require("../utils/slug"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class PlaynowController {}
exports.default = PlaynowController;
_defineProperty(PlaynowController, "play", async (req, res) => {
  try {
    const {
      betId: id
    } = req.params;
    const findOne = await _Bet.default.findOne({
      _id: id,
      user: req.user._id
    }).populate('game');
    if (!findOne) throw new _HttpException.HttpException(409, 'Bet before playing');
    const game = findOne.game;
    const url = `${_keys.default.HOST}/play/${(0, _slug.default)(game.title)}?user=${findOne.user}&game=${game._id}&bet=${findOne._id}&token=${req.user.token}`;
    res.redirect(url);
  } catch (error) {
    res.status(error?.status || 500).json({
      message: error?.message || 'something went wrong'
    });
  }
});
_defineProperty(PlaynowController, "startGame", async (req, res) => {
  try {
    const {
      gameId: id
    } = req.params;
    const findOne = await _Game.default.findById(id);
    if (!findOne) throw new _HttpException.HttpException(409, 'Game is not found');
    const url = `${_keys.default.HOST}/play/${(0, _slug.default)(findOne.title)}?user=${req.user._id}&game=${findOne._id}&token=${req.user.token}`;
    res.redirect(url);
  } catch (error) {
    res.status(error?.status || 500).json({
      message: error?.message || 'something went wrong'
    });
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJQbGF5bm93Q29udHJvbGxlciIsInJlcSIsInJlcyIsImJldElkIiwiaWQiLCJwYXJhbXMiLCJmaW5kT25lIiwiQmV0IiwiX2lkIiwidXNlciIsInBvcHVsYXRlIiwiSHR0cEV4Y2VwdGlvbiIsImdhbWUiLCJ1cmwiLCJLZXlzIiwiSE9TVCIsImNvbnZlcnRUb1NsdWciLCJ0aXRsZSIsInRva2VuIiwicmVkaXJlY3QiLCJlcnJvciIsInN0YXR1cyIsImpzb24iLCJtZXNzYWdlIiwiZ2FtZUlkIiwiR2FtZSIsImZpbmRCeUlkIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb250cm9sbGVycy9QbGF5Tm93Q29udHJvbGxlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xyXG5pbXBvcnQgeyBIdHRwRXhjZXB0aW9uIH0gZnJvbSAnLi4vZXhjZXB0aW9ucy9IdHRwRXhjZXB0aW9uJztcclxuaW1wb3J0IHsgUmVxdWVzdFdpdGhVc2VyIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9hdXRoLmludGVyZmFjZSc7XHJcbmltcG9ydCBLZXlzIGZyb20gJy4uL2tleXMnO1xyXG5pbXBvcnQgQmV0IGZyb20gJy4uL21vZGVscy9CZXQnO1xyXG5pbXBvcnQgR2FtZSBmcm9tICcuLi9tb2RlbHMvR2FtZSc7XHJcbmltcG9ydCBjb252ZXJ0VG9TbHVnIGZyb20gJy4uL3V0aWxzL3NsdWcnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheW5vd0NvbnRyb2xsZXIge1xyXG4gIHN0YXRpYyBwbGF5ID0gYXN5bmMgKHJlcTogUmVxdWVzdFdpdGhVc2VyLCByZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IGJldElkOiBpZCB9ID0gcmVxLnBhcmFtcztcclxuXHJcbiAgICAgIGNvbnN0IGZpbmRPbmUgPSBhd2FpdCBCZXQuZmluZE9uZSh7XHJcbiAgICAgICAgX2lkOiBpZCxcclxuICAgICAgICB1c2VyOiByZXEudXNlci5faWQsXHJcbiAgICAgIH0pLnBvcHVsYXRlKCdnYW1lJyk7XHJcbiAgICAgIGlmICghZmluZE9uZSlcclxuICAgICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbig0MDksICdCZXQgYmVmb3JlIHBsYXlpbmcnKTtcclxuXHJcbiAgICAgIGNvbnN0IGdhbWUgPSBmaW5kT25lLmdhbWUgYXMgYW55O1xyXG5cclxuICAgICAgY29uc3QgdXJsID0gYCR7S2V5cy5IT1NUfS9wbGF5LyR7Y29udmVydFRvU2x1ZyhcclxuICAgICAgICBnYW1lLnRpdGxlLFxyXG4gICAgICApfT91c2VyPSR7ZmluZE9uZS51c2VyfSZnYW1lPSR7Z2FtZS5faWR9JmJldD0ke1xyXG4gICAgICAgIGZpbmRPbmUuX2lkXHJcbiAgICAgIH0mdG9rZW49JHtyZXEudXNlci50b2tlbn1gO1xyXG4gICAgICByZXMucmVkaXJlY3QodXJsKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgICAgcmVzLnN0YXR1cyhlcnJvcj8uc3RhdHVzIHx8IDUwMCkuanNvbih7XHJcbiAgICAgICAgbWVzc2FnZTogZXJyb3I/Lm1lc3NhZ2UgfHwgJ3NvbWV0aGluZyB3ZW50IHdyb25nJyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIHN0YXJ0R2FtZSA9IGFzeW5jIChyZXE6IFJlcXVlc3RXaXRoVXNlciwgcmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBnYW1lSWQ6IGlkIH0gPSByZXEucGFyYW1zO1xyXG5cclxuICAgICAgY29uc3QgZmluZE9uZSA9IGF3YWl0IEdhbWUuZmluZEJ5SWQoaWQpO1xyXG4gICAgICBpZiAoIWZpbmRPbmUpIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKDQwOSwgJ0dhbWUgaXMgbm90IGZvdW5kJyk7XHJcblxyXG4gICAgICBjb25zdCB1cmwgPSBgJHtLZXlzLkhPU1R9L3BsYXkvJHtjb252ZXJ0VG9TbHVnKFxyXG4gICAgICAgIGZpbmRPbmUudGl0bGUsXHJcbiAgICAgICl9P3VzZXI9JHtyZXEudXNlci5faWR9JmdhbWU9JHtmaW5kT25lLl9pZH0mdG9rZW49JHtcclxuICAgICAgICByZXEudXNlci50b2tlblxyXG4gICAgICB9YDtcclxuICAgICAgcmVzLnJlZGlyZWN0KHVybCk7XHJcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XHJcbiAgICAgIHJlcy5zdGF0dXMoZXJyb3I/LnN0YXR1cyB8fCA1MDApLmpzb24oe1xyXG4gICAgICAgIG1lc3NhZ2U6IGVycm9yPy5tZXNzYWdlIHx8ICdzb21ldGhpbmcgd2VudCB3cm9uZycsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQTBDO0FBQUE7QUFBQTtBQUFBO0FBRTNCLE1BQU1BLGlCQUFpQixDQUFDO0FBOEN0QztBQUFBLGdCQTlDb0JBLGlCQUFpQixVQUN0QixPQUFPQyxHQUFvQixFQUFFQyxHQUFhLEtBQUs7RUFDM0QsSUFBSTtJQUNGLE1BQU07TUFBRUMsS0FBSyxFQUFFQztJQUFHLENBQUMsR0FBR0gsR0FBRyxDQUFDSSxNQUFNO0lBRWhDLE1BQU1DLE9BQU8sR0FBRyxNQUFNQyxZQUFHLENBQUNELE9BQU8sQ0FBQztNQUNoQ0UsR0FBRyxFQUFFSixFQUFFO01BQ1BLLElBQUksRUFBRVIsR0FBRyxDQUFDUSxJQUFJLENBQUNEO0lBQ2pCLENBQUMsQ0FBQyxDQUFDRSxRQUFRLENBQUMsTUFBTSxDQUFDO0lBQ25CLElBQUksQ0FBQ0osT0FBTyxFQUNWLE1BQU0sSUFBSUssNEJBQWEsQ0FBQyxHQUFHLEVBQUUsb0JBQW9CLENBQUM7SUFFcEQsTUFBTUMsSUFBSSxHQUFHTixPQUFPLENBQUNNLElBQVc7SUFFaEMsTUFBTUMsR0FBRyxHQUFJLEdBQUVDLGFBQUksQ0FBQ0MsSUFBSyxTQUFRLElBQUFDLGFBQWEsRUFDNUNKLElBQUksQ0FBQ0ssS0FBSyxDQUNWLFNBQVFYLE9BQU8sQ0FBQ0csSUFBSyxTQUFRRyxJQUFJLENBQUNKLEdBQUksUUFDdENGLE9BQU8sQ0FBQ0UsR0FDVCxVQUFTUCxHQUFHLENBQUNRLElBQUksQ0FBQ1MsS0FBTSxFQUFDO0lBQzFCaEIsR0FBRyxDQUFDaUIsUUFBUSxDQUFDTixHQUFHLENBQUM7RUFDbkIsQ0FBQyxDQUFDLE9BQU9PLEtBQVUsRUFBRTtJQUNuQmxCLEdBQUcsQ0FBQ21CLE1BQU0sQ0FBQ0QsS0FBSyxFQUFFQyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztNQUNwQ0MsT0FBTyxFQUFFSCxLQUFLLEVBQUVHLE9BQU8sSUFBSTtJQUM3QixDQUFDLENBQUM7RUFDSjtBQUNGLENBQUM7QUFBQSxnQkF6QmtCdkIsaUJBQWlCLGVBMkJqQixPQUFPQyxHQUFvQixFQUFFQyxHQUFhLEtBQUs7RUFDaEUsSUFBSTtJQUNGLE1BQU07TUFBRXNCLE1BQU0sRUFBRXBCO0lBQUcsQ0FBQyxHQUFHSCxHQUFHLENBQUNJLE1BQU07SUFFakMsTUFBTUMsT0FBTyxHQUFHLE1BQU1tQixhQUFJLENBQUNDLFFBQVEsQ0FBQ3RCLEVBQUUsQ0FBQztJQUN2QyxJQUFJLENBQUNFLE9BQU8sRUFBRSxNQUFNLElBQUlLLDRCQUFhLENBQUMsR0FBRyxFQUFFLG1CQUFtQixDQUFDO0lBRS9ELE1BQU1FLEdBQUcsR0FBSSxHQUFFQyxhQUFJLENBQUNDLElBQUssU0FBUSxJQUFBQyxhQUFhLEVBQzVDVixPQUFPLENBQUNXLEtBQUssQ0FDYixTQUFRaEIsR0FBRyxDQUFDUSxJQUFJLENBQUNELEdBQUksU0FBUUYsT0FBTyxDQUFDRSxHQUFJLFVBQ3pDUCxHQUFHLENBQUNRLElBQUksQ0FBQ1MsS0FDVixFQUFDO0lBQ0ZoQixHQUFHLENBQUNpQixRQUFRLENBQUNOLEdBQUcsQ0FBQztFQUNuQixDQUFDLENBQUMsT0FBT08sS0FBVSxFQUFFO0lBQ25CbEIsR0FBRyxDQUFDbUIsTUFBTSxDQUFDRCxLQUFLLEVBQUVDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO01BQ3BDQyxPQUFPLEVBQUVILEtBQUssRUFBRUcsT0FBTyxJQUFJO0lBQzdCLENBQUMsQ0FBQztFQUNKO0FBQ0YsQ0FBQyJ9