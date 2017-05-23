(function() {
  angular.module('fancyTasks')
  .controller('CircleProgressController', ['taskService', '$scope', '$rootScope',
  function(taskService, $scope, $rootScope) {
    $scope.size = 400;
    $scope.complete =  taskService.completed || 0;
    $scope.color = {gradient: ["coral", "deeppink", "indigo", "springgreen", "orange"]};

    $scope.$on('task:completed', function(event,data) {
      $scope.complete = data;
    });
  }]);
})();
