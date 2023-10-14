"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const paths = {
  '/': {
    get: {
      tags: ['Default'],
      summary: 'Default message on server',
      operationId: '',
      requestBody: {
        description: 'default router should return message',
        content: {
          'application/json': {
            schema: {}
          },
          'application/xml': {
            schema: {}
          }
        },
        required: false
      },
      responses: {
        '200': {
          description: 'Message of successful request',
          content: {}
        }
      },
      'x-codegen-request-body-name': 'body'
    }
  }
};
var _default = paths;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJwYXRocyIsImdldCIsInRhZ3MiLCJzdW1tYXJ5Iiwib3BlcmF0aW9uSWQiLCJyZXF1ZXN0Qm9keSIsImRlc2NyaXB0aW9uIiwiY29udGVudCIsInNjaGVtYSIsInJlcXVpcmVkIiwicmVzcG9uc2VzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9kb2NzL2RlZmF1bHQucGF0aHMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcGF0aHMgPSB7XHJcbiAgJy8nOiB7XHJcbiAgICBnZXQ6IHtcclxuICAgICAgdGFnczogWydEZWZhdWx0J10sXHJcbiAgICAgIHN1bW1hcnk6ICdEZWZhdWx0IG1lc3NhZ2Ugb24gc2VydmVyJyxcclxuICAgICAgb3BlcmF0aW9uSWQ6ICcnLFxyXG4gICAgICByZXF1ZXN0Qm9keToge1xyXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnZGVmYXVsdCByb3V0ZXIgc2hvdWxkIHJldHVybiBtZXNzYWdlJyxcclxuICAgICAgICBjb250ZW50OiB7XHJcbiAgICAgICAgICAnYXBwbGljYXRpb24vanNvbic6IHtcclxuICAgICAgICAgICAgc2NoZW1hOiB7fSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAnYXBwbGljYXRpb24veG1sJzoge1xyXG4gICAgICAgICAgICBzY2hlbWE6IHt9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcclxuICAgICAgfSxcclxuICAgICAgcmVzcG9uc2VzOiB7XHJcbiAgICAgICAgJzIwMCc6IHtcclxuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnTWVzc2FnZSBvZiBzdWNjZXNzZnVsIHJlcXVlc3QnLFxyXG4gICAgICAgICAgY29udGVudDoge30sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAgJ3gtY29kZWdlbi1yZXF1ZXN0LWJvZHktbmFtZSc6ICdib2R5JyxcclxuICAgIH0sXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHBhdGhzO1xyXG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE1BQU1BLEtBQUssR0FBRztFQUNaLEdBQUcsRUFBRTtJQUNIQyxHQUFHLEVBQUU7TUFDSEMsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDO01BQ2pCQyxPQUFPLEVBQUUsMkJBQTJCO01BQ3BDQyxXQUFXLEVBQUUsRUFBRTtNQUNmQyxXQUFXLEVBQUU7UUFDWEMsV0FBVyxFQUFFLHNDQUFzQztRQUNuREMsT0FBTyxFQUFFO1VBQ1Asa0JBQWtCLEVBQUU7WUFDbEJDLE1BQU0sRUFBRSxDQUFDO1VBQ1gsQ0FBQztVQUNELGlCQUFpQixFQUFFO1lBQ2pCQSxNQUFNLEVBQUUsQ0FBQztVQUNYO1FBQ0YsQ0FBQztRQUNEQyxRQUFRLEVBQUU7TUFDWixDQUFDO01BQ0RDLFNBQVMsRUFBRTtRQUNULEtBQUssRUFBRTtVQUNMSixXQUFXLEVBQUUsK0JBQStCO1VBQzVDQyxPQUFPLEVBQUUsQ0FBQztRQUNaO01BQ0YsQ0FBQztNQUNELDZCQUE2QixFQUFFO0lBQ2pDO0VBQ0Y7QUFDRixDQUFDO0FBQUMsZUFFYVAsS0FBSztBQUFBIn0=