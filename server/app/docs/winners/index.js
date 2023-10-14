"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default2 = _interopRequireDefault(require("../default.responses"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const winners = {
  '/api/v1/winners/biggest': {
    get: {
      tags: ['winners'],
      // security: [
      //   {
      //     JWT: [],
      //   },
      // ],
      parameters: [{
        in: 'query',
        name: 'isEncrypted',
        required: false,
        schema: {
          type: 'integer',
          example: 0
        }
      }],
      summary: 'findAll',
      consumes: ['application/json'],
      responses: _default2.default
    }
  },
  '/api/v1/winners/latest': {
    get: {
      tags: ['winners'],
      // security: [
      //   {
      //     JWT: [],
      //   },
      // ],
      // parameters: [
      //   {
      //     in: 'query',
      //     name: 'isEncrypted',
      //     required: false,
      //     schema: {
      //       type: 'integer',
      //       example: 0,
      //     },
      //   },
      // ],
      summary: 'findAll',
      consumes: ['application/json'],
      responses: _default2.default
    }
  }
};
var _default = winners;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ3aW5uZXJzIiwiZ2V0IiwidGFncyIsInBhcmFtZXRlcnMiLCJpbiIsIm5hbWUiLCJyZXF1aXJlZCIsInNjaGVtYSIsInR5cGUiLCJleGFtcGxlIiwic3VtbWFyeSIsImNvbnN1bWVzIiwicmVzcG9uc2VzIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwcC9kb2NzL3dpbm5lcnMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlc3BvbnNlcyBmcm9tICcuLi9kZWZhdWx0LnJlc3BvbnNlcyc7XHJcblxyXG5jb25zdCB3aW5uZXJzID0ge1xyXG4gICcvYXBpL3YxL3dpbm5lcnMvYmlnZ2VzdCc6IHtcclxuICAgIGdldDoge1xyXG4gICAgICB0YWdzOiBbJ3dpbm5lcnMnXSxcclxuICAgICAgLy8gc2VjdXJpdHk6IFtcclxuICAgICAgLy8gICB7XHJcbiAgICAgIC8vICAgICBKV1Q6IFtdLFxyXG4gICAgICAvLyAgIH0sXHJcbiAgICAgIC8vIF0sXHJcbiAgICAgIHBhcmFtZXRlcnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpbjogJ3F1ZXJ5JyxcclxuICAgICAgICAgIG5hbWU6ICdpc0VuY3J5cHRlZCcsXHJcbiAgICAgICAgICByZXF1aXJlZDogZmFsc2UsXHJcbiAgICAgICAgICBzY2hlbWE6IHtcclxuICAgICAgICAgICAgdHlwZTogJ2ludGVnZXInLFxyXG4gICAgICAgICAgICBleGFtcGxlOiAwLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgICBzdW1tYXJ5OiAnZmluZEFsbCcsXHJcbiAgICAgIGNvbnN1bWVzOiBbJ2FwcGxpY2F0aW9uL2pzb24nXSxcclxuICAgICAgcmVzcG9uc2VzLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICAnL2FwaS92MS93aW5uZXJzL2xhdGVzdCc6IHtcclxuICAgIGdldDoge1xyXG4gICAgICB0YWdzOiBbJ3dpbm5lcnMnXSxcclxuICAgICAgLy8gc2VjdXJpdHk6IFtcclxuICAgICAgLy8gICB7XHJcbiAgICAgIC8vICAgICBKV1Q6IFtdLFxyXG4gICAgICAvLyAgIH0sXHJcbiAgICAgIC8vIF0sXHJcbiAgICAgIC8vIHBhcmFtZXRlcnM6IFtcclxuICAgICAgLy8gICB7XHJcbiAgICAgIC8vICAgICBpbjogJ3F1ZXJ5JyxcclxuICAgICAgLy8gICAgIG5hbWU6ICdpc0VuY3J5cHRlZCcsXHJcbiAgICAgIC8vICAgICByZXF1aXJlZDogZmFsc2UsXHJcbiAgICAgIC8vICAgICBzY2hlbWE6IHtcclxuICAgICAgLy8gICAgICAgdHlwZTogJ2ludGVnZXInLFxyXG4gICAgICAvLyAgICAgICBleGFtcGxlOiAwLFxyXG4gICAgICAvLyAgICAgfSxcclxuICAgICAgLy8gICB9LFxyXG4gICAgICAvLyBdLFxyXG4gICAgICBzdW1tYXJ5OiAnZmluZEFsbCcsXHJcbiAgICAgIGNvbnN1bWVzOiBbJ2FwcGxpY2F0aW9uL2pzb24nXSxcclxuICAgICAgcmVzcG9uc2VzLFxyXG4gICAgfSxcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgd2lubmVycztcclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUE2QztBQUU3QyxNQUFNQSxPQUFPLEdBQUc7RUFDZCx5QkFBeUIsRUFBRTtJQUN6QkMsR0FBRyxFQUFFO01BQ0hDLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQztNQUNqQjtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0FDLFVBQVUsRUFBRSxDQUNWO1FBQ0VDLEVBQUUsRUFBRSxPQUFPO1FBQ1hDLElBQUksRUFBRSxhQUFhO1FBQ25CQyxRQUFRLEVBQUUsS0FBSztRQUNmQyxNQUFNLEVBQUU7VUFDTkMsSUFBSSxFQUFFLFNBQVM7VUFDZkMsT0FBTyxFQUFFO1FBQ1g7TUFDRixDQUFDLENBQ0Y7TUFDREMsT0FBTyxFQUFFLFNBQVM7TUFDbEJDLFFBQVEsRUFBRSxDQUFDLGtCQUFrQixDQUFDO01BQzlCQyxTQUFTLEVBQVRBO0lBQ0Y7RUFDRixDQUFDO0VBRUQsd0JBQXdCLEVBQUU7SUFDeEJYLEdBQUcsRUFBRTtNQUNIQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUM7TUFDakI7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7TUFDQVEsT0FBTyxFQUFFLFNBQVM7TUFDbEJDLFFBQVEsRUFBRSxDQUFDLGtCQUFrQixDQUFDO01BQzlCQyxTQUFTLEVBQVRBO0lBQ0Y7RUFDRjtBQUNGLENBQUM7QUFBQyxlQUVhWixPQUFPO0FBQUEifQ==