"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _HttpException = require("../exceptions/HttpException");
var _WithdrawRequest = _interopRequireDefault(require("../models/WithdrawRequest"));
var _pagination = require("../utils/pagination");
var _Wallet = _interopRequireDefault(require("../models/Wallet"));
var _helper = require("../utils/helper");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class WithdrawRequestController {}
exports.default = WithdrawRequestController;
_defineProperty(WithdrawRequestController, "getAll", async (req, res) => {
  try {
    const {
      status,
      userId
    } = req.query;
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const offset = (page - 1) * limit;
    const where = {};
    if (status) {
      where.status = status;
    }
    if (userId) {
      where.requester = userId;
    }
    if (!(0, _helper.isRoleAllowed)(req.user.role)) {
      where.requester = req.user._id;
    }
    const allData = await _WithdrawRequest.default.find(where).sort({
      createdAt: -1
    }).populate([{
      path: 'requester',
      select: 'avatar phoneNumber firstName lastName email'
    }, {
      path: 'approvedBy',
      select: 'firstName lastName email'
    }]).skip(offset).limit(limit);
    const count = await _WithdrawRequest.default.count(where);
    const pagination = (0, _pagination.paginate)(count, limit, page);
    const results = allData.map(item => {
      const avatar = item.requester.avatar;
      if (avatar) {
        return _objectSpread(_objectSpread({}, item.toJSON()), {}, {
          requester: _objectSpread(_objectSpread({}, item.requester?.toJSON()), {}, {
            avatar: (0, _helper.imageUrl)(avatar)
          })
        });
      }
      return item;
    });
    res.status(200).json({
      data: results,
      pagination,
      message: 'findAll'
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      message: error?.message || 'something went wrong'
    });
  }
});
_defineProperty(WithdrawRequestController, "getOne", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const findOne = await _WithdrawRequest.default.findById(id).populate([{
      path: 'requester',
      select: 'avatar phoneNumber firstName lastName email'
    }, {
      path: 'approvedBy',
      select: 'firstName lastName email'
    }]);
    if (!findOne) throw new _HttpException.HttpException(409, "Request doesn't exist");
    findOne.requester.avatar = (0, _helper.imageUrl)(findOne.requester?.avatar);
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
_defineProperty(WithdrawRequestController, "create", async (req, res) => {
  try {
    const itemData = req.body;
    let myWallet = await _Wallet.default.findOne({
      user: req.user._id
    });
    if (!myWallet) {
      myWallet = await _Wallet.default.create({
        user: req.user._id
      });
    }
    if (!myWallet) {
      throw new _HttpException.HttpException(409, 'Your wallet does not exist');
    }
    const {
      amount
    } = req.body;
    const commission = 2 * amount * 2.5 / 100;
    if (amount + commission > myWallet.balance) {
      throw new _HttpException.HttpException(409, 'Your balance is less, we charge 5%.');
    }
    const createItemData = new _WithdrawRequest.default(_objectSpread(_objectSpread({}, itemData), {}, {
      requester: req.user._id
    }));
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
_defineProperty(WithdrawRequestController, "decide", async (req, res, next) => {
  try {
    const {
      id
    } = req.params;
    const request = await _WithdrawRequest.default.findById(id);
    if (!request) {
      throw new _HttpException.HttpException(409, 'The request does not exist');
    }
    const decision = req.body.decision;
    if (request.status === decision) {
      throw new _HttpException.HttpException(409, `Request is already ${decision}`);
    }
    if (decision === 'APPROVED') {
      const requesterWallet = await _Wallet.default.findOne({
        user: request.requester
      });
      if (!requesterWallet) {
        throw new _HttpException.HttpException(409, 'Requester wallet is not found');
      }
      const mainWallet = await _Wallet.default.findById(req.adminWallet._id);
      if (!mainWallet) {
        throw new _HttpException.HttpException(409, 'Admin wallet is not found');
      }
      const {
        amount
      } = request;
      const commission = 2 * amount * 2.5 / 100;
      if (amount + commission > requesterWallet.balance) {
        throw new _HttpException.HttpException(409, 'Your balance is less, we charge 5%.');
      }
      request.set({
        approvedBy: req.user._id
      });
      await request.save();
      req.request = request?.toJSON();
      next();
    } else {
      request.set({
        status: decision
      });
      const newData = await request.save();
      res.status(201).json({
        data: newData,
        message: decision
      });
    }
  } catch (error) {
    res.status(error?.status || 500).json({
      message: error?.message || 'something went wrong'
    });
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJXaXRoZHJhd1JlcXVlc3RDb250cm9sbGVyIiwicmVxIiwicmVzIiwic3RhdHVzIiwidXNlcklkIiwicXVlcnkiLCJwYWdlIiwiTnVtYmVyIiwibGltaXQiLCJvZmZzZXQiLCJ3aGVyZSIsInJlcXVlc3RlciIsImlzUm9sZUFsbG93ZWQiLCJ1c2VyIiwicm9sZSIsIl9pZCIsImFsbERhdGEiLCJXaXRoZHJhd1JlcXVlc3QiLCJmaW5kIiwic29ydCIsImNyZWF0ZWRBdCIsInBvcHVsYXRlIiwicGF0aCIsInNlbGVjdCIsInNraXAiLCJjb3VudCIsInBhZ2luYXRpb24iLCJwYWdpbmF0ZSIsInJlc3VsdHMiLCJtYXAiLCJpdGVtIiwiYXZhdGFyIiwidG9KU09OIiwiaW1hZ2VVcmwiLCJqc29uIiwiZGF0YSIsIm1lc3NhZ2UiLCJlcnJvciIsImlkIiwicGFyYW1zIiwiZmluZE9uZSIsImZpbmRCeUlkIiwiSHR0cEV4Y2VwdGlvbiIsIml0ZW1EYXRhIiwiYm9keSIsIm15V2FsbGV0IiwiV2FsbGV0IiwiY3JlYXRlIiwiYW1vdW50IiwiY29tbWlzc2lvbiIsImJhbGFuY2UiLCJjcmVhdGVJdGVtRGF0YSIsIm5ld0RhdGEiLCJzYXZlIiwibmV4dCIsInJlcXVlc3QiLCJkZWNpc2lvbiIsInJlcXVlc3RlcldhbGxldCIsIm1haW5XYWxsZXQiLCJhZG1pbldhbGxldCIsInNldCIsImFwcHJvdmVkQnkiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbnRyb2xsZXJzL1dpdGhkcmF3UmVxdWVzdENvbnRyb2xsZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dEZ1bmN0aW9uLCBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xyXG5pbXBvcnQgeyBIdHRwRXhjZXB0aW9uIH0gZnJvbSAnLi4vZXhjZXB0aW9ucy9IdHRwRXhjZXB0aW9uJztcclxuaW1wb3J0IFdpdGhkcmF3UmVxdWVzdCBmcm9tICcuLi9tb2RlbHMvV2l0aGRyYXdSZXF1ZXN0JztcclxuaW1wb3J0IHsgcGFnaW5hdGUgfSBmcm9tICcuLi91dGlscy9wYWdpbmF0aW9uJztcclxuaW1wb3J0IFdhbGxldCBmcm9tICcuLi9tb2RlbHMvV2FsbGV0JztcclxuaW1wb3J0IHsgUmVxdWVzdFdpdGhVc2VyIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9hdXRoLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IGltYWdlVXJsLCBpc1JvbGVBbGxvd2VkIH0gZnJvbSAnLi4vdXRpbHMvaGVscGVyJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdpdGhkcmF3UmVxdWVzdENvbnRyb2xsZXIge1xyXG4gIHN0YXRpYyBnZXRBbGwgPSBhc3luYyAocmVxOiBSZXF1ZXN0V2l0aFVzZXIsIHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHsgc3RhdHVzLCB1c2VySWQgfSA9IHJlcS5xdWVyeTtcclxuICAgICAgY29uc3QgcGFnZSA9IE51bWJlcihyZXEucXVlcnkucGFnZSB8fCAxKTtcclxuICAgICAgY29uc3QgbGltaXQgPSBOdW1iZXIocmVxLnF1ZXJ5LmxpbWl0IHx8IDEwKTtcclxuICAgICAgY29uc3Qgb2Zmc2V0ID0gKHBhZ2UgLSAxKSAqIGxpbWl0O1xyXG5cclxuICAgICAgY29uc3Qgd2hlcmU6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7fTtcclxuXHJcbiAgICAgIGlmIChzdGF0dXMpIHtcclxuICAgICAgICB3aGVyZS5zdGF0dXMgPSBzdGF0dXM7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHVzZXJJZCkge1xyXG4gICAgICAgIHdoZXJlLnJlcXVlc3RlciA9IHVzZXJJZDtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIWlzUm9sZUFsbG93ZWQocmVxLnVzZXIucm9sZSkpIHtcclxuICAgICAgICB3aGVyZS5yZXF1ZXN0ZXIgPSByZXEudXNlci5faWQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGFsbERhdGEgPSBhd2FpdCBXaXRoZHJhd1JlcXVlc3QuZmluZCh3aGVyZSlcclxuICAgICAgICAuc29ydCh7IGNyZWF0ZWRBdDogLTEgfSlcclxuICAgICAgICAucG9wdWxhdGUoW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBwYXRoOiAncmVxdWVzdGVyJyxcclxuICAgICAgICAgICAgc2VsZWN0OiAnYXZhdGFyIHBob25lTnVtYmVyIGZpcnN0TmFtZSBsYXN0TmFtZSBlbWFpbCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBwYXRoOiAnYXBwcm92ZWRCeScsXHJcbiAgICAgICAgICAgIHNlbGVjdDogJ2ZpcnN0TmFtZSBsYXN0TmFtZSBlbWFpbCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0pXHJcbiAgICAgICAgLnNraXAob2Zmc2V0KVxyXG4gICAgICAgIC5saW1pdChsaW1pdCk7XHJcbiAgICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgV2l0aGRyYXdSZXF1ZXN0LmNvdW50KHdoZXJlKTtcclxuXHJcbiAgICAgIGNvbnN0IHBhZ2luYXRpb24gPSBwYWdpbmF0ZShjb3VudCwgbGltaXQsIHBhZ2UpO1xyXG5cclxuICAgICAgY29uc3QgcmVzdWx0cyA9IGFsbERhdGEubWFwKGl0ZW0gPT4ge1xyXG4gICAgICAgIGNvbnN0IGF2YXRhciA9IChpdGVtLnJlcXVlc3RlciBhcyBhbnkpLmF2YXRhciBhcyBzdHJpbmc7XHJcbiAgICAgICAgaWYgKGF2YXRhcikge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgLi4uaXRlbS50b0pTT04oKSxcclxuICAgICAgICAgICAgcmVxdWVzdGVyOiB7XHJcbiAgICAgICAgICAgICAgLi4uKGl0ZW0ucmVxdWVzdGVyIGFzIGFueSk/LnRvSlNPTigpLFxyXG4gICAgICAgICAgICAgIGF2YXRhcjogaW1hZ2VVcmwoYXZhdGFyKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJlc1xyXG4gICAgICAgIC5zdGF0dXMoMjAwKVxyXG4gICAgICAgIC5qc29uKHsgZGF0YTogcmVzdWx0cywgcGFnaW5hdGlvbiwgbWVzc2FnZTogJ2ZpbmRBbGwnIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgICByZXMuc3RhdHVzKGVycm9yPy5zdGF0dXMgfHwgNTAwKS5qc29uKHtcclxuICAgICAgICBtZXNzYWdlOiBlcnJvcj8ubWVzc2FnZSB8fCAnc29tZXRoaW5nIHdlbnQgd3JvbmcnLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBzdGF0aWMgZ2V0T25lID0gYXN5bmMgKHJlcTogYW55LCByZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xyXG5cclxuICAgICAgY29uc3QgZmluZE9uZSA9IGF3YWl0IFdpdGhkcmF3UmVxdWVzdC5maW5kQnlJZChpZCkucG9wdWxhdGUoW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHBhdGg6ICdyZXF1ZXN0ZXInLFxyXG4gICAgICAgICAgc2VsZWN0OiAnYXZhdGFyIHBob25lTnVtYmVyIGZpcnN0TmFtZSBsYXN0TmFtZSBlbWFpbCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwYXRoOiAnYXBwcm92ZWRCeScsXHJcbiAgICAgICAgICBzZWxlY3Q6ICdmaXJzdE5hbWUgbGFzdE5hbWUgZW1haWwnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0pO1xyXG4gICAgICBpZiAoIWZpbmRPbmUpXHJcbiAgICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oNDA5LCBcIlJlcXVlc3QgZG9lc24ndCBleGlzdFwiKTtcclxuXHJcbiAgICAgIChmaW5kT25lLnJlcXVlc3RlciBhcyBhbnkpLmF2YXRhciA9IGltYWdlVXJsKFxyXG4gICAgICAgIChmaW5kT25lLnJlcXVlc3RlciBhcyBhbnkpPy5hdmF0YXIsXHJcbiAgICAgICk7XHJcblxyXG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IGRhdGE6IGZpbmRPbmUsIG1lc3NhZ2U6ICdmaW5kT25lJyB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgICAgcmVzLnN0YXR1cyhlcnJvcj8uc3RhdHVzIHx8IDUwMCkuanNvbih7XHJcbiAgICAgICAgbWVzc2FnZTogZXJyb3I/Lm1lc3NhZ2UgfHwgJ3NvbWV0aGluZyB3ZW50IHdyb25nJyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIGNyZWF0ZSA9IGFzeW5jIChyZXE6IFJlcXVlc3RXaXRoVXNlciwgcmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgaXRlbURhdGEgPSByZXEuYm9keTtcclxuICAgICAgbGV0IG15V2FsbGV0ID0gYXdhaXQgV2FsbGV0LmZpbmRPbmUoeyB1c2VyOiByZXEudXNlci5faWQgfSk7XHJcbiAgICAgIGlmICghbXlXYWxsZXQpIHtcclxuICAgICAgICBteVdhbGxldCA9IGF3YWl0IFdhbGxldC5jcmVhdGUoeyB1c2VyOiByZXEudXNlci5faWQgfSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFteVdhbGxldCkge1xyXG4gICAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKDQwOSwgJ1lvdXIgd2FsbGV0IGRvZXMgbm90IGV4aXN0Jyk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgeyBhbW91bnQgfSA9IHJlcS5ib2R5O1xyXG5cclxuICAgICAgY29uc3QgY29tbWlzc2lvbiA9ICgyICogYW1vdW50ICogMi41KSAvIDEwMDtcclxuXHJcbiAgICAgIGlmIChhbW91bnQgKyBjb21taXNzaW9uID4gbXlXYWxsZXQuYmFsYW5jZSkge1xyXG4gICAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKFxyXG4gICAgICAgICAgNDA5LFxyXG4gICAgICAgICAgJ1lvdXIgYmFsYW5jZSBpcyBsZXNzLCB3ZSBjaGFyZ2UgNSUuJyxcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGNyZWF0ZUl0ZW1EYXRhID0gbmV3IFdpdGhkcmF3UmVxdWVzdCh7XHJcbiAgICAgICAgLi4uaXRlbURhdGEsXHJcbiAgICAgICAgcmVxdWVzdGVyOiByZXEudXNlci5faWQsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY29uc3QgbmV3RGF0YSA9IGF3YWl0IGNyZWF0ZUl0ZW1EYXRhLnNhdmUoKTtcclxuXHJcbiAgICAgIHJlcy5zdGF0dXMoMjAxKS5qc29uKHsgZGF0YTogbmV3RGF0YSwgbWVzc2FnZTogJ2NyZWF0ZWQnIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgICByZXMuc3RhdHVzKGVycm9yPy5zdGF0dXMgfHwgNTAwKS5qc29uKHtcclxuICAgICAgICBtZXNzYWdlOiBlcnJvcj8ubWVzc2FnZSB8fCAnc29tZXRoaW5nIHdlbnQgd3JvbmcnLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBzdGF0aWMgZGVjaWRlID0gYXN5bmMgKFxyXG4gICAgcmVxOiBSZXF1ZXN0V2l0aFVzZXIsXHJcbiAgICByZXM6IFJlc3BvbnNlLFxyXG4gICAgbmV4dDogTmV4dEZ1bmN0aW9uLFxyXG4gICkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBpZCB9ID0gcmVxLnBhcmFtcztcclxuXHJcbiAgICAgIGNvbnN0IHJlcXVlc3QgPSBhd2FpdCBXaXRoZHJhd1JlcXVlc3QuZmluZEJ5SWQoaWQpO1xyXG4gICAgICBpZiAoIXJlcXVlc3QpIHtcclxuICAgICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbig0MDksICdUaGUgcmVxdWVzdCBkb2VzIG5vdCBleGlzdCcpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBkZWNpc2lvbiA9IHJlcS5ib2R5LmRlY2lzaW9uIGFzICdBUFBST1ZFRCcgfCAnUkVKRUNURUQnO1xyXG5cclxuICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSBkZWNpc2lvbikge1xyXG4gICAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKFxyXG4gICAgICAgICAgNDA5LFxyXG4gICAgICAgICAgYFJlcXVlc3QgaXMgYWxyZWFkeSAke2RlY2lzaW9ufWAsXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGRlY2lzaW9uID09PSAnQVBQUk9WRUQnKSB7XHJcbiAgICAgICAgY29uc3QgcmVxdWVzdGVyV2FsbGV0ID0gYXdhaXQgV2FsbGV0LmZpbmRPbmUoe1xyXG4gICAgICAgICAgdXNlcjogcmVxdWVzdC5yZXF1ZXN0ZXIsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFyZXF1ZXN0ZXJXYWxsZXQpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKFxyXG4gICAgICAgICAgICA0MDksXHJcbiAgICAgICAgICAgICdSZXF1ZXN0ZXIgd2FsbGV0IGlzIG5vdCBmb3VuZCcsXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbWFpbldhbGxldCA9IGF3YWl0IFdhbGxldC5maW5kQnlJZChyZXEuYWRtaW5XYWxsZXQuX2lkKTtcclxuICAgICAgICBpZiAoIW1haW5XYWxsZXQpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKDQwOSwgJ0FkbWluIHdhbGxldCBpcyBub3QgZm91bmQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHsgYW1vdW50IH0gPSByZXF1ZXN0O1xyXG5cclxuICAgICAgICBjb25zdCBjb21taXNzaW9uID0gKDIgKiBhbW91bnQgKiAyLjUpIC8gMTAwO1xyXG5cclxuICAgICAgICBpZiAoYW1vdW50ICsgY29tbWlzc2lvbiA+IHJlcXVlc3RlcldhbGxldC5iYWxhbmNlKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbihcclxuICAgICAgICAgICAgNDA5LFxyXG4gICAgICAgICAgICAnWW91ciBiYWxhbmNlIGlzIGxlc3MsIHdlIGNoYXJnZSA1JS4nLFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlcXVlc3Quc2V0KHsgYXBwcm92ZWRCeTogcmVxLnVzZXIuX2lkIH0pO1xyXG4gICAgICAgIGF3YWl0IHJlcXVlc3Quc2F2ZSgpO1xyXG5cclxuICAgICAgICAocmVxIGFzIGFueSkucmVxdWVzdCA9IHJlcXVlc3Q/LnRvSlNPTigpO1xyXG4gICAgICAgIG5leHQoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXF1ZXN0LnNldCh7XHJcbiAgICAgICAgICBzdGF0dXM6IGRlY2lzaW9uLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBuZXdEYXRhID0gYXdhaXQgcmVxdWVzdC5zYXZlKCk7XHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDEpLmpzb24oeyBkYXRhOiBuZXdEYXRhLCBtZXNzYWdlOiBkZWNpc2lvbiB9KTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgICByZXMuc3RhdHVzKGVycm9yPy5zdGF0dXMgfHwgNTAwKS5qc29uKHtcclxuICAgICAgICBtZXNzYWdlOiBlcnJvcj8ubWVzc2FnZSB8fCAnc29tZXRoaW5nIHdlbnQgd3JvbmcnLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG59XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUEwRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFM0MsTUFBTUEseUJBQXlCLENBQUM7QUFrTTlDO0FBQUEsZ0JBbE1vQkEseUJBQXlCLFlBQzVCLE9BQU9DLEdBQW9CLEVBQUVDLEdBQWEsS0FBSztFQUM3RCxJQUFJO0lBQ0YsTUFB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