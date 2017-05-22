(function() {
  angular.module('fancyTasks')
  .factory('taskService', function($http, $q, $rootScope) {

    var tasks = null;
    var completed = 0;
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

    function matchUserTasks(user) {
      var allTasks = getTasks();
      var userTasks = [];
      for(var task in user.tasks) {
        userTasks.push(allTasks[task.id]);
      }
      console.log(userTasks);
      return userTasks;
    };

    function resetCompleted() {
      completed = 0;
      $rootScope.$broadcast('task:completed', completed);
    };

    return {
      completeTask: function() {
        completed += 1/6;
        $rootScope.$broadcast('task:completed', completed);
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

      getUserTasks: function(user, success) {
        resetCompleted();
        if(tasks) {
          success(matchUserTasks(user));
        } else {
          $http.get('data/tasks.json').then(function(result) {
            tasks = result.data;
            success(matchUserTasks(user));
          });
        }
      }
    };
  });
})();
