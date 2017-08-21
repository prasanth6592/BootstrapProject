(function () {
    'use strict';
}());

angular.module('agSADCeFarms')
    //.constant("baseURL", "http://oit-6gsgyv1.oit.state.nj.us/AG_SADCeFarmsWS/")
    .constant("baseURL", "/AG_SADCeFarms/")
    .constant("agSupportEmail", "efarmssupport@ag.nj.gov")
    .service('workflowQuestionFactory', ['$resource', 'baseURL', '$log', function($resource, baseURL, $log) {

        this.getQuestion = function(){
            //console.log(">>>>BASE URL:", baseURL);
            resp = $resource(baseURL+"taskquestions/:question_guid", null, {'save':{method:'POST'},'update':{method:'PUT'}});
            $log.debug("RESPONSE FROM TASK QUESTION:", resp);
            return resp;
        };

    }])
;
