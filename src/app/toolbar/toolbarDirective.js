(function() {
  angular.module('fancyTasks')
  .directive('toolbar', [function() {
    return {
      restrict: 'EA',
      controller: 'FancyMainController',
      templateUrl: 'toolbar/toolbar.html'
    }
  }]);
})();
