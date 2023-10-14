"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const removeFile = filenames => {
  try {
    if (Array.isArray(filenames)) {
      for (let i = 0; i < filenames.length; i += 1) {
        const filePath = `uploads/${filenames[i]}`;
        if (_fs.default.existsSync(filePath)) {
          _fs.default.unlinkSync(filePath);
          console.log('File deleted successfully');
        } else {
          console.log('File does not exist');
        }
      }
    } else {
      const filePath = `uploads/${filenames}`;
      if (_fs.default.existsSync(filePath)) {
        _fs.default.unlinkSync(filePath);
        console.log('File deleted successfully');
      } else {
        console.log('File does not exist');
      }
    }
  } catch (error) {
    console.error(error?.message);
  }
};
var _default = removeFile;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZW1vdmVGaWxlIiwiZmlsZW5hbWVzIiwiQXJyYXkiLCJpc0FycmF5IiwiaSIsImxlbmd0aCIsImZpbGVQYXRoIiwiZnMiLCJleGlzdHNTeW5jIiwidW5saW5rU3luYyIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsIm1lc3NhZ2UiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL3V0aWxzL2ZpbGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzJztcclxuXHJcbmNvbnN0IHJlbW92ZUZpbGUgPSAoZmlsZW5hbWVzOiBzdHJpbmcgfCBzdHJpbmdbXSkgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShmaWxlbmFtZXMpKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsZW5hbWVzLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgY29uc3QgZmlsZVBhdGggPSBgdXBsb2Fkcy8ke2ZpbGVuYW1lc1tpXX1gO1xyXG4gICAgICAgIGlmIChmcy5leGlzdHNTeW5jKGZpbGVQYXRoKSkge1xyXG4gICAgICAgICAgZnMudW5saW5rU3luYyhmaWxlUGF0aCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnRmlsZSBkZWxldGVkIHN1Y2Nlc3NmdWxseScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnRmlsZSBkb2VzIG5vdCBleGlzdCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgZmlsZVBhdGggPSBgdXBsb2Fkcy8ke2ZpbGVuYW1lc31gO1xyXG4gICAgICBpZiAoZnMuZXhpc3RzU3luYyhmaWxlUGF0aCkpIHtcclxuICAgICAgICBmcy51bmxpbmtTeW5jKGZpbGVQYXRoKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnRmlsZSBkZWxldGVkIHN1Y2Nlc3NmdWxseScpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdGaWxlIGRvZXMgbm90IGV4aXN0Jyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XHJcbiAgICBjb25zb2xlLmVycm9yKGVycm9yPy5tZXNzYWdlKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCByZW1vdmVGaWxlO1xyXG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQW9CO0FBRXBCLE1BQU1BLFVBQVUsR0FBSUMsU0FBNEIsSUFBSztFQUNuRCxJQUFJO0lBQ0YsSUFBSUMsS0FBSyxDQUFDQyxPQUFPLENBQUNGLFNBQVMsQ0FBQyxFQUFFO01BQzVCLEtBQUssSUFBSUcsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHSCxTQUFTLENBQUNJLE1BQU0sRUFBRUQsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUM1QyxNQUFNRSxRQUFRLEdBQUksV0FBVUwsU0FBUyxDQUFDRyxDQUFDLENBQUUsRUFBQztRQUMxQyxJQUFJRyxXQUFFLENBQUNDLFVBQVUsQ0FBQ0YsUUFBUSxDQUFDLEVBQUU7VUFDM0JDLFdBQUUsQ0FBQ0UsVUFBVSxDQUFDSCxRQUFRLENBQUM7VUFDdkJJLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLDJCQUEyQixDQUFDO1FBQzFDLENBQUMsTUFBTTtVQUNMRCxPQUFPLENBQUNDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQztRQUNwQztNQUNGO0lBQ0YsQ0FBQyxNQUFNO01BQ0wsTUFBTUwsUUFBUSxHQUFJLFdBQVVMLFNBQVUsRUFBQztNQUN2QyxJQUFJTSxXQUFFLENBQUNDLFVBQVUsQ0FBQ0YsUUFBUSxDQUFDLEVBQUU7UUFDM0JDLFdBQUUsQ0FBQ0UsVUFBVSxDQUFDSCxRQUFRLENBQUM7UUFDdkJJLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLDJCQUEyQixDQUFDO01BQzFDLENBQUMsTUFBTTtRQUNMRCxPQUFPLENBQUNDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQztNQUNwQztJQUNGO0VBQ0YsQ0FBQyxDQUFDLE9BQU9DLEtBQVUsRUFBRTtJQUNuQkYsT0FBTyxDQUFDRSxLQUFLLENBQUNBLEtBQUssRUFBRUMsT0FBTyxDQUFDO0VBQy9CO0FBQ0YsQ0FBQztBQUFDLGVBRWFiLFVBQVU7QUFBQSJ9