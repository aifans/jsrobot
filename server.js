let express = require('express');
let port = process.env.PORT || 8080;

let path = require('path');

let bodyParser = require('body-parser');
let methodOverride = require('method-override');

let session = require('express-session');
let FileStore = require('session-file-store')(session);

let log4js = require('log4js');
log4js.configure('config/log4js.json');
let logger = log4js.getLogger('server.js');

let app = express();

app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'trace' }));

app.use(express.static('./public')); 		// set the static files location /public/img will be /img for users

app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

let identityKey = 'jsrobot';
app.use(session({
    name: identityKey,
    secret: 'jsrobot-secret',  // 用来对session id相关的cookie进行签名
//    store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
    resave: false,  // 是否每次都重新保存会话，建议false
    cookie: {
        maxAge: 3600 * 1000
    }
}));

// routes ======================================================================
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
logger.info('App listening on port ' + port);
