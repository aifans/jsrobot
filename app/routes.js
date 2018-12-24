var logger = require('log4js').getLogger('server.js');

var CJsRoom = require('./models/CJsRoom.js');
var jsRobot = require('./models/jsRobot.js');
var robotLocation = require('./models/CRobotLocation.js');
var CPoint = require('./models/CPoint.js');

module.exports = function(app) {

    // initRoom?type=0&len=5
    app.get('/api/initRoom', function(req, res) {
        
        const type = req.query.type;
        const len = req.query.len;

        //logger.debug(req.session.room);
        
        var jsRoomInited = null;
        if (req.session.room) {
            jsRoomInited = req.session.room;
            
            logger.info('room existed in session.');
            
        } else {
            jsRoomInited = initRoom(type, len);
            req.session.room = jsRoomInited;
            
            logger.info('room created and saved in session.');
            
        }
        
        res.send(type+','+len);
        
    });

    app.post('/api/initRobot', function(req, res) {

        const result = {result : 'post!!!'};
        //res.send('post!!!');
        res.json(result);
    });

    app.post('/api/moveRobot', function(req, res) {

        const result = {result : 'post!!!'};
        //res.send('post!!!');
        res.json(result);
    });

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};

function initRoom(type, len) {
    var jsRoom = new CJsRoom();
    
    jsRoom.initRoom(type, len);
    jsRoom.initRobot(new CPoint(1, 2));
    jsRoom.moveRobot('HGHGGHGHG');
    
    return jsRoom;
}