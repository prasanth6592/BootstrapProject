'use strict';

angular.module('agSADCeFarms')

.service('mapdataservices', ['$resource', 'baseURL', function($resource, baseURL) {

        this.getAppLayers = function(){
            //console.log(">>>>BASE URL:", baseURL);
            return $resource("scripts/mapping/services/testdata.json",null,  {'save':{method:'POST' }});
        };
        this.getFarmLayers = function(){
            //console.log(">>>>BASE URL:", baseURL);
            return $resource("testdata.json",null,  {'save':{method:'POST' }});
        };

    }])