(function () {
    'use strict';
}());

angular.module('agSADCeFarms')
    //.constant("baseURL", "http://oit-6gsgyv1.oit.state.nj.us/AG_SADCeFarmsWS/")
    .constant("baseURL", "/AG_SADCeFarms/")
    .constant("agSupportEmail", "efarmssupport@ag.nj.gov")
    .service('authAdminErrors', function(){
        var errors = {
            'err-a001': {'d_msg': 'Missing Auth User GUID', 'ui_msg': ''},
            'err-a002': {'d_msg': 'User does not exist.', 'ui_msg': ''},
            'err-a003': {'d_msg': 'Email field missing', 'ui_msg': ''},
            'err-a004': {'d_msg': 'Email is empty', 'ui_msg': ''},
            'err-a005': {'d_msg': 'User already exists.', 'ui_msg': ''},
            'err-a006': {'d_msg': 'Error Serializing User.', 'ui_msg': ''},
            'err-a007': {'d_msg': 'User status Created not found.', 'ui_msg': ''},
            'err-a008': {'d_msg': 'User status Invited not found', 'ui_msg': ''},
            'err-a009': {'d_msg': 'User status Pre-Registered not found.', 'ui_msg': ''},
            'err-a010': {'d_msg': 'User status Registered not found.', 'ui_msg': ''},
            'err-a011': {'d_msg': 'User is already registered.', 'ui_msg': ''},
            'err-a012': {'d_msg': 'Error creating proxy client from WSDL.', 'ui_msg': ''},
            'err-a013': {'d_msg': 'Error granting role to user.', 'ui_msg': ''},
            'err-a014': {'d_msg': 'Error resuming registration.', 'ui_msg': ''},
            'err-a015': {'d_msg': 'Unknown (other) registration error.', 'ui_msg': ''},
            'err-a016': {'d_msg': 'Error while saving user.', 'ui_msg': ''}
        };
        this.getMessage = function(error){
            if (!(error in errors)) {
                return 'Unknown Error';
            }
            return errors[error];
        };
    })
    .service('orgtypeFactory', ['$resource', 'baseURL', function($resource, baseURL) {

        this.getOrgtypes = function(){
            //console.log(">>>>BASE URL:", baseURL);
            return $resource(baseURL+"orgtypes/:id", null,  {'save':{method:'POST' }});
        };

    }])
    .service('rolesFactory', ['$resource', 'baseURL', function($resource, baseURL) {

        this.getRoles = function(){
            //console.log(">>>>BASE URL:", baseURL);
            return $resource(baseURL+"roles/:id", null,  {'save':{method:'POST' }});
        };

    }])
    .service('partnersFactory', ['$resource', 'baseURL', function($resource, baseURL) {

        this.getPartners = function(){
            //console.log(">>>>BASE URL:", baseURL);
            return $resource(baseURL+"partners/:id",null,  {'save':{method:'POST' }});
        };

    }])
    .service('tiersFactory', ['$resource', 'baseURL', function($resource, baseURL) {

        this.getTiers = function(){
            //console.log(">>>>BASE URL:", baseURL);
            return $resource(baseURL+"tiers/:id",null,  {'save':{method:'POST' }});
        };

    }])
    .service('groupsFactory', ['$resource', 'baseURL', function($resource, baseURL) {

        this.getGroups = function(){
            //console.log(">>>>BASE URL:", baseURL);
            return $resource(baseURL+"groups/:id",null,  {'save':{method:'POST' }});
        };

    }])
    .service('subgroupsFactory', ['$resource', 'baseURL', function($resource, baseURL) {

        this.getSubgroups = function(){
            //console.log(">>>>BASE URL:", baseURL);
            return $resource(baseURL+"subgroups/:id",null,  {'save':{method:'POST' }});
        };

    }])
    .service('countiesFactory', ['$resource', 'baseURL', function($resource, baseURL) {

        this.getCounties = function(){
            //console.log(">>>>BASE URL:", baseURL);
            return $resource(baseURL+"counties/:id",null,  {'save':{method:'POST' }});
        };

    }])
    .service('municipalitiesFactory', ['$resource', 'baseURL', function($resource, baseURL) {

        this.getMunicipalities = function(){
            //console.log(">>>>BASE URL:", baseURL);
            return $resource(baseURL+"municipalities/:id",null,  {'save':{method:'POST' }});
        };

    }])
    .service('userFactory', ['$resource', 'baseURL', function($resource, baseURL) {

        this.getUsers = function(){
            //console.log(">>>>BASE URL:", baseURL);
            return $resource(baseURL+"users/:auth_user_guid", null, {'save':{method:'POST'},'update':{method:'PUT'}});
        };

    }])
    .service('preregFactory', ['$resource', 'baseURL', function($resource, baseURL) {

        this.preregisterUsers = function(){
            //console.log(">>>>BASE URL:", baseURL);
            return $resource(baseURL+"preregister", null, {'save':{method:'POST'}});
        };

    }])
    .service('registerFactory', ['$resource', 'baseURL', function($resource, baseURL) {

        this.registerUsers = function(){
            //console.log(">>>>BASE URL:", baseURL);
            return $resource(baseURL+"register", null, {'save':{method:'POST'}});
        };

    }])
    .service('inviteFactory', ['$resource', 'baseURL', function($resource, baseURL) {

        this.doInvite = function(){
            return $resource(baseURL+"invite",null,  {'save':{method:'POST' }});
        };

    }])
    .service('activateFactory', ['$resource', 'baseURL', function($resource, baseURL) {

        this.doActivate = function(){
            return $resource(baseURL+"activate",null,  {'save':{method:'POST' }});
        };

    }])
    .service('deactivateFactory', ['$resource', 'baseURL', function($resource, baseURL) {

        this.doDeactivate = function(){
            return $resource(baseURL+"deactivate",null,  {'save':{method:'POST' }});
        };

    }])
    .service('userSkeleton', ['$resource', function($resource ) {
        this.getUser = function(){
            return {
                "salutation": "",
                "first_name": "",
                "last_name": "",
                "title": "",
                "organization": "",
                "address": "",
                "city": "",
                "state": "",
                "zip": "",
                "zip4": "",
                "email_primary": "",
                "email_alternate": "",
                "phone_primary": "",
                "phone_primary_ext": "",
                "phone_alternate": "",
                "phone_alternate_ext": "",
                //"auth_user_status_desc": "",
                "contact_type_desc": null,
                "person_type_desc": "",
                "role": []
            };

        };
    }])
    .service('salutationsGetter', ['$resource', function($resource ) {
        this.getSalutations = function(){
            return [
                {value: "", label: "" },
                {value: "Mr.", label: "Mr." },
                {value: "Mrs.", label: "Mrs." },
                {value: "Ms.", label: "Ms." },
                {value: "Mr. & Mrs.", label: "Mr. & Mrs." }
            ];
        };
    }])

    .service('modalService', [ '$log', '$uibModal',  function( $log, $uibModal ) {
        var modalDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            templateUrl: 'templates/authadmin/modal.html'
        };

        var modalOptions = {
            closeButtonText: 'Close',
            closeButtonVisible: true,
            actionButtonText: 'OK',
            actionButtonVisible: true,
            headerText: 'Proceed?',
            bodyText: 'Perform this action?'
        };

        this.showModal = function (customModalDefaults, customModalOptions, resultToGet ) {
            if (!customModalDefaults) customModalDefaults = {};
            customModalDefaults.backdrop = 'static';
            if (!resultToGet) resultToGet = {};
            $log.debug("in showModal resultToGet:", resultToGet);
            return this.show(customModalDefaults, customModalOptions, resultToGet );
        };

        this.show = function (customModalDefaults, customModalOptions, resultToGet ) {
            //Create temp objects to work with since we're in a singleton service
            var tempModalDefaults = {};
            var tempModalOptions = {};
            var tmpResultToGet = resultToGet;

            //Map angular-ui modal custom defaults to modal defaults defined in service
            angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

            //Map modal.html $scope custom properties to defaults defined in service
            angular.extend(tempModalOptions, modalOptions, customModalOptions);

            if (!tempModalDefaults.controller) {
                tempModalDefaults.controller = ('TempModalController', ['$scope', '$uibModalInstance',
                    function ($scope, $uibModalInstance, customModalDefaults) {
                        $scope.resultToGet = tmpResultToGet;
                        $scope.modalOptions = tempModalOptions;
                        $scope.modalOptions.ok = function (resultToGet) {
                            $uibModalInstance.close(resultToGet);
                        };
                        $scope.modalOptions.close = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                }]);
            }
            return $uibModal.open(tempModalDefaults).result;
        };
    }])

    .service('modalMessageService', [ '$log', 'modalService', '$uibModal',  function( $log, modalService, $uibModal ) {
        this.showMessage = function ( heading, message ) {
            var modalOptions = {
                actionButtonText: 'Close',
                closeButtonVisible: false,
                headerText: heading,
                bodyText: message
            };
            modalService.showModal({}, modalOptions, {})
                // We don't care about the response
                .then( function(response){}, function(){});
        };

    }])
;
