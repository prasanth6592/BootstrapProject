(function () {
    'use strict';
}());

angular.module('agSADCeFarms')
    .controller('RoleFilterModalController', ['$scope', '$log', '$uibModalInstance', 'roles', 'role_filterFilter', 'get_selectedFilter',
        'roleTiers', 'roleGroups', 'roleSubgroups', 'rolePartners', 'roleCounties', 'roleMunicipalities',
        function($scope, $log, $uibModalInstance, roles, role_filterFilter, get_selectedFilter,
                 roleTiers, roleGroups, roleSubgroups, rolePartners, roleCounties, roleMunicipalities ) {

            $scope.roles = roles;
            $scope.roleTiers = roleTiers;
            $scope.roleGroups = roleGroups;
            $scope.roleSubgroups = roleSubgroups;
            $scope.rolePartners = rolePartners;
            $scope.roleCounties = roleCounties;
            $scope.roleMunicipalities = roleMunicipalities;

            // Add select: false to each role to be used in selection box to initiate the role
            angular.forEach($scope.roles, function(role){
                role.selected = false;
            });

            // Define forms variable for the userMainForm ( forms.userMainForm ) so outside the scope of the accordian
            // status of the form can be checked.
            $scope.forms = {};

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

            $scope.Filter = function () {
                // Get roles that were selected by using get_selected Filter
                var roles_to_add = get_selectedFilter($scope.roles);
                var role_guid_list = [];
                angular.forEach( roles_to_add, function(role){
                    $log.debug("Adding Role to user:", role.auth_role_guid);
                    role_guid_list.push( role.auth_role_guid );
                });
                var response = {'role_guids': role_guid_list };
                $uibModalInstance.close(response);
            };
            $scope.Cancel = function () {
                $uibModalInstance.dismiss();
            };
        }])
;
