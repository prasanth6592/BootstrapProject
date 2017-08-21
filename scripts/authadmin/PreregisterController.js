(function () {
    'use strict';
}());

angular.module('agSADCeFarms')
    .controller('PreregisterController', ['$scope', '$log', '$filter', 'orgtypeFactory', 'preregFactory', 'userSkeleton',
            'salutationsGetter', 'modalService', 'modalMessageService', 'agSupportEmail',
        function($scope, $log, $filter, orgtypeFactory, preregFactory, userSkeleton,
            salutationsGetter, modalService, modalMessageService, agSupportEmail ) {

            // Define forms variable for the userMainForm and userFormTop( forms.userMainForm & forms.userFormTop) so the form validity can be checked
            $scope.forms = {};

            // Get empty user
            $scope.user = userSkeleton.getUser();

            //force state to uppercase
            $scope.$watch('user.state', function (val) {

                $scope.user.state = $filter('uppercase')(val);

            }, true);

            orgtypeFactory.getOrgtypes().query()
                .$promise.then(
                function(response){
                    $scope.orgtypes = response;
                },
                function(response) {
                    $log.debug("Error: "+response.status + " " + response.statusText);
                    modalMessageService.showMessage( "Error:", "There was an error connecting to the database. " +
                        "Contact " + agSupportEmail + " for further assistance.");
                }
            );

            // To prevent double clicking of submit button.
            $scope.disable_pregreg_button = false;

            $scope.salutations = salutationsGetter.getSalutations();

            $scope.Preregister = function () {
                $scope.loading_data = true;
                $scope.disable_pregreg_button = true;
                $log.debug("PRE-REGISTERED USER:",$scope.user);
                preregFactory.preregisterUsers().save($scope.user )
                    .$promise.then(
                    function(response){
                        $log.debug("RESPONSE FROM doAddUser", response);
                        modalMessageService.showMessage("Success:", "Congratulations, you have successfully pre-registered for the eFarms system." +
                            " You will receive more information once your request has been processed.");
                        // Clear the user off of the screen
                        $scope.user = userSkeleton.getUser();
                        $scope.loading_data = false;
                        $scope.disable_pregreg_button = false;

                    },
                    function(response) {
                        $log.debug("ERROR ADDING USER:", response);
                        if ( response.data.error === 'err-a005' ) {
                            modalMessageService.showMessage( "Error:", "A user with that email address is already registered. Please try again, " +
                             " or contact " + agSupportEmail + " for further assistance.");
                        } else {
                            modalMessageService.showMessage( "Error:", "Error " + response.data.error + " occured while pre-registering. " +
                                "Please email " + agSupportEmail + " and mention this error message.");
                        }
                        $log.debug("Error: "+response.status + " " + response.statusText);
                        //$scope.message = "Error: "+response.status + " " + response.statusText;
                        $scope.loading_data = false;
                        $scope.disable_pregreg_button = false;
                    }
                );

            };
            $scope.Cancel = function(){
                modalMessageService.showMessage("Message:", "You have cancelled you pre-registration for eFarms.");
            };
        }])
;
