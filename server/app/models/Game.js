"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const GameSchema = new _mongoose.default.Schema({
  images: {
    type: Array
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  url: {
    type: String
  }
});
GameSchema.set('timestamps', true);
const Game = _mongoose.default.model('Game', GameSchema);
var _default = Game;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJHYW1lU2NoZW1hIiwibW9uZ29vc2UiLCJTY2hlbWEiLCJpbWFnZXMiLCJ0eXBlIiwiQXJyYXkiLCJ0aXRsZSIsIlN0cmluZyIsImRlc2NyaXB0aW9uIiwidXJsIiwic2V0IiwiR2FtZSIsIm1vZGVsIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvR2FtZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xyXG5cclxuY29uc3QgR2FtZVNjaGVtYSA9IG5ldyBtb25nb29zZS5TY2hlbWEoe1xyXG4gIGltYWdlczoge1xyXG4gICAgdHlwZTogQXJyYXk8U3RyaW5nPixcclxuICB9LFxyXG4gIHRpdGxlOiB7XHJcbiAgICB0eXBlOiBTdHJpbmcsXHJcbiAgfSxcclxuICBkZXNjcmlwdGlvbjoge1xyXG4gICAgdHlwZTogU3RyaW5nLFxyXG4gIH0sXHJcbiAgdXJsOiB7XHJcbiAgICB0eXBlOiBTdHJpbmcsXHJcbiAgfSxcclxufSk7XHJcblxyXG5HYW1lU2NoZW1hLnNldCgndGltZXN0YW1wcycsIHRydWUpO1xyXG5cclxuY29uc3QgR2FtZSA9IG1vbmdvb3NlLm1vZGVsKCdHYW1lJywgR2FtZVNjaGVtYSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHYW1lO1xyXG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQWdDO0FBRWhDLE1BQU1BLFVBQVUsR0FBRyxJQUFJQyxpQkFBUSxDQUFDQyxNQUFNLENBQUM7RUFDckNDLE1BQU0sRUFBRTtJQUNOQyxJQUFJLEVBQUVDO0VBQ1IsQ0FBQztFQUNEQyxLQUFLLEVBQUU7SUFDTEYsSUFBSSxFQUFFRztFQUNSLENBQUM7RUFDREMsV0FBVyxFQUFFO0lBQ1hKLElBQUksRUFBRUc7RUFDUixDQUFDO0VBQ0RFLEdBQUcsRUFBRTtJQUNITCxJQUFJLEVBQUVHO0VBQ1I7QUFDRixDQUFDLENBQUM7QUFFRlAsVUFBVSxDQUFDVSxHQUFHLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQztBQUVsQyxNQUFNQyxJQUFJLEdBQUdWLGlCQUFRLENBQUNXLEtBQUssQ0FBQyxNQUFNLEVBQUVaLFVBQVUsQ0FBQztBQUFDLGVBRWpDVyxJQUFJO0FBQUEifQ==