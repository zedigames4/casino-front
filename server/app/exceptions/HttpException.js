"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HttpException = void 0;
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class HttpException extends Error {
  constructor(status, message) {
    super(message);
    _defineProperty(this, "status", void 0);
    _defineProperty(this, "message", void 0);
    this.status = status;
    this.message = message;
  }
}
exports.HttpException = HttpException;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJIdHRwRXhjZXB0aW9uIiwiRXJyb3IiLCJjb25zdHJ1Y3RvciIsInN0YXR1cyIsIm1lc3NhZ2UiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2V4Y2VwdGlvbnMvSHR0cEV4Y2VwdGlvbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgSHR0cEV4Y2VwdGlvbiBleHRlbmRzIEVycm9yIHtcclxuICBwdWJsaWMgc3RhdHVzOiBudW1iZXI7XHJcblxyXG4gIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHN0YXR1czogbnVtYmVyLCBtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgIHN1cGVyKG1lc3NhZ2UpO1xyXG4gICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XHJcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xyXG4gIH1cclxufVxyXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFPLE1BQU1BLGFBQWEsU0FBU0MsS0FBSyxDQUFDO0VBS3ZDQyxXQUFXLENBQUNDLE1BQWMsRUFBRUMsT0FBZSxFQUFFO0lBQzNDLEtBQUssQ0FBQ0EsT0FBTyxDQUFDO0lBQUM7SUFBQTtJQUNmLElBQUksQ0FBQ0QsTUFBTSxHQUFHQSxNQUFNO0lBQ3BCLElBQUksQ0FBQ0MsT0FBTyxHQUFHQSxPQUFPO0VBQ3hCO0FBQ0Y7QUFBQyJ9