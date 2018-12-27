angular.module('jsRoomService', [])

	.factory('JsRoom', ['$http',function($http) {
		return {
			initRoom : function(roomType) {
				return $http.post('/api/initRoom?type=' + roomType + '&len=5');
			},
			initRobot : function(x, y) {
				return $http.post('/api/initRobot?x=' + x + '&y=' + y);
			},
			moveRobot : function(cmdString) {
				return $http.post('/api/moveRobot?cmd=' + cmdString);
			}
		}
	}]);