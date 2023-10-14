"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default2 = _interopRequireDefault(require("../default.responses"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const users = {
  '/api/v1/auth/login': {
    post: {
      tags: ['Users'],
      security: [],
      summary: 'Signin to PlayInRwanda',
      parameters: [{
        in: 'body',
        name: 'user',
        required: true,
        schema: {
          example: {
            email: 'admin@playinrwanda.com',
            password: 'admin123'
          }
        }
      }],
      consumes: ['application/json'],
      responses: _default2.default
    }
  },
  '/api/v1/auth/signup': {
    post: {
      tags: ['Users'],
      security: [],
      summary: 'Register',
      parameters: [{
        in: 'body',
        name: 'user',
        required: true,
        schema: {
          example: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            password: ''
          }
        }
      }],
      consumes: ['application/json'],
      responses: _default2.default
    }
  },
  '/api/v1/auth/logout': {
    post: {
      tags: ['Users'],
      security: [{
        JWT: []
      }],
      summary: 'Logout',
      parameters: [],
      consumes: ['application/json'],
      responses: _default2.default
    }
  },
  '/auth/forget-password': {
    post: {
      tags: ['Users'],
      security: [],
      summary: 'forget password',
      parameters: [{
        in: 'body',
        name: 'user',
        required: true,
        schema: {
          example: {
            email: 'admin@playinrwanda.com'
          }
        }
      }],
      consumes: ['application/json'],
      responses: _default2.default
    }
  },
  '/auth/reset-password': {
    put: {
      tags: ['Users'],
      security: [],
      summary: 'reset password',
      parameters: [{
        in: 'body',
        name: 'user',
        required: true,
        schema: {
          example: {
            password: '',
            token: ''
          }
        }
      }],
      consumes: ['application/json'],
      responses: _default2.default
    }
  }
};
var _default = users;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ1c2VycyIsInBvc3QiLCJ0YWdzIiwic2VjdXJpdHkiLCJzdW1tYXJ5IiwicGFyYW1ldGVycyIsImluIiwibmFtZSIsInJlcXVpcmVkIiwic2NoZW1hIiwiZXhhbXBsZSIsImVtYWlsIiwicGFzc3dvcmQiLCJjb25zdW1lcyIsInJlc3BvbnNlcyIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwicGhvbmVOdW1iZXIiLCJKV1QiLCJwdXQiLCJ0b2tlbiJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcHAvZG9jcy91c2Vycy9hdXRoLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZXNwb25zZXMgZnJvbSAnLi4vZGVmYXVsdC5yZXNwb25zZXMnO1xyXG5cclxuY29uc3QgdXNlcnMgPSB7XHJcbiAgJy9hcGkvdjEvYXV0aC9sb2dpbic6IHtcclxuICAgIHBvc3Q6IHtcclxuICAgICAgdGFnczogWydVc2VycyddLFxyXG4gICAgICBzZWN1cml0eTogW10sXHJcbiAgICAgIHN1bW1hcnk6ICdTaWduaW4gdG8gUGxheUluUndhbmRhJyxcclxuICAgICAgcGFyYW1ldGVyczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGluOiAnYm9keScsXHJcbiAgICAgICAgICBuYW1lOiAndXNlcicsXHJcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgIHNjaGVtYToge1xyXG4gICAgICAgICAgICBleGFtcGxlOiB7XHJcbiAgICAgICAgICAgICAgZW1haWw6ICdhZG1pbkBwbGF5aW5yd2FuZGEuY29tJyxcclxuICAgICAgICAgICAgICBwYXNzd29yZDogJ2FkbWluMTIzJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgICAgY29uc3VtZXM6IFsnYXBwbGljYXRpb24vanNvbiddLFxyXG4gICAgICByZXNwb25zZXMsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgJy9hcGkvdjEvYXV0aC9zaWdudXAnOiB7XHJcbiAgICBwb3N0OiB7XHJcbiAgICAgIHRhZ3M6IFsnVXNlcnMnXSxcclxuICAgICAgc2VjdXJpdHk6IFtdLFxyXG4gICAgICBzdW1tYXJ5OiAnUmVnaXN0ZXInLFxyXG4gICAgICBwYXJhbWV0ZXJzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaW46ICdib2R5JyxcclxuICAgICAgICAgIG5hbWU6ICd1c2VyJyxcclxuICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgc2NoZW1hOiB7XHJcbiAgICAgICAgICAgIGV4YW1wbGU6IHtcclxuICAgICAgICAgICAgICBmaXJzdE5hbWU6ICcnLFxyXG4gICAgICAgICAgICAgIGxhc3ROYW1lOiAnJyxcclxuICAgICAgICAgICAgICBwaG9uZU51bWJlcjogJycsXHJcbiAgICAgICAgICAgICAgZW1haWw6ICcnLFxyXG4gICAgICAgICAgICAgIHBhc3N3b3JkOiAnJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgICAgY29uc3VtZXM6IFsnYXBwbGljYXRpb24vanNvbiddLFxyXG4gICAgICByZXNwb25zZXMsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgJy9hcGkvdjEvYXV0aC9sb2dvdXQnOiB7XHJcbiAgICBwb3N0OiB7XHJcbiAgICAgIHRhZ3M6IFsnVXNlcnMnXSxcclxuICAgICAgc2VjdXJpdHk6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBKV1Q6IFtdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICAgIHN1bW1hcnk6ICdMb2dvdXQnLFxyXG4gICAgICBwYXJhbWV0ZXJzOiBbXSxcclxuICAgICAgY29uc3VtZXM6IFsnYXBwbGljYXRpb24vanNvbiddLFxyXG4gICAgICByZXNwb25zZXMsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgJy9hdXRoL2ZvcmdldC1wYXNzd29yZCc6IHtcclxuICAgIHBvc3Q6IHtcclxuICAgICAgdGFnczogWydVc2VycyddLFxyXG4gICAgICBzZWN1cml0eTogW10sXHJcbiAgICAgIHN1bW1hcnk6ICdmb3JnZXQgcGFzc3dvcmQnLFxyXG4gICAgICBwYXJhbWV0ZXJzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaW46ICdib2R5JyxcclxuICAgICAgICAgIG5hbWU6ICd1c2VyJyxcclxuICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgc2NoZW1hOiB7XHJcbiAgICAgICAgICAgIGV4YW1wbGU6IHtcclxuICAgICAgICAgICAgICBlbWFpbDogJ2FkbWluQHBsYXlpbnJ3YW5kYS5jb20nLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgICBjb25zdW1lczogWydhcHBsaWNhdGlvbi9qc29uJ10sXHJcbiAgICAgIHJlc3BvbnNlcyxcclxuICAgIH0sXHJcbiAgfSxcclxuICAnL2F1dGgvcmVzZXQtcGFzc3dvcmQnOiB7XHJcbiAgICBwdXQ6IHtcclxuICAgICAgdGFnczogWydVc2VycyddLFxyXG4gICAgICBzZWN1cml0eTogW10sXHJcbiAgICAgIHN1bW1hcnk6ICdyZXNldCBwYXNzd29yZCcsXHJcbiAgICAgIHBhcmFtZXRlcnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpbjogJ2JvZHknLFxyXG4gICAgICAgICAgbmFtZTogJ3VzZXInLFxyXG4gICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICBzY2hlbWE6IHtcclxuICAgICAgICAgICAgZXhhbXBsZToge1xyXG4gICAgICAgICAgICAgIHBhc3N3b3JkOiAnJyxcclxuICAgICAgICAgICAgICB0b2tlbjogJycsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICAgIGNvbnN1bWVzOiBbJ2FwcGxpY2F0aW9uL2pzb24nXSxcclxuICAgICAgcmVzcG9uc2VzLFxyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdXNlcnM7XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFBNkM7QUFFN0MsTUFBTUEsS0FBSyxHQUFHO0VBQ1osb0JBQW9CLEVBQUU7SUFDcEJDLElBQUksRUFBRTtNQUNKQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUM7TUFDZkMsUUFBUSxFQUFFLEVBQUU7TUFDWkMsT0FBTyxFQUFFLHdCQUF3QjtNQUNqQ0MsVUFBVSxFQUFFLENBQ1Y7UUFDRUMsRUFBRSxFQUFFLE1BQU07UUFDVkMsSUFBSSxFQUFFLE1BQU07UUFDWkMsUUFBUSxFQUFFLElBQUk7UUFDZEMsTUFBTSxFQUFFO1VBQ05DLE9BQU8sRUFBRTtZQUNQQyxLQUFLLEVBQUUsd0JBQXdCO1lBQy9CQyxRQUFRLEVBQUU7VUFDWjtRQUNGO01BQ0YsQ0FBQyxDQUNGO01BQ0RDLFFBQVEsRUFBRSxDQUFDLGtCQUFrQixDQUFDO01BQzlCQyxTQUFTLEVBQVRBO0lBQ0Y7RUFDRixDQUFDO0VBQ0QscUJBQXFCLEVBQUU7SUFDckJiLElBQUksRUFBRTtNQUNKQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUM7TUFDZkMsUUFBUSxFQUFFLEVBQUU7TUFDWkMsT0FBTyxFQUFFLFVBQVU7TUFDbkJDLFVBQVUsRUFBRSxDQUNWO1FBQ0VDLEVBQUUsRUFBRSxNQUFNO1FBQ1ZDLElBQUksRUFBRSxNQUFNO1FBQ1pDLFFBQVEsRUFBRSxJQUFJO1FBQ2RDLE1BQU0sRUFBRTtVQUNOQyxPQUFPLEVBQUU7WUFDUEssU0FBUyxFQUFFLEVBQUU7WUFDYkMsUUFBUSxFQUFFLEVBQUU7WUFDWkMsV0FBVyxFQUFFLEVBQUU7WUFDZk4sS0FBSyxFQUFFLEVBQUU7WUFDVEMsUUFBUSxFQUFFO1VBQ1o7UUFDRjtNQUNGLENBQUMsQ0FDRjtNQUNEQyxRQUFRLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztNQUM5QkMsU0FBUyxFQUFUQTtJQUNGO0VBQ0YsQ0FBQztFQUNELHFCQUFxQixFQUFFO0lBQ3JCYixJQUFJLEVBQUU7TUFDSkMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDO01BQ2ZDLFFBQVEsRUFBRSxDQUNSO1FBQ0VlLEdBQUcsRUFBRTtNQUNQLENBQUMsQ0FDRjtNQUNEZCxPQUFPLEVBQUUsUUFBUTtNQUNqQkMsVUFBVSxFQUFFLEVBQUU7TUFDZFEsUUFBUSxFQUFFLENBQUMsa0JBQWtCLENBQUM7TUFDOUJDLFNBQVMsRUFBVEE7SUFDRjtFQUNGLENBQUM7RUFDRCx1QkFBdUIsRUFBRTtJQUN2QmIsSUFBSSxFQUFFO01BQ0pDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQztNQUNmQyxRQUFRLEVBQUUsRUFBRTtNQUNaQyxPQUFPLEVBQUUsaUJBQWlCO01BQzFCQyxVQUFVLEVBQUUsQ0FDVjtRQUNFQyxFQUFFLEVBQUUsTUFBTTtRQUNWQyxJQUFJLEVBQUUsTUFBTTtRQUNaQyxRQUFRLEVBQUUsSUFBSTtRQUNkQyxNQUFNLEVBQUU7VUFDTkMsT0FBTyxFQUFFO1lBQ1BDLEtBQUssRUFBRTtVQUNUO1FBQ0Y7TUFDRixDQUFDLENBQ0Y7TUFDREUsUUFBUSxFQUFFLENBQUMsa0JBQWtCLENBQUM7TUFDOUJDLFNBQVMsRUFBVEE7SUFDRjtFQUNGLENBQUM7RUFDRCxzQkFBc0IsRUFBRTtJQUN0QkssR0FBRyxFQUFFO01BQ0hqQixJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUM7TUFDZkMsUUFBUSxFQUFFLEVBQUU7TUFDWkMsT0FBTyxFQUFFLGdCQUFnQjtNQUN6QkMsVUFBVSxFQUFFLENBQ1Y7UUFDRUMsRUFBRSxFQUFFLE1BQU07UUFDVkMsSUFBSSxFQUFFLE1BQU07UUFDWkMsUUFBUSxFQUFFLElBQUk7UUFDZEMsTUFBTSxFQUFFO1VBQ05DLE9BQU8sRUFBRTtZQUNQRSxRQUFRLEVBQUUsRUFBRTtZQUNaUSxLQUFLLEVBQUU7VUFDVDtRQUNGO01BQ0YsQ0FBQyxDQUNGO01BQ0RQLFFBQVEsRUFBRSxDQUFDLGtCQUFrQixDQUFDO01BQzlCQyxTQUFTLEVBQVRBO0lBQ0Y7RUFDRjtBQUNGLENBQUM7QUFBQyxlQUVhZCxLQUFLO0FBQUEifQ==