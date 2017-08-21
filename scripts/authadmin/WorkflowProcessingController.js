(function () {
    'use strict';
}());

angular.module('agSADCeFarms')
    .controller('WorkflowProcessingController', ['$scope', '$log', '$state', function($scope, $log, $state) {
        $log.debug("WorkflowProcessingController Start");
        $scope.submitDisabled = true;
        $scope.yesno_yes = false;
        $scope.yesno_no = false;
        $scope.yesno_question = 'Are you sure you want to answer this question?';
        $scope.clicked_yes = function() {
            $scope.submitDisabled = false;
            $log.debug("YES CLICKED");
            $scope.yesno_no = false;
            $scope.answer = 'yes';
            $log.debug("YES VALUE:", $scope.yesno_yes, "NO VALUE:", $scope.yesno_no);
        };
        $scope.clicked_no = function() {
            $scope.submitDisabled = false;
            $log.debug("NO CLICKED");
            $scope.yesno_yes = false;
            $scope.answer = 'no';
            $log.debug("YES VALUE:", $scope.yesno_yes, "NO VALUE:", $scope.yesno_no);
        };
        $scope.submitYesNo = function() {
            $log.debug("ANSWER:", $scope.answer);
            $state.go('app');
        };
    }])
;