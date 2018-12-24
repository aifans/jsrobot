var CPoint = require('./models/CPoint.js');

class CRobotLocation {
    
    constructor(point, direction) {
        this.point = point;
        this.direction = direction;
        
        logger.debug('CRobotLocation constructing....');
    }
    
}

module.exports = CRobotLocation;