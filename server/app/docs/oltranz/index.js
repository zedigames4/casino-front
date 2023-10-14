"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default2 = _interopRequireDefault(require("../default.responses"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const oltranz = {
  '/api/v1/pay/oltranz': {
    post: {
      tags: ['pay'],
      security: [{
        JWT: []
      }],
      summary: 'request payment',
      parameters: [{
        in: 'body',
        name: 'payload',
        required: true,
        schema: {
          example: {
            amount: 100,
            description: 'Pay',
            telephoneNumber: '250780728136'
          }
        }
      }],
      consumes: ['application/json'],
      responses: _default2.default
    }
  },
  '/api/v1/pay/oltranz/transfer': {
    post: {
      tags: ['pay'],
      security: [{
        JWT: []
      }],
      summary: 'request payment',
      parameters: [{
        in: 'body',
        name: 'payload',
        required: true,
        schema: {
          example: {
            amount: 100,
            receiver: '639eceff7c6e195316f31d56',
            description: 'Transfer',
            receiverAccount: '250780728136',
            type: 'MOBILE'
          }
        }
      }],
      consumes: ['application/json'],
      responses: _default2.default
    }
  }
};
var _default = oltranz;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJvbHRyYW56IiwicG9zdCIsInRhZ3MiLCJzZWN1cml0eSIsIkpXVCIsInN1bW1hcnkiLCJwYXJhbWV0ZXJzIiwiaW4iLCJuYW1lIiwicmVxdWlyZWQiLCJzY2hlbWEiLCJleGFtcGxlIiwiYW1vdW50IiwiZGVzY3JpcHRpb24iLCJ0ZWxlcGhvbmVOdW1iZXIiLCJjb25zdW1lcyIsInJlc3BvbnNlcyIsInJlY2VpdmVyIiwicmVjZWl2ZXJBY2NvdW50IiwidHlwZSJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcHAvZG9jcy9vbHRyYW56L2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZXNwb25zZXMgZnJvbSAnLi4vZGVmYXVsdC5yZXNwb25zZXMnO1xyXG5cclxuY29uc3Qgb2x0cmFueiA9IHtcclxuICAnL2FwaS92MS9wYXkvb2x0cmFueic6IHtcclxuICAgIHBvc3Q6IHtcclxuICAgICAgdGFnczogWydwYXknXSxcclxuICAgICAgc2VjdXJpdHk6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBKV1Q6IFtdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICAgIHN1bW1hcnk6ICdyZXF1ZXN0IHBheW1lbnQnLFxyXG4gICAgICBwYXJhbWV0ZXJzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaW46ICdib2R5JyxcclxuICAgICAgICAgIG5hbWU6ICdwYXlsb2FkJyxcclxuICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgc2NoZW1hOiB7XHJcbiAgICAgICAgICAgIGV4YW1wbGU6IHtcclxuICAgICAgICAgICAgICBhbW91bnQ6IDEwMCxcclxuICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1BheScsXHJcbiAgICAgICAgICAgICAgdGVsZXBob25lTnVtYmVyOiAnMjUwNzgwNzI4MTM2JyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgICAgY29uc3VtZXM6IFsnYXBwbGljYXRpb24vanNvbiddLFxyXG4gICAgICByZXNwb25zZXMsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgJy9hcGkvdjEvcGF5L29sdHJhbnovdHJhbnNmZXInOiB7XHJcbiAgICBwb3N0OiB7XHJcbiAgICAgIHRhZ3M6IFsncGF5J10sXHJcbiAgICAgIHNlY3VyaXR5OiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgSldUOiBbXSxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgICBzdW1tYXJ5OiAncmVxdWVzdCBwYXltZW50JyxcclxuICAgICAgcGFyYW1ldGVyczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGluOiAnYm9keScsXHJcbiAgICAgICAgICBuYW1lOiAncGF5bG9hZCcsXHJcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgIHNjaGVtYToge1xyXG4gICAgICAgICAgICBleGFtcGxlOiB7XHJcbiAgICAgICAgICAgICAgYW1vdW50OiAxMDAsXHJcbiAgICAgICAgICAgICAgcmVjZWl2ZXI6ICc2MzllY2VmZjdjNmUxOTUzMTZmMzFkNTYnLFxyXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVHJhbnNmZXInLFxyXG4gICAgICAgICAgICAgIHJlY2VpdmVyQWNjb3VudDogJzI1MDc4MDcyODEzNicsXHJcbiAgICAgICAgICAgICAgdHlwZTogJ01PQklMRScsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICAgIGNvbnN1bWVzOiBbJ2FwcGxpY2F0aW9uL2pzb24nXSxcclxuICAgICAgcmVzcG9uc2VzLFxyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgb2x0cmFuejtcclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUE2QztBQUU3QyxNQUFNQSxPQUFPLEdBQUc7RUFDZCxxQkFBcUIsRUFBRTtJQUNyQkMsSUFBSSxFQUFFO01BQ0pDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQztNQUNiQyxRQUFRLEVBQUUsQ0FDUjtRQUNFQyxHQUFHLEVBQUU7TUFDUCxDQUFDLENBQ0Y7TUFDREMsT0FBTyxFQUFFLGlCQUFpQjtNQUMxQkMsVUFBVSxFQUFFLENBQ1Y7UUFDRUMsRUFBRSxFQUFFLE1BQU07UUFDVkMsSUFBSSxFQUFFLFNBQVM7UUFDZkMsUUFBUSxFQUFFLElBQUk7UUFDZEMsTUFBTSxFQUFFO1VBQ05DLE9BQU8sRUFBRTtZQUNQQyxNQUFNLEVBQUUsR0FBRztZQUNYQyxXQUFXLEVBQUUsS0FBSztZQUNsQkMsZUFBZSxFQUFFO1VBQ25CO1FBQ0Y7TUFDRixDQUFDLENBQ0Y7TUFDREMsUUFBUSxFQUFFLENBQUMsa0JBQWtCLENBQUM7TUFDOUJDLFNBQVMsRUFBVEE7SUFDRjtFQUNGLENBQUM7RUFDRCw4QkFBOEIsRUFBRTtJQUM5QmYsSUFBSSxFQUFFO01BQ0pDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQztNQUNiQyxRQUFRLEVBQUUsQ0FDUjtRQUNFQyxHQUFHLEVBQUU7TUFDUCxDQUFDLENBQ0Y7TUFDREMsT0FBTyxFQUFFLGlCQUFpQjtNQUMxQkMsVUFBVSxFQUFFLENBQ1Y7UUFDRUMsRUFBRSxFQUFFLE1BQU07UUFDVkMsSUFBSSxFQUFFLFNBQVM7UUFDZkMsUUFBUSxFQUFFLElBQUk7UUFDZEMsTUFBTSxFQUFFO1VBQ05DLE9BQU8sRUFBRTtZQUNQQyxNQUFNLEVBQUUsR0FBRztZQUNYSyxRQUFRLEVBQUUsMEJBQTBCO1lBQ3BDSixXQUFXLEVBQUUsVUFBVTtZQUN2QkssZUFBZSxFQUFFLGNBQWM7WUFDL0JDLElBQUksRUFBRTtVQUNSO1FBQ0Y7TUFDRixDQUFDLENBQ0Y7TUFDREosUUFBUSxFQUFFLENBQUMsa0JBQWtCLENBQUM7TUFDOUJDLFNBQVMsRUFBVEE7SUFDRjtFQUNGO0FBQ0YsQ0FBQztBQUFDLGVBRWFoQixPQUFPO0FBQUEifQ==