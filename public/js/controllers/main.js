angular.module('jsRoomController', [])

	.controller('mainController', ['$scope','$http','JsRoom', function($scope, $http, jsRoom) {
        $scope.formData = {};

        $scope.robotStartLocation = '{abc}'

		$scope.initRoom = function() {

            console.log('ok');
            console.log($scope.roomType);
            console.log($scope.sideLength);

			if ($scope.formData.text != undefined) {

				jsRoom.initRoom($scope.formData)
					.success(function(data) {
						$scope.formData = {};
						$scope.todos = data;
					});
			}
		};

		$scope.deleteTodo = function(id) {
			$scope.loading = true;

			Todos.delete(id)
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data;
				});
		};
	}]);