(function() {
  angular.module('fancyTasks')
  .controller('CircleProgressController', ['taskService', '$scope', '$rootScope',
  function(taskService, $scope, $rootScope) {
    $scope.size = 500;
    $scope.complete =  taskService.completed;
    $scope.color = '#333';

    $scope.$on('task:completed', function(event,data) {
      $scope.complete = data;
    });
  }]);
})();
