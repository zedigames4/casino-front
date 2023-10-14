"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class GameValidate {
  static async create(req, res, next) {
    const schema = _joi.default.object().keys({
      title: _joi.default.string().required(),
      description: _joi.default.string().required()
    });
    const {
      error
    } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message.replace(/"/g, '')
      });
    }
    return next();
  }
}
exports.default = GameValidate;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJHYW1lVmFsaWRhdGUiLCJjcmVhdGUiLCJyZXEiLCJyZXMiLCJuZXh0Iiwic2NoZW1hIiwiam9pIiwib2JqZWN0Iiwia2V5cyIsInRpdGxlIiwic3RyaW5nIiwicmVxdWlyZWQiLCJkZXNjcmlwdGlvbiIsImVycm9yIiwidmFsaWRhdGUiLCJib2R5Iiwic3RhdHVzIiwianNvbiIsIm1lc3NhZ2UiLCJkZXRhaWxzIiwicmVwbGFjZSJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvdmFsaWRhdGlvbnMvZ2FtZXMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UsIE5leHRGdW5jdGlvbiB9IGZyb20gJ2V4cHJlc3MnO1xyXG5pbXBvcnQgam9pIGZyb20gJ2pvaSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lVmFsaWRhdGUge1xyXG4gIHN0YXRpYyBhc3luYyBjcmVhdGUoXHJcbiAgICByZXE6IFJlcXVlc3QsXHJcbiAgICByZXM6IFJlc3BvbnNlLFxyXG4gICAgbmV4dDogTmV4dEZ1bmN0aW9uLFxyXG4gICkge1xyXG4gICAgY29uc3Qgc2NoZW1hID0gam9pLm9iamVjdCgpLmtleXMoe1xyXG4gICAgICB0aXRsZTogam9pLnN0cmluZygpLnJlcXVpcmVkKCksXHJcbiAgICAgIGRlc2NyaXB0aW9uOiBqb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcclxuICAgIH0pO1xyXG4gICAgY29uc3QgeyBlcnJvciB9ID0gc2NoZW1hLnZhbGlkYXRlKHJlcS5ib2R5KTtcclxuICAgIGlmIChlcnJvcikge1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe1xyXG4gICAgICAgIG1lc3NhZ2U6IGVycm9yLmRldGFpbHNbMF0ubWVzc2FnZS5yZXBsYWNlKC9cIi9nLCAnJyksXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5leHQoKTtcclxuICB9XHJcbn1cclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQTtBQUFzQjtBQUVQLE1BQU1BLFlBQVksQ0FBQztFQUNoQyxhQUFhQyxNQUFNLENBQ2pCQyxHQUFZLEVBQ1pDLEdBQWEsRUFDYkMsSUFBa0IsRUFDbEI7SUFDQSxNQUFNQyxNQUFNLEdBQUdDLFlBQUcsQ0FBQ0MsTUFBTSxFQUFFLENBQUNDLElBQUksQ0FBQztNQUMvQkMsS0FBSyxFQUFFSCxZQUFHLENBQUNJLE1BQU0sRUFBRSxDQUFDQyxRQUFRLEVBQUU7TUFDOUJDLFdBQVcsRUFBRU4sWUFBRyxDQUFDSSxNQUFNLEVBQUUsQ0FBQ0MsUUFBUTtJQUNwQyxDQUFDLENBQUM7SUFDRixNQUFNO01BQUVFO0lBQU0sQ0FBQyxHQUFHUixNQUFNLENBQUNTLFFBQVEsQ0FBQ1osR0FBRyxDQUFDYSxJQUFJLENBQUM7SUFDM0MsSUFBSUYsS0FBSyxFQUFFO01BQ1QsT0FBT1YsR0FBRyxDQUFDYSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztRQUMxQkMsT0FBTyxFQUFFTCxLQUFLLENBQUNNLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQ0QsT0FBTyxDQUFDRSxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUU7TUFDcEQsQ0FBQyxDQUFDO0lBQ0o7SUFDQSxPQUFPaEIsSUFBSSxFQUFFO0VBQ2Y7QUFDRjtBQUFDIn0=