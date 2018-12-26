let logger = require('log4js').getLogger('router.js');

//let CJsRoom = require('./models/CJsRoom.js');
let CJsRoom = require('./models/CJsRoom.js');
let jsRobot = require('./models/CJsRobot.js');
let robotLocation = require('./models/CRobotLocation.js');
let CPoint = require('./models/CPoint.js');
let EnumRoomType = require('./models/EnumRoomType.js');

module.exports = function(app) {

    // initRoom?type=0&len=5
    app.get('/api/initRoom', function(req, res) {

        const enumRoomType = req.query.type;
        //logger.debug(enumRoomType, typeof(req.query.type));

        //logger.debug(req.session.room);

/*
        let jsRoomInited = null;
        if (req.session.room) {
            jsRoomInited = req.session.room;

            logger.info('room existed in session.');

        } else {
            jsRoomInited = initRoom(type, len);
            req.session.room = jsRoomInited;

            logger.info('room created and saved in session.');

        }
 */


        let jsRoom = CJsRoom.initRoom(enumRoomType);
        logger.debug(typeof(jsRoom));

        let result = null;
        switch (enumRoomType) {

            case EnumRoomType.SQUARE:

                const sideLength = req.query.len;
                result = jsRoom.initRoom(sideLength);

                break;

            case EnumRoomType.CIRCLE:

                const radius = req.query.r;
                result = jsRoom.initRoom(radius);

                break;

            default:

        }

        jsRoom.initRobot(new CPoint(1, 2));
        jsRoom.moveRobot('HGHGGHGHG');

        req.session.room = jsRoom;
        res.json(jsRoom);

    });

    // initRobot?x=1&y=0
    app.post('/api/initRobot', function(req, res) {

        const x = req.query.x;
        const y = req.query.y;
        let jsRoom = req.session.room;

        let point = new CPoint(x, y);
        let result = jsRoom.initRobot(point);

        req.session.room = jsRoom;
        res.json(result);
    });

    // moveRobot?cmd=HGHGGHGHG
    app.post('/api/moveRobot', function(req, res) {

        const cmd = req.query.cmd;
        let jsRoom = req.session.room;

        let result = jsRoom.moveRobot(cmd);

        req.session.room = jsRoom;
        res.json(result);
    });

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
