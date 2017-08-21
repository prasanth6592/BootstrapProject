(function () {
    'use strict';
}());

angular.module('agSADCeFarms')
    .controller('RegisterController', ['$scope', '$log', 'agSupportEmail', 'registerFactory',
            'modalService', 'modalMessageService', '$window',
            function($scope, $log, agSupportEmail, registerFactory,
                modalService, modalMessageService, $window ) {

            // Define forms variable for the userMainForm and userFormTop( forms.userMainForm & forms.userFormTop) so the form validity can be checked
            $scope.forms = {};

            var initRegistrant = function(){
                // Empty registrant for form
                $scope.registrant = {
                    'email': '',
                    'auth_code': ''
                };
            };

            $log.debug("Support Email:", agSupportEmail);

            // Initialize form values
            initRegistrant();

            // Other confirmation fields for the form
            $scope.confirm_email = '';
            $scope.confirm_auth_code ='';

            // Do the registration
            $scope.Register = function(){
                $log.debug("Register button clicked");
                $log.debug("Value of registrant:", $scope.registrant);
                registerFactory.registerUsers().save($scope.registrant )
                    .$promise.then(
                    function(response){
                        $log.debug("Redirect URL:", response.success);
                        // Redirect to url
                        $window.location.href = response.success;
                    },
                    function(response) {
                        $log.debug("ERROR ADDING USER:", response.data.error);
                        $log.debug("Error: "+response.status + " " + response.statusText);
                        var error_message;
                        if ( response.status === 500) {
                            error_message = "A server error has occurred. Please email " + agSupportEmail;
                            modalMessageService.showMessage("Error:", error_message);
                        } else if (response.data.error === 'err-a002') {
                            error_message = "Email and authorization code do not match our records." +
                                "If you are still having problems, please email " + agSupportEmail;
                            modalMessageService.showMessage("Error:", error_message);
                        } else if (response.data.error === 'err-a007') {
                            error_message = "A user with this email is already registered." +
                                "If you are still having problems, please email " + agSupportEmail;
                            modalMessageService.showMessage("Error:", error_message);
                        } else {
                            console.log("Other error message shown.", response.status );
                            modalMessageService.showMessage( "Error:", "Error " + response.data.error + " occured while registering. " +
                                "Please email " + agSupportEmail + " and mention this error message.");
                        }
                    }
                );

            };

            $scope.Cancel = function(){
                $log.debug("Cancel button clicked");
                modalMessageService.showMessage("Message:", "You have cancelled you registration for eFarms.");
                initRegistrant();
            };

        }])
;
