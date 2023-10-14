"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _joi = _interopRequireDefault(require("joi"));
var _constants = require("../utils/constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class BetsValidate {
  static async create(req, res, next) {
    const schema = _joi.default.object().keys({
      game: _joi.default.string().required().label('gameId'),
      iWin: _joi.default.number().positive().required().allow(0),
      iToBet: _joi.default.number().positive().required().allow(0),
      playerData: _joi.default.object(),
      status: _joi.default.string().valid(..._constants.BET_STATUS).required(),
      currency: _joi.default.string().valid('RWF', 'COIN').required(),
      startTime: _joi.default.date(),
      endingTime: _joi.default.date()
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
  static async update(req, res, next) {
    const schema = _joi.default.object().keys({
      game: _joi.default.string().label('gameId'),
      iWin: _joi.default.number().positive().allow(0),
      iToBet: _joi.default.number().positive().allow(0),
      playerData: _joi.default.object(),
      status: _joi.default.string().valid(..._constants.BET_STATUS),
      currency: _joi.default.string().valid('RWF', 'COIN').required(),
      startTime: _joi.default.date(),
      endingTime: _joi.default.date()
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
  static async loose(req, res, next) {
    const schema = _joi.default.object().keys({
      playerData: _joi.default.object().required(),
      expenses: _joi.default.number().required(),
      income: _joi.default.number().required()
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
  static async win(req, res, next) {
    const schema = _joi.default.object().keys({
      playerData: _joi.default.object().required(),
      expenses: _joi.default.number().required(),
      income: _joi.default.number().required()
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
exports.default = BetsValidate;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJCZXRzVmFsaWRhdGUiLCJjcmVhdGUiLCJyZXEiLCJyZXMiLCJuZXh0Iiwic2NoZW1hIiwiam9pIiwib2JqZWN0Iiwia2V5cyIsImdhbWUiLCJzdHJpbmciLCJyZXF1aXJlZCIsImxhYmVsIiwiaVdpbiIsIm51bWJlciIsInBvc2l0aXZlIiwiYWxsb3ciLCJpVG9CZXQiLCJwbGF5ZXJEYXRhIiwic3RhdHVzIiwidmFsaWQiLCJCRVRfU1RBVFVTIiwiY3VycmVuY3kiLCJzdGFydFRpbWUiLCJkYXRlIiwiZW5kaW5nVGltZSIsImVycm9yIiwidmFsaWRhdGUiLCJib2R5IiwianNvbiIsIm1lc3NhZ2UiLCJkZXRhaWxzIiwicmVwbGFjZSIsInVwZGF0ZSIsImxvb3NlIiwiZXhwZW5zZXMiLCJpbmNvbWUiLCJ3aW4iXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL3ZhbGlkYXRpb25zL2JldHMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UsIE5leHRGdW5jdGlvbiB9IGZyb20gJ2V4cHJlc3MnO1xyXG5pbXBvcnQgam9pIGZyb20gJ2pvaSc7XHJcbmltcG9ydCB7IEJFVF9TVEFUVVMgfSBmcm9tICcuLi91dGlscy9jb25zdGFudHMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmV0c1ZhbGlkYXRlIHtcclxuICBzdGF0aWMgYXN5bmMgY3JlYXRlKFxyXG4gICAgcmVxOiBSZXF1ZXN0LFxyXG4gICAgcmVzOiBSZXNwb25zZSxcclxuICAgIG5leHQ6IE5leHRGdW5jdGlvbixcclxuICApIHtcclxuICAgIGNvbnN0IHNjaGVtYSA9IGpvaS5vYmplY3QoKS5rZXlzKHtcclxuICAgICAgZ2FtZTogam9pLnN0cmluZygpLnJlcXVpcmVkKCkubGFiZWwoJ2dhbWVJZCcpLFxyXG4gICAgICBpV2luOiBqb2kubnVtYmVyKCkucG9zaXRpdmUoKS5yZXF1aXJlZCgpLmFsbG93KDApLFxyXG4gICAgICBpVG9CZXQ6IGpvaS5udW1iZXIoKS5wb3NpdGl2ZSgpLnJlcXVpcmVkKCkuYWxsb3coMCksXHJcbiAgICAgIHBsYXllckRhdGE6IGpvaS5vYmplY3QoKSxcclxuICAgICAgc3RhdHVzOiBqb2lcclxuICAgICAgICAuc3RyaW5nKClcclxuICAgICAgICAudmFsaWQoLi4uQkVUX1NUQVRVUylcclxuICAgICAgICAucmVxdWlyZWQoKSxcclxuICAgICAgY3VycmVuY3k6IGpvaS5zdHJpbmcoKS52YWxpZCgnUldGJywgJ0NPSU4nKS5yZXF1aXJlZCgpLFxyXG4gICAgICBzdGFydFRpbWU6IGpvaS5kYXRlKCksXHJcbiAgICAgIGVuZGluZ1RpbWU6IGpvaS5kYXRlKCksXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IHsgZXJyb3IgfSA9IHNjaGVtYS52YWxpZGF0ZShyZXEuYm9keSk7XHJcbiAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtcclxuICAgICAgICBtZXNzYWdlOiBlcnJvci5kZXRhaWxzWzBdLm1lc3NhZ2UucmVwbGFjZSgvXCIvZywgJycpLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXh0KCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgYXN5bmMgdXBkYXRlKFxyXG4gICAgcmVxOiBSZXF1ZXN0LFxyXG4gICAgcmVzOiBSZXNwb25zZSxcclxuICAgIG5leHQ6IE5leHRGdW5jdGlvbixcclxuICApIHtcclxuICAgIGNvbnN0IHNjaGVtYSA9IGpvaS5vYmplY3QoKS5rZXlzKHtcclxuICAgICAgZ2FtZTogam9pLnN0cmluZygpLmxhYmVsKCdnYW1lSWQnKSxcclxuICAgICAgaVdpbjogam9pLm51bWJlcigpLnBvc2l0aXZlKCkuYWxsb3coMCksXHJcbiAgICAgIGlUb0JldDogam9pLm51bWJlcigpLnBvc2l0aXZlKCkuYWxsb3coMCksXHJcbiAgICAgIHBsYXllckRhdGE6IGpvaS5vYmplY3QoKSxcclxuICAgICAgc3RhdHVzOiBqb2kuc3RyaW5nKCkudmFsaWQoLi4uQkVUX1NUQVRVUyksXHJcbiAgICAgIGN1cnJlbmN5OiBqb2kuc3RyaW5nKCkudmFsaWQoJ1JXRicsICdDT0lOJykucmVxdWlyZWQoKSxcclxuICAgICAgc3RhcnRUaW1lOiBqb2kuZGF0ZSgpLFxyXG4gICAgICBlbmRpbmdUaW1lOiBqb2kuZGF0ZSgpLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCB7IGVycm9yIH0gPSBzY2hlbWEudmFsaWRhdGUocmVxLmJvZHkpO1xyXG4gICAgaWYgKGVycm9yKSB7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7XHJcbiAgICAgICAgbWVzc2FnZTogZXJyb3IuZGV0YWlsc1swXS5tZXNzYWdlLnJlcGxhY2UoL1wiL2csICcnKSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV4dCgpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGFzeW5jIGxvb3NlKFxyXG4gICAgcmVxOiBSZXF1ZXN0LFxyXG4gICAgcmVzOiBSZXNwb25zZSxcclxuICAgIG5leHQ6IE5leHRGdW5jdGlvbixcclxuICApIHtcclxuICAgIGNvbnN0IHNjaGVtYSA9IGpvaS5vYmplY3QoKS5rZXlzKHtcclxuICAgICAgcGxheWVyRGF0YTogam9pLm9iamVjdCgpLnJlcXVpcmVkKCksXHJcbiAgICAgIGV4cGVuc2VzOiBqb2kubnVtYmVyKCkucmVxdWlyZWQoKSxcclxuICAgICAgaW5jb21lOiBqb2kubnVtYmVyKCkucmVxdWlyZWQoKSxcclxuICAgIH0pO1xyXG4gICAgY29uc3QgeyBlcnJvciB9ID0gc2NoZW1hLnZhbGlkYXRlKHJlcS5ib2R5KTtcclxuICAgIGlmIChlcnJvcikge1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe1xyXG4gICAgICAgIG1lc3NhZ2U6IGVycm9yLmRldGFpbHNbMF0ubWVzc2FnZS5yZXBsYWNlKC9cIi9nLCAnJyksXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5leHQoKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBhc3luYyB3aW4ocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pIHtcclxuICAgIGNvbnN0IHNjaGVtYSA9IGpvaS5vYmplY3QoKS5rZXlzKHtcclxuICAgICAgcGxheWVyRGF0YTogam9pLm9iamVjdCgpLnJlcXVpcmVkKCksXHJcbiAgICAgIGV4cGVuc2VzOiBqb2kubnVtYmVyKCkucmVxdWlyZWQoKSxcclxuICAgICAgaW5jb21lOiBqb2kubnVtYmVyKCkucmVxdWlyZWQoKSxcclxuICAgIH0pO1xyXG4gICAgY29uc3QgeyBlcnJvciB9ID0gc2NoZW1hLnZhbGlkYXRlKHJlcS5ib2R5KTtcclxuICAgIGlmIChlcnJvcikge1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe1xyXG4gICAgICAgIG1lc3NhZ2U6IGVycm9yLmRldGFpbHNbMF0ubWVzc2FnZS5yZXBsYWNlKC9cIi9nLCAnJyksXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5leHQoKTtcclxuICB9XHJcbn1cclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQTtBQUNBO0FBQWdEO0FBRWpDLE1BQU1BLFlBQVksQ0FBQztFQUNoQyxhQUFhQyxNQUFNLENBQ2pCQyxHQUFZLEVBQ1pDLEdBQWEsRUFDYkMsSUFBa0IsRUFDbEI7SUFDQSxNQUFNQyxNQUFNLEdBQUdDLFlBQUcsQ0FBQ0MsTUFBTSxFQUFFLENBQUNDLElBQUksQ0FBQztNQUMvQkMsSUFBSSxFQUFFSCxZQUFHLENBQUNJLE1BQU0sRUFBRSxDQUFDQyxRQUFRLEVBQUUsQ0FBQ0MsS0FBSyxDQUFDLFFBQVEsQ0FBQztNQUM3Q0MsSUFBSSxFQUFFUCxZQUFHLENBQUNRLE1BQU0sRUFBRSxDQUFDQyxRQUFRLEVBQUUsQ0FBQ0osUUFBUSxFQUFFLENBQUNLLEtBQUssQ0FBQyxDQUFDLENBQUM7TUFDakRDLE1BQU0sRUFBRVgsWUFBRyxDQUFDUSxNQUFN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