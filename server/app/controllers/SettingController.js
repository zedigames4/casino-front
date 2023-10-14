"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _HttpException = require("../exceptions/HttpException");
var _Setting = _interopRequireDefault(require("../models/Setting"));
var _pagination = require("../utils/pagination");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class SettingController {}
exports.default = SettingController;
_defineProperty(SettingController, "getAll", async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const offset = (page - 1) * limit;
    const allData = await _Setting.default.find({
      user: req.user._id
    }).skip(offset).limit(limit);
    const count = await _Setting.default.count({
      user: req.user._id
    });
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
_defineProperty(SettingController, "getOne", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const findOne = await _Setting.default.findOne({
      _id: id,
      user: req.user._id
    });
    if (!findOne) throw new _HttpException.HttpException(409, "Setting doesn't exist");
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
_defineProperty(SettingController, "create", async (req, res) => {
  try {
    const itemData = req.body;
    if (req.user.role !== 'admin') {
      itemData.isGlobal = false;
    }
    const createItemData = new _Setting.default(_objectSpread(_objectSpread({}, itemData), {}, {
      user: req.user._id
    }));
    let results = null;
    if (itemData.isGlobal) {
      const previousItem = await _Setting.default.findOne({
        isGlobal: true
      });
      if (previousItem) {
        previousItem.set(itemData);
        results = previousItem.save();
      } else {
        results = await createItemData.save();
      }
    } else {
      results = await createItemData.save();
    }
    res.status(201).json({
      data: results,
      message: 'created'
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      message: error?.message || 'something went wrong'
    });
  }
});
_defineProperty(SettingController, "updateItem", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const itemData = req.body;
    if (req.user.role !== 'admin') {
      itemData.isGlobal = false;
    }
    const findOne = await _Setting.default.findOne({
      _id: id,
      user: req.user._id
    });
    if (!findOne) throw new _HttpException.HttpException(409, "Setting doesn't exist");
    await _Setting.default.updateOne({
      _id: id,
      user: req.user._id
    }, _objectSpread(_objectSpread({}, itemData), {}, {
      user: req.user._id
    }));
    const updateItem = await _Setting.default.findById({
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
_defineProperty(SettingController, "delete", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const findOne = await _Setting.default.findOne({
      _id: id,
      user: req.user._id
    });
    if (!findOne) throw new _HttpException.HttpException(409, "Setting doesn't exist");
    await _Setting.default.deleteOne({
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTZXR0aW5nQ29udHJvbGxlciIsInJlcSIsInJlcyIsInBhZ2UiLCJOdW1iZXIiLCJxdWVyeSIsImxpbWl0Iiwib2Zmc2V0IiwiYWxsRGF0YSIsIlNldHRpbmciLCJmaW5kIiwidXNlciIsIl9pZCIsInNraXAiLCJjb3VudCIsInBhZ2luYXRpb24iLCJwYWdpbmF0ZSIsInN0YXR1cyIsImpzb24iLCJkYXRhIiwibWVzc2FnZSIsImVycm9yIiwiaWQiLCJwYXJhbXMiLCJmaW5kT25lIiwiSHR0cEV4Y2VwdGlvbiIsIml0ZW1EYXRhIiwiYm9keSIsInJvbGUiLCJpc0dsb2JhbCIsImNyZWF0ZUl0ZW1EYXRhIiwicmVzdWx0cyIsInByZXZpb3VzSXRlbSIsInNldCIsInNhdmUiLCJ1cGRhdGVPbmUiLCJ1cGRhdGVJdGVtIiwiZmluZEJ5SWQiLCJkZWxldGVPbmUiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbnRyb2xsZXJzL1NldHRpbmdDb250cm9sbGVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XHJcbmltcG9ydCB7IEh0dHBFeGNlcHRpb24gfSBmcm9tICcuLi9leGNlcHRpb25zL0h0dHBFeGNlcHRpb24nO1xyXG5pbXBvcnQgeyBSZXF1ZXN0V2l0aFVzZXIgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2F1dGguaW50ZXJmYWNlJztcclxuaW1wb3J0IFNldHRpbmcgZnJvbSAnLi4vbW9kZWxzL1NldHRpbmcnO1xyXG5pbXBvcnQgeyBwYWdpbmF0ZSB9IGZyb20gJy4uL3V0aWxzL3BhZ2luYXRpb24nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2V0dGluZ0NvbnRyb2xsZXIge1xyXG4gIHN0YXRpYyBnZXRBbGwgPSBhc3luYyAocmVxOiBSZXF1ZXN0V2l0aFVzZXIsIHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHBhZ2UgPSBOdW1iZXIocmVxLnF1ZXJ5LnBhZ2UgfHwgMSk7XHJcbiAgICAgIGNvbnN0IGxpbWl0ID0gTnVtYmVyKHJlcS5xdWVyeS5saW1pdCB8fCAxMCk7XHJcbiAgICAgIGNvbnN0IG9mZnNldCA9IChwYWdlIC0gMSkgKiBsaW1pdDtcclxuXHJcbiAgICAgIGNvbnN0IGFsbERhdGEgPSBhd2FpdCBTZXR0aW5nLmZpbmQoeyB1c2VyOiByZXEudXNlci5faWQgfSlcclxuICAgICAgICAuc2tpcChvZmZzZXQpXHJcbiAgICAgICAgLmxpbWl0KGxpbWl0KTtcclxuICAgICAgY29uc3QgY291bnQgPSBhd2FpdCBTZXR0aW5nLmNvdW50KHsgdXNlcjogcmVxLnVzZXIuX2lkIH0pO1xyXG5cclxuICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IHBhZ2luYXRlKGNvdW50LCBsaW1pdCwgcGFnZSk7XHJcblxyXG4gICAgICByZXNcclxuICAgICAgICAuc3RhdHVzKDIwMClcclxuICAgICAgICAuanNvbih7IGRhdGE6IGFsbERhdGEsIHBhZ2luYXRpb24sIG1lc3NhZ2U6ICdmaW5kQWxsJyB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgICAgcmVzLnN0YXR1cyhlcnJvcj8uc3RhdHVzIHx8IDUwMCkuanNvbih7XHJcbiAgICAgICAgbWVzc2FnZTogZXJyb3I/Lm1lc3NhZ2UgfHwgJ3NvbWV0aGluZyB3ZW50IHdyb25nJyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIGdldE9uZSA9IGFzeW5jIChyZXE6IFJlcXVlc3RXaXRoVXNlciwgcmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBpZCB9ID0gcmVxLnBhcmFtcztcclxuXHJcbiAgICAgIGNvbnN0IGZpbmRPbmUgPSBhd2FpdCBTZXR0aW5nLmZpbmRPbmUoe1xyXG4gICAgICAgIF9pZDogaWQsXHJcbiAgICAgICAgdXNlcjogcmVxLnVzZXIuX2lkLFxyXG4gICAgICB9KTtcclxuICAgICAgaWYgKCFmaW5kT25lKVxyXG4gICAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKDQwOSwgXCJTZXR0aW5nIGRvZXNuJ3QgZXhpc3RcIik7XHJcblxyXG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IGRhdGE6IGZpbmRPbmUsIG1lc3NhZ2U6ICdmaW5kT25lJyB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgICAgcmVzLnN0YXR1cyhlcnJvcj8uc3RhdHVzIHx8IDUwMCkuanNvbih7XHJcbiAgICAgICAgbWVzc2FnZTogZXJyb3I/Lm1lc3NhZ2UgfHwgJ3NvbWV0aGluZyB3ZW50IHdyb25nJyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIGNyZWF0ZSA9IGFzeW5jIChyZXE6IFJlcXVlc3RXaXRoVXNlciwgcmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgaXRlbURhdGE6IGFueSA9IHJlcS5ib2R5O1xyXG4gICAgICBpZiAocmVxLnVzZXIucm9sZSAhPT0gJ2FkbWluJykge1xyXG4gICAgICAgIGl0ZW1EYXRhLmlzR2xvYmFsID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgY3JlYXRlSXRlbURhdGEgPSBuZXcgU2V0dGluZyh7XHJcbiAgICAgICAgLi4uaXRlbURhdGEsXHJcbiAgICAgICAgdXNlcjogcmVxLnVzZXIuX2lkLFxyXG4gICAgICB9KTtcclxuICAgICAgbGV0IHJlc3VsdHM6IGFueSA9IG51bGw7XHJcbiAgICAgIGlmIChpdGVtRGF0YS5pc0dsb2JhbCkge1xyXG4gICAgICAgIGNvbnN0IHByZXZpb3VzSXRlbSA9IGF3YWl0IFNldHRpbmcuZmluZE9uZSh7XHJcbiAgICAgICAgICBpc0dsb2JhbDogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAocHJldmlvdXNJdGVtKSB7XHJcbiAgICAgICAgICBwcmV2aW91c0l0ZW0uc2V0KGl0ZW1EYXRhKTtcclxuICAgICAgICAgIHJlc3VsdHMgPSBwcmV2aW91c0l0ZW0uc2F2ZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXN1bHRzID0gYXdhaXQgY3JlYXRlSXRlbURhdGEuc2F2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXN1bHRzID0gYXdhaXQgY3JlYXRlSXRlbURhdGEuc2F2ZSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXMuc3RhdHVzKDIwMSkuanNvbih7IGRhdGE6IHJlc3VsdHMsIG1lc3NhZ2U6ICdjcmVhdGVkJyB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgICAgcmVzLnN0YXR1cyhlcnJvcj8uc3RhdHVzIHx8IDUwMCkuanNvbih7XHJcbiAgICAgICAgbWVzc2FnZTogZXJyb3I/Lm1lc3NhZ2UgfHwgJ3NvbWV0aGluZyB3ZW50IHdyb25nJyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIHVwZGF0ZUl0ZW0gPSBhc3luYyAocmVxOiBSZXF1ZXN0V2l0aFVzZXIsIHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XHJcbiAgICAgIGNvbnN0IGl0ZW1EYXRhOiBhbnkgPSByZXEuYm9keTtcclxuICAgICAgaWYgKHJlcS51c2VyLnJvbGUgIT09ICdhZG1pbicpIHtcclxuICAgICAgICBpdGVtRGF0YS5pc0dsb2JhbCA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGZpbmRPbmUgPSBhd2FpdCBTZXR0aW5nLmZpbmRPbmUoe1xyXG4gICAgICAgIF9pZDogaWQsXHJcbiAgICAgICAgdXNlcjogcmVxLnVzZXIuX2lkLFxyXG4gICAgICB9KTtcclxuICAgICAgaWYgKCFmaW5kT25lKVxyXG4gICAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKDQwOSwgXCJTZXR0aW5nIGRvZXNuJ3QgZXhpc3RcIik7XHJcbiAgICAgIGF3YWl0IFNldHRpbmcudXBkYXRlT25lKFxyXG4gICAgICAgIHsgX2lkOiBpZCwgdXNlcjogcmVxLnVzZXIuX2lkIH0sXHJcbiAgICAgICAgeyAuLi5pdGVtRGF0YSwgdXNlcjogcmVxLnVzZXIuX2lkIH0sXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBjb25zdCB1cGRhdGVJdGVtID0gYXdhaXQgU2V0dGluZy5maW5kQnlJZCh7XHJcbiAgICAgICAgX2lkOiBpZCxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IGRhdGE6IHVwZGF0ZUl0ZW0sIG1lc3NhZ2U6ICd1cGRhdGVkJyB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgICAgcmVzLnN0YXR1cyhlcnJvcj8uc3RhdHVzIHx8IDUwMCkuanNvbih7XHJcbiAgICAgICAgbWVzc2FnZTogZXJyb3I/Lm1lc3NhZ2UgfHwgJ3NvbWV0aGluZyB3ZW50IHdyb25nJyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIGRlbGV0ZSA9IGFzeW5jIChyZXE6IFJlcXVlc3RXaXRoVXNlciwgcmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBpZCB9ID0gcmVxLnBhcmFtcztcclxuICAgICAgY29uc3QgZmluZE9uZSA9IGF3YWl0IFNldHRpbmcuZmluZE9uZSh7XHJcbiAgICAgICAgX2lkOiBpZCxcclxuICAgICAgICB1c2VyOiByZXEudXNlci5faWQsXHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAoIWZpbmRPbmUpXHJcbiAgICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oNDA5LCBcIlNldHRpbmcgZG9lc24ndCBleGlzdFwiKTtcclxuXHJcbiAgICAgIGF3YWl0IFNldHRpbmcuZGVsZXRlT25lKHsgX2lkOiBpZCB9KTtcclxuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBkYXRhOiBmaW5kT25lLCBtZXNzYWdlOiAnZGVsZXRlZCcgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XHJcbiAgICAgIHJlcy5zdGF0dXMoZXJyb3I/LnN0YXR1cyB8fCA1MDApLmpzb24oe1xyXG4gICAgICAgIG1lc3NhZ2U6IGVycm9yPy5tZXNzYWdlIHx8ICdzb21ldGhpbmcgd2VudCB3cm9uZycsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQTtBQUVBO0FBQ0E7QUFBK0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRWhDLE1BQU1BLGlCQUFpQixDQUFDO0FBNEh0QztBQUFBLGdCQTVIb0JBLGlCQUFpQixZQUNwQixPQUFPQyxHQUFvQixFQUFFQyxHQUFhLEtBQUs7RUFDN0QsSUFBSTtJQUNGLE1BQU1DLElBQUksR0FBR0MsTUFBTSxDQUFDSCxHQUFHLENBQUNJLEtBQUssQ0FBQ0YsSUFBSSxJQUFJLENBQUMsQ0FBQztJQUN4QyxNQUFNRyxLQUFLLEdBQUdGLE1BQU0sQ0FBQ0gsR0FBRyxDQUFDSSxLQUFLLENBQUNDLEtBQUssSUFBSSxFQUFFLENBQUM7SUFDM0MsTUFBTUMsTUFBTSxHQUFHLENBQUNKLElBQUksR0FBRyxDQUFDLElBQUlHLEtBQUs7SUFFakMsTUFBTUUsT0FBTyxHQUFHLE1BQU1DLGdCQUFPLENBQUNDLElBQUksQ0FBQztNQUFFQyxJQUFJLEVBQUVWLEdBQUcsQ0FBQ1UsSUFBSSxDQUFDQztJQUFJLENBQUMsQ0FBQyxDQUN2REMsSUFBSSxDQUFDTixNQUFNLENBQUMsQ0FDWkQsS0FBSyxDQUFDQSxLQUFLLENBQUM7SUFDZixNQUFNUSxLQUFLLEdBQUcsTUFBTUwsZ0JBQU8sQ0FBQ0ssS0FBSyxDQUFDO01BQUVILElBQUksRUFBRVYsR0FBRyxDQUFDVSxJQUFJLENBQUNDO0lBQUksQ0FBQyxDQUFDO0lBRXpELE1BQU1HLFVBQVUsR0FBRyxJQUFBQyxvQkFBUSxFQUFD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