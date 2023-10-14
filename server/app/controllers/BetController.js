"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _HttpException = require("../exceptions/HttpException");
var _Bet = _interopRequireDefault(require("../models/Bet"));
var _Setting = _interopRequireDefault(require("../models/Setting"));
var _Wallet = _interopRequireDefault(require("../models/Wallet"));
var _constants = require("../utils/constants");
var _helper = require("../utils/helper");
var _pagination = require("../utils/pagination");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class BetController {}
exports.default = BetController;
_defineProperty(BetController, "getAll", async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const offset = (page - 1) * limit;
    const sort = String(req.query.sort || 'createdAt');
    const query = {};
    if (!(0, _helper.isRoleAllowed)(req.user.role)) {
      query.user = req.user._id;
    }
    const betStatus = req.query.status;
    if (betStatus && _constants.BET_STATUS.includes(betStatus.toUpperCase())) {
      query.status = betStatus;
    }
    const allData = await _Bet.default.find(query).select('user game iWin iToBet status createdAt').populate('user', '-_id firstName lastName email').populate('game', '-_id title').sort({
      [sort]: -1
    }).skip(offset).limit(limit);
    const count = await _Bet.default.count(query);
    const pagination = (0, _pagination.paginate)(count, limit, page);
    res.status(200).json({
      data: allData,
      pagination,
      message: 'findAll'
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      message: error?.message || 'something went wrong'
    });
  }
});
_defineProperty(BetController, "publicGetAll", async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const offset = (page - 1) * limit;
    const sort = String(req.query.sort || 'startTime');
    const query = {};
    const betStatus = req.query.status;
    if (betStatus && _constants.BET_STATUS.includes(betStatus.toUpperCase())) {
      query.status = betStatus;
    }
    const allData = await _Bet.default.find(query).populate('user', '-_id firstName lastName email').populate('game', '-_id title').sort({
      [sort]: -1
    }).skip(offset).limit(limit);
    const count = await _Bet.default.count(query);
    const pagination = (0, _pagination.paginate)(count, limit, page);
    res.status(200).json({
      data: allData,
      pagination,
      message: 'findAll'
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      message: error?.message || 'something went wrong'
    });
  }
});
_defineProperty(BetController, "getOne", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const findOne = await _Bet.default.findById(id).populate('user', '-_id firstName lastName email').populate('game', '-_id title');
    if (!findOne) throw new _HttpException.HttpException(409, "Bet doesn't exist");
    res.status(200).json({
      data: _objectSpread(_objectSpread({}, findOne.toJSON()), {}, {
        balanceInCoin: req.user.balanceInCoin
      }),
      message: 'findOne'
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      message: error?.message || 'something went wrong'
    });
  }
});
_defineProperty(BetController, "create", async (req, res) => {
  try {
    if (['admin'].includes(req.user.role)) {
      throw new _HttpException.HttpException(401, 'Admin is not allowed to bet.');
    }
    const itemData = req.body;
    itemData.user = req.user._id;
    let {
      iWin = 0,
      iToBet = 0
    } = itemData;
    const adminWallet = await _Wallet.default.findById(req.adminWallet._id);
    if (!adminWallet) {
      throw new _HttpException.HttpException(409, 'Wait for admin to set up wallet');
    }
    if (adminWallet.minimumBalance >= adminWallet.balance) {
      throw new _HttpException.HttpException(403, 'Insufficient balance');
    }
    if (itemData.currency === 'COIN') {
      const rwf = req.globalSetting?.coinToRwf || 1;
      iWin *= rwf;
      iToBet *= rwf;
    }
    itemData.iWin = iWin;
    itemData.iToBet = iToBet;
    const wallet = await _Wallet.default.findOne({
      user: req.user._id
    });
    if (!wallet) {
      throw new _HttpException.HttpException(409, 'Please, add wallet');
    }
    wallet.set({
      balance: wallet.balance + itemData.iWin - itemData.iToBet,
      expenses: wallet.expenses + itemData.iToBet,
      income: wallet.income + itemData.iWin
    });
    await wallet.save();
    adminWallet.set({
      balance: adminWallet.balance + itemData.iWin + itemData.iToBet,
      expenses: adminWallet.expenses + itemData.iWin,
      income: adminWallet.income - itemData.iWin
    });
    await adminWallet.save();
    const createItemData = new _Bet.default(itemData);
    const newData = await createItemData.save();
    const balanceInCoin = wallet.balance / (req.globalSetting.coinToRwf || 1);
    res.status(201).json({
      data: _objectSpread(_objectSpread({}, newData.toJSON()), {}, {
        balanceInCoin
      }),
      message: 'created'
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      message: error?.message || 'something went wrong'
    });
  }
});
_defineProperty(BetController, "updateItem", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const itemData = req.body;
    const findOne = await _Bet.default.findOne({
      _id: id,
      user: req.user._id
    });
    if (!findOne) throw new _HttpException.HttpException(409, "Bet doesn't exist");
    const adminWallet = await _Wallet.default.findById(req.adminWallet._id);
    let {
      iWin = 0,
      iToBet = 0
    } = itemData;
    const setting = await _Setting.default.findOne({
      isGlobal: true
    });
    if (itemData.currency === 'COIN') {
      const rwf = setting?.coinToRwf || 1;
      iWin *= rwf;
      iToBet *= rwf;
    }
    itemData.iWin = findOne.iWin + iWin;
    itemData.iToBet = findOne.iToBet + iToBet;
    const wallet = await _Wallet.default.findOne({
      user: req.user._id
    });
    if (!wallet) {
      await _Wallet.default.create({
        user: req.user._id
      });
    }
    wallet.set({
      balance: wallet.balance + iWin - iToBet,
      expenses: wallet.expenses + iToBet,
      income: wallet.income + iWin
    });
    await wallet.save();
    adminWallet.set({
      balance: adminWallet.balance + itemData.iWin + itemData.iToBet,
      expenses: adminWallet.expenses + itemData.iWin,
      income: adminWallet.income - itemData.iWin
    });
    await adminWallet.save();
    findOne.set(itemData);
    const updateItem = await findOne.save();
    const balanceInCoin = wallet.balance / (req.globalSetting.coinToRwf || 1);
    res.status(200).json({
      data: _objectSpread(_objectSpread({}, updateItem.toJSON()), {}, {
        balanceInCoin
      }),
      message: 'updated'
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      message: error?.message || 'something went wrong'
    });
  }
});
_defineProperty(BetController, "delete", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const findOne = await _Bet.default.findOne({
      _id: id,
      user: req.user._id
    });
    if (!findOne) throw new _HttpException.HttpException(409, "Bet doesn't exist");
    await _Bet.default.deleteOne({
      _id: id
    });
    res.status(200).json({
      data: findOne,
      message: 'deleted'
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      message: error?.message || 'something went wrong'
    });
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJCZXRDb250cm9sbGVyIiwicmVxIiwicmVzIiwicGFnZSIsIk51bWJlciIsInF1ZXJ5IiwibGltaXQiLCJvZmZzZXQiLCJzb3J0IiwiU3RyaW5nIiwiaXNSb2xlQWxsb3dlZCIsInVzZXIiLCJyb2xlIiwiX2lkIiwiYmV0U3RhdHVzIiwic3RhdHVzIiwiQkVUX1NUQVRVUyIsImluY2x1ZGVzIiwidG9VcHBlckNhc2UiLCJhbGxEYXRhIiwiQmV0IiwiZmluZCIsInNlbGVjdCIsInBvcHVsYXRlIiwic2tpcCIsImNvdW50IiwicGFnaW5hdGlvbiIsInBhZ2luYXRlIiwianNvbiIsImRhdGEiLCJtZXNzYWdlIiwiZXJyb3IiLCJpZCIsInBhcmFtcyIsImZpbmRPbmUiLCJmaW5kQnlJZCIsIkh0dHBFeGNlcHRpb24iLCJ0b0pTT04iLCJiYWxhbmNlSW5Db2luIiwiaXRlbURhdGEiLCJib2R5IiwiaVdpbiIsImlUb0JldCIsImFkbWluV2FsbGV0IiwiV2FsbGV0IiwibWluaW11bUJhbGFuY2UiLCJiYWxhbmNlIiwiY3VycmVuY3kiLCJyd2YiLCJnbG9iYWxTZXR0aW5nIiwiY29pblRvUndmIiwid2FsbGV0Iiwic2V0IiwiZXhwZW5zZXMiLCJpbmNvbWUiLCJzYXZlIiwiY3JlYXRlSXRlbURhdGEiLCJuZXdEYXRhIiwic2V0dGluZyIsIlNldHRpbmciLCJpc0dsb2JhbCIsImNyZWF0ZSIsInVwZGF0ZUl0ZW0iLCJkZWxldGVPbmUiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbnRyb2xsZXJzL0JldENvbnRyb2xsZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcclxuaW1wb3J0IHsgSHR0cEV4Y2VwdGlvbiB9IGZyb20gJy4uL2V4Y2VwdGlvbnMvSHR0cEV4Y2VwdGlvbic7XHJcbmltcG9ydCB7IFJlcXVlc3RXaXRoVXNlciB9IGZyb20gJy4uL2ludGVyZmFjZXMvYXV0aC5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgQmV0IGZyb20gJy4uL21vZGVscy9CZXQnO1xyXG5pbXBvcnQgU2V0dGluZyBmcm9tICcuLi9tb2RlbHMvU2V0dGluZyc7XHJcbmltcG9ydCBXYWxsZXQgZnJvbSAnLi4vbW9kZWxzL1dhbGxldCc7XHJcbmltcG9ydCB7IEJFVF9TVEFUVVMgfSBmcm9tICcuLi91dGlscy9jb25zdGFudHMnO1xyXG5pbXBvcnQgeyBpc1JvbGVBbGxvd2VkIH0gZnJvbSAnLi4vdXRpbHMvaGVscGVyJztcclxuaW1wb3J0IHsgcGFnaW5hdGUgfSBmcm9tICcuLi91dGlscy9wYWdpbmF0aW9uJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJldENvbnRyb2xsZXIge1xyXG4gIHN0YXRpYyBnZXRBbGwgPSBhc3luYyAocmVxOiBSZXF1ZXN0V2l0aFVzZXIsIHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHBhZ2UgPSBOdW1iZXIocmVxLnF1ZXJ5LnBhZ2UgfHwgMSk7XHJcbiAgICAgIGNvbnN0IGxpbWl0ID0gTnVtYmVyKHJlcS5xdWVyeS5saW1pdCB8fCAxMCk7XHJcbiAgICAgIGNvbnN0IG9mZnNldCA9IChwYWdlIC0gMSkgKiBsaW1pdDtcclxuICAgICAgY29uc3Qgc29ydCA9IFN0cmluZyhyZXEucXVlcnkuc29ydCB8fCAnY3JlYXRlZEF0Jyk7XHJcblxyXG4gICAgICBjb25zdCBxdWVyeTogUmVjb3JkPHN0cmluZywgYW55PiA9IHt9O1xyXG5cclxuICAgICAgaWYgKCFpc1JvbGVBbGxvd2VkKHJlcS51c2VyLnJvbGUpKSB7XHJcbiAgICAgICAgcXVlcnkudXNlciA9IHJlcS51c2VyLl9pZDtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgYmV0U3RhdHVzID0gcmVxLnF1ZXJ5LnN0YXR1cyBhcyBzdHJpbmc7XHJcblxyXG4gICAgICBpZiAoYmV0U3RhdHVzICYmIEJFVF9TVEFUVVMuaW5jbHVkZXMoYmV0U3RhdHVzLnRvVXBwZXJDYXNlKCkpKSB7XHJcbiAgICAgICAgcXVlcnkuc3RhdHVzID0gYmV0U3RhdHVzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBhbGxEYXRhID0gYXdhaXQgQmV0LmZpbmQocXVlcnkpXHJcbiAgICAgICAgLnNlbGVjdCgndXNlciBnYW1lIGlXaW4gaVRvQmV0IHN0YXR1cyBjcmVhdGVkQXQnKVxyXG4gICAgICAgIC5wb3B1bGF0ZSgndXNlcicsICctX2lkIGZpcnN0TmFtZSBsYXN0TmFtZSBlbWFpbCcpXHJcbiAgICAgICAgLnBvcHVsYXRlKCdnYW1lJywgJy1faWQgdGl0bGUnKVxyXG4gICAgICAgIC5zb3J0KHsgW3NvcnRdOiAtMSB9KVxyXG4gICAgICAgIC5za2lwKG9mZnNldClcclxuICAgICAgICAubGltaXQobGltaXQpO1xyXG4gICAgICBjb25zdCBjb3VudCA9IGF3YWl0IEJldC5jb3VudChxdWVyeSk7XHJcblxyXG4gICAgICBjb25zdCBwYWdpbmF0aW9uID0gcGFnaW5hdGUoY291bnQsIGxpbWl0LCBwYWdlKTtcclxuXHJcbiAgICAgIHJlc1xyXG4gICAgICAgIC5zdGF0dXMoMjAwKVxyXG4gICAgICAgIC5qc29uKHsgZGF0YTogYWxsRGF0YSwgcGFnaW5hdGlvbiwgbWVzc2FnZTogJ2ZpbmRBbGwnIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgICByZXMuc3RhdHVzKGVycm9yPy5zdGF0dXMgfHwgNTAwKS5qc29uKHtcclxuICAgICAgICBtZXNzYWdlOiBlcnJvcj8ubWVzc2FnZSB8fCAnc29tZXRoaW5nIHdlbnQgd3JvbmcnLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBzdGF0aWMgcHVibGljR2V0QWxsID0gYXN5bmMgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcGFnZSA9IE51bWJlcihyZXEucXVlcnkucGFnZSB8fCAxKTtcclxuICAgICAgY29uc3QgbGltaXQgPSBOdW1iZXIocmVxLnF1ZXJ5LmxpbWl0IHx8IDEwKTtcclxuICAgICAgY29uc3Qgb2Zmc2V0ID0gKHBhZ2UgLSAxKSAqIGxpbWl0O1xyXG4gICAgICBjb25zdCBzb3J0ID0gU3RyaW5nKHJlcS5xdWVyeS5zb3J0IHx8ICdzdGFydFRpbWUnKTtcclxuXHJcbiAgICAgIGNvbnN0IHF1ZXJ5OiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge307XHJcblxyXG4gICAgICBjb25zdCBiZXRTdGF0dXMgPSByZXEucXVlcnkuc3RhdHVzIGFzIHN0cmluZztcclxuXHJcbiAgICAgIGlmIChiZXRTdGF0dXMgJiYgQkVUX1NUQVRVUy5pbmNsdWRlcyhiZXRTdGF0dXMudG9VcHBlckNhc2UoKSkpIHtcclxuICAgICAgICBxdWVyeS5zdGF0dXMgPSBiZXRTdGF0dXM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGFsbERhdGEgPSBhd2FpdCBCZXQuZmluZChxdWVyeSlcclxuICAgICAgICAucG9wdWxhdGUoJ3VzZXInLCAnLV9pZCBmaXJzdE5hbWUgbGFzdE5hbWUgZW1haWwnKVxyXG4gICAgICAgIC5wb3B1bGF0ZSgnZ2FtZScsICctX2lkIHRpdGxlJylcclxuICAgICAgICAuc29ydCh7IFtzb3J0XTogLTEgfSlcclxuICAgICAgICAuc2tpcChvZmZzZXQpXHJcbiAgICAgICAgLmxpbWl0KGxpbWl0KTtcclxuICAgICAgY29uc3QgY291bnQgPSBhd2FpdCBCZXQuY291bnQocXVlcnkpO1xyXG5cclxuICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IHBhZ2luYXRlKGNvdW50LCBsaW1pdCwgcGFnZSk7XHJcblxyXG4gICAgICByZXNcclxuICAgICAgICAuc3RhdHVzKDIwMClcclxuICAgICAgICAuanNvbih7IGRhdGE6IGFsbERhdGEsIHBhZ2luYXRpb24sIG1lc3NhZ2U6ICdmaW5kQWxsJyB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgICAgcmVzLnN0YXR1cyhlcnJvcj8uc3RhdHVzIHx8IDUwMCkuanNvbih7XHJcbiAgICAgICAgbWVzc2FnZTogZXJyb3I/Lm1lc3NhZ2UgfHwgJ3NvbWV0aGluZyB3ZW50IHdyb25nJyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIGdldE9uZSA9IGFzeW5jIChyZXE6IFJlcXVlc3RXaXRoVXNlciwgcmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBpZCB9ID0gcmVxLnBhcmFtcztcclxuXHJcbiAgICAgIGNvbnN0IGZpbmRPbmUgPSBhd2FpdCBCZXQuZmluZEJ5SWQoaWQpXHJcbiAgICAgICAgLnBvcHVsYXRlKCd1c2VyJywgJy1faWQgZmlyc3ROYW1lIGxhc3ROYW1lIGVtYWlsJylcclxuICAgICAgICAucG9wdWxhdGUoJ2dhbWUnLCAnLV9pZCB0aXRsZScpO1xyXG4gICAgICBpZiAoIWZpbmRPbmUpIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKDQwOSwgXCJCZXQgZG9lc24ndCBleGlzdFwiKTtcclxuXHJcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAuLi5maW5kT25lLnRvSlNPTigpLFxyXG4gICAgICAgICAgYmFsYW5jZUluQ29pbjogcmVxLnVzZXIuYmFsYW5jZUluQ29pbixcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1lc3NhZ2U6ICdmaW5kT25lJyxcclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XHJcbiAgICAgIHJlcy5zdGF0dXMoZXJyb3I/LnN0YXR1cyB8fCA1MDApLmpzb24oe1xyXG4gICAgICAgIG1lc3NhZ2U6IGVycm9yPy5tZXNzYWdlIHx8ICdzb21ldGhpbmcgd2VudCB3cm9uZycsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHN0YXRpYyBjcmVhdGUgPSBhc3luYyAocmVxOiBSZXF1ZXN0V2l0aFVzZXIsIHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGlmIChbJ2FkbWluJ10uaW5jbHVkZXMocmVxLnVzZXIucm9sZSkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbig0MDEsICdBZG1pbiBpcyBub3QgYWxsb3dlZCB0byBiZXQuJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGl0ZW1EYXRhOiBhbnkgPSByZXEuYm9keTtcclxuICAgICAgaXRlbURhdGEudXNlciA9IHJlcS51c2VyLl9pZDtcclxuICAgICAgbGV0IHsgaVdpbiA9IDAsIGlUb0JldCA9IDAgfSA9IGl0ZW1EYXRhO1xyXG5cclxuICAgICAgY29uc3QgYWRtaW5XYWxsZXQgPSBhd2FpdCBXYWxsZXQuZmluZEJ5SWQocmVxLmFkbWluV2FsbGV0Ll9pZCk7XHJcblxyXG4gICAgICBpZiAoIWFkbWluV2FsbGV0KSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oXHJcbiAgICAgICAgICA0MDksXHJcbiAgICAgICAgICAnV2FpdCBmb3IgYWRtaW4gdG8gc2V0IHVwIHdhbGxldCcsXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGFkbWluV2FsbGV0Lm1pbmltdW1CYWxhbmNlID49IGFkbWluV2FsbGV0LmJhbGFuY2UpIHtcclxuICAgICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbig0MDMsICdJbnN1ZmZpY2llbnQgYmFsYW5jZScpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaXRlbURhdGEuY3VycmVuY3kgPT09ICdDT0lOJykge1xyXG4gICAgICAgIGNvbnN0IHJ3ZiA9IHJlcS5nbG9iYWxTZXR0aW5nPy5jb2luVG9Sd2YgfHwgMTtcclxuICAgICAgICBpV2luICo9IHJ3ZjtcclxuICAgICAgICBpVG9CZXQgKj0gcndmO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpdGVtRGF0YS5pV2luID0gaVdpbjtcclxuICAgICAgaXRlbURhdGEuaVRvQmV0ID0gaVRvQmV0O1xyXG5cclxuICAgICAgY29uc3Qgd2FsbGV0ID0gYXdhaXQgV2FsbGV0LmZpbmRPbmUoeyB1c2VyOiByZXEudXNlci5faWQgfSk7XHJcblxyXG4gICAgICBpZiAoIXdhbGxldCkge1xyXG4gICAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKDQwOSwgJ1BsZWFzZSwgYWRkIHdhbGxldCcpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB3YWxsZXQuc2V0KHtcclxuICAgICAgICBiYWxhbmNlOiB3YWxsZXQuYmFsYW5jZSArIGl0ZW1EYXRhLmlXaW4gLSBpdGVtRGF0YS5pVG9CZXQsXHJcbiAgICAgICAgZXhwZW5zZXM6IHdhbGxldC5leHBlbnNlcyArIGl0ZW1EYXRhLmlUb0JldCxcclxuICAgICAgICBpbmNvbWU6IHdhbGxldC5pbmNvbWUgKyBpdGVtRGF0YS5pV2luLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGF3YWl0IHdhbGxldC5zYXZlKCk7XHJcblxyXG4gICAgICBhZG1pbldhbGxldC5zZXQoe1xyXG4gICAgICAgIGJhbGFuY2U6XHJcbiAgICAgICAgICBhZG1pbldhbGxldC5iYWxhbmNlICsgaXRlbURhdGEuaVdpbiArIGl0ZW1EYXRhLmlUb0JldCxcclxuICAgICAgICBleHBlbnNlczogYWRtaW5XYWxsZXQuZXhwZW5zZXMgKyBpdGVtRGF0YS5pV2luLFxyXG4gICAgICAgIGluY29tZTogYWRtaW5XYWxsZXQuaW5jb21lIC0gaXRlbURhdGEuaVdpbixcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBhd2FpdCBhZG1pbldhbGxldC5zYXZlKCk7XHJcblxyXG4gICAgICBjb25zdCBjcmVhdGVJdGVtRGF0YSA9IG5ldyBCZXQoaXRlbURhdGEpO1xyXG5cclxuICAgICAgY29uc3QgbmV3RGF0YSA9IGF3YWl0IGNyZWF0ZUl0ZW1EYXRhLnNhdmUoKTtcclxuXHJcbiAgICAgIGNvbnN0IGJhbGFuY2VJbkNvaW4gPVxyXG4gICAgICAgIHdhbGxldC5iYWxhbmNlIC8gKHJlcS5nbG9iYWxTZXR0aW5nLmNvaW5Ub1J3ZiB8fCAxKTtcclxuXHJcbiAgICAgIHJlcy5zdGF0dXMoMjAxKS5qc29uKHtcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAuLi5uZXdEYXRhLnRvSlNPTigpLFxyXG4gICAgICAgICAgYmFsYW5jZUluQ29pbixcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1lc3NhZ2U6ICdjcmVhdGVkJyxcclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XHJcbiAgICAgIHJlcy5zdGF0dXMoZXJyb3I/LnN0YXR1cyB8fCA1MDApLmpzb24oe1xyXG4gICAgICAgIG1lc3NhZ2U6IGVycm9yPy5tZXNzYWdlIHx8ICdzb21ldGhpbmcgd2VudCB3cm9uZycsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHN0YXRpYyB1cGRhdGVJdGVtID0gYXN5bmMgKHJlcTogUmVxdWVzdFdpdGhVc2VyLCByZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xyXG4gICAgICBjb25zdCBpdGVtRGF0YTogYW55ID0gcmVxLmJvZHk7XHJcbiAgICAgIGNvbnN0IGZpbmRPbmUgPSBhd2FpdCBCZXQuZmluZE9uZSh7XHJcbiAgICAgICAgX2lkOiBpZCxcclxuICAgICAgICB1c2VyOiByZXEudXNlci5faWQsXHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAoIWZpbmRPbmUpIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKDQwOSwgXCJCZXQgZG9lc24ndCBleGlzdFwiKTtcclxuXHJcbiAgICAgIGNvbnN0IGFkbWluV2FsbGV0ID0gYXdhaXQgV2FsbGV0LmZpbmRCeUlkKHJlcS5hZG1pbldhbGxldC5faWQpO1xyXG5cclxuICAgICAgbGV0IHsgaVdpbiA9IDAsIGlUb0JldCA9IDAgfSA9IGl0ZW1EYXRhO1xyXG5cclxuICAgICAgY29uc3Qgc2V0dGluZyA9IGF3YWl0IFNldHRpbmcuZmluZE9uZSh7IGlzR2xvYmFsOiB0cnVlIH0pO1xyXG5cclxuICAgICAgaWYgKGl0ZW1EYXRhLmN1cnJlbmN5ID09PSAnQ09JTicpIHtcclxuICAgICAgICBjb25zdCByd2YgPSBzZXR0aW5nPy5jb2luVG9Sd2YgfHwgMTtcclxuICAgICAgICBpV2luICo9IHJ3ZjtcclxuICAgICAgICBpVG9CZXQgKj0gcndmO1xyXG4gICAgICB9XHJcbiAgICAgIGl0ZW1EYXRhLmlXaW4gPSBmaW5kT25lLmlXaW4gKyBpV2luO1xyXG4gICAgICBpdGVtRGF0YS5pVG9CZXQgPSBmaW5kT25lLmlUb0JldCArIGlUb0JldDtcclxuXHJcbiAgICAgIGNvbnN0IHdhbGxldCA9IGF3YWl0IFdhbGxldC5maW5kT25lKHsgdXNlcjogcmVxLnVzZXIuX2lkIH0pO1xyXG5cclxuICAgICAgaWYgKCF3YWxsZXQpIHtcclxuICAgICAgICBhd2FpdCBXYWxsZXQuY3JlYXRlKHsgdXNlcjogcmVxLnVzZXIuX2lkIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB3YWxsZXQuc2V0KHtcclxuICAgICAgICBiYWxhbmNlOiB3YWxsZXQuYmFsYW5jZSArIGlXaW4gLSBpVG9CZXQsXHJcbiAgICAgICAgZXhwZW5zZXM6IHdhbGxldC5leHBlbnNlcyArIGlUb0JldCxcclxuICAgICAgICBpbmNvbWU6IHdhbGxldC5pbmNvbWUgKyBpV2luLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGF3YWl0IHdhbGxldC5zYXZlKCk7XHJcblxyXG4gICAgICBhZG1pbldhbGxldC5zZXQoe1xyXG4gICAgICAgIGJhbGFuY2U6XHJcbiAgICAgICAgICBhZG1pbldhbGxldC5iYWxhbmNlICsgaXRlbURhdGEuaVdpbiArIGl0ZW1EYXRhLmlUb0JldCxcclxuICAgICAgICBleHBlbnNlczogYWRtaW5XYWxsZXQuZXhwZW5zZXMgKyBpdGVtRGF0YS5pV2luLFxyXG4gICAgICAgIGluY29tZTogYWRtaW5XYWxsZXQuaW5jb21lIC0gaXRlbURhdGEuaVdpbixcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBhd2FpdCBhZG1pbldhbGxldC5zYXZlKCk7XHJcblxyXG4gICAgICBmaW5kT25lLnNldChpdGVtRGF0YSk7XHJcblxyXG4gICAgICBjb25zdCB1cGRhdGVJdGVtID0gYXdhaXQgZmluZE9uZS5zYXZlKCk7XHJcblxyXG4gICAgICBjb25zdCBiYWxhbmNlSW5Db2luID1cclxuICAgICAgICB3YWxsZXQuYmFsYW5jZSAvIChyZXEuZ2xvYmFsU2V0dGluZy5jb2luVG9Sd2YgfHwgMSk7XHJcblxyXG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgICAgZGF0YTogeyAuLi51cGRhdGVJdGVtLnRvSlNPTigpLCBiYWxhbmNlSW5Db2luIH0sXHJcbiAgICAgICAgbWVzc2FnZTogJ3VwZGF0ZWQnLFxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgICAgcmVzLnN0YXR1cyhlcnJvcj8uc3RhdHVzIHx8IDUwMCkuanNvbih7XHJcbiAgICAgICAgbWVzc2FnZTogZXJyb3I/Lm1lc3NhZ2UgfHwgJ3NvbWV0aGluZyB3ZW50IHdyb25nJyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIGRlbGV0ZSA9IGFzeW5jIChyZXE6IFJlcXVlc3RXaXRoVXNlciwgcmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBpZCB9ID0gcmVxLnBhcmFtcztcclxuICAgICAgY29uc3QgZmluZE9uZSA9IGF3YWl0IEJldC5maW5kT25lKHtcclxuICAgICAgICBfaWQ6IGlkLFxyXG4gICAgICAgIHVzZXI6IHJlcS51c2VyLl9pZCxcclxuICAgICAgfSk7XHJcbiAgICAgIGlmICghZmluZE9uZSkgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oNDA5LCBcIkJldCBkb2Vzbid0IGV4aXN0XCIpO1xyXG5cclxuICAgICAgYXdhaXQgQmV0LmRlbGV0ZU9uZSh7IF9pZDogaWQgfSk7XHJcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgZGF0YTogZmluZE9uZSwgbWVzc2FnZTogJ2RlbGV0ZWQnIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgICByZXMuc3RhdHVzKGVycm9yPy5zdGF0dXMgfHwgNTAwKS5qc29uKHtcclxuICAgICAgICBtZXNzYWdlOiBlcnJvcj8ubWVzc2FnZSB8fCAnc29tZXRoaW5nIHdlbnQgd3JvbmcnLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG59XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBK0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRWhDLE1BQU1BLGFBQWEsQ0FBQztBQWlRbEM7QUFBQSxnQkFqUW9CQSxhQUFhLFlBQ2hCLE9BQU9DLEdBQW9CLEVBQUVDLEdBQWEsS0FBSztFQUM3RCxJQUFJO0lBQ0YsTUFBTUMsSUFBSSxHQUFHQyxNQUFNLENBQUNILEdBQUcsQ0FBQ0ksS0FBSyxDQUFDRixJQUFJLElBQUksQ0FBQyxDQUFDO0lBQ3hDLE1BQU1HLEtBQUssR0FBR0YsTUFBTSxDQUFDSCxHQUFHLENBQUNJLEtBQUssQ0FBQ0MsS0FBSyxJQUFJLEVBQUUsQ0FBQztJQUMzQyxNQUFNQyxNQUFNLEdBQUcsQ0FBQ0osSUFBSSxHQUFHLENBQUMsSUFBSUcsS0FBSztJQUNqQyxNQUFNRSxJQUFJLEdBQUdDLE1BQU0sQ0FBQ1IsR0FBRyxDQUFDSSxLQUFLLENBQUNHLElBQUksSUFBSSxXQUFXLENBQUM7SUFFbEQsTUFBTUgsS0FBMEIsR0FBRyxDQUFDLENBQUM7SUFFckMsSUFBSSxDQUFDLElBQUFLLHFCQUFhLEVBQUNULEdBQUcsQ0FBQ1UsSUFBSSxDQUFDQyxJQUFJLENBQUMsRUFBRTtNQUNqQ1AsS0FBSyxDQUFDTSxJQUFJLEdBQUdWLEdBQUcsQ0FBQ1UsSUFBSSxDQUFDRSxHQUFHO0lBQzNCO0lBRUEs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