"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _auth = _interopRequireDefault(require("../../middlewares/auth.middleware"));
var _SettingController = _interopRequireDefault(require("../../controllers/SettingController"));
var _setting = _interopRequireDefault(require("../../validations/setting"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const settingRouter = (0, _express.Router)();
settingRouter.post('/', _auth.default, _setting.default.create, _SettingController.default.create);
settingRouter.put('/:id', _auth.default, _setting.default.update, _SettingController.default.updateItem);
settingRouter.get('/', _auth.default, _SettingController.default.getAll);
settingRouter.get('/:id', _auth.default, _SettingController.default.getOne);
settingRouter.delete('/:id', _auth.default, _SettingController.default.delete);
var _default = settingRouter;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJzZXR0aW5nUm91dGVyIiwiUm91dGVyIiwicG9zdCIsImF1dGhNaWRkbGV3YXJlIiwiU2V0dGluZ1ZhbGlkYXRlIiwiY3JlYXRlIiwiU2V0dGluZ0NvbnRyb2xsZXIiLCJwdXQiLCJ1cGRhdGUiLCJ1cGRhdGVJdGVtIiwiZ2V0IiwiZ2V0QWxsIiwiZ2V0T25lIiwiZGVsZXRlIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwcC9yb3V0ZXMvc2V0dGluZ3MvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnZXhwcmVzcyc7XHJcbmltcG9ydCBhdXRoTWlkZGxld2FyZSBmcm9tICcuLi8uLi9taWRkbGV3YXJlcy9hdXRoLm1pZGRsZXdhcmUnO1xyXG5pbXBvcnQgU2V0dGluZ0NvbnRyb2xsZXIgZnJvbSAnLi4vLi4vY29udHJvbGxlcnMvU2V0dGluZ0NvbnRyb2xsZXInO1xyXG5pbXBvcnQgU2V0dGluZ1ZhbGlkYXRlIGZyb20gJy4uLy4uL3ZhbGlkYXRpb25zL3NldHRpbmcnO1xyXG5cclxuY29uc3Qgc2V0dGluZ1JvdXRlciA9IFJvdXRlcigpO1xyXG5cclxuc2V0dGluZ1JvdXRlci5wb3N0KFxyXG4gICcvJyxcclxuICBhdXRoTWlkZGxld2FyZSxcclxuICBTZXR0aW5nVmFsaWRhdGUuY3JlYXRlLFxyXG4gIFNldHRpbmdDb250cm9sbGVyLmNyZWF0ZSxcclxuKTtcclxuc2V0dGluZ1JvdXRlci5wdXQoXHJcbiAgJy86aWQnLFxyXG4gIGF1dGhNaWRkbGV3YXJlLFxyXG4gIFNldHRpbmdWYWxpZGF0ZS51cGRhdGUsXHJcbiAgU2V0dGluZ0NvbnRyb2xsZXIudXBkYXRlSXRlbSxcclxuKTtcclxuc2V0dGluZ1JvdXRlci5nZXQoJy8nLCBhdXRoTWlkZGxld2FyZSwgU2V0dGluZ0NvbnRyb2xsZXIuZ2V0QWxsKTtcclxuc2V0dGluZ1JvdXRlci5nZXQoJy86aWQnLCBhdXRoTWlkZGxld2FyZSwgU2V0dGluZ0NvbnRyb2xsZXIuZ2V0T25lKTtcclxuc2V0dGluZ1JvdXRlci5kZWxldGUoXHJcbiAgJy86aWQnLFxyXG4gIGF1dGhNaWRkbGV3YXJlLFxyXG4gIFNldHRpbmdDb250cm9sbGVyLmRlbGV0ZSxcclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHNldHRpbmdSb3V0ZXI7XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBd0Q7QUFFeEQsTUFBTUEsYUFBYSxHQUFHLElBQUFDLGVBQU0sR0FBRTtBQUU5QkQsYUFBYSxDQUFDRSxJQUFJLENBQ2hCLEdBQUcsRUFDSEMsYUFBYyxFQUNkQyxnQkFBZSxDQUFDQyxNQUFNLEVBQ3RCQywwQkFBaUIsQ0FBQ0QsTUFBTSxDQUN6QjtBQUNETCxhQUFhLENBQUNPLEdBQUcsQ0FDZixNQUFNLEVBQ05KLGFBQWMsRUFDZEMsZ0JBQWUsQ0FBQ0ksTUFBTSxFQUN0QkYsMEJBQWlCLENBQUNHLFVBQVUsQ0FDN0I7QUFDRFQsYUFBYSxDQUFDVSxHQUFHLENBQUMsR0FBRyxFQUFFUCxhQUFjLEVBQUVHLDBCQUFpQixDQUFDSyxNQUFNLENBQUM7QUFDaEVYLGFBQWEsQ0FBQ1UsR0FBRyxDQUFDLE1BQU0sRUFBRVAsYUFBYyxFQUFFRywwQkFBaUIsQ0FBQ00sTUFBTSxDQUFDO0FBQ25FWixhQUFhLENBQUNhLE1BQU0sQ0FDbEIsTUFBTSxFQUNOVixhQUFjLEVBQ2RHLDBCQUFpQixDQUFDTyxNQUFNLENBQ3pCO0FBQUMsZUFFYWIsYUFBYTtBQUFBIn0=