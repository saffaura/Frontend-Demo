(function() {
    angular.module('fancyTasks')
    .directive('circleProgress', [function() {
      return {
        restrict: 'AE',
        controller: 'CircleProgressController',
        templateUrl: 'circleProgress/circleProgress.html',
        link: function (scope, elem, attr) {
          $('#circle').circleProgress({value: scope.complete});
          scope.$watchCollection('[complete, size, color]', function() {
            $('#circle').circleProgress('value', scope.complete);
          });
        }
      };
    }]);
})();
