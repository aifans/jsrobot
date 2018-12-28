angular.module('jsRoomController', [])

	.controller('mainController', ['$scope','$http','JsRoom', function($scope, $http, jsRoom) {

        $scope.roomData = {};

        $scope.isNotRoomInited = true;
        $scope.isNotRobotInited = true;

        $scope.robotStartLocation = '';
        $scope.roomType = '1';
        $scope.cmdLanguageType = '1';
        $scope.cmdString = '';

        $scope.point = {};
        $scope.point.x = '0';
        $scope.point.y = '0';


		$scope.initRoom = function() {

            console.log($scope.roomType, typeof($scope.roomType));
            console.log($scope.sideLength, typeof($scope.sideLength));

			if ($scope.roomType != undefined && $scope.sideLength != undefined) {

/* 				jsRoom.initRoom($scope.roomType, $scope.sideLength)
					.success(function(data) {
						$scope.roomData = {};
						$scope.roomData = data;

                        $scope.isNotRoomInited = false;
					}); */

                jsRoom.initRoom($scope.roomType, $scope.sideLength).then(

                    function(answer){

                        $scope.roomData = {};
						$scope.roomData = answer;

                        if (answer.code == 0) {
                            $scope.isNotRoomInited = false;
                        } else {
                            $scope.isNotRoomInited = true;
                        }

                        console.log(answer);
                    },

                    function(error){
                        $scope.error = error;
                    }
                );


			} else {
                alert('please input the length.');
            }
		};

        $scope.initRobot = function() {

            console.log($scope.point.x, typeof($scope.point.x));
            console.log($scope.point.y, typeof($scope.point.y));

			if ($scope.point.x != undefined && $scope.point.y != undefined) {

/* 				jsRoom.initRobot($scope.point.x, $scope.point.y)
					.success(function(data) {
						$scope.roomData = {};
						$scope.roomData = data;

                        $scope.isNotRobotInited = false;
					}); */

                jsRoom.initRobot($scope.point.x, $scope.point.y).then(

                    function(answer){

                        $scope.roomData = {};
						$scope.roomData = answer;

                        if (answer.code == 0) {
                            $scope.isNotRobotInited = false;
                        } else {
                            $scope.isNotRobotInited = true;
                        }

                        console.log(answer);
                    },

                    function(error){
                        $scope.error = error;
                    }
                );

			} else {
                alert('please input the coordinator.');
            }
		};

        $scope.moveRobot = function() {

            console.log($scope.cmdString);

			if ($scope.cmdString != undefined && $scope.cmdString != '') {

/* 				jsRoom.moveRobot($scope.cmdString)
					.success(function(data) {
						$scope.roomData = {};
						$scope.roomData = data;

                        console.log(data);
					}); */

                jsRoom.moveRobot($scope.cmdString).then(

                    function(answer){

                        if (answer.code == 0) {
                            $scope.robotStartLocation = answer.data;
                        } else {
                            $scope.robotStartLocation = answer.data;
                        }

                        console.log(answer);
                    },

                    function(error){
                        $scope.error = error;
                    }
                );

			} else {
                alert('please input the command.');
            }
		};

        $scope.changeCmdLanguage = function(cmdLanguageType) {
            console.log(cmdLanguageType, typeof(cmdLanguageType));

            if ($scope.cmdString != undefined && $scope.cmdString != '') {

                switch (cmdLanguageType) {

                    case '2':
                        $scope.cmdString = $scope.cmdString.split('L').join('V');
                        $scope.cmdString = $scope.cmdString.split('R').join('H');
                        $scope.cmdString = $scope.cmdString.split('F').join('G');
                    break;

                    case '1':
                    default:
                        $scope.cmdString = $scope.cmdString.split('V').join('L');
                        $scope.cmdString = $scope.cmdString.split('H').join('R');
                        $scope.cmdString = $scope.cmdString.split('G').join('F');

                }
            }

        };

        $scope.cmdLeft = function() {
            $scope.cmdString += 'L';
            $scope.changeCmdLanguage($scope.cmdLanguageType);
        };

        $scope.cmdForward = function() {
            $scope.cmdString += 'F';
            $scope.changeCmdLanguage($scope.cmdLanguageType);
        };

        $scope.cmdRight = function() {
            $scope.cmdString += 'R';
            $scope.changeCmdLanguage($scope.cmdLanguageType);
        };


	}]);