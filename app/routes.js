let logger = require('log4js').getLogger('router.js');

let serialUtility = require('serialijse');

let EnumRoomType = require('./models/EnumRoomType.js');

let CJsRoom = require('./models/CJsRoom.js');
let CJsRoomSquare = require('./models/CJsRoomSquare.js');
let CJsRoomCircle = require('./models/CJsRoomCircle.js');
let CJsRobot = require('./models/CJsRobot.js');
let CRobotLocation = require('./models/CRobotLocation.js');
let CPoint = require('./models/CPoint.js');

serialUtility.declarePersistable(CJsRoomSquare);
serialUtility.declarePersistable(CJsRoomCircle);
serialUtility.declarePersistable(CJsRobot);
serialUtility.declarePersistable(CRobotLocation);
serialUtility.declarePersistable(CPoint);

module.exports = function(app) {

    // initRoom?type=0&len=5
    app.get('/api/initRoom', function(req, res) {

        const enumRoomType = parseInt(req.query.type);
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

                const sideLength = parseInt(req.query.len);
                result = jsRoom.initRoom(sideLength);

                break;

            case EnumRoomType.CIRCLE:

                const radius = parseInt(req.query.r);
                result = jsRoom.initRoom(radius);

                break;

            default:

        }

        //jsRoom.initRobot(new CPoint(1, 2));
        //jsRoom.moveRobot('HGHGGHGHG');

        //jsRoom.initRobot(new CPoint(0, 0));
        //jsRoom.moveRobot('RRFLFFLRF');

        //const obj = JSON.parse(JSON.stringify(jsRoom));
        //const room = Object.create(CJsRoomSquare.prototype, Object.getOwnPropertyDescriptors(obj));
        //room.initRobot(new CPoint(1, 2));
        //room.moveRobot('HGHGGHGHG');


        req.session.roomtype = enumRoomType;

        //serialUtility.declarePersistable(CJsRoomSquare);
        //serialUtility.declarePersistable(CJsRoomCircle);

        req.session.room = serialUtility.serialize(jsRoom);

        // req.session.room = JSON.stringify(jsRoom);
        //let robotLocation = jsRoom.getRobotLocation();
        //res.json('(' + robotLocation.point.x +' '+ robotLocation.point.y +' '+ robotLocation.direction +')');
        res.json(jsRoom);

    });

    // initRobot?x=1&y=2
    app.get('/api/initRobot', function(req, res) {

        const x = parseInt(req.query.x);
        const y = parseInt(req.query.y);

        //let jsRoom = getRoomFromSession(req.session.roomtype, req.session.room);
        let jsRoom = serialUtility.deserialize(req.session.room);

        let point = new CPoint(x, y);
        let result = jsRoom.initRobot(point);

        //req.session.room = JSON.stringify(jsRoom);

        //serialUtility.declarePersistable(CJsRobot);
        //serialUtility.declarePersistable(CRobotLocation);
        //serialUtility.declarePersistable(CPoint);

        req.session.room = serialUtility.serialize(jsRoom);

        res.json(jsRoom);
    });

    // moveRobot?cmd=HGHGGHGHG
    app.get('/api/moveRobot', function(req, res) {

        const cmd = req.query.cmd;

        //let jsRoom = getRoomFromSession(req.session.roomtype, req.session.room);
        let jsRoom = serialUtility.deserialize(req.session.room);

        let result = jsRoom.moveRobot(cmd);

        //req.session.room = JSON.stringify(jsRoom);

        req.session.room = serialUtility.serialize(jsRoom);

        res.json(jsRoom);
    });

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};

function getRoomFromSession(roomtype, roomString) {
    let jsRoom = null;

    switch (roomtype) {

        case EnumRoomType.SQUARE:

            const objSquare = JSON.parse(roomString);
            jsRoom = Object.create(CJsRoomSquare.prototype, Object.getOwnPropertyDescriptors(objSquare));

            break;

        case EnumRoomType.CIRCLE:

            const objCircle = JSON.parse(roomString);
            jsRoom = Object.create(CJsRoomCircle.prototype, Object.getOwnPropertyDescriptors(objCircle));

            break;

        default:

    }

    return jsRoom;
}