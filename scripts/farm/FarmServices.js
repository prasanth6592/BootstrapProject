(function () {

}());

angular.module('agSADCeFarms')
    .constant("baseURL", "/AG_SADCeFarms/")

    .service('GetfarmInfo', ['$resource',function($resource){
        var fundData = {};
        this.getFarmInfo = function(farmID){
            return $resource('http://127.0.0.1/AG_SADCeFarms/farminfo/'+farmID,{method:'GET'});

        };
        this.setFund = function(fund){
                fundData = fund;
        };
        this.getFund = function(){
                return fundData;
        };

    }])

    .service('GetFarmTags', ['$resource','$http','$q', function($resource, $http, $q) {
        this.getFarmTags=function(farmID){
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url : 'http://127.0.0.1/AG_SADCeFarms/farmtag/'+farmID
            }).then(function(response){
                deferred.resolve(response.data)
            },function(response){
                console.log(response);
            } )

            return deferred.promise
        }

    }])

        //Post NewTag Service
    .service('AddNewTag', ['$resource', function($resource) {

        this.addNewTag = function(){
            return $resource('http://127.0.0.1/AG_SADCeFarms/farmtag', null, {'save':{method:'POST'}});
        };
    }])

    .service('DeleteFarmTags', ['$resource','$http', '$q',  function($resource, $http, $q) {
        this.deleteFarmTags = function(deleteTag){
            var deferred = $q.defer();
            $http({
                method: 'DELETE',
                url : 'http://127.0.0.1/AG_SADCeFarms/farmtag',
                data : deleteTag,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(response){
                deferred.resolve(response.data)
            },function(response){
                console.log(response);
            } )

            return deferred.promise
        }
    }])
    .factory('getTagTypes', ['$http', function($http){
        var getTagTypes = function(){
            return $http({
                method: 'GET',
                url : 'http://127.0.0.1/AG_SADCeFarms/farmtagtype',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        return {
            getTagTypes : getTagTypes
        }
    }])

    .factory('FarmContactsFactory', ['$http', function($http){
        //contacts
        var getContacts = function(farmID){
            return $http({
                method: 'GET',
                url : 'http://127.0.0.1/AG_SADCeFarms/farmcontact/'+farmID,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        };

        var addNewContact = function(newContact){
            return $http({
                method: 'POST',
                url : 'http://127.0.0.1/AG_SADCeFarms/farmcontact',
                data : newContact,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        };

        var deleteContact = function(contact){
            return $http({
                method: 'DELETE',
                url : 'http://127.0.0.1/AG_SADCeFarms/farmcontact',
                data : contact,
                headers: {
                    'Content-Type': 'application/json'
                }
            })

        };

        var getContactTypes = function(){
            return $http({
                method: 'GET'
                ,url : 'http://127.0.0.1/AG_SADCeFarms/contacttype'
                ,headers: {
                    'Content-Type': 'application/json'
                }
            })
        };

        //users
        var getUsers = function(){
            return $http({
                method: 'GET',
                url : 'http://127.0.0.1/AG_SADCeFarms/users',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        };

        var addNewUser = function(newUser){
            return $http({
                method: 'POST',
                url : 'http://127.0.0.1/AG_SADCeFarms/users',
                data : newUser,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        };

        var getOrgTypes = function(){
            return $http({
                method: 'GET'
                ,url : 'http://127.0.0.1/AG_SADCeFarms/orgtypes'
                ,headers: {
                    'Content-Type': 'application/json'
                }
            })
        };



        return{
            getContacts: getContacts
            ,getUsers : getUsers
            ,addNewUser : addNewUser
            ,addNewContact : addNewContact
            ,deleteContact : deleteContact
            ,getContactTypes : getContactTypes
            ,getOrgTypes : getOrgTypes
        }
    }])

    .factory('FarmApplicationsFactory', ['$http', function($http){
        //applications
        var getApplications = function(farmID){
            return $http({
                method: 'GET',
                url : 'http://127.0.0.1/AG_SADCeFarms/farmapp/'+farmID,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        };

        return{
            getApplications : getApplications
        }
    }])

    .factory('FarmNotesAndDocumentsFactory', ['$http', function($http){
        return{
            getNoteGroups : function(farmId){
                return $http({
                    method: 'GET',
                    url : '../app/scripts/farm/get_test_json_data.txt',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            },

            postNoteGroup : function(farmId, newNoteGroup){
                return $http({
                    method: 'POST',
                    url : '/AG_SADCeFarms/notegroup?farm_guid='+farmId,
                    data : newNoteGroup,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            },

            updateNoteGroup : function(noteGroupId, noteGroup){
                return $http({
                    method: 'PUT',
                    url : '/AG_SADCeFarms/notegroup/'+noteGroupId,
                    data : noteGroup,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            },

            deleteNoteGroup : function(noteGroupId){
                return $http({
                    method: 'DELETE',
                    url : '/AG_SADCeFarms/notegroup/'+noteGroupId,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            },

            postNote : function(newNote){
                return $http({
                    method: 'POST',
                    url : '/AG_SADCeFarms/note',
                    data : newNote,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            },

            updateNote : function(noteId, note){
                return $http({
                    method: 'PUT',
                    url : '/AG_SADCeFarms/note/'+noteId,
                    data : note,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            },

            deleteNote : function(noteId){
                return $http({
                    method: 'DELETE',
                    url : '/AG_SADCeFarms/note/' + noteId,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            },
        }

    }])




