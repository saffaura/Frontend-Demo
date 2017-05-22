(function () {
    angular.module('fancyTasks')
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.when('/login', {
            title: 'Login',
            templateUrl: 'login/login.html'

        }).when('/', {
            title: 'Login',
            templateUrl: 'login/login.html'

        }).when('/index', {
            title: 'Fancy Tasks',
            templateUrl: 'fancyMain/fancyMain.html'

        }).otherwise({
            redirectTo: '/login'
        });
        $locationProvider.html5Mode(true);
    }]);
})();
