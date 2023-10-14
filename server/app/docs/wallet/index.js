"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default2 = _interopRequireDefault(require("../default.responses"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const wallets = {
  '/api/v1/wallets': {
    post: {
      tags: ['wallets'],
      security: [{
        JWT: []
      }],
      summary: 'create',
      consumes: ['application/json'],
      responses: _default2.default
    },
    get: {
      tags: ['wallets'],
      security: [{
        JWT: []
      }],
      summary: 'findAll',
      consumes: ['application/json'],
      responses: _default2.default
    }
  },
  '/api/v1/wallets/{id}': {
    get: {
      tags: ['wallets'],
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
  '/api/v1/wallets/{id}/main-wallet': {
    post: {
      tags: ['wallets'],
      security: [{
        JWT: []
      }],
      summary: 'set main wallet',
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
  '/api/v1/wallets/{id}/minimum-balance': {
    post: {
      tags: ['wallets'],
      security: [{
        JWT: []
      }],
      summary: 'set minimum balance',
      parameters: [{
        in: 'path',
        name: 'id',
        required: true,
        schema: {
          type: 'string'
        }
      }, {
        in: 'body',
        name: 'wallet',
        required: true,
        schema: {
          example: {
            minimumBalance: 0
          }
        }
      }],
      consumes: ['application/json'],
      responses: _default2.default
    }
  }
};
var _default = wallets;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ3YWxsZXRzIiwicG9zdCIsInRhZ3MiLCJzZWN1cml0eSIsIkpXVCIsInN1bW1hcnkiLCJjb25zdW1lcyIsInJlc3BvbnNlcyIsImdldCIsInBhcmFtZXRlcnMiLCJpbiIsIm5hbWUiLCJyZXF1aXJlZCIsInNjaGVtYSIsInR5cGUiLCJleGFtcGxlIiwibWluaW11bUJhbGFuY2UiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBwL2RvY3Mvd2FsbGV0L2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZXNwb25zZXMgZnJvbSAnLi4vZGVmYXVsdC5yZXNwb25zZXMnO1xyXG5cclxuY29uc3Qgd2FsbGV0cyA9IHtcclxuICAnL2FwaS92MS93YWxsZXRzJzoge1xyXG4gICAgcG9zdDoge1xyXG4gICAgICB0YWdzOiBbJ3dhbGxldHMnXSxcclxuICAgICAgc2VjdXJpdHk6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBKV1Q6IFtdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICAgIHN1bW1hcnk6ICdjcmVhdGUnLFxyXG4gICAgICBjb25zdW1lczogWydhcHBsaWNhdGlvbi9qc29uJ10sXHJcbiAgICAgIHJlc3BvbnNlcyxcclxuICAgIH0sXHJcbiAgICBnZXQ6IHtcclxuICAgICAgdGFnczogWyd3YWxsZXRzJ10sXHJcbiAgICAgIHNlY3VyaXR5OiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgSldUOiBbXSxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgICBzdW1tYXJ5OiAnZmluZEFsbCcsXHJcbiAgICAgIGNvbnN1bWVzOiBbJ2FwcGxpY2F0aW9uL2pzb24nXSxcclxuICAgICAgcmVzcG9uc2VzLFxyXG4gICAgfSxcclxuICB9LFxyXG4gICcvYXBpL3YxL3dhbGxldHMve2lkfSc6IHtcclxuICAgIGdldDoge1xyXG4gICAgICB0YWdzOiBbJ3dhbGxldHMnXSxcclxuICAgICAgc2VjdXJpdHk6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBKV1Q6IFtdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICAgIHN1bW1hcnk6ICdmaW5kT25lJyxcclxuICAgICAgcGFyYW1ldGVyczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGluOiAncGF0aCcsXHJcbiAgICAgICAgICBuYW1lOiAnaWQnLFxyXG4gICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICBzY2hlbWE6IHtcclxuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICAgIGNvbnN1bWVzOiBbJ2FwcGxpY2F0aW9uL2pzb24nXSxcclxuICAgICAgcmVzcG9uc2VzLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICAnL2FwaS92MS93YWxsZXRzL3tpZH0vbWFpbi13YWxsZXQnOiB7XHJcbiAgICBwb3N0OiB7XHJcbiAgICAgIHRhZ3M6IFsnd2FsbGV0cyddLFxyXG4gICAgICBzZWN1cml0eTogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIEpXVDogW10sXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgICAgc3VtbWFyeTogJ3NldCBtYWluIHdhbGxldCcsXHJcbiAgICAgIHBhcmFtZXRlcnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpbjogJ3BhdGgnLFxyXG4gICAgICAgICAgbmFtZTogJ2lkJyxcclxuICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgc2NoZW1hOiB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgICBjb25zdW1lczogWydhcHBsaWNhdGlvbi9qc29uJ10sXHJcbiAgICAgIHJlc3BvbnNlcyxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgJy9hcGkvdjEvd2FsbGV0cy97aWR9L21pbmltdW0tYmFsYW5jZSc6IHtcclxuICAgIHBvc3Q6IHtcclxuICAgICAgdGFnczogWyd3YWxsZXRzJ10sXHJcbiAgICAgIHNlY3VyaXR5OiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgSldUOiBbXSxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgICBzdW1tYXJ5OiAnc2V0IG1pbmltdW0gYmFsYW5jZScsXHJcbiAgICAgIHBhcmFtZXRlcnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpbjogJ3BhdGgnLFxyXG4gICAgICAgICAgbmFtZTogJ2lkJyxcclxuICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgc2NoZW1hOiB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGluOiAnYm9keScsXHJcbiAgICAgICAgICBuYW1lOiAnd2FsbGV0JyxcclxuICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgc2NoZW1hOiB7XHJcbiAgICAgICAgICAgIGV4YW1wbGU6IHtcclxuICAgICAgICAgICAgICBtaW5pbXVtQmFsYW5jZTogMCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgICAgY29uc3VtZXM6IFsnYXBwbGljYXRpb24vanNvbiddLFxyXG4gICAgICByZXNwb25zZXMsXHJcbiAgICB9LFxyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB3YWxsZXRzO1xyXG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQTZDO0FBRTdDLE1BQU1BLE9BQU8sR0FBRztFQUNkLGlCQUFpQixFQUFFO0lBQ2pCQyxJQUFJLEVBQUU7TUFDSkMsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDO01BQ2pCQyxRQUFRLEVBQUUsQ0FDUjtRQUNFQyxHQUFHLEVBQUU7TUFDUCxDQUFDLENBQ0Y7TUFDREMsT0FBTyxFQUFFLFFBQVE7TUFDakJDLFFBQVEsRUFBRSxDQUFDLGtCQUFrQixDQUFDO01BQzlCQyxTQUFTLEVBQVRBO0lBQ0YsQ0FBQztJQUNEQyxHQUFHLEVBQUU7TUFDSE4sSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDO01BQ2pCQyxRQUFRLEVBQUUsQ0FDUjtRQUNFQyxHQUFHLEVBQUU7TUFDUCxDQUFDLENBQ0Y7TUFDREMsT0FBTyxFQUFFLFNBQVM7TUFDbEJDLFFBQVEsRUFBRSxDQUFDLGtCQUFrQixDQUFDO01BQzlCQyxTQUFTLEVBQVRBO0lBQ0Y7RUFDRixDQUFDO0VBQ0Qsc0JBQXNCLEVBQUU7SUFDdEJDLEdBQUcsRUFBRTtNQUNITixJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUM7TUFDakJDLFFBQVEsRUFBRSxDQUNSO1FBQ0VDLEdBQUcsRUFBRTtNQUNQLENBQUMsQ0FDRjtNQUNEQyxPQUFPLEVBQUUsU0FBUztNQUNsQkksVUFBVSxFQUFFLENBQ1Y7UUFDRUMsRUFBRSxFQUFFLE1BQU07UUFDVkMsSUFBSSxFQUFFLElBQUk7UUFDVkMsUUFBUSxFQUFFLElBQUk7UUFDZEMsTUFBTSxFQUFFO1VBQ05DLElBQUksRUFBRTtRQUNSO01BQ0YsQ0FBQyxDQUNGO01BQ0RSLFFBQVEsRUFBRSxDQUFDLGtCQUFrQixDQUFDO01BQzlCQyxTQUFTLEVBQVRBO0lBQ0Y7RUFDRixDQUFDO0VBRUQsa0NBQWtDLEVBQUU7SUFDbENOLElBQUksRUFBRTtNQUNKQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUM7TUFDakJDLFFBQVEsRUFBRSxDQUNSO1FBQ0VDLEdBQUcsRUFBRTtNQUNQLENBQUMsQ0FDRjtNQUNEQyxPQUFPLEVBQUUsaUJBQWlCO01BQzFCSSxVQUFVLEVBQUUsQ0FDVjtRQUNFQyxFQUFFLEVBQUUsTUFBTTtRQUNWQyxJQUFJLEVBQUUsSUFBSTtRQUNWQyxRQUFRLEVBQUUsSUFBSTtRQUNkQyxNQUFNLEVBQUU7VUFDTkMsSUFBSSxFQUFFO1FBQ1I7TUFDRixDQUFDLENBQ0Y7TUFDRFIsUUFBUSxFQUFFLENBQUMsa0JBQWtCLENBQUM7TUFDOUJDLFNBQVMsRUFBVEE7SUFDRjtFQUNGLENBQUM7RUFFRCxzQ0FBc0MsRUFBRTtJQUN0Q04sSUFBSSxFQUFFO01BQ0pDLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQztNQUNqQkMsUUFBUSxFQUFFLENBQ1I7UUFDRUMsR0FBRyxFQUFFO01BQ1AsQ0FBQyxDQUNGO01BQ0RDLE9BQU8sRUFBRSxxQkFBcUI7TUFDOUJJLFVBQVUsRUFBRSxDQUNWO1FBQ0VDLEVBQUUsRUFBRSxNQUFNO1FBQ1ZDLElBQUksRUFBRSxJQUFJO1FBQ1ZDLFFBQVEsRUFBRSxJQUFJO1FBQ2RDLE1BQU0sRUFBRTtVQUNOQyxJQUFJLEVBQUU7UUFDUjtNQUNGLENBQUMsRUFDRDtRQUNFSixFQUFFLEVBQUUsTUFBTTtRQUNWQyxJQUFJLEVBQUUsUUFBUTtRQUNkQyxRQUFRLEVBQUUsSUFBSTtRQUNkQyxNQUFNLEVBQUU7VUFDTkUsT0FBTyxFQUFFO1lBQ1BDLGNBQWMsRUFBRTtVQUNsQjtRQUNGO01BQ0YsQ0FBQyxDQUNGO01BQ0RWLFFBQVEsRUFBRSxDQUFDLGtCQUFrQixDQUFDO01BQzlCQyxTQUFTLEVBQVRBO0lBQ0Y7RUFDRjtBQUNGLENBQUM7QUFBQyxlQUVhUCxPQUFPO0FBQUEifQ==