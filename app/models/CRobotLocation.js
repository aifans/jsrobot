let logger = require('log4js').getLogger('CRobotLocation.js');

class CRobotLocation {

    constructor(point, direction) {
        this.point = point;
        this.direction = direction;

        //logger.debug('CRobotLocation constructing....');
    }

    toString() {
        return '('+this.point.x+' '+this.point.y+' '+this.direction+')';
    }

}

module.exports = CRobotLocation;