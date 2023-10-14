"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.playGameMiddleware = void 0;
var _Game = _interopRequireDefault(require("../models/Game"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const playGameMiddleware = async (req, res, next) => {
  const {
    gameId
  } = req.params;
  try {
    const game = await _Game.default.findById(gameId);
    if (!game) {
      res.redirect('/404');
    } else {
      next();
    }
  } catch (error) {
    res.redirect('/400');
  }
};
exports.playGameMiddleware = playGameMiddleware;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJwbGF5R2FtZU1pZGRsZXdhcmUiLCJyZXEiLCJyZXMiLCJuZXh0IiwiZ2FtZUlkIiwicGFyYW1zIiwiZ2FtZSIsIkdhbWUiLCJmaW5kQnlJZCIsInJlZGlyZWN0IiwiZXJyb3IiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL21pZGRsZXdhcmVzL3BsYXlHYW1lLm1pZGRsZXdhcmUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dEZ1bmN0aW9uLCBSZXNwb25zZSwgUmVxdWVzdCB9IGZyb20gJ2V4cHJlc3MnO1xyXG5pbXBvcnQgR2FtZSBmcm9tICcuLi9tb2RlbHMvR2FtZSc7XHJcblxyXG5leHBvcnQgY29uc3QgcGxheUdhbWVNaWRkbGV3YXJlID0gYXN5bmMgKFxyXG4gIHJlcTogUmVxdWVzdCxcclxuICByZXM6IFJlc3BvbnNlLFxyXG4gIG5leHQ6IE5leHRGdW5jdGlvbixcclxuKSA9PiB7XHJcbiAgY29uc3QgeyBnYW1lSWQgfSA9IHJlcS5wYXJhbXM7XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBnYW1lID0gYXdhaXQgR2FtZS5maW5kQnlJZChnYW1lSWQpO1xyXG4gICAgaWYgKCFnYW1lKSB7XHJcbiAgICAgIHJlcy5yZWRpcmVjdCgnLzQwNCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbmV4dCgpO1xyXG4gICAgfVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICByZXMucmVkaXJlY3QoJy80MDAnKTtcclxuICB9XHJcbn07XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0E7QUFBa0M7QUFFM0IsTUFBTUEsa0JBQWtCLEdBQUcsT0FDaENDLEdBQVksRUFDWkMsR0FBYSxFQUNiQyxJQUFrQixLQUNmO0VBQ0gsTUFBTTtJQUFFQztFQUFPLENBQUMsR0FBR0gsR0FBRyxDQUFDSSxNQUFNO0VBRTdCLElBQUk7SUFDRixNQUFNQyxJQUFJLEdBQUcsTUFBTUMsYUFBSSxDQUFDQyxRQUFRLENBQUNKLE1BQU0sQ0FBQztJQUN4QyxJQUFJLENBQUNFLElBQUksRUFBRTtNQUNUSixHQUFHLENBQUNPLFFBQVEsQ0FBQyxNQUFNLENBQUM7SUFDdEIsQ0FBQyxNQUFNO01BQ0xOLElBQUksRUFBRTtJQUNSO0VBQ0YsQ0FBQyxDQUFDLE9BQU9PLEtBQUssRUFBRTtJQUNkUixHQUFHLENBQUNPLFFBQVEsQ0FBQyxNQUFNLENBQUM7RUFDdEI7QUFDRixDQUFDO0FBQUMifQ==