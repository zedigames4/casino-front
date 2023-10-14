"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireWildcard(require("express"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const uploadsRouter = (0, _express.Router)();
uploadsRouter.get('*', _express.default.static('uploads'));
var _default = uploadsRouter;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ1cGxvYWRzUm91dGVyIiwiUm91dGVyIiwiZ2V0IiwiZXhwcmVzcyIsInN0YXRpYyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcHAvcm91dGVzL3VwbG9hZHMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MsIHsgUm91dGVyIH0gZnJvbSAnZXhwcmVzcyc7XHJcblxyXG5jb25zdCB1cGxvYWRzUm91dGVyID0gUm91dGVyKCk7XHJcblxyXG51cGxvYWRzUm91dGVyLmdldCgnKicsIGV4cHJlc3Muc3RhdGljKCd1cGxvYWRzJykpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdXBsb2Fkc1JvdXRlcjtcclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUEwQztBQUFBO0FBRTFDLE1BQU1BLGFBQWEsR0FBRyxJQUFBQyxlQUFNLEdBQUU7QUFFOUJELGFBQWEsQ0FBQ0UsR0FBRyxDQUFDLEdBQUcsRUFBRUMsZ0JBQU8sQ0FBQ0MsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQUMsZUFFbkNKLGFBQWE7QUFBQSJ9