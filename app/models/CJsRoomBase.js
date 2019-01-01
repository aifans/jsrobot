let logger = require('log4js').getLogger('CJsRoomBase.js');

let CResult = require('./CResult.js');

let CJsRobot = require('./CJsRobot.js');
let CRobotLocation = require('./CRobotLocation.js');
let EnumCommand = require('./EnumCommand.js');
let EnumDirection = require('./EnumDirection.js');
let EnumRoomType = require('./EnumRoomType.js');
let CPoint = require('./CPoint.js');
let CRobotAction = require('./CRobotAction.js');

/**
 * All the oparation are almost excuting in the class room.
 * Every room hold there own ( sub class) room type array. Available position is set to 0, unavailable position is set to -1.
 * Room calculate  the position for the robot and judge if the position is valid according to each command.
 */
class CJsRoomBase {

    constructor() {
        this.length = 0;
        this.width = 0;
        this.grid = null;

        this.robot = null;
        this.robotLocation = null;

        this.robotActionHistory = new Array();

        logger.debug('CJsRoom constructing....');
    }

    /**
     * It can't return the this.robotLocation directly. cause if the room is circle the coordinator is shift.
     * and when room operate the robot it use the original coordinator, so it must be fixed when the room is circle.
     */
    getRobotLocation() {
        logger.debug('subclass should implement this method...');
    }

    /**
     * @description
     * instantiated by sub class. room shape may be different, need to calculate different valid room point.
     * t.x. square room or circle room or any other shape.
     *
     */
    initRoom() {
        logger.debug('subclass should implement this method...');
    }

    /**
     * @description
     * every room init their own robot. coordinator may be different.
     *
     * @param {string} point
     * coordinator for robot.
     */
    initRobot(point) {
        logger.debug('subclass should implement this method...');
    }

    /**
     * It reads the command from the commandString one by one, calculate the position, see if the position is valid, let the robot turn or move or stop.
     * It use the original coordinator, that means the point (0, 0) is located at the left-top of the room square, just like the index of the array.
     *
     * @param commandString
     * @returns {*}
     */
    moveRobot(commandString) {
        //logger.debug(commandString);

        let result = null;

        let cmdString = commandString.toUpperCase();
        let cmdLen = cmdString.length;

        this.robotActionHistory = [];
        for (let i=0; i<cmdLen; i++) {

            let cRobotAction = new CRobotAction();
            let cmd = cmdString[i];
            let currRobotLocation = this.robotLocation;

            cRobotAction.cmd = cmd;
            cRobotAction.cmdType = EnumCommand.CommandType[cmd];
            cRobotAction.startLocation = this.robotLocation;

            logger.debug(cRobotAction);

            if (this.cmdIsValid(cmd) && this.robot.canExcute(cmd)) {

                logger.info('sending to robot:', cmd);

                let nextRobotLocation = this.getNextRobotLocation(currRobotLocation, cmd);

                cRobotAction.endLocation = nextRobotLocation;

                if (this.isInRoom(nextRobotLocation.point)) {

                    this.robot.move(cmd);
                    this.robotLocation = nextRobotLocation;

                    logger.info(currRobotLocation.toString(), '==('+cmd+')=>', nextRobotLocation.toString());

                    cRobotAction.result = CResult.SUCCESS.getMsg();
                    this.robotActionHistory.push(cRobotAction);

                    let returnData = {
                        robotLocation: this.getRobotLocation(),
                        robotActionHistory: this.robotActionHistory,
                    }
                    CResult.SUCCESS.setData(returnData);
                    result = CResult.SUCCESS;

                } else {

                    cRobotAction.result = CResult.ROBOT_CANT_MOVE.getMsg();
                    this.robotActionHistory.push(cRobotAction);

                    let returnData = {
                        currRobotLocation: this.getRobotLocation(),
                        currCommand: cmd,
                        nextPoint: nextRobotLocation.point,
                        robotActionHistory: this.robotActionHistory,
                    }
                    CResult.ROBOT_CANT_MOVE.setData(returnData);
                    result = CResult.ROBOT_CANT_MOVE;

                    logger.warn('robot can not move to:', currRobotLocation.toString(), '--('+cmd+')->', nextRobotLocation.point.toString());

                    return result;
                }

            } else {

                cRobotAction.result = CResult.UNKNOWN_COMMAND.getMsg();
                this.robotActionHistory.push(cRobotAction);

                let returnData = {
                    currRobotLocation: this.getRobotLocation(),
                    errCmd: cmd,
                    robotActionHistory: this.robotActionHistory,
                }
                CResult.UNKNOWN_COMMAND.setData(returnData);
                result = CResult.UNKNOWN_COMMAND;

                logger.warn('unknown command:', cmd);

                return result;
            }

        }

        return result;

    }

    /**
     * If point is in the square and the flag in the point equal 0 then we can believe that it's in the room.
     * If the room is square obviously it's in the room when it's in the square.
     * If the room is circle it's in the room when it's in the square and flag equal 0.
     *
     * @param point
     * @returns {boolean}
     */
    isInRoom(point) {

        //logger.debug(point.toString(), this.grid[point.x][point.y]);

        let isInRoom = (point.x>=0 && point.y>=0) && (point.x< this.length && point.y< this.width) && (this.grid[point.x][point.y] == 0);

        if (isInRoom) {
            return true;
        } else {
            return false;
        }

    }

    cmdIsValid(cmd) {

        let isValid = false;

        switch (cmd) {
            case EnumCommand.E_TURN_LEFT:
            case EnumCommand.S_TURN_LEFT:
            case EnumCommand.E_TURN_RIGHT:
            case EnumCommand.S_TURN_RIGHT:
            case EnumCommand.E_MOVE_FORWARD:
            case EnumCommand.S_MOVE_FORWARD:
            case EnumCommand.E_MOVE_BACKWARD:
            case EnumCommand.S_MOVE_BACKWARD:

                isValid = true;
                break;

            default:
                isValid = false;
        }

        return isValid;
    }

    getNextRobotLocation(currRobotLocation, enumCmd) {

        //logger.debug('current in getNextRobotLocation() begin: ', currRobotLocation.toString());

        let x = currRobotLocation.point.x;
        let y = currRobotLocation.point.y;

        let nextRobotLocation = new CRobotLocation(new CPoint(x, y), currRobotLocation.direction);

        switch (enumCmd) {
            case EnumCommand.E_TURN_LEFT:
            case EnumCommand.S_TURN_LEFT:

                switch (currRobotLocation.direction) {
                    case EnumDirection.EAST:
                        nextRobotLocation.direction = EnumDirection.NORTH;
                        break;
                    case EnumDirection.SOUTH:
                        nextRobotLocation.direction = EnumDirection.EAST;
                        break;
                    case EnumDirection.WEST:
                        nextRobotLocation.direction = EnumDirection.SOUTH;
                        break;
                    case EnumDirection.NORTH:
                        nextRobotLocation.direction = EnumDirection.WEST;
                        break;
                }

                break;

            case EnumCommand.E_TURN_RIGHT:
            case EnumCommand.S_TURN_RIGHT:

                switch (currRobotLocation.direction) {
                    case EnumDirection.EAST:
                        nextRobotLocation.direction = EnumDirection.SOUTH;
                        break;
                    case EnumDirection.SOUTH:
                        nextRobotLocation.direction = EnumDirection.WEST;
                        break;
                    case EnumDirection.WEST:
                        nextRobotLocation.direction = EnumDirection.NORTH;
                        break;
                    case EnumDirection.NORTH:
                        nextRobotLocation.direction = EnumDirection.EAST;
                        break;
                }

                break;

            case EnumCommand.E_MOVE_FORWARD:
            case EnumCommand.S_MOVE_FORWARD:

                switch (currRobotLocation.direction) {
                    case EnumDirection.EAST:
                        nextRobotLocation.point.x += 1;
                        break;
                    case EnumDirection.SOUTH:
                        nextRobotLocation.point.y += 1;
                        break;
                    case EnumDirection.WEST:
                        nextRobotLocation.point.x -= 1;
                        break;
                    case EnumDirection.NORTH:
                        nextRobotLocation.point.y -= 1;
                        break;
                }

                break;

            case EnumCommand.E_MOVE_BACKWARD:
            case EnumCommand.S_MOVE_BACKWARD:

                logger.info('move backward...');
                break;

            default:
                logger.warn('command not found. waiting....', enumCmd);
        }


        //logger.debug('current in getNextRobotLocation() end: ', currRobotLocation.toString());
        return nextRobotLocation;
    }


}

module.exports = CJsRoomBase;