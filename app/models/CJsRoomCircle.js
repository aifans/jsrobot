let logger = require('log4js').getLogger('CJsRoomCircle.js');

let CResult = require('./CResult.js');

let CJsRoomBase = require('./CJsRoomBase.js');
let CJsRobot = require('./CJsRobot.js');
let CRobotLocation = require('./CRobotLocation.js');
let EnumCommand = require('./EnumCommand.js');
let EnumDirection = require('./EnumDirection.js');
let CPoint = require('./CPoint.js');

class CJsRoomCircle extends CJsRoomBase {

    constructor() {
        super();

        this.radius = 0;

        logger.debug('CJsRoomCircle constructing....');
    }

    /**
     * Need shift the coordinator.
     * Cause if the room is circle the point(0, 0) is located at the center of the room.
     *
     * @returns {CRobotLocation}
     */
    getRobotLocation() {
        let point = this.coord2Circle(this.robotLocation.point);
        let robotLocation = new CRobotLocation(point, this.robotLocation.direction);

        return robotLocation;
    }

    initRoom(radius) {

        let result = null;

        logger.info('initing room circle......');

        this.radius = radius;
        this.radius_for_cal = radius-1;

        this.length = this.radius_for_cal*2+1;
        this.width = this.radius_for_cal*2+1;

        // 1 generate a square that contained the circle.
        let grid = new Array();
        for (let i = 0; i < this.length; i++) {
            grid[i] = new Array();
            for (let j = 0; j < this.width; j++) {
                grid[i][j] = 0;

                // 2 then set the point out of the circle equal -1.
                // If the distance of the point to the center of the circle >= radius the point is not in the circle.
                // according to the Pythagorean theorem: a^2 + b^2 = c^2
                if ((Math.pow((i-this.radius_for_cal), 2) + Math.pow((j-this.radius_for_cal), 2)) > Math.pow(this.radius_for_cal, 2)) {
                    grid[i][j] = -1;
                }
            }
        }

        this.grid = grid;

        logger.info('room circle created.');

        CResult.SUCCESS.setData(this);
        result = CResult.SUCCESS;
        return result;
    }

    initRobot(point) {
        let result = null;

        let squarePoint = this.coord2Square(point);
        if (this.isInRoom(squarePoint)) {

            //this.robot = new CJsRobot();
            this.robotLocation = new CRobotLocation(squarePoint, EnumDirection.NORTH);

            logger.info('robot init location:', squarePoint.toString(), '=', this.getRobotLocation().toString());

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

    coord2Square(circlePoint) {
        let x = circlePoint.x+this.radius_for_cal;
        let y = circlePoint.y+this.radius_for_cal;
        let point = new CPoint(x, y);

        return point;
    }

    coord2Circle(squarePoint) {
        let x = squarePoint.x-this.radius_for_cal;
        let y = squarePoint.y-this.radius_for_cal;
        let point = new CPoint(x, y);

        return point;
    }


}

module.exports = CJsRoomCircle;