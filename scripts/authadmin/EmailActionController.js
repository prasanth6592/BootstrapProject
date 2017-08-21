(function () {
    'use strict';
}());

angular.module('agSADCeFarms')
    .controller('EmailActionController', ['$scope', '$log', '$uibModalInstance', '$timeout', 'clipboard', 'users',
        function($scope, $log, $uibModalInstance, $timeout, clipboard, users ) {

            $scope.users = users;

            $scope.textCopied = false;
            $scope.clipboardNotSupported = false;

            $scope.delimit_users = function() {
                if ($scope.delim_value === 'semicolon') {
                    $log.debug("CHANGING TO SEMICOLON");
                    return $scope.users.join('; ');
                } else if ($scope.delim_value === 'comma') {
                    $log.debug("CHANGING TO COMMA");
                    return $scope.users.join(', ');
                }
            };

            // Set init value for delimiter
            $scope.delim_value = 'semicolon';
            $scope.display_users = $scope.delimit_users();

            $scope.change_delim = function(delim_value){
                $scope.delim_value = delim_value;
                $scope.display_users = $scope.delimit_users();
            };

            $scope.copyToClipboard = function(){
                if (!clipboard.supported) {
                    $scope.clipboardNotSupported = true;
                }
                $log.debug("COPYING TO CLIPBOARD");
                clipboard.copyText($scope.display_users);
                $scope.textCopied = true;
                $timeout(function(){
                    $log.debug("TIMEOUT FIRED:");
                    $scope.textCopied = false;
                }, 2000);

            };

            $scope.close = function () {
                $uibModalInstance.close();
            };
        }])
;