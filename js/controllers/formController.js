todoAppController.controller('FormController', ['$scope', '$routeParams', '$location', 'todoAppFactory',
	function ($scope, $routeParams, $location, todoAppFactory) {


		var dateTimeNow = function() {
	  		$scope.dateStart = new Date();
	  		$scope.dateEnd = new Date();
	  	};
		dateTimeNow();
		
		$scope.formData = false;
		var todoList = todoAppFactory.getTodoList();
		//$routeParams.taskID = 0;
		if($routeParams.taskID || $routeParams.taskID == 0){	
        	$scope.taskData = todoList;
        	if($scope.taskData[$routeParams.taskID]){
        		$scope.formData = $scope.taskData[$routeParams.taskID];
        		$scope.title = $scope.formData.taskTitle;
        		$scope.dateEnd = new Date(parseInt($scope.formData.endDate));
        	}else{
        		$location.path('/');
        		return;
        	}
		}

		$scope.validateDates = function() {
			var startDT = Date.parse(todoAppFactory.startDateTimeValue);
			var endDT = Date.parse(todoAppFactory.endDateTimeValue);

			$scope.showMessage = false;
			var today = new Date();

			if(endDT <= startDT) {
				$scope.showMessage = true;
				return true;
			}
			else {
				if($scope.formData){
					$scope.formData.taskTitle = $scope.title;
					$scope.formData.endDate = endDT;
					todoAppFactory.updateListItem($scope.formData, $routeParams.taskID);
				}else{
					todoAppFactory.updateTodoList($scope.title ,startDT, endDT);
				}
				
				$location.path('/');
				return true;
			}
		}

		$scope.submit = function() {
			$scope.validateDates();
		}

		$scope.toggleMinDate = function() {
  			$scope.minDate = $scope.minDate ? null : new Date();
		};
 
		$scope.maxDate = new Date('2024-06-22');
		$scope.toggleMinDate();

		$scope.dateOptions = {
	  		startingDay: 1,
	  		showWeeks: false
		};

		// Disable weekend selection
		$scope.disabled = function(calendarDate, mode) {
  			return mode === 'day' && ( calendarDate.getDay() === 0 || calendarDate.getDay() === 6 );
		};

		$scope.hourStep = 1;
		$scope.minuteStep = 15;

		$scope.timeOptions = {
 			hourStep: [1, 2, 3],
  			minuteStep: [1, 5, 10, 15, 25, 30]
		};

		$scope.showMeridian = true;
		$scope.timeToggleMode = function() {
  			$scope.showMeridian = !$scope.showMeridian;
		};
		
		var watcher = $scope.$watch("dateStart", function(value) {
  			todoAppFactory.startDateTimeValue = value.toString();
		}, true);

		var watcher = $scope.$watch("dateEnd", function(value) {
  			todoAppFactory.endDateTimeValue = value.toString();
		}, true);

		$scope.resetHours = function() {
	  		$scope.dateStart.setHours(1);
	  		$scope.dateEnd.setHours(1);
		};
	}
]);