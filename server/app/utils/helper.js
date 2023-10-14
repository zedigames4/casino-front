"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isRoleAllowed = exports.imageUrl = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _keys = _interopRequireDefault(require("../keys"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const isRoleAllowed = role => ['admin', 'manager'].includes(role);
exports.isRoleAllowed = isRoleAllowed;
const imageUrl = filename => {
  const filePath = `uploads/${filename}`;
  if (!filename || !_fs.default.existsSync(filePath)) {
    return null;
  }
  return `${_keys.default.HOST}/${filePath}`;
};
exports.imageUrl = imageUrl;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJpc1JvbGVBbGxvd2VkIiwicm9sZSIsImluY2x1ZGVzIiwiaW1hZ2VVcmwiLCJmaWxlbmFtZSIsImZpbGVQYXRoIiwiZnMiLCJleGlzdHNTeW5jIiwiS2V5cyIsIkhPU1QiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL3V0aWxzL2hlbHBlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSAnZnMnO1xyXG5pbXBvcnQgS2V5cyBmcm9tICcuLi9rZXlzJztcclxuXHJcbmV4cG9ydCBjb25zdCBpc1JvbGVBbGxvd2VkID0gKHJvbGU6IHN0cmluZykgPT5cclxuICBbJ2FkbWluJywgJ21hbmFnZXInXS5pbmNsdWRlcyhyb2xlKTtcclxuXHJcbmV4cG9ydCBjb25zdCBpbWFnZVVybCA9IChmaWxlbmFtZTogc3RyaW5nKSA9PiB7XHJcbiAgY29uc3QgZmlsZVBhdGggPSBgdXBsb2Fkcy8ke2ZpbGVuYW1lfWA7XHJcbiAgaWYgKCFmaWxlbmFtZSB8fCAhZnMuZXhpc3RzU3luYyhmaWxlUGF0aCkpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuICByZXR1cm4gYCR7S2V5cy5IT1NUfS8ke2ZpbGVQYXRofWA7XHJcbn07XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUEyQjtBQUVwQixNQUFNQSxhQUFhLEdBQUlDLElBQVksSUFDeEMsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUNDLFFBQVEsQ0FBQ0QsSUFBSSxDQUFDO0FBQUM7QUFFL0IsTUFBTUUsUUFBUSxHQUFJQyxRQUFnQixJQUFLO0VBQzVDLE1BQU1DLFFBQVEsR0FBSSxXQUFVRCxRQUFTLEVBQUM7RUFDdEMsSUFBSSxDQUFDQSxRQUFRLElBQUksQ0FBQ0UsV0FBRSxDQUFDQyxVQUFVLENBQUNGLFFBQVEsQ0FBQyxFQUFFO0lBQ3pDLE9BQU8sSUFBSTtFQUNiO0VBQ0EsT0FBUSxHQUFFRyxhQUFJLENBQUNDLElBQUssSUFBR0osUUFBUyxFQUFDO0FBQ25DLENBQUM7QUFBQyJ9