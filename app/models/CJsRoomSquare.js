let logger = require('log4js').getLogger('CJsRoomSquare.js');

let CJsRoomBase = require('./CJsRoomBase.js');
let CJsRobot = require('./CJsRobot.js');
let CRobotLocation = require('./CRobotLocation.js');
let EnumCommand = require('./EnumCommand.js');
let EnumDirection = require('./EnumDirection.js');

class CJsRoomSquare extends CJsRoomBase {

    constructor() {
        super();

        this.sideLength = 0;

        logger.debug('CJsRoomSquare constructing....');
    }

    initRoom(sideLength) {

        logger.info('initing room square......');

        this.length = sideLength;
        this.width = sideLength;
        this.sideLength = sideLength;

        let grid = new Array();
        for (let i = 0; i < this.length; i++) {
            grid[i] = new Array();
            for (let j = 0; j < this.width; j++) {
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

            let cmd = cmdString[i];
            let currRobotLocation = this.robotLocation;
            let nextRobotLocation = this.getNextRobotLocation(currRobotLocation, cmd);

            if (this.robotCanMoveTo(nextRobotLocation.point)) {
                this.robot.move(cmd);
                this.robotLocation = nextRobotLocation;
            }

        }

        this.move();
    }

    isWall(point) {
        logger.debug('CJsRoomSquare call this method...');
    }

    getNextRobotLocation(currRobotLocation, enumCmd) {
        return this.robotLocation;
    }
}

module.exports = CJsRoomSquare;