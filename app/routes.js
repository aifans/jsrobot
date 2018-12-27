let logger = require('log4js').getLogger('router.js');

let serialUtility = require('serialijse');

let CResult = require('./models/CResult.js');

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

        let result = null;
        let jsRoom = null;

        const enumRoomType = parseInt(req.query.type);
        if (enumRoomType) {

            jsRoom = CJsRoom.initRoom(enumRoomType);

            switch (enumRoomType) {

                case EnumRoomType.SQUARE:

                    const sideLength = parseInt(req.query.len);
                    if (sideLength) {
                        jsRoom.initRoom(sideLength);

                        CResult.SUCCESS.setData(jsRoom);
                        result = CResult.SUCCESS;
                    } else {
                        CResult.FAILED.setMsg('room square [len] must be int.');
                        result = CResult.FAILED;
                    }

                    break;

                case EnumRoomType.CIRCLE:

                    const radius = parseInt(req.query.r);
                    if (radius) {
                        jsRoom.initRoom(radius);

                        CResult.SUCCESS.setData(jsRoom);
                        result = CResult.SUCCESS;
                    } else {
                        CResult.FAILED.setMsg('room circle [r] must be int.');
                        result = CResult.FAILED;
                    }

                    break;

                default:
                    CResult.FAILED.setMsg('room type error.');
                    result = CResult.FAILED;
            }

        } else {
            CResult.FAILED.setMsg('room type [type] must be int.');
            result = CResult.FAILED;
        }

        //jsRoom.initRobot(new CPoint(1, 2));
        //jsRoom.moveRobot('HGHGGHGHG');

        //jsRoom.initRobot(new CPoint(0, 0));
        //jsRoom.moveRobot('RRFLFFLRF');

        req.session.roomtype = enumRoomType;
        req.session.room = serialUtility.serialize(jsRoom);

        res.json(result);

    });

    // initRobot?x=1&y=2
    app.get('/api/initRobot', function(req, res) {

        let result = null;
        let jsRoom = null;

        const x = parseInt(req.query.x);
        const y = parseInt(req.query.y);

        if (x && y) {
            jsRoom = serialUtility.deserialize(req.session.room);

            let point = new CPoint(x, y);
            result = jsRoom.initRobot(point);

        } else {
            CResult.FAILED.setMsg('robot\' coordinate [x][y] must be int.');
            result = CResult.FAILED;
        }

        req.session.room = serialUtility.serialize(jsRoom);

        res.json(result);
    });

    // moveRobot?cmd=HGHGGHGHG
    app.get('/api/moveRobot', function(req, res) {

        let result = null;
        let jsRoom = null;

        const cmd = req.query.cmd;

        if (cmd) {

            jsRoom = serialUtility.deserialize(req.session.room);

            result = jsRoom.moveRobot(cmd);

        } else {
            CResult.FAILED.setMsg('move robot require [cmd].');
            result = CResult.FAILED;
        }

        req.session.room = serialUtility.serialize(jsRoom);

        res.json(result);
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

