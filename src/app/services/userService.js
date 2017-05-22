(function() {
  angular.module('fancyTasks')
  .factory('userService', function($http, $q) {

    var methods = {
      getUser: getUser,
      getUsernames: getUsernames,
      updateUser: updateUser
    };

    return methods;

    var users = null;
    var usernames = null;
    $http.defaults.headers.post['Content-Type'] = 'application/json';

    function init(success) {
      $http.get('/data/users.json').then(function(response) {
        users = response.data;
        usernames = [];
        users.forEach(function(user) {
          usernames.push(user.username);
        });

        if(success) {
          success();
        }
      });
    };
    init();

    function getOrCreateUser(username) {
      var index  = usernames.indexOf(username);
      if(index == -1) {
        var user = {};
        user.id = index = users.length;
        user.username = username;
        user.tasks = [];

        users.push(user);
        usernames.push(username);
        $http.post('/data/users', users);
      }

      return users[index];
    };

    function getUser(username, success) {
      if(usernames) {
        success(getOrCreateUser(username));
      } else {
        init(function() {
          success(getOrCreateUser(username));
        });
      }
    };

    function getUsernames(success) {
      if(usernames) {
        success(usernames);
      } else {
        init(function() {
          success(usernames);
        });
      }
    };

    function updateUser(user, success) {
      var userId = user.id;
      users[userId] = user;
      $http.post('/data/users', users);
    };

  });
})();
