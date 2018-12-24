var logger = require('log4js').getLogger('server.js');

module.exports = {
    init: function(type, len) {
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
    },

    initRobot: function() {
        
    },
    
    moveRobot: function() {
        
    }
};