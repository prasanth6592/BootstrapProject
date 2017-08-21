(function () {
    'use strict';
}());

angular.module('agSADCeFarms')
    .controller('MyDashboardController', ['$scope', '$state', '$log', function($scope, $state, $log ) {

        $log.debug("From Parent Controller:", $scope.$parent.dashboard_state);

        $scope.myAccount = function(){
            $log.debug("Firing myAccount");
            $scope.current_state = 'app.mydashboard.myaccount';
            $state.go('app.mydashboard.myaccount');
        };
        $scope.notifications = function(){
            $log.debug("Firing notifications");
            $scope.current_state = 'app.mydashboard.notifications';
            $state.go('app.mydashboard.notifications');
        };
        $scope.todoItems = function(){
            $log.debug("Firing todoItems");
            $scope.myDashboardContent = 'templates/mydashboard/todo.html';
        };
        $scope.currentApplication = function(){
            $log.debug("Firing currentApplication");
            $scope.myDashboardContent = 'templates/mydashboard/currentApplication.html';
        };
        $scope.calendar = function(){
            $log.debug("Firing calendar");
            $scope.myDashboardContent = 'templates/mydashboard/calendar.html';
        };

    }])
;
