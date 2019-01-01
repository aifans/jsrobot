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
let CRobotAction = require('./models/CRobotAction.js');

let url = require('url');

serialUtility.declarePersistable(CJsRoomSquare);
serialUtility.declarePersistable(CJsRoomCircle);
serialUtility.declarePersistable(CJsRobot);
serialUtility.declarePersistable(CRobotLocation);
serialUtility.declarePersistable(CPoint);
serialUtility.declarePersistable(CRobotAction);

module.exports = function(app) {

    /**
     * @api {get} /api/initRoom init the room
     * @apiDescription init the room
     * @apiName initRoom
     * @apiParam {string} type room type
     * @apiParam {string} len or r 密码
     * @apiSuccess {json} result
     * @apiSuccessExample {json} Success-Response:
     *  {
     *      "code":0,
     *      "msg":"Success.",
     *      "data":{
     *          "length":5,
     *          "width":5,
     *          "grid":[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],
     *          "robot":null,
     *          "robotLocation":null,
     *          "robotActionHistory":[],
     *          "sideLength":5
     *      }
     *  }
     *
     * @apiSampleRequest http://localhost:8080/api/initRoom?type=1&len=5
     * @apiSampleRequest http://localhost:8080/api/initRoom?type=2&r=10
     */
    app.get('/api/initRoom', function(req, res) {

        logger.debug(req.session);

        let result = null;
        let jsRoom = null;

        let isRoomInited = false;
        let isRobotInited = false;

        let queryString = url.parse(req.url, true).query;
        logger.info(queryString);

        const enumRoomType = +req.query.type;
        if (Number.isInteger(enumRoomType)) {

            jsRoom = CJsRoom.initRoom(enumRoomType);

            switch (enumRoomType) {

                case EnumRoomType.SQUARE:

                    const sideLength = +req.query.len;
                    if (Number.isInteger(sideLength)) {

                        result = jsRoom.initRoom(sideLength);
                        isRoomInited = true;

                    } else {
                        CResult.FAILURE.setMsg('room square [len] must be int.');
                        CResult.FAILURE.setData('query string = ' + JSON.stringify(queryString));
                        result = CResult.FAILURE;

                        logger.error(result);
                    }

                    break;

                case EnumRoomType.CIRCLE:

                    const radius = +req.query.r;
                    if (Number.isInteger(radius)) {

                        result = jsRoom.initRoom(radius);
                        isRoomInited = true;

                    } else {
                        CResult.FAILURE.setMsg('room circle [r] must be int.');
                        CResult.FAILURE.setData('query string = ' + JSON.stringify(queryString));
                        result = CResult.FAILURE;

                        logger.error(result);
                    }

                    break;

                default:
                    CResult.FAILURE.setMsg('room type error.');
                    CResult.FAILURE.setData('query string = ' + JSON.stringify(queryString));
                    result = CResult.FAILURE;

                    logger.error(result);
            }

        } else {
            CResult.FAILURE.setMsg('room type [type] must be int.');
            CResult.FAILURE.setData('query string = ' + JSON.stringify(queryString));
            result = CResult.FAILURE;

            logger.error(result);
        }

        //jsRoom.initRobot(new CPoint(1, 2));
        //jsRoom.moveRobot('HGHGGHGHG');

        //jsRoom.initRobot(new CPoint(0, 0));
        //jsRoom.moveRobot('RRFLFFLRF');

        req.session.roomtype = enumRoomType;

        logger.debug('isRoomInited =', isRoomInited, ', isRobotInited =', isRobotInited);
        req.session.isRoomInited = isRoomInited;
        req.session.isRobotInited = isRobotInited;
        logger.debug('req.session.isRoomInited =', req.session.isRoomInited, ', req.session.isRobotInited =', req.session.isRobotInited);

        req.session.room = serialUtility.serialize(jsRoom);

        res.json(result);

    });

    /**
     * @api {get} /api/initRoom init the room
     * @apiDescription init the room
     * @apiName initRoom
     * @apiParam {string} type room type
     * @apiParam {string} len or r 密码
     * @apiSuccess {json} result
     * @apiSuccessExample {json} Success-Response:
     *  {
     *      "code":0,
     *      "msg":"Success.",
     *      "data":{
     *          "robotLocation":{
     *              "point":{
     *                  "x":1,
     *                  "y":2},
     *              "direction":"N"
     *          }
     *      }
     *  }
     *
     * @apiSampleRequest http://localhost:8080/api/initRobot?x=1&y=2
     */
    app.get('/api/initRobot', function(req, res) {

        logger.debug(req.session);

        let queryString = url.parse(req.url, true).query;
        logger.info(queryString);

        let result = null;

        let isRoomInited = req.session.isRoomInited;
        let isRobotInited = req.session.isRobotInited;

        if (!isRoomInited) {
            CResult.FAILURE.setMsg('room not inited.');
            result = CResult.FAILURE;
            res.json(result);

            return;
        }

        let jsRoom = serialUtility.deserialize(req.session.room);

        const x = +req.query.x;
        const y = +req.query.y;

        if (Number.isInteger(x) && Number.isInteger(y)) {

            let point = new CPoint(x, y);
            result = jsRoom.initRobot(point);

            isRobotInited = true;

        } else {
            CResult.FAILURE.setMsg('robot coordinate [x][y] must be int.');
            CResult.FAILURE.setData('query string = ' + JSON.stringify(queryString));
            result = CResult.FAILURE;

            logger.error(result);
        }

        req.session.isRobotInited = isRobotInited;
        req.session.room = serialUtility.serialize(jsRoom);

        res.json(result);
    });

    // moveRobot?cmd=HGHGGHGHG
    /**
     * @api {get} /api/initRoom init the room
     * @apiDescription init the room
     * @apiName initRoom
     * @apiParam {string} type room type
     * @apiParam {string} len or r 密码
     * @apiSuccess {json} result
     * @apiSuccessExample {json} Success-Response:
     *  {
     *      "code":0,
     *      "msg":"Success.",
     *      "data":{
     *          "robotLocation":{
     *              "point":{
     *                  "x":1,
     *                  "y":3
     *              },
     *              "direction":"N"
     *          },
     *          "robotActionHistory":[
     *              {"cmd":"H","cmdType":"Turn","startLocation":{"point":{"x":1,"y":2},"direction":"N"},"endLocation":{"point":{"x":1,"y":2},"direction":"E"},"result":"Success."},
     *              {"cmd":"G","cmdType":"Move","startLocation":{"point":{"x":1,"y":2},"direction":"E"},"endLocation":{"point":{"x":2,"y":2},"direction":"E"},"result":"Success."},
     *              {"cmd":"H","cmdType":"Turn","startLocation":{"point":{"x":2,"y":2},"direction":"E"},"endLocation":{"point":{"x":2,"y":2},"direction":"S"},"result":"Success."},
     *              {"cmd":"G","cmdType":"Move","startLocation":{"point":{"x":2,"y":2},"direction":"S"},"endLocation":{"point":{"x":2,"y":3},"direction":"S"},"result":"Success."},
     *              {"cmd":"G","cmdType":"Move","startLocation":{"point":{"x":2,"y":3},"direction":"S"},"endLocation":{"point":{"x":2,"y":4},"direction":"S"},"result":"Success."},
     *              {"cmd":"H","cmdType":"Turn","startLocation":{"point":{"x":2,"y":4},"direction":"S"},"endLocation":{"point":{"x":2,"y":4},"direction":"W"},"result":"Success."},
     *              {"cmd":"G","cmdType":"Move","startLocation":{"point":{"x":2,"y":4},"direction":"W"},"endLocation":{"point":{"x":1,"y":4},"direction":"W"},"result":"Success."},
     *              {"cmd":"H","cmdType":"Turn","startLocation":{"point":{"x":1,"y":4},"direction":"W"},"endLocation":{"point":{"x":1,"y":4},"direction":"N"},"result":"Success."},
     *              {"cmd":"G","cmdType":"Move","startLocation":{"point":{"x":1,"y":4},"direction":"N"},"endLocation":{"point":{"x":1,"y":3},"direction":"N"},"result":"Success."}
     *          ]
     *      }
     *  }
     *
     * @apiSampleRequest http://localhost:8080/api/moveRobot?cmd=HGHGGHGHG
     */
    app.get('/api/moveRobot', function(req, res) {

        logger.debug(req.session);

        let queryString = url.parse(req.url, true).query;
        logger.info(queryString);

        let result = null;

        let isRobotInited = req.session.isRobotInited;

        logger.debug('isRobotInited =', isRobotInited, ', type =', typeof(isRobotInited));

        if (!isRobotInited) {
            CResult.FAILURE.setMsg('robot not inited.');
            result = CResult.FAILURE;
            res.json(result);

            return;
        }

        logger.debug('robot inited. see: isRobotInited =', isRobotInited);

        let jsRoom = serialUtility.deserialize(req.session.room);

        const cmd = req.query.cmd;

        if (cmd) {

            result = jsRoom.moveRobot(cmd);

        } else {
            CResult.FAILURE.setMsg('move robot require [cmd].');
            CResult.FAILURE.setData('query string = ' + JSON.stringify(queryString));
            result = CResult.FAILURE;

            logger.error(result);
        }

        req.session.room = serialUtility.serialize(jsRoom);

        res.json(result);
    });

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};

function is_numeric(value) {
    if (typeof(value) === 'object') {
        return false;
    } else {
        return !Number.isNaN(Number(value));
    }
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

