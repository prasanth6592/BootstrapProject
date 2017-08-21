(function () {
    'use strict';
}());

angular.module('agSADCeFarms')
    .controller('HeaderController', ['$scope', '$log', '$state', function($scope, $log, $state ) {

        $scope.dashboard_state = 'calendar';

        //$scope.logged_in = true;
        //$scope.admin = true;
        //$scope.current_user = "Logged in as: Jim DeBruyne";
        $scope.logged_in = false;
        $scope.admin = false;
        $scope.current_user = "Log In";


        $scope.login = function() {
            if ( ! $scope.logged_in ) {
                alert("Logging in through portal");
                $scope.current_user = "Logged in as: Admin";
                $scope.logged_in = true;
                // come in as admin this time
                $scope.admin = true;
            }
        };

        $scope.logoff = function() {
            $scope.current_user = "";
            $scope.logged_in = false;
            $scope.current_user = "Log In";
            $state.go('app.home');
        };

    }])
;
