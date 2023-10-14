"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class TransferValidate {
  static async create(req, res, next) {
    const schema = _joi.default.object().keys({
      receiver: _joi.default.string().required(),
      amount: _joi.default.number().required()
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
  static async getAll(req, res, next) {
    const schema = _joi.default.object().keys({
      user: _joi.default.string(),
      receiver: _joi.default.string(),
      status: _joi.default.string().valid('SUCCESSFUL', 'PENDING', 'FAILED'),
      mode: _joi.default.string(),
      action: _joi.default.string().allow('deposit', 'transfer', 'withdraw')
    });
    const {
      error
    } = schema.validate(req.query);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message.replace(/"/g, '')
      });
    }
    return next();
  }
}
exports.default = TransferValidate;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJUcmFuc2ZlclZhbGlkYXRlIiwiY3JlYXRlIiwicmVxIiwicmVzIiwibmV4dCIsInNjaGVtYSIsImpvaSIsIm9iamVjdCIsImtleXMiLCJyZWNlaXZlciIsInN0cmluZyIsInJlcXVpcmVkIiwiYW1vdW50IiwibnVtYmVyIiwiZXJyb3IiLCJ2YWxpZGF0ZSIsImJvZHkiLCJzdGF0dXMiLCJqc29uIiwibWVzc2FnZSIsImRldGFpbHMiLCJyZXBsYWNlIiwiZ2V0QWxsIiwidXNlciIsInZhbGlkIiwibW9kZSIsImFjdGlvbiIsImFsbG93IiwicXVlcnkiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL3ZhbGlkYXRpb25zL3RyYW5zZmVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlLCBOZXh0RnVuY3Rpb24gfSBmcm9tICdleHByZXNzJztcclxuaW1wb3J0IGpvaSBmcm9tICdqb2knO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJhbnNmZXJWYWxpZGF0ZSB7XHJcbiAgc3RhdGljIGFzeW5jIGNyZWF0ZShcclxuICAgIHJlcTogUmVxdWVzdCxcclxuICAgIHJlczogUmVzcG9uc2UsXHJcbiAgICBuZXh0OiBOZXh0RnVuY3Rpb24sXHJcbiAgKSB7XHJcbiAgICBjb25zdCBzY2hlbWEgPSBqb2kub2JqZWN0KCkua2V5cyh7XHJcbiAgICAgIHJlY2VpdmVyOiBqb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcclxuICAgICAgYW1vdW50OiBqb2kubnVtYmVyKCkucmVxdWlyZWQoKSxcclxuICAgIH0pO1xyXG4gICAgY29uc3QgeyBlcnJvciB9ID0gc2NoZW1hLnZhbGlkYXRlKHJlcS5ib2R5KTtcclxuICAgIGlmIChlcnJvcikge1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe1xyXG4gICAgICAgIG1lc3NhZ2U6IGVycm9yLmRldGFpbHNbMF0ubWVzc2FnZS5yZXBsYWNlKC9cIi9nLCAnJyksXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5leHQoKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBhc3luYyBnZXRBbGwoXHJcbiAgICByZXE6IFJlcXVlc3QsXHJcbiAgICByZXM6IFJlc3BvbnNlLFxyXG4gICAgbmV4dDogTmV4dEZ1bmN0aW9uLFxyXG4gICkge1xyXG4gICAgY29uc3Qgc2NoZW1hID0gam9pLm9iamVjdCgpLmtleXMoe1xyXG4gICAgICB1c2VyOiBqb2kuc3RyaW5nKCksXHJcbiAgICAgIHJlY2VpdmVyOiBqb2kuc3RyaW5nKCksXHJcbiAgICAgIHN0YXR1czogam9pLnN0cmluZygpLnZhbGlkKCdTVUNDRVNTRlVMJywgJ1BFTkRJTkcnLCAnRkFJTEVEJyksXHJcbiAgICAgIG1vZGU6IGpvaS5zdHJpbmcoKSxcclxuICAgICAgYWN0aW9uOiBqb2kuc3RyaW5nKCkuYWxsb3coJ2RlcG9zaXQnLCAndHJhbnNmZXInLCAnd2l0aGRyYXcnKSxcclxuICAgIH0pO1xyXG4gICAgY29uc3QgeyBlcnJvciB9ID0gc2NoZW1hLnZhbGlkYXRlKHJlcS5xdWVyeSk7XHJcbiAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtcclxuICAgICAgICBtZXNzYWdlOiBlcnJvci5kZXRhaWxzWzBdLm1lc3NhZ2UucmVwbGFjZSgvXCIvZywgJycpLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXh0KCk7XHJcbiAgfVxyXG59XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0E7QUFBc0I7QUFFUCxNQUFNQSxnQkFBZ0IsQ0FBQztFQUNwQyxhQUFhQyxNQUFNLENBQ2pCQyxHQUFZLEVBQ1pDLEdBQWEsRUFDYkMsSUFBa0IsRUFDbEI7SUFDQSxNQUFNQyxNQUFNLEdBQUdDLFlBQUcsQ0FBQ0MsTUFBTSxFQUFFLENBQUNDLElBQUksQ0FBQztNQUMvQkMsUUFBUSxFQUFFSCxZQUFHLENBQUNJLE1BQU0sRUFBRSxDQUFDQyxRQUFRLEVBQUU7TUFDakNDLE1BQU0sRUFBRU4sWUFBRyxDQUFDTyxNQUFNLEVBQUUsQ0FBQ0YsUUFBUTtJQUMvQixDQUFDLENBQUM7SUFDRixNQUFNO01BQUVHO0lBQU0sQ0FBQyxHQUFHVCxNQUFNLENBQUNVLFFBQVEsQ0FBQ2IsR0FBRyxDQUFDYyxJQUFJLENBQUM7SUFDM0MsSUFBSUYsS0FBSyxFQUFFO01BQ1QsT0FBT1gsR0FBRyxDQUFDYyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztRQUMxQkMsT0FBTyxFQUFFTCxLQUFLLENBQUNNLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQ0QsT0FBTyxDQUFDRSxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUU7TUFDcEQsQ0FBQyxDQUFDO0lBQ0o7SUFDQSxPQUFPakIsSUFBSSxFQUFFO0VBQ2Y7RUFFQSxhQUFha0IsTUFBTSxDQUNqQnBCLEdBQVksRUFDWkMsR0FBYSxFQUNiQyxJQUFrQixFQUNsQjtJQUNBLE1BQU1DLE1BQU0sR0FBR0MsWUFBRyxDQUFDQyxNQUFNLEVBQUUsQ0FBQ0MsSUFBSSxDQUFDO01BQy9CZSxJQUFJLEVBQUVqQixZQUFHLENBQUNJLE1BQU0sRUFBRTtNQUNsQkQsUUFBUSxFQUFFSCxZQUFHLENBQUNJLE1BQU0sRUFBRTtNQUN0Qk8sTUFBTSxFQUFFWCxZQUFHLENBQUNJLE1BQU0sRUFBRSxDQUFDYyxLQUFLLENBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUM7TUFDN0RDLElBQUksRUFBRW5CLFlBQUcsQ0FBQ0ksTUFBTSxFQUFFO01BQ2xCZ0IsTUFBTSxFQUFFcEIsWUFBRyxDQUFDSSxNQUFNLEVBQUUsQ0FBQ2lCLEtBQUssQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVU7SUFDOUQsQ0FBQyxDQUFDO0lBQ0YsTUFBTTtNQUFFYjtJQUFNLENBQUMsR0FBR1QsTUFBTSxDQUFDVSxRQUFRLENBQUNiLEdBQUcsQ0FBQzBCLEtBQUssQ0FBQztJQUM1QyxJQUFJZCxLQUFLLEVBQUU7TUFDVCxPQUFPWCxHQUFHLENBQUNjLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO1FBQzFCQyxPQUFPLEVBQUVMLEtBQUssQ0FBQ00sT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDRCxPQUFPLENBQUNFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRTtNQUNwRCxDQUFDLENBQUM7SUFDSjtJQUNBLE9BQU9qQixJQUFJLEVBQUU7RUFDZjtBQUNGO0FBQUMifQ==