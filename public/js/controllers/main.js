angular.module('jsRoomController', [])

	.controller('mainController', ['$scope','$http','JsRoom', function($scope, $http, jsRoom) {

        $scope.roomData = {};

        $scope.isNotRoomInited = true;
        $scope.isNotRobotInited = true;

        $scope.robotStartLocation = '{abc}'
        $scope.roomType = '1';

        $scope.point = {};
        $scope.point.x = '0';
        $scope.point.y = '0';


		$scope.initRoom = function() {

            console.log($scope.roomType, typeof($scope.roomType));
            console.log($scope.sideLength, typeof($scope.sideLength));

			if ($scope.roomType != undefined && $scope.sideLength != undefined) {

				jsRoom.initRoom($scope.roomType, $scope.sideLength)
					.success(function(data) {
						$scope.roomData = {};
						$scope.roomData = data;

                        $scope.isNotRoomInited = false;
					});
			} else {
                alert('please input the length.');
            }
		};

        $scope.initRobot = function() {

            console.log($scope.point.x, typeof($scope.point.x));
            console.log($scope.point.y, typeof($scope.point.y));

			if ($scope.point.x != undefined && $scope.point.y != undefined) {

				jsRoom.initRobot($scope.point.x, $scope.point.y)
					.success(function(data) {
						$scope.roomData = {};
						$scope.roomData = data;

                        $scope.isNotRobotInited = false;
					});
			} else {
                alert('please input the coordinator.');
            }
		};

        $scope.moveRobot = function() {

            console.log($scope.cmdString);

			if ($scope.cmdString != undefined && $scope.cmdString != '') {

				jsRoom.moveRobot($scope.cmdString)
					.success(function(data) {
						$scope.roomData = {};
						$scope.roomData = data;

                        console.log(data);
					});
			} else {
                alert('please input the command.');
            }
		};


	}]);