var jsRoom = require('./models/jsRoom.js');
var jsRobot = require('./models/jsRobot.js');

module.exports = function(app) {

    // initRoom?type=0&len=5
    app.post('/api/initRoom', function(req, res) {
        
        const verStr = {versionName : '2.0.0', versionCode : 200};
        res.send(JSON.stringify(verStr));
        
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
