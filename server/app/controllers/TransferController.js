"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _HttpException = require("../exceptions/HttpException");
var _Transaction = _interopRequireDefault(require("../models/Transaction"));
var _helper = require("../utils/helper");
var _pagination = require("../utils/pagination");
var _User = _interopRequireDefault(require("../models/User"));
var _Wallet = _interopRequireDefault(require("../models/Wallet"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class TransferController {}
exports.default = TransferController;
_defineProperty(TransferController, "getAll", async (req, res) => {
  try {
    const {
      action,
      status,
      receiver,
      mode
    } = req.query;
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const offset = (page - 1) * limit;
    const where = {
      action: 'transfer'
    };
    if (action) {
      where.action = action;
    }
    if (status) {
      where.status = status;
    }
    if (receiver) {
      where.receiver = receiver;
    }
    if (mode) {
      where.mode = mode;
    }
    if (!(0, _helper.isRoleAllowed)(req.user.role)) {
      where.user = req.user._id;
    }
    const allData = await _Transaction.default.find(where).sort({
      createdAt: -1
    }).populate('user', '-_id firstName lastName email').skip(offset).limit(limit);
    const count = await _Transaction.default.count(where);
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
_defineProperty(TransferController, "getOne", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const findOne = await _Transaction.default.findOne({
      _id: id,
      action: 'transfer'
    }).populate('user', '-_id firstName lastName email');
    if (!findOne) throw new _HttpException.HttpException(409, "Transfer doesn't exist");
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
_defineProperty(TransferController, "create", async (req, res) => {
  try {
    const itemData = req.body;
    const receiver = await _User.default.findById(itemData.receiver);
    if (!receiver) {
      throw new _HttpException.HttpException(409, 'Receiver is not found');
    }
    const senderWallet = await _Wallet.default.findOne({
      user: req.user._id
    });
    let receiverWallet = await _Wallet.default.findOne({
      user: itemData.receiver
    });
    if (!receiverWallet) {
      receiverWallet = await _Wallet.default.create({
        user: itemData.receiver
      });
    }
    if (!senderWallet || !receiverWallet) {
      throw new _HttpException.HttpException(409, `${!receiverWallet ? 'Receiver' : 'Sender'} wallet is not exist`);
    }
    if (itemData.amount > senderWallet.balance) {
      throw new _HttpException.HttpException(409, `Your balance: RWF${senderWallet.balance} is less than RWF${itemData.amount}`);
    }
    const createItemData = new _Transaction.default(_objectSpread(_objectSpread({}, itemData), {}, {
      status: 'SUCCESSFUL',
      user: req.user._id,
      action: 'transfer'
    }));
    senderWallet.set({
      balance: senderWallet.balance - itemData.amount
    });
    await senderWallet.save();
    receiverWallet.set({
      balance: receiverWallet.balance + itemData.amount
    });
    await receiverWallet.save();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJUcmFuc2ZlckNvbnRyb2xsZXIiLCJyZXEiLCJyZXMiLCJhY3Rpb24iLCJzdGF0dXMiLCJyZWNlaXZlciIsIm1vZGUiLCJxdWVyeSIsInBhZ2UiLCJOdW1iZXIiLCJsaW1pdCIsIm9mZnNldCIsIndoZXJlIiwiaXNSb2xlQWxsb3dlZCIsInVzZXIiLCJyb2xlIiwiX2lkIiwiYWxsRGF0YSIsIlRyYW5zYWN0aW9uIiwiZmluZCIsInNvcnQiLCJjcmVhdGVkQXQiLCJwb3B1bGF0ZSIsInNraXAiLCJjb3VudCIsInBhZ2luYXRpb24iLCJwYWdpbmF0ZSIsImpzb24iLCJkYXRhIiwibWVzc2FnZSIsImVycm9yIiwiaWQiLCJwYXJhbXMiLCJmaW5kT25lIiwiSHR0cEV4Y2VwdGlvbiIsIml0ZW1EYXRhIiwiYm9keSIsIlVzZXIiLCJmaW5kQnlJZCIsInNlbmRlcldhbGxldCIsIldhbGxldCIsInJlY2VpdmVyV2FsbGV0IiwiY3JlYXRlIiwiYW1vdW50IiwiYmFsYW5jZSIsImNyZWF0ZUl0ZW1EYXRhIiwic2V0Iiwic2F2ZSIsIm5ld0RhdGEiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbnRyb2xsZXJzL1RyYW5zZmVyQ29udHJvbGxlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xyXG5pbXBvcnQgeyBIdHRwRXhjZXB0aW9uIH0gZnJvbSAnLi4vZXhjZXB0aW9ucy9IdHRwRXhjZXB0aW9uJztcclxuaW1wb3J0IFRyYW5zYWN0aW9uIGZyb20gJy4uL21vZGVscy9UcmFuc2FjdGlvbic7XHJcbmltcG9ydCB7IGlzUm9sZUFsbG93ZWQgfSBmcm9tICcuLi91dGlscy9oZWxwZXInO1xyXG5pbXBvcnQgeyBwYWdpbmF0ZSB9IGZyb20gJy4uL3V0aWxzL3BhZ2luYXRpb24nO1xyXG5pbXBvcnQgVXNlciBmcm9tICcuLi9tb2RlbHMvVXNlcic7XHJcbmltcG9ydCBXYWxsZXQgZnJvbSAnLi4vbW9kZWxzL1dhbGxldCc7XHJcbmltcG9ydCB7IFJlcXVlc3RXaXRoVXNlciB9IGZyb20gJy4uL2ludGVyZmFjZXMvYXV0aC5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJhbnNmZXJDb250cm9sbGVyIHtcclxuICBzdGF0aWMgZ2V0QWxsID0gYXN5bmMgKHJlcTogYW55LCByZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IGFjdGlvbiwgc3RhdHVzLCByZWNlaXZlciwgbW9kZSB9ID0gcmVxLnF1ZXJ5O1xyXG4gICAgICBjb25zdCBwYWdlID0gTnVtYmVyKHJlcS5xdWVyeS5wYWdlIHx8IDEpO1xyXG4gICAgICBjb25zdCBsaW1pdCA9IE51bWJlcihyZXEucXVlcnkubGltaXQgfHwgMTApO1xyXG4gICAgICBjb25zdCBvZmZzZXQgPSAocGFnZSAtIDEpICogbGltaXQ7XHJcblxyXG4gICAgICBjb25zdCB3aGVyZTogUmVjb3JkPHN0cmluZywgYW55PiA9IHsgYWN0aW9uOiAndHJhbnNmZXInIH07XHJcblxyXG4gICAgICBpZiAoYWN0aW9uKSB7XHJcbiAgICAgICAgd2hlcmUuYWN0aW9uID0gYWN0aW9uO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChzdGF0dXMpIHtcclxuICAgICAgICB3aGVyZS5zdGF0dXMgPSBzdGF0dXM7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChyZWNlaXZlcikge1xyXG4gICAgICAgIHdoZXJlLnJlY2VpdmVyID0gcmVjZWl2ZXI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChtb2RlKSB7XHJcbiAgICAgICAgd2hlcmUubW9kZSA9IG1vZGU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghaXNSb2xlQWxsb3dlZChyZXEudXNlci5yb2xlKSkge1xyXG4gICAgICAgIHdoZXJlLnVzZXIgPSByZXEudXNlci5faWQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGFsbERhdGEgPSBhd2FpdCBUcmFuc2FjdGlvbi5maW5kKHdoZXJlKVxyXG4gICAgICAgIC5zb3J0KHsgY3JlYXRlZEF0OiAtMSB9KVxyXG4gICAgICAgIC5wb3B1bGF0ZSgndXNlcicsICctX2lkIGZpcnN0TmFtZSBsYXN0TmFtZSBlbWFpbCcpXHJcbiAgICAgICAgLnNraXAob2Zmc2V0KVxyXG4gICAgICAgIC5saW1pdChsaW1pdCk7XHJcbiAgICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgVHJhbnNhY3Rpb24uY291bnQod2hlcmUpO1xyXG5cclxuICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IHBhZ2luYXRlKGNvdW50LCBsaW1pdCwgcGFnZSk7XHJcblxyXG4gICAgICByZXNcclxuICAgICAgICAuc3RhdHVzKDIwMClcclxuICAgICAgICAuanNvbih7IGRhdGE6IGFsbERhdGEsIHBhZ2luYXRpb24sIG1lc3NhZ2U6ICdmaW5kQWxsJyB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgICAgcmVzLnN0YXR1cyhlcnJvcj8uc3RhdHVzIHx8IDUwMCkuanNvbih7XHJcbiAgICAgICAgbWVzc2FnZTogZXJyb3I/Lm1lc3NhZ2UgfHwgJ3NvbWV0aGluZyB3ZW50IHdyb25nJyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIGdldE9uZSA9IGFzeW5jIChyZXE6IGFueSwgcmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBpZCB9ID0gcmVxLnBhcmFtcztcclxuXHJcbiAgICAgIGNvbnN0IGZpbmRPbmUgPSBhd2FpdCBUcmFuc2FjdGlvbi5maW5kT25lKHtcclxuICAgICAgICBfaWQ6IGlkLFxyXG4gICAgICAgIGFjdGlvbjogJ3RyYW5zZmVyJyxcclxuICAgICAgfSkucG9wdWxhdGUoJ3VzZXInLCAnLV9pZCBmaXJzdE5hbWUgbGFzdE5hbWUgZW1haWwnKTtcclxuICAgICAgaWYgKCFmaW5kT25lKVxyXG4gICAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKDQwOSwgXCJUcmFuc2ZlciBkb2Vzbid0IGV4aXN0XCIpO1xyXG5cclxuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBkYXRhOiBmaW5kT25lLCBtZXNzYWdlOiAnZmluZE9uZScgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XHJcbiAgICAgIHJlcy5zdGF0dXMoZXJyb3I/LnN0YXR1cyB8fCA1MDApLmpzb24oe1xyXG4gICAgICAgIG1lc3NhZ2U6IGVycm9yPy5tZXNzYWdlIHx8ICdzb21ldGhpbmcgd2VudCB3cm9uZycsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHN0YXRpYyBjcmVhdGUgPSBhc3luYyAocmVxOiBSZXF1ZXN0V2l0aFVzZXIsIHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGl0ZW1EYXRhOiBhbnkgPSByZXEuYm9keTtcclxuICAgICAgY29uc3QgcmVjZWl2ZXIgPSBhd2FpdCBVc2VyLmZpbmRCeUlkKGl0ZW1EYXRhLnJlY2VpdmVyKTtcclxuICAgICAgaWYgKCFyZWNlaXZlcikge1xyXG4gICAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKDQwOSwgJ1JlY2VpdmVyIGlzIG5vdCBmb3VuZCcpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBzZW5kZXJXYWxsZXQgPSBhd2FpdCBXYWxsZXQuZmluZE9uZSh7XHJcbiAgICAgICAgdXNlcjogcmVxLnVzZXIuX2lkLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGxldCByZWNlaXZlcldhbGxldCA9IGF3YWl0IFdhbGxldC5maW5kT25lKHtcclxuICAgICAgICB1c2VyOiBpdGVtRGF0YS5yZWNlaXZlcixcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoIXJlY2VpdmVyV2FsbGV0KSB7XHJcbiAgICAgICAgcmVjZWl2ZXJXYWxsZXQgPSBhd2FpdCBXYWxsZXQuY3JlYXRlKHtcclxuICAgICAgICAgIHVzZXI6IGl0ZW1EYXRhLnJlY2VpdmVyLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIXNlbmRlcldhbGxldCB8fCAhcmVjZWl2ZXJXYWxsZXQpIHtcclxuICAgICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbihcclxuICAgICAgICAgIDQwOSxcclxuICAgICAgICAgIGAke1xyXG4gICAgICAgICAgICAhcmVjZWl2ZXJXYWxsZXQgPyAnUmVjZWl2ZXInIDogJ1NlbmRlcidcclxuICAgICAgICAgIH0gd2FsbGV0IGlzIG5vdCBleGlzdGAsXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGl0ZW1EYXRhLmFtb3VudCA+IHNlbmRlcldhbGxldC5iYWxhbmNlKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oXHJcbiAgICAgICAgICA0MDksXHJcbiAgICAgICAgICBgWW91ciBiYWxhbmNlOiBSV0Yke3NlbmRlcldhbGxldC5iYWxhbmNlfSBpcyBsZXNzIHRoYW4gUldGJHtpdGVtRGF0YS5hbW91bnR9YCxcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBjcmVhdGVJdGVtRGF0YSA9IG5ldyBUcmFuc2FjdGlvbih7XHJcbiAgICAgICAgLi4uaXRlbURhdGEsXHJcbiAgICAgICAgc3RhdHVzOiAnU1VDQ0VTU0ZVTCcsXHJcbiAgICAgICAgdXNlcjogcmVxLnVzZXIuX2lkLFxyXG4gICAgICAgIGFjdGlvbjogJ3RyYW5zZmVyJyxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBzZW5kZXJXYWxsZXQuc2V0KHtcclxuICAgICAgICBiYWxhbmNlOiBzZW5kZXJXYWxsZXQuYmFsYW5jZSAtIGl0ZW1EYXRhLmFtb3VudCxcclxuICAgICAgfSk7XHJcbiAgICAgIGF3YWl0IHNlbmRlcldhbGxldC5zYXZlKCk7XHJcblxyXG4gICAgICByZWNlaXZlcldhbGxldC5zZXQoe1xyXG4gICAgICAgIGJhbGFuY2U6IHJlY2VpdmVyV2FsbGV0LmJhbGFuY2UgKyBpdGVtRGF0YS5hbW91bnQsXHJcbiAgICAgIH0pO1xyXG4gICAgICBhd2FpdCByZWNlaXZlcldhbGxldC5zYXZlKCk7XHJcblxyXG4gICAgICBjb25zdCBuZXdEYXRhID0gYXdhaXQgY3JlYXRlSXRlbURhdGEuc2F2ZSgpO1xyXG5cclxuICAgICAgcmVzLnN0YXR1cygyMDEpLmpzb24oeyBkYXRhOiBuZXdEYXRhLCBtZXNzYWdlOiAnY3JlYXRlZCcgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XHJcbiAgICAgIHJlcy5zdGF0dXMoZXJyb3I/LnN0YXR1cyB8fCA1MDApLmpzb24oe1xyXG4gICAgICAgIG1lc3NhZ2U6IGVycm9yPy5tZXNzYWdlIHx8ICdzb21ldGhpbmcgd2VudCB3cm9uZycsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBc0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR3ZCLE1BQU1BLGtCQUFrQixDQUFDO0FBbUl2QztBQUFBLGdCQW5Jb0JBLGtCQUFrQixZQUNyQixPQUFPQyxHQUFRLEVBQUVDLEdBQWEsS0FBSztFQUNqRCxJQUFJO0lBQ0YsTUFBTTtNQUFFQyxNQUFNO01BQUVDLE1BQU07TUFBRUMsUUFBUTtNQUFFQztJQUFLLENBQUMsR0FBR0wsR0FBRyxDQUFDTSxLQUFLO0lBQ3BELE1BQU1DLElBQUksR0FBR0MsTUFBTSxDQUFDUixHQUFHLENBQUNNLEtBQUssQ0FBQ0MsSUFBSSxJQUFJLENBQUMsQ0FBQztJQUN4QyxNQUFNRSxLQUFLLEdBQUdELE1BQU0sQ0FBQ1IsR0FBRyxDQUFDTSxLQUFLLENBQUNHLEtBQUssSUFBSSxFQUFFLENBQUM7SUFDM0MsTUFBTUMsTUFBTSxHQUFHLENBQUNILElBQUksR0FBRyxDQUFDLElBQUlFLEtBQUs7SUFFakMsTUFBTUUsS0FBMEIsR0FBRztNQUFFVCxNQUFNLEVBQUU7SUFBVyxDQUFDO0lBRXpELElBQUlBLE1BQU0sRUFBRTtNQUNWUyxLQUFLLENBQUNULE1BQU0sR0FBR0EsTUFBTTtJQUN2QjtJQUNBLElBQUlDLE1BQU0sRUFBRTtNQUNWUSxLQUFLLENBQUNSLE1BQU0sR0FBR0EsTUFBTTtJQUN2QjtJQUVBLElBQUlDLFFBQVEsRUFBRTtNQUNaTyxLQUFLLENBQUNQLFFBQVEsR0FBR0EsUUFBUTtJQUMzQjtJQUVBLElBQUlDLElBQUksRUFBRTtNQUNSTSxLQUFLLENBQUNOLElBQUksR0FBR0EsSUFBSTtJQUNuQjtJQUVBLElBQUksQ0FBQyxJQUFBTyxxQkFBYSxFQUFDWixHQUFHLENBQUNhLElBQUksQ0FBQ0MsSUFBSSxDQUFDLEVBQUU7TUFDakNILEtBQUssQ0FBQ0UsSUFBSSxHQUFHYixHQUFHLENBQUNhLElBQUksQ0FBQ0UsR0FBRztJQUMzQjtJQUVBLE1BQU1DLE9BQU8sR0FBRyxNQUFNQyxvQkFBVyxDQUFDQyxJQUFJLENBQUNQLEtBQUssQ0FBQyxDQUMxQ1EsSUFBSSxDQUFDO01BQUVDLFNBQVMsRUFBRSxDQUFDO0lBQUUsQ0FBQyxDQUFDLENBQ3ZCQyxRQUFRLENBQUMsTUFBTSxFQUFFLCtCQUErQixDQUFDLENBQ2pEQyxJQUFJLENBQUNaLE1BQU0sQ0FBQyxDQUNaRCxLQUFLLENBQUNBLEtBQUssQ0FBQztJQUNmLE1BQU1jLEtBQUssR0FBRyxNQUFNTixvQkFBVyxDQUFDTSxLQUFLLENBQUNaLEtBQUssQ0FBQztJQUU1QyxNQUFNYSxVQUFVLEdBQUcsSUFBQUMsb0JBQVEsRUFBQ0YsS0FBSyxFQUFFZCxLQUFLLEVBQUVGLElBQUksQ0FBQztJQUUvQ04sR0FBRyxDQUNBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQ1h1QixJQUFJLENBQUM7TUFBRUMsSUFBSSxFQUFFWCxPQUFPO01BQUVRLFVBQVU7TUFBRUksT0FBTyxFQUFFO0lBQVUsQ0FBQyxDQUFDO0VBQzVELENBQUMsQ0FBQyxPQUFPQyxLQUFVLEVBQUU7SUFDbkI1QixHQUFHLENBQUNFLE1BQU0sQ0FBQzBCLEtBQUssRUFBRTFCLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQ3VCLElBQUksQ0FBQztNQUNwQ0UsT0FBTyxFQUFFQyxLQUFLLEVBQUVELE9BQU8sSUFBSTtJQUM3QixDQUFDLENBQUM7RUFDSjtBQUNGLENBQUM7QUFBQSxnQkE5Q2tCN0Isa0JBQWtCLFlBZ0RyQixPQUFPQyxHQUFRLEVBQUVDLEdBQWEsS0FBSztFQUNqRCxJQUFJO0lBQ0YsTUFBTTtNQUFFNkI7SUFBRyxDQUFDLEdBQUc5QixHQUFHLENBQUMrQixNQUFNO0lBRXpCLE1BQU1DLE9BQU8sR0FBRyxNQUFNZixvQkFBVyxDQUFDZSxPQUFPLENBQUM7TUFDeENqQixHQUFHLEVBQUVlLEVBQUU7TUFDUDVCLE1BQU0sRUFBRTtJQUNWLENBQUMsQ0FBQyxDQUFDbUIsUUFBUSxDQUFDLE1BQU0sRUFBRSwrQkFBK0IsQ0FBQztJQUNwRCxJQUFJLENBQUNXLE9BQU8sRUFDVixNQUFNLElBQUlDLDRCQUFhLENBQUMsR0FBRyxFQUFFLHdCQUF3QixDQUFDO0lBRXhEaEMsR0FBRyxDQUFDRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUN1QixJQUFJLENBQUM7TUFBRUMsSUFBSSxFQUFFSyxPQUFPO01BQUVKLE9BQU8sRUFBRTtJQUFVLENBQUMsQ0FBQztFQUM3RCxDQUFDLENBQUMsT0FBT0MsS0FBVSxFQUFFO0lBQ25CNUIsR0FBRyxDQUFDRSxNQUFNLENBQUMwQixLQUFLLEVBQUUxQixNQUFNLElBQUksR0FBRyxDQUFDLENBQUN1QixJQUFJLENBQUM7TUFDcENFLE9BQU8sRUFBRUMsS0FBSyxFQUFFRCxPQUFPLElBQUk7SUFDN0IsQ0FBQyxDQUFDO0VBQ0o7QUFDRixDQUFDO0FBQUEsZ0JBakVrQjdCLGtCQUFrQixZQW1FckIsT0FBT0MsR0FBb0IsRUFBRUMsR0FBYSxLQUFLO0VBQzdELElBQUk7SUFDRixNQUFNaUMsUUFBYSxHQUFHbEMsR0FBRyxDQUFDbUMsSUFBSTtJQUM5QixNQUFNL0IsUUFBUSxHQUFHLE1BQU1nQyxhQUFJLENBQUNDLFFBQVEsQ0FBQ0gsUUFBUSxDQUFDOUIsUUFBUSxDQUFDO0lBQ3ZELElBQUksQ0FBQ0EsUUFBUSxFQUFFO01BQ2IsTUFBTSxJQUFJNkIsNEJBQWEsQ0FBQyxHQUFHLEVBQUUsdUJBQXVCLENBQUM7SUFDdkQ7SUFFQSxNQUFNSyxZQUFZLEdBQUcsTUFBTUMsZUFBTSxDQUFDUCxPQUFPLENBQUM7TUFDeENuQixJQUFJLEVBQUViLEdBQUcsQ0FBQ2EsSUFBSSxDQUFDRTtJQUNqQixDQUFDLENBQUM7SUFFRixJQUFJeUIsY0FBYyxHQUFHLE1BQU1ELGVBQU0sQ0FBQ1AsT0FBTyxDQUFDO01BQ3hDbkIsSUFBSSxFQUFFcUIsUUFBUSxDQUFDOUI7SUFDakIsQ0FBQyxDQUFDO0lBRUYsSUFBSSxDQUFDb0MsY0FBYyxFQUFFO01BQ25CQSxjQUFjLEdBQUcsTUFBTUQsZUFBTSxDQUFDRSxNQUFNLENBQUM7UUFDbkM1QixJQUFJLEVBQUVxQixRQUFRLENBQUM5QjtNQUNqQixDQUFDLENBQUM7SUFDSjtJQUVBLElBQUksQ0FBQ2tDLFlBQVksSUFBSSxDQUFDRSxjQUFjLEVBQUU7TUFDcEMsTUFBTSxJQUFJUCw0QkFBYSxDQUNyQixHQUFHLEVBQ0YsR0FDQyxDQUFDTyxjQUFjLEdBQUcsVUFBVSxHQUFHLFFBQ2hDLHNCQUFxQixDQUN2QjtJQUNIO0lBRUEsSUFBSU4sUUFBUSxDQUFDUSxNQUFNLEdBQUdKLFlBQVksQ0FBQ0ssT0FBTyxFQUFFO01BQzFDLE1BQU0sSUFBSVYsNEJBQWEsQ0FDckIsR0FBRyxFQUNGLG9CQUFtQkssWUFBWSxDQUFDSyxPQUFRLG9CQUFtQlQsUUFBUSxDQUFDUSxNQUFPLEVBQUMsQ0FDOUU7SUFDSDtJQUVBLE1BQU1FLGNBQWMsR0FBRyxJQUFJM0Isb0JBQVcsaUNBQ2pDaUIsUUFBUTtNQUNYL0IsTUFBTSxFQUFFLFlBQVk7TUFDcEJVLElBQUksRUFBRWIsR0FBRyxDQUFDYSxJQUFJLENBQUNFLEdBQUc7TUFDbEJiLE1BQU0sRUFBRTtJQUFVLEdBQ2xCO0lBRUZvQyxZQUFZLENBQUNPLEdBQUcsQ0FBQztNQUNmRixPQUFPLEVBQUVMLFlBQVksQ0FBQ0ssT0FBTyxHQUFHVCxRQUFRLENBQUNRO0lBQzNDLENBQUMsQ0FBQztJQUNGLE1BQU1KLFlBQVksQ0FBQ1EsSUFBSSxFQUFFO0lBRXpCTixjQUFjLENBQUNLLEdBQUcsQ0FBQztNQUNqQkYsT0FBTyxFQUFFSCxjQUFjLENBQUNHLE9BQU8sR0FBR1QsUUFBUSxDQUFDUTtJQUM3QyxDQUFDLENBQUM7SUFDRixNQUFNRixjQUFjLENBQUNNLElBQUksRUFBRTtJQUUzQixNQUFNQyxPQUFPLEdBQUcsTUFBTUgsY0FBYyxDQUFDRSxJQUFJLEVBQUU7SUFFM0M3QyxHQUFHLENBQUNFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ3VCLElBQUksQ0FBQztNQUFFQyxJQUFJLEVBQUVvQixPQUFPO01BQUVuQixPQUFPLEVBQUU7SUFBVSxDQUFDLENBQUM7RUFDN0QsQ0FBQyxDQUFDLE9BQU9DLEtBQVUsRUFBRTtJQUNuQjVCLEdBQUcsQ0FBQ0UsTUFBTSxDQUFDMEIsS0FBSyxFQUFFMUIsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDdUIsSUFBSSxDQUFDO01BQ3BDRSxPQUFPLEVBQUVDLEtBQUssRUFBRUQsT0FBTyxJQUFJO0lBQzdCLENBQUMsQ0FBQztFQUNKO0FBQ0YsQ0FBQyJ9