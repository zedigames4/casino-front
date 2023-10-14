"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _HttpException = require("../exceptions/HttpException");
var _Transaction = _interopRequireDefault(require("../models/Transaction"));
var _helper = require("../utils/helper");
var _pagination = require("../utils/pagination");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class TransactionController {}
exports.default = TransactionController;
_defineProperty(TransactionController, "getAll", async (req, res) => {
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
    const where = {};
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
    }).populate('user', 'firstName lastName email').skip(offset).limit(limit);
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
_defineProperty(TransactionController, "getOne", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const findOne = await _Transaction.default.findOne({
      _id: id,
      user: req.user._id
    }).populate('user', '-_id firstName lastName email');
    if (!findOne) throw new _HttpException.HttpException(409, "Transaction doesn't exist");
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
_defineProperty(TransactionController, "create", async (req, res) => {
  try {
    const itemData = req.body;
    const createItemData = new _Transaction.default(_objectSpread(_objectSpread({}, itemData), {}, {
      user: req.user._id
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
_defineProperty(TransactionController, "updateItem", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const itemData = req.body;
    const findOne = await _Transaction.default.findOne({
      _id: id,
      user: req.user._id
    });
    if (!findOne) throw new _HttpException.HttpException(409, "Transaction doesn't exist");
    await _Transaction.default.updateOne({
      _id: id,
      user: req.user._id
    }, _objectSpread(_objectSpread({}, itemData), {}, {
      user: req.user._id
    }));
    const updateItem = await _Transaction.default.findById({
      _id: id
    });
    res.status(200).json({
      data: updateItem,
      message: 'updated'
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      message: error?.message || 'something went wrong'
    });
  }
});
_defineProperty(TransactionController, "delete", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const findOne = await _Transaction.default.findOne({
      _id: id,
      user: req.user._id
    });
    if (!findOne) throw new _HttpException.HttpException(409, "Transaction doesn't exist");
    await _Transaction.default.deleteOne({
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJUcmFuc2FjdGlvbkNvbnRyb2xsZXIiLCJyZXEiLCJyZXMiLCJhY3Rpb24iLCJzdGF0dXMiLCJyZWNlaXZlciIsIm1vZGUiLCJxdWVyeSIsInBhZ2UiLCJOdW1iZXIiLCJsaW1pdCIsIm9mZnNldCIsIndoZXJlIiwiaXNSb2xlQWxsb3dlZCIsInVzZXIiLCJyb2xlIiwiX2lkIiwiYWxsRGF0YSIsIlRyYW5zYWN0aW9uIiwiZmluZCIsInNvcnQiLCJjcmVhdGVkQXQiLCJwb3B1bGF0ZSIsInNraXAiLCJjb3VudCIsInBhZ2luYXRpb24iLCJwYWdpbmF0ZSIsImpzb24iLCJkYXRhIiwibWVzc2FnZSIsImVycm9yIiwiaWQiLCJwYXJhbXMiLCJmaW5kT25lIiwiSHR0cEV4Y2VwdGlvbiIsIml0ZW1EYXRhIiwiYm9keSIsImNyZWF0ZUl0ZW1EYXRhIiwibmV3RGF0YSIsInNhdmUiLCJ1cGRhdGVPbmUiLCJ1cGRhdGVJdGVtIiwiZmluZEJ5SWQiLCJkZWxldGVPbmUiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbnRyb2xsZXJzL1RyYW5zYWN0aW9uQ29udHJvbGxlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xyXG5pbXBvcnQgeyBIdHRwRXhjZXB0aW9uIH0gZnJvbSAnLi4vZXhjZXB0aW9ucy9IdHRwRXhjZXB0aW9uJztcclxuaW1wb3J0IFRyYW5zYWN0aW9uIGZyb20gJy4uL21vZGVscy9UcmFuc2FjdGlvbic7XHJcbmltcG9ydCB7IGlzUm9sZUFsbG93ZWQgfSBmcm9tICcuLi91dGlscy9oZWxwZXInO1xyXG5pbXBvcnQgeyBwYWdpbmF0ZSB9IGZyb20gJy4uL3V0aWxzL3BhZ2luYXRpb24nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJhbnNhY3Rpb25Db250cm9sbGVyIHtcclxuICBzdGF0aWMgZ2V0QWxsID0gYXN5bmMgKHJlcTogYW55LCByZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IGFjdGlvbiwgc3RhdHVzLCByZWNlaXZlciwgbW9kZSB9ID0gcmVxLnF1ZXJ5O1xyXG4gICAgICBjb25zdCBwYWdlID0gTnVtYmVyKHJlcS5xdWVyeS5wYWdlIHx8IDEpO1xyXG4gICAgICBjb25zdCBsaW1pdCA9IE51bWJlcihyZXEucXVlcnkubGltaXQgfHwgMTApO1xyXG4gICAgICBjb25zdCBvZmZzZXQgPSAocGFnZSAtIDEpICogbGltaXQ7XHJcblxyXG4gICAgICBjb25zdCB3aGVyZTogUmVjb3JkPHN0cmluZywgYW55PiA9IHt9O1xyXG5cclxuICAgICAgaWYgKGFjdGlvbikge1xyXG4gICAgICAgIHdoZXJlLmFjdGlvbiA9IGFjdGlvbjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoc3RhdHVzKSB7XHJcbiAgICAgICAgd2hlcmUuc3RhdHVzID0gc3RhdHVzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocmVjZWl2ZXIpIHtcclxuICAgICAgICB3aGVyZS5yZWNlaXZlciA9IHJlY2VpdmVyO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAobW9kZSkge1xyXG4gICAgICAgIHdoZXJlLm1vZGUgPSBtb2RlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIWlzUm9sZUFsbG93ZWQocmVxLnVzZXIucm9sZSkpIHtcclxuICAgICAgICB3aGVyZS51c2VyID0gcmVxLnVzZXIuX2lkO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBhbGxEYXRhID0gYXdhaXQgVHJhbnNhY3Rpb24uZmluZCh3aGVyZSlcclxuICAgICAgICAuc29ydCh7IGNyZWF0ZWRBdDogLTEgfSlcclxuICAgICAgICAucG9wdWxhdGUoJ3VzZXInLCAnZmlyc3ROYW1lIGxhc3ROYW1lIGVtYWlsJylcclxuICAgICAgICAuc2tpcChvZmZzZXQpXHJcbiAgICAgICAgLmxpbWl0KGxpbWl0KTtcclxuICAgICAgY29uc3QgY291bnQgPSBhd2FpdCBUcmFuc2FjdGlvbi5jb3VudCh3aGVyZSk7XHJcblxyXG4gICAgICBjb25zdCBwYWdpbmF0aW9uID0gcGFnaW5hdGUoY291bnQsIGxpbWl0LCBwYWdlKTtcclxuXHJcbiAgICAgIHJlc1xyXG4gICAgICAgIC5zdGF0dXMoMjAwKVxyXG4gICAgICAgIC5qc29uKHsgZGF0YTogYWxsRGF0YSwgcGFnaW5hdGlvbiwgbWVzc2FnZTogJ2ZpbmRBbGwnIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgICByZXMuc3RhdHVzKGVycm9yPy5zdGF0dXMgfHwgNTAwKS5qc29uKHtcclxuICAgICAgICBtZXNzYWdlOiBlcnJvcj8ubWVzc2FnZSB8fCAnc29tZXRoaW5nIHdlbnQgd3JvbmcnLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBzdGF0aWMgZ2V0T25lID0gYXN5bmMgKHJlcTogYW55LCByZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xyXG5cclxuICAgICAgY29uc3QgZmluZE9uZSA9IGF3YWl0IFRyYW5zYWN0aW9uLmZpbmRPbmUoe1xyXG4gICAgICAgIF9pZDogaWQsXHJcbiAgICAgICAgdXNlcjogcmVxLnVzZXIuX2lkLFxyXG4gICAgICB9KS5wb3B1bGF0ZSgndXNlcicsICctX2lkIGZpcnN0TmFtZSBsYXN0TmFtZSBlbWFpbCcpO1xyXG4gICAgICBpZiAoIWZpbmRPbmUpXHJcbiAgICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oNDA5LCBcIlRyYW5zYWN0aW9uIGRvZXNuJ3QgZXhpc3RcIik7XHJcblxyXG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IGRhdGE6IGZpbmRPbmUsIG1lc3NhZ2U6ICdmaW5kT25lJyB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgICAgcmVzLnN0YXR1cyhlcnJvcj8uc3RhdHVzIHx8IDUwMCkuanNvbih7XHJcbiAgICAgICAgbWVzc2FnZTogZXJyb3I/Lm1lc3NhZ2UgfHwgJ3NvbWV0aGluZyB3ZW50IHdyb25nJyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIGNyZWF0ZSA9IGFzeW5jIChyZXE6IGFueSwgcmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgaXRlbURhdGE6IGFueSA9IHJlcS5ib2R5O1xyXG4gICAgICBjb25zdCBjcmVhdGVJdGVtRGF0YSA9IG5ldyBUcmFuc2FjdGlvbih7XHJcbiAgICAgICAgLi4uaXRlbURhdGEsXHJcbiAgICAgICAgdXNlcjogcmVxLnVzZXIuX2lkLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNvbnN0IG5ld0RhdGEgPSBhd2FpdCBjcmVhdGVJdGVtRGF0YS5zYXZlKCk7XHJcblxyXG4gICAgICByZXMuc3RhdHVzKDIwMSkuanNvbih7IGRhdGE6IG5ld0RhdGEsIG1lc3NhZ2U6ICdjcmVhdGVkJyB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgICAgcmVzLnN0YXR1cyhlcnJvcj8uc3RhdHVzIHx8IDUwMCkuanNvbih7XHJcbiAgICAgICAgbWVzc2FnZTogZXJyb3I/Lm1lc3NhZ2UgfHwgJ3NvbWV0aGluZyB3ZW50IHdyb25nJyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIHVwZGF0ZUl0ZW0gPSBhc3luYyAocmVxOiBhbnksIHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XHJcbiAgICAgIGNvbnN0IGl0ZW1EYXRhOiBhbnkgPSByZXEuYm9keTtcclxuICAgICAgY29uc3QgZmluZE9uZSA9IGF3YWl0IFRyYW5zYWN0aW9uLmZpbmRPbmUoe1xyXG4gICAgICAgIF9pZDogaWQsXHJcbiAgICAgICAgdXNlcjogcmVxLnVzZXIuX2lkLFxyXG4gICAgICB9KTtcclxuICAgICAgaWYgKCFmaW5kT25lKVxyXG4gICAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKDQwOSwgXCJUcmFuc2FjdGlvbiBkb2Vzbid0IGV4aXN0XCIpO1xyXG4gICAgICBhd2FpdCBUcmFuc2FjdGlvbi51cGRhdGVPbmUoXHJcbiAgICAgICAgeyBfaWQ6IGlkLCB1c2VyOiByZXEudXNlci5faWQgfSxcclxuICAgICAgICB7IC4uLml0ZW1EYXRhLCB1c2VyOiByZXEudXNlci5faWQgfSxcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGNvbnN0IHVwZGF0ZUl0ZW0gPSBhd2FpdCBUcmFuc2FjdGlvbi5maW5kQnlJZCh7XHJcbiAgICAgICAgX2lkOiBpZCxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IGRhdGE6IHVwZGF0ZUl0ZW0sIG1lc3NhZ2U6ICd1cGRhdGVkJyB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgICAgcmVzLnN0YXR1cyhlcnJvcj8uc3RhdHVzIHx8IDUwMCkuanNvbih7XHJcbiAgICAgICAgbWVzc2FnZTogZXJyb3I/Lm1lc3NhZ2UgfHwgJ3NvbWV0aGluZyB3ZW50IHdyb25nJyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIGRlbGV0ZSA9IGFzeW5jIChyZXE6IGFueSwgcmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBpZCB9ID0gcmVxLnBhcmFtcztcclxuICAgICAgY29uc3QgZmluZE9uZSA9IGF3YWl0IFRyYW5zYWN0aW9uLmZpbmRPbmUoe1xyXG4gICAgICAgIF9pZDogaWQsXHJcbiAgICAgICAgdXNlcjogcmVxLnVzZXIuX2lkLFxyXG4gICAgICB9KTtcclxuICAgICAgaWYgKCFmaW5kT25lKVxyXG4gICAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKDQwOSwgXCJUcmFuc2FjdGlvbiBkb2Vzbid0IGV4aXN0XCIpO1xyXG5cclxuICAgICAgYXdhaXQgVHJhbnNhY3Rpb24uZGVsZXRlT25lKHsgX2lkOiBpZCB9KTtcclxuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBkYXRhOiBmaW5kT25lLCBtZXNzYWdlOiAnZGVsZXRlZCcgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XHJcbiAgICAgIHJlcy5zdGF0dXMoZXJyb3I/LnN0YXR1cyB8fCA1MDApLmpzb24oe1xyXG4gICAgICAgIG1lc3NhZ2U6IGVycm9yPy5tZXNzYWdlIHx8ICdzb21ldGhpbmcgd2VudCB3cm9uZycsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUErQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFaEMsTUFBTUEscUJBQXFCLENBQUM7QUFrSTFDO0FBQUEsZ0JBbElvQkEscUJBQXFCLFlBQ3hCLE9BQU9DLEdBQVEsRUFBRUMsR0FBYSxLQUFLO0VBQ2pELElBQUk7SUFDRixNQUFNO01BQUVDLE1BQU07TUFBRUMsTUFBTTtNQUFFQyxRQUFRO01BQUVDO0lBQUssQ0FBQyxHQUFHTCxHQUFHLENBQUNNLEtBQUs7SUFDcEQsTUFBTUMsSUFBSSxHQUFHQyxNQUFNLENBQUNSLEdBQUcsQ0FBQ00sS0FBSyxDQUFDQyxJQUFJLElBQUksQ0FBQyxDQUFDO0lBQ3hDLE1BQU1FLEtBQUssR0FBR0QsTUFBTSxDQUFDUixHQUFHLENBQUNNLEtBQUssQ0FBQ0csS0FBSyxJQUFJLEVBQUUsQ0FBQztJQUMzQyxNQUFNQyxNQUFNLEdBQUcsQ0FBQ0gsSUFBSSxHQUFHLENBQUMsSUFBSUUsS0FBSztJQUVqQyxNQUFNRSxLQUEwQixHQUFHLENBQUMsQ0FBQztJQUVyQyxJQUFJVCxNQUFNLEVBQUU7TUFDVlMsS0FBSyxDQUFDVCxNQUFNLEdBQUdBLE1BQU07SUFDdkI7SUFDQSxJQUFJQyxNQUFNLEVBQUU7TUFDVlEsS0FBSyxDQUFDUixN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