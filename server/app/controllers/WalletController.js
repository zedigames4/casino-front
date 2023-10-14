"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _HttpException = require("../exceptions/HttpException");
var _Transaction = _interopRequireDefault(require("../models/Transaction"));
var _Wallet = _interopRequireDefault(require("../models/Wallet"));
var _pagination = require("../utils/pagination");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class WalletController {
  static async setMinimuBalance(req, res) {
    try {
      const myWallet = await _Wallet.default.findOne({
        user: req.user._id,
        isMain: true
      });
      if (!myWallet) {
        throw new _HttpException.HttpException(409, 'Your main wallet was not found, create one');
      }
      myWallet.set({
        minimumBalance: req.body.minimumBalance
      });
      res.status(200).json({
        data: await myWallet.save(),
        message: 'created'
      });
    } catch (error) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong'
      });
    }
  }
  static async setMainWallet(req, res) {
    try {
      const {
        id
      } = req.params;
      if (req.user.role !== 'admin') {
        throw new _HttpException.HttpException(401, 'You are not authorized');
      }
      const userWallet = await _Wallet.default.findById(id).populate({
        path: 'user',
        match: {
          'user.role': 'admin'
        }
      });
      if (!userWallet) {
        throw new _HttpException.HttpException(409, 'Wallet is not found');
      }
      const mainWallet = await _Wallet.default.findOne({
        isMain: true
      });
      if (mainWallet && mainWallet.id !== id) {
        mainWallet.set({
          isMain: false
        });
        await mainWallet.save();
      }
      userWallet.set({
        isMain: true
      });
      res.status(200).json({
        data: await userWallet.save(),
        message: 'set main wallet'
      });
    } catch (error) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong'
      });
    }
  }
}
exports.default = WalletController;
_defineProperty(WalletController, "getAll", async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const offset = (page - 1) * limit;
    const where = {};
    if (req.user.role !== 'admin') {
      where.user = req.user._id;
    }
    const allData = await _Wallet.default.find(where).skip(offset).limit(limit);
    const count = await _Wallet.default.count(where);
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
_defineProperty(WalletController, "getMyWallet", async (req, res) => {
  try {
    const findOne = await _Wallet.default.findOne({
      user: req.user._id
    }).select('balance expenses income').populate('user', '-_id firstName email');
    if (!findOne) throw new _HttpException.HttpException(409, "Wallet doesn't exist");
    const balanceInCoin = findOne.balance / (req.globalSetting.coinToRwf || 1);
    res.status(200).json({
      data: _objectSpread(_objectSpread({}, findOne.toJSON()), {}, {
        balanceInCoin
      }),
      message: 'my wallet'
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      message: error?.message || 'something went wrong'
    });
  }
});
_defineProperty(WalletController, "getOne", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const findOne = await _Wallet.default.findOne({
      _id: id,
      user: req.user._id
    });
    if (!findOne) throw new _HttpException.HttpException(409, "Wallet doesn't exist");
    res.status(200).json({
      data: findOne,
      message: 'findOne'
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      message: error?.message || 'something went wrong'
    });
  }
});
_defineProperty(WalletController, "create", async (req, res) => {
  try {
    const existWallet = await _Wallet.default.findOne({
      user: req.user._id
    });
    if (existWallet) {
      throw new _HttpException.HttpException(409, 'Wallet is already exist');
    }
    const itemData = req.body;
    if (req.user.role === 'admin') {
      const mainWallet = await _Wallet.default.findOne({
        isMain: true
      });
      if (!mainWallet) {
        itemData.isMain = true;
      }
    }
    const createItemData = new _Wallet.default({
      user: req.user._id
    });
    const newData = await createItemData.save();
    res.status(201).json({
      data: newData,
      message: 'created'
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      message: error?.message || 'something went wrong'
    });
  }
});
_defineProperty(WalletController, "topup", async (req, res) => {
  try {
    const itemData = req.body;
    // if ((req as any).amount) {
    //   itemData.amount = (req as any).amount;
    // }
    let myWallet = await _Wallet.default.findOne({
      user: req.user._id
    });
    if (!myWallet) {
      myWallet = await _Wallet.default.create({
        user: req.user._id,
        balance: itemData.amount
      });
    } else {
      myWallet.set({
        balance: myWallet.balance + itemData.amount
      });
      myWallet = await myWallet.save();
    }
    await _Transaction.default.create({
      user: req.user._id,
      status: 'SUCCESSFUL',
      mode: 'deposit',
      action: 'deposit',
      amount: itemData.amount
    });
    res.status(201).json({
      data: myWallet,
      message: 'created'
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      message: error?.message || 'something went wrong'
    });
  }
});
_defineProperty(WalletController, "withdraw", async (req, res) => {
  try {
    const itemData = req.body;
    let myWallet = await _Wallet.default.findOne({
      user: req.user._id
    });
    if (!myWallet) {
      throw new _HttpException.HttpException(409, 'No wallet found');
    }
    if (myWallet.balance < itemData.amount) {
      throw new _HttpException.HttpException(400, 'Balance is less');
    }
    myWallet.set({
      balance: myWallet.balance - itemData.amount
    });
    myWallet = await myWallet.save();
    await _Transaction.default.create({
      user: req.user._id,
      status: 'SUCCESSFUL',
      mode: 'withdraw',
      action: 'withdraw',
      amount: itemData.amount
    });
    res.status(201).json({
      data: myWallet,
      message: 'created'
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      message: error?.message || 'something went wrong'
    });
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJXYWxsZXRDb250cm9sbGVyIiwic2V0TWluaW11QmFsYW5jZSIsInJlcSIsInJlcyIsIm15V2FsbGV0IiwiV2FsbGV0IiwiZmluZE9uZSIsInVzZXIiLCJfaWQiLCJpc01haW4iLCJIdHRwRXhjZXB0aW9uIiwic2V0IiwibWluaW11bUJhbGFuY2UiLCJib2R5Iiwic3RhdHVzIiwianNvbiIsImRhdGEiLCJzYXZlIiwibWVzc2FnZSIsImVycm9yIiwic2V0TWFpbldhbGxldCIsImlkIiwicGFyYW1zIiwicm9sZSIsInVzZXJXYWxsZXQiLCJmaW5kQnlJZCIsInBvcHVsYXRlIiwicGF0aCIsIm1hdGNoIiwibWFpbldhbGxldCIsInBhZ2UiLCJOdW1iZXIiLCJxdWVyeSIsImxpbWl0Iiwib2Zmc2V0Iiwid2hlcmUiLCJhbGxEYXRhIiwiZmluZCIsInNraXAiLCJjb3VudCIsInBhZ2luYXRpb24iLCJwYWdpbmF0ZSIsInNlbGVjdCIsImJhbGFuY2VJbkNvaW4iLCJiYWxhbmNlIiwiZ2xvYmFsU2V0dGluZyIsImNvaW5Ub1J3ZiIsInRvSlNPTiIsImV4aXN0V2FsbGV0IiwiaXRlbURhdGEiLCJjcmVhdGVJdGVtRGF0YSIsIm5ld0RhdGEiLCJjcmVhdGUiLCJhbW91bnQiLCJUcmFuc2FjdGlvbiIsIm1vZGUiLCJhY3Rpb24iXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbnRyb2xsZXJzL1dhbGxldENvbnRyb2xsZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcclxuaW1wb3J0IHsgSHR0cEV4Y2VwdGlvbiB9IGZyb20gJy4uL2V4Y2VwdGlvbnMvSHR0cEV4Y2VwdGlvbic7XHJcbmltcG9ydCB7IFJlcXVlc3RXaXRoVXNlciB9IGZyb20gJy4uL2ludGVyZmFjZXMvYXV0aC5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgU2V0dGluZyBmcm9tICcuLi9tb2RlbHMvU2V0dGluZyc7XHJcbmltcG9ydCBUcmFuc2FjdGlvbiBmcm9tICcuLi9tb2RlbHMvVHJhbnNhY3Rpb24nO1xyXG5pbXBvcnQgV2FsbGV0IGZyb20gJy4uL21vZGVscy9XYWxsZXQnO1xyXG5pbXBvcnQgeyBwYWdpbmF0ZSB9IGZyb20gJy4uL3V0aWxzL3BhZ2luYXRpb24nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2FsbGV0Q29udHJvbGxlciB7XHJcbiAgc3RhdGljIGdldEFsbCA9IGFzeW5jIChyZXE6IFJlcXVlc3RXaXRoVXNlciwgcmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcGFnZSA9IE51bWJlcihyZXEucXVlcnkucGFnZSB8fCAxKTtcclxuICAgICAgY29uc3QgbGltaXQgPSBOdW1iZXIocmVxLnF1ZXJ5LmxpbWl0IHx8IDEwKTtcclxuICAgICAgY29uc3Qgb2Zmc2V0ID0gKHBhZ2UgLSAxKSAqIGxpbWl0O1xyXG5cclxuICAgICAgY29uc3Qgd2hlcmU6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7fTtcclxuXHJcbiAgICAgIGlmIChyZXEudXNlci5yb2xlICE9PSAnYWRtaW4nKSB7XHJcbiAgICAgICAgd2hlcmUudXNlciA9IHJlcS51c2VyLl9pZDtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgYWxsRGF0YSA9IGF3YWl0IFdhbGxldC5maW5kKHdoZXJlKVxyXG4gICAgICAgIC5za2lwKG9mZnNldClcclxuICAgICAgICAubGltaXQobGltaXQpO1xyXG4gICAgICBjb25zdCBjb3VudCA9IGF3YWl0IFdhbGxldC5jb3VudCh3aGVyZSk7XHJcblxyXG4gICAgICBjb25zdCBwYWdpbmF0aW9uID0gcGFnaW5hdGUoY291bnQsIGxpbWl0LCBwYWdlKTtcclxuXHJcbiAgICAgIHJlc1xyXG4gICAgICAgIC5zdGF0dXMoMjAwKVxyXG4gICAgICAgIC5qc29uKHsgZGF0YTogYWxsRGF0YSwgcGFnaW5hdGlvbiwgbWVzc2FnZTogJ2ZpbmRBbGwnIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgICByZXMuc3RhdHVzKGVycm9yPy5zdGF0dXMgfHwgNTAwKS5qc29uKHtcclxuICAgICAgICBtZXNzYWdlOiBlcnJvcj8ubWVzc2FnZSB8fCAnc29tZXRoaW5nIHdlbnQgd3JvbmcnLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBzdGF0aWMgZ2V0TXlXYWxsZXQgPSBhc3luYyAoXHJcbiAgICByZXE6IFJlcXVlc3RXaXRoVXNlcixcclxuICAgIHJlczogUmVzcG9uc2UsXHJcbiAgKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBmaW5kT25lID0gYXdhaXQgV2FsbGV0LmZpbmRPbmUoe1xyXG4gICAgICAgIHVzZXI6IHJlcS51c2VyLl9pZCxcclxuICAgICAgfSlcclxuICAgICAgICAuc2VsZWN0KCdiYWxhbmNlIGV4cGVuc2VzIGluY29tZScpXHJcbiAgICAgICAgLnBvcHVsYXRlKCd1c2VyJywgJy1faWQgZmlyc3ROYW1lIGVtYWlsJyk7XHJcbiAgICAgIGlmICghZmluZE9uZSlcclxuICAgICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbig0MDksIFwiV2FsbGV0IGRvZXNuJ3QgZXhpc3RcIik7XHJcblxyXG4gICAgICBjb25zdCBiYWxhbmNlSW5Db2luID1cclxuICAgICAgICBmaW5kT25lLmJhbGFuY2UgLyAocmVxLmdsb2JhbFNldHRpbmcuY29pblRvUndmIHx8IDEpO1xyXG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgLi4uZmluZE9uZS50b0pTT04oKSxcclxuICAgICAgICAgIGJhbGFuY2VJbkNvaW4sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXNzYWdlOiAnbXkgd2FsbGV0JyxcclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XHJcbiAgICAgIHJlcy5zdGF0dXMoZXJyb3I/LnN0YXR1cyB8fCA1MDApLmpzb24oe1xyXG4gICAgICAgIG1lc3NhZ2U6IGVycm9yPy5tZXNzYWdlIHx8ICdzb21ldGhpbmcgd2VudCB3cm9uZycsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHN0YXRpYyBnZXRPbmUgPSBhc3luYyAocmVxOiBhbnksIHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XHJcblxyXG4gICAgICBjb25zdCBmaW5kT25lID0gYXdhaXQgV2FsbGV0LmZpbmRPbmUoe1xyXG4gICAgICAgIF9pZDogaWQsXHJcbiAgICAgICAgdXNlcjogcmVxLnVzZXIuX2lkLFxyXG4gICAgICB9KTtcclxuICAgICAgaWYgKCFmaW5kT25lKVxyXG4gICAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKDQwOSwgXCJXYWxsZXQgZG9lc24ndCBleGlzdFwiKTtcclxuXHJcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgZGF0YTogZmluZE9uZSwgbWVzc2FnZTogJ2ZpbmRPbmUnIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgICByZXMuc3RhdHVzKGVycm9yPy5zdGF0dXMgfHwgNTAwKS5qc29uKHtcclxuICAgICAgICBtZXNzYWdlOiBlcnJvcj8ubWVzc2FnZSB8fCAnc29tZXRoaW5nIHdlbnQgd3JvbmcnLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBzdGF0aWMgY3JlYXRlID0gYXN5bmMgKHJlcTogUmVxdWVzdFdpdGhVc2VyLCByZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBleGlzdFdhbGxldCA9IGF3YWl0IFdhbGxldC5maW5kT25lKHtcclxuICAgICAgICB1c2VyOiByZXEudXNlci5faWQsXHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAoZXhpc3RXYWxsZXQpIHtcclxuICAgICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbig0MDksICdXYWxsZXQgaXMgYWxyZWFkeSBleGlzdCcpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGl0ZW1EYXRhOiBhbnkgPSByZXEuYm9keTtcclxuXHJcbiAgICAgIGlmIChyZXEudXNlci5yb2xlID09PSAnYWRtaW4nKSB7XHJcbiAgICAgICAgY29uc3QgbWFpbldhbGxldCA9IGF3YWl0IFdhbGxldC5maW5kT25lKHsgaXNNYWluOiB0cnVlIH0pO1xyXG4gICAgICAgIGlmICghbWFpbldhbGxldCkge1xyXG4gICAgICAgICAgaXRlbURhdGEuaXNNYWluID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgY3JlYXRlSXRlbURhdGEgPSBuZXcgV2FsbGV0KHtcclxuICAgICAgICB1c2VyOiByZXEudXNlci5faWQsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY29uc3QgbmV3RGF0YSA9IGF3YWl0IGNyZWF0ZUl0ZW1EYXRhLnNhdmUoKTtcclxuXHJcbiAgICAgIHJlcy5zdGF0dXMoMjAxKS5qc29uKHsgZGF0YTogbmV3RGF0YSwgbWVzc2FnZTogJ2NyZWF0ZWQnIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgICByZXMuc3RhdHVzKGVycm9yPy5zdGF0dXMgfHwgNTAwKS5qc29uKHtcclxuICAgICAgICBtZXNzYWdlOiBlcnJvcj8ubWVzc2FnZSB8fCAnc29tZXRoaW5nIHdlbnQgd3JvbmcnLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBzdGF0aWMgdG9wdXAgPSBhc3luYyAocmVxOiBSZXF1ZXN0V2l0aFVzZXIsIHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGl0ZW1EYXRhOiBhbnkgPSByZXEuYm9keTtcclxuICAgICAgLy8gaWYgKChyZXEgYXMgYW55KS5hbW91bnQpIHtcclxuICAgICAgLy8gICBpdGVtRGF0YS5hbW91bnQgPSAocmVxIGFzIGFueSkuYW1vdW50O1xyXG4gICAgICAvLyB9XHJcbiAgICAgIGxldCBteVdhbGxldCA9IGF3YWl0IFdhbGxldC5maW5kT25lKHsgdXNlcjogcmVxLnVzZXIuX2lkIH0pO1xyXG4gICAgICBpZiAoIW15V2FsbGV0KSB7XHJcbiAgICAgICAgbXlXYWxsZXQgPSBhd2FpdCBXYWxsZXQuY3JlYXRlKHtcclxuICAgICAgICAgIHVzZXI6IHJlcS51c2VyLl9pZCxcclxuICAgICAgICAgIGJhbGFuY2U6IGl0ZW1EYXRhLmFtb3VudCxcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBteVdhbGxldC5zZXQoeyBiYWxhbmNlOiBteVdhbGxldC5iYWxhbmNlICsgaXRlbURhdGEuYW1vdW50IH0pO1xyXG4gICAgICAgIG15V2FsbGV0ID0gYXdhaXQgbXlXYWxsZXQuc2F2ZSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBhd2FpdCBUcmFuc2FjdGlvbi5jcmVhdGUoe1xyXG4gICAgICAgIHVzZXI6IHJlcS51c2VyLl9pZCxcclxuICAgICAgICBzdGF0dXM6ICdTVUNDRVNTRlVMJyxcclxuICAgICAgICBtb2RlOiAnZGVwb3NpdCcsXHJcbiAgICAgICAgYWN0aW9uOiAnZGVwb3NpdCcsXHJcbiAgICAgICAgYW1vdW50OiBpdGVtRGF0YS5hbW91bnQsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmVzLnN0YXR1cygyMDEpLmpzb24oeyBkYXRhOiBteVdhbGxldCwgbWVzc2FnZTogJ2NyZWF0ZWQnIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgICByZXMuc3RhdHVzKGVycm9yPy5zdGF0dXMgfHwgNTAwKS5qc29uKHtcclxuICAgICAgICBtZXNzYWdlOiBlcnJvcj8ubWVzc2FnZSB8fCAnc29tZXRoaW5nIHdlbnQgd3JvbmcnLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBzdGF0aWMgd2l0aGRyYXcgPSBhc3luYyAocmVxOiBSZXF1ZXN0V2l0aFVzZXIsIHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGl0ZW1EYXRhOiBhbnkgPSByZXEuYm9keTtcclxuICAgICAgbGV0IG15V2FsbGV0ID0gYXdhaXQgV2FsbGV0LmZpbmRPbmUoeyB1c2VyOiByZXEudXNlci5faWQgfSk7XHJcbiAgICAgIGlmICghbXlXYWxsZXQpIHtcclxuICAgICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbig0MDksICdObyB3YWxsZXQgZm91bmQnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKG15V2FsbGV0LmJhbGFuY2UgPCBpdGVtRGF0YS5hbW91bnQpIHtcclxuICAgICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbig0MDAsICdCYWxhbmNlIGlzIGxlc3MnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbXlXYWxsZXQuc2V0KHsgYmFsYW5jZTogbXlXYWxsZXQuYmFsYW5jZSAtIGl0ZW1EYXRhLmFtb3VudCB9KTtcclxuICAgICAgbXlXYWxsZXQgPSBhd2FpdCBteVdhbGxldC5zYXZlKCk7XHJcblxyXG4gICAgICBhd2FpdCBUcmFuc2FjdGlvbi5jcmVhdGUoe1xyXG4gICAgICAgIHVzZXI6IHJlcS51c2VyLl9pZCxcclxuICAgICAgICBzdGF0dXM6ICdTVUNDRVNTRlVMJyxcclxuICAgICAgICBtb2RlOiAnd2l0aGRyYXcnLFxyXG4gICAgICAgIGFjdGlvbjogJ3dpdGhkcmF3JyxcclxuICAgICAgICBhbW91bnQ6IGl0ZW1EYXRhLmFtb3VudCxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXMuc3RhdHVzKDIwMSkuanNvbih7IGRhdGE6IG15V2FsbGV0LCBtZXNzYWdlOiAnY3JlYXRlZCcgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XHJcbiAgICAgIHJlcy5zdGF0dXMoZXJyb3I/LnN0YXR1cyB8fCA1MDApLmpzb24oe1xyXG4gICAgICAgIG1lc3NhZ2U6IGVycm9yPy5tZXNzYWdlIHx8ICdzb21ldGhpbmcgd2VudCB3cm9uZycsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHN0YXRpYyBhc3luYyBzZXRNaW5pbXVCYWxhbmNlKHJlcTogUmVxdWVzdFdpdGhVc2VyLCByZXM6IFJlc3BvbnNlKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBteVdhbGxldCA9IGF3YWl0IFdhbGxldC5maW5kT25lKHtcclxuICAgICAgICB1c2VyOiByZXEudXNlci5faWQsXHJcbiAgICAgICAgaXNNYWluOiB0cnVlLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmICghbXlXYWxsZXQpIHtcclxuICAgICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbihcclxuICAgICAgICAgIDQwOSxcclxuICAgICAgICAgICdZb3VyIG1haW4gd2FsbGV0IHdhcyBub3QgZm91bmQsIGNyZWF0ZSBvbmUnLFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgbXlXYWxsZXQuc2V0KHsgbWluaW11bUJhbGFuY2U6IHJlcS5ib2R5Lm1pbmltdW1CYWxhbmNlIH0pO1xyXG4gICAgICByZXNcclxuICAgICAgICAuc3RhdHVzKDIwMClcclxuICAgICAgICAuanNvbih7IGRhdGE6IGF3YWl0IG15V2FsbGV0LnNhdmUoKSwgbWVzc2FnZTogJ2NyZWF0ZWQnIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgICByZXMuc3RhdHVzKGVycm9yPy5zdGF0dXMgfHwgNTAwKS5qc29uKHtcclxuICAgICAgICBtZXNzYWdlOiBlcnJvcj8ubWVzc2FnZSB8fCAnc29tZXRoaW5nIHdlbnQgd3JvbmcnLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBhc3luYyBzZXRNYWluV2FsbGV0KHJlcTogUmVxdWVzdFdpdGhVc2VyLCByZXM6IFJlc3BvbnNlKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xyXG4gICAgICBpZiAocmVxLnVzZXIucm9sZSAhPT0gJ2FkbWluJykge1xyXG4gICAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKDQwMSwgJ1lvdSBhcmUgbm90IGF1dGhvcml6ZWQnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgdXNlcldhbGxldCA9IGF3YWl0IFdhbGxldC5maW5kQnlJZChpZCkucG9wdWxhdGUoe1xyXG4gICAgICAgIHBhdGg6ICd1c2VyJyxcclxuICAgICAgICBtYXRjaDogeyAndXNlci5yb2xlJzogJ2FkbWluJyB9LFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmICghdXNlcldhbGxldCkge1xyXG4gICAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKDQwOSwgJ1dhbGxldCBpcyBub3QgZm91bmQnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgbWFpbldhbGxldCA9IGF3YWl0IFdhbGxldC5maW5kT25lKHtcclxuICAgICAgICBpc01haW46IHRydWUsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKG1haW5XYWxsZXQgJiYgbWFpbldhbGxldC5pZCAhPT0gaWQpIHtcclxuICAgICAgICBtYWluV2FsbGV0LnNldCh7IGlzTWFpbjogZmFsc2UgfSk7XHJcbiAgICAgICAgYXdhaXQgbWFpbldhbGxldC5zYXZlKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHVzZXJXYWxsZXQuc2V0KHsgaXNNYWluOiB0cnVlIH0pO1xyXG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgICAgZGF0YTogYXdhaXQgdXNlcldhbGxldC5zYXZlKCksXHJcbiAgICAgICAgbWVzc2FnZTogJ3NldCBtYWluIHdhbGxldCcsXHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgICByZXMuc3RhdHVzKGVycm9yPy5zdGF0dXMgfHwgNTAwKS5qc29uKHtcclxuICAgICAgICBtZXNzYWdlOiBlcnJvcj8ubWVzc2FnZSB8fCAnc29tZXRoaW5nIHdlbnQgd3JvbmcnLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUErQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFaEMsTUFBTUEsZ0JBQWdCLENBQUM7RUE0S3BDLGFBQWFDLGdCQUFnQixDQUFDQyxHQUFvQixFQUFFQyxHQUFhLEVBQUU7SUFDakUsSUFBSTtNQUNGLE1BQU1DLFFBQVEsR0FBRyxNQUFNQyxlQUFNLENBQUNDLE9BQU8sQ0FBQztRQUNwQ0MsSUFBSSxFQUFFTCxHQUFHLENBQUNLLElBQUksQ0FBQ0MsR0FBRztRQUNsQkMsTUFBTSxFQUFFO01BQ1YsQ0FBQyxDQUFDO01BRUYsSUFBSSxDQUFDTCxRQUFRLEVBQUU7UUFDYixNQUFNLElBQUlNLDRCQUFhLENBQ3JCLEdBQUcsRUFDSCw0Q0FBNEMsQ0FDN0M7TUFDSDtNQUNBTixRQUFRLENBQUNPLEdBQUcsQ0FBQztRQUFFQyxjQUFjLEVBQUVWLEdBQUcsQ0FBQ1csSUFBSSxDQUFDRDtNQUFlLENBQUMsQ0FBQztNQUN6RFQsR0FBRyxDQUNBVyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQ1hDLElBQUksQ0FBQztRQUFFQyxJQUFJLEVBQUUsTUFBTVosUUFBUSxDQUFDYSxJQUFJLEVBQUU7UUFBRUMsT0FBTyxFQUFFO01BQVUsQ0FBQyxDQUFDO0lBQzlELENBQUMsQ0FBQyxPQUFPQyxLQUFVLEVBQUU7TUFDbkJoQixHQUFHLENBQUNXLE1BQU0sQ0FBQ0ssS0FBSyxFQUFFTCxNQUFNLElBQUksR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztRQUNwQ0csT0FBTyxFQUFFQyxLQUFLLEVBQUVELE9BQU8sSUFBSTtNQUM3QixDQUFDLENBQUM7SUFDSjtFQUNGO0VBRUEsYUFBYUUsYUFBYSxDQUFDbEIsR0FBb0IsRUFBRUMsR0FBYSxFQUFFO0lBQzlELElBQUk7TUFDRixNQUFNO1FBQUVrQjtN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