(function() {
  angular.module('fancyTasks')
  .factory('taskFactory', ['$http', '$q', '$rootScope', 'taskService', function($http, $q, $rootScope, taskService) {

    var tasks = null;
    $http.get('data/tasks.json').then(function(result) {
        tasks = result.data;
    });

    function generateTasks() {
      var randomTasks = [];
      var temp = tasks.slice();
      for(var i = 0; i < 6; i++) {
        var index =  Math.ceil(Math.random() * 10) % temp.length;
        randomTasks.push(temp.splice(index, 1)[0]);
      }
      return randomTasks;
    };

    function resetCompleted() {
      taskService.resetCompleted();
      $rootScope.$broadcast('task:completed', taskService.completed);
    };

    return {
      completeTask: function() {
        taskService.completeTask();
        $rootScope.$broadcast('task:completed', taskService.completed);
      },

      resetCompleted: resetCompleted,

      getRandomTasks: function(success) {
        if(tasks) {
          success(generateTasks());
        } else {
            $http.get('data/tasks.json').then(function(result) {
              tasks = result.data;
              success(generateTasks());
            });
        }
        resetCompleted();
      },
    };
  }]);
})();
