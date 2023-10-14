"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default2 = _interopRequireDefault(require("../default.responses"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const withdrawrequests = {
  '/api/v1/withdrawrequests': {
    post: {
      tags: ['withdrawrequests'],
      security: [{
        JWT: []
      }],
      summary: 'create',
      parameters: [{
        in: 'body',
        name: 'request',
        required: true,
        schema: {
          example: {
            amount: 100,
            receiverPhoneNumber: '0780728136'
          }
        }
      }],
      consumes: ['application/json'],
      responses: _default2.default
    },
    get: {
      tags: ['withdrawrequests'],
      security: [{
        JWT: []
      }],
      summary: 'findAll',
      parameters: [{
        in: 'query',
        name: 'page',
        required: false,
        schema: {
          type: 'integer'
        }
      }, {
        in: 'query',
        name: 'limit',
        required: false,
        schema: {
          type: 'integer'
        }
      }, {
        in: 'query',
        name: 'status',
        required: false,
        description: `Filter by status, allowed values: 'APPROVED', 'PENDING', 'REJECTED'`,
        schema: {
          type: 'string',
          example: 'PENDING'
        }
      }, {
        in: 'query',
        name: 'userId',
        required: false,
        description: `Filter by userId, it will be resetted to the authenticated user if is not admin or other allowed users.`,
        schema: {
          type: 'string',
          example: '639eceff7c6e195316f31d56'
        }
      }],
      description: 'Returns the filtered withdrawrequests according to the passed parameters',
      consumes: ['application/json'],
      responses: _default2.default
    }
  },
  '/api/v1/withdrawrequests/{id}': {
    get: {
      tags: ['withdrawrequests'],
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
  },
  '/api/v1/withdrawrequests/{id}/decide': {
    post: {
      tags: ['withdrawrequests'],
      security: [{
        JWT: []
      }],
      summary: 'decide',
      parameters: [{
        in: 'path',
        name: 'id',
        required: true,
        schema: {
          type: 'string'
        }
      }, {
        in: 'body',
        name: 'request',
        required: true,
        schema: {
          example: {
            decision: 'APPROVED'
          }
        }
      }],
      consumes: ['application/json'],
      responses: _default2.default
    }
  }
};
var _default = withdrawrequests;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ3aXRoZHJhd3JlcXVlc3RzIiwicG9zdCIsInRhZ3MiLCJzZWN1cml0eSIsIkpXVCIsInN1bW1hcnkiLCJwYXJhbWV0ZXJzIiwiaW4iLCJuYW1lIiwicmVxdWlyZWQiLCJzY2hlbWEiLCJleGFtcGxlIiwiYW1vdW50IiwicmVjZWl2ZXJQaG9uZU51bWJlciIsImNvbnN1bWVzIiwicmVzcG9uc2VzIiwiZ2V0IiwidHlwZSIsImRlc2NyaXB0aW9uIiwiZGVjaXNpb24iXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBwL2RvY3Mvd2l0aGRyYXdyZXF1ZXN0cy90cmFuc2ZlcnMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlc3BvbnNlcyBmcm9tICcuLi9kZWZhdWx0LnJlc3BvbnNlcyc7XHJcblxyXG5jb25zdCB3aXRoZHJhd3JlcXVlc3RzID0ge1xyXG4gICcvYXBpL3YxL3dpdGhkcmF3cmVxdWVzdHMnOiB7XHJcbiAgICBwb3N0OiB7XHJcbiAgICAgIHRhZ3M6IFsnd2l0aGRyYXdyZXF1ZXN0cyddLFxyXG4gICAgICBzZWN1cml0eTogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIEpXVDogW10sXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgICAgc3VtbWFyeTogJ2NyZWF0ZScsXHJcbiAgICAgIHBhcmFtZXRlcnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpbjogJ2JvZHknLFxyXG4gICAgICAgICAgbmFtZTogJ3JlcXVlc3QnLFxyXG4gICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICBzY2hlbWE6IHtcclxuICAgICAgICAgICAgZXhhbXBsZToge1xyXG4gICAgICAgICAgICAgIGFtb3VudDogMTAwLFxyXG4gICAgICAgICAgICAgIHJlY2VpdmVyUGhvbmVOdW1iZXI6ICcwNzgwNzI4MTM2JyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgICAgY29uc3VtZXM6IFsnYXBwbGljYXRpb24vanNvbiddLFxyXG4gICAgICByZXNwb25zZXMsXHJcbiAgICB9LFxyXG4gICAgZ2V0OiB7XHJcbiAgICAgIHRhZ3M6IFsnd2l0aGRyYXdyZXF1ZXN0cyddLFxyXG4gICAgICBzZWN1cml0eTogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIEpXVDogW10sXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgICAgc3VtbWFyeTogJ2ZpbmRBbGwnLFxyXG4gICAgICBwYXJhbWV0ZXJzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaW46ICdxdWVyeScsXHJcbiAgICAgICAgICBuYW1lOiAncGFnZScsXHJcbiAgICAgICAgICByZXF1aXJlZDogZmFsc2UsXHJcbiAgICAgICAgICBzY2hlbWE6IHtcclxuICAgICAgICAgICAgdHlwZTogJ2ludGVnZXInLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGluOiAncXVlcnknLFxyXG4gICAgICAgICAgbmFtZTogJ2xpbWl0JyxcclxuICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcclxuICAgICAgICAgIHNjaGVtYToge1xyXG4gICAgICAgICAgICB0eXBlOiAnaW50ZWdlcicsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaW46ICdxdWVyeScsXHJcbiAgICAgICAgICBuYW1lOiAnc3RhdHVzJyxcclxuICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcclxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBgRmlsdGVyIGJ5IHN0YXR1cywgYWxsb3dlZCB2YWx1ZXM6ICdBUFBST1ZFRCcsICdQRU5ESU5HJywgJ1JFSkVDVEVEJ2AsXHJcbiAgICAgICAgICBzY2hlbWE6IHtcclxuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXHJcbiAgICAgICAgICAgIGV4YW1wbGU6ICdQRU5ESU5HJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpbjogJ3F1ZXJ5JyxcclxuICAgICAgICAgIG5hbWU6ICd1c2VySWQnLFxyXG4gICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgZGVzY3JpcHRpb246IGBGaWx0ZXIgYnkgdXNlcklkLCBpdCB3aWxsIGJlIHJlc2V0dGVkIHRvIHRoZSBhdXRoZW50aWNhdGVkIHVzZXIgaWYgaXMgbm90IGFkbWluIG9yIG90aGVyIGFsbG93ZWQgdXNlcnMuYCxcclxuICAgICAgICAgIHNjaGVtYToge1xyXG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcclxuICAgICAgICAgICAgZXhhbXBsZTogJzYzOWVjZWZmN2M2ZTE5NTMxNmYzMWQ1NicsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICAgIGRlc2NyaXB0aW9uOlxyXG4gICAgICAgICdSZXR1cm5zIHRoZSBmaWx0ZXJlZCB3aXRoZHJhd3JlcXVlc3RzIGFjY29yZGluZyB0byB0aGUgcGFzc2VkIHBhcmFtZXRlcnMnLFxyXG5cclxuICAgICAgY29uc3VtZXM6IFsnYXBwbGljYXRpb24vanNvbiddLFxyXG4gICAgICByZXNwb25zZXMsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgJy9hcGkvdjEvd2l0aGRyYXdyZXF1ZXN0cy97aWR9Jzoge1xyXG4gICAgZ2V0OiB7XHJcbiAgICAgIHRhZ3M6IFsnd2l0aGRyYXdyZXF1ZXN0cyddLFxyXG4gICAgICBzZWN1cml0eTogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIEpXVDogW10sXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgICAgc3VtbWFyeTogJ2ZpbmRPbmUnLFxyXG4gICAgICBwYXJhbWV0ZXJzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaW46ICdwYXRoJyxcclxuICAgICAgICAgIG5hbWU6ICdpZCcsXHJcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgIHNjaGVtYToge1xyXG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgICAgY29uc3VtZXM6IFsnYXBwbGljYXRpb24vanNvbiddLFxyXG4gICAgICByZXNwb25zZXMsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gICcvYXBpL3YxL3dpdGhkcmF3cmVxdWVzdHMve2lkfS9kZWNpZGUnOiB7XHJcbiAgICBwb3N0OiB7XHJcbiAgICAgIHRhZ3M6IFsnd2l0aGRyYXdyZXF1ZXN0cyddLFxyXG4gICAgICBzZWN1cml0eTogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIEpXVDogW10sXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgICAgc3VtbWFyeTogJ2RlY2lkZScsXHJcbiAgICAgIHBhcmFtZXRlcnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpbjogJ3BhdGgnLFxyXG4gICAgICAgICAgbmFtZTogJ2lkJyxcclxuICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgc2NoZW1hOiB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGluOiAnYm9keScsXHJcbiAgICAgICAgICBuYW1lOiAncmVxdWVzdCcsXHJcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgIHNjaGVtYToge1xyXG4gICAgICAgICAgICBleGFtcGxlOiB7XHJcbiAgICAgICAgICAgICAgZGVjaXNpb246ICdBUFBST1ZFRCcsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICAgIGNvbnN1bWVzOiBbJ2FwcGxpY2F0aW9uL2pzb24nXSxcclxuICAgICAgcmVzcG9uc2VzLFxyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgd2l0aGRyYXdyZXF1ZXN0cztcclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUE2QztBQUU3QyxNQUFNQSxnQkFBZ0IsR0FBRztFQUN2QiwwQkFBMEIsRUFBRTtJQUMxQkMsSUFBSSxFQUFFO01BQ0pDLElBQUksRUFBRSxDQUFDLGtCQUFrQixDQUFDO01BQzFCQyxRQUFRLEVBQUUsQ0FDUjtRQUNFQyxHQUFHLEVBQUU7TUFDUCxDQUFDLENBQ0Y7TUFDREMsT0FBTyxFQUFFLFFBQVE7TUFDakJDLFVBQVUsRUFBRSxDQUNWO1FBQ0VDLEVBQUUsRUFBRSxNQUFNO1FBQ1ZDLElBQUksRUFBRSxTQUFTO1FBQ2ZDLFFBQVEsRUFBRSxJQUFJO1FBQ2RDLE1BQU0sRUFBRTtVQUNOQyxPQUFPLEVBQUU7WUFDUEMsTUFBTSxFQUFFLEdBQUc7WUFDWEMsbUJBQW1CLEVBQUU7VUFDdkI7UUFDRjtNQUNGLENBQUMsQ0FDRjtNQUNEQyxRQUFRLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztNQUM5QkMsU0FBUyxFQUFUQTtJQUNGLENBQUM7SUFDREMsR0FBRyxFQUFFO01BQ0hkLElBQUksRUFBRSxDQUFDLGtCQUFrQixDQUFDO01BQzFCQyxRQUFRLEVBQUUsQ0FDUjtRQUNFQyxHQUFHLEVBQUU7TUFDUCxDQUFDLENBQ0Y7TUFDREMsT0FBTyxFQUFFLFNBQVM7TUFDbEJDLFVBQVUsRUFBRSxDQUNWO1FBQ0VDLEVBQUUsRUFBRSxPQUFPO1FBQ1hDLElBQUksRUFBRSxNQUFNO1FBQ1pDLFFBQVEsRUFBRSxLQUFLO1FBQ2ZDLE1BQU0sRUFBRTtVQUNOTyxJQUFJLEVBQUU7UUFDUjtNQUNGLENBQUMsRUFDRDtRQUNFVixFQUFFLEVBQUUsT0FBTztRQUNYQyxJQUFJLEVBQUUsT0FBTztRQUNiQyxRQUFRLEVBQUUsS0FBSztRQUNmQyxNQUFNLEVBQUU7VUFDTk8sSUFBSSxFQUFFO1FBQ1I7TUFDRixDQUFDLEVBQ0Q7UUFDRVYsRUFBRSxFQUFFLE9BQU87UUFDWEMsSUFBSSxFQUFFLFFBQVE7UUFDZEMsUUFBUSxFQUFFLEtBQUs7UUFDZlMsV0FBVyxFQUFHLHFFQUFvRTtRQUNsRlIsTUFBTSxFQUFFO1VBQ05PLElBQUksRUFBRSxRQUFRO1VBQ2ROLE9BQU8sRUFBRTtRQUNYO01BQ0YsQ0FBQyxFQUNEO1FBQ0VKLEVBQUUsRUFBRSxPQUFPO1FBQ1hDLElBQUksRUFBRSxRQUFRO1FBQ2RDLFFBQVEsRUFBRSxLQUFLO1FBQ2ZTLFdBQVcsRUFBRyx5R0FBd0c7UUFDdEhSLE1BQU0sRUFBRTtVQUNOTyxJQUFJLEVBQUUsUUFBUTtVQUNkTixPQUFPLEVBQUU7UUFDWDtNQUNGLENBQUMsQ0FDRjtNQUNETyxXQUFXLEVBQ1QsMEVBQTBFO01BRTVFSixRQUFRLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztNQUM5QkMsU0FBUyxFQUFUQTtJQUNGO0VBQ0YsQ0FBQztFQUNELCtCQUErQixFQUFFO0lBQy9CQyxHQUFHLEVBQUU7TUFDSGQsSUFBSSxFQUFFLENBQUMsa0JBQWtCLENBQUM7TUFDMUJDLFFBQVEsRUFBRSxDQUNSO1FBQ0VDLEdBQUcsRUFBRTtNQUNQLENBQUMsQ0FDRjtNQUNEQyxPQUFPLEVBQUUsU0FBUztNQUNsQkMsVUFBVSxFQUFFLENBQ1Y7UUFDRUMsRUFBRSxFQUFFLE1BQU07UUFDVkMsSUFBSSxFQUFFLElBQUk7UUFDVkMsUUFBUSxFQUFFLElBQUk7UUFDZEMsTUFBTSxFQUFFO1VBQ05PLElBQUksRUFBRTtRQUNSO01BQ0YsQ0FBQyxDQUNGO01BQ0RILFFBQVEsRUFBRSxDQUFDLGtCQUFrQixDQUFDO01BQzlCQyxTQUFTLEVBQVRBO0lBQ0Y7RUFDRixDQUFDO0VBRUQsc0NBQXNDLEVBQUU7SUFDdENkLElBQUksRUFBRTtNQUNKQyxJQUFJLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztNQUMxQkMsUUFBUSxFQUFFLENBQ1I7UUFDRUMsR0FBRyxFQUFFO01BQ1AsQ0FBQyxDQUNGO01BQ0RDLE9BQU8sRUFBRSxRQUFRO01BQ2pCQyxVQUFVLEVBQUUsQ0FDVjtRQUNFQyxFQUFFLEVBQUUsTUFBTTtRQUNWQyxJQUFJLEVBQUUsSUFBSTtRQUNWQyxRQUFRLEVBQUUsSUFBSTtRQUNkQyxNQUFNLEVBQUU7VUFDTk8sSUFBSSxFQUFFO1FBQ1I7TUFDRixDQUFDLEVBQ0Q7UUFDRVYsRUFBRSxFQUFFLE1BQU07UUFDVkMsSUFBSSxFQUFFLFNBQVM7UUFDZkMsUUFBUSxFQUFFLElBQUk7UUFDZEMsTUFBTSxFQUFFO1VBQ05DLE9BQU8sRUFBRTtZQUNQUSxRQUFRLEVBQUU7VUFDWjtRQUNGO01BQ0YsQ0FBQyxDQUNGO01BQ0RMLFFBQVEsRUFBRSxDQUFDLGtCQUFrQixDQUFDO01BQzlCQyxTQUFTLEVBQVRBO0lBQ0Y7RUFDRjtBQUNGLENBQUM7QUFBQyxlQUVhZixnQkFBZ0I7QUFBQSJ9