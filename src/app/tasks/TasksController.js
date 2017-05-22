(function() {
  angular.module('fancyTasks')
  .controller('TasksController', ['taskService', 'userService', '$scope', '$rootScope', '$location',
  function(taskService, userService, $scope, $rootScope, $location) {
    $scope.complete = 0;

    $scope.completeTask = function(task) {
      // TODO when complete button is clicked, update usertasks
      var index = $rootScope.tasks.indexOf(task);
      if(index != -1 && $rootScope.tasks[index].complete !== "true") {
        $rootScope.tasks[index].complete = "true";
        taskService.completeTask();
        userService.updateUser($scope.user);
      }
    };

    $scope.isComplete = function(task) {
      return task.complete === "true";
    }

    $scope.newTasks = function() {
      taskService.getRandomTasks(function(data) {
        $rootScope.tasks = JSON.parse(JSON.stringify(data));;
        $scope.user.tasks = data;
        userService.updateUser($scope.user);
      });
    };

    userService.getUser($rootScope.username, function(user) {
      $scope.user = user;

      if($scope.user.tasks && $scope.user.tasks.length > 0) {
        taskService.resetCompleted();
        $rootScope.tasks = $scope.user.tasks;
        $rootScope.tasks.forEach(function(task) {
          if(task.complete === "true") {
            taskService.completeTask();
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
