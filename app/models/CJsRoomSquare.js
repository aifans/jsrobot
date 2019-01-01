let logger = require('log4js').getLogger('CJsRoomSquare.js');

let CResult = require('./CResult.js');

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

    getRobotLocation() {
        return this.robotLocation;
    }

    initRoom(sideLength) {

        let result = null;

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

        CResult.SUCCESS.setData(this);
        result = CResult.SUCCESS;
        return result;

    }

    initRobot(point) {

        let result = null;

        if (this.isInRoom(point)) {

            //this.robot = new CJsRobot();
            this.robotLocation = new CRobotLocation(point, EnumDirection.NORTH);

            logger.info('robot init location:', this.getRobotLocation().toString());

            let returnData = {
                robotLocation: this.getRobotLocation()
            }
            CResult.SUCCESS.setData(returnData);
            result = CResult.SUCCESS;

        } else {

            let returnData = {
                point: point
            }
            CResult.POSITION_NOT_IN_ROOM.setData(returnData);
            result = CResult.POSITION_NOT_IN_ROOM;

            logger.warn('robot can not put in:', point.toString());

        }

        return result;
    }


}

module.exports = CJsRoomSquare;