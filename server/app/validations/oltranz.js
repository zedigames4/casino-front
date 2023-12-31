"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class OltranzValidate {
  static async requestPay(req, res, next) {
    const schema = _joi.default.object().keys({
      amount: _joi.default.number().required(),
      telephoneNumber: _joi.default.string(),
      description: _joi.default.string().default('You are going to pay ordered products from Zeddi')
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
  static async transfer(req, res, next) {
    const schema = _joi.default.object().keys({
      amount: _joi.default.number().required(),
      receiverAccount: _joi.default.string(),
      type: _joi.default.string().valid('BANK', 'MOBILE').required(),
      bankName: _joi.default.string(),
      description: _joi.default.string().default('FUNDS TRANSFER'),
      firstName: _joi.default.string(),
      lastName: _joi.default.string(),
      receiver: _joi.default.string().required()
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
  static async transactionStatus(req, res, next) {
    const schema = _joi.default.object().keys({
      referenceId: _joi.default.string().uuid().required()
    });
    const {
      error
    } = schema.validate(req.params);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message.replace(/"/g, '')
      });
    }
    return next();
  }
  static async transferTransactionStatus(req, res, next) {
    const schema = _joi.default.object().keys({
      referenceId: _joi.default.string().uuid().required()
    });
    const {
      error
    } = schema.validate(req.params);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message.replace(/"/g, '')
      });
    }
    return next();
  }
}
exports.default = OltranzValidate;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJPbHRyYW56VmFsaWRhdGUiLCJyZXF1ZXN0UGF5IiwicmVxIiwicmVzIiwibmV4dCIsInNjaGVtYSIsImpvaSIsIm9iamVjdCIsImtleXMiLCJhbW91bnQiLCJudW1iZXIiLCJyZXF1aXJlZCIsInRlbGVwaG9uZU51bWJlciIsInN0cmluZyIsImRlc2NyaXB0aW9uIiwiZGVmYXVsdCIsImVycm9yIiwidmFsaWRhdGUiLCJib2R5Iiwic3RhdHVzIiwianNvbiIsIm1lc3NhZ2UiLCJkZXRhaWxzIiwicmVwbGFjZSIsInRyYW5zZmVyIiwicmVjZWl2ZXJBY2NvdW50IiwidHlwZSIsInZhbGlkIiwiYmFua05hbWUiLCJmaXJzdE5hbWUiLCJsYXN0TmFtZSIsInJlY2VpdmVyIiwidHJhbnNhY3Rpb25TdGF0dXMiLCJyZWZlcmVuY2VJZCIsInV1aWQiLCJwYXJhbXMiLCJ0cmFuc2ZlclRyYW5zYWN0aW9uU3RhdHVzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC92YWxpZGF0aW9ucy9vbHRyYW56LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3QsIFJlc3BvbnNlLCBOZXh0RnVuY3Rpb24gfSBmcm9tICdleHByZXNzJztcclxuaW1wb3J0IGpvaSBmcm9tICdqb2knO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2x0cmFuelZhbGlkYXRlIHtcclxuICBzdGF0aWMgYXN5bmMgcmVxdWVzdFBheShcclxuICAgIHJlcTogUmVxdWVzdCxcclxuICAgIHJlczogUmVzcG9uc2UsXHJcbiAgICBuZXh0OiBOZXh0RnVuY3Rpb24sXHJcbiAgKSB7XHJcbiAgICBjb25zdCBzY2hlbWEgPSBqb2kub2JqZWN0KCkua2V5cyh7XHJcbiAgICAgIGFtb3VudDogam9pLm51bWJlcigpLnJlcXVpcmVkKCksXHJcbiAgICAgIHRlbGVwaG9uZU51bWJlcjogam9pLnN0cmluZygpLFxyXG4gICAgICBkZXNjcmlwdGlvbjogam9pXHJcbiAgICAgICAgLnN0cmluZygpXHJcbiAgICAgICAgLmRlZmF1bHQoJ1lvdSBhcmUgZ29pbmcgdG8gcGF5IG9yZGVyZWQgcHJvZHVjdHMgZnJvbSBaZWRkaScpLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCB7IGVycm9yIH0gPSBzY2hlbWEudmFsaWRhdGUocmVxLmJvZHkpO1xyXG4gICAgaWYgKGVycm9yKSB7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7XHJcbiAgICAgICAgbWVzc2FnZTogZXJyb3IuZGV0YWlsc1swXS5tZXNzYWdlLnJlcGxhY2UoL1wiL2csICcnKSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV4dCgpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGFzeW5jIHRyYW5zZmVyKFxyXG4gICAgcmVxOiBSZXF1ZXN0LFxyXG4gICAgcmVzOiBSZXNwb25zZSxcclxuICAgIG5leHQ6IE5leHRGdW5jdGlvbixcclxuICApIHtcclxuICAgIGNvbnN0IHNjaGVtYSA9IGpvaS5vYmplY3QoKS5rZXlzKHtcclxuICAgICAgYW1vdW50OiBqb2kubnVtYmVyKCkucmVxdWlyZWQoKSxcclxuICAgICAgcmVjZWl2ZXJBY2NvdW50OiBqb2kuc3RyaW5nKCksXHJcbiAgICAgIHR5cGU6IGpvaS5zdHJpbmcoKS52YWxpZCgnQkFOSycsICdNT0JJTEUnKS5yZXF1aXJlZCgpLFxyXG4gICAgICBiYW5rTmFtZTogam9pLnN0cmluZygpLFxyXG4gICAgICBkZXNjcmlwdGlvbjogam9pLnN0cmluZygpLmRlZmF1bHQoJ0ZVTkRTIFRSQU5TRkVSJyksXHJcbiAgICAgIGZpcnN0TmFtZTogam9pLnN0cmluZygpLFxyXG4gICAgICBsYXN0TmFtZTogam9pLnN0cmluZygpLFxyXG4gICAgICByZWNlaXZlcjogam9pLnN0cmluZygpLnJlcXVpcmVkKCksXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IHsgZXJyb3IgfSA9IHNjaGVtYS52YWxpZGF0ZShyZXEuYm9keSk7XHJcbiAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtcclxuICAgICAgICBtZXNzYWdlOiBlcnJvci5kZXRhaWxzWzBdLm1lc3NhZ2UucmVwbGFjZSgvXCIvZywgJycpLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXh0KCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgYXN5bmMgdHJhbnNhY3Rpb25TdGF0dXMoXHJcbiAgICByZXE6IFJlcXVlc3QsXHJcbiAgICByZXM6IFJlc3BvbnNlLFxyXG4gICAgbmV4dDogTmV4dEZ1bmN0aW9uLFxyXG4gICkge1xyXG4gICAgY29uc3Qgc2NoZW1hID0gam9pLm9iamVjdCgpLmtleXMoe1xyXG4gICAgICByZWZlcmVuY2VJZDogam9pLnN0cmluZygpLnV1aWQoKS5yZXF1aXJlZCgpLFxyXG4gICAgfSk7XHJcbiAgICBjb25zdCB7IGVycm9yIH0gPSBzY2hlbWEudmFsaWRhdGUocmVxLnBhcmFtcyk7XHJcbiAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtcclxuICAgICAgICBtZXNzYWdlOiBlcnJvci5kZXRhaWxzWzBdLm1lc3NhZ2UucmVwbGFjZSgvXCIvZywgJycpLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXh0KCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgYXN5bmMgdHJhbnNmZXJUcmFuc2FjdGlvblN0YXR1cyhcclxuICAgIHJlcTogUmVxdWVzdCxcclxuICAgIHJlczogUmVzcG9uc2UsXHJcbiAgICBuZXh0OiBOZXh0RnVuY3Rpb24sXHJcbiAgKSB7XHJcbiAgICBjb25zdCBzY2hlbWEgPSBqb2kub2JqZWN0KCkua2V5cyh7XHJcbiAgICAgIHJlZmVyZW5jZUlkOiBqb2kuc3RyaW5nKCkudXVpZCgpLnJlcXVpcmVkKCksXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IHsgZXJyb3IgfSA9IHNjaGVtYS52YWxpZGF0ZShyZXEucGFyYW1zKTtcclxuICAgIGlmIChlcnJvcikge1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe1xyXG4gICAgICAgIG1lc3NhZ2U6IGVycm9yLmRldGFpbHNbMF0ubWVzc2FnZS5yZXBsYWNlKC9cIi9nLCAnJyksXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5leHQoKTtcclxuICB9XHJcbn1cclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQTtBQUFzQjtBQUVQLE1BQU1BLGVBQWUsQ0FBQztFQUNuQyxhQUFhQyxVQUFVLENBQ3JCQyxHQUFZLEVBQ1pDLEdBQWEsRUFDYkMsSUFBa0IsRUFDbEI7SUFDQSxNQUFNQyxNQUFNLEdBQUdDLFlBQUcsQ0FBQ0MsTUFBTSxFQUFFLENBQUNDLElBQUksQ0FBQztNQUMvQkMsTUFBTSxFQUFFSCxZQUFHLENBQUNJLE1BQU0sRUFBRSxDQUFDQyxRQUFRLEVBQUU7TUFDL0JDLGVBQWUsRUFBRU4sWUFBRyxDQUFDTyxNQUFNLEVBQUU7TUFDN0JDLFdBQVcsRUFBRVIsWUFBRyxDQUNiTyxNQUFNLEVBQUUsQ0FDUkUsT0FBTyxDQUFDLGtEQUFrRDtJQUMvRCxDQUFDLENBQUM7SUFDRixNQUFNO01BQUVDO0lBQU0sQ0FBQyxHQUFHWCxNQUFNLENBQUNZLFFBQVEsQ0FBQ2YsR0FBRyxDQUFDZ0IsSUFBSSxDQUFDO0lBQzNDLElBQUlGLEtBQUssRUFBRTtNQUNULE9BQU9iLEdBQUcsQ0FBQ2dCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO1FBQzFCQyxPQUFPLEVBQUVMLEtBQUssQ0FBQ00sT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDRCxPQUFPLENBQUNFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRTtNQUNwRCxDQUFDLENBQUM7SUFDSjtJQUNBLE9BQU9uQixJQUFJLEVBQUU7RUFDZjtFQUVBLGFBQWFvQixRQUFRLENBQ25CdEIsR0FBWSxFQUNaQyxHQUFhLEVBQ2JDLElBQWtCLEVBQ2xCO0lBQ0EsTUFBTUMsTUFB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