"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _HttpException = require("../exceptions/HttpException");
var _Subscriber = _interopRequireDefault(require("../models/Subscriber"));
var _pagination = require("../utils/pagination");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class SubscriberController {}
exports.default = SubscriberController;
_defineProperty(SubscriberController, "getAll", async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const offset = (page - 1) * limit;
    const allData = await _Subscriber.default.find().skip(offset).limit(limit);
    const count = await _Subscriber.default.count();
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
_defineProperty(SubscriberController, "getOne", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const findOne = await _Subscriber.default.findById(id);
    if (!findOne) throw new _HttpException.HttpException(409, "Subscriber doesn't exist");
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
_defineProperty(SubscriberController, "create", async (req, res) => {
  try {
    const itemData = req.body;
    const foundItem = await _Subscriber.default.findOne({
      email: itemData.email
    });
    if (foundItem) {
      throw new _HttpException.HttpException(409, 'Email is already subscribed');
    }
    const createItemData = new _Subscriber.default(itemData);
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
_defineProperty(SubscriberController, "updateItem", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const itemData = req.body;
    const findOne = await _Subscriber.default.findById(id);
    if (!findOne) throw new _HttpException.HttpException(409, "Subscriber doesn't exist");
    await _Subscriber.default.updateOne({
      _id: id
    }, itemData);
    const updateItem = await _Subscriber.default.findById(id);
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
_defineProperty(SubscriberController, "delete", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const findOne = await _Subscriber.default.findById(id);
    if (!findOne) throw new _HttpException.HttpException(409, "Subscriber doesn't exist");
    await _Subscriber.default.deleteOne({
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTdWJzY3JpYmVyQ29udHJvbGxlciIsInJlcSIsInJlcyIsInBhZ2UiLCJOdW1iZXIiLCJxdWVyeSIsImxpbWl0Iiwib2Zmc2V0IiwiYWxsRGF0YSIsIlN1YnNjcmliZXIiLCJmaW5kIiwic2tpcCIsImNvdW50IiwicGFnaW5hdGlvbiIsInBhZ2luYXRlIiwic3RhdHVzIiwianNvbiIsImRhdGEiLCJtZXNzYWdlIiwiZXJyb3IiLCJpZCIsInBhcmFtcyIsImZpbmRPbmUiLCJmaW5kQnlJZCIsIkh0dHBFeGNlcHRpb24iLCJpdGVtRGF0YSIsImJvZHkiLCJmb3VuZEl0ZW0iLCJlbWFpbCIsImNyZWF0ZUl0ZW1EYXRhIiwibmV3RGF0YSIsInNhdmUiLCJ1cGRhdGVPbmUiLCJfaWQiLCJ1cGRhdGVJdGVtIiwiZGVsZXRlT25lIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb250cm9sbGVycy9TdWJzY3JpYmVyQ29udHJvbGxlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xyXG5pbXBvcnQgeyBIdHRwRXhjZXB0aW9uIH0gZnJvbSAnLi4vZXhjZXB0aW9ucy9IdHRwRXhjZXB0aW9uJztcclxuaW1wb3J0IFN1YnNjcmliZXIgZnJvbSAnLi4vbW9kZWxzL1N1YnNjcmliZXInO1xyXG5pbXBvcnQgeyBwYWdpbmF0ZSB9IGZyb20gJy4uL3V0aWxzL3BhZ2luYXRpb24nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3Vic2NyaWJlckNvbnRyb2xsZXIge1xyXG4gIHN0YXRpYyBnZXRBbGwgPSBhc3luYyAocmVxOiBhbnksIHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHBhZ2UgPSBOdW1iZXIocmVxLnF1ZXJ5LnBhZ2UgfHwgMSk7XHJcbiAgICAgIGNvbnN0IGxpbWl0ID0gTnVtYmVyKHJlcS5xdWVyeS5saW1pdCB8fCAxMCk7XHJcbiAgICAgIGNvbnN0IG9mZnNldCA9IChwYWdlIC0gMSkgKiBsaW1pdDtcclxuXHJcbiAgICAgIGNvbnN0IGFsbERhdGEgPSBhd2FpdCBTdWJzY3JpYmVyLmZpbmQoKVxyXG4gICAgICAgIC5za2lwKG9mZnNldClcclxuICAgICAgICAubGltaXQobGltaXQpO1xyXG4gICAgICBjb25zdCBjb3VudCA9IGF3YWl0IFN1YnNjcmliZXIuY291bnQoKTtcclxuXHJcbiAgICAgIGNvbnN0IHBhZ2luYXRpb24gPSBwYWdpbmF0ZShjb3VudCwgbGltaXQsIHBhZ2UpO1xyXG5cclxuICAgICAgcmVzXHJcbiAgICAgICAgLnN0YXR1cygyMDApXHJcbiAgICAgICAgLmpzb24oeyBkYXRhOiBhbGxEYXRhLCBwYWdpbmF0aW9uLCBtZXNzYWdlOiAnZmluZEFsbCcgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XHJcbiAgICAgIHJlcy5zdGF0dXMoZXJyb3I/LnN0YXR1cyB8fCA1MDApLmpzb24oe1xyXG4gICAgICAgIG1lc3NhZ2U6IGVycm9yPy5tZXNzYWdlIHx8ICdzb21ldGhpbmcgd2VudCB3cm9uZycsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHN0YXRpYyBnZXRPbmUgPSBhc3luYyAocmVxOiBhbnksIHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XHJcblxyXG4gICAgICBjb25zdCBmaW5kT25lID0gYXdhaXQgU3Vic2NyaWJlci5maW5kQnlJZChpZCk7XHJcbiAgICAgIGlmICghZmluZE9uZSlcclxuICAgICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbig0MDksIFwiU3Vic2NyaWJlciBkb2Vzbid0IGV4aXN0XCIpO1xyXG5cclxuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBkYXRhOiBmaW5kT25lLCBtZXNzYWdlOiAnZmluZE9uZScgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XHJcbiAgICAgIHJlcy5zdGF0dXMoZXJyb3I/LnN0YXR1cyB8fCA1MDApLmpzb24oe1xyXG4gICAgICAgIG1lc3NhZ2U6IGVycm9yPy5tZXNzYWdlIHx8ICdzb21ldGhpbmcgd2VudCB3cm9uZycsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHN0YXRpYyBjcmVhdGUgPSBhc3luYyAocmVxOiBhbnksIHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGl0ZW1EYXRhOiBhbnkgPSByZXEuYm9keTtcclxuXHJcbiAgICAgIGNvbnN0IGZvdW5kSXRlbSA9IGF3YWl0IFN1YnNjcmliZXIuZmluZE9uZSh7XHJcbiAgICAgICAgZW1haWw6IGl0ZW1EYXRhLmVtYWlsLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChmb3VuZEl0ZW0pIHtcclxuICAgICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbig0MDksICdFbWFpbCBpcyBhbHJlYWR5IHN1YnNjcmliZWQnKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBjcmVhdGVJdGVtRGF0YSA9IG5ldyBTdWJzY3JpYmVyKGl0ZW1EYXRhKTtcclxuXHJcbiAgICAgIGNvbnN0IG5ld0RhdGEgPSBhd2FpdCBjcmVhdGVJdGVtRGF0YS5zYXZlKCk7XHJcblxyXG4gICAgICByZXMuc3RhdHVzKDIwMSkuanNvbih7IGRhdGE6IG5ld0RhdGEsIG1lc3NhZ2U6ICdjcmVhdGVkJyB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgICAgcmVzLnN0YXR1cyhlcnJvcj8uc3RhdHVzIHx8IDUwMCkuanNvbih7XHJcbiAgICAgICAgbWVzc2FnZTogZXJyb3I/Lm1lc3NhZ2UgfHwgJ3NvbWV0aGluZyB3ZW50IHdyb25nJyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIHVwZGF0ZUl0ZW0gPSBhc3luYyAocmVxOiBhbnksIHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XHJcbiAgICAgIGNvbnN0IGl0ZW1EYXRhOiBhbnkgPSByZXEuYm9keTtcclxuICAgICAgY29uc3QgZmluZE9uZSA9IGF3YWl0IFN1YnNjcmliZXIuZmluZEJ5SWQoaWQpO1xyXG4gICAgICBpZiAoIWZpbmRPbmUpXHJcbiAgICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oNDA5LCBcIlN1YnNjcmliZXIgZG9lc24ndCBleGlzdFwiKTtcclxuICAgICAgYXdhaXQgU3Vic2NyaWJlci51cGRhdGVPbmUoeyBfaWQ6IGlkIH0sIGl0ZW1EYXRhKTtcclxuXHJcbiAgICAgIGNvbnN0IHVwZGF0ZUl0ZW0gPSBhd2FpdCBTdWJzY3JpYmVyLmZpbmRCeUlkKGlkKTtcclxuXHJcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgZGF0YTogdXBkYXRlSXRlbSwgbWVzc2FnZTogJ3VwZGF0ZWQnIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgICByZXMuc3RhdHVzKGVycm9yPy5zdGF0dXMgfHwgNTAwKS5qc29uKHtcclxuICAgICAgICBtZXNzYWdlOiBlcnJvcj8ubWVzc2FnZSB8fCAnc29tZXRoaW5nIHdlbnQgd3JvbmcnLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBzdGF0aWMgZGVsZXRlID0gYXN5bmMgKHJlcTogYW55LCByZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xyXG4gICAgICBjb25zdCBmaW5kT25lID0gYXdhaXQgU3Vic2NyaWJlci5maW5kQnlJZChpZCk7XHJcbiAgICAgIGlmICghZmluZE9uZSlcclxuICAgICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbig0MDksIFwiU3Vic2NyaWJlciBkb2Vzbid0IGV4aXN0XCIpO1xyXG5cclxuICAgICAgYXdhaXQgU3Vic2NyaWJlci5kZWxldGVPbmUoeyBfaWQ6IGlkIH0pO1xyXG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IGRhdGE6IGZpbmRPbmUsIG1lc3NhZ2U6ICdkZWxldGVkJyB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgICAgcmVzLnN0YXR1cyhlcnJvcj8uc3RhdHVzIHx8IDUwMCkuanNvbih7XHJcbiAgICAgICAgbWVzc2FnZTogZXJyb3I/Lm1lc3NhZ2UgfHwgJ3NvbWV0aGluZyB3ZW50IHdyb25nJyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBO0FBQ0E7QUFDQTtBQUErQztBQUFBO0FBQUE7QUFBQTtBQUVoQyxNQUFNQSxvQkFBb0IsQ0FBQztBQWlHekM7QUFBQSxnQkFqR29CQSxvQkFBb0IsWUFDdkIsT0FBT0MsR0FBUSxFQUFFQyxHQUFhLEtBQUs7RUFDakQsSUFBSTtJQUNGLE1BQU1DLElBQUksR0FBR0MsTUFBTSxDQUFDSCxHQUFHLENBQUNJLEtBQUssQ0FBQ0YsSUFBSSxJQUFJLENBQUMsQ0FBQztJQUN4QyxNQUFNRyxLQUFLLEdBQUdGLE1BQU0sQ0FBQ0gsR0FBRyxDQUFDSSxLQUFLLENBQUNDLEtBQUssSUFBSSxFQUFFLENBQUM7SUFDM0MsTUFBTUMsTUFBTSxHQUFHLENBQUNKLElBQUksR0FBRyxDQUFDLElBQUlHLEtBQUs7SUFFakMsTUFBTUUsT0FBTyxHQUFHLE1BQU1DLG1CQUFVLENBQUNDLElBQUksRUFBRSxDQUNwQ0MsSUFBSSxDQUFDSixNQUFNLENBQUMsQ0FDWkQsS0FBSyxDQUFDQSxLQUFLLENBQUM7SUFDZixNQUFNTSxLQUFLLEdBQUcsTUFBTUgsbUJBQVUsQ0FBQ0csS0FBSyxFQUFFO0lBRXRDLE1BQU1DLFVBQVUsR0FBRyxJQUFBQyxvQkFBUSxFQUFDRixLQUFLLEVBQUVOLEtBQUssRUFBRUgsSUFBSSxDQUFDO0lBRS9DRCxHQUFHLENBQ0FhLE1BQU0sQ0FBQyxHQUFH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