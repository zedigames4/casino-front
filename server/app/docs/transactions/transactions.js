"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default2 = _interopRequireDefault(require("../default.responses"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const transactions = {
  '/api/v1/transactions': {
    get: {
      tags: ['transactions'],
      security: [{
        JWT: []
      }],
      summary: 'findAll',
      description: 'Returns the filtered transactions according to the passed parameters',
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
  '/api/v1/transactions/{id}': {
    get: {
      tags: ['transactions'],
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
    },
    delete: {
      tags: ['transactions'],
      security: [{
        JWT: []
      }],
      summary: 'delete',
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
var _default = transactions;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ0cmFuc2FjdGlvbnMiLCJnZXQiLCJ0YWdzIiwic2VjdXJpdHkiLCJKV1QiLCJzdW1tYXJ5IiwiZGVzY3JpcHRpb24iLCJwYXJhbWV0ZXJzIiwiaW4iLCJuYW1lIiwicmVxdWlyZWQiLCJzY2hlbWEiLCJ0eXBlIiwiY29uc3VtZXMiLCJyZXNwb25zZXMiLCJkZWxldGUiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBwL2RvY3MvdHJhbnNhY3Rpb25zL3RyYW5zYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcmVzcG9uc2VzIGZyb20gJy4uL2RlZmF1bHQucmVzcG9uc2VzJztcclxuXHJcbmNvbnN0IHRyYW5zYWN0aW9ucyA9IHtcclxuICAnL2FwaS92MS90cmFuc2FjdGlvbnMnOiB7XHJcbiAgICBnZXQ6IHtcclxuICAgICAgdGFnczogWyd0cmFuc2FjdGlvbnMnXSxcclxuICAgICAgc2VjdXJpdHk6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBKV1Q6IFtdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICAgIHN1bW1hcnk6ICdmaW5kQWxsJyxcclxuICAgICAgZGVzY3JpcHRpb246XHJcbiAgICAgICAgJ1JldHVybnMgdGhlIGZpbHRlcmVkIHRyYW5zYWN0aW9ucyBhY2NvcmRpbmcgdG8gdGhlIHBhc3NlZCBwYXJhbWV0ZXJzJyxcclxuICAgICAgcGFyYW1ldGVyczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGluOiAncXVlcnknLFxyXG4gICAgICAgICAgbmFtZTogJ2FjdGlvbicsXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbjogYEFsbG93ZWQgdmFsdWVzIGFyZTogJ2RlcG9zaXQnLCAndHJhbnNmZXInLCAnd2l0aGRyYXcnYCxcclxuICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcclxuICAgICAgICAgIHNjaGVtYToge1xyXG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpbjogJ3F1ZXJ5JyxcclxuICAgICAgICAgIG5hbWU6ICdzdGF0dXMnLFxyXG4gICAgICAgICAgZGVzY3JpcHRpb246XHJcbiAgICAgICAgICAgICdTdGF0dXMgb2YgVHJhbnNhY3Rpb24sIGFsbG93ZWQgdmFsdWVzIGFyZTogU1VDQ0VTU0ZVTCwgUEVORElORywgRkFJTEVEJyxcclxuICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcclxuICAgICAgICAgIHNjaGVtYToge1xyXG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpbjogJ3F1ZXJ5JyxcclxuICAgICAgICAgIG5hbWU6ICdtb2RlJyxcclxuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnTW9kZSBvZiBUcmFuc2FjdGlvbiwgZXg6IG10bnJ3YW5kYScsXHJcbiAgICAgICAgICByZXF1aXJlZDogZmFsc2UsXHJcbiAgICAgICAgICBzY2hlbWE6IHtcclxuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaW46ICdxdWVyeScsXHJcbiAgICAgICAgICBuYW1lOiAndXNlcicsXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ3VzZXIgaWQgb2YgdGhlIHRoZSBzZW5kZXInLFxyXG4gICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgc2NoZW1hOiB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB7XHJcbiAgICAgICAgICBpbjogJ3F1ZXJ5JyxcclxuICAgICAgICAgIG5hbWU6ICdyZWNlaXZlcicsXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbjpcclxuICAgICAgICAgICAgJ3VzZXIgaWQgb2YgdGhlIHRoZSByZWNlaXZlcjsgdGhpcyB3aWxsIGhhcHBlbiBvbiB0cmFuc2ZlciBhY3Rpb24nLFxyXG4gICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgc2NoZW1hOiB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgICBjb25zdW1lczogWydhcHBsaWNhdGlvbi9qc29uJ10sXHJcbiAgICAgIHJlc3BvbnNlcyxcclxuICAgIH0sXHJcbiAgfSxcclxuICAnL2FwaS92MS90cmFuc2FjdGlvbnMve2lkfSc6IHtcclxuICAgIGdldDoge1xyXG4gICAgICB0YWdzOiBbJ3RyYW5zYWN0aW9ucyddLFxyXG4gICAgICBzZWN1cml0eTogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIEpXVDogW10sXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgICAgc3VtbWFyeTogJ2ZpbmRPbmUnLFxyXG4gICAgICBwYXJhbWV0ZXJzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaW46ICdwYXRoJyxcclxuICAgICAgICAgIG5hbWU6ICdpZCcsXHJcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgIHNjaGVtYToge1xyXG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgICAgY29uc3VtZXM6IFsnYXBwbGljYXRpb24vanNvbiddLFxyXG4gICAgICByZXNwb25zZXMsXHJcbiAgICB9LFxyXG4gICAgZGVsZXRlOiB7XHJcbiAgICAgIHRhZ3M6IFsndHJhbnNhY3Rpb25zJ10sXHJcbiAgICAgIHNlY3VyaXR5OiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgSldUOiBbXSxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgICBzdW1tYXJ5OiAnZGVsZXRlJyxcclxuICAgICAgcGFyYW1ldGVyczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGluOiAncGF0aCcsXHJcbiAgICAgICAgICBuYW1lOiAnaWQnLFxyXG4gICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICBzY2hlbWE6IHtcclxuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICAgIGNvbnN1bWVzOiBbJ2FwcGxpY2F0aW9uL2pzb24nXSxcclxuICAgICAgcmVzcG9uc2VzLFxyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJhbnNhY3Rpb25zO1xyXG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQTZDO0FBRTdDLE1BQU1BLFlBQVksR0FBRztFQUNuQixzQkFBc0IsRUFBRTtJQUN0QkMsR0FBRyxFQUFFO01BQ0hDLElBQUksRUFBRSxDQUFDLGNBQWMsQ0FBQztNQUN0QkMsUUFBUSxFQUFFLENBQ1I7UUFDRUMsR0FBRyxFQUFFO01BQ1AsQ0FBQyxDQUNGO01BQ0RDLE9BQU8sRUFBRSxTQUFTO01BQ2xCQyxXQUFXLEVBQ1Qsc0VBQXNFO01BQ3hFQyxVQUFVLEVBQUUsQ0FDVjtRQUNFQyxFQUFFLEVBQUUsT0FBTztRQUNYQyxJQUFJLEVBQUUsUUFBUTtRQUNkSCxXQUFXLEVBQUcsdURBQXNEO1FBQ3BFSSxRQUFRLEVBQUUsS0FBSztRQUNmQyxNQUFNLEVBQUU7VUFDTkMsSUFBSSxFQUFFO1FBQ1I7TUFDRixDQUFDLEVBQ0Q7UUFDRUosRUFBRSxFQUFFLE9BQU87UUFDWEMsSUFBSSxFQUFFLFFBQVE7UUFDZEgsV0FBVyxFQUNULHdFQUF3RTtRQUMxRUksUUFBUSxFQUFFLEtBQUs7UUFDZkMsTUFBTSxFQUFFO1VBQ05DLElBQUksRUFBRTtRQUNSO01BQ0YsQ0FBQyxFQUNEO1FBQ0VKLEVBQUUsRUFBRSxPQUFPO1FBQ1hDLElBQUksRUFBRSxNQUFNO1FBQ1pILFdBQVcsRUFBRSxvQ0FBb0M7UUFDakRJLFFBQVEsRUFBRSxLQUFLO1FBQ2ZDLE1BQU0sRUFBRTtVQUNOQyxJQUFJLEVBQUU7UUFDUjtNQUNGLENBQUMsRUFDRDtRQUNFSixFQUFFLEVBQUUsT0FBTztRQUNYQyxJQUFJLEVBQUUsTUFBTTtRQUNaSCxXQUFXLEVBQUUsMkJBQTJCO1FBQ3hDSSxRQUFRLEVBQUUsS0FBSztRQUNmQyxNQUFNLEVBQUU7VUFDTkMsSUFBSSxFQUFFO1FBQ1I7TUFDRixDQUFDLEVBRUQ7UUFDRUosRUFBRSxFQUFFLE9BQU87UUFDWEMsSUFBSSxFQUFFLFVBQVU7UUFDaEJILFdBQVcsRUFDVCxrRUFBa0U7UUFDcEVJLFFBQVEsRUFBRSxLQUFLO1FBQ2ZDLE1BQU0sRUFBRTtVQUNOQyxJQUFJLEVBQUU7UUFDUjtNQUNGLENBQUMsQ0FDRjtNQUNEQyxRQUFRLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztNQUM5QkMsU0FBUyxFQUFUQTtJQUNGO0VBQ0YsQ0FBQztFQUNELDJCQUEyQixFQUFFO0lBQzNCYixHQUFHLEVBQUU7TUFDSEMsSUFBSSxFQUFFLENBQUMsY0FBYyxDQUFDO01BQ3RCQyxRQUFRLEVBQUUsQ0FDUjtRQUNFQyxHQUFHLEVBQUU7TUFDUCxDQUFDLENBQ0Y7TUFDREMsT0FBTyxFQUFFLFNBQVM7TUFDbEJFLFVBQVUsRUFBRSxDQUNWO1FBQ0VDLEVBQUUsRUFBRSxNQUFNO1FBQ1ZDLElBQUksRUFBRSxJQUFJO1FBQ1ZDLFFBQVEsRUFBRSxJQUFJO1FBQ2RDLE1BQU0sRUFBRTtVQUNOQyxJQUFJLEVBQUU7UUFDUjtNQUNGLENBQUMsQ0FDRjtNQUNEQyxRQUFRLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztNQUM5QkMsU0FBUyxFQUFUQTtJQUNGLENBQUM7SUFDREMsTUFBTSxFQUFFO01BQ05iLElBQUksRUFBRSxDQUFDLGNBQWMsQ0FBQztNQUN0QkMsUUFBUSxFQUFFLENBQ1I7UUFDRUMsR0FBRyxFQUFFO01BQ1AsQ0FBQyxDQUNGO01BQ0RDLE9BQU8sRUFBRSxRQUFRO01BQ2pCRSxVQUFVLEVBQUUsQ0FDVjtRQUNFQyxFQUFFLEVBQUUsTUFBTTtRQUNWQyxJQUFJLEVBQUUsSUFBSTtRQUNWQyxRQUFRLEVBQUUsSUFBSTtRQUNkQyxNQUFNLEVBQUU7VUFDTkMsSUFBSSxFQUFFO1FBQ1I7TUFDRixDQUFDLENBQ0Y7TUFDREMsUUFBUSxFQUFFLENBQUMsa0JBQWtCLENBQUM7TUFDOUJDLFNBQVMsRUFBVEE7SUFDRjtFQUNGO0FBQ0YsQ0FBQztBQUFDLGVBRWFkLFlBQVk7QUFBQSJ9