"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default2 = _interopRequireDefault(require("../default.responses"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const transfers = {
  '/api/v1/transfers': {
    post: {
      tags: ['transfers'],
      security: [{
        JWT: []
      }],
      summary: 'create',
      parameters: [{
        in: 'body',
        name: 'user',
        required: true,
        schema: {
          example: {
            receiver: '',
            amount: 100
          }
        }
      }],
      consumes: ['application/json'],
      responses: _default2.default
    },
    get: {
      tags: ['transfers'],
      security: [{
        JWT: []
      }],
      summary: 'findAll',
      description: 'Returns the filtered transfers according to the passed parameters',
      parameters: [{
        in: 'query',
        name: 'action',
        description: `Allowed values are: 'deposit', 'transfer', 'withdraw'`,
        required: false,
        schema: {
          type: 'string'
        }
      }, {
        in: 'query',
        name: 'status',
        description: 'Status of Transaction, allowed values are: SUCCESSFUL, PENDING, FAILED',
        required: false,
        schema: {
          type: 'string'
        }
      }, {
        in: 'query',
        name: 'mode',
        description: 'Mode of Transaction, ex: mtnrwanda',
        required: false,
        schema: {
          type: 'string'
        }
      }, {
        in: 'query',
        name: 'user',
        description: 'user id of the the sender',
        required: false,
        schema: {
          type: 'string'
        }
      }, {
        in: 'query',
        name: 'receiver',
        description: 'user id of the the receiver; this will happen on transfer action',
        required: false,
        schema: {
          type: 'string'
        }
      }],
      consumes: ['application/json'],
      responses: _default2.default
    }
  },
  '/api/v1/transfers/{id}': {
    get: {
      tags: ['transfers'],
      security: [{
        JWT: []
      }],
      summary: 'findOne',
      parameters: [{
        in: 'path',
        name: 'id',
        required: true,
        schema: {
          type: 'string'
        }
      }],
      consumes: ['application/json'],
      responses: _default2.default
    }
  }
};
var _default = transfers;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ0cmFuc2ZlcnMiLCJwb3N0IiwidGFncyIsInNlY3VyaXR5IiwiSldUIiwic3VtbWFyeSIsInBhcmFtZXRlcnMiLCJpbiIsIm5hbWUiLCJyZXF1aXJlZCIsInNjaGVtYSIsImV4YW1wbGUiLCJyZWNlaXZlciIsImFtb3VudCIsImNvbnN1bWVzIiwicmVzcG9uc2VzIiwiZ2V0IiwiZGVzY3JpcHRpb24iLCJ0eXBlIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwcC9kb2NzL3RyYW5zZmVycy90cmFuc2ZlcnMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlc3BvbnNlcyBmcm9tICcuLi9kZWZhdWx0LnJlc3BvbnNlcyc7XHJcblxyXG5jb25zdCB0cmFuc2ZlcnMgPSB7XHJcbiAgJy9hcGkvdjEvdHJhbnNmZXJzJzoge1xyXG4gICAgcG9zdDoge1xyXG4gICAgICB0YWdzOiBbJ3RyYW5zZmVycyddLFxyXG4gICAgICBzZWN1cml0eTogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIEpXVDogW10sXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgICAgc3VtbWFyeTogJ2NyZWF0ZScsXHJcbiAgICAgIHBhcmFtZXRlcnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpbjogJ2JvZHknLFxyXG4gICAgICAgICAgbmFtZTogJ3VzZXInLFxyXG4gICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICBzY2hlbWE6IHtcclxuICAgICAgICAgICAgZXhhbXBsZToge1xyXG4gICAgICAgICAgICAgIHJlY2VpdmVyOiAnJyxcclxuICAgICAgICAgICAgICBhbW91bnQ6IDEwMCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgICAgY29uc3VtZXM6IFsnYXBwbGljYXRpb24vanNvbiddLFxyXG4gICAgICByZXNwb25zZXMsXHJcbiAgICB9LFxyXG4gICAgZ2V0OiB7XHJcbiAgICAgIHRhZ3M6IFsndHJhbnNmZXJzJ10sXHJcbiAgICAgIHNlY3VyaXR5OiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgSldUOiBbXSxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgICBzdW1tYXJ5OiAnZmluZEFsbCcsXHJcbiAgICAgIGRlc2NyaXB0aW9uOlxyXG4gICAgICAgICdSZXR1cm5zIHRoZSBmaWx0ZXJlZCB0cmFuc2ZlcnMgYWNjb3JkaW5nIHRvIHRoZSBwYXNzZWQgcGFyYW1ldGVycycsXHJcbiAgICAgIHBhcmFtZXRlcnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpbjogJ3F1ZXJ5JyxcclxuICAgICAgICAgIG5hbWU6ICdhY3Rpb24nLFxyXG4gICAgICAgICAgZGVzY3JpcHRpb246IGBBbGxvd2VkIHZhbHVlcyBhcmU6ICdkZXBvc2l0JywgJ3RyYW5zZmVyJywgJ3dpdGhkcmF3J2AsXHJcbiAgICAgICAgICByZXF1aXJlZDogZmFsc2UsXHJcbiAgICAgICAgICBzY2hlbWE6IHtcclxuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaW46ICdxdWVyeScsXHJcbiAgICAgICAgICBuYW1lOiAnc3RhdHVzJyxcclxuICAgICAgICAgIGRlc2NyaXB0aW9uOlxyXG4gICAgICAgICAgICAnU3RhdHVzIG9mIFRyYW5zYWN0aW9uLCBhbGxvd2VkIHZhbHVlcyBhcmU6IFNVQ0NFU1NGVUwsIFBFTkRJTkcsIEZBSUxFRCcsXHJcbiAgICAgICAgICByZXF1aXJlZDogZmFsc2UsXHJcbiAgICAgICAgICBzY2hlbWE6IHtcclxuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaW46ICdxdWVyeScsXHJcbiAgICAgICAgICBuYW1lOiAnbW9kZScsXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ01vZGUgb2YgVHJhbnNhY3Rpb24sIGV4OiBtdG5yd2FuZGEnLFxyXG4gICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgc2NoZW1hOiB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGluOiAncXVlcnknLFxyXG4gICAgICAgICAgbmFtZTogJ3VzZXInLFxyXG4gICAgICAgICAgZGVzY3JpcHRpb246ICd1c2VyIGlkIG9mIHRoZSB0aGUgc2VuZGVyJyxcclxuICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcclxuICAgICAgICAgIHNjaGVtYToge1xyXG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaW46ICdxdWVyeScsXHJcbiAgICAgICAgICBuYW1lOiAncmVjZWl2ZXInLFxyXG4gICAgICAgICAgZGVzY3JpcHRpb246XHJcbiAgICAgICAgICAgICd1c2VyIGlkIG9mIHRoZSB0aGUgcmVjZWl2ZXI7IHRoaXMgd2lsbCBoYXBwZW4gb24gdHJhbnNmZXIgYWN0aW9uJyxcclxuICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcclxuICAgICAgICAgIHNjaGVtYToge1xyXG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgICAgY29uc3VtZXM6IFsnYXBwbGljYXRpb24vanNvbiddLFxyXG4gICAgICByZXNwb25zZXMsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgJy9hcGkvdjEvdHJhbnNmZXJzL3tpZH0nOiB7XHJcbiAgICBnZXQ6IHtcclxuICAgICAgdGFnczogWyd0cmFuc2ZlcnMnXSxcclxuICAgICAgc2VjdXJpdHk6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBKV1Q6IFtdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICAgIHN1bW1hcnk6ICdmaW5kT25lJyxcclxuICAgICAgcGFyYW1ldGVyczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGluOiAncGF0aCcsXHJcbiAgICAgICAgICBuYW1lOiAnaWQnLFxyXG4gICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICBzY2hlbWE6IHtcclxuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICAgIGNvbnN1bWVzOiBbJ2FwcGxpY2F0aW9uL2pzb24nXSxcclxuICAgICAgcmVzcG9uc2VzLFxyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJhbnNmZXJzO1xyXG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQTZDO0FBRTdDLE1BQU1BLFNBQVMsR0FBRztFQUNoQixtQkFBbUIsRUFBRTtJQUNuQkMsSUFBSSxFQUFFO01BQ0pDLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQztNQUNuQkMsUUFBUSxFQUFFLENBQ1I7UUFDRUMsR0FBRyxFQUFFO01BQ1AsQ0FBQyxDQUNGO01BQ0RDLE9BQU8sRUFBRSxRQUFRO01BQ2pCQyxVQUFVLEVBQUUsQ0FDVjtRQUNFQyxFQUFFLEVBQUUsTUFBTTtRQUNWQyxJQUFJLEVBQUUsTUFBTTtRQUNaQyxRQUFRLEVBQUUsSUFBSTtRQUNkQyxNQUFNLEVBQUU7VUFDTkMsT0FBTyxFQUFFO1lBQ1BDLFFBQVEsRUFBRSxFQUFFO1lBQ1pDLE1BQU0sRUFBRTtVQUNWO1FBQ0Y7TUFDRixDQUFDLENBQ0Y7TUFDREMsUUFBUSxFQUFFLENBQUMsa0JBQWtCLENBQUM7TUFDOUJDLFNBQVMsRUFBVEE7SUFDRixDQUFDO0lBQ0RDLEdBQUcsRUFBRTtNQUNIZCxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUM7TUFDbkJDLFFBQVEsRUFBRSxDQUNSO1FBQ0VDLEdBQUcsRUFBRTtNQUNQLENBQUMsQ0FDRjtNQUNEQyxPQUFPLEVBQUUsU0FBUztNQUNsQlksV0FBVyxFQUNULG1FQUFtRTtNQUNyRVgsVUFBVSxFQUFFLENBQ1Y7UUFDRUMsRUFBRSxFQUFFLE9BQU87UUFDWEMsSUFBSSxFQUFFLFFBQVE7UUFDZFMsV0FBVyxFQUFHLHVEQUFzRDtRQUNwRVIsUUFBUSxFQUFFLEtBQUs7UUFDZkMsTUFBTSxFQUFFO1VBQ05RLElBQUksRUFBRTtRQUNSO01BQ0YsQ0FBQyxFQUNEO1FBQ0VYLEVBQUUsRUFBRSxPQUFPO1FBQ1hDLElBQUksRUFBRSxRQUFRO1FBQ2RTLFdBQVcsRUFDVCx3RUFBd0U7UUFDMUVSLFFBQVEsRUFBRSxLQUFLO1FBQ2ZDLE1BQU0sRUFBRTtVQUNOUSxJQUFJLEVBQUU7UUFDUjtNQUNGLENBQUMsRUFDRDtRQUNFWCxFQUFFLEVBQUUsT0FBTztRQUNYQyxJQUFJLEVBQUUsTUFBTTtRQUNaUyxXQUFXLEVBQUUsb0NBQW9DO1FBQ2pEUixRQUFRLEVBQUUsS0FBSztRQUNmQyxNQUFNLEVBQUU7VUFDTlEsSUFBSSxFQUFFO1FBQ1I7TUFDRixDQUFDLEVBQ0Q7UUFDRVgsRUFBRSxFQUFFLE9BQU87UUFDWEMsSUFBSSxFQUFFLE1BQU07UUFDWlMsV0FBVyxFQUFFLDJCQUEyQjtRQUN4Q1IsUUFBUSxFQUFFLEtBQUs7UUFDZkMsTUFBTSxFQUFFO1VBQ05RLElBQUksRUFBRTtRQUNSO01BQ0YsQ0FBQyxFQUVEO1FBQ0VYLEVBQUUsRUFBRSxPQUFPO1FBQ1hDLElBQUksRUFBRSxVQUFVO1FBQ2hCUyxXQUFXLEVBQ1Qsa0VBQWtFO1FBQ3BFUixRQUFRLEVBQUUsS0FBSztRQUNmQyxNQUFNLEVBQUU7VUFDTlEsSUFBSSxFQUFFO1FBQ1I7TUFDRixDQUFDLENBQ0Y7TUFDREosUUFBUSxFQUFFLENBQUMsa0JBQWtCLENBQUM7TUFDOUJDLFNBQVMsRUFBVEE7SUFDRjtFQUNGLENBQUM7RUFDRCx3QkFBd0IsRUFBRTtJQUN4QkMsR0FBRyxFQUFFO01BQ0hkLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQztNQUNuQkMsUUFBUSxFQUFFLENBQ1I7UUFDRUMsR0FBRyxFQUFFO01BQ1AsQ0FBQyxDQUNGO01BQ0RDLE9BQU8sRUFBRSxTQUFTO01BQ2xCQyxVQUFVLEVBQUUsQ0FDVjtRQUNFQyxFQUFFLEVBQUUsTUFBTTtRQUNWQyxJQUFJLEVBQUUsSUFBSTtRQUNWQyxRQUFRLEVBQUUsSUFBSTtRQUNkQyxNQUFNLEVBQUU7VUFDTlEsSUFBSSxFQUFFO1FBQ1I7TUFDRixDQUFDLENBQ0Y7TUFDREosUUFBUSxFQUFFLENBQUMsa0JBQWtCLENBQUM7TUFDOUJDLFNBQVMsRUFBVEE7SUFDRjtFQUNGO0FBQ0YsQ0FBQztBQUFDLGVBRWFmLFNBQVM7QUFBQSJ9