'use strict';

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const app_1 = _interopRequireDefault(require('./app'));
const _keys = _interopRequireDefault(require('./app/keys'));

const next = require('next');

const port = Number(_keys.default.PORT);

const dev = _keys.default.NODE_ENV !== 'production';
const hostname = 'localhost';

// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  app_1.default.express.get('*', (req, res) => handle(req, res));
  app_1.default.server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
