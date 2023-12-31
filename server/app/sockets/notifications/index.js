"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const ioNotifications = (io, socket) => {
  socket.on('notifications:login', message => {
    io.emit('notifications:newMessage', message);
  });
};
var _default = ioNotifications;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJpb05vdGlmaWNhdGlvbnMiLCJpbyIsInNvY2tldCIsIm9uIiwibWVzc2FnZSIsImVtaXQiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBwL3NvY2tldHMvbm90aWZpY2F0aW9ucy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZXJ2ZXIgfSBmcm9tICdzb2NrZXQuaW8nO1xyXG5pbXBvcnQgeyBTb2NrZXRXaXRoVXNlciB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvc29ja2V0LmludGVyZmFjZSc7XHJcblxyXG5pbnRlcmZhY2UgTWVzc2FnZSB7XHJcbiAgc2VuZGVyOiBzdHJpbmc7XHJcbiAgY29udGVudDogc3RyaW5nO1xyXG59XHJcblxyXG5jb25zdCBpb05vdGlmaWNhdGlvbnMgPSAoaW86IFNlcnZlciwgc29ja2V0OiBTb2NrZXRXaXRoVXNlcikgPT4ge1xyXG4gIHNvY2tldC5vbignbm90aWZpY2F0aW9uczpsb2dpbicsIChtZXNzYWdlOiBNZXNzYWdlKSA9PiB7XHJcbiAgICBpby5lbWl0KCdub3RpZmljYXRpb25zOm5ld01lc3NhZ2UnLCBtZXNzYWdlKTtcclxuICB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGlvTm90aWZpY2F0aW9ucztcclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFRQSxNQUFNQSxlQUFlLEdBQUcsQ0FBQ0MsRUFBVSxFQUFFQyxNQUFzQixLQUFLO0VBQzlEQSxNQUFNLENBQUNDLEVBQUUsQ0FBQyxxQkFBcUIsRUFBR0MsT0FBZ0IsSUFBSztJQUNyREgsRUFBRSxDQUFDSSxJQUFJLENBQUMsMEJBQTBCLEVBQUVELE9BQU8sQ0FBQztFQUM5QyxDQUFDLENBQUM7QUFDSixDQUFDO0FBQUMsZUFFYUosZUFBZTtBQUFBIn0=