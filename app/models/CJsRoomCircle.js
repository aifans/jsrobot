let logger = require('log4js').getLogger('CJsRoomCircle.js');

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

    getRobotLocation() {
        let point = this.coord2Circle(this.robotLocation.point);
        let robotLocation = new CRobotLocation(point, this.robotLocation.direction);

        return robotLocation;
    }

    initRoom(radius) {

        logger.info('initing room circle......');

        this.length = radius*2+1;
        this.width = radius*2+1;
        this.radius = radius;

        // 先生成包含的圆的矩形
        let grid = new Array();
        for (let i = 0; i < this.length; i++) {
            grid[i] = new Array();
            for (let j = 0; j < this.width; j++) {
                grid[i][j] = 0;

                // 离原点的距离的平方 >= 半径平方
                // 这些点都不属于房间
                if ((Math.pow((i-radius), 2) + Math.pow((j-radius), 2)) >= Math.pow(radius, 2)) {
                    grid[i][j] = -1;
                }
            }
        }

        this.grid = grid;

        logger.info('room circle created.');
    }

    initRobot(point) {
        this.robot = new CJsRobot();
        let squarePoint = this.coord2Square(point);
        this.robotLocation = new CRobotLocation(squarePoint, EnumDirection.NORTH);

        logger.debug(this.robotLocation.toString());
    }

    coord2Square(circlePoint) {
        let point = new CPoint(circlePoint.x+this.radius, circlePoint.y+this.radius);

        return point;
    }

    coord2Circle(squarePoint) {
        let point = new CPoint(squarePoint.x-this.radius, squarePoint.y-this.radius);

        return point;
    }


}

module.exports = CJsRoomCircle;