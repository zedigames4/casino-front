"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default2 = _interopRequireDefault(require("../default.responses"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const subscribers = {
  '/api/v1/subscribers': {
    post: {
      tags: ['subscribers'],
      security: [],
      summary: 'create',
      parameters: [{
        in: 'body',
        name: 'data',
        required: true,
        schema: {
          example: {
            email: 'user@playinrwanda.com'
          }
        }
      }],
      consumes: ['application/json'],
      responses: _default2.default
    },
    get: {
      tags: ['subscribers'],
      security: [{
        JWT: []
      }],
      summary: 'findAll',
      consumes: ['application/json'],
      responses: _default2.default
    }
  },
  '/api/v1/subscribers/{id}': {
    get: {
      tags: ['subscribers'],
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
    put: {
      tags: ['subscribers'],
      security: [{
        JWT: []
      }],
      summary: 'update',
      parameters: [{
        in: 'path',
        name: 'id',
        required: true,
        schema: {
          type: 'string'
        }
      }, {
        in: 'body',
        name: 'user',
        required: true,
        schema: {
          example: {
            email: 'user@playinrwanda.com'
          }
        }
      }],
      consumes: ['application/json'],
      responses: _default2.default
    },
    delete: {
      tags: ['subscribers'],
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
var _default = subscribers;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJzdWJzY3JpYmVycyIsInBvc3QiLCJ0YWdzIiwic2VjdXJpdHkiLCJzdW1tYXJ5IiwicGFyYW1ldGVycyIsImluIiwibmFtZSIsInJlcXVpcmVkIiwic2NoZW1hIiwiZXhhbXBsZSIsImVtYWlsIiwiY29uc3VtZXMiLCJyZXNwb25zZXMiLCJnZXQiLCJKV1QiLCJ0eXBlIiwicHV0IiwiZGVsZXRlIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwcC9kb2NzL3N1YnNjcmliZXIvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlc3BvbnNlcyBmcm9tICcuLi9kZWZhdWx0LnJlc3BvbnNlcyc7XHJcblxyXG5jb25zdCBzdWJzY3JpYmVycyA9IHtcclxuICAnL2FwaS92MS9zdWJzY3JpYmVycyc6IHtcclxuICAgIHBvc3Q6IHtcclxuICAgICAgdGFnczogWydzdWJzY3JpYmVycyddLFxyXG4gICAgICBzZWN1cml0eTogW10sXHJcbiAgICAgIHN1bW1hcnk6ICdjcmVhdGUnLFxyXG4gICAgICBwYXJhbWV0ZXJzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaW46ICdib2R5JyxcclxuICAgICAgICAgIG5hbWU6ICdkYXRhJyxcclxuICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgc2NoZW1hOiB7XHJcbiAgICAgICAgICAgIGV4YW1wbGU6IHtcclxuICAgICAgICAgICAgICBlbWFpbDogJ3VzZXJAcGxheWlucndhbmRhLmNvbScsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICAgIGNvbnN1bWVzOiBbJ2FwcGxpY2F0aW9uL2pzb24nXSxcclxuICAgICAgcmVzcG9uc2VzLFxyXG4gICAgfSxcclxuICAgIGdldDoge1xyXG4gICAgICB0YWdzOiBbJ3N1YnNjcmliZXJzJ10sXHJcbiAgICAgIHNlY3VyaXR5OiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgSldUOiBbXSxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgICBzdW1tYXJ5OiAnZmluZEFsbCcsXHJcbiAgICAgIGNvbnN1bWVzOiBbJ2FwcGxpY2F0aW9uL2pzb24nXSxcclxuICAgICAgcmVzcG9uc2VzLFxyXG4gICAgfSxcclxuICB9LFxyXG4gICcvYXBpL3YxL3N1YnNjcmliZXJzL3tpZH0nOiB7XHJcbiAgICBnZXQ6IHtcclxuICAgICAgdGFnczogWydzdWJzY3JpYmVycyddLFxyXG4gICAgICBzZWN1cml0eTogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIEpXVDogW10sXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgICAgc3VtbWFyeTogJ2ZpbmRPbmUnLFxyXG4gICAgICBwYXJhbWV0ZXJzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaW46ICdwYXRoJyxcclxuICAgICAgICAgIG5hbWU6ICdpZCcsXHJcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgIHNjaGVtYToge1xyXG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgICAgY29uc3VtZXM6IFsnYXBwbGljYXRpb24vanNvbiddLFxyXG4gICAgICByZXNwb25zZXMsXHJcbiAgICB9LFxyXG4gICAgcHV0OiB7XHJcbiAgICAgIHRhZ3M6IFsnc3Vic2NyaWJlcnMnXSxcclxuICAgICAgc2VjdXJpdHk6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBKV1Q6IFtdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICAgIHN1bW1hcnk6ICd1cGRhdGUnLFxyXG4gICAgICBwYXJhbWV0ZXJzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaW46ICdwYXRoJyxcclxuICAgICAgICAgIG5hbWU6ICdpZCcsXHJcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgIHNjaGVtYToge1xyXG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpbjogJ2JvZHknLFxyXG4gICAgICAgICAgbmFtZTogJ3VzZXInLFxyXG4gICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICBzY2hlbWE6IHtcclxuICAgICAgICAgICAgZXhhbXBsZToge1xyXG4gICAgICAgICAgICAgIGVtYWlsOiAndXNlckBwbGF5aW5yd2FuZGEuY29tJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgICAgY29uc3VtZXM6IFsnYXBwbGljYXRpb24vanNvbiddLFxyXG4gICAgICByZXNwb25zZXMsXHJcbiAgICB9LFxyXG4gICAgZGVsZXRlOiB7XHJcbiAgICAgIHRhZ3M6IFsnc3Vic2NyaWJlcnMnXSxcclxuICAgICAgc2VjdXJpdHk6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBKV1Q6IFtdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICAgIHN1bW1hcnk6ICdkZWxldGUnLFxyXG4gICAgICBwYXJhbWV0ZXJzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaW46ICdwYXRoJyxcclxuICAgICAgICAgIG5hbWU6ICdpZCcsXHJcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgIHNjaGVtYToge1xyXG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgICAgY29uc3VtZXM6IFsnYXBwbGljYXRpb24vanNvbiddLFxyXG4gICAgICByZXNwb25zZXMsXHJcbiAgICB9LFxyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzdWJzY3JpYmVycztcclxu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