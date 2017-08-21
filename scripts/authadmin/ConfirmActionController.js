(function () {
    'use strict';
}());


angular.module('agSADCeFarms')
    .controller('ConfirmActionController', ['$scope', '$log', '$uibModalInstance', 'confirmationMessage', 'users', 'action',
        function($scope, $log, $uibModalInstance, confirmationMessage, users, action ) {

            $log.debug("Inside ConfirmActionController: confirmationMessage:", confirmationMessage);
            $log.debug("Inside ConfirmActionController: users:", users);
            $scope.confirmationMessage = confirmationMessage;
            $scope.users = users;

            $scope.yesExecute = function () {
                var response = {'action': action };
                $uibModalInstance.close(response);
            };
            $scope.noExecute = function () {
                $uibModalInstance.dismiss();
            };
        }])
;