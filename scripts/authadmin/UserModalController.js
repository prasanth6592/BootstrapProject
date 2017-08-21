(function () {
    'use strict';
}());

angular.module('agSADCeFarms')
    .controller('UserModalController', ['$scope', '$log', '$uibModalInstance', 'salutationsGetter', 'roles', 'role_filterFilter', 'get_selectedFilter',
        'roleTiers', 'roleGroups', 'roleSubgroups', 'rolePartners', 'roleCounties', 'roleMunicipalities', 'orgtypes', 'user',
        function($scope, $log, $uibModalInstance, salutationsGetter, roles, role_filterFilter, get_selectedFilter,
                 roleTiers, roleGroups, roleSubgroups, rolePartners, roleCounties, roleMunicipalities, orgtypes, user ) {

            $scope.roles = roles;
            $scope.roleTiers = roleTiers;
            $scope.roleGroups = roleGroups;
            $scope.roleSubgroups = roleSubgroups;
            $scope.rolePartners = rolePartners;
            $scope.roleCounties = roleCounties;
            $scope.roleMunicipalities = roleMunicipalities;

            // User info to load
            $scope.orgtypes = orgtypes;

            // Make a copy of the user in case cancel button is hit.
            $scope.user = angular.copy(user);

            // Add select: false to each role to be used in selection box to initiate the role
            angular.forEach($scope.roles, function(role){
                role.selected = false;
            });
            //$log.debug("ROLES AFTER SELECTED ADDED:", $scope.roles);

            // For each role guid in the user, set the selected status to true for the role so
            // it shows up as a selected role.
            // First build array of selected auth_role_guids
            var user_roles = [];
            angular.forEach( $scope.user.role, function(role){
                user_roles.push(role.auth_role_guid);
            });
            $log.debug("SETTING THESE ROLES TO SELECTED:", user_roles);
            // Now set the role selected to true for those roles
            angular.forEach($scope.roles, function(role){
                if ( user_roles.indexOf(role.auth_role_guid) != -1 ) {
                    $log.debug("MATCHED SELECTED ROLE:");
                    role.selected = true;
                }
            });

            // Set emails to match since we are editing and not storing confirm email
            $scope.user.email_primary_confirm = user.email_primary;
            $log.debug("DISPLAY USER:", $scope.user);

            $scope.u_panel_open = true;
            $scope.r_panel_open = false;
            // Define forms variable for the userMainForm ( forms.userMainForm ) so outside the scope of the accordian
            // status of the form can be checked.
            $scope.forms = {};

            $scope.salutations = salutationsGetter.getSalutations();
            //    {value: "", label: "" },
            //    {value: "Mr.", label: "Mr." },
            //    {value: "Mrs.", label: "Mrs." },
            //    {value: "Ms.", label: "Ms." },
            //    {value: "Mr. & Mrs.", label: "Mr. & Mrs." }
            //];

            // For each role, check to see if it's guid is in the selected 'From' roles.  If it is,
            // change the selected value to true so it gets filtered out
            var setRoleSelectedStatus = function() {
                angular.forEach($scope.roles, function(role){
                    if ( $scope.roleSelection.rolesFrom.indexOf(role.auth_role_guid) != -1 ) {
                        role.selected = true;
                    }
                });
            };
            // For each role, check to see if it's guid is in the selected 'To' roles.  If it is,
            // change the selected value to false so it gets filtered out
            var setRoleUnselectedStatus = function() {
                angular.forEach($scope.roles, function(role){
                    if ( $scope.roleSelection.rolesTo.indexOf(role.auth_role_guid) != -1 ) {
                        role.selected = false;
                    }
                });
                //$log.debug("ROLES AFTER SETTING STATUS TO TRUE:", $scope.roles);
            };

            // Change selected status to true for all roles in the 'From' roles
            var setAllRolesSelectedStatus = function() {
                angular.forEach($scope.filteredRolesFrom, function(role){
                    role.selected = true;
                });

            };
            // Change selected status to true for all roles in the 'From' roles
            var setAllRolesUnselectedStatus = function() {
                angular.forEach($scope.roles, function(role){
                    role.selected = false;
                });

            };

            var initRoleSelectors = function() {
                $scope.roleSelection = {
                    rolesFrom: [],
                    rolesTo: []
                };
                $scope.roleFilter = {
                    tier: '',
                    group: '',
                    subgroup: '',
                    partner: '',
                    county: '',
                    municipality: ''
                };
            };

            // Clear filter functions
            $scope.clearPartnerFilter = function(){
                $scope.roleFilter.partner = '';
            };
            $scope.clearCountyFilter = function(){
                $scope.roleFilter.county = '';
            };
            $scope.clearMunicipalityFilter = function(){
                $scope.roleFilter.municipality= '';
            };
            $scope.clearTierFilter = function(){
                $scope.roleFilter.tier = '';
            };
            $scope.clearGroupFilter = function(){
                $scope.roleFilter.group = '';
            };
            $scope.clearSubgroupFilter = function(){
                $scope.roleFilter.subgroup = '';
            };

            initRoleSelectors();

            $scope.clearFilter = function(){
                $log.debug("CLEARING FILTER");
                initRoleSelectors();
            };

            $scope.selectLimited = function() {
                if ( $scope.roleSelection.rolesFrom.length === 0 ) {
                    $log.debug("NO ROLES SELECTED");
                } else {
                    $log.debug("MOVING ROLES:", $scope.roleSelection.rolesFrom);
                    setRoleSelectedStatus();
                }
            };

            $scope.selectAll = function() {
                // First filter out so not all roles are selected.
                $scope.filteredRolesFrom = role_filterFilter( $scope.roles, $scope.roleFilter);
                $log.debug("ALL SELECTED ROLES TO MOVE:", $scope.filteredRolesFrom);
                setAllRolesSelectedStatus();
            };

            $scope.unselectLimited = function() {
                if ( $scope.roleSelection.rolesTo.length === 0 ) {
                    $log.debug("NO ROLES SELECTED");
                } else {
                    $log.debug("MOVING ROLES:", $scope.roleSelection.rolesTo);
                    setRoleUnselectedStatus();
                }
            };

            $scope.unselectAll = function() {
                setAllRolesUnselectedStatus();
            };

            $scope.Submit = function () {
                // Get roles that were selected by using get_selected Filter
                var roles_to_add = get_selectedFilter($scope.roles);
                // Clear out the roles that currently are set for the user
                $scope.user.role = [];
                angular.forEach( roles_to_add, function(role){
                    $log.debug("Adding Role to user:", role.auth_role_guid);
                    $scope.user.role.push( { "auth_role_guid": role.auth_role_guid } );
                });
                var response = {'user_returned': $scope.user };
                $uibModalInstance.close(response);
            };
            $scope.Cancel = function () {
                $uibModalInstance.dismiss();
            };
        }])
;
