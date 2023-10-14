"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _bcryptjs = require("bcryptjs");
var _jsonwebtoken = require("jsonwebtoken");
var _HttpException = require("../exceptions/HttpException");
var _User = _interopRequireDefault(require("../models/User"));
var _keys = _interopRequireDefault(require("../keys"));
var _email = _interopRequireDefault(require("../utils/email"));
var _nodemailer = _interopRequireDefault(require("../utils/nodemailer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class AuthController {
  static createToken(id, email, role, firstName) {
    const dataStoredInToken = {
      id,
      email,
      role,
      firstName
    };
    const secretKey = _keys.default.SECRET_KEY;
    const expiresIn = _keys.default.TOKEN_EXPIRES_IN;
    return {
      expiresIn,
      token: (0, _jsonwebtoken.sign)(dataStoredInToken, secretKey, {
        expiresIn
      })
    };
  }
  static createCookie(tokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
  static async forgettingPassword(req, res) {
    let {
      email
    } = req.body;
    try {
      email = email.toLowerCase().trim();
      const user = await _User.default.findOne({
        email
      });
      if (!user) {
        throw new _HttpException.HttpException(409, 'user not found, signup');
      }
      const {
        token
      } = AuthController.createToken(user._id.toString(), user.email, user.role, user.firstName);
      const message = _email.default.forgetPassword(token);
      const subject = 'Reset Password';
      (0, _nodemailer.default)(user.email, subject, message);
      res.status(200).json({
        message: 'check your email'
      });
    } catch (error) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong'
      });
    }
  }
  static async resetingPassword(req, res) {
    const {
      password,
      token
    } = req.body;
    try {
      const decoded = AuthController.decode(token);
      const {
        id
      } = decoded;
      let user = await _User.default.findById(id);
      if (!user) {
        throw new _HttpException.HttpException(409, 'user not found, signup');
      }
      const hashPassword = await (0, _bcryptjs.hash)(password, 12);
      user.set({
        password: hashPassword
      });
      user = await user.save();
      res.status(201).json({
        message: 'password updated'
      });
    } catch (error) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong'
      });
    }
  }
  static async confirmAccount(req, res) {
    const {
      token
    } = req.body;
    try {
      const decodedToken = (0, _jsonwebtoken.decode)(token);
      if (!decodedToken) {
        throw new _HttpException.HttpException(400, 'Your verification link may have expired.');
      }
      let user = await _User.default.findById(decodedToken.id);
      if (!user) {
        throw new _HttpException.HttpException(401, 'user not found, signup first');
      }
      if (user.verified) {
        res.status(200).json({
          message: 'user verified, login',
          data: user
        });
      } else {
        user.verified = true;
        user = await user.save();
        res.status(200).json({
          message: 'verified successfully',
          data: user
        });
      }
    } catch (err) {
      const message = err.message || 'something went wrong';
      res.status(err?.status || 500).json({
        message: err?.message || 'something went wrong'
      });
    }
  }
  static generateReferralCode() {
    // Generate a random string of 6 characters
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i += 1) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }
}
_defineProperty(AuthController, "signUp", async (req, res) => {
  try {
    const userData = req.body;
    const {
      referralCode
    } = userData;
    let referrer;
    if (referralCode) {
      referrer = await _User.default.findOne({
        referralCode
      });
      if (!referrer) {
        throw new _HttpException.HttpException(400, 'Invalid referral code');
      }
    }
    const findUser = await _User.default.findOne({
      email: userData.email
    }).exec();
    if (findUser) throw new _HttpException.HttpException(409, `This email ${userData.email} already exists`);
    const hashedPassword = await (0, _bcryptjs.hash)(userData.password, 10);
    const createUserData = new _User.default(_objectSpread(_objectSpread({}, userData), {}, {
      referralCode: AuthController.generateReferralCode(),
      referrer: referrer ? referrer._id : null,
      password: hashedPassword
    }));
    const signUpUserData = await createUserData.save();
    if (referrer) {
      referrer.invitedFriends.push(signUpUserData._id);
      await referrer.save();
    }
    const {
      token
    } = AuthController.createToken(signUpUserData._id.toString(), signUpUserData.email, signUpUserData.role, signUpUserData.firstName);
    const message = _email.default.verifyAccount(signUpUserData.firstName, token);
    const subject = 'Account Verification';
    (0, _nodemailer.default)(signUpUserData.email, subject, message);
    res.status(201).json({
      data: signUpUserData,
      message: 'signup'
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      message: error?.message || 'something went wrong'
    });
  }
});
_defineProperty(AuthController, "logIn", async (req, res, next) => {
  try {
    const userData = req.body;
    const findUser = await _User.default.findOne({
      email: userData.email
    });
    if (!findUser) throw new _HttpException.HttpException(409, `Invalid login credentials. Please check your email and password and try again.`);
    const isPasswordMatching = await (0, _bcryptjs.compare)(userData.password, findUser.password);
    if (!isPasswordMatching) throw new _HttpException.HttpException(409, 'Invalid login credentials. Please check your email and password and try again.');
    if (!findUser.verified) throw new _HttpException.HttpException(400, `This email ${userData.email} was not verified, please check your email and follow instructions.`);
    const tokenData = AuthController.createToken(findUser._id.toString(), findUser.email, findUser.role, findUser.firstName);
    const cookie = AuthController.createCookie(tokenData);
    res.setHeader('Set-Cookie', [cookie]);
    res.status(200).json({
      data: findUser,
      tokenData,
      message: 'login'
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      message: error?.message || 'something went wrong'
    });
  }
});
_defineProperty(AuthController, "logOut", async (req, res) => {
  try {
    const userData = req.user;
    const findUser = await _User.default.findOne({
      email: userData.email,
      password: userData.password
    }).exec();
    if (!findUser) throw new _HttpException.HttpException(409, "User doesn't exist");
    res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
    res.status(200).json({
      data: findUser,
      message: 'logout'
    });
  } catch (error) {
    res.status(error?.status || 500).json({
      message: error?.message || 'something went wrong'
    });
  }
});
_defineProperty(AuthController, "decode", token => {
  const payload = (0, _jsonwebtoken.verify)(token, _keys.default.SECRET_KEY);
  return payload;
});
var _default = AuthController;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJBdXRoQ29udHJvbGxlciIsImNyZWF0ZVRva2VuIiwiaWQiLCJlbWFpbCIsInJvbGUiLCJmaXJzdE5hbWUiLCJkYXRhU3RvcmVkSW5Ub2tlbiIsInNlY3JldEtleSIsIktleXMiLCJTRUNSRVRfS0VZIiwiZXhwaXJlc0luIiwiVE9LRU5fRVhQSVJFU19JTiIsInRva2VuIiwic2lnbiIsImNyZWF0ZUNvb2tpZSIsInRva2VuRGF0YSIsImZvcmdldHRpbmdQYXNzd29yZCIsInJlcSIsInJlcyIsImJvZHkiLCJ0b0xvd2VyQ2FzZSIsInRyaW0iLCJ1c2VyIiwiVXNlciIsImZpbmRPbmUiLCJIdHRwRXhjZXB0aW9uIiwiX2lkIiwidG9TdHJpbmciLCJtZXNzYWdlIiwiZW1haWxNb2NrcyIsImZvcmdldFBhc3N3b3JkIiwic3ViamVjdCIsInNlbmRFbWFpbCIsInN0YXR1cyIsImpzb24iLCJlcnJvciIsInJlc2V0aW5nUGFzc3dvcmQiLCJwYXNzd29yZCIsImRlY29kZWQiLCJkZWNvZGUiLCJmaW5kQnlJZCIsImhhc2hQYXNzd29yZCIsImhhc2giLCJzZXQiLCJzYXZlIiwiY29uZmlybUFjY291bnQiLCJkZWNvZGVkVG9rZW4iLCJ2ZXJpZmllZCIsImRhdGEiLCJlcnIiLCJnZW5lcmF0ZVJlZmVycmFsQ29kZSIsImNoYXJzIiwiY29kZSIsImkiLCJjaGFyQXQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJsZW5ndGgiLCJ1c2VyRGF0YSIsInJlZmVycmFsQ29kZSIsInJlZmVycmVyIiwiZmluZFVzZXIiLCJleGVjIiwiaGFzaGVkUGFzc3dvcmQiLCJjcmVhdGVVc2VyRGF0YSIsInNpZ25VcFVzZXJEYXRhIiwiaW52aXRlZEZyaWVuZHMiLCJwdXNoIiwidmVyaWZ5QWNjb3VudCIsIm5leHQiLCJpc1Bhc3N3b3JkTWF0Y2hpbmciLCJjb21wYXJlIiwiY29va2llIiwic2V0SGVhZGVyIiwicGF5bG9hZCIsInZlcmlmeSJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29udHJvbGxlcnMvQXV0aENvbnRyb2xsZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dEZ1bmN0aW9uLCBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gJ2V4cHJlc3MnO1xyXG5pbXBvcnQgeyBjb21wYXJlLCBoYXNoIH0gZnJvbSAnYmNyeXB0anMnO1xyXG5pbXBvcnQgeyB2ZXJpZnksIHNpZ24sIGRlY29kZSB9IGZyb20gJ2pzb253ZWJ0b2tlbic7XHJcbmltcG9ydCB7IEh0dHBFeGNlcHRpb24gfSBmcm9tICcuLi9leGNlcHRpb25zL0h0dHBFeGNlcHRpb24nO1xyXG5pbXBvcnQgVXNlciBmcm9tICcuLi9tb2RlbHMvVXNlcic7XHJcbmltcG9ydCBLZXlzIGZyb20gJy4uL2tleXMnO1xyXG5pbXBvcnQgZW1haWxNb2NrcyBmcm9tICcuLi91dGlscy9lbWFpbCc7XHJcbmltcG9ydCBzZW5kRW1haWwgZnJvbSAnLi4vdXRpbHMvbm9kZW1haWxlcic7XHJcblxyXG5jbGFzcyBBdXRoQ29udHJvbGxlciB7XHJcbiAgc3RhdGljIHNpZ25VcCA9IGFzeW5jIChyZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHVzZXJEYXRhID0gcmVxLmJvZHk7XHJcblxyXG4gICAgICBjb25zdCB7IHJlZmVycmFsQ29kZSB9ID0gdXNlckRhdGE7XHJcblxyXG4gICAgICBsZXQgcmVmZXJyZXI7XHJcbiAgICAgIGlmIChyZWZlcnJhbENvZGUpIHtcclxuICAgICAgICByZWZlcnJlciA9IGF3YWl0IFVzZXIuZmluZE9uZSh7IHJlZmVycmFsQ29kZSB9KTtcclxuICAgICAgICBpZiAoIXJlZmVycmVyKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbig0MDAsICdJbnZhbGlkIHJlZmVycmFsIGNvZGUnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGZpbmRVc2VyID0gYXdhaXQgVXNlci5maW5kT25lKHtcclxuICAgICAgICBlbWFpbDogdXNlckRhdGEuZW1haWwsXHJcbiAgICAgIH0pLmV4ZWMoKTtcclxuICAgICAgaWYgKGZpbmRVc2VyKVxyXG4gICAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKFxyXG4gICAgICAgICAgNDA5LFxyXG4gICAgICAgICAgYFRoaXMgZW1haWwgJHt1c2VyRGF0YS5lbWFpbH0gYWxyZWFkeSBleGlzdHNgLFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICBjb25zdCBoYXNoZWRQYXNzd29yZCA9IGF3YWl0IGhhc2godXNlckRhdGEucGFzc3dvcmQsIDEwKTtcclxuICAgICAgY29uc3QgY3JlYXRlVXNlckRhdGEgPSBuZXcgVXNlcih7XHJcbiAgICAgICAgLi4udXNlckRhdGEsXHJcbiAgICAgICAgcmVmZXJyYWxDb2RlOiBBdXRoQ29udHJvbGxlci5nZW5lcmF0ZVJlZmVycmFsQ29kZSgpLFxyXG4gICAgICAgIHJlZmVycmVyOiByZWZlcnJlciA/IHJlZmVycmVyLl9pZCA6IG51bGwsXHJcbiAgICAgICAgcGFzc3dvcmQ6IGhhc2hlZFBhc3N3b3JkLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNvbnN0IHNpZ25VcFVzZXJEYXRhID0gYXdhaXQgY3JlYXRlVXNlckRhdGEuc2F2ZSgpO1xyXG5cclxuICAgICAgaWYgKHJlZmVycmVyKSB7XHJcbiAgICAgICAgcmVmZXJyZXIuaW52aXRlZEZyaWVuZHMucHVzaChzaWduVXBVc2VyRGF0YS5faWQpO1xyXG4gICAgICAgIGF3YWl0IHJlZmVycmVyLnNhdmUoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgeyB0b2tlbiB9ID0gQXV0aENvbnRyb2xsZXIuY3JlYXRlVG9rZW4oXHJcbiAgICAgICAgc2lnblVwVXNlckRhdGEuX2lkLnRvU3RyaW5nKCksXHJcbiAgICAgICAgc2lnblVwVXNlckRhdGEuZW1haWwsXHJcbiAgICAgICAgc2lnblVwVXNlckRhdGEucm9sZSxcclxuICAgICAgICBzaWduVXBVc2VyRGF0YS5maXJzdE5hbWUsXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBjb25zdCBtZXNzYWdlID0gZW1haWxNb2Nrcy52ZXJpZnlBY2NvdW50KFxyXG4gICAgICAgIHNpZ25VcFVzZXJEYXRhLmZpcnN0TmFtZSxcclxuICAgICAgICB0b2tlbixcclxuICAgICAgKTtcclxuICAgICAgY29uc3Qgc3ViamVjdCA9ICdBY2NvdW50IFZlcmlmaWNhdGlvbic7XHJcbiAgICAgIHNlbmRFbWFpbChzaWduVXBVc2VyRGF0YS5lbWFpbCwgc3ViamVjdCwgbWVzc2FnZSk7XHJcblxyXG4gICAgICByZXNcclxuICAgICAgICAuc3RhdHVzKDIwMSlcclxuICAgICAgICAuanNvbih7IGRhdGE6IHNpZ25VcFVzZXJEYXRhLCBtZXNzYWdlOiAnc2lnbnVwJyB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgICAgcmVzLnN0YXR1cyhlcnJvcj8uc3RhdHVzIHx8IDUwMCkuanNvbih7XHJcbiAgICAgICAgbWVzc2FnZTogZXJyb3I/Lm1lc3NhZ2UgfHwgJ3NvbWV0aGluZyB3ZW50IHdyb25nJyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIGxvZ0luID0gYXN5bmMgKFxyXG4gICAgcmVxOiBSZXF1ZXN0LFxyXG4gICAgcmVzOiBSZXNwb25zZSxcclxuICAgIG5leHQ6IE5leHRGdW5jdGlvbixcclxuICApID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHVzZXJEYXRhOiBhbnkgPSByZXEuYm9keTtcclxuXHJcbiAgICAgIGNvbnN0IGZpbmRVc2VyID0gYXdhaXQgVXNlci5maW5kT25lKHtcclxuICAgICAgICBlbWFpbDogdXNlckRhdGEuZW1haWwsXHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAoIWZpbmRVc2VyKVxyXG4gICAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKFxyXG4gICAgICAgICAgNDA5LFxyXG4gICAgICAgICAgYEludmFsaWQgbG9naW4gY3JlZGVudGlhbHMuIFBsZWFzZSBjaGVjayB5b3VyIGVtYWlsIGFuZCBwYXNzd29yZCBhbmQgdHJ5IGFnYWluLmAsXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgIGNvbnN0IGlzUGFzc3dvcmRNYXRjaGluZzogYm9vbGVhbiA9IGF3YWl0IGNvbXBhcmUoXHJcbiAgICAgICAgdXNlckRhdGEucGFzc3dvcmQsXHJcbiAgICAgICAgZmluZFVzZXIucGFzc3dvcmQsXHJcbiAgICAgICk7XHJcbiAgICAgIGlmICghaXNQYXNzd29yZE1hdGNoaW5nKVxyXG4gICAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKFxyXG4gICAgICAgICAgNDA5LFxyXG4gICAgICAgICAgJ0ludmFsaWQgbG9naW4gY3JlZGVudGlhbHMuIFBsZWFzZSBjaGVjayB5b3VyIGVtYWlsIGFuZCBwYXNzd29yZCBhbmQgdHJ5IGFnYWluLicsXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgIGlmICghZmluZFVzZXIudmVyaWZpZWQpXHJcbiAgICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oXHJcbiAgICAgICAgICA0MDAsXHJcbiAgICAgICAgICBgVGhpcyBlbWFpbCAke3VzZXJEYXRhLmVtYWlsfSB3YXMgbm90IHZlcmlmaWVkLCBwbGVhc2UgY2hlY2sgeW91ciBlbWFpbCBhbmQgZm9sbG93IGluc3RydWN0aW9ucy5gLFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICBjb25zdCB0b2tlbkRhdGEgPSBBdXRoQ29udHJvbGxlci5jcmVhdGVUb2tlbihcclxuICAgICAgICBmaW5kVXNlci5faWQudG9TdHJpbmcoKSxcclxuICAgICAgICBmaW5kVXNlci5lbWFpbCxcclxuICAgICAgICBmaW5kVXNlci5yb2xlLFxyXG4gICAgICAgIGZpbmRVc2VyLmZpcnN0TmFtZSxcclxuICAgICAgKTtcclxuICAgICAgY29uc3QgY29va2llID0gQXV0aENvbnRyb2xsZXIuY3JlYXRlQ29va2llKHRva2VuRGF0YSk7XHJcblxyXG4gICAgICByZXMuc2V0SGVhZGVyKCdTZXQtQ29va2llJywgW2Nvb2tpZV0pO1xyXG4gICAgICByZXNcclxuICAgICAgICAuc3RhdHVzKDIwMClcclxuICAgICAgICAuanNvbih7IGRhdGE6IGZpbmRVc2VyLCB0b2tlbkRhdGEsIG1lc3NhZ2U6ICdsb2dpbicgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XHJcbiAgICAgIHJlcy5zdGF0dXMoZXJyb3I/LnN0YXR1cyB8fCA1MDApLmpzb24oe1xyXG4gICAgICAgIG1lc3NhZ2U6IGVycm9yPy5tZXNzYWdlIHx8ICdzb21ldGhpbmcgd2VudCB3cm9uZycsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHN0YXRpYyBsb2dPdXQgPSBhc3luYyAocmVxOiBhbnksIHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHVzZXJEYXRhID0gcmVxLnVzZXI7XHJcbiAgICAgIGNvbnN0IGZpbmRVc2VyID0gYXdhaXQgVXNlci5maW5kT25lKHtcclxuICAgICAgICBlbWFpbDogdXNlckRhdGEuZW1haWwsXHJcbiAgICAgICAgcGFzc3dvcmQ6IHVzZXJEYXRhLnBhc3N3b3JkLFxyXG4gICAgICB9KS5leGVjKCk7XHJcbiAgICAgIGlmICghZmluZFVzZXIpXHJcbiAgICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oNDA5LCBcIlVzZXIgZG9lc24ndCBleGlzdFwiKTtcclxuXHJcbiAgICAgIHJlcy5zZXRIZWFkZXIoJ1NldC1Db29raWUnLCBbJ0F1dGhvcml6YXRpb249OyBNYXgtYWdlPTAnXSk7XHJcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgZGF0YTogZmluZFVzZXIsIG1lc3NhZ2U6ICdsb2dvdXQnIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xyXG4gICAgICByZXMuc3RhdHVzKGVycm9yPy5zdGF0dXMgfHwgNTAwKS5qc29uKHtcclxuICAgICAgICBtZXNzYWdlOiBlcnJvcj8ubWVzc2FnZSB8fCAnc29tZXRoaW5nIHdlbnQgd3JvbmcnLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBzdGF0aWMgY3JlYXRlVG9rZW4oXHJcbiAgICBpZDogc3RyaW5nLFxyXG4gICAgZW1haWw6IHN0cmluZyxcclxuICAgIHJvbGU6IHN0cmluZyxcclxuICAgIGZpcnN0TmFtZTogc3RyaW5nLFxyXG4gICkge1xyXG4gICAgY29uc3QgZGF0YVN0b3JlZEluVG9rZW4gPSB7XHJcbiAgICAgIGlkLFxyXG4gICAgICBlbWFpbCxcclxuICAgICAgcm9sZSxcclxuICAgICAgZmlyc3ROYW1lLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHNlY3JldEtleTogc3RyaW5nID0gS2V5cy5TRUNSRVRfS0VZO1xyXG4gICAgY29uc3QgZXhwaXJlc0luOiBudW1iZXIgfCBzdHJpbmcgPSBLZXlzLlRPS0VOX0VYUElSRVNfSU47XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZXhwaXJlc0luLFxyXG4gICAgICB0b2tlbjogc2lnbihkYXRhU3RvcmVkSW5Ub2tlbiwgc2VjcmV0S2V5LCB7IGV4cGlyZXNJbiB9KSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY3JlYXRlQ29va2llKHRva2VuRGF0YTogYW55KTogc3RyaW5nIHtcclxuICAgIHJldHVybiBgQXV0aG9yaXphdGlvbj0ke3Rva2VuRGF0YS50b2tlbn07IEh0dHBPbmx5OyBNYXgtQWdlPSR7dG9rZW5EYXRhLmV4cGlyZXNJbn07YDtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBkZWNvZGUgPSAodG9rZW46IHN0cmluZykgPT4ge1xyXG4gICAgY29uc3QgcGF5bG9hZCA9IHZlcmlmeSh0b2tlbiwgS2V5cy5TRUNSRVRfS0VZKTtcclxuICAgIHJldHVybiBwYXlsb2FkO1xyXG4gIH07XHJcblxyXG4gIHN0YXRpYyBhc3luYyBmb3JnZXR0aW5nUGFzc3dvcmQocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XHJcbiAgICBsZXQgeyBlbWFpbCB9ID0gcmVxLmJvZHk7XHJcbiAgICB0cnkge1xyXG4gICAgICBlbWFpbCA9IGVtYWlsLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xyXG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlci5maW5kT25lKHsgZW1haWwgfSk7XHJcbiAgICAgIGlmICghdXNlcikge1xyXG4gICAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKDQwOSwgJ3VzZXIgbm90IGZvdW5kLCBzaWdudXAnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgeyB0b2tlbiB9ID0gQXV0aENvbnRyb2xsZXIuY3JlYXRlVG9rZW4oXHJcbiAgICAgICAgdXNlci5faWQudG9TdHJpbmcoKSxcclxuICAgICAgICB1c2VyLmVtYWlsLFxyXG4gICAgICAgIHVzZXIucm9sZSxcclxuICAgICAgICB1c2VyLmZpcnN0TmFtZSxcclxuICAgICAgKTtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IGVtYWlsTW9ja3MuZm9yZ2V0UGFzc3dvcmQodG9rZW4pO1xyXG4gICAgICBjb25zdCBzdWJqZWN0ID0gJ1Jlc2V0IFBhc3N3b3JkJztcclxuICAgICAgc2VuZEVtYWlsKHVzZXIuZW1haWwsIHN1YmplY3QsIG1lc3NhZ2UpO1xyXG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgICAgbWVzc2FnZTogJ2NoZWNrIHlvdXIgZW1haWwnLFxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHJlcy5zdGF0dXMoZXJyb3I/LnN0YXR1cyB8fCA1MDApLmpzb24oe1xyXG4gICAgICAgIG1lc3NhZ2U6IGVycm9yPy5tZXNzYWdlIHx8ICdzb21ldGhpbmcgd2VudCB3cm9uZycsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGFzeW5jIHJlc2V0aW5nUGFzc3dvcmQocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XHJcbiAgICBjb25zdCB7IHBhc3N3b3JkLCB0b2tlbiB9ID0gcmVxLmJvZHk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBkZWNvZGVkOiBhbnkgPSBBdXRoQ29udHJvbGxlci5kZWNvZGUodG9rZW4pO1xyXG4gICAgICBjb25zdCB7IGlkIH0gPSBkZWNvZGVkO1xyXG4gICAgICBsZXQgdXNlciA9IGF3YWl0IFVzZXIuZmluZEJ5SWQoaWQpO1xyXG4gICAgICBpZiAoIXVzZXIpIHtcclxuICAgICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbig0MDksICd1c2VyIG5vdCBmb3VuZCwgc2lnbnVwJyk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgaGFzaFBhc3N3b3JkID0gYXdhaXQgaGFzaChwYXNzd29yZCwgMTIpO1xyXG5cclxuICAgICAgdXNlci5zZXQoeyBwYXNzd29yZDogaGFzaFBhc3N3b3JkIH0pO1xyXG4gICAgICB1c2VyID0gYXdhaXQgdXNlci5zYXZlKCk7XHJcbiAgICAgIHJlcy5zdGF0dXMoMjAxKS5qc29uKHtcclxuICAgICAgICBtZXNzYWdlOiAncGFzc3dvcmQgdXBkYXRlZCcsXHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgcmVzLnN0YXR1cyhlcnJvcj8uc3RhdHVzIHx8IDUwMCkuanNvbih7XHJcbiAgICAgICAgbWVzc2FnZTogZXJyb3I/Lm1lc3NhZ2UgfHwgJ3NvbWV0aGluZyB3ZW50IHdyb25nJyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgYXN5bmMgY29uZmlybUFjY291bnQocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlKSB7XHJcbiAgICBjb25zdCB7IHRva2VuIH0gPSByZXEuYm9keTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGRlY29kZWRUb2tlbjogYW55ID0gZGVjb2RlKHRva2VuKTtcclxuICAgICAgaWYgKCFkZWNvZGVkVG9rZW4pIHtcclxuICAgICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbihcclxuICAgICAgICAgIDQwMCxcclxuICAgICAgICAgICdZb3VyIHZlcmlmaWNhdGlvbiBsaW5rIG1heSBoYXZlIGV4cGlyZWQuJyxcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCB1c2VyID0gYXdhaXQgVXNlci5maW5kQnlJZChkZWNvZGVkVG9rZW4uaWQpO1xyXG4gICAgICBpZiAoIXVzZXIpIHtcclxuICAgICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbig0MDEsICd1c2VyIG5vdCBmb3VuZCwgc2lnbnVwIGZpcnN0Jyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh1c2VyLnZlcmlmaWVkKSB7XHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICAgICAgbWVzc2FnZTogJ3VzZXIgdmVyaWZpZWQsIGxvZ2luJyxcclxuICAgICAgICAgIGRhdGE6IHVzZXIsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdXNlci52ZXJpZmllZCA9IHRydWU7XHJcbiAgICAgICAgdXNlciA9IGF3YWl0IHVzZXIuc2F2ZSgpO1xyXG5cclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XHJcbiAgICAgICAgICBtZXNzYWdlOiAndmVyaWZpZWQgc3VjY2Vzc2Z1bGx5JyxcclxuICAgICAgICAgIGRhdGE6IHVzZXIsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnIubWVzc2FnZSB8fCAnc29tZXRoaW5nIHdlbnQgd3JvbmcnO1xyXG4gICAgICByZXMuc3RhdHVzKGVycj8uc3RhdHVzIHx8IDUwMCkuanNvbih7XHJcbiAgICAgICAgbWVzc2FnZTogZXJyPy5tZXNzYWdlIHx8ICdzb21ldGhpbmcgd2VudCB3cm9uZycsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdlbmVyYXRlUmVmZXJyYWxDb2RlKCkge1xyXG4gICAgLy8gR2VuZXJhdGUgYSByYW5kb20gc3RyaW5nIG9mIDYgY2hhcmFjdGVyc1xyXG4gICAgY29uc3QgY2hhcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVowMTIzNDU2Nzg5JztcclxuICAgIGxldCBjb2RlID0gJyc7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkgKz0gMSkge1xyXG4gICAgICBjb2RlICs9IGNoYXJzLmNoYXJBdChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFycy5sZW5ndGgpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjb2RlO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXV0aENvbnRyb2xsZXI7XHJcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBNEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRTVDLE1BQU1BLGNBQWMsQ0FBQztFQXNJbkIsT0FBT0MsV0FBVyxDQUNoQkMsRUFBVSxFQUNWQyxLQUFhLEVBQ2JDLElBQVksRUFDWkMsU0FBaUIsRUFDakI7SUFDQSxNQUFNQyxpQkFBaUIsR0FBRztNQUN4QkosRUFBRTtNQUNGQyxLQUFLO01BQ0xDLElBQUk7TUFDSkM7SUFDRixDQUFDO0lBQ0QsTUFBTUUsU0FBaUIsR0FBR0MsYUFBSSxDQUFDQyxVQUFVO0lBQ3pDLE1BQU1DLFNBQTBCLEdBQUdGLGFBQUksQ0FBQ0csZ0JBQWdCO0lBRXhELE9BQU87TUFDTEQsU0FBUztNQUNURSxLQUFLLEVBQUUsSUFBQUMsa0JBQUksRUFBQ1AsaUJBQWlCLEVBQUVDLFNBQVMsRUFBRTtRQUFFRztNQUFVLENBQUM7SUFDekQsQ0FBQztFQUNIO0VBRUEsT0FBT0ksWUFBWSxDQUFDQyxTQUFjLEVBQVU7SUFDMUMsT0FBUSxpQkFBZ0JBLFNBQVMsQ0FBQ0gsS0FBTSx1QkFBc0JHLFNBQVMsQ0FBQ0ws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