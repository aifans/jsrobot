let logger = require('log4js').getLogger('CJsRoom.js');

let CJsRobot = require('./CJsRobot.js');
let CRobotLocation = require('./CRobotLocation.js');
let EnumCommand = require('./EnumCommand.js');
let EnumDirection = require('./EnumDirection.js');
let EnumRoomType = require('./EnumRoomType.js');

class CJsRoom {

    constructor() {
        this.length = 0;
        this.width = 0;
        this.grid = null;

        this.robot = null;
        this.robotLocation = null;

        logger.debug('CJsRoom constructing....');
    }

    initRoom(enumRoomType) {

        logger.info('initing room ......');
        logger.debug(enumRoomType, arguments);

        switch (enumRoomType) {

            case EnumRoomType.SQUARE:

                let sideLength = arguments[1];
                genSquareRoom(sideLength);
                break;

            case EnumRoomType.CIRCLE:

                let radius = arguments[0];
                genCircleRoom(radius);
                break;

            default:

        }

    }

    initRobot(point) {
        this.robot = new CJsRobot();
        this.robotLocation = new CRobotLocation(point, EnumDirection.NORTH);

        logger.debug(this.robotLocation.toString());
    }

    moveRobot(commandString) {
        //logger.debug(commandString);

        let cmdString = commandString.toUpperCase();
        let cmdLen = cmdString.length;

        for (let i=0; i<cmdLen; i++) {
            logger.info('sending cmd to robot:', cmdString[i]);

            this.robot.move(cmdString[i]);
        }

    }

    isWall(point) {

    }

    genSquareRoom(sideLength) {

        let room = new Array();
        for (let i = 0; i < sideLength; i++) {
            room[i] = new Array();
            for (let j = 0; j < sideLength; j++) {
                room[i][j] = 0;
            }
        }

        this.grid = room;

    }

    genCircleRoom(radius) {
        genSquareRoom(radius*2);
    }

    getNextRobotLocation(currRobotLocation, enumCmd) {

    }
}

module.exports = CJsRoom;