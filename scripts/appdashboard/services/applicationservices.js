(function () {
    'use strict';
}());

 angular.module('agSADCeFarms').factory('applicationService', ['$http', '$q', function($http, $q) {

        return {
            fetchApplication: function(appGUID) {
                return $http.get('http://127.0.0.1/AG_SADCeFarms/application/'+appGUID) //'http://127.0.0.1/AG_SADCeFarms/application/'+appGUID
                        .then(
                        function(response) {
                            return response.data;
                        },
                        function(errResponse) {
                            console.error('Error while fetching Application Data');
                            //return $q.reject(errResponse);
                        }
                );
            },
            submitApplication: function(formData) {
                return $http.post('http://127.0.0.1/AG_SADCeFarms/appanswer', formData)
                        .then(
                        function(response) {
                            return response;
                        },
                        function(errResponse) {
                            console.error('Error while Submitting Application Data');
                            //return $q.reject(errResponse);
                        }
                );
            },
            fetchAppInfo: function(appGUID) {
            return $http.get('http://127.0.0.1/AG_SADCeFarms/appinfo/' + appGUID)  //'http://127.0.0.1/AG_SADCeFarms/appinfo/' + appGUID
                    .then(
                    function(response) {
                        return response.data;
                    },
                    function(errResponse) {
                        console.error('Error while fetching Application Info');
                        //return $q.reject(errResponse);
                    }
            );
           },
            checkAppGUID: function(appGUID) { console.log(appGUID);
//             $http.get('../app/scripts/appdashboard/appInfo.json')  //'http://127.0.0.1/AG_SADCeFarms/appinfo/' + appGUID
//                    .then(
//                    function(response) {
//                        return response.data;
//                    },
//                    function(errResponse) {
//                        console.error('Error while fetching Application Info');
//                        //return $q.reject(errResponse);
//                    }
//);
            if (appGUID == 'd3e48b84-af47-4767-b2b2-bbed7ee1bde3') {
                return true;
            } else {
                return false;
            }

        }
        };
    }]);
