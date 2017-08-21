(function () {
    'use strict';
}());

angular.module('agSADCeFarms')
    .constant('errorImageURL', '../app/images/error-404.png')
    .controller('FarmController', ['$scope', '$uibModal', '$state', '$log',
        function($scope,$uibModal,$state,$log,modalService,modalMessageService) {

        if($state.params.farm_guid == null || typeof($state.params.farm_guid) == undefined || $state.params.farm_guid == ''){
            $state.go('app.home');
        }
        //$scope.farm_guid = '43B6AC2A-1189-E00F-E053-0A54960A8401';

    }]);

//FarmInfo
angular.module('agSADCeFarms')
    .controller('FarmInfoController', ['$scope','$uibModal','GetfarmInfo','DeleteFarmTags',
        'GetFarmTags','$log','modalMessageService','$stateParams','errorImageURL',
        function($scope, $uibModal,GetfarmInfo,DeleteFarmTags,GetFarmTags,$log,modalMessageService,
          $stateParams, errorImageURL){
        var FICtrl = this;
        FICtrl.showErrorMessage = false;
        FICtrl.errorImageURL = errorImageURL;
         FICtrl.getFarmId = function(){
            return $stateParams.farm_guid
         }
        FICtrl.farmInfo = GetfarmInfo.getFarmInfo(FICtrl.getFarmId()).get()
                  .$promise.then(
                    function(response){
                       FICtrl.farmInfo =response;
                    },
                    function(response) {
                    $log.debug("ERROR GETTING FUNDDETAILS:", response);
                         if ( response.data === '{ "error": "Bad Request UE" }' ) {
                             toastr.error('Error occured while fetching farminfo')
                         } else {
                             toastr.error("Please enter a valid farm guid ");
                             FICtrl.showErrorMessage = true;
                         }
                         $log.debug("Error: "+response.status + " " + response.statusText);

                    }

                 );


        //Tages edit mode
        FICtrl.isTagsInEditMode = false;

        FICtrl.putTagsInEditMode = function(){
            FICtrl.isTagsInEditMode = true;
        };

        FICtrl.putTagsToNormalMode = function(){
            FICtrl.isTagsInEditMode = false;
        };

        FICtrl.deleteTag = function(index){
            var deletefarm = {
                         "farm_guid": FICtrl.farmInfo.farm_tags[index].farm_guid,
                         "farm_tag_desc":  FICtrl.farmInfo.farm_tags[index].farm_tag_desc};
           DeleteFarmTags.deleteFarmTags(deletefarm)
                            .then(
                               function(response){
                                  console.log(response);
                                  console.log('farm Tag deleted');
                                   FICtrl.refreshFarmTags();
                                   toastr.success('Tag deleted successfully');
                               },
                               function(response) {
                                    $log.debug("ERROR Delete  tag:", response);
                                    toastr.error('Error occured while deleting tag');
                                    $log.debug("Error: "+response.status + " " + response.statusText);
                                }
                          );
        };

        FICtrl.refreshFarmTags = function(){
            GetFarmTags.getFarmTags(FICtrl.farmInfo.farm_guid)
                  .then(
                    function(response){
                       FICtrl.farmInfo.farm_tags =response;
                    },
                    function(response) {
                    $log.debug("ERROR GETTING FUNDDETAILS:", response);
                         if ( response.data === '{ "error": "Bad Request UE" }' ) {
                             modalMessageService.showMessage( "Error:", "Check the service");
                         } else {
                             modalMessageService.showMessage( "Error:", "An error occurred. ");
                         }
                         $log.debug("Error: "+response.status + " " + response.statusText);

                    }

                 );
        };

        FICtrl.createNewTag = function(){
        var farmID = FICtrl.farmInfo.farm_guid;
            var modalInstance = $uibModal.open({
              animation: true,
                size: 'sm',
                static : true,
              templateUrl: 'views/farm/add_new_tag_modal.html',
                resolve:{
                farm_guid : function(){
                  return FICtrl.farmInfo.farm_guid
                }
              },
              controller: ['$scope','$uibModalInstance','AddNewTag','getTagTypes','farm_guid',
                  function($scope, $uibModalInstance, AddNewTag,getTagTypes,farm_guid){
                  getTagTypes.getTagTypes().then(function(response){
                      $scope.tagTypes = response.data;
                    }, function(response){
                      toastr.warning('Error while getting TagTypes');
                    });
                  $scope.ok= function(){
                      var newTag = {
                          "farm_guid": farmID,
                          "farm_tag_desc": $scope.tagDescription.farm_tag_desc};
                    AddNewTag.addNewTag().save(newTag)
                            .$promise.then(
                               function(response){
                                  $uibModalInstance.close();
                                  toastr.success('Tag added successfully')
                               },
                               function(response) {
                                    $log.debug("ERROR ADDING TODOITEM:", response);
                                    toastr.error('Error occured while adding tag')
                                    $log.debug("Error: "+response.status + " " + response.statusText);
                                    $uibModalInstance.close();
                                }
                          );

                };
                $scope.cancel= function(){
                    $uibModalInstance.dismiss();
                }
              }]

            });

            modalInstance.result.then(function () {
              FICtrl.refreshFarmTags();
            }, function () {

            });
        };
    }])


//FarmContacts
.controller('FarmContactsController', ['$scope','$uibModal','FarmContactsFactory','modalMessageService','$stateParams',
  '$log','errorImageURL',
 function($scope, $uibModal, FCF,modalMessageService,$stateParams, $log,errorImageURL ){
  var FCC = this;
  var onLoad = function(){
    FCC.showErrorMessage = false;
    FCC.errorImageURL = errorImageURL
    FCC.refreshContacts();
    var testing = $stateParams.farm_guid;
  };

  FCC.getFarmId = function(){
    return $stateParams.farm_guid
  }

  FCC.refreshContacts = function(){
    FCF.getContacts(FCC.getFarmId()).then(function(response){
      FCC.contacts = response.data;
    }, function fail(response){
      $log.debug("ERROR GETTING FUNDDETAILS:", response);
        if ( response.data === '{ "error": "Bad Request UE" }' ) {
           toastr.error('Error occured while fetching farm contacts.');
        } else {
           toastr.error( "EPlease enter a valid farmid ");
           FCC.showErrorMessage = true;
        }
        $log.debug("Error: "+response.status + " " + response.statusText);
    });
  };

  FCC.onContactRowClick = function(index){
      FCC.selectedContact = FCC.contacts[index];
  }

  FCC.addNewContact = function(){
    var modalInstance = $uibModal.open({
      animation: true,
      size: 'md',
      static : true,
      templateUrl: 'views/farm/farmcontacts/mdl_add_new_contact.html',
      controller: 'AddContactModalController',
      controllerAs : 'ACMC'
    });

    modalInstance.result.then(function () {
      FCC.refreshContacts();
    }, function () {

    });
  };

  FCC.deleteContact = function(index){
    FCF.deleteContact(FCC.selectedContact).then(function success(response){
      FCC.refreshContacts();
      toastr.success('contact Deleted successfully');
    }, function fail(response){
        toastr.error('Error occured while deleting');
      $log.debug("ERROR GETTING FUNDDETAILS:", response);
        if ( response.data === '{ "error": "Bad Request UE" }' ) {
//           modalMessageService.showMessage( "Error:", "Check the service");
        } else {
//           modalMessageService.showMessage( "Error:", "An error occurred. ");
        }
        $log.debug("Error: "+response.status + " " + response.statusText);
    })
  };

  onLoad();
}])

.controller('AddContactModalController',['$scope','$uibModal','$uibModalInstance','$log',
  'FarmContactsFactory','modalMessageService',
  function($scope,$uibModal,$uibModalInstance, $log, FCF, modalMessageService){
  var ACMC = this;

  var onLoad = function(){

    FCF.getContactTypes().then(function(response){
      ACMC.contactTypes = response.data;
      ACMC.gridOptions.data = response.data;
    }, function fail(response){
      $log.debug("ERROR GETTING FUNDDETAILS:", response);
        if ( response.data === '{ "error": "Bad Request UE" }' ) {
           modalMessageService.showMessage( "Error:", "Check the service");
        } else {
           modalMessageService.showMessage( "Error:", "An error occurred. ");
        }
        $log.debug("Error: "+response.status + " " + response.statusText);
    });

    //Grid Config
    ACMC.columnDefs = [
      {field: 'auth_user_guid', visible: false }
      ,{field: 'salutation', visible: false }

      ,{ field: 'first_name', displayName: 'First Name', enableHiding: false, pinnedLeft:false }
      ,{ field: 'last_name', displayName: 'Last Name',  enableHiding: false, pinnedLeft:false }

      ,{ field: 'role', displayName: 'Role', width: 500, visible: false}

      ,{ field: 'title', displayName: 'title',   }
      ,{ field: 'organization', displayName: 'Organization',  }
      ,{ field: 'email_primary', displayName: 'Email',  }
      ,{ field: 'phone_primary', displayName: 'Phone', width: 90 }

      ,{field: 'address', visible: false}
      ,{field: 'city', visible: false}
      ,{field: 'state', visible: false}
      ,{field: 'zip', visible: false}
      ,{field: 'zip4', visible: false}
      ,{field: 'email_alternate', visible: false}
      ,{field: 'phone_alternate',  visible: false}
      ,{field: 'phone_alternate_ext',  visible: false}
      ,{field: 'contact_type_desc', visible: false}
      ,{field: 'person_type_desc', visible: false}
    ];

    ACMC.gridOptions = {
        enablePaginationControls: false
        ,paginationPageSize: 25
        ,enableFiltering: true
        ,saveSelection: true
        ,enableRowHeaderSelection: true
        ,selectionRowHeaderWidth: 50
        ,multiSelect: false
        ,rowHeight: 35
        ,showGridFooter:true
        ,columnDefs : ACMC.columnDefs
    };

    ACMC.gridOptions.onRegisterApi = function(gridApiUsers){
      ACMC.gridApiUsers = gridApiUsers;
  };

  ACMC.refreshUsers();
  };


  ACMC.refreshUsers = function(){
    FCF.getUsers().then(function(response){
      ACMC.gridOptions.data = response.data
    }, function fail(response){
      $log.debug("ERROR GETTING FUNDDETAILS:", response);
        if ( response.data === '{ "error": "Bad Request UE" }' ) {
           modalMessageService.showMessage( "Error:", "Check the service");
        } else {
           modalMessageService.showMessage( "Error:", "An error occurred. ");
        }
        $log.debug("Error: "+response.status + " " + response.statusText);
    });
  };

  ACMC.getFarmID = function(){
    return "43B6AC2A-1189-E00F-E053-0A54960A8401"
  }

  ACMC.addContact = function(){
    if(ACMC.gridApiUsers.selection.getSelectedRows().length <1 ){
      modalMessageService.showMessage( "Error:", "Select atleast one user to proceed");
    }else{
      var contactDetails = {};
      contactDetails.auth_user_guid = ACMC.gridApiUsers.selection.getSelectedRows()[0].auth_user_guid;
      contactDetails.contact_type_desc =ACMC.contactType.contact_type_desc
      contactDetails.farm_guid = ACMC.getFarmID();
      FCF.addNewContact(contactDetails).then(function(response){
        $uibModalInstance.close();
      }, function fail(response){
        $log.debug("ERROR GETTING FUNDDETAILS:", response);
          if ( response.data === '{ "error": "Bad Request UE" }' ) {
             modalMessageService.showMessage( "Error:", "Check the service");
          } else {
             modalMessageService.showMessage( "Error:", "An error occurred. ");
          }
          $log.debug("Error: "+response.status + " " + response.statusText);
          $uibModalInstance.close();
      });
    }
  };

  ACMC.close = function(){
    $uibModalInstance.dismiss();
  }

  onLoad();
}])

.directive('dirAddUser',[ 'orgtypeFactory', 'rolesFactory', 'partnersFactory', 'tiersFactory',
 'groupsFactory', 'subgroupsFactory','countiesFactory', 'municipalitiesFactory', 'userSkeleton',
 '$uibModal','userFactory','$log','modalMessageService', function( orgtypeFactory, rolesFactory, partnersFactory, tiersFactory,
 groupsFactory, subgroupsFactory,countiesFactory, municipalitiesFactory, userSkeleton,
 $uibModal, userFactory, $log, modalMessageService){
  return{
    restrict: 'A'
    ,scope : {
      postAdditionCallback : '&postAdditionCallback'
    }
    ,link : function($scope, elem){
      var getRoleRelatedStuff = function() {
                orgtypeFactory.getOrgtypes().query()
                    .$promise.then(
                    function(response){
                        $scope.orgtypes = response;
                    },
                    function(response) {
                        $log.debug("Error: "+response.status + " " + response.statusText);
                    }
                );
                rolesFactory.getRoles().query()
                    .$promise.then(
                    function(response){
                        $scope.roles = response;
                    },
                    function(response) {
                        $log.debug("Error: "+response.status + " " + response.statusText);
                    }
                );
                partnersFactory.getPartners().query()
                    .$promise.then(
                    function(response){
                        $scope.rolePartners = response;
                    },
                    function(response) {
                        $log.debug("Error: "+response.status + " " + response.statusText);
                    }
                );
                tiersFactory.getTiers().query()
                    .$promise.then(
                    function(response){
                        $scope.roleTiers = response;
                    },
                    function(response) {
                        $log.debug("Error: "+response.status + " " + response.statusText);
                    }
                );
                groupsFactory.getGroups().query()
                    .$promise.then(
                    function(response){
                        $scope.roleGroups = response;
                    },
                    function(response) {
                        $log.debug("Error: "+response.status + " " + response.statusText);
                    }
                );
                subgroupsFactory.getSubgroups().query()
                    .$promise.then(
                    function(response){
                        $scope.roleSubgroups = response;
                    },
                    function(response) {
                        $log.debug("Error: "+response.status + " " + response.statusText);
                    }
                );
                countiesFactory.getCounties().query()
                    .$promise.then(
                    function(response){
                        $scope.roleCounties = response;
                    },
                    function(response) {
                        $log.debug("Error: "+response.status + " " + response.statusText);
                    }
                );
                municipalitiesFactory.getMunicipalities().query()
                    .$promise.then(
                    function(response){
                        $scope.roleMunicipalities= response;
                    },
                    function(response) {
                        $log.debug("Error: "+response.status + " " + response.statusText);
                    }
                );
      };

      var openModalPopup = function(){
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
                        var user_returned = modalResponse.user_returned;
                        $log.debug("ACTION TO DO:", user_returned);
                        $scope.doAddUser(user_returned);
                        $log.debug("After doAddUser");
                    }, function () {
                        $log.debug("CANCELED USER EDIT MODAL USER:",$scope.user_returned);
                    });
      }

      $scope.doAddUser = function(user) {
                // Save currently selected rows
                $log.debug("Inside doAddUser:");
                $log.debug("POST BODY TO SEND:", user);
                userFactory.getUsers().save( user )
                    .$promise.then(
                    function(response){
                        $log.debug("RESPONSE FROM doAddUser", response);
                        // call post user add function
                        $scope.postAdditionCallback();
                    },
                    function(response) {
                        //$log.debug("AFTER GETING ERROR FROM DETAILS:", $scope.userdetails);
                        $log.debug("ERROR ADDING USER:", response);
                        if ( response.data === '{ "error": "Bad Request UE" }' ) {
                            modalMessageService.showMessage( "Error:", "A user with that email address already exists. " +
                                "Please try again.");
                        } else {
                            modalMessageService.showMessage( "Error:", "An error occurred. ");
                        }
                        $log.debug("Error: "+response.status + " " + response.statusText);
                        //$scope.message = "Error: "+response.status + " " + response.statusText;
                    }
                );
            };

      elem.on('click', function(){
        $scope.user_to_add = userSkeleton.getUser();
        openModalPopup();
        $scope.postAdditionCallback();
      });

      getRoleRelatedStuff();

    }
  }

}])

//Farm Applications
.controller('FarmApplicationsCtrl', ['$scope', 'FarmApplicationsFactory','$stateParams','$log',
  'errorImageURL','$state',
 function($scope, FAF, $stateParams,$log, errorImageURL, $state){
  var FAC = this;

  var onLoad = function(){
    FAC.showErrorMessage = false;
    FAC.errorImageURL = errorImageURL;

     //Grid Config
    FAC.columnDefs = [
      {field: 'application_guid', visible: false }
      ,{field: 'application_id',displayName: 'Application ID', visible: true,  width: 140}

      ,{ field: 'application_type', displayName: 'Application Type', enableHiding: false, pinnedLeft:false }
      ,{ field: 'application_category', displayName: 'Application Category',  enableHiding: false, pinnedLeft:false }

      ,{ field: 'application_phase', displayName: 'Application phase', width: 140}

      ,{ field: 'application_status', displayName: 'Application Status', width: 150  }
      ,{ field: 'application_date', displayName: 'Application Date'  }
      ,{ field: 'partner_name', displayName: 'Partner Name',  }
      ,{ field: 'program_type', displayName: 'Program type', width: 140 }

      ,{field: 'last_edited_date',displayName:'Last Edited Date', width: 135}

    ];

    FAC.gridOptions = {
        enablePaginationControls: false
        ,paginationPageSize: 25
        ,enableFiltering: true
        ,saveSelection: true
        ,enableRowHeaderSelection: true
        ,selectionRowHeaderWidth: 50
        ,multiSelect: false
        ,rowHeight: 35
        ,showGridFooter:true
        ,columnDefs : FAC.columnDefs
    };

    FAC.gridOptions.onRegisterApi = function(gridApiApplications){
      FAC.gridApiApplications = gridApiApplications;
    };

    FAC.refreshApplications()
  };


  FAC.getFarmId = function(){
    return $stateParams.farm_guid
  };

  FAC.refreshApplications = function(){
    FAF.getApplications(FAC.getFarmId()).then(function(response){
      FAC.applications = response.data;
      FAC.gridOptions.data = response.data;
    },function(response){
      $log.debug("ERROR GETTING Applications details:", response);
        if ( response.data === '{ "error": "Bad Request UE" }' ) {
           toastr.error('Error occured while fetching farm contacts.');
        } else {
           toastr.error( "Please enter a valid farmid ");
           FAC.showErrorMessage = true;
        }
        $log.debug("Error: "+response.status + " " + response.statusText);
    });
  };

  FAC.viewAppliction = function(){
    if(FAC.gridApiApplications.selection.getSelectedRows().length <1){
      toastr.warning('Select atleast one appliction row to view');
    }else{
      var guid = FAC.gridApiApplications.selection.getSelectedRows()[0].application_guid;
      $state.go('app.application.appinfo', {GUID : guid});
    }
  };


  onLoad();

}])

//Notes and documents
.controller('FarmNotesAndDocumentsCtrl', ['$scope', 'FarmNotesAndDocumentsFactory', '$stateParams', '$log', 
  'errorImageURL','$state','$uibModal', function($scope, FNADF, $stateParams, $log, errorImageURL,$state, $uibModal){
    var FNADC = this;

    var onLoad = function(){
      FNADC.showErrorMessage = false;
      FNADC.errorImageURL = errorImageURL;
      FNADC.refreshNoteGroups();
    }

    FNADC.getFarmId = function(){
      return $stateParams.farm_guid
    };

    FNADC.refreshNoteGroups = function(){
        FNADF.getNoteGroups(FNADC.getFarmId()).then(
            function(result){
                FNADC.noteGroups = result.data;
            },function(res){
                console.log(res);
                toastr.error('error occured while fetching note groups');
            }
        )
    }

    FNADC.addNewNoteGroup = function(){
        var newNoteGroup = {
            note_group_title : ''
            ,sadc_flg : false
            ,notes : []
        }
        upsertNoteGroup(newNoteGroup);
    }

    FNADC.editNoteGroup = function($index){
        upsertNoteGroup(FNADC.noteGroups[$index]);
    }

    var upsertNoteGroup = function(noteGroup){
        var modalInstance = $uibModal.open({
            animation: true,
            static : true,
            templateUrl: 'views/farm/farmNotesAndDocuments/mdl_upsert_note_group.html',
            controller: 'UpsertNoteGroupModalCtrl',
            controllerAs : 'UNGMC'
            ,resolve:{
              resolvedObj : function(){
                var obj = {
                    noteGroup : angular.copy(noteGroup)
                    ,farmId : FNADC.getFarmId()
                }
                return obj
              }
            }
          });

          modalInstance.result.then(function () {
            FNADC.refreshNoteGroups();
          }, function () {

          });
    }

    FNADC.addNewNote = function(noteGroupId){
        var modalInstance = $uibModal.open({
            animation: true,
            static : true,
            templateUrl: 'views/farm/farmNotesAndDocuments/mdl_upsert_note.html',
            controller: 'UpsertNoteModalCtrl',
            controllerAs : 'UNMCTRL'
            ,size: 'md'
            ,resolve:{
              noteObj : function(){
                var newNote = {
                    note_group_guid : noteGroupId
                    ,note_text : ''
                }
                return newNote
              }
            }
          });

          modalInstance.result.then(function () {
            FNADC.refreshNoteGroups();
          }, function () {

          });
    }

    FNADC.addNewDocument = function(){
      var modalInstance = $uibModal.open({
            animation: true,
            static : true,
            templateUrl: 'views/farm/farmcontacts/mdl_upload_file.html',
            size: 'md',
            controller: ['$uibModalInstance', function($uibModalInstance){
              var ANDMCTRL = this;
              ANDMCTRL.cancel = function(){
                $uibModalInstance.dismiss();
              }
            }],
            controllerAs : 'ANDMCTRL'
          });

          modalInstance.result.then(function () {
            FNADC.refreshDocuments();
          }, function () {

          });
    };

    FNADC.deleteNoteGroup = function(noteGroupId){
        FNADF.deleteNoteGroup(noteGroupId).then(function(){
            toastr.success('Note Group Deleted');
            FNADC.refreshNoteGroups();
        },function(res){
            console.log(res)
            toastr.error('error occured while delete noteGroup')
        })
    }

  onLoad();
}])

.directive('drtvNote', [function(){
  return{
    restrict : 'E'
    ,scope : {
      note :'='
      ,refreshFn : '&'
      ,sadcFlg : '='
    }
    ,bindToController : true
    ,templateUrl: 'views/farm/farmNotesAndDocuments/drtvNote.html'
    ,controllerAs : 'NDCTRL'
    ,controller : ['$uibModal','FarmNotesAndDocumentsFactory', function($uibModal,FNADF){
      var NDCTRL = this;

      NDCTRL.deleteNote = function(){
        FNADF.deleteNote(NDCTRL.note.note_guid).then(function(){
            toastr.success('Note Deleted');
            NDCTRL.refreshFn();
        },function(res){
            console.log(res)
            toastr.error('error occured while deleting note')
        })
      }

      NDCTRL.editNote = function(){
          var modalInstance = $uibModal.open({
            animation: true,
            size: 'md',
            static : true,
            templateUrl: 'views/farm/farmNotesAndDocuments/mdl_upsert_note.html',
            controller: 'UpsertNoteModalCtrl',
            controllerAs : 'UNMCTRL'
            ,resolve:{
              noteObj : function(){
                return NDCTRL.note;
              }
            }
          });

          modalInstance.result.then(function () {
            NDCTRL.refreshFn();
          }, function () {

          });
      };


    }]

  }
}])

.controller('UpsertNoteModalCtrl', ['$scope', '$uibModalInstance', 'noteObj','FarmNotesAndDocumentsFactory',
 function($scope, $uibModalInstance, note, FNADF){
  var UNMCTRL = this;

  var onLoad = function(){
     UNMCTRL.note = note;
     UNMCTRL.submitted = false;
  }

  UNMCTRL.save = function(){
    if(!$scope.upsertNoteForm.$invalid){
        if(!UNMCTRL.note.note_guid){
            FNADF.postNote(UNMCTRL.note).then(function(){
                toastr.success('New Note created');
                $uibModalInstance.close();
            },function(resp){
                console.log(resp);
                toastr.error('some error occured while saving note group')
            })
        }else{
            FNADF.updateNote(UNMCTRL.note.note_guid, UNMCTRL.note).then(function(){
                toastr.success('New Notes Group created');
                $uibModalInstance.close();
            },function(resp){
                console.log(resp);
                toastr.error('some error occured while updatind note group')
            })
        }
    }else{
        UNMCTRL.submitted = true;
        toastr.warning('Fill all the required fields');
    }
  }
  UNMCTRL.cancel = function(){
    $uibModalInstance.dismiss();
  }
  onLoad();
}])

.controller('UpsertNoteGroupModalCtrl', ['$scope', '$uibModalInstance', 'resolvedObj','FarmNotesAndDocumentsFactory',
 function($scope, $uibModalInstance, resolvedObj, FNADF){
  var UNGMC = this;

  var onLoad = function(){
    UNGMC.noteGroup = resolvedObj.noteGroup;
    UNGMC.submitted = false;
  };

  UNGMC.permissions = [
    {key : true, value : 'SADC staff'}
    ,{key : false, value : 'Public'}
  ]

  UNGMC.save = function(){
    if(!$scope.upsertNoteGroupForm.$invalid){
        if(!UNGMC.noteGroup.note_group_guid){
            FNADF.postNoteGroup(resolvedObj.farmId, UNGMC.noteGroup).then(function(){
                toastr.success('New Notes Group created');
                $uibModalInstance.close();
            },function(resp){
                console.log(resp);
                toastr.error('some error occured while saving note group')
            })
        }else{
            FNADF.updateNoteGroup(UNGMC.noteGroup.note_group_guid, UNGMC.noteGroup).then(function(){
                toastr.success(' Notes Group updated');
                $uibModalInstance.close();
            },function(resp){
                console.log(resp);
                toastr.error('some error occured while updatind note group')
            })
        }
    }else{
        UNGMC.submitted = true;
        toastr.warning('Fill all the required fields');
    }
  };
  UNGMC.cancel = function(){
    $uibModalInstance.dismiss();
  };
  onLoad();
}])

//directive('fileUploadDtv', ['$log', function($log){
//  return{
//      restrict : 'A'
//      ,link : function($scope, elem, attrs){
//
//              elem.bind('change', function(){
//                  $scope.files=[];
//                  $scope.$apply(function () {
//
//                  // STORE THE FILE OBJECT IN AN ARRAY.
//                  for (var i = 0; i < elem[0].files.length; i++) {
//                      $scope.files.push(elem[0].files[i])
//                  }
//                  });
//                  $scope.validateFiles();
//              });
//      }
//  }
//}])















