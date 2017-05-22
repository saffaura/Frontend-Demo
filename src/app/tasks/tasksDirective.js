(function() {
    angular.module('fancyTasks')
    .directive('tasks', [function() {
      return {
        restrict: 'EA',
        templateUrl: 'tasks/tasks.html'
      };
    }]);
})();
