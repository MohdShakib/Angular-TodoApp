"user strict";
var todoAppFactory = angular.module('todoAppFactory', []);
todoAppFactory.factory('todoAppFactory', [function(){
    var startDateTimeValue, endDateTimeValue;

    	function getTodoList(){
    		var items = localStorage.getItem('todoListItems');
    		items = items ? JSON.parse(items) : [];
    		return items;
    	}

    	function setTodoList(items){
    		localStorage.setItem('todoListItems', JSON.stringify(items));
    	}

    	function updateListItem(item, index){
    		var items = getTodoList();
    		items[index] = item;
    		setTodoList(items);
    	}

    	function updateTodoList(titleTask, startDT, endDT, update, existingIndex) {
			var items = getTodoList();
			
			var currObject = {
				startDate: startDT,
				endDate: endDT,
				taskTitle: titleTask,
				status: 'Pending',
				completed: false
			};

			items.push(currObject);
			localStorage.setItem('todoListItems', JSON.stringify(items));

			return;
		}

    return {
      startDateTimeValue: startDateTimeValue,
      endDateTimeValue: endDateTimeValue,
      getTodoList: getTodoList,
      updateTodoList: updateTodoList,
      setTodoList: setTodoList,
      updateListItem: updateListItem
    }
}]);
