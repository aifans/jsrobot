let logger = require('log4js').getLogger('CJsRoomSquare.js');

let CJsRobot = require('./CJsRobot.js');
let CRobotLocation = require('./CRobotLocation.js');
let EnumCommand = require('./EnumCommand.js');
let EnumDirection = require('./EnumDirection.js');
let EnumRoomType = require('./EnumRoomType.js');

class CJsRoomSquare extends CJsRoom {

    constructor(sideLength) {

        this.sideLength = sideLength;

        logger.debug('CJsRoomSquare constructing....');
    }

    initRoom() {

        logger.info('initing room square......');

        let grid = new Array();
        for (let i = 0; i < sideLength; i++) {
            grid[i] = new Array();
            for (let j = 0; j < sideLength; j++) {
                grid[i][j] = 0;
            }
        }

        this.grid = grid;

        logger.info('room square created.');

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

    getNextRobotLocation(currRobotLocation, enumCmd) {

    }
}

module.exports = CJsRoom;