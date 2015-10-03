'use strict';
var todoAppFilter = angular.module('todoAppFilter', []);
todoAppFilter.filter('filterByStatus', function() {
  // In the return function, we must pass in a single parameter which will be the data we will work on.
  // We have the ability to support multiple other parameters that can be passed into the filter optionally
  return function(input, filterStatus) {
  	var output = [];
  	angular.forEach(input, function(value, index){
  		if(filterStatus === 'Pending' && !value.completed){
  			output.push(value);
  		}else if(filterStatus === 'Completed' && value.completed){
  			output.push(value);
  		}else if(filterStatus === 'All'){
  			output.push(value);
  		}
  	});	
  	return output;
  }
});