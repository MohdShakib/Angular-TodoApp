
'use strict';
var todoAppController = angular.module('todoAppController', []);
todoAppController.controller('MainController', ['$scope', '$filter', '$location', 'todoAppFactory',
    function($scope, $filter, $location, todoAppFactory) {

        $scope.currentFilter = 'All';
        $scope.addTaskButtonClicked = function() {
        	$location.path('/add');
        }

        $scope.showEditPage = function(taskID) {
        	$location.path('/edit/' + taskID);
        }

        $scope.changeFilter = function(status){
          $scope.currentFilter = status;
        }

        $scope.toggleCompleted = function(task, index){
        	if(task.status === 'Pending'){
        		task.status = 'Completed';
        		task.completed = true;
        	}else{
        		task.status = 'Pending';
        		task.completed = false;
        	}
        	$scope.taskData[index] = task;
        	todoAppFactory.setTodoList($scope.taskData);
        }	

        $scope.removeCompleted = function(){
          var pendingtasks = $filter('filter')($scope.taskData, {'status': 'Pending'});
          $scope.taskData = pendingtasks;
          $scope.currentFilter = 'All';
          todoAppFactory.setTodoList($scope.taskData);
        }

        $scope.removeItem = function(index){
          $scope.taskData.splice(index,1);
          todoAppFactory.setTodoList($scope.taskData);
        }

        $scope.sortByDate = function(){
          $scope.taskData = $filter('orderBy')($scope.taskData, 'endDate');
        }

        var todoList = todoAppFactory.getTodoList();
        $scope.taskData = todoList;
    }    
]);

todoAppController.controller('AddController', ['$scope', '$location',
	function AddController($scope, $location) {
	}
]);
