"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const SettingSchema = new _mongoose.default.Schema({
  user: {
    type: _mongoose.default.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  coinToRwf: {
    type: Number,
    required: true,
    default: 1079.04
  },
  isGlobal: {
    type: Boolean,
    default: false
  }
});
SettingSchema.set('timestamps', true);
const Setting = _mongoose.default.model('Setting', SettingSchema);
var _default = Setting;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTZXR0aW5nU2NoZW1hIiwibW9uZ29vc2UiLCJTY2hlbWEiLCJ1c2VyIiwidHlwZSIsIlR5cGVzIiwiT2JqZWN0SWQiLCJyZWYiLCJyZXF1aXJlZCIsInVuaXF1ZSIsImNvaW5Ub1J3ZiIsIk51bWJlciIsImRlZmF1bHQiLCJpc0dsb2JhbCIsIkJvb2xlYW4iLCJzZXQiLCJTZXR0aW5nIiwibW9kZWwiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL21vZGVscy9TZXR0aW5nLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XHJcblxyXG5jb25zdCBTZXR0aW5nU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYSh7XHJcbiAgdXNlcjoge1xyXG4gICAgdHlwZTogbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWQsXHJcbiAgICByZWY6ICdVc2VyJyxcclxuICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgdW5pcXVlOiB0cnVlLFxyXG4gIH0sXHJcbiAgY29pblRvUndmOiB7XHJcbiAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgIGRlZmF1bHQ6IDEwNzkuMDQsXHJcbiAgfSxcclxuICBpc0dsb2JhbDoge1xyXG4gICAgdHlwZTogQm9vbGVhbixcclxuICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gIH0sXHJcbn0pO1xyXG5cclxuU2V0dGluZ1NjaGVtYS5zZXQoJ3RpbWVzdGFtcHMnLCB0cnVlKTtcclxuXHJcbmNvbnN0IFNldHRpbmcgPSBtb25nb29zZS5tb2RlbCgnU2V0dGluZycsIFNldHRpbmdTY2hlbWEpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2V0dGluZztcclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUFnQztBQUVoQyxNQUFNQSxhQUFhLEdBQUcsSUFBSUMsaUJBQVEsQ0FBQ0MsTUFBTSxDQUFDO0VBQ3hDQyxJQUFJLEVBQUU7SUFDSkMsSUFBSSxFQUFFSCxpQkFBUSxDQUFDSSxLQUFLLENBQUNDLFFBQVE7SUFDN0JDLEdBQUcsRUFBRSxNQUFNO0lBQ1hDLFFBQVEsRUFBRSxJQUFJO0lBQ2RDLE1BQU0sRUFBRTtFQUNWLENBQUM7RUFDREMsU0FBUyxFQUFFO0lBQ1ROLElBQUksRUFBRU8sTUFBTTtJQUNaSCxRQUFRLEVBQUUsSUFBSTtJQUNkSSxPQUFPLEVBQUU7RUFDWCxDQUFDO0VBQ0RDLFFBQVEsRUFBRTtJQUNSVCxJQUFJLEVBQUVVLE9BQU87SUFDYkYsT0FBTyxFQUFFO0VBQ1g7QUFDRixDQUFDLENBQUM7QUFFRlosYUFBYSxDQUFDZSxHQUFHLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQztBQUVyQyxNQUFNQyxPQUFPLEdBQUdmLGlCQUFRLENBQUNnQixLQUFLLENBQUMsU0FBUyxFQUFFakIsYUFBYSxDQUFDO0FBQUMsZUFFMUNnQixPQUFPO0FBQUEifQ==