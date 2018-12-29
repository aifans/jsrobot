let logger = require('log4js').getLogger('CJsRoomBase.js');

let CResult = require('./CResult.js');

let CJsRobot = require('./CJsRobot.js');
let CRobotLocation = require('./CRobotLocation.js');
let EnumCommand = require('./EnumCommand.js');
let EnumDirection = require('./EnumDirection.js');
let EnumRoomType = require('./EnumRoomType.js');
let CPoint = require('./CPoint.js');

class CJsRoomBase {

    constructor() {
        this.length = 0;
        this.width = 0;
        this.grid = null;

        this.robot = null;
        this.robotLocation = null;

        logger.debug('CJsRoom constructing....');
    }

    getRobotLocation() {
        logger.debug('subclass should implement this method...');
    }

    initRoom() {
        logger.debug('subclass should implement this method...');
    }

    initRobot(point) {
        logger.debug('subclass should implement this method...');
    }

    moveRobot(commandString) {
        //logger.debug(commandString);

        let result = null;

        let cmdString = commandString.toUpperCase();
        let cmdLen = cmdString.length;

        for (let i=0; i<cmdLen; i++) {

            let cmd = cmdString[i];

            if (this.cmdIsValid(cmd) && this.robot.canExcute(cmd)) {

                logger.info('sending to robot:', cmd);

                let currRobotLocation = this.robotLocation;
                let nextRobotLocation = this.getNextRobotLocation(currRobotLocation, cmd);
                if (this.isInRoom(nextRobotLocation.point)) {
                    this.robot.move(cmd);
                    this.robotLocation = nextRobotLocation;

                    logger.info(currRobotLocation.toString(), '==('+cmd+')=>', nextRobotLocation.toString());

                } else {

                    let returnData = {
                        currRobotLocation: this.getRobotLocation(),
                        currCommand: cmd,
                    }
                    CResult.ROBOT_CANT_MOVE.setData(returnData);
                    result = CResult.ROBOT_CANT_MOVE;

                    logger.warn('robot can not move to:', currRobotLocation.toString(), '--('+cmd+')->', nextRobotLocation.point.toString());

                    return result;
                }

            } else {

                let returnData = {
                    currRobotLocation: this.getRobotLocation(),
                    errCmd: cmd
                }
                CResult.UNKNOWN_COMMAND.setData(returnData);
                result = CResult.UNKNOWN_COMMAND;

                logger.warn('unknown command:', cmd);

                return result;
            }

        }

        let returnData = {
            robotLocation: this.getRobotLocation()
        }
        CResult.SUCCESS.setData(returnData);
        result = CResult.SUCCESS;
        return result;

    }

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