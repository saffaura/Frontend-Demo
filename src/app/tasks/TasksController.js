(function() {
  angular.module('fancyTasks')
  .controller('TasksController', ['taskFactory', 'userService', '$scope', '$rootScope', '$location',
  function(taskFactory, userService, $scope, $rootScope, $location) {
    $scope.complete = 0;

    $scope.completeTask = function(task) {
      var index = $rootScope.user.tasks.indexOf(task);
      if(index != -1 && $rootScope.user.tasks[index].complete !== "true") {
        $rootScope.user.tasks[index].complete = "true";
        taskFactory.completeTask();
        userService.updateUser($rootScope.user);
      }
    };

    $scope.isComplete = function(task) {
      return task.complete === "true";
    }

    $scope.newTasks = function() {
      taskFactory.getRandomTasks(function(data) {
        $rootScope.user.tasks = JSON.parse(JSON.stringify(data));
        userService.updateUser($rootScope.user);
      });
    };

    userService.getUser($rootScope.username, function(user) {
      $rootScope.user = user;
	  taskFactory.resetCompleted();
	  
      if($rootScope.user.tasks && $rootScope.user.tasks.length > 0) {
        $rootScope.user.tasks.forEach(function(task) {
          if(task.complete === "true") {
            taskFactory.completeTask();
          }
        });
      } else {
        newTasks();
      }
    });

    $scope.$on('task:completed', function(event,data) {
      $scope.complete = data;
    });
  }]);
})();
