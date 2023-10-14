"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _keys = _interopRequireDefault(require("../keys"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class emailMocks {
  static verifyAccount(firstName, token) {
    return `
        <div style="width:85%;margin:auto;">
            <p style="font-family: 'Roboto', sans-serif;font-size: 1.2em;font-weight: 400;line-height: 1.55;color: #222222;margin: 10px 0 30px;padding: 44px 34px 44px 34px;background-color: #ffffff;border-radius: 8px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 210, 190, 129);">
                Hi <span>${firstName}</span>,<br><br>
                Welcome to Play in rwanda, PLAY & GAIN REWARDS FREE, FUN & FAIR REWARD FOR EVERYONE!!<br /> <br />
                You have access to popular games, <br />
                Activate your account to get started. <br />
                <a href="${_keys.default.FRONT_END_URL || _keys.default.HOST}/activate?key=${token}" style="text-decoration:none; border: none;color: white;padding: 10px; text-align: center;text-decoration: none;display: inline-block;font-size: 16px;margin: 4px 2px;cursor: pointer;background-color: #4CAF50;">Click Here</a>
                <br />
                <br />
                Welcome again! Kindly confirm your registration as soon as possible! <br><br>
                Best Wishes,
                <br />
                <p>Play in rwanda</p>
            </p>
        </div>
      `;
  }
  static forgetPassword(token) {
    const url = `${_keys.default.FRONT_END_URL || _keys.default.HOST}/reset-password?key=${token}`;
    return `
        <div style="width:85%;margin:auto;">
            <p style="font-family: 'Roboto', sans-serif;font-size: 1.2em;font-weight: 400;line-height: 1.55;color: #222222;margin: 10px 0 30px;padding: 44px 34px 44px 34px;background-color: #ffffff;border-radius: 8px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 210, 190, 129);">
               Hello, <br><br>
               No worries humans forget, you are missing in the Play in rwanda :-( <br />
               Straight forward use this link to catch up and access your account <br />
               as usual with Play in rwanda <br />
               <b style="color:#2E86C1"><a href="${url}" style="color:#4CAF50">click here</a></b><br>
            <strong>NB:</strong><span style="color:OrangeRed">  remember that this link will be expired not too Long </span>
                <br />
                <br />                
                Best,
                <br>
                <p>Play in rwanda</p>
            </p>
        </div>
      `;
  }
}
exports.default = emailMocks;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJlbWFpbE1vY2tzIiwidmVyaWZ5QWNjb3VudCIsImZpcnN0TmFtZSIsInRva2VuIiwiS2V5cyIsIkZST05UX0VORF9VUkwiLCJIT1NUIiwiZm9yZ2V0UGFzc3dvcmQiLCJ1cmwiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL3V0aWxzL2VtYWlsLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBLZXlzIGZyb20gJy4uL2tleXMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZW1haWxNb2NrcyB7XHJcbiAgc3RhdGljIHZlcmlmeUFjY291bnQoZmlyc3ROYW1lOiBzdHJpbmcsIHRva2VuOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBgXHJcbiAgICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOjg1JTttYXJnaW46YXV0bztcIj5cclxuICAgICAgICAgICAgPHAgc3R5bGU9XCJmb250LWZhbWlseTogJ1JvYm90bycsIHNhbnMtc2VyaWY7Zm9udC1zaXplOiAxLjJlbTtmb250LXdlaWdodDogNDAwO2xpbmUtaGVpZ2h0OiAxLjU1O2NvbG9yOiAjMjIyMjIyO21hcmdpbjogMTBweCAwIDMwcHg7cGFkZGluZzogNDRweCAzNHB4IDQ0cHggMzRweDtiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO2JvcmRlci1yYWRpdXM6IDhweDsgYm94LXNoYWRvdzogMCA0cHggOHB4IDAgcmdiYSgwLCAwLCAwLCAwLjIpLCAwIDZweCAyMHB4IDAgcmdiYSgwLCAyMTAsIDE5MCwgMTI5KTtcIj5cclxuICAgICAgICAgICAgICAgIEhpIDxzcGFuPiR7Zmlyc3ROYW1lfTwvc3Bhbj4sPGJyPjxicj5cclxuICAgICAgICAgICAgICAgIFdlbGNvbWUgdG8gUGxheSBpbiByd2FuZGEsIFBMQVkgJiBHQUlOIFJFV0FSRFMgRlJFRSwgRlVOICYgRkFJUiBSRVdBUkQgRk9SIEVWRVJZT05FISE8YnIgLz4gPGJyIC8+XHJcbiAgICAgICAgICAgICAgICBZb3UgaGF2ZSBhY2Nlc3MgdG8gcG9wdWxhciBnYW1lcywgPGJyIC8+XHJcbiAgICAgICAgICAgICAgICBBY3RpdmF0ZSB5b3VyIGFjY291bnQgdG8gZ2V0IHN0YXJ0ZWQuIDxiciAvPlxyXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIiR7XHJcbiAgICAgICAgICAgICAgICAgIEtleXMuRlJPTlRfRU5EX1VSTCB8fCBLZXlzLkhPU1RcclxuICAgICAgICAgICAgICAgIH0vYWN0aXZhdGU/a2V5PSR7dG9rZW59XCIgc3R5bGU9XCJ0ZXh0LWRlY29yYXRpb246bm9uZTsgYm9yZGVyOiBub25lO2NvbG9yOiB3aGl0ZTtwYWRkaW5nOiAxMHB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7dGV4dC1kZWNvcmF0aW9uOiBub25lO2Rpc3BsYXk6IGlubGluZS1ibG9jaztmb250LXNpemU6IDE2cHg7bWFyZ2luOiA0cHggMnB4O2N1cnNvcjogcG9pbnRlcjtiYWNrZ3JvdW5kLWNvbG9yOiAjNENBRjUwO1wiPkNsaWNrIEhlcmU8L2E+XHJcbiAgICAgICAgICAgICAgICA8YnIgLz5cclxuICAgICAgICAgICAgICAgIDxiciAvPlxyXG4gICAgICAgICAgICAgICAgV2VsY29tZSBhZ2FpbiEgS2luZGx5IGNvbmZpcm0geW91ciByZWdpc3RyYXRpb24gYXMgc29vbiBhcyBwb3NzaWJsZSEgPGJyPjxicj5cclxuICAgICAgICAgICAgICAgIEJlc3QgV2lzaGVzLFxyXG4gICAgICAgICAgICAgICAgPGJyIC8+XHJcbiAgICAgICAgICAgICAgICA8cD5QbGF5IGluIHJ3YW5kYTwvcD5cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICBgO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZvcmdldFBhc3N3b3JkKHRva2VuOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHVybCA9IGAke1xyXG4gICAgICBLZXlzLkZST05UX0VORF9VUkwgfHwgS2V5cy5IT1NUXHJcbiAgICB9L3Jlc2V0LXBhc3N3b3JkP2tleT0ke3Rva2VufWA7XHJcbiAgICByZXR1cm4gYFxyXG4gICAgICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDo4NSU7bWFyZ2luOmF1dG87XCI+XHJcbiAgICAgICAgICAgIDxwIHN0eWxlPVwiZm9udC1mYW1pbHk6ICdSb2JvdG8nLCBzYW5zLXNlcmlmO2ZvbnQtc2l6ZTogMS4yZW07Zm9udC13ZWlnaHQ6IDQwMDtsaW5lLWhlaWdodDogMS41NTtjb2xvcjogIzIyMjIyMjttYXJnaW46IDEwcHggMCAzMHB4O3BhZGRpbmc6IDQ0cHggMzRweCA0NHB4IDM0cHg7YmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtib3JkZXItcmFkaXVzOiA4cHg7IGJveC1zaGFkb3c6IDAgNHB4IDhweCAwIHJnYmEoMCwgMCwgMCwgMC4yKSwgMCA2cHggMjBweCAwIHJnYmEoMCwgMjEwLCAxOTAsIDEyOSk7XCI+XHJcbiAgICAgICAgICAgICAgIEhlbGxvLCA8YnI+PGJyPlxyXG4gICAgICAgICAgICAgICBObyB3b3JyaWVzIGh1bWFucyBmb3JnZXQsIHlvdSBhcmUgbWlzc2luZyBpbiB0aGUgUGxheSBpbiByd2FuZGEgOi0oIDxiciAvPlxyXG4gICAgICAgICAgICAgICBTdHJhaWdodCBmb3J3YXJkIHVzZSB0aGlzIGxpbmsgdG8gY2F0Y2ggdXAgYW5kIGFjY2VzcyB5b3VyIGFjY291bnQgPGJyIC8+XHJcbiAgICAgICAgICAgICAgIGFzIHVzdWFsIHdpdGggUGxheSBpbiByd2FuZGEgPGJyIC8+XHJcbiAgICAgICAgICAgICAgIDxiIHN0eWxlPVwiY29sb3I6IzJFODZDMVwiPjxhIGhyZWY9XCIke3VybH1cIiBzdHlsZT1cImNvbG9yOiM0Q0FGNTBcIj5jbGljayBoZXJlPC9hPjwvYj48YnI+XHJcbiAgICAgICAgICAgIDxzdHJvbmc+TkI6PC9zdHJvbmc+PHNwYW4gc3R5bGU9XCJjb2xvcjpPcmFuZ2VSZWRcIj4gIHJlbWVtYmVyIHRoYXQgdGhpcyBsaW5rIHdpbGwgYmUgZXhwaXJlZCBub3QgdG9vIExvbmcgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPGJyIC8+XHJcbiAgICAgICAgICAgICAgICA8YnIgLz4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBCZXN0LFxyXG4gICAgICAgICAgICAgICAgPGJyPlxyXG4gICAgICAgICAgICAgICAgPHA+UGxheSBpbiByd2FuZGE8L3A+XHJcbiAgICAgICAgICAgIDwvcD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgYDtcclxuICB9XHJcbn1cclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUEyQjtBQUVaLE1BQU1BLFVBQVUsQ0FBQztFQUM5QixPQUFPQyxhQUFhLENBQUNDLFNBQWlCLEVBQUVDLEtBQWEsRUFBRTtJQUNyRCxPQUFRO0FBQ1o7QUFDQTtBQUNBLDJCQUEyQkQsU0FBVTtBQUNyQztBQUNBO0FBQ0E7QUFDQSwyQkFDa0JFLGFBQUksQ0FBQ0MsYUFBYSxJQUFJRCxhQUFJLENBQUNFLElBQzVCLGlCQUFnQkgsS0FBTTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztFQUNMO0VBRUEsT0FBT0ksY0FBYyxDQUFDSixLQUFhLEVBQUU7SUFDbkMsTUFBTUssR0FBRyxHQUFJLEdBQ1hKLGFBQUksQ0FBQ0MsYUFBYSxJQUFJRCxhQUFJLENBQUNFLElBQzVCLHVCQUFzQkgsS0FBTSxFQUFDO0lBQzlCLE9BQVE7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbURLLEdBQUk7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87RUFDTDtBQUNGO0FBQUMifQ==