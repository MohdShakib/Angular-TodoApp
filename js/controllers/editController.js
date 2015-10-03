'use strict';
todoAppController.controller('EditController', ['$scope', '$routeParams', 'todoAppFactory', '$location',
	function($scope, $routeParams, todoAppFactory, $location) {

		$scope.title = currTask.taskTitle;
		$scope.dateStart = new Date(parseInt(currTask.startDate));
		$scope.dateEnd = new Date(parseInt(currTask.endDate));

		todoAppFactory.startDateTimeValue = $scope.dateStart;
		todoAppFactory.endDateTimeValue = $scope.dateEnd;

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
  
  		$scope.$watch("dateStart", function(value) {
    		console.log('Start date value:' + value);

    		todoAppFactory.startDateTimeValue = value.toString();
  		}, true);
  		
  		$scope.$watch("dateEnd", function(value) {
    		console.log('End date value:' + value);

    		todoAppFactory.endDateTimeValue = value.toString();
  		}, true);

  		$scope.resetHours = function() {
    		$scope.dateStart.setHours(1);
    		$scope.dateEnd.setHours(1);
  		};
	}
]);