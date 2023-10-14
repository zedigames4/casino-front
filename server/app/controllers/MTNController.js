"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _uuid = require("uuid");
var _HttpException = require("../exceptions/HttpException");
var _Transaction = _interopRequireDefault(require("../models/Transaction"));
var _Wallet = _interopRequireDefault(require("../models/Wallet"));
var _http = _interopRequireDefault(require("../utils/http"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class MTNController {}
exports.default = MTNController;
_defineProperty(MTNController, "requestPay", async (req, res) => {
  try {
    const {
      amount,
      currency,
      partyId,
      payerMessage,
      payeeNote
    } = req.body;
    const payload = {
      amount,
      currency,
      externalId: req.user._id,
      payerMessage,
      payeeNote,
      payer: {
        partyIdType: 'MSISDN',
        partyId
      }
    };
    const referenceId = (0, _uuid.v4)();
    // console.log(referenceId);

    const {
      data,
      status
    } = await _http.default.requestPayment(referenceId, payload);
    if (!status) {
      throw new _HttpException.HttpException(500, 'Payment failed');
    }
    await _Transaction.default.create({
      user: req.user._id,
      referenceId,
      mode: 'mtnrwanda',
      status: 'PENDING',
      action: 'deposit',
      amount: payload.amount,
      currency: payload.currency
    });
    res.status(status).json({
      data,
      referenceId,
      message: 'requesting payment'
    });
  } catch (error) {
    // console.log(error);
    res.status(error?.status || 500).json({
      message: error?.message || 'something went wrong'
    });
  }
});
_defineProperty(MTNController, "transactionStatus", async (req, res) => {
  try {
    const {
      referenceId
    } = req.params;
    const {
      data,
      status
    } = await _http.default.transactionStatus(referenceId);
    if (!status) {
      throw new _HttpException.HttpException(500, 'Payment failed');
    }
    const order = await _Transaction.default.findOne({
      referenceId,
      user: req.user._id
    });
    const wallet = await _Wallet.default.findOne({
      user: req.user._id
    });
    if (!order) {
      throw new _HttpException.HttpException(500, 'Transaction is not found');
    }
    if (data?.status === 'SUCCESSFUL' && order.status === 'PENDING') {
      order.set({
        status: data?.status || 'SUCCESSFUL'
      });
      await order.save();
      if (Number(data.amount)) {
        wallet.set({
          balance: wallet.balance + Number(data.amount)
        });
      }
    } else if (data?.status === 'FAILED') {
      order.set({
        status: 'FAILED'
      });
      await order.save();
    }
    res.status(status).json({
      data,
      referenceId,
      message: 'transaction status'
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      message: error?.message || 'something went wrong'
    });
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJNVE5Db250cm9sbGVyIiwicmVxIiwicmVzIiwiYW1vdW50IiwiY3VycmVuY3kiLCJwYXJ0eUlkIiwicGF5ZXJNZXNzYWdlIiwicGF5ZWVOb3RlIiwiYm9keSIsInBheWxvYWQiLCJleHRlcm5hbElkIiwidXNlciIsIl9pZCIsInBheWVyIiwicGFydHlJZFR5cGUiLCJyZWZlcmVuY2VJZCIsInV1aWR2NCIsImRhdGEiLCJzdGF0dXMiLCJIdHRwIiwicmVxdWVzdFBheW1lbnQiLCJIdHRwRXhjZXB0aW9uIiwiVHJhbnNhY3Rpb24iLCJjcmVhdGUiLCJtb2RlIiwiYWN0aW9uIiwianNvbiIsIm1lc3NhZ2UiLCJlcnJvciIsInBhcmFtcyIsInRyYW5zYWN0aW9uU3RhdHVzIiwib3JkZXIiLCJmaW5kT25lIiwid2FsbGV0IiwiV2FsbGV0Iiwic2V0Iiwic2F2ZSIsIk51bWJlciIsImJhbGFuY2UiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbnRyb2xsZXJzL01UTkNvbnRyb2xsZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVzcG9uc2UsIFJlcXVlc3QgfSBmcm9tICdleHByZXNzJztcclxuaW1wb3J0IHsgdjQgYXMgdXVpZHY0IH0gZnJvbSAndXVpZCc7XHJcbmltcG9ydCB7IEh0dHBFeGNlcHRpb24gfSBmcm9tICcuLi9leGNlcHRpb25zL0h0dHBFeGNlcHRpb24nO1xyXG5pbXBvcnQgeyBJTVROUmVxdWVzdEJvZHkgfSBmcm9tICcuLi9leGNlcHRpb25zL210bic7XHJcbmltcG9ydCB7IFJlcXVlc3RXaXRoVXNlciB9IGZyb20gJy4uL2ludGVyZmFjZXMvYXV0aC5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgVHJhbnNhY3Rpb24gZnJvbSAnLi4vbW9kZWxzL1RyYW5zYWN0aW9uJztcclxuaW1wb3J0IFdhbGxldCBmcm9tICcuLi9tb2RlbHMvV2FsbGV0JztcclxuaW1wb3J0IEh0dHAgZnJvbSAnLi4vdXRpbHMvaHR0cCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNVE5Db250cm9sbGVyIHtcclxuICBzdGF0aWMgcmVxdWVzdFBheSA9IGFzeW5jIChyZXE6IFJlcXVlc3RXaXRoVXNlciwgcmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBhbW91bnQsIGN1cnJlbmN5LCBwYXJ0eUlkLCBwYXllck1lc3NhZ2UsIHBheWVlTm90ZSB9ID1cclxuICAgICAgICByZXEuYm9keTtcclxuICAgICAgY29uc3QgcGF5bG9hZDogSU1UTlJlcXVlc3RCb2R5ID0ge1xyXG4gICAgICAgIGFtb3VudCxcclxuICAgICAgICBjdXJyZW5jeSxcclxuICAgICAgICBleHRlcm5hbElkOiByZXEudXNlci5faWQsXHJcbiAgICAgICAgcGF5ZXJNZXNzYWdlLFxyXG4gICAgICAgIHBheWVlTm90ZSxcclxuICAgICAgICBwYXllcjoge1xyXG4gICAgICAgICAgcGFydHlJZFR5cGU6ICdNU0lTRE4nLFxyXG4gICAgICAgICAgcGFydHlJZCxcclxuICAgICAgICB9LFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgY29uc3QgcmVmZXJlbmNlSWQgPSB1dWlkdjQoKTtcclxuICAgICAgLy8gY29uc29sZS5sb2cocmVmZXJlbmNlSWQpO1xyXG5cclxuICAgICAgY29uc3QgeyBkYXRhLCBzdGF0dXMgfSA9IGF3YWl0IEh0dHAucmVxdWVzdFBheW1lbnQoXHJcbiAgICAgICAgcmVmZXJlbmNlSWQsXHJcbiAgICAgICAgcGF5bG9hZCxcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGlmICghc3RhdHVzKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oNTAwLCAnUGF5bWVudCBmYWlsZWQnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgYXdhaXQgVHJhbnNhY3Rpb24uY3JlYXRlKHtcclxuICAgICAgICB1c2VyOiByZXEudXNlci5faWQsXHJcbiAgICAgICAgcmVmZXJlbmNlSWQsXHJcbiAgICAgICAgbW9kZTogJ210bnJ3YW5kYScsXHJcbiAgICAgICAgc3RhdHVzOiAnUEVORElORycsXHJcbiAgICAgICAgYWN0aW9uOiAnZGVwb3NpdCcsXHJcbiAgICAgICAgYW1vdW50OiBwYXlsb2FkLmFtb3VudCxcclxuICAgICAgICBjdXJyZW5jeTogcGF5bG9hZC5jdXJyZW5jeSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXNcclxuICAgICAgICAuc3RhdHVzKHN0YXR1cylcclxuICAgICAgICAuanNvbih7IGRhdGEsIHJlZmVyZW5jZUlkLCBtZXNzYWdlOiAncmVxdWVzdGluZyBwYXltZW50JyB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgICAgLy8gY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICByZXMuc3RhdHVzKGVycm9yPy5zdGF0dXMgfHwgNTAwKS5qc29uKHtcclxuICAgICAgICBtZXNzYWdlOiBlcnJvcj8ubWVzc2FnZSB8fCAnc29tZXRoaW5nIHdlbnQgd3JvbmcnLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBzdGF0aWMgdHJhbnNhY3Rpb25TdGF0dXMgPSBhc3luYyAoXHJcbiAgICByZXE6IFJlcXVlc3RXaXRoVXNlcixcclxuICAgIHJlczogUmVzcG9uc2UsXHJcbiAgKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB7IHJlZmVyZW5jZUlkIH0gPSByZXEucGFyYW1zO1xyXG5cclxuICAgICAgY29uc3QgeyBkYXRhLCBzdGF0dXMgfSA9IGF3YWl0IEh0dHAudHJhbnNhY3Rpb25TdGF0dXMoXHJcbiAgICAgICAgcmVmZXJlbmNlSWQgYXMgc3RyaW5nLFxyXG4gICAgICApO1xyXG5cclxuICAgICAgaWYgKCFzdGF0dXMpIHtcclxuICAgICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbig1MDAsICdQYXltZW50IGZhaWxlZCcpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBvcmRlciA9IGF3YWl0IFRyYW5zYWN0aW9uLmZpbmRPbmUoe1xyXG4gICAgICAgIHJlZmVyZW5jZUlkLFxyXG4gICAgICAgIHVzZXI6IHJlcS51c2VyLl9pZCxcclxuICAgICAgfSk7XHJcbiAgICAgIGNvbnN0IHdhbGxldCA9IGF3YWl0IFdhbGxldC5maW5kT25lKHsgdXNlcjogcmVxLnVzZXIuX2lkIH0pO1xyXG5cclxuICAgICAgaWYgKCFvcmRlcikge1xyXG4gICAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKDUwMCwgJ1RyYW5zYWN0aW9uIGlzIG5vdCBmb3VuZCcpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgZGF0YT8uc3RhdHVzID09PSAnU1VDQ0VTU0ZVTCcgJiZcclxuICAgICAgICBvcmRlci5zdGF0dXMgPT09ICdQRU5ESU5HJ1xyXG4gICAgICApIHtcclxuICAgICAgICBvcmRlci5zZXQoeyBzdGF0dXM6IGRhdGE/LnN0YXR1cyB8fCAnU1VDQ0VTU0ZVTCcgfSk7XHJcbiAgICAgICAgYXdhaXQgb3JkZXIuc2F2ZSgpO1xyXG5cclxuICAgICAgICBpZiAoTnVtYmVyKGRhdGEuYW1vdW50KSkge1xyXG4gICAgICAgICAgd2FsbGV0LnNldCh7XHJcbiAgICAgICAgICAgIGJhbGFuY2U6IHdhbGxldC5iYWxhbmNlICsgTnVtYmVyKGRhdGEuYW1vdW50KSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmIChkYXRhPy5zdGF0dXMgPT09ICdGQUlMRUQnKSB7XHJcbiAgICAgICAgb3JkZXIuc2V0KHsgc3RhdHVzOiAnRkFJTEVEJyB9KTtcclxuICAgICAgICBhd2FpdCBvcmRlci5zYXZlKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJlcy5zdGF0dXMoc3RhdHVzKS5qc29uKHtcclxuICAgICAgICBkYXRhLFxyXG4gICAgICAgIHJlZmVyZW5jZUlkLFxyXG4gICAgICAgIG1lc3NhZ2U6ICd0cmFuc2FjdGlvbiBzdGF0dXMnLFxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgICAgcmVzLnN0YXR1cyhlcnJvcj8uc3RhdHVzIHx8IDUwMCkuanNvbih7XHJcbiAgICAgICAgbWVzc2FnZTogZXJyb3I/Lm1lc3NhZ2UgfHwgJ3NvbWV0aGluZyB3ZW50IHdyb25nJyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFBaUM7QUFBQTtBQUFBO0FBQUE7QUFFbEIsTUFBTUEsYUFBYSxDQUFDO0FBdUdsQztBQUFBLGdCQXZHb0JBLGFBQWEsZ0JBQ1osT0FBT0MsR0FBb0IsRUFBRUMsR0FBYSxLQUFLO0VBQ2pFLElBQUk7SUFDRixNQUFNO01BQUVDLE1BQU07TUFBRUMsUUFBUTtNQUFFQyxPQUFPO01BQUVDLFlBQVk7TUFBRUM7SUFBVSxDQUFDLEdBQzFETixHQUFHLENBQUNPLElBQUk7SUFDVixNQUFNQyxPQUF3QixHQUFHO01BQy9CTixNQUFNO01BQ05DLFFBQVE7TUFDUk0sVUFBVSxFQUFFVCxHQUFHLENBQUNVLElBQUksQ0FBQ0MsR0FBRztNQUN4Qk4sWUFBWTtNQUNaQyxTQUFTO01BQ1RNLEtBQUssRUFBRTtRQUNMQyxXQUFXLEVBQUUsUUFBUTtRQUNyQlQ7TUFDRjtJQUNGLENBQUM7SUFFRCxNQUFNVSxXQUFXLEdBQUcsSUFBQUMsUUFBTSxHQUFFO0lBQzVCOztJQUVBLE1BQU07TUFBRUMsSUFBSTtNQUFFQztJQUFPLENBQUMsR0FBRyxNQUFNQyxhQUFJLENBQUNDLGNBQWMsQ0FDaERMLFdBQVcsRUFDWE4sT0FBTyxDQUNSO0lBRUQsSUFBSSxDQUFDUyxNQUFNLEVBQUU7TUFDWCxNQUFNLElBQUlHLDRCQUFhLENBQUMsR0FBRyxFQUFFLGdCQUFnQixDQUFDO0lBQ2hEO0lBRUEsTUFBTUMsb0JBQVcsQ0FBQ0MsTUFBTSxDQUFDO01BQ3ZCWixJQUFJLEVBQUVWLEdBQUcsQ0FBQ1UsSUFBSSxDQUFDQyxHQUFHO01BQ2xC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