(function() {
    angular.module('fancyTasks')
    .directive('circleProgress', [function() {
      return {
        restrict: 'AE',
        controller: 'CircleProgressController',
        templateUrl: 'circleProgress/circleProgress.html',
        link: function (scope, elem, attr) {
          var color = scope.color ? scope.color : {gradient: ['#ff1e41', '#ff5f43']};
          var size = scope.size ? scope.size : 200;
          $('#circle').circleProgress({
            value: scope.complete,
            size: size,
            fill: color,
            emptyFill: 'rgba(0, 0, 0, 0.42)',
            thickness: 30
            });
          $('#circle').circleProgress('emptyFill', 'gray');
          scope.$watchCollection('complete', function() {
            $('#circle').circleProgress('value', scope.complete);
          });
        }
      };
    }]);
})();
