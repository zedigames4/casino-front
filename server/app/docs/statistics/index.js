"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default2 = _interopRequireDefault(require("../default.responses"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const statistics = {
  '/api/v1/statistics/income-expenses': {
    get: {
      tags: ['statistics'],
      description: 'Returns the income/expenses for a specified date range',
      security: [{
        JWT: []
      }],
      summary: 'findAll',
      parameters: [{
        in: 'query',
        name: 'startDate',
        description: 'Start date of the date range.',
        required: false,
        schema: {
          type: 'string',
          format: 'date'
        }
      }, {
        in: 'query',
        name: 'endDate',
        description: 'End date of the date range.',
        required: false,
        schema: {
          type: 'string',
          format: 'date'
        }
      }],
      consumes: ['application/json'],
      responses: _default2.default
    }
  },
  '/api/v1/statistics/chart': {
    get: {
      tags: ['statistics'],
      description: 'Returns the income/expenses for a specified date range',
      security: [{
        JWT: []
      }],
      summary: 'findAll',
      parameters: [{
        in: 'query',
        name: 'startDate',
        description: 'Start date of the date range.',
        required: false,
        schema: {
          type: 'string',
          format: 'date'
        }
      }, {
        in: 'query',
        name: 'endDate',
        description: 'End date of the date range.',
        required: false,
        schema: {
          type: 'string',
          format: 'date'
        }
      }],
      consumes: ['application/json'],
      responses: _default2.default
    }
  }
};
var _default = statistics;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJzdGF0aXN0aWNzIiwiZ2V0IiwidGFncyIsImRlc2NyaXB0aW9uIiwic2VjdXJpdHkiLCJKV1QiLCJzdW1tYXJ5IiwicGFyYW1ldGVycyIsImluIiwibmFtZSIsInJlcXVpcmVkIiwic2NoZW1hIiwidHlwZSIsImZvcm1hdCIsImNvbnN1bWVzIiwicmVzcG9uc2VzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwcC9kb2NzL3N0YXRpc3RpY3MvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlc3BvbnNlcyBmcm9tICcuLi9kZWZhdWx0LnJlc3BvbnNlcyc7XHJcblxyXG5jb25zdCBzdGF0aXN0aWNzID0ge1xyXG4gICcvYXBpL3YxL3N0YXRpc3RpY3MvaW5jb21lLWV4cGVuc2VzJzoge1xyXG4gICAgZ2V0OiB7XHJcbiAgICAgIHRhZ3M6IFsnc3RhdGlzdGljcyddLFxyXG4gICAgICBkZXNjcmlwdGlvbjpcclxuICAgICAgICAnUmV0dXJucyB0aGUgaW5jb21lL2V4cGVuc2VzIGZvciBhIHNwZWNpZmllZCBkYXRlIHJhbmdlJyxcclxuICAgICAgc2VjdXJpdHk6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBKV1Q6IFtdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICAgIHN1bW1hcnk6ICdmaW5kQWxsJyxcclxuICAgICAgcGFyYW1ldGVyczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGluOiAncXVlcnknLFxyXG4gICAgICAgICAgbmFtZTogJ3N0YXJ0RGF0ZScsXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ1N0YXJ0IGRhdGUgb2YgdGhlIGRhdGUgcmFuZ2UuJyxcclxuICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcclxuICAgICAgICAgIHNjaGVtYToge1xyXG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcclxuICAgICAgICAgICAgZm9ybWF0OiAnZGF0ZScsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaW46ICdxdWVyeScsXHJcbiAgICAgICAgICBuYW1lOiAnZW5kRGF0ZScsXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ0VuZCBkYXRlIG9mIHRoZSBkYXRlIHJhbmdlLicsXHJcbiAgICAgICAgICByZXF1aXJlZDogZmFsc2UsXHJcbiAgICAgICAgICBzY2hlbWE6IHtcclxuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXHJcbiAgICAgICAgICAgIGZvcm1hdDogJ2RhdGUnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgICBjb25zdW1lczogWydhcHBsaWNhdGlvbi9qc29uJ10sXHJcbiAgICAgIHJlc3BvbnNlcyxcclxuICAgIH0sXHJcbiAgfSxcclxuICAnL2FwaS92MS9zdGF0aXN0aWNzL2NoYXJ0Jzoge1xyXG4gICAgZ2V0OiB7XHJcbiAgICAgIHRhZ3M6IFsnc3RhdGlzdGljcyddLFxyXG4gICAgICBkZXNjcmlwdGlvbjpcclxuICAgICAgICAnUmV0dXJucyB0aGUgaW5jb21lL2V4cGVuc2VzIGZvciBhIHNwZWNpZmllZCBkYXRlIHJhbmdlJyxcclxuICAgICAgc2VjdXJpdHk6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBKV1Q6IFtdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICAgIHN1bW1hcnk6ICdmaW5kQWxsJyxcclxuICAgICAgcGFyYW1ldGVyczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGluOiAncXVlcnknLFxyXG4gICAgICAgICAgbmFtZTogJ3N0YXJ0RGF0ZScsXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ1N0YXJ0IGRhdGUgb2YgdGhlIGRhdGUgcmFuZ2UuJyxcclxuICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcclxuICAgICAgICAgIHNjaGVtYToge1xyXG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcclxuICAgICAgICAgICAgZm9ybWF0OiAnZGF0ZScsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaW46ICdxdWVyeScsXHJcbiAgICAgICAgICBuYW1lOiAnZW5kRGF0ZScsXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ0VuZCBkYXRlIG9mIHRoZSBkYXRlIHJhbmdlLicsXHJcbiAgICAgICAgICByZXF1aXJlZDogZmFsc2UsXHJcbiAgICAgICAgICBzY2hlbWE6IHtcclxuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXHJcbiAgICAgICAgICAgIGZvcm1hdDogJ2RhdGUnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgICBjb25zdW1lczogWydhcHBsaWNhdGlvbi9qc29uJ10sXHJcbiAgICAgIHJlc3BvbnNlcyxcclxuICAgIH0sXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHN0YXRpc3RpY3M7XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFBNkM7QUFFN0MsTUFBTUEsVUFBVSxHQUFHO0VBQ2pCLG9DQUFvQyxFQUFFO0lBQ3BDQyxHQUFHLEVBQUU7TUFDSEMsSUFBSSxFQUFFLENBQUMsWUFBWSxDQUFDO01BQ3BCQyxXQUFXLEVBQ1Qsd0RBQXdEO01BQzFEQyxRQUFRLEVBQUUsQ0FDUjtRQUNFQyxHQUFHLEVBQUU7TUFDUCxDQUFDLENBQ0Y7TUFDREMsT0FBTyxFQUFFLFNBQVM7TUFDbEJDLFVBQVUsRUFBRSxDQUNWO1FBQ0VDLEVBQUUsRUFBRSxPQUFPO1FBQ1hDLElBQUksRUFBRSxXQUFXO1FBQ2pCTixXQUFXLEVBQUUsK0JBQStCO1FBQzVDTyxRQUFRLEVBQUUsS0FBSztRQUNmQyxNQUFNLEVBQUU7VUFDTkMsSUFBSSxFQUFFLFFBQVE7VUFDZEMsTUFBTSxFQUFFO1FBQ1Y7TUFDRixDQUFDLEVBQ0Q7UUFDRUwsRUFBRSxFQUFFLE9BQU87UUFDWEMsSUFBSSxFQUFFLFNBQVM7UUFDZk4sV0FBVyxFQUFFLDZCQUE2QjtRQUMxQ08sUUFBUSxFQUFFLEtBQUs7UUFDZkMsTUFBTSxFQUFFO1VBQ05DLElBQUksRUFBRSxRQUFRO1VBQ2RDLE1BQU0sRUFBRTtRQUNWO01BQ0YsQ0FBQyxDQUNGO01BQ0RDLFFBQVEsRUFBRSxDQUFDLGtCQUFrQixDQUFDO01BQzlCQyxTQUFTLEVBQVRBO0lBQ0Y7RUFDRixDQUFDO0VBQ0QsMEJBQTBCLEVBQUU7SUFDMUJkLEdBQUcsRUFBRTtNQUNIQyxJQUFJLEVBQUUsQ0FBQyxZQUFZLENBQUM7TUFDcEJDLFdBQVcsRUFDVCx3REFBd0Q7TUFDMURDLFFBQVEsRUFBRSxDQUNSO1FBQ0VDLEdBQUcsRUFBRTtNQUNQLENBQUMsQ0FDRjtNQUNEQyxPQUFPLEVBQUUsU0FBUztNQUNsQkMsVUFBVSxFQUFFLENBQ1Y7UUFDRUMsRUFBRSxFQUFFLE9BQU87UUFDWEMsSUFBSSxFQUFFLFdBQVc7UUFDakJOLFdBQVcsRUFBRSwrQkFBK0I7UUFDNUNPLFFBQVEsRUFBRSxLQUFLO1FBQ2ZDLE1BQU0sRUFBRTtVQUNOQyxJQUFJLEVBQUUsUUFBUTtVQUNkQyxNQUFNLEVBQUU7UUFDVjtNQUNGLENBQUMsRUFDRDtRQUNFTCxFQUFFLEVBQUUsT0FBTztRQUNYQyxJQUFJLEVBQUUsU0FBUztRQUNmTixXQUFXLEVBQUUsNkJBQTZCO1FBQzFDTyxRQUFRLEVBQUUsS0FBSztRQUNmQyxNQUFNLEVBQUU7VUFDTkMsSUFBSSxFQUFFLFFBQVE7VUFDZEMsTUFBTSxFQUFFO1FBQ1Y7TUFDRixDQUFDLENBQ0Y7TUFDREMsUUFBUSxFQUFFLENBQUMsa0JBQWtCLENBQUM7TUFDOUJDLFNBQVMsRUFBVEE7SUFDRjtFQUNGO0FBQ0YsQ0FBQztBQUFDLGVBRWFmLFVBQVU7QUFBQSJ9