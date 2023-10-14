"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _bcryptjs = require("bcryptjs");
var _mongoose = require("mongoose");
var _HttpException = require("../exceptions/HttpException");
var _User = _interopRequireDefault(require("../models/User"));
var _pagination = require("../utils/pagination");
var _helper = require("../utils/helper");
var _AuthController = _interopRequireDefault(require("./AuthController"));
const _excluded = ["wallet"],
  _excluded2 = ["wallet", "password"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class UsersController {
  static async getReferrals(req, res) {
    try {
      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 10);
      const offset = (page - 1) * limit;
      const currentUser = await _User.default.findById(req.params.userId);
      if (!currentUser) throw new _HttpException.HttpException(409, 'User not found');
      const where = {
        _id: {
          $in: currentUser.invitedFriends
        }
      };
      const allData = await _User.default.find(where).select('firstName lastName email phoneNumber avatar referralCode createdAt').skip(offset).limit(limit);
      const count = await _User.default.count(where);
      const pagination = (0, _pagination.paginate)(count, limit, page);
      const results = allData.map(item => {
        const user = item.toJSON();
        user.avatar = (0, _helper.imageUrl)(item.avatar);
        return user;
      });
      res.status(200).json({
        data: results,
        pagination,
        message: 'findAll'
      });
    } catch (error) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong'
      });
    }
  }
}
_defineProperty(UsersController, "getUsers", async (req, res, next) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const offset = (page - 1) * limit;
    const {
      search
    } = req.query;
    let $match = {};
    if (search) {
      $match = {
        $or: [{
          firstName: {
            $regex: search,
            $options: 'i'
          }
        }, {
          email: {
            $regex: search,
            $options: 'i'
          }
        }, {
          lastName: {
            $regex: search,
            $options: 'i'
          }
        }, {
          phoneNumber: {
            $regex: search,
            $options: 'i'
          }
        }, {
          role: {
            $regex: search,
            $options: 'i'
          }
        }]
      };
    }
    const allData = await _User.default.aggregate([{
      $match
    }, {
      $lookup: {
        from: 'wallets',
        localField: '_id',
        foreignField: 'user',
        as: 'wallet'
      }
    }, {
      $addFields: {
        balance: {
          $sum: '$wallet.balance'
        },
        income: {
          $sum: '$wallet.income'
        },
        expenses: {
          $sum: '$wallet.expenses'
        }
      }
    }, {
      $skip: offset
    }, {
      $limit: limit
    }]);
    const count = await _User.default.count($match);
    const pagination = (0, _pagination.paginate)(count, limit, page);
    const results = allData.map(item => {
      const {
          wallet
        } = item,
        other = _objectWithoutProperties(item, _excluded);
      other.avatar = (0, _helper.imageUrl)(other.avatar);
      return other;
    });
    res.status(200).json({
      data: results,
      pagination,
      message: 'findAll'
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      message: error?.message || 'something went wrong'
    });
  }
});
_defineProperty(UsersController, "getUserById", async (req, res, next) => {
  try {
    const userId = new _mongoose.Types.ObjectId(req.params.id);
    const findUser = await _User.default.aggregate([{
      $match: {
        _id: userId
      }
    }, {
      $lookup: {
        from: 'wallets',
        localField: '_id',
        foreignField: 'user',
        as: 'wallet'
      }
    }, {
      $addFields: {
        balance: {
          $sum: '$wallet.balance'
        },
        income: {
          $sum: '$wallet.income'
        },
        expenses: {
          $sum: '$wallet.expenses'
        }
      }
    }]);
    const firstUser = findUser.length > 0 ? findUser[0] : null;
    if (!firstUser) throw new _HttpException.HttpException(409, "User doesn't exist");
    firstUser.avatar = (0, _helper.imageUrl)(firstUser.avatar);
    const {
        wallet,
        password
      } = firstUser,
      other = _objectWithoutProperties(firstUser, _excluded2);
    res.status(200).json({
      data: other,
      message: 'findOne'
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      message: error?.message || 'something went wrong'
    });
  }
});
_defineProperty(UsersController, "createUser", async (req, res) => {
  try {
    const userData = req.body;
    const findUser = await _User.default.findOne({
      email: userData.email
    }).exec();
    if (findUser) throw new _HttpException.HttpException(409, `This email ${userData.email} already exists`);
    const hashedPassword = await (0, _bcryptjs.hash)(userData.password, 10);
    const createUserData = new _User.default(_objectSpread(_objectSpread({}, userData), {}, {
      referralCode: _AuthController.default.generateReferralCode(),
      password: hashedPassword
    }));
    const newUser = await createUserData.save();
    newUser.avatar = (0, _helper.imageUrl)(newUser.avatar);
    res.status(201).json({
      data: newUser,
      message: 'created'
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      message: error?.message || 'something went wrong'
    });
  }
});
_defineProperty(UsersController, "updateUser", async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = req.body;
    const findUser = await _User.default.findById({
      _id: userId
    });
    if (!findUser) throw new _HttpException.HttpException(409, "User doesn't exist");
    if (userData.password) {
      userData.password = await (0, _bcryptjs.hash)(userData.password, 10);
    }
    await _User.default.updateOne({
      _id: userId
    }, userData);
    const updateUser = await _User.default.findById({
      _id: userId
    });
    updateUser.avatar = (0, _helper.imageUrl)(updateUser.avatar);
    res.status(200).json({
      data: updateUser,
      message: 'updated'
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      message: error?.message || 'something went wrong'
    });
  }
});
_defineProperty(UsersController, "deleteUser", async (req, res) => {
  try {
    const userId = req.params.id;
    const findUser = await _User.default.findById({
      _id: userId
    });
    if (!findUser) throw new _HttpException.HttpException(409, "User doesn't exist");
    await _User.default.deleteOne({
      _id: userId
    });
    findUser.avatar = (0, _helper.imageUrl)(findUser.avatar);
    res.status(200).json({
      data: findUser,
      message: 'deleted'
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      message: error?.message || 'something went wrong'
    });
  }
});
var _default = UsersController;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJVc2Vyc0NvbnRyb2xsZXIiLCJnZXRSZWZlcnJhbHMiLCJyZXEiLCJyZXMiLCJwYWdlIiwiTnVtYmVyIiwicXVlcnkiLCJsaW1pdCIsIm9mZnNldCIsImN1cnJlbnRVc2VyIiwiVXNlciIsImZpbmRCeUlkIiwicGFyYW1zIiwidXNlcklkIiwiSHR0cEV4Y2VwdGlvbiIsIndoZXJlIiwiX2lkIiwiJGluIiwiaW52aXRlZEZyaWVuZHMiLCJhbGxEYXRhIiwiZmluZCIsInNlbGVjdCIsInNraXAiLCJjb3VudCIsInBhZ2luYXRpb24iLCJwYWdpbmF0ZSIsInJlc3VsdHMiLCJtYXAiLCJpdGVtIiwidXNlciIsInRvSlNPTiIsImF2YXRhciIsImltYWdlVXJsIiwic3RhdHVzIiwianNvbiIsImRhdGEiLCJtZXNzYWdlIiwiZXJyb3IiLCJuZXh0Iiwic2VhcmNoIiwiJG1hdGNoIiwiJG9yIiwiZmlyc3ROYW1lIiwiJHJlZ2V4IiwiJG9wdGlvbnMiLCJlbWFpbCIsImxhc3ROYW1lIiwicGhvbmVOdW1iZXIiLCJyb2xlIiwiYWdncmVnYXRlIiwiJGxvb2t1cCIsImZyb20iLCJsb2NhbEZpZWxkIiwiZm9yZWlnbkZpZWxkIiwiYXMiLCIkYWRkRmllbGRzIiwiYmFsYW5jZSIsIiRzdW0iLCJpbmNvbWUiLCJleHBlbnNlcyIsIiRza2lwIiwiJGxpbWl0Iiwid2FsbGV0Iiwib3RoZXIiLCJUeXBlcyIsIk9iamVjdElkIiwiaWQiLCJmaW5kVXNlciIsImZpcnN0VXNlciIsImxlbmd0aCIsInBhc3N3b3JkIiwidXNlckRhdGEiLCJib2R5IiwiZmluZE9uZSIsImV4ZWMiLCJoYXNoZWRQYXNzd29yZCIsImhhc2giLCJjcmVhdGVVc2VyRGF0YSIsInJlZmVycmFsQ29kZSIsIkF1dGhDb250cm9sbGVyIiwiZ2VuZXJhdGVSZWZlcnJhbENvZGUiLCJuZXdVc2VyIiwic2F2ZSIsInVwZGF0ZU9uZSIsInVwZGF0ZVVzZXIiLCJkZWxldGVPbmUiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbnRyb2xsZXJzL1VzZXJDb250cm9sbGVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRGdW5jdGlvbiwgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcclxuaW1wb3J0IHsgaGFzaCB9IGZyb20gJ2JjcnlwdGpzJztcclxuaW1wb3J0IHsgVHlwZXMgfSBmcm9tICdtb25nb29zZSc7XHJcbmltcG9ydCB7IEh0dHBFeGNlcHRpb24gfSBmcm9tICcuLi9leGNlcHRpb25zL0h0dHBFeGNlcHRpb24nO1xyXG5pbXBvcnQgVXNlciBmcm9tICcuLi9tb2RlbHMvVXNlcic7XHJcbmltcG9ydCB7IHBhZ2luYXRlIH0gZnJvbSAnLi4vdXRpbHMvcGFnaW5hdGlvbic7XHJcbmltcG9ydCB7IFJlcXVlc3RXaXRoVXNlciB9IGZyb20gJy4uL2ludGVyZmFjZXMvYXV0aC5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBpbWFnZVVybCB9IGZyb20gJy4uL3V0aWxzL2hlbHBlcic7XHJcbmltcG9ydCBBdXRoQ29udHJvbGxlciBmcm9tICcuL0F1dGhDb250cm9sbGVyJztcclxuXHJcbmNsYXNzIFVzZXJzQ29udHJvbGxlciB7XHJcbiAgc3RhdGljIGFzeW5jIGdldFJlZmVycmFscyhyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHBhZ2UgPSBOdW1iZXIocmVxLnF1ZXJ5LnBhZ2UgfHwgMSk7XHJcbiAgICAgIGNvbnN0IGxpbWl0ID0gTnVtYmVyKHJlcS5xdWVyeS5saW1pdCB8fCAxMCk7XHJcbiAgICAgIGNvbnN0IG9mZnNldCA9IChwYWdlIC0gMSkgKiBsaW1pdDtcclxuXHJcbiAgICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gYXdhaXQgVXNlci5maW5kQnlJZChyZXEucGFyYW1zLnVzZXJJZCk7XHJcbiAgICAgIGlmICghY3VycmVudFVzZXIpXHJcbiAgICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oNDA5LCAnVXNlciBub3QgZm91bmQnKTtcclxuXHJcbiAgICAgIGNvbnN0IHdoZXJlID0geyBfaWQ6IHsgJGluOiBjdXJyZW50VXNlci5pbnZpdGVkRnJpZW5kcyB9IH07XHJcblxyXG4gICAgICBjb25zdCBhbGxEYXRhID0gYXdhaXQgVXNlci5maW5kKHdoZXJlKVxyXG4gICAgICAgIC5zZWxlY3QoXHJcbiAgICAgICAgICAnZmlyc3ROYW1lIGxhc3ROYW1lIGVtYWlsIHBob25lTnVtYmVyIGF2YXRhciByZWZlcnJhbENvZGUgY3JlYXRlZEF0JyxcclxuICAgICAgICApXHJcbiAgICAgICAgLnNraXAob2Zmc2V0KVxyXG4gICAgICAgIC5saW1pdChsaW1pdCk7XHJcbiAgICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgVXNlci5jb3VudCh3aGVyZSk7XHJcblxyXG4gICAgICBjb25zdCBwYWdpbmF0aW9uID0gcGFnaW5hdGUoY291bnQsIGxpbWl0LCBwYWdlKTtcclxuXHJcbiAgICAgIGNvbnN0IHJlc3VsdHMgPSBhbGxEYXRhLm1hcChpdGVtID0+IHtcclxuICAgICAgICBjb25zdCB1c2VyID0gaXRlbS50b0pTT04oKTtcclxuICAgICAgICB1c2VyLmF2YXRhciA9IGltYWdlVXJsKGl0ZW0uYXZhdGFyKTtcclxuICAgICAgICByZXR1cm4gdXNlcjtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXNcclxuICAgICAgICAuc3RhdHVzKDIwMClcclxuICAgICAgICAuanNvbih7IGRhdGE6IHJlc3VsdHMsIHBhZ2luYXRpb24sIG1lc3NhZ2U6ICdmaW5kQWxsJyB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgICAgcmVzLnN0YXR1cyhlcnJvcj8uc3RhdHVzIHx8IDUwMCkuanNvbih7XHJcbiAgICAgICAgbWVzc2FnZTogZXJyb3I/Lm1lc3NhZ2UgfHwgJ3NvbWV0aGluZyB3ZW50IHdyb25nJyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0VXNlcnMgPSBhc3luYyAoXHJcbiAgICByZXE6IFJlcXVlc3QsXHJcbiAgICByZXM6IFJlc3BvbnNlLFxyXG4gICAgbmV4dDogTmV4dEZ1bmN0aW9uLFxyXG4gICkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcGFnZSA9IE51bWJlcihyZXEucXVlcnkucGFnZSB8fCAxKTtcclxuICAgICAgY29uc3QgbGltaXQgPSBOdW1iZXIocmVxLnF1ZXJ5LmxpbWl0IHx8IDEwKTtcclxuICAgICAgY29uc3Qgb2Zmc2V0ID0gKHBhZ2UgLSAxKSAqIGxpbWl0O1xyXG5cclxuICAgICAgY29uc3QgeyBzZWFyY2ggfSA9IHJlcS5xdWVyeTtcclxuXHJcbiAgICAgIGxldCAkbWF0Y2g6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7fTtcclxuXHJcbiAgICAgIGlmIChzZWFyY2gpIHtcclxuICAgICAgICAkbWF0Y2ggPSB7XHJcbiAgICAgICAgICAkb3I6IFtcclxuICAgICAgICAgICAgeyBmaXJzdE5hbWU6IHsgJHJlZ2V4OiBzZWFyY2gsICRvcHRpb25zOiAnaScgfSB9LFxyXG4gICAgICAgICAgICB7IGVtYWlsOiB7ICRyZWdleDogc2VhcmNoLCAkb3B0aW9uczogJ2knIH0gfSxcclxuICAgICAgICAgICAgeyBsYXN0TmFtZTogeyAkcmVnZXg6IHNlYXJjaCwgJG9wdGlvbnM6ICdpJyB9IH0sXHJcbiAgICAgICAgICAgIHsgcGhvbmVOdW1iZXI6IHsgJHJlZ2V4OiBzZWFyY2gsICRvcHRpb25zOiAnaScgfSB9LFxyXG4gICAgICAgICAgICB7IHJvbGU6IHsgJHJlZ2V4OiBzZWFyY2gsICRvcHRpb25zOiAnaScgfSB9LFxyXG4gICAgICAgICAgXSxcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBhbGxEYXRhID0gYXdhaXQgVXNlci5hZ2dyZWdhdGUoW1xyXG4gICAgICAgIHsgJG1hdGNoIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgJGxvb2t1cDoge1xyXG4gICAgICAgICAgICBmcm9tOiAnd2FsbGV0cycsXHJcbiAgICAgICAgICAgIGxvY2FsRmllbGQ6ICdfaWQnLFxyXG4gICAgICAgICAgICBmb3JlaWduRmllbGQ6ICd1c2VyJyxcclxuICAgICAgICAgICAgYXM6ICd3YWxsZXQnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICRhZGRGaWVsZHM6IHtcclxuICAgICAgICAgICAgYmFsYW5jZToge1xyXG4gICAgICAgICAgICAgICRzdW06ICckd2FsbGV0LmJhbGFuY2UnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpbmNvbWU6IHtcclxuICAgICAgICAgICAgICAkc3VtOiAnJHdhbGxldC5pbmNvbWUnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBleHBlbnNlczoge1xyXG4gICAgICAgICAgICAgICRzdW06ICckd2FsbGV0LmV4cGVuc2VzJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAkc2tpcDogb2Zmc2V0LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgJGxpbWl0OiBsaW1pdCxcclxuICAgICAgICB9LFxyXG4gICAgICBdKTtcclxuICAgICAgY29uc3QgY291bnQgPSBhd2FpdCBVc2VyLmNvdW50KCRtYXRjaCk7XHJcbiAgICAgIGNvbnN0IHBhZ2luYXRpb24gPSBwYWdpbmF0ZShjb3VudCwgbGltaXQsIHBhZ2UpO1xyXG5cclxuICAgICAgY29uc3QgcmVzdWx0cyA9IGFsbERhdGEubWFwKGl0ZW0gPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgd2FsbGV0LCAuLi5vdGhlciB9ID0gaXRlbTtcclxuICAgICAgICBvdGhlci5hdmF0YXIgPSBpbWFnZVVybChvdGhlci5hdmF0YXIpO1xyXG4gICAgICAgIHJldHVybiBvdGhlcjtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXNcclxuICAgICAgICAuc3RhdHVzKDIwMClcclxuICAgICAgICAuanNvbih7IGRhdGE6IHJlc3VsdHMsIHBhZ2luYXRpb24sIG1lc3NhZ2U6ICdmaW5kQWxsJyB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgICAgcmVzLnN0YXR1cyhlcnJvcj8uc3RhdHVzIHx8IDUwMCkuanNvbih7XHJcbiAgICAgICAgbWVzc2FnZTogZXJyb3I/Lm1lc3NhZ2UgfHwgJ3NvbWV0aGluZyB3ZW50IHdyb25nJyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIGdldFVzZXJCeUlkID0gYXN5bmMgKFxyXG4gICAgcmVxOiBSZXF1ZXN0LFxyXG4gICAgcmVzOiBSZXNwb25zZSxcclxuICAgIG5leHQ6IE5leHRGdW5jdGlvbixcclxuICApID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHVzZXJJZCA9IG5ldyBUeXBlcy5PYmplY3RJZChyZXEucGFyYW1zLmlkKTtcclxuXHJcbiAgICAgIGNvbnN0IGZpbmRVc2VyID0gYXdhaXQgVXNlci5hZ2dyZWdhdGUoW1xyXG4gICAgICAgIHsgJG1hdGNoOiB7IF9pZDogdXNlcklkIH0gfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAkbG9va3VwOiB7XHJcbiAgICAgICAgICAgIGZyb206ICd3YWxsZXRzJyxcclxuICAgICAgICAgICAgbG9jYWxGaWVsZDogJ19pZCcsXHJcbiAgICAgICAgICAgIGZvcmVpZ25GaWVsZDogJ3VzZXInLFxyXG4gICAgICAgICAgICBhczogJ3dhbGxldCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgJGFkZEZpZWxkczoge1xyXG4gICAgICAgICAgICBiYWxhbmNlOiB7XHJcbiAgICAgICAgICAgICAgJHN1bTogJyR3YWxsZXQuYmFsYW5jZScsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGluY29tZToge1xyXG4gICAgICAgICAgICAgICRzdW06ICckd2FsbGV0LmluY29tZScsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGV4cGVuc2VzOiB7XHJcbiAgICAgICAgICAgICAgJHN1bTogJyR3YWxsZXQuZXhwZW5zZXMnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICBdKTtcclxuXHJcbiAgICAgIGNvbnN0IGZpcnN0VXNlciA9IGZpbmRVc2VyLmxlbmd0aCA+IDAgPyBmaW5kVXNlclswXSA6IG51bGw7XHJcblxyXG4gICAgICBpZiAoIWZpcnN0VXNlcilcclxuICAgICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbig0MDksIFwiVXNlciBkb2Vzbid0IGV4aXN0XCIpO1xyXG5cclxuICAgICAgZmlyc3RVc2VyLmF2YXRhciA9IGltYWdlVXJsKGZpcnN0VXNlci5hdmF0YXIpO1xyXG5cclxuICAgICAgY29uc3QgeyB3YWxsZXQsIHBhc3N3b3JkLCAuLi5vdGhlciB9ID0gZmlyc3RVc2VyO1xyXG5cclxuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBkYXRhOiBvdGhlciwgbWVzc2FnZTogJ2ZpbmRPbmUnIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgICByZXMuc3RhdHVzKGVycm9yPy5zdGF0dXMgfHwgNTAwKS5qc29uKHtcclxuICAgICAgICBtZXNzYWdlOiBlcnJvcj8ubWVzc2FnZSB8fCAnc29tZXRoaW5nIHdlbnQgd3JvbmcnLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBzdGF0aWMgY3JlYXRlVXNlciA9IGFzeW5jIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHVzZXJEYXRhOiBhbnkgPSByZXEuYm9keTtcclxuXHJcbiAgICAgIGNvbnN0IGZpbmRVc2VyID0gYXdhaXQgVXNlci5maW5kT25lKHtcclxuICAgICAgICBlbWFpbDogdXNlckRhdGEuZW1haWwsXHJcbiAgICAgIH0pLmV4ZWMoKTtcclxuICAgICAgaWYgKGZpbmRVc2VyKVxyXG4gICAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKFxyXG4gICAgICAgICAgNDA5LFxyXG4gICAgICAgICAgYFRoaXMgZW1haWwgJHt1c2VyRGF0YS5lbWFpbH0gYWxyZWFkeSBleGlzdHNgLFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICBjb25zdCBoYXNoZWRQYXNzd29yZCA9IGF3YWl0IGhhc2godXNlckRhdGEucGFzc3dvcmQsIDEwKTtcclxuICAgICAgY29uc3QgY3JlYXRlVXNlckRhdGEgPSBuZXcgVXNlcih7XHJcbiAgICAgICAgLi4udXNlckRhdGEsXHJcbiAgICAgICAgcmVmZXJyYWxDb2RlOiBBdXRoQ29udHJvbGxlci5nZW5lcmF0ZVJlZmVycmFsQ29kZSgpLFxyXG4gICAgICAgIHBhc3N3b3JkOiBoYXNoZWRQYXNzd29yZCxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjb25zdCBuZXdVc2VyID0gYXdhaXQgY3JlYXRlVXNlckRhdGEuc2F2ZSgpO1xyXG5cclxuICAgICAgbmV3VXNlci5hdmF0YXIgPSBpbWFnZVVybChuZXdVc2VyLmF2YXRhcik7XHJcblxyXG4gICAgICByZXMuc3RhdHVzKDIwMSkuanNvbih7IGRhdGE6IG5ld1VzZXIsIG1lc3NhZ2U6ICdjcmVhdGVkJyB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgICAgcmVzLnN0YXR1cyhlcnJvcj8uc3RhdHVzIHx8IDUwMCkuanNvbih7XHJcbiAgICAgICAgbWVzc2FnZTogZXJyb3I/Lm1lc3NhZ2UgfHwgJ3NvbWV0aGluZyB3ZW50IHdyb25nJyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIHVwZGF0ZVVzZXIgPSBhc3luYyAocmVxOiBSZXF1ZXN0V2l0aFVzZXIsIHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHVzZXJJZCA9IHJlcS5wYXJhbXMuaWQ7XHJcbiAgICAgIGNvbnN0IHVzZXJEYXRhOiBhbnkgPSByZXEuYm9keTtcclxuICAgICAgY29uc3QgZmluZFVzZXIgPSBhd2FpdCBVc2VyLmZpbmRCeUlkKHsgX2lkOiB1c2VySWQgfSk7XHJcbiAgICAgIGlmICghZmluZFVzZXIpXHJcbiAgICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oNDA5LCBcIlVzZXIgZG9lc24ndCBleGlzdFwiKTtcclxuXHJcbiAgICAgIGlmICh1c2VyRGF0YS5wYXNzd29yZCkge1xyXG4gICAgICAgIHVzZXJEYXRhLnBhc3N3b3JkID0gYXdhaXQgaGFzaCh1c2VyRGF0YS5wYXNzd29yZCwgMTApO1xyXG4gICAgICB9XHJcbiAgICAgIGF3YWl0IFVzZXIudXBkYXRlT25lKHsgX2lkOiB1c2VySWQgfSwgdXNlckRhdGEpO1xyXG5cclxuICAgICAgY29uc3QgdXBkYXRlVXNlciA9IGF3YWl0IFVzZXIuZmluZEJ5SWQoe1xyXG4gICAgICAgIF9pZDogdXNlcklkLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHVwZGF0ZVVzZXIuYXZhdGFyID0gaW1hZ2VVcmwodXBkYXRlVXNlci5hdmF0YXIpO1xyXG5cclxuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBkYXRhOiB1cGRhdGVVc2VyLCBtZXNzYWdlOiAndXBkYXRlZCcgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XHJcbiAgICAgIHJlcy5zdGF0dXMoZXJyb3I/LnN0YXR1cyB8fCA1MDApLmpzb24oe1xyXG4gICAgICAgIG1lc3NhZ2U6IGVycm9yPy5tZXNzYWdlIHx8ICdzb21ldGhpbmcgd2VudCB3cm9uZycsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHN0YXRpYyBkZWxldGVVc2VyID0gYXN5bmMgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgdXNlcklkID0gcmVxLnBhcmFtcy5pZDtcclxuICAgICAgY29uc3QgZmluZFVzZXIgPSBhd2FpdCBVc2VyLmZpbmRCeUlkKHsgX2lkOiB1c2VySWQgfSk7XHJcbiAgICAgIGlmICghZmluZFVzZXIpXHJcbiAgICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oNDA5LCBcIlVzZXIgZG9lc24ndCBleGlzdFwiKTtcclxuXHJcbiAgICAgIGF3YWl0IFVzZXIuZGVsZXRlT25lKHsgX2lkOiB1c2VySWQgfSk7XHJcblxyXG4gICAgICBmaW5kVXNlci5hdmF0YXIgPSBpbWFnZVVybChmaW5kVXNlci5hdmF0YXIpO1xyXG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IGRhdGE6IGZpbmRVc2VyLCBtZXNzYWdlOiAnZGVsZXRlZCcgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XHJcbiAgICAgIHJlcy5zdGF0dXMoZXJyb3I/LnN0YXR1cyB8fCA1MDApLmpzb24oe1xyXG4gICAgICAgIG1lc3NhZ2U6IGVycm9yPy5tZXNzYWdlIHx8ICdzb21ldGhpbmcgd2VudCB3cm9uZycsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFVzZXJzQ29udHJvbGxlcjtcclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUE4QztFQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUU5QyxNQUFNQSxlQUFlLENBQUM7RUFDcEIsYUFBYUMsWUFBWSxDQUFDQyxHQUFZLEVBQUVDLEdBQWEsRUFBRTtJQUNyRCxJQUFJO01BQ0YsTUFBTUMsSUFBSSxHQUFHQyxNQUFNLENBQUNILEdBQUcsQ0FBQ0ksS0FBSyxDQUFDRixJQUFJLElBQUksQ0FBQyxDQUFDO01BQ3hDLE1BQU1HLEtBQUssR0FBR0YsTUFBTSxDQUFDSCxHQUFHLENBQUNJLEtBQUssQ0FBQ0MsS0FBSyxJQUFJLEVBQUUsQ0FBQztNQUMzQyxNQUFNQyxNQUFNLEdBQUcsQ0FBQ0osSUFBSSxHQUFHLENBQUMsSUFBSUcsS0FBSztNQUVqQyxNQUFNRSxXQUFXLEdBQUcsTUFBTUMsYUFBSSxDQUFDQyxRQUFRLENBQUNULEdBQUcsQ0FBQ1UsTUFBTSxDQUFDQyxNQUFNLENBQUM7TUFDMUQsSUFBSSxDQUFDSixXQUFXLEVBQ2QsTUFBTSxJQUFJSyw0QkFBYSxDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQztNQUVoRCxNQUFNQyxLQUFLLEdBQUc7UUFBRUMsR0FBRyxFQUFFO1VBQUVDLEdBQUcsRUFBRVIsV0FBVyxDQUFDUztRQUFlO01BQUUsQ0FBQztNQUUxRCxNQUFNQyxPQUFPLEdBQUcsTUFBTVQsYUFBSSxDQUFDVSxJQUFJLENBQUNMLEtBQUssQ0FBQyxDQUNuQ00sTUFBTSxDQUNMLG9FQUFvRSxDQUNyRSxDQUNBQyxJQUFJLENBQUNkLE1BQU0sQ0FBQyxDQUNaRCxLQUFLLENBQUNBLEtBQUssQ0FBQztNQUNmLE1BQU1nQixLQUFLLEdBQUcsTUFBTWIsYUFBSSxDQUFDYSxLQUFLLENBQUNSLEtBQUssQ0FBQztNQUVyQyxNQUFNUyxVQUFVLEdBQUcsSUFBQUMsb0JBQVEsRUFBQ0YsS0FBSyxFQUFFaEIsS0FBSyxFQUFFSCxJQUFJLENBQUM7TUFFL0MsTUFBTXNCLE9BQU8sR0FBR1AsT0FBTyxDQUFDUSxHQUFHLENBQUNDLElBQUksSUFBSTtRQUNsQyxNQUFNQyxJQUFJLEdBQUdELElBQUksQ0FBQ0UsTUFBTSxFQUFFO1FBQzFCRCxJQUFJLENBQUNFLE1BQU0sR0FBRyxJQUFBQyxnQkFBUSxFQUFDSixJQUFJLENBQUNHLE1BQU0sQ0FBQztRQUNuQyxPQUFPRixJQUFJO01BQ2IsQ0FBQyxDQUFDO01BRUYxQixHQUFHLENBQ0E4QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQ1hDLElBQUksQ0FBQztRQUFFQyxJQUFJLEVBQUVULE9BQU87UUFBRUYsVUFBVTtRQUFFWSxPQUFPLEVBQUU7TUFBVSxDQUFDLENBQUM7SUFDNUQsQ0FBQyxDQUFDLE9BQU9DLEtBQVUsRUFBRTtNQUNuQmxDLEdBQUcsQ0FBQzhCLE1BQU0sQ0FBQ0ksS0FBSyxFQUFFSixNQUFNLElBQUksR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztRQUNwQ0UsT0FBTyxFQUFFQyxLQUFLLEVBQUVELE9BQU8sSUFBSTtNQUM3QixDQUFDLENBQUM7SUFDSjtFQUNGO0FBMk1GO0FBQUMsZ0JBaFBLcEMsZUFBZSxjQXVDRCxPQUNoQkUsR0FBWSxFQUNaQyxHQUFhLEVBQ2JtQyxJQUFrQixLQUNmO0VBQ0gsSUFBSTtJQUNGLE1BQU1sQyxJQUFJLEdBQUdDLE1BQU0sQ0FBQ0gsR0FBRyxDQUFDSSxLQUFLLENBQUNGLElBQUksSUFBSSxDQUFDLENBQUM7SUFDeEMsTUFBTUcsS0FBSyxHQUFHRixNQUFNLENBQUNILEdBQUcsQ0FBQ0ksS0FBSyxDQUFDQyxLQUFLLElBQUksRUFBRSxDQUFDO0lBQzNDLE1BQU1DLE1BQU0sR0FBRyxDQUFDSixJQUFJLEdBQUcsQ0FBQyxJQUFJRyxLQUFLO0lBRWpDLE1BQU07TUFBRWdDO0lBQU8sQ0FBQyxHQUFHckMsR0FBRyxDQUFDSSxLQUFLO0lBRTVCLElBQUlrQyxNQUEyQixHQUFHLENBQUMsQ0FBQztJQUVwQyxJQUFJRCxNQUFNLEVBQUU7TUFDVkMsTUFBTSxHQUFHO1FBQ1BDLEdBQUcsRUFBRSxDQUNIO1VBQUVDLFNBQVMsRUFBRTtZQUFFQyxNQUFNLEVBQUVKLE1BQU07WUFBRUssUUFBUSxFQUFFO1VBQUk7UUFBRSxDQUFDLEVBQ2hEO1VBQUVDLEtBQUssRUFBRTtZQUFFRixNQUFNLEVBQUVKLE1BQU07WUFBRUssUUFBUSxFQUFFO1VBQUk7UUFBRSxDQUFDLEVBQzVDO1VBQUVFLFFBQVEsRUFBRTtZQUFFSCxNQUFNLEVBQUVKLE1BQU07WUFBRUssUUFBUSxFQUFFO1VBQUk7UUFBRSxDQUFDLEVBQy9DO1VBQUVHLFdBQVcsRUFBRTtZQUFFSixNQUFNLEVBQUVKLE1BQU07WUFBRUssUUFBUSxFQUFFO1VBQUk7UUFBRSxDQUFDLEVBQ2xEO1VBQUVJLElBQUksRUFBRTtZQUFFTCxNQUFNLEVBQUVKLE1BQU07WUFBRUssUUFBUSxFQUFFO1VBQUk7UUFBRSxDQUFDO01BRS9DLENBQUM7SUFDSDtJQUVBLE1BQU16QixPQUFPLEdBQUcsTUFBTVQsYUFBSSxDQUFDdUMsU0FBUyxDQUFDLENBQ25DO01BQUVUO0lBQU8sQ0FBQyxFQUNWO01BQ0VVLE9BQU8sRUFBRTtRQUNQQyxJQUFJLEVBQUUsU0FBUztRQUNmQyxVQUFVLEVBQUUsS0FBSztRQUNqQkMsWUFBWSxFQUFFLE1BQU07UUFDcEJDLEVBQUUsRUFBRTtNQUNOO0lBQ0YsQ0FBQyxFQUNEO01BQ0VDLFVBQVUsRUFBRTtRQUNWQyxPQUFPLEVBQUU7VUFDUEMsSUFBSSxFQUFFO1FBQ1IsQ0FBQztRQUNEQyxNQUFNLEVBQUU7VUFDTkQsSUFBSSxFQUFFO1FBQ1IsQ0FBQztRQUNERSxRQUFRLEVBQUU7VUFDUkYsSUFBSSxFQUFFO1FBQ1I7TUFDRjtJQUNGLENBQUMsRUFDRDtNQUNFRyxLQUFLLEVBQUVwRDtJQUNULENBQUMsRUFDRDtNQUNFcUQsTUFBTSxFQUFFdEQ7SUFDVixDQUFDLENBQ0YsQ0FBQztJQUNGLE1BQU1nQixLQUFLLEdBQUcsTUFBTWIsYUFBSSxDQUFDYSxLQUFLLENBQUNpQixNQUFNLENBQUM7SUFDdEMsTUFBTWhCLFVBQVUsR0FBRyxJQUFBQyxvQkFBUSxFQUFDRixLQUFLLEVBQUVoQixLQUFLLEVBQUVILElBQUksQ0FBQztJQUUvQyxNQUFNc0IsT0FBTyxHQUFHUCxPQUFPLENBQUNRLEdBQUcsQ0FBQ0MsSUFBSSxJQUFJO01BQ2xDLE1BQU07VUFBRWtDO1FBQWlCLENBQUMsR0FBR2xDLElBQUk7UUFBZG1DLEtBQUssNEJBQUtuQyxJQUFJO01BQ2pDbUMsS0FBSyxDQUFDaEMsTUFBTSxHQUFHLElBQUFDLGdCQUFRLEVBQUMrQixLQUFLLENBQUNoQyxNQUFNLENBQUM7TUFDckMsT0FBT2dDLEtBQUs7SUFDZCxDQUFDLENBQUM7SUFFRjVELEdBQUcsQ0FDQThCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FDWEMsSUFBSSxDQUFDO01BQUVDLElBQUksRUFBRVQsT0FBTztNQUFFRixVQUFVO01BQUVZLE9BQU8sRUFBRTtJQUFVLENBQUMsQ0FBQztFQUM1RCxDQUFDLENBQUMsT0FBT0MsS0FBVSxFQUFFO0lBQ25CbEMsR0FBRyxDQUFDOEIsTUFBTSxDQUFDSSxLQUFLLEVBQUVKLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO01BQ3BDRSxPQUFPLEVBQUVDLEtBQUssRUFBRUQsT0FBTyxJQUFJO0lBQzdCLENBQUMsQ0FBQztFQUNKO0FBQ0YsQ0FBQztBQUFBLGdCQWhIR3BDLGVBQWUsaUJBa0hFLE9BQ25CRSxHQUFZLEVBQ1pDLEdBQWEsRUFDYm1DLElBQWtCLEtBQ2Y7RUFDSCxJQUFJO0lBQ0YsTUFBTXpCLE1BQU0sR0FBRyxJQUFJbUQsZUFBSyxDQUFDQyxRQUFRLENBQUMvRCxHQUFHLENBQUNVLE1BQU0sQ0FBQ3NELEVBQUUsQ0FBQztJQUVoRCxNQUFNQyxRQUFRLEdBQUcsTUFBTXpELGFBQUksQ0FBQ3VDLFNBQVMsQ0FBQyxDQUNwQztNQUFFVCxNQUFNLEVBQUU7UUFBRXhCLEdBQUcsRUFBRUg7TUFBTztJQUFFLENBQUMsRUFDM0I7TUFDRXFDLE9BQU8sRUFBRTtRQUNQQyxJQUFJLEVBQUUsU0FBUztRQUNmQyxVQUFVLEVBQUUsS0FBSztRQUNqQkMsWUFBWSxFQUFFLE1BQU07UUFDcEJDLEVBQUUsRUFBRTtNQUNOO0lBQ0YsQ0FBQyxFQUNEO01BQ0VDLFVBQVUsRUFBRTtRQUNWQyxPQUFPLEVBQUU7VUFDUEMsSUFBSSxFQUFFO1FBQ1IsQ0FBQztRQUNEQyxNQUFNLEVBQUU7VUFDTkQsSUFBSSxFQUFFO1FBQ1IsQ0FBQztRQUNERSxRQUFRLEVBQUU7VUFDUkYsSUFBSSxFQUFFO1FBQ1I7TUFDRjtJQUNGLENBQUMsQ0FDRixDQUFDO0lBRUYsTUFBTVcsU0FBUyxHQUFHRCxRQUFRLENBQUNFLE1BQU0sR0FBRyxDQUFDLEdBQUdGLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJO0lBRTFELElBQUksQ0FBQ0MsU0FBUyxFQUNaLE1BQU0sSUFBSXRELDRCQUFhLENBQUMsR0FBRyxFQUFFLG9CQUFvQixDQUFDO0lBRXBEc0QsU0FBUyxDQUFDckMsTUFBTSxHQUFHLElBQUFDLGdCQUFRLEVBQUNvQyxTQUFTLENBQUNyQyxNQUFNLENBQUM7SUFFN0MsTUFBTTtRQUFFK0IsTUFBTTtRQUFFUTtNQUFtQixDQUFDLEdBQUdGLFNBQVM7TUFBbkJMLEtBQUssNEJBQUtLLFNBQVM7SUFFaERqRSxHQUFHLENBQUM4QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztNQUFFQyxJQUFJLEVBQUU0QixLQUFLO01BQUUzQixPQUFPLEVBQUU7SUFBVSxDQUFDLENBQUM7RUFDM0QsQ0FBQyxDQUFDLE9BQU9DLEtBQVUsRUFBRTtJQUNuQmxDLEdBQUcsQ0FBQzhCLE1BQU0sQ0FBQ0ksS0FBSyxFQUFFSixNQUFNLElBQUksR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztNQUNwQ0UsT0FBTyxFQUFFQyxLQUFLLEVBQUVELE9BQU8sSUFBSTtJQUM3QixDQUFDLENBQUM7RUFDSjtBQUNGLENBQUM7QUFBQSxnQkFsS0dwQyxlQUFlLGdCQW9LQyxPQUFPRSxHQUFZLEVBQUVDLEdBQWEsS0FBSztFQUN6RCxJQUFJO0lBQ0YsTUFBTW9FLFFBQWEsR0FBR3JFLEdBQUcsQ0FBQ3NFLElBQUk7SUFFOUIsTUFBTUwsUUFBUSxHQUFHLE1BQU16RCxhQUFJLENBQUMrRCxPQUFPLENBQUM7TUFDbEM1QixLQUFLLEVBQUUwQixRQUFRLENBQUMxQjtJQUNsQixDQUFDLENBQUMsQ0FBQzZCLElBQUksRUFBRTtJQUNULElBQUlQLFFBQVEsRUFDVixNQUFNLElBQUlyRCw0QkFBYSxDQUNyQixHQUFHLEVBQ0YsY0FBYXlELFFBQVEsQ0FBQzFCLEtBQU0saUJBQWdCLENBQzlDO0lBRUgsTUFBTThCLGNBQWMsR0FBRyxNQUFNLElBQUFDLGNBQUksRUFBQ0wsUUFBUSxDQUFDRCxRQUFRLEVBQUUsRUFBRSxDQUFDO0lBQ3hELE1BQU1PLGNBQWMsR0FBRyxJQUFJbkUsYUFBSSxpQ0FDMUI2RCxRQUFRO01BQ1hPLFlBQVksRUFBRUMsdUJBQWMsQ0FBQ0Msb0JBQW9CLEVBQUU7TUFDbkRWLFFBQVEsRUFBRUs7SUFBYyxHQUN4QjtJQUVGLE1BQU1NLE9BQU8sR0FBRyxNQUFNSixjQUFjLENBQUNLLElBQUksRUFBRTtJQUUzQ0QsT0FBTyxDQUFDbEQsTUFBTSxHQUFHLElBQUFDLGdCQUFRLEVBQUNpRCxPQUFPLENBQUNsRCxNQUFNLENBQUM7SUFFekM1QixHQUFHLENBQUM4QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztNQUFFQyxJQUFJLEVBQUU4QyxPQUFPO01BQUU3QyxPQUFPLEVBQUU7SUFBVSxDQUFDLENBQUM7RUFDN0QsQ0FBQyxDQUFDLE9BQU9DLEtBQVUsRUFBRTtJQUNuQmxDLEdBQUcsQ0FBQzhCLE1BQU0sQ0FBQ0ksS0FBSyxFQUFFSixNQUFNLElBQUksR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztNQUNwQ0UsT0FBTyxFQUFFQyxLQUFLLEVBQUVELE9BQU8sSUFBSTtJQUM3QixDQUFDLENBQUM7RUFDSjtBQUNGLENBQUM7QUFBQSxnQkFsTUdwQyxlQUFlLGdCQW9NQyxPQUFPRSxHQUFvQixFQUFFQyxHQUFhLEtBQUs7RUFDakUsSUFBSTtJQUNGLE1BQU1VLE1BQU0sR0FBR1gsR0FBRyxDQUFDVSxNQUFNLENBQUNzRCxFQUFFO0lBQzVCLE1BQU1LLFFBQWEsR0FBR3JFLEdBQUcsQ0FBQ3NFLElBQUk7SUFDOUIsTUFBTUwsUUFBUSxHQUFHLE1BQU16RCxhQUFJLENBQUNDLFFBQVEsQ0FBQztNQUFFSyxHQUFHLEVBQUVIO0lBQU8sQ0FBQyxDQUFDO0lBQ3JELElBQUksQ0FBQ3NELFFBQVEsRUFDWCxNQUFNLElBQUlyRCw0QkFBYSxDQUFDLEdBQUcsRUFBRSxvQkFBb0IsQ0FBQztJQUVwRCxJQUFJeUQsUUFBUSxDQUFDRCxRQUFRLEVBQUU7TUFDckJDLFFBQVEsQ0FBQ0QsUUFBUSxHQUFHLE1BQU0sSUFBQU0sY0FBSSxFQUFDTCxRQUFRLENBQUNELFFBQVEsRUFBRSxFQUFFLENBQUM7SUFDdkQ7SUFDQSxNQUFNNUQsYUFBSSxDQUFDeUUsU0FBUyxDQUFDO01BQUVuRSxHQUFHLEVBQUVIO0lBQU8sQ0FBQyxFQUFFMEQsUUFBUSxDQUFDO0lBRS9DLE1BQU1hLFVBQVUsR0FBRyxNQUFNMUUsYUFBSSxDQUFDQyxRQUFRLENBQUM7TUFDckNLLEdBQUcsRUFBRUg7SUFDUCxDQUFDLENBQUM7SUFFRnVFLFVBQVUsQ0FBQ3JELE1BQU0sR0FBRyxJQUFBQyxnQkFBUSxFQUFDb0QsVUFBVSxDQUFDckQsTUFBTSxDQUFDO0lBRS9DNUIsR0FBRyxDQUFDOEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7TUFBRUMsSUFBSSxFQUFFaUQsVUFBVTtNQUFFaEQsT0FBTyxFQUFFO0lBQVUsQ0FBQyxDQUFDO0VBQ2hFLENBQUMsQ0FBQyxPQUFPQyxLQUFVLEVBQUU7SUFDbkJsQyxHQUFHLENBQUM4QixNQUFNLENBQUNJLEtBQUssRUFBRUosTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7TUFDcENFLE9BQU8sRUFBRUMsS0FBSyxFQUFFRCxPQUFPLElBQUk7SUFDN0IsQ0FBQyxDQUFDO0VBQ0o7QUFDRixDQUFDO0FBQUEsZ0JBN05HcEMsZUFBZSxnQkErTkMsT0FBT0UsR0FBWSxFQUFFQyxHQUFhLEtBQUs7RUFDekQsSUFBSTtJQUNGLE1BQU1VLE1BQU0sR0FBR1gsR0FBRyxDQUFDVSxNQUFNLENBQUNzRCxFQUFFO0lBQzVCLE1BQU1DLFFBQVEsR0FBRyxNQUFNekQsYUFBSSxDQUFDQyxRQUFRLENBQUM7TUFBRUssR0FBRyxFQUFFSDtJQUFPLENBQUMsQ0FBQztJQUNyRCxJQUFJLENBQUNzRCxRQUFRLEVBQ1gsTUFBTSxJQUFJckQsNEJBQWEsQ0FBQyxHQUFHLEVBQUUsb0JBQW9CLENBQUM7SUFFcEQsTUFBTUosYUFBSSxDQUFDMkUsU0FBUyxDQUFDO01BQUVyRSxHQUFHLEVBQUVIO0lBQU8sQ0FBQyxDQUFDO0lBRXJDc0QsUUFBUSxDQUFDcEMsTUFBTSxHQUFHLElBQUFDLGdCQUFRLEVBQUNtQyxRQUFRLENBQUNwQyxNQUFNLENBQUM7SUFDM0M1QixHQUFHLENBQUM4QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztNQUFFQyxJQUFJLEVBQUVnQyxRQUFRO01BQUUvQixPQUFPLEVBQUU7SUFBVSxDQUFDLENBQUM7RUFDOUQsQ0FBQyxDQUFDLE9BQU9DLEtBQVUsRUFBRTtJQUNuQmxDLEdBQUcsQ0FBQzhCLE1BQU0sQ0FBQ0ksS0FBSyxFQUFFSixNQUFNLElBQUksR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztNQUNwQ0UsT0FBTyxFQUFFQyxLQUFLLEVBQUVELE9BQU8sSUFBSTtJQUM3QixDQUFDLENBQUM7RUFDSjtBQUNGLENBQUM7QUFBQSxlQUdZcEMsZUFBZTtBQUFBIn0=