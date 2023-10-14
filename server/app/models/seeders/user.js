"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _bcryptjs = require("bcryptjs");
var _User = _interopRequireDefault(require("../User"));
var _keys = _interopRequireDefault(require("../../keys"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const admin = {
  firstName: 'JACQUES',
  lastName: 'MANIRAGUHA',
  role: 'admin',
  verified: true,
  email: 'admin@zeddi.rw',
  password: _keys.default.ADMIN_PASSWORD || 'zEDDI@2022'
};
const seedAdmin = async () => {
  try {
    _mongoose.default.set('strictQuery', false);
    await _mongoose.default.connect(_keys.default.MONGO_DB_URL);
    const hashedPassword = await (0, _bcryptjs.hash)(admin.password, 10);
    const exist = await _User.default.findOne({
      email: admin.email
    });
    if (!exist) {
      const newUser = _objectSpread(_objectSpread({}, admin), {}, {
        password: hashedPassword
      });
      await _User.default.create(newUser);
      console.log('Admin created successfully');
    } else {
      exist.set(_objectSpread(_objectSpread({}, admin), {}, {
        password: hashedPassword
      }));
      await exist.save();
      console.log('Admin updated successfully');
    }

    // Disconnect from MongoDB
    await _mongoose.default.disconnect();
    console.log('User seeding complete.');
  } catch (err) {
    console.error(err);
  }
};
var _default = seedAdmin();
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJhZG1pbiIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwicm9sZSIsInZlcmlmaWVkIiwiZW1haWwiLCJwYXNzd29yZCIsIktleXMiLCJBRE1JTl9QQVNTV09SRCIsInNlZWRBZG1pbiIsIm1vbmdvb3NlIiwic2V0IiwiY29ubmVjdCIsIk1PTkdPX0RCX1VSTCIsImhhc2hlZFBhc3N3b3JkIiwiaGFzaCIsImV4aXN0IiwiVXNlciIsImZpbmRPbmUiLCJuZXdVc2VyIiwiY3JlYXRlIiwiY29uc29sZSIsImxvZyIsInNhdmUiLCJkaXNjb25uZWN0IiwiZXJyIiwiZXJyb3IiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBwL21vZGVscy9zZWVkZXJzL3VzZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gJ21vbmdvb3NlJztcclxuaW1wb3J0IHsgaGFzaCB9IGZyb20gJ2JjcnlwdGpzJztcclxuaW1wb3J0IFVzZXIgZnJvbSAnLi4vVXNlcic7XHJcbmltcG9ydCBLZXlzIGZyb20gJy4uLy4uL2tleXMnO1xyXG5cclxuY29uc3QgYWRtaW4gPSB7XHJcbiAgZmlyc3ROYW1lOiAnSkFDUVVFUycsXHJcbiAgbGFzdE5hbWU6ICdNQU5JUkFHVUhBJyxcclxuICByb2xlOiAnYWRtaW4nLFxyXG4gIHZlcmlmaWVkOiB0cnVlLFxyXG4gIGVtYWlsOiAnYWRtaW5AemVkZGkucncnLFxyXG4gIHBhc3N3b3JkOiBLZXlzLkFETUlOX1BBU1NXT1JEIHx8ICd6RURESUAyMDIyJyxcclxufTtcclxuXHJcbmNvbnN0IHNlZWRBZG1pbiA9IGFzeW5jICgpID0+IHtcclxuICB0cnkge1xyXG4gICAgbW9uZ29vc2Uuc2V0KCdzdHJpY3RRdWVyeScsIGZhbHNlKTtcclxuICAgIGF3YWl0IG1vbmdvb3NlLmNvbm5lY3QoS2V5cy5NT05HT19EQl9VUkwpO1xyXG5cclxuICAgIGNvbnN0IGhhc2hlZFBhc3N3b3JkID0gYXdhaXQgaGFzaChhZG1pbi5wYXNzd29yZCwgMTApO1xyXG5cclxuICAgIGNvbnN0IGV4aXN0ID0gYXdhaXQgVXNlci5maW5kT25lKHsgZW1haWw6IGFkbWluLmVtYWlsIH0pO1xyXG5cclxuICAgIGlmICghZXhpc3QpIHtcclxuICAgICAgY29uc3QgbmV3VXNlciA9IHsgLi4uYWRtaW4sIHBhc3N3b3JkOiBoYXNoZWRQYXNzd29yZCB9O1xyXG4gICAgICBhd2FpdCBVc2VyLmNyZWF0ZShuZXdVc2VyKTtcclxuICAgICAgY29uc29sZS5sb2coJ0FkbWluIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5Jyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBleGlzdC5zZXQoeyAuLi5hZG1pbiwgcGFzc3dvcmQ6IGhhc2hlZFBhc3N3b3JkIH0pO1xyXG4gICAgICBhd2FpdCBleGlzdC5zYXZlKCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdBZG1pbiB1cGRhdGVkIHN1Y2Nlc3NmdWxseScpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERpc2Nvbm5lY3QgZnJvbSBNb25nb0RCXHJcbiAgICBhd2FpdCBtb25nb29zZS5kaXNjb25uZWN0KCk7XHJcblxyXG4gICAgY29uc29sZS5sb2coJ1VzZXIgc2VlZGluZyBjb21wbGV0ZS4nKTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzZWVkQWRtaW4oKTtcclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUE4QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFOUIsTUFBTUEsS0FBSyxHQUFHO0VBQ1pDLFNBQVMsRUFBRSxTQUFTO0VBQ3BCQyxRQUFRLEVBQUUsWUFBWTtFQUN0QkMsSUFBSSxFQUFFLE9BQU87RUFDYkMsUUFBUSxFQUFFLElBQUk7RUFDZEMsS0FBSyxFQUFFLGdCQUFnQjtFQUN2QkMsUUFBUSxFQUFFQyxhQUFJLENBQUNDLGNBQWMsSUFBSTtBQUNuQyxDQUFDO0FBRUQsTUFBTUMsU0FBUyxHQUFHLFlBQVk7RUFDNUIsSUFBSTtJQUNGQyxpQkFBUSxDQUFDQyxHQUFHLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQztJQUNsQyxNQUFNRCxpQkFBUSxDQUFDRSxPQUFPLENBQUNMLGFBQUksQ0FBQ00sWUFBWSxDQUFDO0lBRXpDLE1BQU1DLGNBQWMsR0FBRyxNQUFNLElBQUFDLGNBQUksRUFBQ2YsS0FBSyxDQUFDTSxRQUFRLEVBQUUsRUFBRSxDQUFDO0lBRXJELE1BQU1VLEtBQUssR0FBRyxNQUFNQyxhQUFJLENBQUNDLE9BQU8sQ0FBQztNQUFFYixLQUFLLEVBQUVMLEtBQUssQ0FBQ0s7SUFBTSxDQUFDLENBQUM7SUFFeEQsSUFBSSxDQUFDVyxLQUFLLEVBQUU7TUFDVixNQUFNRyxPQUFPLG1DQUFRbkIsS0FBSztRQUFFTSxRQUFRLEVBQUVRO01BQWMsRUFBRTtNQUN0RCxNQUFNRyxhQUFJLENBQUNHLE1BQU0sQ0FBQ0QsT0FBTyxDQUFDO01BQzFCRSxPQUFPLENBQUNDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQztJQUMzQyxDQUFDLE1BQU07TUFDTE4sS0FBSyxDQUFDTCxHQUFHLGlDQUFNWCxLQUFLO1FBQUVNLFFBQVEsRUFBRVE7TUFBYyxHQUFHO01BQ2pELE1BQU1FLEtBQUssQ0FBQ08sSUFBSSxFQUFFO01BQ2xCRixPQUFPLENBQUNDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQztJQUMzQzs7SUFFQTtJQUNBLE1BQU1aLGlCQUFRLENBQUNjLFVBQVUsRUFBRTtJQUUzQkgsT0FBTyxDQUFDQyxHQUFHLENBQUMsd0JBQXdCLENBQUM7RUFDdkMsQ0FBQyxDQUFDLE9BQU9HLEdBQUcsRUFBRTtJQUNaSixPQUFPLENBQUNLLEtBQUssQ0FBQ0QsR0FBRyxDQUFDO0VBQ3BCO0FBQ0YsQ0FBQztBQUFDLGVBRWFoQixTQUFTLEVBQUU7QUFBQSJ9