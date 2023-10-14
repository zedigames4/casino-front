"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _uuid = require("uuid");
var _HttpException = require("../exceptions/HttpException");
var _keys = _interopRequireDefault(require("../keys"));
var _Transaction = _interopRequireDefault(require("../models/Transaction"));
var _Wallet = _interopRequireDefault(require("../models/Wallet"));
var _http = _interopRequireDefault(require("../utils/http"));
var _ = require("..");
var _User = _interopRequireDefault(require("../models/User"));
var _WithdrawRequest = _interopRequireDefault(require("../models/WithdrawRequest"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class OltranzController {}
exports.default = OltranzController;
_defineProperty(OltranzController, "requestPay", async (req, res) => {
  try {
    if (!req.adminWallet._id) {
      throw new _HttpException.HttpException(401, 'Wait for admin to set up wallet');
    }
    const payData = req.body;
    const referenceId = (0, _uuid.v4)().replace(/-/gi, '');
    const payload = _objectSpread(_objectSpread({}, payData), {}, {
      organizationId: _keys.default.OLTRANZ_MERCHANT_ID,
      transactionId: referenceId,
      callbackUrl: `${_keys.default.HOST}/api/v1/pay/oltranz/callback/paymentrequest`
    });
    const {
      data,
      status
    } = await _http.default.oltranzAxios.post('/opay/paymentrequest', payload);
    if (!status) {
      throw new _HttpException.HttpException(500, 'Payment failed');
    }
    const transaction = await _Transaction.default.create({
      user: req.user._id,
      referenceId,
      mode: 'oltranz',
      status: data.status,
      action: 'deposit',
      amount: payload.amount,
      currency: 'RWF',
      adminWallet: req.adminWallet._id
    });
    res.status(status).json({
      data,
      referenceId,
      message: 'requesting payment'
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      message: error?.message || 'something went wrong'
    });
  }
});
_defineProperty(OltranzController, "handleRequestToPayCallback", async (req, res) => {
  const {
    transactionId,
    statusDescription,
    paidAmount,
    status,
    chargedCommission
  } = req.body;
  try {
    const transaction = await _Transaction.default.findOne({
      referenceId: transactionId
    });
    if (!transaction) {
      throw new _HttpException.HttpException(409, 'Transaction is not found');
    }
    const adminWallet = await _Wallet.default.findById(transaction.adminWallet);
    if (status === 'SUCCESS') {
      const wallet = await _Wallet.default.findOne({
        user: transaction.user
      });
      transaction.set({
        status: 'SUCCESSFUL',
        chargedCommission,
        paidAmount
      });
      await transaction.save();
      wallet.set({
        balance: wallet.balance + Number(paidAmount)
      });
      await wallet.save();
      adminWallet.set({
        balance: adminWallet.balance - Number(chargedCommission)
      });
      _.io.emit(`payment:done:${transactionId}`, {
        message: statusDescription,
        wallet
      });
    } else {
      transaction.set({
        status: 'FAILED'
      });
      await transaction.save();
      _.io.emit(`payment:error:${transactionId}`, {
        message: statusDescription
      });
    }
    res.status(status === 'SUCCESS' ? 200 : 400).json({
      message: statusDescription
    });
  } catch (error) {
    _.io.emit(`payment:error:${transactionId}`, {
      message: 'Payment failed. Please try again.'
    });
    res.status(error?.status || 500).json({
      message: error?.message || 'something went wrong'
    });
  }
});
_defineProperty(OltranzController, "handleTransferCallback", async (req, res) => {
  const {
    transactionId,
    status,
    commission,
    statusDescription,
    total,
    transferedAmount
  } = req.body;
  try {
    const transaction = await _Transaction.default.findOne({
      referenceId: transactionId
    });
    if (!transaction) {
      throw new _HttpException.HttpException(409, 'Transaction is not found');
    }
    const receiverWallet = await _Wallet.default.findOne({
      user: transaction.user
    });
    const adminWallet = await _Wallet.default.findById(transaction.adminWallet);
    if (status === 'SUCCESS') {
      const withdrawRequest = await _WithdrawRequest.default.findById(transaction.withdrawRequestId);
      withdrawRequest.set({
        status: 'APPROVED'
      });
      await withdrawRequest.save();
      transaction.set({
        status: 'SUCCESSFUL',
        commission,
        total,
        transferedAmount
      });
      await transaction.save();
      adminWallet.set({
        balance: adminWallet.balance + Number(commission)
      });
      await adminWallet.save();
      const paid = Number(transferedAmount) + 2 * Number(commission);
      receiverWallet.set({
        balance: receiverWallet.balance - Number(paid)
      });
      await receiverWallet.save();
      _.io.emit(`transfer:done:${transactionId}`, {
        message: statusDescription,
        receiverWallet,
        adminWallet
      });
    } else {
      transaction.set({
        status: 'FAILED'
      });
      await transaction.save();
      _.io.emit(`transfer:done:${transactionId}`, {
        message: statusDescription
      });
    }
    res.status(status === 'SUCCESS' ? 200 : 400).json({
      message: statusDescription
    });
  } catch (error) {
    _.io.emit(`transfer:error:${transactionId}`, {
      message: 'Transfer failed. Please try again.'
    });
    res.status(error?.status || 500).json({
      message: error?.message || 'something went wrong'
    });
  }
});
_defineProperty(OltranzController, "transfer", async (req, res) => {
  try {
    if (!req.adminWallet._id) {
      throw new _HttpException.HttpException(401, 'Wait for admin to set up wallet');
    }
    const {
      _id,
      requester,
      amount,
      receiverAccount,
      receiverPhoneNumber,
      description = 'Transfer',
      type = 'MOBILE'
    } = req.request || req.body;
    const withdrawRequestId = _id || req.body.withdrawRequestId;
    const withdrawRequest = await _WithdrawRequest.default.findById(withdrawRequestId);
    if (!withdrawRequest) {
      throw new _HttpException.HttpException(409, 'Withdraw request is not found');
    }
    const receiver = requester || req.body.receiver;
    const referenceId = (0, _uuid.v4)().replace(/-/gi, '');
    const userReceiver = await _User.default.findById(receiver);
    if (!userReceiver) {
      throw new _HttpException.HttpException(400, 'Receiver is not found');
    }
    const payload = {
      amount,
      description,
      type,
      receiverAccount: receiverPhoneNumber || receiverAccount,
      merchantId: _keys.default.OLTRANZ_MERCHANT_ID,
      transactionId: referenceId,
      callbackUrl: `${_keys.default.HOST}/api/v1/pay/oltranz/callback/fundstransfer`
    };
    payload.firstName = userReceiver.firstName;
    payload.lastName = userReceiver.lastName;
    const {
      data,
      status
    } = await _http.default.oltranzAxios.post('/opay/wallet/fundstransfer', payload, {
      headers: {
        accessKey: _keys.default.OLTRANZ_ACCESS_KEY
      }
    });
    if (!status) {
      throw new _HttpException.HttpException(500, 'Payment failed');
    }
    const newTransaction = {
      user: receiver,
      referenceId,
      mode: 'oltranz',
      status: data.status,
      action: 'transfer',
      amount: payload.amount,
      currency: 'RWF',
      withdrawRequestId,
      adminWallet: req.adminWallet._id
    };
    const transaction = await _Transaction.default.create(newTransaction);
    res.status(status).json({
      data,
      referenceId,
      message: 'transfer payment'
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      message: error?.message || 'something went wrong'
    });
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJPbHRyYW56Q29udHJvbGxlciIsInJlcSIsInJlcyIsImFkbWluV2FsbGV0IiwiX2lkIiwiSHR0cEV4Y2VwdGlvbiIsInBheURhdGEiLCJib2R5IiwicmVmZXJlbmNlSWQiLCJ1dWlkdjQiLCJyZXBsYWNlIiwicGF5bG9hZCIsIm9yZ2FuaXphdGlvbklkIiwiS2V5cyIsIk9MVFJBTlpfTUVSQ0hBTlRfSUQiLCJ0cmFuc2FjdGlvbklkIiwiY2FsbGJhY2tVcmwiLCJIT1NUIiwiZGF0YSIsInN0YXR1cyIsIkh0dHAiLCJvbHRyYW56QXhpb3MiLCJwb3N0IiwidHJhbnNhY3Rpb24iLCJUcmFuc2FjdGlvbiIsImNyZWF0ZSIsInVzZXIiLCJtb2RlIiwiYWN0aW9uIiwiYW1vdW50IiwiY3VycmVuY3kiLCJqc29uIiwibWVzc2FnZSIsImVycm9yIiwic3RhdHVzRGVzY3JpcHRpb24iLCJwYWlkQW1vdW50IiwiY2hhcmdlZENvbW1pc3Npb24iLCJmaW5kT25lIiwiV2FsbGV0IiwiZmluZEJ5SWQiLCJ3YWxsZXQiLCJzZXQiLCJzYXZlIiwiYmFsYW5jZSIsIk51bWJlciIsImlvIiwiZW1pdCIsImNvbW1pc3Npb24iLCJ0b3RhbCIsInRyYW5zZmVyZWRBbW91bnQiLCJyZWNlaXZlcldhbGxldCIsIndpdGhkcmF3UmVxdWVzdCIsIldpdGhkcmF3UmVxdWVzdCIsIndpdGhkcmF3UmVxdWVzdElkIiwicGFpZCIsInJlcXVlc3RlciIsInJlY2VpdmVyQWNjb3VudCIsInJlY2VpdmVyUGhvbmVOdW1iZXIiLCJkZXNjcmlwdGlvbiIsInR5cGUiLCJyZXF1ZXN0IiwicmVjZWl2ZXIiLCJ1c2VyUmVjZWl2ZXIiLCJVc2VyIiwibWVyY2hhbnRJZCIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwiaGVhZGVycyIsImFjY2Vzc0tleSIsIk9MVFJBTlpfQUNDRVNTX0tFWSIsIm5ld1RyYW5zYWN0aW9uIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9jb250cm9sbGVycy9PbHRyYW56Q29udHJvbGxlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXNwb25zZSwgUmVxdWVzdCB9IGZyb20gJ2V4cHJlc3MnO1xyXG5pbXBvcnQgeyB2NCBhcyB1dWlkdjQgfSBmcm9tICd1dWlkJztcclxuaW1wb3J0IHsgSHR0cEV4Y2VwdGlvbiB9IGZyb20gJy4uL2V4Y2VwdGlvbnMvSHR0cEV4Y2VwdGlvbic7XHJcbmltcG9ydCB7IElPbHRyYW56UmVxdWVzdFRvUGF5IH0gZnJvbSAnLi4vZXhjZXB0aW9ucy9vbHRyYW56JztcclxuaW1wb3J0IHsgUmVxdWVzdFdpdGhVc2VyIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9hdXRoLmludGVyZmFjZSc7XHJcbmltcG9ydCBLZXlzIGZyb20gJy4uL2tleXMnO1xyXG5pbXBvcnQgVHJhbnNhY3Rpb24gZnJvbSAnLi4vbW9kZWxzL1RyYW5zYWN0aW9uJztcclxuaW1wb3J0IFdhbGxldCBmcm9tICcuLi9tb2RlbHMvV2FsbGV0JztcclxuaW1wb3J0IEh0dHAgZnJvbSAnLi4vdXRpbHMvaHR0cCc7XHJcbmltcG9ydCB7IGlvIH0gZnJvbSAnLi4nO1xyXG5pbXBvcnQgVXNlciBmcm9tICcuLi9tb2RlbHMvVXNlcic7XHJcbmltcG9ydCBXaXRoZHJhd1JlcXVlc3QgZnJvbSAnLi4vbW9kZWxzL1dpdGhkcmF3UmVxdWVzdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPbHRyYW56Q29udHJvbGxlciB7XHJcbiAgc3RhdGljIHJlcXVlc3RQYXkgPSBhc3luYyAocmVxOiBSZXF1ZXN0V2l0aFVzZXIsIHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGlmICghcmVxLmFkbWluV2FsbGV0Ll9pZCkge1xyXG4gICAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKFxyXG4gICAgICAgICAgNDAxLFxyXG4gICAgICAgICAgJ1dhaXQgZm9yIGFkbWluIHRvIHNldCB1cCB3YWxsZXQnLFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgcGF5RGF0YSA9IHJlcS5ib2R5O1xyXG5cclxuICAgICAgY29uc3QgcmVmZXJlbmNlSWQgPSB1dWlkdjQoKS5yZXBsYWNlKC8tL2dpLCAnJyk7XHJcblxyXG4gICAgICBjb25zdCBwYXlsb2FkOiBJT2x0cmFuelJlcXVlc3RUb1BheSA9IHtcclxuICAgICAgICAuLi5wYXlEYXRhLFxyXG4gICAgICAgIG9yZ2FuaXphdGlvbklkOiBLZXlzLk9MVFJBTlpfTUVSQ0hBTlRfSUQsXHJcbiAgICAgICAgdHJhbnNhY3Rpb25JZDogcmVmZXJlbmNlSWQsXHJcbiAgICAgICAgY2FsbGJhY2tVcmw6IGAke0tleXMuSE9TVH0vYXBpL3YxL3BheS9vbHRyYW56L2NhbGxiYWNrL3BheW1lbnRyZXF1ZXN0YCxcclxuICAgICAgfTtcclxuICAgICAgY29uc3QgeyBkYXRhLCBzdGF0dXMgfSA9IGF3YWl0IEh0dHAub2x0cmFuekF4aW9zLnBvc3QoXHJcbiAgICAgICAgJy9vcGF5L3BheW1lbnRyZXF1ZXN0JyxcclxuICAgICAgICBwYXlsb2FkLFxyXG4gICAgICApO1xyXG5cclxuICAgICAgaWYgKCFzdGF0dXMpIHtcclxuICAgICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbig1MDAsICdQYXltZW50IGZhaWxlZCcpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCB0cmFuc2FjdGlvbiA9IGF3YWl0IFRyYW5zYWN0aW9uLmNyZWF0ZSh7XHJcbiAgICAgICAgdXNlcjogcmVxLnVzZXIuX2lkLFxyXG4gICAgICAgIHJlZmVyZW5jZUlkLFxyXG4gICAgICAgIG1vZGU6ICdvbHRyYW56JyxcclxuICAgICAgICBzdGF0dXM6IGRhdGEuc3RhdHVzLFxyXG4gICAgICAgIGFjdGlvbjogJ2RlcG9zaXQnLFxyXG4gICAgICAgIGFtb3VudDogcGF5bG9hZC5hbW91bnQsXHJcbiAgICAgICAgY3VycmVuY3k6ICdSV0YnLFxyXG4gICAgICAgIGFkbWluV2FsbGV0OiByZXEuYWRtaW5XYWxsZXQuX2lkLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJlcy5zdGF0dXMoc3RhdHVzKS5qc29uKHtcclxuICAgICAgICBkYXRhLFxyXG4gICAgICAgIHJlZmVyZW5jZUlkLFxyXG4gICAgICAgIG1lc3NhZ2U6ICdyZXF1ZXN0aW5nIHBheW1lbnQnLFxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgICAgcmVzLnN0YXR1cyhlcnJvcj8uc3RhdHVzIHx8IDUwMCkuanNvbih7XHJcbiAgICAgICAgbWVzc2FnZTogZXJyb3I/Lm1lc3NhZ2UgfHwgJ3NvbWV0aGluZyB3ZW50IHdyb25nJyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIGhhbmRsZVJlcXVlc3RUb1BheUNhbGxiYWNrID0gYXN5bmMgKFxyXG4gICAgcmVxOiBSZXF1ZXN0V2l0aFVzZXIsXHJcbiAgICByZXM6IFJlc3BvbnNlLFxyXG4gICkgPT4ge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICB0cmFuc2FjdGlvbklkLFxyXG4gICAgICBzdGF0dXNEZXNjcmlwdGlvbixcclxuICAgICAgcGFpZEFtb3VudCxcclxuICAgICAgc3RhdHVzLFxyXG4gICAgICBjaGFyZ2VkQ29tbWlzc2lvbixcclxuICAgIH0gPSByZXEuYm9keTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gYXdhaXQgVHJhbnNhY3Rpb24uZmluZE9uZSh7XHJcbiAgICAgICAgcmVmZXJlbmNlSWQ6IHRyYW5zYWN0aW9uSWQsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKCF0cmFuc2FjdGlvbikge1xyXG4gICAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKDQwOSwgJ1RyYW5zYWN0aW9uIGlzIG5vdCBmb3VuZCcpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBhZG1pbldhbGxldCA9IGF3YWl0IFdhbGxldC5maW5kQnlJZChcclxuICAgICAgICB0cmFuc2FjdGlvbi5hZG1pbldhbGxldCxcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGlmIChzdGF0dXMgPT09ICdTVUNDRVNTJykge1xyXG4gICAgICAgIGNvbnN0IHdhbGxldCA9IGF3YWl0IFdhbGxldC5maW5kT25lKHtcclxuICAgICAgICAgIHVzZXI6IHRyYW5zYWN0aW9uLnVzZXIsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdHJhbnNhY3Rpb24uc2V0KHtcclxuICAgICAgICAgIHN0YXR1czogJ1NVQ0NFU1NGVUwnLFxyXG4gICAgICAgICAgY2hhcmdlZENvbW1pc3Npb24sXHJcbiAgICAgICAgICBwYWlkQW1vdW50LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGF3YWl0IHRyYW5zYWN0aW9uLnNhdmUoKTtcclxuICAgICAgICB3YWxsZXQuc2V0KHtcclxuICAgICAgICAgIGJhbGFuY2U6IHdhbGxldC5iYWxhbmNlICsgTnVtYmVyKHBhaWRBbW91bnQpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGF3YWl0IHdhbGxldC5zYXZlKCk7XHJcblxyXG4gICAgICAgIGFkbWluV2FsbGV0LnNldCh7XHJcbiAgICAgICAgICBiYWxhbmNlOiBhZG1pbldhbGxldC5iYWxhbmNlIC0gTnVtYmVyKGNoYXJnZWRDb21taXNzaW9uKSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaW8uZW1pdChgcGF5bWVudDpkb25lOiR7dHJhbnNhY3Rpb25JZH1gLCB7XHJcbiAgICAgICAgICBtZXNzYWdlOiBzdGF0dXNEZXNjcmlwdGlvbixcclxuICAgICAgICAgIHdhbGxldCxcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0cmFuc2FjdGlvbi5zZXQoe1xyXG4gICAgICAgICAgc3RhdHVzOiAnRkFJTEVEJyxcclxuICAgICAgICB9KTtcclxuICAgICAgICBhd2FpdCB0cmFuc2FjdGlvbi5zYXZlKCk7XHJcbiAgICAgICAgaW8uZW1pdChgcGF5bWVudDplcnJvcjoke3RyYW5zYWN0aW9uSWR9YCwge1xyXG4gICAgICAgICAgbWVzc2FnZTogc3RhdHVzRGVzY3JpcHRpb24sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJlc1xyXG4gICAgICAgIC5zdGF0dXMoc3RhdHVzID09PSAnU1VDQ0VTUycgPyAyMDAgOiA0MDApXHJcbiAgICAgICAgLmpzb24oeyBtZXNzYWdlOiBzdGF0dXNEZXNjcmlwdGlvbiB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgICAgaW8uZW1pdChgcGF5bWVudDplcnJvcjoke3RyYW5zYWN0aW9uSWR9YCwge1xyXG4gICAgICAgIG1lc3NhZ2U6ICdQYXltZW50IGZhaWxlZC4gUGxlYXNlIHRyeSBhZ2Fpbi4nLFxyXG4gICAgICB9KTtcclxuICAgICAgcmVzLnN0YXR1cyhlcnJvcj8uc3RhdHVzIHx8IDUwMCkuanNvbih7XHJcbiAgICAgICAgbWVzc2FnZTogZXJyb3I/Lm1lc3NhZ2UgfHwgJ3NvbWV0aGluZyB3ZW50IHdyb25nJyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIGhhbmRsZVRyYW5zZmVyQ2FsbGJhY2sgPSBhc3luYyAoXHJcbiAgICByZXE6IFJlcXVlc3RXaXRoVXNlcixcclxuICAgIHJlczogUmVzcG9uc2UsXHJcbiAgKSA9PiB7XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHRyYW5zYWN0aW9uSWQsXHJcbiAgICAgIHN0YXR1cyxcclxuICAgICAgY29tbWlzc2lvbixcclxuICAgICAgc3RhdHVzRGVzY3JpcHRpb24sXHJcbiAgICAgIHRvdGFsLFxyXG4gICAgICB0cmFuc2ZlcmVkQW1vdW50LFxyXG4gICAgfSA9IHJlcS5ib2R5O1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgdHJhbnNhY3Rpb24gPSBhd2FpdCBUcmFuc2FjdGlvbi5maW5kT25lKHtcclxuICAgICAgICByZWZlcmVuY2VJZDogdHJhbnNhY3Rpb25JZCxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoIXRyYW5zYWN0aW9uKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oNDA5LCAnVHJhbnNhY3Rpb24gaXMgbm90IGZvdW5kJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHJlY2VpdmVyV2FsbGV0ID0gYXdhaXQgV2FsbGV0LmZpbmRPbmUoe1xyXG4gICAgICAgIHVzZXI6IHRyYW5zYWN0aW9uLnVzZXIsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY29uc3QgYWRtaW5XYWxsZXQgPSBhd2FpdCBXYWxsZXQuZmluZEJ5SWQoXHJcbiAgICAgICAgdHJhbnNhY3Rpb24uYWRtaW5XYWxsZXQsXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBpZiAoc3RhdHVzID09PSAnU1VDQ0VTUycpIHtcclxuICAgICAgICBjb25zdCB3aXRoZHJhd1JlcXVlc3QgPSBhd2FpdCBXaXRoZHJhd1JlcXVlc3QuZmluZEJ5SWQoXHJcbiAgICAgICAgICB0cmFuc2FjdGlvbi53aXRoZHJhd1JlcXVlc3RJZCxcclxuICAgICAgICApO1xyXG4gICAgICAgIHdpdGhkcmF3UmVxdWVzdC5zZXQoe1xyXG4gICAgICAgICAgc3RhdHVzOiAnQVBQUk9WRUQnLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGF3YWl0IHdpdGhkcmF3UmVxdWVzdC5zYXZlKCk7XHJcblxyXG4gICAgICAgIHRyYW5zYWN0aW9uLnNldCh7XHJcbiAgICAgICAgICBzdGF0dXM6ICdTVUNDRVNTRlVMJyxcclxuICAgICAgICAgIGNvbW1pc3Npb24sXHJcbiAgICAgICAgICB0b3RhbCxcclxuICAgICAgICAgIHRyYW5zZmVyZWRBbW91bnQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXdhaXQgdHJhbnNhY3Rpb24uc2F2ZSgpO1xyXG5cclxuICAgICAgICBhZG1pbldhbGxldC5zZXQoe1xyXG4gICAgICAgICAgYmFsYW5jZTogYWRtaW5XYWxsZXQuYmFsYW5jZSArIE51bWJlcihjb21taXNzaW9uKSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBhd2FpdCBhZG1pbldhbGxldC5zYXZlKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHBhaWQgPVxyXG4gICAgICAgICAgTnVtYmVyKHRyYW5zZmVyZWRBbW91bnQpICsgMiAqIE51bWJlcihjb21taXNzaW9uKTtcclxuXHJcbiAgICAgICAgcmVjZWl2ZXJXYWxsZXQuc2V0KHtcclxuICAgICAgICAgIGJhbGFuY2U6IHJlY2VpdmVyV2FsbGV0LmJhbGFuY2UgLSBOdW1iZXIocGFpZCksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXdhaXQgcmVjZWl2ZXJXYWxsZXQuc2F2ZSgpO1xyXG5cclxuICAgICAgICBpby5lbWl0KGB0cmFuc2Zlcjpkb25lOiR7dHJhbnNhY3Rpb25JZH1gLCB7XHJcbiAgICAgICAgICBtZXNzYWdlOiBzdGF0dXNEZXNjcmlwdGlvbixcclxuICAgICAgICAgIHJlY2VpdmVyV2FsbGV0LFxyXG4gICAgICAgICAgYWRtaW5XYWxsZXQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdHJhbnNhY3Rpb24uc2V0KHtcclxuICAgICAgICAgIHN0YXR1czogJ0ZBSUxFRCcsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXdhaXQgdHJhbnNhY3Rpb24uc2F2ZSgpO1xyXG4gICAgICAgIGlvLmVtaXQoYHRyYW5zZmVyOmRvbmU6JHt0cmFuc2FjdGlvbklkfWAsIHtcclxuICAgICAgICAgIG1lc3NhZ2U6IHN0YXR1c0Rlc2NyaXB0aW9uLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXNcclxuICAgICAgICAuc3RhdHVzKHN0YXR1cyA9PT0gJ1NVQ0NFU1MnID8gMjAwIDogNDAwKVxyXG4gICAgICAgIC5qc29uKHsgbWVzc2FnZTogc3RhdHVzRGVzY3JpcHRpb24gfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XHJcbiAgICAgIGlvLmVtaXQoYHRyYW5zZmVyOmVycm9yOiR7dHJhbnNhY3Rpb25JZH1gLCB7XHJcbiAgICAgICAgbWVzc2FnZTogJ1RyYW5zZmVyIGZhaWxlZC4gUGxlYXNlIHRyeSBhZ2Fpbi4nLFxyXG4gICAgICB9KTtcclxuICAgICAgcmVzLnN0YXR1cyhlcnJvcj8uc3RhdHVzIHx8IDUwMCkuanNvbih7XHJcbiAgICAgICAgbWVzc2FnZTogZXJyb3I/Lm1lc3NhZ2UgfHwgJ3NvbWV0aGluZyB3ZW50IHdyb25nJyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIHRyYW5zZmVyID0gYXN5bmMgKHJlcTogUmVxdWVzdFdpdGhVc2VyLCByZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBpZiAoIXJlcS5hZG1pbldhbGxldC5faWQpIHtcclxuICAgICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbihcclxuICAgICAgICAgIDQwMSxcclxuICAgICAgICAgICdXYWl0IGZvciBhZG1pbiB0byBzZXQgdXAgd2FsbGV0JyxcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCB7XHJcbiAgICAgICAgX2lkLFxyXG4gICAgICAgIHJlcXVlc3RlcixcclxuICAgICAgICBhbW91bnQsXHJcbiAgICAgICAgcmVjZWl2ZXJBY2NvdW50LFxyXG4gICAgICAgIHJlY2VpdmVyUGhvbmVOdW1iZXIsXHJcbiAgICAgICAgZGVzY3JpcHRpb24gPSAnVHJhbnNmZXInLFxyXG4gICAgICAgIHR5cGUgPSAnTU9CSUxFJyxcclxuICAgICAgfSA9IChyZXEgYXMgYW55KS5yZXF1ZXN0IHx8IHJlcS5ib2R5O1xyXG5cclxuICAgICAgY29uc3Qgd2l0aGRyYXdSZXF1ZXN0SWQgPSBfaWQgfHwgcmVxLmJvZHkud2l0aGRyYXdSZXF1ZXN0SWQ7XHJcblxyXG4gICAgICBjb25zdCB3aXRoZHJhd1JlcXVlc3QgPSBhd2FpdCBXaXRoZHJhd1JlcXVlc3QuZmluZEJ5SWQoXHJcbiAgICAgICAgd2l0aGRyYXdSZXF1ZXN0SWQsXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBpZiAoIXdpdGhkcmF3UmVxdWVzdCkge1xyXG4gICAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKDQwOSwgJ1dpdGhkcmF3IHJlcXVlc3QgaXMgbm90IGZvdW5kJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHJlY2VpdmVyID0gcmVxdWVzdGVyIHx8IHJlcS5ib2R5LnJlY2VpdmVyO1xyXG5cclxuICAgICAgY29uc3QgcmVmZXJlbmNlSWQgPSB1dWlkdjQoKS5yZXBsYWNlKC8tL2dpLCAnJyk7XHJcblxyXG4gICAgICBjb25zdCB1c2VyUmVjZWl2ZXIgPSBhd2FpdCBVc2VyLmZpbmRCeUlkKHJlY2VpdmVyKTtcclxuXHJcbiAgICAgIGlmICghdXNlclJlY2VpdmVyKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oNDAwLCAnUmVjZWl2ZXIgaXMgbm90IGZvdW5kJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHBheWxvYWQ6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7XHJcbiAgICAgICAgYW1vdW50LFxyXG4gICAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICAgIHR5cGUsXHJcbiAgICAgICAgcmVjZWl2ZXJBY2NvdW50OiByZWNlaXZlclBob25lTnVtYmVyIHx8IHJlY2VpdmVyQWNjb3VudCxcclxuICAgICAgICBtZXJjaGFudElkOiBLZXlzLk9MVFJBTlpfTUVSQ0hBTlRfSUQsXHJcbiAgICAgICAgdHJhbnNhY3Rpb25JZDogcmVmZXJlbmNlSWQsXHJcbiAgICAgICAgY2FsbGJhY2tVcmw6IGAke0tleXMuSE9TVH0vYXBpL3YxL3BheS9vbHRyYW56L2NhbGxiYWNrL2Z1bmRzdHJhbnNmZXJgLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgcGF5bG9hZC5maXJzdE5hbWUgPSB1c2VyUmVjZWl2ZXIuZmlyc3ROYW1lO1xyXG4gICAgICBwYXlsb2FkLmxhc3ROYW1lID0gdXNlclJlY2VpdmVyLmxhc3ROYW1lO1xyXG5cclxuICAgICAgY29uc3QgeyBkYXRhLCBzdGF0dXMgfSA9IGF3YWl0IEh0dHAub2x0cmFuekF4aW9zLnBvc3QoXHJcbiAgICAgICAgJy9vcGF5L3dhbGxldC9mdW5kc3RyYW5zZmVyJyxcclxuICAgICAgICBwYXlsb2FkLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgYWNjZXNzS2V5OiBLZXlzLk9MVFJBTlpfQUNDRVNTX0tFWSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGlmICghc3RhdHVzKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oNTAwLCAnUGF5bWVudCBmYWlsZWQnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgbmV3VHJhbnNhY3Rpb246IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7XHJcbiAgICAgICAgdXNlcjogcmVjZWl2ZXIsXHJcbiAgICAgICAgcmVmZXJlbmNlSWQsXHJcbiAgICAgICAgbW9kZTogJ29sdHJhbnonLFxyXG4gICAgICAgIHN0YXR1czogZGF0YS5zdGF0dXMsXHJcbiAgICAgICAgYWN0aW9uOiAndHJhbnNmZXInLFxyXG4gICAgICAgIGFtb3VudDogcGF5bG9hZC5hbW91bnQsXHJcbiAgICAgICAgY3VycmVuY3k6ICdSV0YnLFxyXG4gICAgICAgIHdpdGhkcmF3UmVxdWVzdElkLFxyXG4gICAgICAgIGFkbWluV2FsbGV0OiByZXEuYWRtaW5XYWxsZXQuX2lkLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgY29uc3QgdHJhbnNhY3Rpb24gPSBhd2FpdCBUcmFuc2FjdGlvbi5jcmVhdGUobmV3VHJhbnNhY3Rpb24pO1xyXG5cclxuICAgICAgcmVzXHJcbiAgICAgICAgLnN0YXR1cyhzdGF0dXMpXHJcbiAgICAgICAgLmpzb24oeyBkYXRhLCByZWZlcmVuY2VJZCwgbWVzc2FnZTogJ3RyYW5zZmVyIHBheW1lbnQnIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgICByZXMuc3RhdHVzKGVycm9yPy5zdGF0dXMgfHwgNTAwKS5qc29uKHtcclxuICAgICAgICBtZXNzYWdlOiBlcnJvcj8ubWVzc2FnZSB8fCAnc29tZXRoaW5nIHdlbnQgd3JvbmcnLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG59XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQXdEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUV6QyxNQUFNQSxpQkFBaUIsQ0FBQztBQXlTdEM7QUFBQSxnQkF6U29CQSxpQkFBaUIsZ0JBQ2hCLE9BQU9DLEdBQW9CLEVBQUVDLEdBQWEsS0FBSztFQUNqRSxJQUFJO0lBQ0YsSUFBSSxDQUFDRCxHQUFHLENBQUNFLFdBQVcsQ0FBQ0MsR0FBRyxFQUFFO01BQ3hCLE1BQU0sSUFBSUMsNEJBQWEsQ0FDckIsR0FBRyxFQUNILGlDQUFpQyxDQUNsQztJQUNIO0lBQ0EsTUFBTUMsT0FBTyxHQUFHTCxHQUFHLENBQUNNLElBQUk7SUFFeEIsTUFBTUMsV0FBVyxHQUFHLElBQUFDLFFBQU0sR0FBRSxDQUFDQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztJQUUvQyxNQUFNQyxPQUE2QixtQ0FDOUJMLE9BQU87TUFDVk0sY0FBYyxFQUFFQyxhQUFJLENBQUNDLG1CQUFtQjtNQUN4Q0MsYUFBYSxFQUFFUCxXQUFXO01BQzFCUSxXQUFXLEVBQUcsR0FBRUgsYUFBSSxDQUFDSSxJQUFLO0lBQTRDLEVBQ3ZFO0lBQ0QsTUFBTTtNQUFFQyxJQUFJO01BQUVDO0lBQU8sQ0FBQyxHQUFHLE1BQU1DLGFBQUksQ0FBQ0MsWUFBWSxDQUFDQyxJQUFJLENBQ25ELHNCQUFzQixFQUN0QlgsT0FBTyxDQUNSO0lBRUQsSUFBSSxDQUFDUSxNQUFNLEVBQUU7TUFDWCxNQUFNLElBQUlkLDRCQUFh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