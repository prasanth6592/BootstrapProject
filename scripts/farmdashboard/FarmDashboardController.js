(function () {
    'use strict';
}());

angular.module('agSADCeFarms')
    .controller('FarmDashboardController', ['$scope', '$state', '$log', function($scope, $state, $log ) {

        $log.debug("From Parent Controller:", $scope.$parent.dashboard_state);



    }])
;
