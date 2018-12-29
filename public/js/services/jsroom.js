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
                            result.data = '(' + currRobotLocation.point.x + ' ' + currRobotLocation.point.y + ' ' + currRobotLocation.direction + ')';

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

                        let result = {
                            code : 0,
                            msg  : null,
                            data : null,
                        };
                        if (answer.data.code == 0) {
                            let currRobotLocation = answer.data.data.robotLocation;

                            result.code = 0;
                            result.msg = answer.data.msg;
                            result.data = '(' + currRobotLocation.point.x + ' ' + currRobotLocation.point.y + ' ' + currRobotLocation.direction + ')';
                        } else {
                            let currRobotLocation = answer.data.data.currRobotLocation;

                            result.code = 1;
                            result.msg = answer.data.msg;
                            result.data = '(' + currRobotLocation.point.x + ' ' + currRobotLocation.point.y + ' ' + currRobotLocation.direction + ')';
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