(function () {
    'use strict';
}());

angular.module('agSADCeFarms')
    .directive('ogisWorkflowQuestion', function(){
        return {
            replace: true,
            restrict: 'AE',
            scope: {
                questionId: '=?',
                otherStuff: '=',
                showQuestion: '='
            },
            templateUrl: 'templates/ogis-workflow-question.html',
            controllerAs: 'ctrl',
            bindToController: true,
            controller: function(){
                var ctrl = this;
                ctrl.$onInit = function() {
                    console.log("FIRING INIT FUNCTION:");
                    console.log("QUESTION:", ctrl.questionId);
                    console.log("OTHER STUFF:", ctrl.otherStuff);
                    console.log("SHOW QUESTION:", ctrl.showQuestion);
                };
                console.log("DOING CONTROLLER STUFF");
            },
            link: function (scope, ele, attrs, mwFormViewer){
                var ctrl = scope.ctrl;
                console.log("LINK FIRING: SCOPE", scope.ctrl, "ELEMENT:", ele, "ATTRS:", attrs, "FORMVIEWER", mwFormViewer);
            }


        };
    });
