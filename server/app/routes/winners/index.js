"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _WinnersController = _interopRequireDefault(require("../../controllers/WinnersController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const winnersRouter = (0, _express.Router)();
winnersRouter.get('/biggest', _WinnersController.default.biggest);
winnersRouter.get('/latest', _WinnersController.default.latest);
var _default = winnersRouter;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ3aW5uZXJzUm91dGVyIiwiUm91dGVyIiwiZ2V0IiwiV2lubmVyc0NvbnRyb2xsZXIiLCJiaWdnZXN0IiwibGF0ZXN0Il0sInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwcC9yb3V0ZXMvd2lubmVycy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdleHByZXNzJztcclxuaW1wb3J0IGF1dGhNaWRkbGV3YXJlIGZyb20gJy4uLy4uL21pZGRsZXdhcmVzL2F1dGgubWlkZGxld2FyZSc7XHJcbmltcG9ydCBXaW5uZXJzQ29udHJvbGxlciBmcm9tICcuLi8uLi9jb250cm9sbGVycy9XaW5uZXJzQ29udHJvbGxlcic7XHJcblxyXG5jb25zdCB3aW5uZXJzUm91dGVyID0gUm91dGVyKCk7XHJcblxyXG53aW5uZXJzUm91dGVyLmdldCgnL2JpZ2dlc3QnLCBXaW5uZXJzQ29udHJvbGxlci5iaWdnZXN0KTtcclxuXHJcbndpbm5lcnNSb3V0ZXIuZ2V0KCcvbGF0ZXN0JywgV2lubmVyc0NvbnRyb2xsZXIubGF0ZXN0KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHdpbm5lcnNSb3V0ZXI7XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFFQTtBQUFvRTtBQUVwRSxNQUFNQSxhQUFhLEdBQUcsSUFBQUMsZUFBTSxHQUFFO0FBRTlCRCxhQUFhLENBQUNFLEdBQUcsQ0FBQyxVQUFVLEVBQUVDLDBCQUFpQixDQUFDQyxPQUFPLENBQUM7QUFFeERKLGFBQWEsQ0FBQ0UsR0FBRyxDQUFDLFNBQVMsRUFBRUMsMEJBQWlCLENBQUNFLE1BQU0sQ0FBQztBQUFDLGVBRXhDTCxhQUFhO0FBQUEifQ==