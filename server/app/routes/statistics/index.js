"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _auth = _interopRequireDefault(require("../../middlewares/auth.middleware"));
var _StatController = _interopRequireDefault(require("../../controllers/StatController"));
var _statistics = _interopRequireDefault(require("../../validations/statistics"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const statisticsRouter = (0, _express.Router)();
statisticsRouter.get('/income-expenses', _auth.default, _statistics.default.incomeExpenses, _StatController.default.incomeExpense);
statisticsRouter.get('/chart', _auth.default, _statistics.default.incomeExpenses, _StatController.default.getChartData);
var _default = statisticsRouter;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJzdGF0aXN0aWNzUm91dGVyIiwiUm91dGVyIiwiZ2V0IiwiYXV0aE1pZGRsZXdhcmUiLCJTdGF0aXN0aWNzVmFsaWRhdGUiLCJpbmNvbWVFeHBlbnNlcyIsIlN0YXRDb250cm9sbGVyIiwiaW5jb21lRXhwZW5zZSIsImdldENoYXJ0RGF0YSJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcHAvcm91dGVzL3N0YXRpc3RpY3MvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnZXhwcmVzcyc7XHJcbmltcG9ydCBhdXRoTWlkZGxld2FyZSBmcm9tICcuLi8uLi9taWRkbGV3YXJlcy9hdXRoLm1pZGRsZXdhcmUnO1xyXG5pbXBvcnQgU3RhdENvbnRyb2xsZXIgZnJvbSAnLi4vLi4vY29udHJvbGxlcnMvU3RhdENvbnRyb2xsZXInO1xyXG5pbXBvcnQgU3RhdGlzdGljc1ZhbGlkYXRlIGZyb20gJy4uLy4uL3ZhbGlkYXRpb25zL3N0YXRpc3RpY3MnO1xyXG5cclxuY29uc3Qgc3RhdGlzdGljc1JvdXRlciA9IFJvdXRlcigpO1xyXG5cclxuc3RhdGlzdGljc1JvdXRlci5nZXQoXHJcbiAgJy9pbmNvbWUtZXhwZW5zZXMnLFxyXG4gIGF1dGhNaWRkbGV3YXJlLFxyXG4gIFN0YXRpc3RpY3NWYWxpZGF0ZS5pbmNvbWVFeHBlbnNlcyxcclxuICBTdGF0Q29udHJvbGxlci5pbmNvbWVFeHBlbnNlLFxyXG4pO1xyXG5cclxuc3RhdGlzdGljc1JvdXRlci5nZXQoXHJcbiAgJy9jaGFydCcsXHJcbiAgYXV0aE1pZGRsZXdhcmUsXHJcbiAgU3RhdGlzdGljc1ZhbGlkYXRlLmluY29tZUV4cGVuc2VzLFxyXG4gIFN0YXRDb250cm9sbGVyLmdldENoYXJ0RGF0YSxcclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHN0YXRpc3RpY3NSb3V0ZXI7XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBOEQ7QUFFOUQsTUFBTUEsZ0JBQWdCLEdBQUcsSUFBQUMsZUFBTSxHQUFFO0FBRWpDRCxnQkFBZ0IsQ0FBQ0UsR0FBRyxDQUNsQixrQkFBa0IsRUFDbEJDLGFBQWMsRUFDZEMsbUJBQWtCLENBQUNDLGNBQWMsRUFDakNDLHVCQUFjLENBQUNDLGFBQWEsQ0FDN0I7QUFFRFAsZ0JBQWdCLENBQUNFLEdBQUcsQ0FDbEIsUUFBUSxFQUNSQyxhQUFjLEVBQ2RDLG1CQUFrQixDQUFDQyxjQUFjLEVBQ2pDQyx1QkFBYyxDQUFDRSxZQUFZLENBQzVCO0FBQUMsZUFFYVIsZ0JBQWdCO0FBQUEifQ==