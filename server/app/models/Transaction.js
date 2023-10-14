"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const TransactionSchema = new _mongoose.default.Schema({
  user: {
    type: _mongoose.default.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver: {
    type: _mongoose.default.Types.ObjectId,
    ref: 'User',
    required: false
  },
  adminWallet: {
    type: _mongoose.default.Types.ObjectId,
    ref: 'Wallet',
    required: false
  },
  withdrawRequestId: {
    type: _mongoose.default.Types.ObjectId,
    ref: 'WithdrawRequest'
  },
  status: {
    type: String,
    enum: ['SUCCESSFUL', 'PENDING', 'FAILED', 'UNKNOWN_ACCOUNT', 'TIMEOUT', 'DECLINED', 'ERRONEOUS', 'FAILURE', 'INVALID_PIN', 'ACCOUNT_NOT_ACTIVE', 'BELOW_MINIMUM_ALLOWED_AMOUNT', 'NO_SUFFICIENT_FUNDS', 'ACCOUNT_NOT_FOUND', 'ABOVE_MAXIMUM_ALLOWED_AMOUNT', 'DUPLICATED_TRANSACTION_ID'],
    required: true
  },
  referenceId: {
    type: String
  },
  mode: {
    type: String
  },
  action: {
    type: String,
    enum: ['deposit', 'transfer', 'withdraw'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    enum: ['RWF'],
    default: 'RWF'
  },
  chargedCommission: {
    type: Number,
    default: 0
  },
  paidAmount: {
    type: Number,
    default: 0
  },
  commission: {
    type: Number,
    default: 0
  },
  transferedAmount: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    default: 0
  }
});
TransactionSchema.set('timestamps', true);
const Transaction = _mongoose.default.model('Transaction', TransactionSchema);
var _default = Transaction;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJUcmFuc2FjdGlvblNjaGVtYSIsIm1vbmdvb3NlIiwiU2NoZW1hIiwidXNlciIsInR5cGUiLCJUeXBlcyIsIk9iamVjdElkIiwicmVmIiwicmVxdWlyZWQiLCJyZWNlaXZlciIsImFkbWluV2FsbGV0Iiwid2l0aGRyYXdSZXF1ZXN0SWQiLCJzdGF0dXMiLCJTdHJpbmciLCJlbnVtIiwicmVmZXJlbmNlSWQiLCJtb2RlIiwiYWN0aW9uIiwiYW1vdW50IiwiTnVtYmVyIiwiY3VycmVuY3kiLCJkZWZhdWx0IiwiY2hhcmdlZENvbW1pc3Npb24iLCJwYWlkQW1vdW50IiwiY29tbWlzc2lvbiIsInRyYW5zZmVyZWRBbW91bnQiLCJ0b3RhbCIsInNldCIsIlRyYW5zYWN0aW9uIiwibW9kZWwiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL21vZGVscy9UcmFuc2FjdGlvbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xyXG5cclxuY29uc3QgVHJhbnNhY3Rpb25TY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hKHtcclxuICB1c2VyOiB7XHJcbiAgICB0eXBlOiBtb25nb29zZS5UeXBlcy5PYmplY3RJZCxcclxuICAgIHJlZjogJ1VzZXInLFxyXG4gICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgfSxcclxuICByZWNlaXZlcjoge1xyXG4gICAgdHlwZTogbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWQsXHJcbiAgICByZWY6ICdVc2VyJyxcclxuICAgIHJlcXVpcmVkOiBmYWxzZSxcclxuICB9LFxyXG4gIGFkbWluV2FsbGV0OiB7XHJcbiAgICB0eXBlOiBtb25nb29zZS5UeXBlcy5PYmplY3RJZCxcclxuICAgIHJlZjogJ1dhbGxldCcsXHJcbiAgICByZXF1aXJlZDogZmFsc2UsXHJcbiAgfSxcclxuICB3aXRoZHJhd1JlcXVlc3RJZDoge1xyXG4gICAgdHlwZTogbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWQsXHJcbiAgICByZWY6ICdXaXRoZHJhd1JlcXVlc3QnLFxyXG4gIH0sXHJcbiAgc3RhdHVzOiB7XHJcbiAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICBlbnVtOiBbXHJcbiAgICAgICdTVUNDRVNTRlVMJyxcclxuICAgICAgJ1BFTkRJTkcnLFxyXG4gICAgICAnRkFJTEVEJyxcclxuICAgICAgJ1VOS05PV05fQUNDT1VOVCcsXHJcbiAgICAgICdUSU1FT1VUJyxcclxuICAgICAgJ0RFQ0xJTkVEJyxcclxuICAgICAgJ0VSUk9ORU9VUycsXHJcbiAgICAgICdGQUlMVVJFJyxcclxuICAgICAgJ0lOVkFMSURfUElOJyxcclxuICAgICAgJ0FDQ09VTlRfTk9UX0FDVElWRScsXHJcbiAgICAgICdCRUxPV19NSU5JTVVNX0FMTE9XRURfQU1PVU5UJyxcclxuICAgICAgJ05PX1NVRkZJQ0lFTlRfRlVORFMnLFxyXG4gICAgICAnQUNDT1VOVF9OT1RfRk9VTkQnLFxyXG4gICAgICAnQUJPVkVfTUFYSU1VTV9BTExPV0VEX0FNT1VOVCcsXHJcbiAgICAgICdEVVBMSUNBVEVEX1RSQU5TQUNUSU9OX0lEJyxcclxuICAgIF0sXHJcbiAgICByZXF1aXJlZDogdHJ1ZSxcclxuICB9LFxyXG4gIHJlZmVyZW5jZUlkOiB7XHJcbiAgICB0eXBlOiBTdHJpbmcsXHJcbiAgfSxcclxuICBtb2RlOiB7XHJcbiAgICB0eXBlOiBTdHJpbmcsXHJcbiAgfSxcclxuICBhY3Rpb246IHtcclxuICAgIHR5cGU6IFN0cmluZyxcclxuICAgIGVudW06IFsnZGVwb3NpdCcsICd0cmFuc2ZlcicsICd3aXRoZHJhdyddLFxyXG4gICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgfSxcclxuICBhbW91bnQ6IHtcclxuICAgIHR5cGU6IE51bWJlcixcclxuICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gIH0sXHJcbiAgY3VycmVuY3k6IHtcclxuICAgIHR5cGU6IFN0cmluZyxcclxuICAgIGVudW06IFsnUldGJ10sXHJcbiAgICBkZWZhdWx0OiAnUldGJyxcclxuICB9LFxyXG4gIGNoYXJnZWRDb21taXNzaW9uOiB7XHJcbiAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICBkZWZhdWx0OiAwLFxyXG4gIH0sXHJcbiAgcGFpZEFtb3VudDoge1xyXG4gICAgdHlwZTogTnVtYmVyLFxyXG4gICAgZGVmYXVsdDogMCxcclxuICB9LFxyXG4gIGNvbW1pc3Npb246IHtcclxuICAgIHR5cGU6IE51bWJlcixcclxuICAgIGRlZmF1bHQ6IDAsXHJcbiAgfSxcclxuICB0cmFuc2ZlcmVkQW1vdW50OiB7XHJcbiAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICBkZWZhdWx0OiAwLFxyXG4gIH0sXHJcbiAgdG90YWw6IHtcclxuICAgIHR5cGU6IE51bWJlcixcclxuICAgIGRlZmF1bHQ6IDAsXHJcbiAgfSxcclxufSk7XHJcblxyXG5UcmFuc2FjdGlvblNjaGVtYS5zZXQoJ3RpbWVzdGFtcHMnLCB0cnVlKTtcclxuXHJcbmNvbnN0IFRyYW5zYWN0aW9uID0gbW9uZ29vc2UubW9kZWwoJ1RyYW5zYWN0aW9uJywgVHJhbnNhY3Rpb25TY2hlbWEpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVHJhbnNhY3Rpb247XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFBZ0M7QUFFaEMsTUFBTUEsaUJBQWlCLEdBQUcsSUFBSUMsaUJBQVEsQ0FBQ0MsTUFBTSxDQUFDO0VBQzVDQyxJQUFJLEVBQUU7SUFDSkMsSUFBSSxFQUFFSCxpQkFBUSxDQUFDSSxLQUFLLENBQUNDLFFBQVE7SUFDN0JDLEdBQUcsRUFBRSxNQUFNO0lBQ1hDLFFBQVEsRUFBRTtFQUNaLENBQUM7RUFDREMsUUFBUSxFQUFFO0lBQ1JMLElBQUksRUFBRUgsaUJBQVEsQ0FBQ0ksS0FBSyxDQUFDQyxRQUFRO0lBQzdCQyxHQUFHLEVBQUUsTUFBTTtJQUNYQyxRQUFRLEVBQUU7RUFDWixDQUFDO0VBQ0RFLFdBQVcsRUFBRTtJQUNYTixJQUFJLEVBQUVILGlCQUFRLENBQUNJLEtBQUssQ0FBQ0MsUUFBUTtJQUM3QkMsR0FBRyxFQUFFLFFBQVE7SUFDYkMsUUFBUSxFQUFFO0VBQ1osQ0FBQztFQUNERyxpQkFBaUIsRUFBRTtJQUNqQlAsSUFBSSxFQUFFSCxpQkFBUSxDQUFDSSxLQUFLLENBQUNDLFFBQVE7SUFDN0JDLEdBQUcsRUFBRTtFQUNQLENBQUM7RUFDREssTUFBTSxFQUFFO0lBQ05SLElBQUksRUFBRVMsTUFBTTtJQUNaQyxJQUFJLEVBQUUsQ0FDSixZQUFZLEVBQ1osU0FBUyxFQUNULFFBQVEsRUFDUixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixXQUFXLEVBQ1gsU0FBUyxFQUNULGFBQWEsRUFDYixvQkFBb0IsRUFDcEIsOEJBQThCLEVBQzlCLHFCQUFxQixFQUNyQixtQkFBbUIsRUFDbkIsOEJBQThCLEVBQzlCLDJCQUEyQixDQUM1QjtJQUNETixRQUFRLEVBQUU7RUFDWixDQUFDO0VBQ0RPLFdBQVcsRUFBRTtJQUNYWCxJQUFJLEVBQUVTO0VBQ1IsQ0FBQztFQUNERyxJQUFJLEVBQUU7SUFDSlosSUFBSSxFQUFFUztFQUNSLENBQUM7RUFDREksTUFBTSxFQUFFO0lBQ05iLElBQUksRUFBRVMsTUFBTTtJQUNaQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQztJQUN6Q04sUUFBUSxFQUFFO0VBQ1osQ0FBQztFQUNEVSxNQUFNLEVBQUU7SUFDTmQsSUFBSSxFQUFFZSxNQUFNO0lBQ1pYLFFBQVEsRUFBRTtFQUNaLENBQUM7RUFDRFksUUFBUSxFQUFFO0lBQ1JoQixJQUFJLEVBQUVTLE1BQU07SUFDWkMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDO0lBQ2JPLE9BQU8sRUFBRTtFQUNYLENBQUM7RUFDREMsaUJBQWlCLEVBQUU7SUFDakJsQixJQUFJLEVBQUVlLE1BQU07SUFDWkUsT0FBTyxFQUFFO0VBQ1gsQ0FBQztFQUNERSxVQUFVLEVBQUU7SUFDVm5CLElBQUksRUFBRWUsTUFBTTtJQUNaRSxPQUFPLEVBQUU7RUFDWCxDQUFDO0VBQ0RHLFVBQVUsRUFBRTtJQUNWcEIsSUFBSSxFQUFFZSxNQUFNO0lBQ1pFLE9BQU8sRUFBRTtFQUNYLENBQUM7RUFDREksZ0JBQWdCLEVBQUU7SUFDaEJyQixJQUFJLEVBQUVlLE1BQU07SUFDWkUsT0FBTyxFQUFFO0VBQ1gsQ0FBQztFQUNESyxLQUFLLEVBQUU7SUFDTHRCLElBQUksRUFBRWUsTUFBTTtJQUNaRSxPQUFPLEVBQUU7RUFDWDtBQUNGLENBQUMsQ0FBQztBQUVGckIsaUJBQWlCLENBQUMyQixHQUFHLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQztBQUV6QyxNQUFNQyxXQUFXLEdBQUczQixpQkFBUSxDQUFDNEIsS0FBSyxDQUFDLGFBQWEsRUFBRTdCLGlCQUFpQixDQUFDO0FBQUMsZUFFdEQ0QixXQUFXO0FBQUEifQ==