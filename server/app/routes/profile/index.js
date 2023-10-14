"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _auth = _interopRequireDefault(require("../../middlewares/auth.middleware"));
var _ProfileController = _interopRequireDefault(require("../../controllers/ProfileController"));
var _upload = _interopRequireDefault(require("../../utils/upload"));
var _profile = _interopRequireDefault(require("../../validations/profile"));
var _WalletController = _interopRequireDefault(require("../../controllers/WalletController"));
var _wallet = _interopRequireDefault(require("../../validations/wallet"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const profileRouter = (0, _express.Router)();
profileRouter.get('/me', _auth.default, _ProfileController.default.getOne);
profileRouter.get('/me/wallet', _auth.default, _WalletController.default.getMyWallet);
// profileRouter.post(
//   '/me/topup',
//   authMiddleware,
//   WalletValidate.topup,
//   WalletController.topup,
// );
profileRouter.post('/me/withdraw', _auth.default, _wallet.default.withdraw, _WalletController.default.withdraw);
profileRouter.put('/me', _auth.default, _upload.default.single('avatar'), _profile.default.update, _ProfileController.default.updateItem);
profileRouter.delete('/me', _auth.default, _ProfileController.default.delete);
profileRouter.patch('/me/referral-code', _auth.default, _ProfileController.default.updateReferralCode);
var _default = profileRouter;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJwcm9maWxlUm91dGVyIiwiUm91dGVyIiwiZ2V0IiwiYXV0aE1pZGRsZXdhcmUiLCJQcm9maWxlQ29udHJvbGxlciIsImdldE9uZSIsIldhbGxldENvbnRyb2xsZXIiLCJnZXRNeVdhbGxldCIsInBvc3QiLCJXYWxsZXRWYWxpZGF0ZSIsIndpdGhkcmF3IiwicHV0IiwidXBsb2FkIiwic2luZ2xlIiwiUHJvZmlsZVZhbGlkYXRlIiwidXBkYXRlIiwidXBkYXRlSXRlbSIsImRlbGV0ZSIsInBhdGNoIiwidXBkYXRlUmVmZXJyYWxDb2RlIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwcC9yb3V0ZXMvcHJvZmlsZS9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdleHByZXNzJztcclxuaW1wb3J0IGF1dGhNaWRkbGV3YXJlIGZyb20gJy4uLy4uL21pZGRsZXdhcmVzL2F1dGgubWlkZGxld2FyZSc7XHJcbmltcG9ydCBQcm9maWxlQ29udHJvbGxlciBmcm9tICcuLi8uLi9jb250cm9sbGVycy9Qcm9maWxlQ29udHJvbGxlcic7XHJcbmltcG9ydCB1cGxvYWQgZnJvbSAnLi4vLi4vdXRpbHMvdXBsb2FkJztcclxuaW1wb3J0IFByb2ZpbGVWYWxpZGF0ZSBmcm9tICcuLi8uLi92YWxpZGF0aW9ucy9wcm9maWxlJztcclxuaW1wb3J0IFdhbGxldENvbnRyb2xsZXIgZnJvbSAnLi4vLi4vY29udHJvbGxlcnMvV2FsbGV0Q29udHJvbGxlcic7XHJcbmltcG9ydCBXYWxsZXRWYWxpZGF0ZSBmcm9tICcuLi8uLi92YWxpZGF0aW9ucy93YWxsZXQnO1xyXG5cclxuY29uc3QgcHJvZmlsZVJvdXRlciA9IFJvdXRlcigpO1xyXG5cclxucHJvZmlsZVJvdXRlci5nZXQoJy9tZScsIGF1dGhNaWRkbGV3YXJlLCBQcm9maWxlQ29udHJvbGxlci5nZXRPbmUpO1xyXG5wcm9maWxlUm91dGVyLmdldChcclxuICAnL21lL3dhbGxldCcsXHJcbiAgYXV0aE1pZGRsZXdhcmUsXHJcbiAgV2FsbGV0Q29udHJvbGxlci5nZXRNeVdhbGxldCxcclxuKTtcclxuLy8gcHJvZmlsZVJvdXRlci5wb3N0KFxyXG4vLyAgICcvbWUvdG9wdXAnLFxyXG4vLyAgIGF1dGhNaWRkbGV3YXJlLFxyXG4vLyAgIFdhbGxldFZhbGlkYXRlLnRvcHVwLFxyXG4vLyAgIFdhbGxldENvbnRyb2xsZXIudG9wdXAsXHJcbi8vICk7XHJcbnByb2ZpbGVSb3V0ZXIucG9zdChcclxuICAnL21lL3dpdGhkcmF3JyxcclxuICBhdXRoTWlkZGxld2FyZSxcclxuICBXYWxsZXRWYWxpZGF0ZS53aXRoZHJhdyxcclxuICBXYWxsZXRDb250cm9sbGVyLndpdGhkcmF3LFxyXG4pO1xyXG5wcm9maWxlUm91dGVyLnB1dChcclxuICAnL21lJyxcclxuICBhdXRoTWlkZGxld2FyZSxcclxuICB1cGxvYWQuc2luZ2xlKCdhdmF0YXInKSxcclxuICBQcm9maWxlVmFsaWRhdGUudXBkYXRlLFxyXG4gIFByb2ZpbGVDb250cm9sbGVyLnVwZGF0ZUl0ZW0sXHJcbik7XHJcbnByb2ZpbGVSb3V0ZXIuZGVsZXRlKCcvbWUnLCBhdXRoTWlkZGxld2FyZSwgUHJvZmlsZUNvbnRyb2xsZXIuZGVsZXRlKTtcclxucHJvZmlsZVJvdXRlci5wYXRjaChcclxuICAnL21lL3JlZmVycmFsLWNvZGUnLFxyXG4gIGF1dGhNaWRkbGV3YXJlLFxyXG4gIFByb2ZpbGVDb250cm9sbGVyLnVwZGF0ZVJlZmVycmFsQ29kZSxcclxuKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByb2ZpbGVSb3V0ZXI7XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBc0Q7QUFFdEQsTUFBTUEsYUFBYSxHQUFHLElBQUFDLGVBQU0sR0FBRTtBQUU5QkQsYUFBYSxDQUFDRSxHQUFHLENBQUMsS0FBSyxFQUFFQyxhQUFjLEVBQUVDLDBCQUFpQixDQUFDQyxNQUFNLENBQUM7QUFDbEVMLGFBQWEsQ0FBQ0UsR0FBRyxDQUNmLFlBQVksRUFDWkMsYUFBYyxFQUNkRyx5QkFBZ0IsQ0FBQ0MsV0FBVyxDQUM3QjtBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBUCxhQUFhLENBQUNRLElBQUksQ0FDaEIsY0FBYyxFQUNkTCxhQUFjLEVBQ2RNLGVBQWMsQ0FBQ0MsUUFBUSxFQUN2QkoseUJBQWdCLENBQUNJLFFBQVEsQ0FDMUI7QUFDRFYsYUFBYSxDQUFDVyxHQUFHLENBQ2YsS0FBSyxFQUNMUixhQUFjLEVBQ2RTLGVBQU0sQ0FBQ0MsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUN2QkMsZ0JBQWUsQ0FBQ0MsTUFBTSxFQUN0QlgsMEJBQWlCLENBQUNZLFVBQVUsQ0FDN0I7QUFDRGhCLGFBQWEsQ0FBQ2lCLE1BQU0sQ0FBQyxLQUFLLEVBQUVkLGFBQWMsRUFBRUMsMEJBQWlCLENBQUNhLE1BQU0sQ0FBQztBQUNyRWpCLGFBQWEsQ0FBQ2tCLEtBQUssQ0FDakIsbUJBQW1CLEVBQ25CZixhQUFjLEVBQ2RDLDBCQUFpQixDQUFDZSxrQkFBa0IsQ0FDckM7QUFBQyxlQUVhbkIsYUFBYTtBQUFBIn0=