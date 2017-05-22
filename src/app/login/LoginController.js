(function() {
    angular.module('fancyTasks')
    .controller('LoginController', ['$scope', '$rootScope', '$location', '$cookies', 'userService',
    function($scope, $rootScope, $location, $cookies, userService) {
      
        $scope.username = null;
        userService.getUsernames(function(usernames) {
          $scope.users = usernames;
        });

        $scope.login = function() {
            if($scope.username) {
                $rootScope.username = $scope.username;
                $cookies.put('username', $scope.username);
                $location.path('/index');
            }
        };

        $scope.logout = function() {
            $rootScope.username = null;
            $cookies.remove('username');
            $location.path('/login');
        };
    }]);
})();
