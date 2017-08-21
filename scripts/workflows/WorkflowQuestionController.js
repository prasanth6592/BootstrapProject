(function () {
    'use strict';
}());

angular.module('agSADCeFarms')
    .controller('WorkflowQuestionController', ['$scope', '$log', '$state', 'workflowQuestionFactory',
            function($scope, $log, $state, workflowQuestionFactory) {
        $log.debug("WorkflowQuestionController Start");
        $scope.commands = "Super Workflow Questions (click on one for fun)";
        $scope.question = "Workflow Question";
        $scope.questions = [
            { 'question': 'Earth Yes/No Question', 'id': "98020531-0678-4b81-a57c-7ae65949ca5f" }, // Yes no radio
            { 'question': 'Snack Checkbox Question', 'id': "c7646b3c-2f12-4668-9df6-7e62ebd4dd7b" }, // Checkbox
            { 'question': 'Municipality Choice Question', 'id': "34049403-857f-4d2e-b6b1-33b5158c4fc1" }  // selection box for municipality review
        ];

        $scope.submitAnswer = function(question_guid, submittedAnswer) {
            workflowQuestionFactory.getQuestion().save({question_guid:question_guid}, submittedAnswer )
                .$promise.then(
                function(response){
                    $log.debug("RESPONSE FROM submitAnswer", response);
                },
                function(response) {
                    //$log.debug("AFTER GETING ERROR FROM DETAILS:", $scope.userdetails);
                    $log.debug("ERROR submitting answer:", response);
                }
            );
        };
        $scope.askQuestion = function(index) {
            $log.debug("INDEX CLICKED:", index);
            $log.debug("Requesting question id:", $scope.questions[index].id);
            workflowQuestionFactory.getQuestion().get({question_guid:$scope.questions[index].id})
                .$promise.then(
                function(response){
                    $scope.questionDetails = response;
                    $log.debug("QUESTION DETAILS:", $scope.questionDetails );
                    $scope.questionResponse = {
                        'selectedQuestionId': $scope.questionDetails.id
                    };
                    switch($scope.questionDetails.type){
                        case 'radio':
                            $log.debug("DOING RADIO QUESTION:");
                            $scope.questionResponse.selectedAnswer = null;
                            break;
                        case 'checkbox':
                            $log.debug("DOING CHECKBOX QUESTION:",$scope.questionDetails);
                            $scope.questionResponse.selectedAnswers = [];
                            break;
                        case 'selection':
                            $log.debug("DOING SELECTION QUESTION:");
                            $scope.questionResponse.selectedAnswers = [];
                            $scope.initItemSelectors();
                            break;
                    }
                },
                function(response) {
                    // Error from request
                    $log.debug("Error: "+response.status + " " + response.statusText);
                }
            );
        };

        //-------------------------------------------------------------------------
        // RADIO BUTTON TOOL CODE

        $scope.selectedAnswerChanged = function(){
            $log.debug("Selected answer changed");
            //$log.debug("Radio Answer:", $scope.questionResponse.selectedAnswerId);
            $log.debug("Radio Answer:", $scope.questionResponse.selectedAnswer);
            //$log.debug("Radio Answer:", $scope.questionResponse.selectedAnswerId);
        };

        //$scope.select = {'selectedAnswerId': '' };

        $scope.submitRadio = function(){
            $log.debug("SUBMIT BUTTON HIT");
            //$scope.questionResponse.selectedQuestionId = $scope.questionDetails.id;
            // Take selected answer id and build selected answers
            //var selId = $scope.questionResponse.selectedAnswer;
            //angular.forEach($scope.questionDetails.offeredAnswers, function(item){
            //    if ( item.id === selId ) {
            //        $scope.questionResponse.selectedAnswer.push({'id': item.id, 'value': item.value});
            //    }
            //});
            $log.debug("SUBMITTING ANSWER:", $scope.questionResponse);
            $scope.submitAnswer($scope.questionResponse.selectedQuestionId, {'selectedAnswer': $scope.questionResponse.selectedAnswer })
        };

        $scope.close = function(){
            $log.debug("CANCEL BUTTON HIT");
        };

        //-------------------------------------------------------------------------
        // CHECK BOX TOOL CODE
        $scope.toggleSelectedAnswer=  function(answer){
            $log.debug("CHECKBOX TOGGLED:", answer);
            if ($scope.questionResponse.selectedAnswers.indexOf(answer.id) === -1 ){
                $scope.questionResponse.selectedAnswers.push(answer.id);
            } else {
                $scope.questionResponse.selectedAnswers.splice($scope.questionResponse.selectedAnswers.indexOf(answer.id), 1);
            }
            $log.debug("SELECTED ANSWERS:", $scope.questionResponse.selectedAnswers);
        };
        $scope.submitCheckbox = function(){
            $log.debug("Checkbox question submitted");
            $log.debug("SUBMITTING ANSWER:", $scope.questionResponse.selectedAnswers);
            $scope.submitAnswer($scope.questionResponse.selectedQuestionId, {'selectedAnswers': $scope.questionResponse.selectedAnswers })
        };
        //-------------------------------------------------------------------------
        // SELECTION BOX TOOL CODE

        $scope.initItemSelectors = function() {
            // Add select: false to each item to be used in selection box to initialize the item
            angular.forEach($scope.questionDetails.offeredAnswers, function(item){
                item.selected = false;
            });

            $scope.itemSelection = {
                itemsFrom: [],
                itemsTo: []
            };
        };

        $scope.selectLimited = function() {
            $log.debug("ITEMS SELECTED:",$scope.itemSelection.itemsFrom);
            if ( $scope.itemSelection.itemsFrom.length === 0 ) {
                $log.debug("NO ITEMS SELECTED");
            } else {
                $log.debug("MOVING ITEMS:", $scope.itemSelection.itemsFrom);
                setItemSelectedStatus();
            }
        };

        $scope.unselectLimited = function() {
            $log.debug("ITEMS UNSELECTED:",$scope.itemSelection.itemsTo);
            if ( $scope.itemSelection.itemsFrom.length === 0 ) {
                $log.debug("NO ITEMS SELECTED");
            } else {
                $log.debug("MOVING ITEMS:", $scope.itemSelection.itemsTo);
                setItemUnselectedStatus();
            }
        };

        $scope.selectAll = function() {
            setAllItemsSelectedStatus();
        };

        $scope.unselectAll = function() {
            setAllItemsUnselectedStatus();
        };

        // For each item, check to see if it's key is in the selected 'From' items.  If it is,
        // change the selected value to true so it gets filtered out
        var setItemSelectedStatus = function() {
            angular.forEach($scope.questionDetails.offeredAnswers, function(item){

                    if ( $scope.itemSelection.itemsFrom.indexOf(item.id) != -1 ) {
                    item.selected = true;
                }
            });
        };

        // For each item, check to see if it's key is in the selected 'To' items.  If it is,
        // change the selected value to false so it gets filtered out
        var setItemUnselectedStatus = function() {
            angular.forEach($scope.questionDetails.offeredAnswers, function(item){
                if ( $scope.itemSelection.itemsTo.indexOf(item.id) != -1 ) {
                    item.selected = false;
                }
            });
        };
        // Change selected status to true for all items
        var setAllItemsSelectedStatus = function() {
            angular.forEach($scope.questionDetails.offeredAnswers, function(item){

                    item.selected = true;
            });
        };

        // Change selected status to true for all items
        var setAllItemsUnselectedStatus = function() {
            angular.forEach($scope.questionDetails.offeredAnswers, function(item){
                item.selected = false;
            });
        };

        $scope.submitSelection = function() {
            angular.forEach($scope.questionDetails.offeredAnswers, function(item){
                if ( item.selected ) {
                    $scope.questionResponse.selectedAnswers.push(item.id);
                }
            });
            $log.debug("SUBMITTING SELECTION", $scope.questionResponse);
            $scope.submitAnswer($scope.questionResponse.selectedQuestionId, {'selectedAnswers': $scope.questionResponse.selectedAnswers })
        }

    }])
;