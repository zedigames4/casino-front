"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const UserSchema = new _mongoose.default.Schema({
  firstName: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'manager'],
    default: 'user'
  },
  lastName: {
    type: String
  },
  verified: {
    type: Boolean,
    default: false
  },
  phoneNumber: {
    type: String
  },
  avatar: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  referralCode: {
    type: String,
    required: true,
    unique: true
  },
  invitedFriends: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User'
  }],
  referrer: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
});
UserSchema.set('timestamps', true);
const User = _mongoose.default.model('User', UserSchema);
var _default = User;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJVc2VyU2NoZW1hIiwibW9uZ29vc2UiLCJTY2hlbWEiLCJmaXJzdE5hbWUiLCJ0eXBlIiwiU3RyaW5nIiwicmVxdWlyZWQiLCJyb2xlIiwiZW51bSIsImRlZmF1bHQiLCJsYXN0TmFtZSIsInZlcmlmaWVkIiwiQm9vbGVhbiIsInBob25lTnVtYmVyIiwiYXZhdGFyIiwiZW1haWwiLCJ1bmlxdWUiLCJwYXNzd29yZCIsInJlZmVycmFsQ29kZSIsImludml0ZWRGcmllbmRzIiwiVHlwZXMiLCJPYmplY3RJZCIsInJlZiIsInJlZmVycmVyIiwic2V0IiwiVXNlciIsIm1vZGVsIl0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9tb2RlbHMvVXNlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xyXG5cclxuY29uc3QgVXNlclNjaGVtYSA9IG5ldyBtb25nb29zZS5TY2hlbWEoe1xyXG4gIGZpcnN0TmFtZToge1xyXG4gICAgdHlwZTogU3RyaW5nLFxyXG4gICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgfSxcclxuICByb2xlOiB7XHJcbiAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICBlbnVtOiBbJ3VzZXInLCAnYWRtaW4nLCAnbWFuYWdlciddLFxyXG4gICAgZGVmYXVsdDogJ3VzZXInLFxyXG4gIH0sXHJcbiAgbGFzdE5hbWU6IHtcclxuICAgIHR5cGU6IFN0cmluZyxcclxuICB9LFxyXG4gIHZlcmlmaWVkOiB7XHJcbiAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgfSxcclxuICBwaG9uZU51bWJlcjoge1xyXG4gICAgdHlwZTogU3RyaW5nLFxyXG4gIH0sXHJcbiAgYXZhdGFyOiB7XHJcbiAgICB0eXBlOiBTdHJpbmcsXHJcbiAgfSxcclxuICBlbWFpbDoge1xyXG4gICAgdHlwZTogU3RyaW5nLFxyXG4gICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICB1bmlxdWU6IHRydWUsXHJcbiAgfSxcclxuICBwYXNzd29yZDoge1xyXG4gICAgdHlwZTogU3RyaW5nLFxyXG4gICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgfSxcclxuICByZWZlcnJhbENvZGU6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSwgdW5pcXVlOiB0cnVlIH0sXHJcbiAgaW52aXRlZEZyaWVuZHM6IFtcclxuICAgIHsgdHlwZTogbW9uZ29vc2UuU2NoZW1hLlR5cGVzLk9iamVjdElkLCByZWY6ICdVc2VyJyB9LFxyXG4gIF0sXHJcbiAgcmVmZXJyZXI6IHtcclxuICAgIHR5cGU6IG1vbmdvb3NlLlNjaGVtYS5UeXBlcy5PYmplY3RJZCxcclxuICAgIHJlZjogJ1VzZXInLFxyXG4gICAgZGVmYXVsdDogbnVsbCxcclxuICB9LFxyXG59KTtcclxuXHJcblVzZXJTY2hlbWEuc2V0KCd0aW1lc3RhbXBzJywgdHJ1ZSk7XHJcblxyXG5jb25zdCBVc2VyID0gbW9uZ29vc2UubW9kZWwoJ1VzZXInLCBVc2VyU2NoZW1hKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFVzZXI7XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFBZ0M7QUFFaEMsTUFBTUEsVUFBVSxHQUFHLElBQUlDLGlCQUFRLENBQUNDLE1BQU0sQ0FBQztFQUNyQ0MsU0FBUyxFQUFFO0lBQ1RDLElBQUksRUFBRUMsTUFBTTtJQUNaQyxRQUFRLEVBQUU7RUFDWixDQUFDO0VBQ0RDLElBQUksRUFBRTtJQUNKSCxJQUFJLEVBQUVDLE1BQU07SUFDWkcsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUM7SUFDbENDLE9BQU8sRUFBRTtFQUNYLENBQUM7RUFDREMsUUFBUSxFQUFFO0lBQ1JOLElBQUksRUFBRUM7RUFDUixDQUFDO0VBQ0RNLFFBQVEsRUFBRTtJQUNSUCxJQUFJLEVBQUVRLE9BQU87SUFDYkgsT0FBTyxFQUFFO0VBQ1gsQ0FBQztFQUNESSxXQUFXLEVBQUU7SUFDWFQsSUFBSSxFQUFFQztFQUNSLENBQUM7RUFDRFMsTUFBTSxFQUFFO0lBQ05WLElBQUksRUFBRUM7RUFDUixDQUFDO0VBQ0RVLEtBQUssRUFBRTtJQUNMWCxJQUFJLEVBQUVDLE1BQU07SUFDWkMsUUFBUSxFQUFFLElBQUk7SUFDZFUsTUFBTSxFQUFFO0VBQ1YsQ0FBQztFQUNEQyxRQUFRLEVBQUU7SUFDUmIsSUFBSSxFQUFFQyxNQUFNO0lBQ1pDLFFBQVEsRUFBRTtFQUNaLENBQUM7RUFDRFksWUFBWSxFQUFFO0lBQUVkLElBQUksRUFBRUMsTUFBTTtJQUFFQyxRQUFRLEVBQUUsSUFBSTtJQUFFVSxNQUFNLEVBQUU7RUFBSyxDQUFDO0VBQzVERyxjQUFjLEVBQUUsQ0FDZDtJQUFFZixJQUFJLEVBQUVILGlCQUFRLENBQUNDLE1BQU0sQ0FBQ2tCLEtBQUssQ0FBQ0MsUUFBUTtJQUFFQyxHQUFHLEVBQUU7RUFBTyxDQUFDLENBQ3REO0VBQ0RDLFFBQVEsRUFBRTtJQUNSbkIsSUFBSSxFQUFFSCxpQkFBUSxDQUFDQyxNQUFNLENBQUNrQixLQUFLLENBQUNDLFFBQVE7SUFDcENDLEdBQUcsRUFBRSxNQUFNO0lBQ1hiLE9BQU8sRUFBRTtFQUNYO0FBQ0YsQ0FBQyxDQUFDO0FBRUZULFVBQVUsQ0FBQ3dCLEdBQUcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDO0FBRWxDLE1BQU1DLElBQUksR0FBR3hCLGlCQUFRLENBQUN5QixLQUFLLENBQUMsTUFBTSxFQUFFMUIsVUFBVSxDQUFDO0FBQUMsZUFFakN5QixJQUFJO0FBQUEifQ==