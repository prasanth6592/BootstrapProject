(function () {
    'use strict';
}());

angular.module('agSADCeFarms')
    .controller('UserAdminController', ['$scope', '$log', '$state', '$timeout', '$uibModal', '$sce',
            'userFactory', 'inviteFactory', 'activateFactory', 'deactivateFactory',
            'orgtypeFactory', 'rolesFactory', 'partnersFactory', 'tiersFactory', 'groupsFactory', 'subgroupsFactory',
            'countiesFactory', 'municipalitiesFactory', 'userSkeleton', 'uiGridConstants', 'modalService',
            'modalMessageService', 'agSupportEmail',
        function($scope, $log, $state, $timeout, $uibModal, $sce,
            userFactory, inviteFactory, activateFactory, deactivateFactory,
            orgtypeFactory, rolesFactory, partnersFactory, tiersFactory, groupsFactory, subgroupsFactory,
            countiesFactory, municipalitiesFactory, userSkeleton, uiGridConstants, modalService,
            modalMessageService, agSupportEmail ) {

            var selectedUsers = {};

            // For displaying loading icon while data is being fetched.
            $scope.loading_data = true;
            // To display role filter button
            $scope.role_filter_active = false;

            $scope.clearRoleFilter = function(){
                $scope.role_filter_active = false;
                // TODO: Restore data to unfiltered by role!!!!
                $scope.role_filter = {'filter_value': [] };
            };
            // Initialize the fiter
            $scope.role_filter = {'filter_value': [] };

            $scope.$watchCollection('role_filter', function() {
                $log.debug(">>>> FILTER CHANGED:", $scope.role_filter);

                $scope.gridApiUsers.grid.refresh();

                // this just ensures you scroll to the top of the grid when the filters change.
                $scope.gridApiUsers.core.scrollTo($scope.gridUsers.data[0], $scope.gridUsers.columnDefs[0]);
            });

            // Processes the selected users from the grid and extracts first and last names.
            // Also creates an object with auth_user_guid as a key and the selected row as the value.
            // This is needed for updating the user row after changing the data in the database.
            //
            //{ selectedAuthUserGuids: [] - list of auth_user_guid objects in form of { 'auth_user_guid': auth_user_guid }
            //    selectedUsers: {} - key is auth_user_guid, value is the actual selected row
            //    selectedNames: '' - string respresenting first and last name of selected users, comma separated
            //};
            var getUserSelection = function(){
                var userSelection = { selectedAuthUserGuids: [], selectedUsers: {}, selectedUserStatuses: [], selectedNames: '' };
                var selectedRows = $scope.gridApiUsers.selection.getSelectedRows();
                var nameList = [];
                angular.forEach( selectedRows, function(row){
                    var auth_user_guid = row.auth_user_guid;
                    // make objects out of guids.  Needed for REST CALLS
                    userSelection.selectedAuthUserGuids.push({ 'auth_user_guid': auth_user_guid });
                    var first_name = row.first_name;
                    var last_name = row.last_name;
                    userSelection.selectedUserStatuses.push(row.auth_user_status_desc);
                    nameList.push(first_name + ' ' + last_name);
                    userSelection.selectedUsers[auth_user_guid] = row;
                });
                // Convert list of names into comma delimited string for display
                userSelection.selectedNames = nameList.join(', ');
                //$log.debug("NEW SELECTED USERS:", userSelection);
                return userSelection;

            };

            var updateGridRows = function(response, userSelection){
                // get list of guids that have been updated
                angular.forEach(response.auth_user_guids, function(guid_object){
                    $log.debug("GUID TO BE UPDATED-->:", guid_object.auth_user_guid);
                    //TODO: Check status for invalid.  Error out if so.
                    $log.debug("STATUS RETURNED-->:", guid_object.status);
                    var rowToChange = userSelection.selectedUsers[guid_object.auth_user_guid];
                    $log.debug("ROW TO CHANGE:", rowToChange);
                    rowToChange.auth_user_status_desc = guid_object.user_status;
                });
                refreshGrid();
            };

            // Process the selected users and create object with names, and guid
            var getSelectedUserNamesAndGuids = function() {
                var response = { 'namelist': '', 'selected_user_guids': [] };
                var selected_users = $scope.gridApiUsers.selection.getSelectedRows();
                var nameList =[];
                angular.forEach( selected_users, function(user){
                    response.selected_user_guids.push( { 'auth_user_guid': user.auth_user_guid });
                    var first_name = user.first_name;
                    var last_name = user.last_name;
                    $log.debug("ADDING ", first_name + ' ' + last_name );
                    nameList.push(first_name + ' ' + last_name);
                });
                response.namelist = nameList.join(', ');
                return response;
            };

            // Generate a list of selected users.  This is primarily to generate the email list
            // so it should only be a list.  User will have the ability to determine how to delimit the list
            var getSelectedUserNames = function() {
                var selected_users = $scope.gridApiUsers.selection.getSelectedRows();
                var response = [];
                angular.forEach( selected_users, function(user){
                    var first_name = user.first_name;
                    var last_name = user.last_name;
                    $log.debug("ADDING ", first_name + ' ' + last_name );
                    response.push(first_name + ' ' + last_name);
                });
                return response;
            };

            var refreshGrid = function() {
                $scope.gridApiUsers.grid.notifyDataChange(uiGridConstants.dataChange.ALL);
            };

            var addRoleSubgridToData = function(gridRowOrEntity){
                gridRowOrEntity.subGridOptions = {
                    columnDefs: [
                        { name:"Role(s)", field:"auth_role_name", width:500}
                    ],
                    data: gridRowOrEntity.role
                };
            };

            var updateGridWithResponse = function( gridRow, response ){
                $log.debug("RESPONSE FROM UPDATE:",response);
                $log.debug("ROW TO UPDATE:", gridRow);
                var entityKeys = Object.keys(gridRow);
                angular.forEach( entityKeys, function(key) {
                    //$log.debug("ENTITY KEY:", key);
                    if ( ! key.startsWith('$$') ) {
                        gridRow[key] = response[key];
                    }
                });
                // Add subgrid of roles
                addRoleSubgridToData(gridRow);
                $log.debug("UPDATING GRID:");
                //Refresh grid to keep sort intact
                refreshGrid();
            };

            //Sort by last_name, first_name
            var setInitSort = function(){
                //var ln_col = $scope.gridApiUsers.grid.columns[4];
                var ln_col = $scope.gridApiUsers.grid.getColumn('last_name');
                var fn_col = $scope.gridApiUsers.grid.getColumn('first_name');
                $scope.gridApiUsers.grid.sortColumn(ln_col, uiGridConstants.ASC );
                $scope.gridApiUsers.grid.sortColumn(fn_col, uiGridConstants.ASC, true );
                //$scope.gridApiUsers.grid.notifyDataChange(uiGridConstants.dataChange.ALL);
            };

            $scope.getRoleRelatedStuff = function() {
                orgtypeFactory.getOrgtypes().query()
                    .$promise.then(
                    function(response){
                        $scope.orgtypes = response;
                        //$log.debug("ORGTYPES:", $scope.orgtypes);
                    },
                    function(response) {
                        $log.debug("Error: "+response.status + " " + response.statusText);
                    }
                );
                rolesFactory.getRoles().query()
                    .$promise.then(
                    function(response){
                        $scope.roles = response;
                        //$log.debug("ROLES:", $scope.roles);
                    },
                    function(response) {
                        $log.debug("Error: "+response.status + " " + response.statusText);
                    }
                );
                partnersFactory.getPartners().query()
                    .$promise.then(
                    function(response){
                        $scope.rolePartners = response;
                        //$log.debug("ROLE PARTNERS:", $scope.rolePartners);
                    },
                    function(response) {
                        $log.debug("Error: "+response.status + " " + response.statusText);
                    }
                );
                tiersFactory.getTiers().query()
                    .$promise.then(
                    function(response){
                        $scope.roleTiers = response;
                        //$log.debug("ROLE TIERS:", $scope.roleTiers);
                    },
                    function(response) {
                        $log.debug("Error: "+response.status + " " + response.statusText);
                    }
                );
                groupsFactory.getGroups().query()
                    .$promise.then(
                    function(response){
                        $scope.roleGroups = response;
                        //$log.debug("ROLE GROUPS:", $scope.roleGroups);
                    },
                    function(response) {
                        $log.debug("Error: "+response.status + " " + response.statusText);
                    }
                );
                subgroupsFactory.getSubgroups().query()
                    .$promise.then(
                    function(response){
                        $scope.roleSubgroups = response;
                        //$log.debug("ROLE SUBGROUPS:", $scope.roleSubgroups);
                    },
                    function(response) {
                        $log.debug("Error: "+response.status + " " + response.statusText);
                    }
                );
                countiesFactory.getCounties().query()
                    .$promise.then(
                    function(response){
                        $scope.roleCounties = response;
                        //$log.debug("ROLE COUNTIES:", $scope.roleCounties);
                    },
                    function(response) {
                        $log.debug("Error: "+response.status + " " + response.statusText);
                    }
                );
                municipalitiesFactory.getMunicipalities().query()
                    .$promise.then(
                    function(response){
                        $scope.roleMunicipalities= response;
                        //$log.debug("ROLE MUNIS:", $scope.roleMunicipalities);
                    },
                    function(response) {
                        $log.debug("Error: "+response.status + " " + response.statusText);
                    }
                );

            };


            $scope.getUserDetails = function() {
                // Display loading image while fetching data
                $scope.loading_data = true;
                userFactory.getUsers().query()
                    .$promise.then(
                    function(response){
                        $scope.userdetails = response;
                        $scope.gridUsers.data = response;
                        for(var i = 0; i < response.length; i++){
                            addRoleSubgridToData(response[i]);
                        }
                        $log.debug("gridUsers.data:",$scope.gridUsers.data );
                        setInitSort();
                        //$log.debug("AFTER GETING DETAILS:", $scope.userdetails);
                        // Turn off loading data image
                        $scope.loading_data = false;

                    },
                    function(response) {
                        // If there is an error getting user statuses from datbase,
                        // this will have an error as well.  If so, put the message in the error modal.
                        $log.debug("AFTER GETING ERROR FROM DETAILS:", $scope.userdetails);
                        $log.debug("Error: "+response.status + " " + response.statusText);
                        modalMessageService.showMessage( "Error:", response.status + " " +
                            response.statusText + '. Please contact ' + agSupportEmail);
                        // Turn off loading data image
                        $scope.loading_data = false;

                    }
                );
            };


            // Initialize role related stuff
            $scope.getRoleRelatedStuff();
            // Do Initial User load
            $scope.getUserDetails();

            // USERS
            $scope.gridUsers = {
                // Next 2 are added
                expandableRowTemplate: '../app/templates/authadmin/expandableRowTemplate.html',
                expandableRowHeight: 150,
                enablePaginationControls: false,
                paginationPageSize: 25,
                enableFiltering: true,
                saveSelection: true,
                enableRowHeaderSelection: true,
                selectionRowHeaderWidth: 50,
                multiSelect: true,
                rowHeight: 35,
                showGridFooter:true,
                columnDefs: [
                    {field: 'auth_user_guid', visible: false },
                    {field: 'salutation', visible: false },
                    {field: 'first_name', displayName: 'First Name', width: 125, enableHiding: false, pinnedLeft:false },
                    {field: 'last_name', displayName: 'Last Name', width: 125, enableHiding: false, pinnedLeft:false },
                    { field: 'role', displayName: 'Role', width: 500, visible: false,
                        filter: {
                            noTerm: true,
                            condition: function (searchTerm, roleList) {
                                if ($scope.role_filter.filter_value.length === 0) {return true;}
                                for ( var filter_count = 0; filter_count < $scope.role_filter.filter_value.length; filter_count++ ) {
                                    var test_role = $scope.role_filter.filter_value[filter_count];
                                    $log.debug("TESTING FILTER ROLE", test_role, "AGAINST ROLE VALUE");
                                    for ( var role_count = 0; role_count < roleList.length; role_count++ ) {
                                        var user_role = roleList[role_count].auth_role_guid;
                                        $log.debug("USER ROLE MATCHES TEST ROLE");
                                        if ( test_role === user_role ) {
                                            $log.debug("MATCH:");
                                            return true;
                                        }
                                    }
                                }
                                return false;
                            }
                        }
                    },
                    {field: 'title', displayName: 'Title', width: 75, enableHiding: false, enablePinning:false},
                    {field: 'email_primary', displayName: 'Email', width: 250, enableHiding: false, enablePinning:false},
                    {field: 'phone_primary', displayName: 'Phone', width: 125, enableHiding: false, enableFiltering: false,
                        enablePinning:false, cellTemplate: "<div>{{grid.appScope.mapValue(row)}}</div>"},
                    {field: 'phone_primary_ext', displayName: 'Ext.', width: 75, enableHiding: false, enableFiltering: false, enablePinning:false},
                    {field: 'auth_user_status_desc', displayName: 'Status', width: 170, enableHiding: false, enablePinning:false,
                        filter: {
                            //term: '1',
                            type: uiGridConstants.filter.SELECT,
                            selectOptions: [
                                {value: 'Authorized', label: 'Authorized'},
                                {value: 'Invited', label: 'Invited'},
                                {value: 'Pre-Registered', label: 'Pre-Registered'},
                                {value: 'Registered', label: 'Registered'},
                                {value: 'Created', label: 'Created'},
                                {value: 'Deactivated', label: 'Deactivated'}
                            ]
                        }
                    },
                    {field: 'organization', displayName: 'Organization', width: 300, enableHiding: false, enablePinning:false},
                    {field: 'address', visible: false},
                    {field: 'city', visible: false},
                    {field: 'state', visible: false},
                    {field: 'zip', visible: false},
                    {field: 'zip4', visible: false},
                    {field: 'email_alternate', visible: false},
                    {field: 'phone_alternate',  visible: false},
                    {field: 'phone_alternate_ext',  visible: false},
                    {field: 'contact_type_desc', visible: false},
                    {field: 'person_type_desc', visible: false}

                ],
                appScopeProvider: {
                    mapValue: function(row) {
                        var phone =  row.entity.phone_primary.match(/(\d{3})(\d{3})(\d{4})/);
                        return "(" + phone[1] + ") " + phone[2] + "-" + phone[3];
                    }
                }
            };

            // Register the grid for API calls like clearSelectedRows() and getSelectedRows()
            $scope.gridUsers.onRegisterApi = function(gridApiUsers){
                $scope.gridApiUsers = gridApiUsers;
            };

            $scope.clearUserSelection = function(){
                $scope.gridApiUsers.selection.clearSelectedRows();
                $scope.workflowDocNotSelected = true;
                selectedUsers = {};
            };

            $scope.addUser = function() {
                var selectedCount = $scope.gridApiUsers.selection.getSelectedCount();
                if (selectedCount >= 1) {
                    errorMessageService.showErrorMessage("No users should be selected when adding a new user.  Clear the selected rows.");
                } else {
                    $log.debug("Adding USER:");
                    // Create an empty user object
                    $scope.user_to_add = userSkeleton.getUser();

                    var modalInstance = $uibModal.open({
                        templateUrl: 'templates/authadmin/userInput.html',
                        controller: 'UserModalController',
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {
                            roles: function () {
                                return $scope.roles;
                            },
                            roleTiers: function () {
                                return $scope.roleTiers;
                            },
                            roleGroups: function () {
                                return $scope.roleGroups;
                            },
                            roleSubgroups: function () {
                                return $scope.roleSubgroups;
                            },
                            rolePartners: function () {
                                return $scope.rolePartners;
                            },
                            roleCounties: function () {
                                return $scope.roleCounties;
                            },
                            roleMunicipalities: function () {
                                return $scope.roleMunicipalities;
                            },
                            orgtypes: function () {
                                return $scope.orgtypes;
                            },
                            user: function () {
                                return $scope.user_to_add;
                            }
                        }

                    });
                    modalInstance.result.then(function (modalResponse) {
                        $log.debug("USER EDIT MODAL RESPONSE:", modalResponse);
                        // TODO: Process the value for 'action' and call appropriate function
                        var user_returned = modalResponse.user_returned;
                        $log.debug("ACTION TO DO:", user_returned);
                        $scope.doAddUser(user_returned);
                        $log.debug("After doAddUser");
                    }, function () {
                        $log.debug("CANCELED USER EDIT MODAL USER:",$scope.user_returned);
                    });

                }
            };

            $scope.doAddUser = function(user) {
                // Save currently selected rows
                $log.debug("Inside doAddUser:");
                $log.debug("POST BODY TO SEND:", user);
                userFactory.getUsers().save( user )
                    .$promise.then(
                    function(response){
                        $log.debug("RESPONSE FROM doAddUser", response);
                        // Add user to grid
                        $scope.gridUsers.data.push(response);
                        // Add roles to sub grid
                        refreshGrid();

                    },
                    function(response) {
                        //$log.debug("AFTER GETING ERROR FROM DETAILS:", $scope.userdetails);
                        $log.debug("ERROR ADDING USER:", response);
                        if ( response.data === '{ "error": "Bad Request UE" }' ) {
                            modalMessageService.showMessage( "Error:", "A user with that email address already exists. Please try again.");
                        } else {
                            modalMessageService.showMessage( "Error:", "An error occurred. ");
                        }
                        $log.debug("Error: "+response.status + " " + response.statusText);
                        //$scope.message = "Error: "+response.status + " " + response.statusText;
                    }
                );
            };

            $scope.updateUser = function() {
                var selectedCount = $scope.gridApiUsers.selection.getSelectedCount();
                $log.debug("SELECTED COUNT:", selectedCount);
                if ( selectedCount === 0 ) {
                    modalMessageService.showMessage( "Error:", "No users were selected.  Please select a user.");
                } else if ( selectedCount > 1 ) {
                    modalMessageService.showMessage( "Error:", "More than one user was selected.  Please select only one user.");
                } else {
                    $scope.currentlySelectedUsers = getUserSelection();
                    // Extract the user info from the selected user. It's the value of the single selectedUser
                    // in the currentlySelectedUsers object.
                    $scope.user_to_update = Object.values($scope.currentlySelectedUsers.selectedUsers)[0];
                    $log.debug("USER SELECTED FOR UPDATE:", $scope.currentlySelectedUsers);
                    //var user_guid = Object.keys(selectedUsers)[0];
                    //$scope.user_to_update = selectedUsers[user_guid].entity;
                    $log.debug("Updating USER:", $scope.user_to_update);
                    var modalInstance = $uibModal.open({
                        templateUrl: 'templates/authadmin/userInput.html',
                        controller: 'UserModalController',
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {
                            roles: function () {
                                return $scope.roles;
                            },
                            roleTiers: function () {
                                return $scope.roleTiers;
                            },
                            roleGroups: function () {
                                return $scope.roleGroups;
                            },
                            roleSubgroups: function () {
                                return $scope.roleSubgroups;
                            },
                            rolePartners: function () {
                                return $scope.rolePartners;
                            },
                            roleCounties: function () {
                                return $scope.roleCounties;
                            },
                            roleMunicipalities: function () {
                                return $scope.roleMunicipalities;
                            },
                            orgtypes: function () {
                                return $scope.orgtypes;
                            },
                            user: function () {
                                return $scope.user_to_update;
                            }

                        }

                    });
                    modalInstance.result.then(function (modalResponse) {
                        $log.debug("USER EDIT MODAL RESPONSE:", modalResponse);
                        // TODO: Process the value for 'action' and call appropriate function
                        var user_returned = modalResponse.user_returned;
                        $log.debug("ACTION TO DO:", user_returned);
                        $scope.doUpdateUser(user_returned);
                        $log.debug("AFTER doUpdateUser");
                    }, function () {
                        $log.debug("CANCELED USER EDIT MODAL USER:");
                    });


                }

            };

            $scope.doUpdateUser = function(user) {
                // Save currently selected rows
                $log.debug("Inside doUpdateUser:");
                $log.debug("POST BODY TO SEND:", user);
                $scope.loading_data = true;
                userFactory.getUsers().update( {auth_user_guid:user.auth_user_guid}, user )
                    .$promise.then(
                    function(response){
                        $log.debug("RESPONSE FROM doUpdateUser", response);
                        // Update field on grid
                        var rowToChange = selectedUsers[user.auth_user_guid];
                        updateGridWithResponse( $scope.user_to_update, response);
                        $scope.clearUserSelection();
                        $scope.loading_data = false;

                    },
                    function(response) {
                        //$log.debug("AFTER GETING ERROR FROM DETAILS:", $scope.userdetails);
                        $log.debug("Error: "+response.status + " " + response.statusText);
                        //$scope.message = "Error: "+response.status + " " + response.statusText;
                        $scope.loading_data = false;
                    }
                );
            };

            $scope.filterUsersByRole = function() {
                var modalInstance = $uibModal.open({
                    templateUrl: 'templates/authadmin/filterUsersByRole.html',
                    controller: 'RoleFilterModalController',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        roles: function () {
                            return $scope.roles;
                        },
                        roleTiers: function () {
                            return $scope.roleTiers;
                        },
                        roleGroups: function () {
                            return $scope.roleGroups;
                        },
                        roleSubgroups: function () {
                            return $scope.roleSubgroups;
                        },
                        rolePartners: function () {
                            return $scope.rolePartners;
                        },
                        roleCounties: function () {
                            return $scope.roleCounties;
                        },
                        roleMunicipalities: function () {
                            return $scope.roleMunicipalities;
                        }
                    }

                });
                modalInstance.result.then(function (modalResponse) {
                    $log.debug("ROLE FILTER MODAL RESPONSE:", modalResponse);
                    $log.debug("ROLE GUIDS TO USE FOR FILTERING:", modalResponse.role_guids);
                    // Enable the role filter button only if there is one role to filter by
                    if (modalResponse.role_guids.length > 0) {
                        $scope.role_filter.filter_value = modalResponse.role_guids;
                        $scope.role_filter_active = true;
                    }
                    // Here's where the filtering of users would occur
                }, function () {
                    $log.debug("CANCELED ROLE FILTER MODAL:");
                });

            };

            $scope.inviteUser = function() {
                $log.debug("inviting USER");
                var selectedCount = $scope.gridApiUsers.selection.getSelectedCount();
                $log.debug("SELECTED COUNT:", selectedCount);
                if ( selectedCount === 0 ) {
                    modalMessageService.showMessage( "Error:", "No users were selected.  Please select one or more users.");
                } else {
                    $scope.currentlySelectedUsers = getUserSelection();
                    $log.debug("SELECTED USERS FOR INVITE:", $scope.currentlySelectedUsers.selectedUsers);
                    // If status of any user is 'Deactivated' or 'Registered', show error message that
                    // those users cannot be invited.
                    var userStatus = $scope.currentlySelectedUsers.selectedUserStatuses;
                    if (userStatus.indexOf('Deactivated') != -1 || userStatus.indexOf('Registered') != -1) {
                        modalMessageService.showMessage( "Error:", "Users with status of 'Deactivated' or 'Registered' " +
                            "cannot be invited. Please revise your selection.");
                    } else {
                        $scope.displayAndConfirm("invite", "Invite the following users?", $scope.currentlySelectedUsers.selectedNames);
                    }
                }
            };

            $scope.doInviteUsers = function() {
                $log.debug("POST BODY TO SEND:", { 'auth_user_guids': $scope.currentlySelectedUsers.selectedAuthUserGuids });
                $scope.loading_data = true;
                inviteFactory.doInvite().save({ 'auth_user_guids': $scope.currentlySelectedUsers.selectedAuthUserGuids })
                    .$promise.then(
                    function(response){
                        // Response is in the form of { 'auth_user_guids':
                        // [
                        //  { 'auth_user_guid': xxxx, 'status': xxxx, 'user_status': 'Created' },
                        //  {...}
                        // ]
                        $log.debug("RESPONSE FROM doInvitePost", response);
                        updateGridRows(response, $scope.currentlySelectedUsers);
                        $log.debug("AFTER UPDATE GRID ROWS");
                        $scope.loading_data = false;
                        $scope.clearUserSelection();
                    },
                    function(response) {
                        //$log.debug("AFTER GETING ERROR FROM DETAILS:", $scope.userdetails);
                        $log.debug("Error: "+response.status + " " + response.statusText);
                        modalMessageService.showMessage( "Error:", response.status + " " +
                            response.statusText + '. Please contact ' + agSupportEmail);
                        $scope.loading_data = false;
                        $scope.clearUserSelection();
                    }
                );
            };

            $scope.activateUser = function() {
                $log.debug("activating USER");
                var selectedCount = $scope.gridApiUsers.selection.getSelectedCount();
                if ( selectedCount === 0 ) {
                    modalMessageService.showMessage( "Error:", "No users were selected.  Please select one or more users.");
                } else {
                    $scope.currentlySelectedUsers = getUserSelection();
                    $log.debug("SELECTED USERS FOR ACTIVATE:", $scope.currentlySelectedUsers);
                    // If status of any user is not 'Deactivated', show error message that those users cannot be activated.
                    var userStatus = $scope.currentlySelectedUsers.selectedUserStatuses;
                    var all_deactivated = true;
                    angular.forEach( userStatus, function(status){
                        if ( status != 'Deactivated' ){
                            all_deactivated = false;
                        }
                    });
                    if ( all_deactivated ) {
                        $scope.displayAndConfirm( "activate", "Activate the following users?", $scope.currentlySelectedUsers.selectedNames);
                    } else {
                        modalMessageService.showMessage( "Error:", "Users with status other than 'Deactivated' " +
                            "cannot be activated. Please revise your selection.");
                    }
                }
            };

            $scope.doActivateUsers = function() {
                $log.debug("Inside doActivateUsers:");
                $log.debug("POST BODY TO SEND:", { 'auth_user_guids': $scope.currentlySelectedUsers.selectedAuthUserGuids });
                $scope.loading_data = true;
                activateFactory.doActivate().save({ 'auth_user_guids': $scope.currentlySelectedUsers.selectedAuthUserGuids })
                    .$promise.then(
                    function(response){
                        // Response is in the form of { 'auth_user_guids':
                        // [
                        //  { 'auth_user_guid': xxxx, 'status': xxxx, 'user_status': 'Created' },
                        //  {...}
                        // ]
                        $log.debug("RESPONSE FROM doActivatePost", response);
                        updateGridRows(response, $scope.currentlySelectedUsers);
                        $scope.loading_data = false;
                        $scope.clearUserSelection();
                    },
                    function(response) {
                        $log.debug("Error: "+response.status + " " + response.statusText);
                        modalMessageService.showMessage( "Error:", "An error occurred while activating the user(s). Please contact " + agSupportEmail +
                            " and mention this message.");
                        $scope.loading_data = false;
                        $scope.clearUserSelection();
                    }
                );
            };

            $scope.deactivateUser = function() {
                $log.debug("deactivating USER");
                var selectedCount = $scope.gridApiUsers.selection.getSelectedCount();
                if ( selectedCount === 0 ) {
                    modalMessageService.showMessage( "Error:", "No users were selected.  Please select one or more users.");
                } else {
                    $scope.currentlySelectedUsers = getUserSelection();
                    $log.debug("SELECTED USERS FOR DEACTIVATE:", $scope.currentlySelectedUsers);
                    $scope.displayAndConfirm( "deactivate", "Deactivate the following users?", $scope.currentlySelectedUsers.selectedNames);
                }
            };

            $scope.doDeactivateUsers = function() {
                //$log.debug("POST BODY TO SEND:", { 'auth_user_guids': $scope.currentlySelectedUsers.selectedAuthUserGuids });
                $scope.loading_data = true;
                deactivateFactory.doDeactivate().save({ 'auth_user_guids': $scope.currentlySelectedUsers.selectedAuthUserGuids })
                    .$promise.then(
                    function(response){
                        // Response is in the form of { 'auth_user_guids':
                        // [
                        //  { 'auth_user_guid': xxxx, 'status': xxxx, 'user_status': 'Created' },
                        //  {...}
                        // ]
                        $log.debug("RESPONSE FROM doDeactivatePost", response);
                        updateGridRows(response, $scope.currentlySelectedUsers);
                        $scope.loading_data = false;
                        $scope.clearUserSelection();
                    },
                    function(response) {
                        //$log.debug("AFTER GETING ERROR FROM DETAILS:", $scope.userdetails);
                        $log.debug("Error: "+response.status + " " + response.statusText);
                        modalMessageService.showMessage( "Error:", "An error occurred while deactivating the user(s). Please contact " + agSupportEmail +
                            " and mention this message.");
                        $scope.loading_data = false;
                        $scope.clearUserSelection();
                    }
                );
            };

            $scope.generateEmailList = function() {
                $log.debug("FOO generating email for  USER");
                //var selectedCount = Object.keys(selectedUsers).length;
                var selectedCount = $scope.gridApiUsers.selection.getSelectedCount();
                $log.debug("SELECTED ROWS FROM API:", $scope.gridApiUsers.selection.getSelectedRows());
                $log.debug("SELECTED COUNT:", selectedCount);
                if ( selectedCount === 0 ) {
                    modalMessageService.showMessage( "Error:", "No users were selected.  Please select one or more users.");
                } else {
                    var email_users = getSelectedUserNames();
                    $log.debug("SELECTED Users before display:", email_users);
                    $log.debug("ALL SELECTED USERS:", selectedUsers);
                    $scope.displayEmailList( email_users);
                }
            };


            $scope.displayEmailList = function ( users ) {
                $log.debug("Users To Process:", users);
                var modalInstance = $uibModal.open({
                    templateUrl: 'templates/authadmin/emailList.html',
                    controller: 'EmailActionController',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        users: function () {
                            return users;
                        }
                    }
                });

                modalInstance.result.then(function (modalResponse) {
                    $scope.clearUserSelection();
                }, function () {});

            };
            $scope.displayAndConfirm = function ( action, confirmationMessage, users ) {
                $log.debug("ConfirmationType:", confirmationMessage);
                $log.debug("Users To Process:", users);
                $log.debug("ActionToDo:", action);
                var modalOptions = {
                    closeButtonText: 'No',
                    actionButtonText: 'Yes',
                    headerText: confirmationMessage,
                    bodyText: users
                };
                modalService.showModal({}, modalOptions, { 'action': action})
                    .then(function(response) {
                        var action = response.action;
                        $log.debug("Action To Do:", action);
                            switch(action){
                                case 'invite':
                                    $log.debug("INVITING USER>>>");
                                    $scope.doInviteUsers();
                                    break;
                                case 'activate':
                                    $log.debug("ACTIVATING USER>>>");
                                    $scope.doActivateUsers();
                                    break;
                                case 'deactivate':
                                    $log.debug("DEACTIVATING USER>>>");
                                    $scope.doDeactivateUsers();
                                    break;
                                default:
                                    $log.debug("ERROR!!! INVALID ACTION");
                            }
                    },
                        // Ignore the cancel button
                        function(){});
            };

        }])
;
