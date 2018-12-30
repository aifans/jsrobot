angular.module('jsRoomService', [])

	.factory('JsRoom', ['$http', '$q', function($http, $q) {
		return {
			initRoom : function(roomType, sideLength) {

                let queryString = '?type='+roomType;
                switch (roomType) {
                    case '2':
                        queryString += '&r='+sideLength;
                        break;

                    case '1':
                    default:
                        queryString += '&len='+sideLength;
                }

                let deferred = $q.defer();
                let promise = $http.get('/api/initRoom' + queryString);
                promise.then(
                    // 通讯成功的处理
                    function(answer){
                        //在这里可以对返回的数据集做一定的处理,再交由controller进行处理
                        answer.status = true;

                        let result = {
                            code : 0,
                            msg  : null,
                            data : null,
                        };
                        if (answer.data.code == 0) {
                            result.code = 0;
                            result.msg = answer.data.msg;
                            result.data = answer.data.data;

                            switch (roomType) {
                                case '2':
                                    result.msg += ' type: circle, radius: ' + answer.data.data.radius;
                                    break;

                                case '1':
                                default:
                                    result.msg += ' type: square, size: ' + answer.data.data.length + ' * ' + answer.data.data.width;
                            }

                        } else {
                            result.code = 1;
                            result.msg = answer.data.msg;
                        }

                        deferred.resolve(result);

                        //console.log(answer);
                    },

                    // 通讯失败的处理
                    function(error){
                        // 可以先对失败的数据集做处理，再交由controller进行处理
                        error.status = false;
                        deferred.reject(error);
                    });

                //返回promise对象，交由controller继续处理成功、失败的业务回调
                return deferred.promise;



				//return $http.get('/api/initRoom' + queryString);
			},

			initRobot : function(x, y) {

                let queryString = '?x=' + x + '&y=' + y;

                let deferred = $q.defer();
                let promise = $http.get('/api/initRobot' + queryString);
                promise.then(
                    // 通讯成功的处理
                    function(answer){
                        //在这里可以对返回的数据集做一定的处理,再交由controller进行处理
                        answer.status = true;

                        let result = {
                            code : 0,
                            msg  : null,
                            data : null,
                        };

                        //console.log(answer.data);

                        if (answer.data.code == 0) {
                            result.code = 0;
                            //result.data = answer.data.data;

                            let currRobotLocation = answer.data.data.robotLocation;

                            result.code = 0;
                            result.msg = answer.data.msg;

                            if (currRobotLocation) {
                                result.data = currRobotLocation.point.x + ' ' + currRobotLocation.point.y + ' ' + currRobotLocation.direction;
                            }

                        } else {
                            result.code = 1;
                            result.msg = answer.data.msg;
                        }

                        deferred.resolve(result);

                        //console.log(answer);
                    },

                    // 通讯失败的处理
                    function(error){
                        // 可以先对失败的数据集做处理，再交由controller进行处理
                        error.status = false;
                        deferred.reject(error);
                    });

                //返回promise对象，交由controller继续处理成功、失败的业务回调
                return deferred.promise;

				//return $http.get('/api/initRobot' + queryString);
			},

			moveRobot : function(cmdString) {

                let queryString = '?cmd=' + cmdString;

                //let result = $http.get('/api/moveRobot' + queryString);

                //console.log(result);

				//return result;

                let deferred = $q.defer();
                let promise = $http.get('/api/moveRobot' + queryString);
                promise.then(
                    // 通讯成功的处理
                    function(answer){
                        //在这里可以对返回的数据集做一定的处理,再交由controller进行处理
                        answer.status = true;
                        console.log(answer.data);

                        let result = {
                            code : 0,
                            msg  : null,
                            data : null,
                        };

                        let currPoint = null;
                        let currFacing = null;
                        let currCmd = '';
                        let errCmd = '';

                        switch (answer.data.code) {
                            case 102:

                                result.code = 1;

                                currPoint = answer.data.data.currRobotLocation.point;
                                currFacing = answer.data.data.currRobotLocation.direction;
                                //errCmd = answer.data.data.errCmd;

                                //result.msg = answer.data.msg + ' ' + '[' + errCmd + ']';

                                result.msg = new Array();
                                angular.forEach(answer.data.data.robotActionHistory, function(robotAction) {
                                    let startPoint = robotAction.startLocation.point;
                                    let startFacing = robotAction.startLocation.direction;

                                    result.msg.push('Command: ' + robotAction.cmd + ', ' + robotAction.cmdType + ': (' + startPoint.x + ', ' + startPoint.y + ', ' + startFacing + ') ---> (), Result: ' + robotAction.result);
                                });

                                result.data = currPoint.x + ' ' + currPoint.y + ' ' + currFacing;

                                break;

                            case 103:

                                result.code = 1;

                                currPoint = answer.data.data.currRobotLocation.point;
                                currFacing = answer.data.data.currRobotLocation.direction;
                                //currCmd = answer.data.data.currCommand;
                                //nextPoint = answer.data.data.nextPoint;

                                //result.msg = answer.data.msg + ' can not from (' + currPoint.x + ' ' + currPoint.y + ' ' + currFacing + ')' + ' to ' + '(' + nextPoint.x + ' ' + nextPoint.y + ') by command [' + currCmd + ']';

                                result.msg = new Array();
                                angular.forEach(answer.data.data.robotActionHistory, function(robotAction) {
                                    let startPoint = robotAction.startLocation.point;
                                    let startFacing = robotAction.startLocation.direction;
                                    let endPoint = robotAction.endLocation.point;
                                    let endFacing = robotAction.endLocation.direction;

                                    result.msg.push('Command: ' + robotAction.cmd + ', ' + robotAction.cmdType + ': (' + startPoint.x + ', ' + startPoint.y + ', ' + startFacing + ') ---> (' + endPoint.x + ', ' + endPoint.y + ', ' + endFacing + '), Result: ' + robotAction.result);
                                });

                                result.data = currPoint.x + ' ' + currPoint.y + ' ' + currFacing;

                                break;
                            case 0:
                            default:

                                result.code = 0;

                                currPoint = answer.data.data.robotLocation.point;
                                currFacing = answer.data.data.robotLocation.direction;

                                //result.msg = answer.data.msg;
                                //result.msg = answer.data.data.robotActionHistory;

                                result.msg = new Array();
                                angular.forEach(answer.data.data.robotActionHistory, function(robotAction) {
                                    let startPoint = robotAction.startLocation.point;
                                    let startFacing = robotAction.startLocation.direction;
                                    let endPoint = robotAction.endLocation.point;
                                    let endFacing = robotAction.endLocation.direction;

                                    result.msg.push('Command: ' + robotAction.cmd + ', ' + robotAction.cmdType + ': (' + startPoint.x + ', ' + startPoint.y + ', ' + startFacing + ') ---> (' + endPoint.x + ', ' + endPoint.y + ', ' + endFacing + '), Result: ' + robotAction.result);
                                });

                                result.data = currPoint.x + ' ' + currPoint.y + ' ' + currFacing;

                        }

                        deferred.resolve(result);

                        //console.log(answer);
                    },

                    // 通讯失败的处理
                    function(error){
                        // 可以先对失败的数据集做处理，再交由controller进行处理
                        error.status = false;
                        deferred.reject(error);
                    });

                //返回promise对象，交由controller继续处理成功、失败的业务回调
                return deferred.promise;

                //return $http.get('/api/moveRobot' + queryString);
			}
		}
	}]);