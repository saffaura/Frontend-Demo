(function() {
    angular.module('fancyTasks')
    .run(function($rootScope, $location, $cookies, userService) {
        $rootScope.$on('$routeChangeStart', function(event, next, current) {

            if($cookies.get('username')) {
              $rootScope.username = $cookies.get('username');
            }

            if($rootScope.username == null) {
                $location.path('/login');
            }
        });
    });
})();
