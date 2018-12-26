let logger = require('log4js').getLogger('CJsRoom.js');

let CJsRobot = require('./CJsRobot.js');
let CRobotLocation = require('./CRobotLocation.js');
let EnumCommand = require('./EnumCommand.js');
let EnumDirection = require('./EnumDirection.js');
let EnumRoomType = require('./EnumRoomType.js');

class CJsRoomBase {

    constructor() {
        this.length = 0;
        this.width = 0;
        this.grid = null;

        this.robot = null;
        this.robotLocation = null;

        logger.debug('CJsRoom constructing....');
    }

    initRoom() {
        logger.debug('subclass should implement this method...');
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

    move() {
        logger.debug('move move move ...');
        this.isWall();
    }

    isWall(point) {
        logger.debug('subclass should implement this method...');
    }

    getNextRobotLocation(currRobotLocation, enumCmd) {

    }
}

module.exports = CJsRoomBase;