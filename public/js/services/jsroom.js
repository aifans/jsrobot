
angular.module('jsRoomService', [])

	.factory('JsRoom', ['$http', function($http) {
		return {
			initRoom : function(roomType, sideLength) {

                let queryString = '?type='+roomType;
                switch (roomType) {
                    case '1':
                        queryString += '&len='+sideLength;
                    break;
                    case '2':
                        queryString += '&r='+sideLength;
                    break;
                    default:
                        console.log('roomType should not be appear:' + roomType);
                        queryString += '&len='+sideLength;
                }

				return $http.get('/api/initRoom' + queryString);
			},

			initRobot : function(x, y) {

                let queryString = '?x=' + x + '&y=' + y;

				return $http.get('/api/initRobot' + queryString);
			},

			moveRobot : function(cmdString) {

                let queryString = '?cmd=' + cmdString;

                //let result = $http.get('/api/moveRobot' + queryString);

                //console.log(result);

				//return result;

                return $http.get('/api/moveRobot' + queryString);
			}
		}
	}]);