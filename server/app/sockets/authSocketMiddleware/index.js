"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _keys = _interopRequireDefault(require("../../keys"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable no-param-reassign */

const authSocketMiddleware = io => {
  io.use((socket, next) => {
    const {
      token
    } = socket.handshake.query;
    if (!token) {
      return next(new Error('Unauthorized'));
    }
    return _jsonwebtoken.default.verify(token, _keys.default.SECRET_KEY, (err, decoded) => {
      if (err) {
        return next(new Error('Unauthorized'));
      }
      socket.user = decoded;
      return next();
    });
  });
};
var _default = authSocketMiddleware;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJhdXRoU29ja2V0TWlkZGxld2FyZSIsImlvIiwidXNlIiwic29ja2V0IiwibmV4dCIsInRva2VuIiwiaGFuZHNoYWtlIiwicXVlcnkiLCJFcnJvciIsImp3dCIsInZlcmlmeSIsIktleXMiLCJTRUNSRVRfS0VZIiwiZXJyIiwiZGVjb2RlZCIsInVzZXIiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBwL3NvY2tldHMvYXV0aFNvY2tldE1pZGRsZXdhcmUvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cclxuaW1wb3J0IHsgU2VydmVyIH0gZnJvbSAnc29ja2V0LmlvJztcclxuaW1wb3J0IGp3dCBmcm9tICdqc29ud2VidG9rZW4nO1xyXG5pbXBvcnQgeyBTb2NrZXRXaXRoVXNlciB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvc29ja2V0LmludGVyZmFjZSc7XHJcbmltcG9ydCBLZXlzIGZyb20gJy4uLy4uL2tleXMnO1xyXG5cclxuY29uc3QgYXV0aFNvY2tldE1pZGRsZXdhcmUgPSAoaW86IFNlcnZlcikgPT4ge1xyXG4gIGlvLnVzZSgoc29ja2V0OiBTb2NrZXRXaXRoVXNlciwgbmV4dCkgPT4ge1xyXG4gICAgY29uc3QgeyB0b2tlbiB9ID0gc29ja2V0LmhhbmRzaGFrZS5xdWVyeTtcclxuICAgIGlmICghdG9rZW4pIHtcclxuICAgICAgcmV0dXJuIG5leHQobmV3IEVycm9yKCdVbmF1dGhvcml6ZWQnKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gand0LnZlcmlmeShcclxuICAgICAgdG9rZW4gYXMgc3RyaW5nLFxyXG4gICAgICBLZXlzLlNFQ1JFVF9LRVksXHJcbiAgICAgIChlcnIsIGRlY29kZWQpID0+IHtcclxuICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICByZXR1cm4gbmV4dChuZXcgRXJyb3IoJ1VuYXV0aG9yaXplZCcpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc29ja2V0LnVzZXIgPSBkZWNvZGVkIGFzIGFueTtcclxuICAgICAgICByZXR1cm4gbmV4dCgpO1xyXG4gICAgICB9LFxyXG4gICAgKTtcclxuICB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGF1dGhTb2NrZXRNaWRkbGV3YXJlO1xyXG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBO0FBRUE7QUFBOEI7QUFKOUI7O0FBTUEsTUFBTUEsb0JBQW9CLEdBQUlDLEVBQVUsSUFBSztFQUMzQ0EsRUFBRSxDQUFDQyxHQUFHLENBQUMsQ0FBQ0MsTUFBc0IsRUFBRUMsSUFBSSxLQUFLO0lBQ3ZDLE1BQU07TUFBRUM7SUFBTSxDQUFDLEdBQUdGLE1BQU0sQ0FBQ0csU0FBUyxDQUFDQyxLQUFLO0lBQ3hDLElBQUksQ0FBQ0YsS0FBSyxFQUFFO01BQ1YsT0FBT0QsSUFBSSxDQUFDLElBQUlJLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUN4QztJQUNBLE9BQU9DLHFCQUFHLENBQUNDLE1BQU0sQ0FDZkwsS0FBSyxFQUNMTSxhQUFJLENBQUNDLFVBQVUsRUFDZixDQUFDQyxHQUFHLEVBQUVDLE9BQU8sS0FBSztNQUNoQixJQUFJRCxHQUFHLEVBQUU7UUFDUCxPQUFPVCxJQUFJLENBQUMsSUFBSUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO01BQ3hDO01BQ0FMLE1BQU0sQ0FBQ1ksSUFBSSxHQUFHRCxPQUFjO01BQzVCLE9BQU9WLElBQUksRUFBRTtJQUNmLENBQUMsQ0FDRjtFQUNILENBQUMsQ0FBQztBQUNKLENBQUM7QUFBQyxlQUVhSixvQkFBb0I7QUFBQSJ9