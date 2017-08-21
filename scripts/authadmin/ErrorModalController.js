(function () {
    'use strict';
}());

angular.module('agSADCeFarms')
    .controller('ErrorModalController', ['$scope', '$log', '$uibModalInstance', 'error_message',
        function($scope, $log, $uibModalInstance, error_message ) {

            $log.debug("Inside ErrorModalController: error_message:", error_message);
            $scope.error_message = error_message;
            $scope.cancel = function () {
                $uibModalInstance.dismiss();
            };
        }])
;
