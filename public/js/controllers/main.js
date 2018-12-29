angular.module('jsRoomController', [])

	.controller('mainController', ['$scope','$http','JsRoom', function($scope, $http, jsRoom) {

        $scope.roomData = {};

        $scope.isNotRoomInited = true;
        $scope.isNotRobotInited = true;

        $scope.roomType = '1';
        $scope.sideLength = '';

        $scope.point = {};
        $scope.point.x = '';
        $scope.point.y = '';

        $scope.cmdLanguageType = '1';
        $scope.cmdString = '';

        $scope.robotLocation = '';
        $scope.logText = '';

		$scope.initRoom = function() {

            //console.log($scope.roomType, typeof($scope.roomType));
            //console.log($scope.sideLength, typeof($scope.sideLength));

            let sideLength = $scope.sideLength.replace(/(^\s*)|(\s*$)/g, '');
			if ($scope.roomType != undefined && sideLength != undefined && sideLength != '') {

/* 				jsRoom.initRoom($scope.roomType, $scope.sideLength)
					.success(function(data) {
						$scope.roomData = {};
						$scope.roomData = data;

                        $scope.isNotRoomInited = false;
					}); */

                jsRoom.initRoom($scope.roomType, sideLength).then(

                    function(answer){

                        $scope.roomData = {};
						$scope.roomData = answer;

                        $scope.displayLog('init room: ' + answer.msg);

                        if (answer.code == 0) {
                            $scope.isNotRoomInited = false;
                        } else {
                            $scope.isNotRoomInited = true;
                        }

                        //console.log(answer);
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

            //console.log($scope.point.x, typeof($scope.point.x));
            //console.log($scope.point.y, typeof($scope.point.y));

            let x = $scope.point.x.replace(/(^\s*)|(\s*$)/g, '');
            let y = $scope.point.y.replace(/(^\s*)|(\s*$)/g, '');

			if (x != undefined && y != undefined) {

/* 				jsRoom.initRobot($scope.point.x, $scope.point.y)
					.success(function(data) {
						$scope.roomData = {};
						$scope.roomData = data;

                        $scope.isNotRobotInited = false;
					}); */

                if (x == '') {
                    x = '0';
                    $scope.point.x = '0';
                }
                if (y == '') {
                    y = '0';
                    $scope.point.y = '0';
                }

                jsRoom.initRobot(x, y).then(

                    function(answer){

                        $scope.roomData = {};
						$scope.roomData = answer;

                        $scope.displayLog('init robot: ' + answer.msg);

                        if (answer.code == 0) {
                            $scope.isNotRobotInited = false;
                            $scope.robotLocation = answer.data;
                        } else {
                            $scope.isNotRobotInited = true;
                        }

                        //console.log(answer);
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

            //console.log($scope.cmdString);

            let cmdString = $scope.cmdString.replace(/(^\s*)|(\s*$)/g, '');
			if (cmdString != undefined && cmdString != '') {

/* 				jsRoom.moveRobot($scope.cmdString)
					.success(function(data) {
						$scope.roomData = {};
						$scope.roomData = data;

                        console.log(data);
					}); */

                jsRoom.moveRobot(cmdString).then(

                    function(answer){

/*                         if (answer.code == 0) {
                            $scope.robotLocation = answer.data;
                            $scope.logText = answer.msg;
                        } else {
                            $scope.robotLocation = answer.data;
                            $scope.logText = answer.msg;
                        }
 */
                        $scope.robotLocation = answer.data;
                        //$scope.displayLog(answer.msg);

                        angular.forEach(answer.msg, function(msg) {
                            $scope.displayLog(msg);
                        });


                        //console.log(answer);
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
            //console.log(cmdLanguageType, typeof(cmdLanguageType));

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

        $scope.displayLog = function(logText) {
            $scope.logText += logText + '\r\n';

            let textarea = document.getElementById('logText');
            textarea.scrollTop = textarea.scrollHeight;
        };


	}]);