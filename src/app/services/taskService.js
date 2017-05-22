(function() {
  angular.module('fancyTasks')
  .service('taskService', function() {
	  this.completed = 0;
	  this.completeTask = function(){
		  this.completed += 1/6;
	  };
	  this.resetCompleted = function(){
		  this.completed = 0;
	  };
  });
})();
