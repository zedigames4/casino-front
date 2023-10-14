"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _bets = _interopRequireDefault(require("./bets"));
var _default2 = _interopRequireDefault(require("./default.paths"));
var _game = _interopRequireDefault(require("./games/game"));
var _mtn = _interopRequireDefault(require("./mtn"));
var _oltranz = _interopRequireDefault(require("./oltranz"));
var _profile = _interopRequireDefault(require("./profile"));
var _settings = _interopRequireDefault(require("./settings/settings"));
var _statistics = _interopRequireDefault(require("./statistics"));
var _subscriber = _interopRequireDefault(require("./subscriber"));
var _transactions = _interopRequireDefault(require("./transactions/transactions"));
var _transfers = _interopRequireDefault(require("./transfers/transfers"));
var _auth = _interopRequireDefault(require("./users/auth"));
var _users = _interopRequireDefault(require("./users/users"));
var _wallet = _interopRequireDefault(require("./wallet"));
var _winners = _interopRequireDefault(require("./winners"));
var _transfers2 = _interopRequireDefault(require("./withdrawrequests/transfers"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const paths = _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, _default2.default), _auth.default), _users.default), _game.default), _wallet.default), _subscriber.default), _mtn.default), _bets.default), _profile.default), _transactions.default), _settings.default), _statistics.default), _oltranz.default), _transfers.default), _transfers2.default), _winners.default);
const config = {
  swagger: '2.0',
  info: {
    version: '1.0.0.',
    title: 'Casino APIs Documentation',
    description: ''
  },
  basePath: '/',
  schemes: ['http', 'https'],
  securityDefinitions: {
    JWT: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  },
  tags: [{
    name: 'Casino APIs Documentation'
  }],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths
};
var _default = config;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJwYXRocyIsImRlZmF1bHRQYXRocyIsImF1dGgiLCJ1c2VycyIsImdhbWVzIiwid2FsbGV0cyIsInN1YnNjcmliZXJzIiwicGF5TVROIiwiYmV0cyIsInByb2ZpbGUiLCJ0cmFuc2FjdGlvbnMiLCJzZXR0aW5ncyIsInN0YXRpc3RpY3MiLCJvbHRyYW56IiwidHJhbnNmZXJzIiwid2l0aGRyYXdyZXF1ZXN0cyIsIndpbm5lcnMiLCJjb25maWciLCJzd2FnZ2VyIiwiaW5mbyIsInZlcnNpb24iLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwiYmFzZVBhdGgiLCJzY2hlbWVzIiwic2VjdXJpdHlEZWZpbml0aW9ucyIsIkpXVCIsInR5cGUiLCJuYW1lIiwiaW4iLCJ0YWdzIiwiY29uc3VtZXMiLCJwcm9kdWNlcyJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvZG9jcy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmV0cyBmcm9tICcuL2JldHMnO1xyXG5pbXBvcnQgZGVmYXVsdFBhdGhzIGZyb20gJy4vZGVmYXVsdC5wYXRocyc7XHJcbmltcG9ydCBnYW1lcyBmcm9tICcuL2dhbWVzL2dhbWUnO1xyXG5pbXBvcnQgcGF5TVROIGZyb20gJy4vbXRuJztcclxuaW1wb3J0IG9sdHJhbnogZnJvbSAnLi9vbHRyYW56JztcclxuaW1wb3J0IHByb2ZpbGUgZnJvbSAnLi9wcm9maWxlJztcclxuaW1wb3J0IHNldHRpbmdzIGZyb20gJy4vc2V0dGluZ3Mvc2V0dGluZ3MnO1xyXG5pbXBvcnQgc3RhdGlzdGljcyBmcm9tICcuL3N0YXRpc3RpY3MnO1xyXG5pbXBvcnQgc3Vic2NyaWJlcnMgZnJvbSAnLi9zdWJzY3JpYmVyJztcclxuaW1wb3J0IHRyYW5zYWN0aW9ucyBmcm9tICcuL3RyYW5zYWN0aW9ucy90cmFuc2FjdGlvbnMnO1xyXG5pbXBvcnQgdHJhbnNmZXJzIGZyb20gJy4vdHJhbnNmZXJzL3RyYW5zZmVycyc7XHJcbmltcG9ydCBhdXRoIGZyb20gJy4vdXNlcnMvYXV0aCc7XHJcbmltcG9ydCB1c2VycyBmcm9tICcuL3VzZXJzL3VzZXJzJztcclxuaW1wb3J0IHdhbGxldHMgZnJvbSAnLi93YWxsZXQnO1xyXG5pbXBvcnQgd2lubmVycyBmcm9tICcuL3dpbm5lcnMnO1xyXG5pbXBvcnQgd2l0aGRyYXdyZXF1ZXN0cyBmcm9tICcuL3dpdGhkcmF3cmVxdWVzdHMvdHJhbnNmZXJzJztcclxuXHJcbmNvbnN0IHBhdGhzID0ge1xyXG4gIC4uLmRlZmF1bHRQYXRocyxcclxuICAuLi5hdXRoLFxyXG4gIC4uLnVzZXJzLFxyXG4gIC4uLmdhbWVzLFxyXG4gIC4uLndhbGxldHMsXHJcbiAgLi4uc3Vic2NyaWJlcnMsXHJcbiAgLi4ucGF5TVROLFxyXG4gIC4uLmJldHMsXHJcbiAgLi4ucHJvZmlsZSxcclxuICAuLi50cmFuc2FjdGlvbnMsXHJcbiAgLi4uc2V0dGluZ3MsXHJcbiAgLi4uc3RhdGlzdGljcyxcclxuICAuLi5vbHRyYW56LFxyXG4gIC4uLnRyYW5zZmVycyxcclxuICAuLi53aXRoZHJhd3JlcXVlc3RzLFxyXG4gIC4uLndpbm5lcnMsXHJcbn07XHJcblxyXG5jb25zdCBjb25maWcgPSB7XHJcbiAgc3dhZ2dlcjogJzIuMCcsXHJcbiAgaW5mbzoge1xyXG4gICAgdmVyc2lvbjogJzEuMC4wLicsXHJcbiAgICB0aXRsZTogJ0Nhc2lubyBBUElzIERvY3VtZW50YXRpb24nLFxyXG4gICAgZGVzY3JpcHRpb246ICcnLFxyXG4gIH0sXHJcbiAgYmFzZVBhdGg6ICcvJyxcclxuICBzY2hlbWVzOiBbJ2h0dHAnLCAnaHR0cHMnXSxcclxuICBzZWN1cml0eURlZmluaXRpb25zOiB7XHJcbiAgICBKV1Q6IHtcclxuICAgICAgdHlwZTogJ2FwaUtleScsXHJcbiAgICAgIG5hbWU6ICdBdXRob3JpemF0aW9uJyxcclxuICAgICAgaW46ICdoZWFkZXInLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHRhZ3M6IFtcclxuICAgIHtcclxuICAgICAgbmFtZTogJ0Nhc2lubyBBUElzIERvY3VtZW50YXRpb24nLFxyXG4gICAgfSxcclxuICBdLFxyXG4gIGNvbnN1bWVzOiBbJ2FwcGxpY2F0aW9uL2pzb24nXSxcclxuICBwcm9kdWNlczogWydhcHBsaWNhdGlvbi9qc29uJ10sXHJcbiAgcGF0aHMsXHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUE0RDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFNUQsTUFBTUEsS0FBSyx1T0FDTkMsaUJBQVksR0FDWkMsYUFBSSxHQUNKQyxjQUFLLEdBQ0xDLGFBQUssR0FDTEMsZUFBTyxHQUNQQyxtQkFBVyxHQUNYQyxZQUFNLEdBQ05DLGFBQUksR0FDSkMsZ0JBQU8sR0FDUEMscUJBQVksR0FDWkMsaUJBQVEsR0FDUkMsbUJBQVUsR0FDVkMsZ0JBQU8sR0FDUEMsa0JBQVMsR0FDVEMsbUJBQWdCLEdBQ2hCQyxnQkFBTyxDQUNYO0FBRUQsTUFBTUMsTUFBTSxHQUFHO0VBQ2JDLE9BQU8sRUFBRSxLQUFLO0VBQ2RDLElBQUksRUFBRTtJQUNKQyxPQUFPLEVBQUUsUUFBUTtJQUNqQkMsS0FBSyxFQUFFLDJCQUEyQjtJQUNsQ0MsV0FBVyxFQUFFO0VBQ2YsQ0FBQztFQUNEQyxRQUFRLEVBQUUsR0FBRztFQUNiQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDO0VBQzFCQyxtQkFBbUIsRUFBRTtJQUNuQkMsR0FBRyxFQUFFO01BQ0hDLElBQUksRUFBRSxRQUFRO01BQ2RDLElBQUksRUFBRSxlQUFlO01BQ3JCQyxFQUFFLEVBQUU7SUFDTjtFQUNGLENBQUM7RUFDREMsSUFBSSxFQUFFLENBQ0o7SUFDRUYsSUFBSSxFQUFFO0VBQ1IsQ0FBQyxDQUNGO0VBQ0RHLFFBQVEsRUFBRSxDQUFDLGtCQUFrQixDQUFDO0VBQzlCQyxRQUFRLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztFQUM5QmhDO0FBQ0YsQ0FBQztBQUFDLGVBQ2FpQixNQUFNO0FBQUEifQ==