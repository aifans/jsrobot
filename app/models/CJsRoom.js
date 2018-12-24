var logger = require('log4js').getLogger('server.js');

var CRobotLocation = require('./CRobotLocation.js');
var EnumCommand = require('./EnumCommand.js');
var EnumDirection = require('./EnumDirection.js');

class CJsRoom {
    
    constructor() {
        this.length = 0;
        this.width = 0;
        this.grid = new Array();
        
        this.robotLocation = null;
        
        logger.debug('CJsRoom constructing....');
    }
    
    initRoom(type, len) {
        
        logger.info('initing room ......');
        logger.debug(type, len);
        
        //var arr = [[1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5]];
        //logger.debug(arr);
        
        var room = new Array();
        for (var i = 0; i < len; i++) {
            room[i] = new Array();
            for (var j = 0; j < len; j++) {
                room[i][j] = -1;
            }
        }
        
        logger.info(room);
        return room;

    }
    
    initRobot(point) {
        this.robotLocation = new CRobotLocation(point, EnumDirection.NORTH);
        
        logger.debug(this.robotLocation.toString());
    }
    
    moveRobot(commandString) {
        logger.debug(EnumCommand.TURN_LEFT)
    }
    
    isWall(point) {
        
    }
}

module.exports = CJsRoom;