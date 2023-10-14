"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _HttpException = require("../exceptions/HttpException");
var _User = _interopRequireDefault(require("../models/User"));
var _file = _interopRequireDefault(require("../utils/file"));
var _helper = require("../utils/helper");
var _AuthController = _interopRequireDefault(require("./AuthController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class UserController {}
exports.default = UserController;
_defineProperty(UserController, "getOne", async (req, res) => {
  try {
    const findOne = await _User.default.findById(req.user._id);
    if (!findOne) throw new _HttpException.HttpException(409, "User doesn't exist");
    findOne.avatar = (0, _helper.imageUrl)(findOne.avatar);
    res.status(200).json({
      data: findOne.toJSON(),
      message: 'findOne'
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      message: error?.message || 'something went wrong'
    });
  }
});
_defineProperty(UserController, "updateReferralCode", async (req, res) => {
  try {
    const findOne = await _User.default.findById(req.user._id);
    if (!findOne) throw new _HttpException.HttpException(409, "User doesn't exist");
    const referralCode = _AuthController.default.generateReferralCode();
    findOne.set({
      referralCode
    });
    await findOne.save();
    res.status(200).json({
      referralCode,
      message: 'updated'
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      message: error?.message || 'something went wrong'
    });
  }
});
_defineProperty(UserController, "updateItem", async (req, res) => {
  try {
    const itemData = req.body;
    const findOne = await _User.default.findById(req.user._id);
    if (!findOne) throw new _HttpException.HttpException(409, "User doesn't exist");
    if (req.file) {
      itemData.avatar = req.file.filename;
      (0, _file.default)(findOne.avatar);
    }
    findOne.set(itemData);
    const updateItem = await findOne.save();
    updateItem.avatar = (0, _helper.imageUrl)(updateItem.avatar);
    res.status(200).json({
      data: updateItem.toJSON(),
      message: 'updated'
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      message: error?.message || 'something went wrong'
    });
  }
});
_defineProperty(UserController, "delete", async (req, res) => {
  try {
    const findOne = await _User.default.findById(req.user._id);
    if (!findOne) throw new _HttpException.HttpException(409, "User doesn't exist");
    await findOne.deleteOne();
    findOne.avatar = (0, _helper.imageUrl)(findOne.avatar);
    res.status(200).json({
      data: findOne.toJSON(),
      message: 'deleted'
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      message: error?.message || 'something went wrong'
    });
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJVc2VyQ29udHJvbGxlciIsInJlcSIsInJlcyIsImZpbmRPbmUiLCJVc2VyIiwiZmluZEJ5SWQiLCJ1c2VyIiwiX2lkIiwiSHR0cEV4Y2VwdGlvbiIsImF2YXRhciIsImltYWdlVXJsIiwic3RhdHVzIiwianNvbiIsImRhdGEiLCJ0b0pTT04iLCJtZXNzYWdlIiwiZXJyb3IiLCJyZWZlcnJhbENvZGUiLCJBdXRoQ29udHJvbGxlciIsImdlbmVyYXRlUmVmZXJyYWxDb2RlIiwic2V0Iiwic2F2ZSIsIml0ZW1EYXRhIiwiYm9keSIsImZpbGUiLCJmaWxlbmFtZSIsInJlbW92ZUZpbGUiLCJ1cGRhdGVJdGVtIiwiZGVsZXRlT25lIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb250cm9sbGVycy9Qcm9maWxlQ29udHJvbGxlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXNwb25zZSwgUmVxdWVzdCB9IGZyb20gJ2V4cHJlc3MnO1xyXG5pbXBvcnQgeyBIdHRwRXhjZXB0aW9uIH0gZnJvbSAnLi4vZXhjZXB0aW9ucy9IdHRwRXhjZXB0aW9uJztcclxuaW1wb3J0IHsgUmVxdWVzdFdpdGhVc2VyIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9hdXRoLmludGVyZmFjZSc7XHJcbmltcG9ydCBVc2VyIGZyb20gJy4uL21vZGVscy9Vc2VyJztcclxuaW1wb3J0IHJlbW92ZUZpbGUgZnJvbSAnLi4vdXRpbHMvZmlsZSc7XHJcbmltcG9ydCB7IGltYWdlVXJsIH0gZnJvbSAnLi4vdXRpbHMvaGVscGVyJztcclxuaW1wb3J0IEF1dGhDb250cm9sbGVyIGZyb20gJy4vQXV0aENvbnRyb2xsZXInO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckNvbnRyb2xsZXIge1xyXG4gIHN0YXRpYyBnZXRPbmUgPSBhc3luYyAocmVxOiBSZXF1ZXN0V2l0aFVzZXIsIHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGZpbmRPbmUgPSBhd2FpdCBVc2VyLmZpbmRCeUlkKHJlcS51c2VyLl9pZCk7XHJcbiAgICAgIGlmICghZmluZE9uZSlcclxuICAgICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbig0MDksIFwiVXNlciBkb2Vzbid0IGV4aXN0XCIpO1xyXG5cclxuICAgICAgZmluZE9uZS5hdmF0YXIgPSBpbWFnZVVybChmaW5kT25lLmF2YXRhcik7XHJcblxyXG4gICAgICByZXNcclxuICAgICAgICAuc3RhdHVzKDIwMClcclxuICAgICAgICAuanNvbih7IGRhdGE6IGZpbmRPbmUudG9KU09OKCksIG1lc3NhZ2U6ICdmaW5kT25lJyB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgICAgcmVzLnN0YXR1cyhlcnJvcj8uc3RhdHVzIHx8IDUwMCkuanNvbih7XHJcbiAgICAgICAgbWVzc2FnZTogZXJyb3I/Lm1lc3NhZ2UgfHwgJ3NvbWV0aGluZyB3ZW50IHdyb25nJyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIHVwZGF0ZVJlZmVycmFsQ29kZSA9IGFzeW5jIChcclxuICAgIHJlcTogUmVxdWVzdFdpdGhVc2VyLFxyXG4gICAgcmVzOiBSZXNwb25zZSxcclxuICApID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGZpbmRPbmUgPSBhd2FpdCBVc2VyLmZpbmRCeUlkKHJlcS51c2VyLl9pZCk7XHJcbiAgICAgIGlmICghZmluZE9uZSlcclxuICAgICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbig0MDksIFwiVXNlciBkb2Vzbid0IGV4aXN0XCIpO1xyXG5cclxuICAgICAgY29uc3QgcmVmZXJyYWxDb2RlID0gQXV0aENvbnRyb2xsZXIuZ2VuZXJhdGVSZWZlcnJhbENvZGUoKTtcclxuXHJcbiAgICAgIGZpbmRPbmUuc2V0KHtcclxuICAgICAgICByZWZlcnJhbENvZGUsXHJcbiAgICAgIH0pO1xyXG4gICAgICBhd2FpdCBmaW5kT25lLnNhdmUoKTtcclxuXHJcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgcmVmZXJyYWxDb2RlLCBtZXNzYWdlOiAndXBkYXRlZCcgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XHJcbiAgICAgIHJlcy5zdGF0dXMoZXJyb3I/LnN0YXR1cyB8fCA1MDApLmpzb24oe1xyXG4gICAgICAgIG1lc3NhZ2U6IGVycm9yPy5tZXNzYWdlIHx8ICdzb21ldGhpbmcgd2VudCB3cm9uZycsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHN0YXRpYyB1cGRhdGVJdGVtID0gYXN5bmMgKHJlcTogUmVxdWVzdFdpdGhVc2VyLCByZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBpdGVtRGF0YTogYW55ID0gcmVxLmJvZHk7XHJcbiAgICAgIGNvbnN0IGZpbmRPbmUgPSBhd2FpdCBVc2VyLmZpbmRCeUlkKHJlcS51c2VyLl9pZCk7XHJcbiAgICAgIGlmICghZmluZE9uZSlcclxuICAgICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbig0MDksIFwiVXNlciBkb2Vzbid0IGV4aXN0XCIpO1xyXG5cclxuICAgICAgaWYgKHJlcS5maWxlKSB7XHJcbiAgICAgICAgaXRlbURhdGEuYXZhdGFyID0gcmVxLmZpbGUuZmlsZW5hbWU7XHJcbiAgICAgICAgcmVtb3ZlRmlsZShmaW5kT25lLmF2YXRhcik7XHJcbiAgICAgIH1cclxuICAgICAgZmluZE9uZS5zZXQoaXRlbURhdGEpO1xyXG5cclxuICAgICAgY29uc3QgdXBkYXRlSXRlbSA9IGF3YWl0IGZpbmRPbmUuc2F2ZSgpO1xyXG4gICAgICB1cGRhdGVJdGVtLmF2YXRhciA9IGltYWdlVXJsKHVwZGF0ZUl0ZW0uYXZhdGFyKTtcclxuXHJcbiAgICAgIHJlc1xyXG4gICAgICAgIC5zdGF0dXMoMjAwKVxyXG4gICAgICAgIC5qc29uKHsgZGF0YTogdXBkYXRlSXRlbS50b0pTT04oKSwgbWVzc2FnZTogJ3VwZGF0ZWQnIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgICByZXMuc3RhdHVzKGVycm9yPy5zdGF0dXMgfHwgNTAwKS5qc29uKHtcclxuICAgICAgICBtZXNzYWdlOiBlcnJvcj8ubWVzc2FnZSB8fCAnc29tZXRoaW5nIHdlbnQgd3JvbmcnLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBzdGF0aWMgZGVsZXRlID0gYXN5bmMgKHJlcTogUmVxdWVzdFdpdGhVc2VyLCByZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBmaW5kT25lID0gYXdhaXQgVXNlci5maW5kQnlJZChyZXEudXNlci5faWQpO1xyXG4gICAgICBpZiAoIWZpbmRPbmUpXHJcbiAgICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oNDA5LCBcIlVzZXIgZG9lc24ndCBleGlzdFwiKTtcclxuXHJcbiAgICAgIGF3YWl0IGZpbmRPbmUuZGVsZXRlT25lKCk7XHJcblxyXG4gICAgICBmaW5kT25lLmF2YXRhciA9IGltYWdlVXJsKGZpbmRPbmUuYXZhdGFyKTtcclxuXHJcbiAgICAgIHJlc1xyXG4gICAgICAgIC5zdGF0dXMoMjAwKVxyXG4gICAgICAgIC5qc29uKHsgZGF0YTogZmluZE9uZS50b0pTT04oKSwgbWVzc2FnZTogJ2RlbGV0ZWQnIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgICByZXMuc3RhdHVzKGVycm9yPy5zdGF0dXMgfHwgNTAwKS5qc29uKHtcclxuICAgICAgICBtZXNzYWdlOiBlcnJvcj8ubWVzc2FnZSB8fCAnc29tZXRoaW5nIHdlbnQgd3JvbmcnLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG59XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUE4QztBQUFBO0FBQUE7QUFBQTtBQUUvQixNQUFNQSxjQUFjLENBQUM7QUF3Rm5DO0FBQUEs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