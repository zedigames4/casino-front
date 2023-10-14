"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _HttpException = require("../exceptions/HttpException");
var _Contact = _interopRequireDefault(require("../models/Contact"));
var _pagination = require("../utils/pagination");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class ContactController {}
exports.default = ContactController;
_defineProperty(ContactController, "getAll", async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const offset = (page - 1) * limit;
    const allData = await _Contact.default.find().skip(offset).limit(limit);
    const count = await _Contact.default.count();
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
_defineProperty(ContactController, "getOne", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const findOne = await _Contact.default.findById(id);
    if (!findOne) throw new _HttpException.HttpException(409, "Contact doesn't exist");
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
_defineProperty(ContactController, "create", async (req, res) => {
  try {
    const itemData = req.body;
    const createItemData = new _Contact.default(itemData);
    const newData = await createItemData.save();
    res.status(201).json({
      data: newData,
      message: "Thank you for contacting us, we'll reach out to you soon."
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      message: error?.message || 'something went wrong'
    });
  }
});
_defineProperty(ContactController, "updateItem", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const itemData = req.body;
    const findOne = await _Contact.default.findById(id);
    if (!findOne) throw new _HttpException.HttpException(409, "Contact doesn't exist");
    await _Contact.default.updateOne({
      _id: id
    }, itemData);
    const updateItem = await _Contact.default.findById(id);
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
_defineProperty(ContactController, "delete", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const findOne = await _Contact.default.findById(id);
    if (!findOne) throw new _HttpException.HttpException(409, "Contact doesn't exist");
    await _Contact.default.deleteOne({
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJDb250YWN0Q29udHJvbGxlciIsInJlcSIsInJlcyIsInBhZ2UiLCJOdW1iZXIiLCJxdWVyeSIsImxpbWl0Iiwib2Zmc2V0IiwiYWxsRGF0YSIsIkNvbnRhY3QiLCJmaW5kIiwic2tpcCIsImNvdW50IiwicGFnaW5hdGlvbiIsInBhZ2luYXRlIiwic3RhdHVzIiwianNvbiIsImRhdGEiLCJtZXNzYWdlIiwiZXJyb3IiLCJpZCIsInBhcmFtcyIsImZpbmRPbmUiLCJmaW5kQnlJZCIsIkh0dHBFeGNlcHRpb24iLCJpdGVtRGF0YSIsImJvZHkiLCJjcmVhdGVJdGVtRGF0YSIsIm5ld0RhdGEiLCJzYXZlIiwidXBkYXRlT25lIiwiX2lkIiwidXBkYXRlSXRlbSIsImRlbGV0ZU9uZSJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29udHJvbGxlcnMvQ29udGFjdENvbnRyb2xsZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcclxuaW1wb3J0IHsgSHR0cEV4Y2VwdGlvbiB9IGZyb20gJy4uL2V4Y2VwdGlvbnMvSHR0cEV4Y2VwdGlvbic7XHJcbmltcG9ydCBDb250YWN0IGZyb20gJy4uL21vZGVscy9Db250YWN0JztcclxuaW1wb3J0IHsgcGFnaW5hdGUgfSBmcm9tICcuLi91dGlscy9wYWdpbmF0aW9uJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRhY3RDb250cm9sbGVyIHtcclxuICBzdGF0aWMgZ2V0QWxsID0gYXN5bmMgKHJlcTogYW55LCByZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBwYWdlID0gTnVtYmVyKHJlcS5xdWVyeS5wYWdlIHx8IDEpO1xyXG4gICAgICBjb25zdCBsaW1pdCA9IE51bWJlcihyZXEucXVlcnkubGltaXQgfHwgMTApO1xyXG4gICAgICBjb25zdCBvZmZzZXQgPSAocGFnZSAtIDEpICogbGltaXQ7XHJcblxyXG4gICAgICBjb25zdCBhbGxEYXRhID0gYXdhaXQgQ29udGFjdC5maW5kKCkuc2tpcChvZmZzZXQpLmxpbWl0KGxpbWl0KTtcclxuICAgICAgY29uc3QgY291bnQgPSBhd2FpdCBDb250YWN0LmNvdW50KCk7XHJcblxyXG4gICAgICBjb25zdCBwYWdpbmF0aW9uID0gcGFnaW5hdGUoY291bnQsIGxpbWl0LCBwYWdlKTtcclxuXHJcbiAgICAgIHJlc1xyXG4gICAgICAgIC5zdGF0dXMoMjAwKVxyXG4gICAgICAgIC5qc29uKHsgZGF0YTogYWxsRGF0YSwgcGFnaW5hdGlvbiwgbWVzc2FnZTogJ2ZpbmRBbGwnIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgICByZXMuc3RhdHVzKGVycm9yPy5zdGF0dXMgfHwgNTAwKS5qc29uKHtcclxuICAgICAgICBtZXNzYWdlOiBlcnJvcj8ubWVzc2FnZSB8fCAnc29tZXRoaW5nIHdlbnQgd3JvbmcnLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBzdGF0aWMgZ2V0T25lID0gYXN5bmMgKHJlcTogYW55LCByZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xyXG5cclxuICAgICAgY29uc3QgZmluZE9uZSA9IGF3YWl0IENvbnRhY3QuZmluZEJ5SWQoaWQpO1xyXG4gICAgICBpZiAoIWZpbmRPbmUpXHJcbiAgICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oNDA5LCBcIkNvbnRhY3QgZG9lc24ndCBleGlzdFwiKTtcclxuXHJcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgZGF0YTogZmluZE9uZSwgbWVzc2FnZTogJ2ZpbmRPbmUnIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgICByZXMuc3RhdHVzKGVycm9yPy5zdGF0dXMgfHwgNTAwKS5qc29uKHtcclxuICAgICAgICBtZXNzYWdlOiBlcnJvcj8ubWVzc2FnZSB8fCAnc29tZXRoaW5nIHdlbnQgd3JvbmcnLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBzdGF0aWMgY3JlYXRlID0gYXN5bmMgKHJlcTogYW55LCByZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBpdGVtRGF0YTogYW55ID0gcmVxLmJvZHk7XHJcbiAgICAgIGNvbnN0IGNyZWF0ZUl0ZW1EYXRhID0gbmV3IENvbnRhY3QoaXRlbURhdGEpO1xyXG5cclxuICAgICAgY29uc3QgbmV3RGF0YSA9IGF3YWl0IGNyZWF0ZUl0ZW1EYXRhLnNhdmUoKTtcclxuXHJcbiAgICAgIHJlcy5zdGF0dXMoMjAxKS5qc29uKHtcclxuICAgICAgICBkYXRhOiBuZXdEYXRhLFxyXG4gICAgICAgIG1lc3NhZ2U6XHJcbiAgICAgICAgICBcIlRoYW5rIHlvdSBmb3IgY29udGFjdGluZyB1cywgd2UnbGwgcmVhY2ggb3V0IHRvIHlvdSBzb29uLlwiLFxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgICAgcmVzLnN0YXR1cyhlcnJvcj8uc3RhdHVzIHx8IDUwMCkuanNvbih7XHJcbiAgICAgICAgbWVzc2FnZTogZXJyb3I/Lm1lc3NhZ2UgfHwgJ3NvbWV0aGluZyB3ZW50IHdyb25nJyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIHVwZGF0ZUl0ZW0gPSBhc3luYyAocmVxOiBhbnksIHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XHJcbiAgICAgIGNvbnN0IGl0ZW1EYXRhOiBhbnkgPSByZXEuYm9keTtcclxuICAgICAgY29uc3QgZmluZE9uZSA9IGF3YWl0IENvbnRhY3QuZmluZEJ5SWQoaWQpO1xyXG4gICAgICBpZiAoIWZpbmRPbmUpXHJcbiAgICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oNDA5LCBcIkNvbnRhY3QgZG9lc24ndCBleGlzdFwiKTtcclxuICAgICAgYXdhaXQgQ29udGFjdC51cGRhdGVPbmUoeyBfaWQ6IGlkIH0sIGl0ZW1EYXRhKTtcclxuXHJcbiAgICAgIGNvbnN0IHVwZGF0ZUl0ZW0gPSBhd2FpdCBDb250YWN0LmZpbmRCeUlkKGlkKTtcclxuXHJcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgZGF0YTogdXBkYXRlSXRlbSwgbWVzc2FnZTogJ3VwZGF0ZWQnIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgICByZXMuc3RhdHVzKGVycm9yPy5zdGF0dXMgfHwgNTAwKS5qc29uKHtcclxuICAgICAgICBtZXNzYWdlOiBlcnJvcj8ubWVzc2FnZSB8fCAnc29tZXRoaW5nIHdlbnQgd3JvbmcnLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBzdGF0aWMgZGVsZXRlID0gYXN5bmMgKHJlcTogYW55LCByZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xyXG4gICAgICBjb25zdCBmaW5kT25lID0gYXdhaXQgQ29udGFjdC5maW5kQnlJZChpZCk7XHJcbiAgICAgIGlmICghZmluZE9uZSlcclxuICAgICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbig0MDksIFwiQ29udGFjdCBkb2Vzbid0IGV4aXN0XCIpO1xyXG5cclxuICAgICAgYXdhaXQgQ29udGFjdC5kZWxldGVPbmUoeyBfaWQ6IGlkIH0pO1xyXG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IGRhdGE6IGZpbmRPbmUsIG1lc3NhZ2U6ICdkZWxldGVkJyB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgICAgcmVzLnN0YXR1cyhlcnJvcj8uc3RhdHVzIHx8IDUwMCkuanNvbih7XHJcbiAgICAgICAgbWVzc2FnZTogZXJyb3I/Lm1lc3NhZ2UgfHwgJ3NvbWV0aGluZyB3ZW50IHdyb25nJyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUErQztBQUFBO0FBQUE7QUFBQTtBQUVoQyxNQUFNQSxpQkFBaUIsQ0FBQztBQTJGdEM7QUFBQSxnQkEzRm9CQSxpQkFBaUIsWUFDcEIsT0FBT0MsR0FBUSxFQUFFQyxHQUFhLEtBQUs7RUFDakQsSUFBSTtJQUNGLE1BQU1DLElBQUksR0FBR0MsTUFBTSxDQUFDSCxHQUFHLENBQUNJLEtBQUssQ0FBQ0YsSUFBSSxJQUFJLENBQUMsQ0FBQztJQUN4QyxNQUFNRyxLQUFLLEdBQUdGLE1BQU0sQ0FBQ0gsR0FBRyxDQUFDSSxLQUFLLENBQUNDLEtBQUssSUFBSSxFQUFFLENBQUM7SUFDM0MsTUFBTUMsTUFBTSxHQUFHLENBQUNKLElBQUksR0FBRyxDQUFDLElBQUlHLEtBQUs7SUFFakMsTUFBTUUsT0FBTyxHQUFHLE1BQU1DLGdCQUFPLENBQUNDLElBQUksRUFBRSxDQUFDQyxJQUFJLENBQUNKLE1BQU0sQ0FBQyxDQUFDRCxLQUFLLENBQUNBLEtBQUssQ0FBQztJQUM5RCxNQUFNTSxLQUFLLEdBQUcsTUFBTUgsZ0JBQU8sQ0FBQ0csS0FBSyxFQUFFO0lBRW5DLE1BQU1DLFVBQVUsR0FBRyxJQUFBQyxvQkFBUSxFQUFDRixLQUFLLEVBQUVOLEtBQUssRUFBRUgsSUFBSSxDQUFDO0lBRS9DRCxHQUFHLENBQ0FhLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FDWEMsSUFBSSxDQUFDO01BQUVDLElBQUksRUFBRVQsT0FBTztNQUFFSyxVQUFVO01BQUVLLE9BQU8sRUFBRTtJQUFVLENBQUMsQ0FBQztFQUM1RCxDQUFDLENBQUMsT0FBT0MsS0FBVSxFQUFFO0lBQ25CakIsR0FBRyxDQUFDYSxNQUFNLENBQUNJLEtBQUssRUFBRUosTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7TUFDcENFLE9BQU8sRUFBRUMsS0FBSyxF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