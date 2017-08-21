(function() {
    'use strict';
}());
angular.module('agSADCeFarms')
        .controller('AppInfoController', ['$scope', '$state', '$log', 'applicationService', '$sce', '$http', '$window', function($scope, $state, $log, applicationService, $sce, $http, $window) {

        $log.debug("From Parent Controller:", $scope.$parent.dashboard_state);

        var checkGUID = applicationService.checkAppGUID($state.params.GUID);

        if (checkGUID) {
            applicationService.fetchAppInfo($state.params.GUID).then(
                    function(response) {
                        //console.log(response);
                        $scope.appInfo = response;
                    },
                    function(errResponse) {
                        console.error('Error while fetching Currencies');
                    }
            );
        }else{
            $scope.GUIDfailed = true;
        }

    }]);
