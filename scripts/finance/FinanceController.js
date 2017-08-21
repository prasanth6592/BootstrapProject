(function () {
    'use strict';
}());

angular.module('agSADCeFarms')
    .controller('FinanceController', ['$scope','$stateParams','$location','$filter', '$uibModal','Getfund','GetTransferStatus','DeleteFund','DeletePool','DeleteGrant','DeleteExpense','FundDataService','AppropDataService','PartnerDataService','PoolDataService','ReappropDataService','ExpensePayDataService','PaymentDataService','GetAppropn','UpdateApprop','UpdateReapprop','DeleteAppropriation','GetRelatedappropn','GetTransactiontype','GetReappropn','DeleteReappropn','GetExpense','GetPayment','GetPartnerGrant','AddPartnerGrant','AddCompetitivePool','GetPaymentsHistory','GetAppropPayHistory','GetProgramtype','GetGranttype','AddFund','UpdateFund','UpdatePayment','AddApprop','GetCompetitiveGrant','ExpenseDataService','GetPaymentInfo','GetExpenseData', '$state', '$log','modalService','modalMessageService', function($scope,$stateParams,$location,$filter,$uibModal,Getfund,GetTransferStatus,DeleteFund,DeletePool,DeleteGrant,DeleteExpense,FundDataService,AppropDataService,PartnerDataService,PoolDataService,ReappropDataService,ExpensePayDataService,PaymentDataService,GetAppropn,UpdateApprop,UpdateReapprop,DeleteAppropriation,GetRelatedappropn,GetTransactiontype,GetReappropn,DeleteReappropn,GetExpense,GetPayment,GetPartnerGrant,AddPartnerGrant,AddCompetitivePool,GetPaymentsHistory,GetAppropPayHistory,GetProgramtype,GetGranttype,AddFund,UpdateFund,UpdatePayment,AddApprop,GetCompetitiveGrant,ExpenseDataService,GetPaymentInfo,GetExpenseData,$state,$log,modalService,modalMessageService) {




             // Delete Reappropriation in the make payment modal
              $scope.deleteTrackexp = function(){
                        $scope.reapid = $scope.selectedPayReap.reappropriation_guid
                        console.log('delete expenseid:',$scope.reapid);
                         DeleteExpense.deleteexpense().delete({reappropriation_guid:$scope.reapid})
                            .$promise.then(
                               function(){
                                  modalMessageService.showMessage( "Success:","Expense deleted Successfully");
                                  console.log("Deleted from server");
                                  $state.reload();
                               },
                               function(response) {
                                    $log.debug("ERROR Deleting Expense:", response);
                                    if ( response.data === '{ "error": "Bad Request UE" }' ) {
                                        modalMessageService.showMessage( "Error:", "parameters not set correct");
                                    } else {
                                        modalMessageService.showMessage( "Error:", "This Expense cannot be deleted.");
                                    }
                                    $log.debug("Error: "+response.status + " " + response.statusText);
                                }
                          );
                    };




               // Delete Reappropriations here
            $scope.deletereappr = function(){
                        $scope.reapid = $scope.selectedReApprop.reappropriation_guid
//                        console.log('delete reapid:',$scope.reapid);
                         DeleteReappropn.deletereappropn().delete({reappropriation_guid:$scope.reapid})
                            .$promise.then(
                               function(){
                                  console.log("Deleted from server");
                                  modalMessageService.showMessage( "Success:","Reappropriation deleted Successfully");
                                  $state.reload();
                               },
                               function(response) {
                                    $log.debug("ERROR Deleting Reappropn:", response);
                                    if ( response.data === '{ "error": "Bad Request UE" }' ) {
                                        modalMessageService.showMessage( "Error:", "parameters not set correct");
                                    } else {
                                        modalMessageService.showMessage( "Error:", "This Reappropriation cannot be deleted.");
                                    }
                                    $log.debug("Error: "+response.status + " " + response.statusText);
                                }
                          );
                    };


         // Partner grants list
//          var partnergrant = GetPartnerGrant.getpartnergrant().query()
//                  .$promise.then(
//                    function(response){
//                        $scope.partnergrantslist = response;
//                    },
//                    function(response) {
//                        $log.debug("ERROR GETTING Partnergrant details:", response);
//                        if ( response.data === '{ "error": "Bad Request UE" }' ) {
//                            modalMessageService.showMessage( "Error:", "Check the service");
//                        } else {
//                            modalMessageService.showMessage( "Error:", "An error occurred. ");
//                        }
//                        $log.debug("Error: "+response.status + " " + response.statusText);
//
//                    }
//                 );
//
//                // Selected  Partner Grant Row
//             $scope.selectedPartnerGrant = GetPartnerGrant.getPartnerGrant();
//             $scope.selectRowPartner = function(i){
//                $scope.selectedIndex = i;
//                $scope.selectedPartnerGrant = $scope.partnergrantslist[i];
//                GetPartnerGrant.setPartnerGrant($scope.partnergrantslist[i]);
//                $scope.isDisabled = false;
//             }

//           //Competitive Grant
//            var competitivegrant = GetCompetitiveGrant.getcompetitivegrant().query()
//                  .$promise.then(
//                    function(response){
//                        $scope.competitivegrantslist = response;
//                    },
//                    function(response) {
//                        $log.debug("ERROR GETTING Competitive Grant Details:", response);
//                        if ( response.data === '{ "error": "Bad Request UE" }' ) {
//                            modalMessageService.showMessage( "Error:", "Check the service");
//                        } else {
//                            modalMessageService.showMessage( "Error:", "An error occurred. ");
//                        }
//                        $log.debug("Error: "+response.status + " " + response.statusText);
//
//                    }
//                 );
//
//           // Selected Competitive Grant Row
//           $scope.selectedCompetitiveGrant = GetCompetitiveGrant.getCompetitiveGrant();
//             $scope.selectRowCompg = function(i){
//                $scope.selectedIndex = i;
//                $scope.selectedCompetitiveGrant = $scope.competitivegrantslist[i];
//                GetCompetitiveGrant.setCompetitiveGrant($scope.competitivegrantslist[i]);
//                $scope.isDisabled = false;
//             }

//            //Payments list
//             var payments = GetPayments.getpayments().query()
//                  .$promise.then(
//                    function(response){
//                        $scope.paymentslist = response;
//                    },
//                    function(response) {
//                        $log.debug("ERROR GETTING Payments List:", response);
//                        if ( response.data === '{ "error": "Bad Request UE" }' ) {
//                            modalMessageService.showMessage( "Error:", "Check the service");
//                        } else {
//                            modalMessageService.showMessage( "Error:", "An error occurred. ");
//                        }
//                        $log.debug("Error: "+response.status + " " + response.statusText);
//
//                    }
//                 );
//                 $scope.selectedPaydetail = GetPayments.getPaydetail();
//                $scope.selectRowExpd = function(i){
//                $scope.selectedIndex = i;
//                $scope.selectedPaydetail = $scope.paymentslist[i];
//                GetPayments.setPaydetail($scope.paymentslist[i]);
//                $scope.isDisabled = false;
//             }


        // Add New Fund here
        $scope.openModal = function() {
             var modalInstance = $uibModal.open({
                templateUrl:'views/finance/newfund.html',
                controller:'FundsModalInstanceCtrl',
                resolve: {
                                    funditems: function () {
                                        return $scope.selectedFund;
                                    },
                                }
              });
                modalInstance.result.then(function (modalResponse) {
                        console.log("modalResponse", modalResponse);
                    }, function () {
                                $log.debug("cancelled the Fund entry");
                    });

              $scope.isDisabled = false;
        };

            var selectedFund = {};




        // Delete Funds here
            $scope.deletefund = function(){
                        $scope.currentselectedfund = getFundSelection();
                        $scope.delfundid =   Object.values($scope.currentselectedfund.selectedFund)[0];
                        $scope.fguid = $scope.delfundid.fund_guid;
                        console.log($scope.fguid);
                         DeleteFund.deletefund().delete({fund_guid:$scope.fguid})
                            .$promise.then(
                               function(response){
                                  modalMessageService.showMessage( "Success:","Fund deleted Successfully");
                                  console.log("Deleted from server");
                                  $state.reload();

                               },
                               function(response) {
                                    $log.debug("ERROR Deleting Funds:", response);
                                    if ( response.data === '{ "error": "Bad Request UE" }' ) {
                                        modalMessageService.showMessage( "Error:", "This Fund cannot be deleted ");
                                    } else {
                                        modalMessageService.showMessage( "Error:", "This Fund cannot be deleted  ");
                                    }
                                    $log.debug("Error: "+response.status + " " + response.statusText);
                                }
                          );
                    };








//          Fund details
           $scope.viewSelectedFund = function(){
              FundDataService.setSelectedFund($scope.gridApiFunds.selection.getSelectedRows());
                $scope.selectedRows = $scope.gridApiFunds.selection.getSelectedRows()[0];
                 $scope.selectedguidfund = $scope.selectedRows.fund_guid;

                        var fund_guid = $scope.selectedguidfund

               $location.path('/finance/funddetail/'+fund_guid);

          }
             $scope.selectedFundData = FundDataService.getSelectedFund()[0];


             $scope.selectedFundAppropData = _.get($scope.selectedFundData, 'fund_approps');
             $scope.selectedFundTransData = _.get($scope.selectedFundData, 'fund_trans');






//            Appropriation Details
            $scope.viewSelectedApprop = function(){
              AppropDataService.setSelectedApprop($scope.gridApiApprops.selection.getSelectedRows());
              $scope.selectedRows = $scope.gridApiApprops.selection.getSelectedRows()[0];
              $scope.selectedguidapprop = $scope.selectedRows.appropriation_guid;

                        var appropriation_guid = $scope.selectedguidapprop
//              $state.go('app.finance.appropdetail');
                $location.path('/finance/appropdetail/'+appropriation_guid);
          }
             $scope.selectedAppropData = AppropDataService.getSelectedApprop()[0];

             $scope.selectedAppropPayment = _.get($scope.selectedAppropData, 'payments');
             $scope.selectedAppropReapprop = _.get($scope.selectedAppropData, 'reappropriations');






//            Partner Grants Details
            $scope.viewSelectedPartner = function(){
              PartnerDataService.setSelectedPartner($scope.gridApiPartner.selection.getSelectedRows());
              $scope.selectedRows = $scope.gridApiPartner.selection.getSelectedRows()[0];
              $scope.selectedguidpartner = $scope.selectedRows.partner_grant_guid;
                var partner_grant_guid = $scope.selectedguidpartner
                $location.path('/finance/grantdetail/'+partner_grant_guid);
//              $state.go('app.finance.grantdetail');
          }
             $scope.selectedPartnerData = PartnerDataService.getSelectedPartner()[0];
             $scope.selectedGrantPayment = _.get($scope.selectedPartnerData, 'grant_payments');






//            Competitive Pool Details
            $scope.viewSelectedPool = function(){
              PoolDataService.setSelectedPool($scope.gridApiPool.selection.getSelectedRows());
              $scope.selectedRows = $scope.gridApiPool.selection.getSelectedRows()[0];
              $scope.selectedguidpool = $scope.selectedRows.competitive_pool_guid;
                var competitive_pool_guid = $scope.selectedguidpool
                $location.path('/finance/pooldetails/'+competitive_pool_guid);
//              $state.go('app.finance.pooldetails');
          }
             $scope.selectedPoolData = PoolDataService.getSelectedPool()[0];
             $scope.selectedPoolPayment = _.get($scope.selectedPoolData, 'pool_payments');




//            Reappropriations  Details
            $scope.viewSelectedReapprop = function(){
              ReappropDataService.setSelectedReapprop($scope.gridApiReapprops.selection.getSelectedRows());
              $scope.selectedRows = $scope.gridApiReapprops.selection.getSelectedRows()[0];
              $scope.selectedguidreapprop = $scope.selectedRows.reappropriation_guid;
                var reappropriation_guid = $scope.selectedguidreapprop
                $location.path('/finance/reappropdetails/'+reappropriation_guid);

          }
             $scope.selectedReappropData = ReappropDataService.getSelectedReapprop()[0];
             $scope.selectedReappropDetails = _.get($scope.selectedReappropData, 'detail');








////            alert(JSON.stringify($stateParams));

//            console.log($scope.selecteddataexpense);
//            $scope.selecteddataexpense = $stateParams;
//            var expguid = $scope.selecteddataexpense.expense_guid
//            console.log("Selected Expense guid",$scope.selecteddataexpense);










//            Expenses  Details
//            $scope.viewSelectedExpense = function(expguid){
//                 var expguid = $scope.selecteddataexpense.expense_guid
//                 console.log(expguid);
//                 var expensedetailsid = GetExpenseData.getexpensedata(expguid).get()
//                  .$promise.then(
//                    function(response){
//                        $scope.selectedexpensedetails = response;
//                        console.log($scope.selectedexpensedetails);
//                    },
//                 );
//
//              ExpenseDataService.setSelectedExpense($scope.gridApiExpenses.selection.getSelectedRows());
//              $scope.selectedRows = $scope.gridApiExpenses.selection.getSelectedRows()[0];
//              $scope.selectedguidexpense = $scope.selectedRows.expense_guid;
//                var expense_guid = $scope.selectedguidexpense
//                $location.path('/finance/expensedetail/'+expense_guid);
//          }




             if(!!$stateParams){
              $scope.selecteddataexpense = $stateParams;

            }
            //Expenses  Details
                 $scope.viewSelectedExpense = function(){

                    if(!!$scope.selecteddataexpense && !!$scope.selecteddataexpense.expense_guid){
                        var expguid = $scope.selecteddataexpense.expense_guid;
                        var expensedetailsid = GetExpenseData.getexpensedata(expguid).get()
                                              .$promise.then(
                                                function(response){

                                                    $scope.selectedexpensedetails = response;

                                                    $location.path('/finance/expensedetail/'+expguid);
                                                },
                                                function(err){
                                                  alert("Service error");
                                                }
                                             );
                    }
            }
            $scope.viewSelectedExpense();



             $scope.selectedExpenseData = ExpenseDataService.getSelectedExpense()[0];
              $scope.selectedExpensePayment = _.get($scope.selectedExpenseData, 'expense_payments');
              $scope.selectedExpenseCostshare = _.get($scope.selectedExpenseData, 'cost_share_json');



// Selected Expense data

           $scope.viewSelectedExp = function(){
              ExpenseDataService.setSelectedExpense($scope.gridApiExpenses.selection.getSelectedRows());
              $scope.selectedRows = $scope.gridApiExpenses.selection.getSelectedRows()[0];
              $scope.selectedguidexpense = $scope.selectedRows.expense_guid;
                var expense_guid = $scope.selectedguidexpense
                $location.path('/finance/expensedetail/'+expense_guid);
          }




//            Expenses Payment Details
            $scope.viewSelectedExpensePayment = function(){
              ExpensePayDataService.setSelectedExpensePay($scope.gridApiExpensePayments.selection.getSelectedRows());
              $scope.selectedRows = $scope.gridApiExpensePayments.selection.getSelectedRows()[0];
              $scope.selectedguidpayment = $scope.selectedRows.expense_payment_guid;
              var expense_payment_guid = $scope.selectedguidpayment
              $location.path('/finance/paydetail/'+expense_payment_guid);
//              $state.go('app.finance.paydetail');
          }
             $scope.selectedExpensePayData = ExpensePayDataService.getSelectedExpensePay()[0];







//            Payments  Details
            $scope.viewSelectedPayment = function(){
              PaymentDataService.setSelectedPayment($scope.gridApiPayments.selection.getSelectedRows());
              $scope.selectedRows = $scope.gridApiPayments.selection.getSelectedRows()[0];
              $scope.selectedguidpayment = $scope.selectedRows.expense_payment_guid;
              var expense_payment_guid = $scope.selectedguidpayment
              $location.path('/finance/paymentdetail/'+expense_payment_guid);

          }
             $scope.selectedPaymentData = PaymentDataService.getSelectedPayment()[0];



            // Selected Payment Expense details

           $scope.ViewSelectedPayExpense = function(){
                var expense_guid = $scope.selectedPaymentData.expense_guid
                console.log("selected expense", expense_guid);
                $location.path('/finance/expensedetail/'+expense_guid);
          }


                // Selected Payment Reappropriation details

           $scope.ViewSelectedPayReapprop = function(){
                var reappropriation_guid = $scope.selectedPaymentData.reappropriation_guid
                console.log("selected reappropriation guid", reappropriation_guid);
                $location.path('/finance/reappropdetails/'+reappropriation_guid);
          }




















//          Delete Appropriation here
            $scope.deleteapprop = function(){
                        $scope.currentselectedapprop = getAppropSelection();
                        $scope.delappropid =   Object.values($scope.currentselectedapprop.selectedApprop)[0];
                        $scope.aguid = $scope.delappropid.appropriation_guid;
                        console.log($scope.aguid);
                         DeleteAppropriation.deleteappropriation().delete({appropriation_guid:$scope.aguid})
                            .$promise.then(
                               function(){
                                  console.log("Deleted from server");
                                  modalMessageService.showMessage( "Success:","Appropriation deleted Successfully");
                                  $state.reload();
                               },
                               function(response) {
                                    $log.debug("ERROR Deleting Appropriation:", response);
                                    if ( response.data === '{ "error": "Bad Request UE" }' ) {
                                        modalMessageService.showMessage( "Error:", "This appropriation cannot be deleted");
                                    } else {
                                        modalMessageService.showMessage( "Error:", "This appropriation cannot be deleted.");
                                    }
                                    $log.debug("Error: "+response.status + " " + response.statusText);
                                }
                          );
                    };



// Delete Pool grants  here
            $scope.deletepool = function(){
                        $scope.currentselectedpool = getPoolSelection();
                        $scope.delpoolid =   Object.values($scope.currentselectedpool.selectedPool)[0];
                        $scope.poolguid = $scope.delpoolid.competitive_pool_guid;
                        console.log($scope.poolguid);
                         DeletePool.deletepool().delete({competitive_pool_guid:$scope.poolguid})
                            .$promise.then(
                               function(){
                                  console.log("Deleted from server");
                                  modalMessageService.showMessage( "Success:","Pool deleted Successfully");
                                  $state.reload();
                               },
                               function(response) {
                                    $log.debug("ERROR Deleting Pool:", response);
                                    if ( response.data === '{ "error": "Bad Request UE" }' ) {
                                        modalMessageService.showMessage( "Error:", "This Pool cannot be deleted");
                                    } else {
                                        modalMessageService.showMessage( "Error:", "This Pool cannot be deleted");
                                    }
                                    $log.debug("Error: "+response.status + " " + response.statusText);
                                }
                          );
                    };


// Delete Partner grants  here
            $scope.deletegrant = function(){
                        $scope.currentselectedgrant = getGrantSelection();
                        $scope.delgrantid =   Object.values($scope.currentselectedgrant.selectedGrant)[0];
                        $scope.grantguid = $scope.delgrantid.partner_grant_guid;
                        console.log($scope.grantguid);
                         DeleteGrant.deletegrant().delete({partner_grant_guid:$scope.grantguid})
                            .$promise.then(
                               function(){
                                  console.log("Deleted from server");
                                   modalMessageService.showMessage( "Success:","Grant deleted Successfully");
                                  $state.reload();
                               },
                               function(response) {
                                    $log.debug("ERROR Deleting Grant:", response);
                                    if ( response.data === '{ "error": "Bad Request UE" }' ) {
                                        modalMessageService.showMessage( "Error:", "This grant cannot be deleted");
                                    } else {
                                        modalMessageService.showMessage( "Error:", "This grant cannot be deleted");
                                    }
                                    $log.debug("Error: "+response.status + " " + response.statusText);
                                }
                          );
                    };




// Delete Expenses   here
            $scope.deleteExpense = function(){
                        $scope.currentselectedexpense = getExpenseSelection();
                        $scope.delexpid =   Object.values($scope.currentselectedexpense.selectedExpense)[0];
                        $scope.expenseguid = $scope.delexpid.expense_guid;
                        console.log($scope.expenseguid);
                         DeleteExpense.deleteexpense().delete({expense_guid:$scope.expenseguid})
                            .$promise.then(
                               function(){
                                  console.log("Deleted from server");

                                  $state.reload();
                               },
                               function(response) {
                                    $log.debug("ERROR Deleting Grant:", response);
                                    if ( response.data === '{ "error": "Bad Request UE" }' ) {
                                        modalMessageService.showMessage( "Error:", "This Expense cannot be deleted");
                                    } else {
                                        modalMessageService.showMessage( "Error:", "This Expense cannot be deleted");
                                    }
                                    $log.debug("Error: "+response.status + " " + response.statusText);
                                }
                          );
                    };









        //Add new Competitive pool grant
        $scope.openCompetitveModal = function() {
             var modalInstance = $uibModal.open({
                templateUrl:'views/finance/newcompetitivepool.html',
                controller:'FundsModalInstanceCtrl',
              });
                modalInstance.result.then(function (modalResponse) {
                        console.log("modalResponse", modalResponse);
                    }, function () {
                                $log.debug("cancelled the Pool Grant entry");
                    });
        };


        //Add New Partner Grant
         $scope.openPartnerGrantModal = function() {
             var modalInstance = $uibModal.open({
                templateUrl:'views/finance/newpartnergrant.html',
                controller:'FundsModalInstanceCtrl',
              });
                modalInstance.result.then(function (modalResponse) {
                        console.log("modalResponse", modalResponse);
                    }, function () {
                                $log.debug("cancelled the Partnergrant entry");
                    });
        };

        // Add New Payment in track expense
         $scope.openTrackExpenseModal = function() {
             var modalInstance = $uibModal.open({
                templateUrl:'views/finance/trackexpensenewpayment.html',
                controller:'FundsModalInstanceCtrl',
              });
                modalInstance.result.then(function (modalResponse) {
                        console.log("modalResponse", modalResponse);
                    }, function () {
                                $log.debug("cancelled the Payments entry");
                    });
        };


        // Add New Approp here
        $scope.appropModal = function() {
             var modalInstance = $uibModal.open({
                templateUrl:'views/finance/newapprop.html',
                controller:'FundsModalInstanceCtrl',
              });
               modalInstance.result.then(function (modalResponse) {
                        console.log("modalResponse", modalResponse);
                    }, function () {
                                $log.debug("cancelled the Appropriation entry");
                    });
              $scope.isDisabled = false;
        };
        $scope.isDisabled = true;



        // Reappropriation here
        $scope.reapporpModal = function(){
            var modalInstance = $uibModal.open({
                templateUrl:'views/finance/reappropriate.html',
                controller:'FundsModalInstanceCtrl',
            });
            modalInstance.result.then(function (modalResponse) {
                        console.log("modalResponse", modalResponse);
                    }, function () {
                                $log.debug("cancelled the reappropriation entry");
                    });
            $scope.isDisabled = false;
        };





        //Add new Expenses
        $scope.addExpense = function() {
             var modalInstance = $uibModal.open({
                templateUrl:'views/finance/newexpense.html',
                controller:'FundsModalInstanceCtrl',
              });
                modalInstance.result.then(function (modalResponse) {
                        console.log("modalResponse", modalResponse);
                    }, function () {
                                $log.debug("cancelled the Expense  entry");
                    });
        };






        //Adjust the Fund Balance here
        $scope.balanceModal = function(){
            var modalInstance = $uibModal.open({
                templateUrl:'views/finance/fundtransaction.html',
                controller:'FundsModalInstanceCtrl',
            });
            modalInstance.result.then(function (modalResponse) {
                        console.log("modalResponse", modalResponse);
                    }, function () {
                                $log.debug("cancelled the Fund Balance entry");
                    });
        };

        $scope.searchfarm='';

         // Fund balance is made editable
              $scope.editable = false;

               $scope.EditFund = function(){
               $scope.editable = true;
               }


         // Submit Edited Fund
     $scope.submitEditFund = function(){
      if($scope.editable == true){
          var data={
              "fund_guid": $scope.selectedFundData.fund_guid,
              "fund_id": $scope.selectedFundData.fund_id,
              "fund_name": $scope.selectedFundData.fund_name,
              "fund_description": $scope.selectedFundData.fund_description,
              "balance":$scope.selectedFundData.balance,
              "encumbered":$scope.selectedFundData.encumbered,
              "spent":$scope.selectedFundData.spent
          }
          console.log(data);
          UpdateFund.updatefund().update({guid:data.fund_guid},data);


      }
   }

// Submit Edited Reappropriation

              $scope.editable = false;

               $scope.EditReapprop = function(){
               $scope.editable = true;
                    }


     $scope.submitEditReapprop = function(){
      if($scope.editable == true){
          var data={
              "reappropriation_guid": $scope.selectedReappropData.reappropriation_guid,
              "reappropriation_date": $scope.selectedReappropData.reappropriation_date,
              "status_transfer_desc":$scope.selectedReappropData.status_transfer_desc,
              "note":$scope.selectedReappropData.note
          }
          console.log(data);
          UpdateReapprop.updatereapprop().update({guid:data.reappropriation_guid},data);


      }
   }





// Transfer Status
             var transferstatus  = GetTransferStatus.gettransferstatus().query()
                  .$promise.then(
                    function(response){
                        $scope.transferstatuslist = response;
                    },
                 );


// Payment details is made editable
              $scope.editable = false;

               $scope.EditPayment = function(){
               $scope.editable = true;
               }



        $scope.submitEditPayment = function(){
        if($scope.editable == true){
          var data={
              "expense_payment_guid": $scope.selectedReappropData.reappropriation_guid,
              "payment_amount": $scope.selectedReappropData.reappropriation_date,
              "payment_comment":$scope.selectedReappropData.status_transfer_desc,

          }
          console.log(data);
          UpdatePayment.updatepayment().update({guid:data.expense_payment_guid},data);


          }
        }











// FUNDS Grid display
$scope.gridFunds = {
            enableSorting :true,
            enablePaginationControls: true,
            paginationPageSize: 25,
            enableFiltering: true,
            saveSelection: true,
            enableRowHeaderSelection: true,
            selectionRowHeaderWidth: 50,
            multiSelect: false,
            rowHeight: 35,
            showGridFooter:true,
            selectedItems: [],
            columnDefs: [
                  { name:'Fund ID', field: 'fund_id', width: 125, enableHiding: false, pinnedLeft:false},
                  { name:'Fund Name', field: 'fund_name', width: 125, enableHiding: false, pinnedLeft:false },
                  { name:'Fund Description', field: 'fund_description', width: 175, enableHiding: false, pinnedLeft:false},
                  { name:'Balance', field: 'balance', width: 125, enableHiding: false, pinnedLeft:false },
                  { name:'Encumbered', field: 'encumbered', width: 125, enableHiding: false, pinnedLeft:false },
                  { name:'Spent', field: 'spent', width: 125, enableHiding: false, pinnedLeft:false },
        ],

    };

    // Register the grid for API calls like clearSelectedRows() and getSelectedRows()
            $scope.gridFunds.onRegisterApi = function(gridApiFunds){
                $scope.gridApiFunds = gridApiFunds;
                gridApiFunds.selection.on.rowSelectionChanged($scope,function(row){
                var msg = 'row selected'+row.isSelected;
                 $scope.selectedRows = $scope.gridApiFunds.selection.getSelectedRows()[0];
                 $scope.selectedguidfund = $scope.selectedRows.fund_guid;
                  console.log($scope.selectedguidfund);
                });
            };






// Related Appropriation for Funds in  Grid display
$scope.gridFundsApprops = {
            enableSorting :true,
            enablePaginationControls: true,
            paginationPageSize: 25,
            enableFiltering: true,
            saveSelection: true,
            enableRowHeaderSelection: true,
            selectionRowHeaderWidth: 50,
            multiSelect: false,
            rowHeight: 35,
            showGridFooter:true,
            selectedItems: [],
            columnDefs: [
                  { name:'Appropriation', field: 'appropriation_name', width: 250, enableHiding: false, pinnedLeft:false},
                  { name:'Program', field: 'program_name', width: 250, enableHiding: false, pinnedLeft:false },
                  { name:'Year', field: 'year', width: 125, enableHiding: false, pinnedLeft:false},
                  { name:'Appropriation Balance', field: 'balance', width: 170, enableHiding: false, pinnedLeft:false },
                  { name:'Initial Amount', field: 'initial_amount', width: 125, enableHiding: false, pinnedLeft:false },
                  { name:'PL Type', field: 'pl_type', width: 125, enableHiding: false, pinnedLeft:false },
                  { name:'Appropriation Date', field: 'appropriation_date', width: 170, enableHiding: false, pinnedLeft:false },
                  { name:'Reappropriation In', field: 'reappropriated_in', width: 170, enableHiding: false, pinnedLeft:false },
                  { name:'Reappropriation Out', field: 'reappropriated_out', width: 170, enableHiding: false, pinnedLeft:false },
        ],



    };



    // Register the grid for API calls like clearSelectedRows() and getSelectedRows()
            $scope.gridFundsApprops.onRegisterApi = function(gridApiFunds){
                $scope.gridApiFunds = gridApiFunds;

                gridApiFunds.selection.on.rowSelectionChanged($scope,function(row){
                var msg = 'row selected'+row.isSelected;
                 $scope.selectedRows = $scope.gridApiFunds.selection.getSelectedRows()[0];
                 $scope.selectedguidfund = $scope.selectedRows.fund_guid;

//                 console.log($scope.selectedguidfund);
                });
            };



// Funds Transaction Display GRID
$scope.gridFundsTrans = {
            enableSorting :true,
            enablePaginationControls: true,
            paginationPageSize: 25,
            enableFiltering: true,
            saveSelection: true,
            enableRowHeaderSelection: true,
            selectionRowHeaderWidth: 50,
            multiSelect: false,
            rowHeight: 35,
            showGridFooter:true,
            selectedItems: [],
            columnDefs: [
                  { name:'Fund Transaction guid', field: 'fund_transaction_guid', width: 250, enableHiding: false, pinnedLeft:false},
                  { name:'Transaction Type', field: 'transaction_type_desc', width: 170, enableHiding: false, pinnedLeft:false },
                  { name:'Transaction Status', field: 'transaction_status', width: 170, enableHiding: false, pinnedLeft:false},
                  { name:'Description', field: 'description', width: 125, enableHiding: false, pinnedLeft:false },
                  { name:'Amount', field: 'amount', width: 125, enableHiding: false, pinnedLeft:false },
                  { name:'Transaction Date', field: 'transaction_date', width: 170, enableHiding: false, pinnedLeft:false },
                  { name:'Expense Payment', field: 'expense_payment_guid', width: 170, enableHiding: false, pinnedLeft:false },
                  { name:'Expense Farm', field: 'expense_farm', width: 125, enableHiding: false, pinnedLeft:false },
        ],




    };


    // Register the grid for API calls like clearSelectedRows() and getSelectedRows()
            $scope.gridFundsTrans.onRegisterApi = function(gridApiFundsTrans){
                $scope.gridApiFundsTrans = gridApiFundsTrans;

                gridApiFundsTrans.selection.on.rowSelectionChanged($scope,function(row){
                var msg = 'row selected'+row.isSelected;
                 $scope.selectedRows = $scope.gridApiFundsApprops.selection.getSelectedRows()[0];
                 $scope.selectedguidfund = $scope.selectedRows.fund_guid;
                 console.log($scope.selectedguidfund);
                });
            };










// Get Fund details API
     $scope.getFundDetails = function() {
                // Display loading image while fetching data
                 $scope.loading_data = true;
                Getfund.getfundlist().query()
                    .$promise.then(
                    function(response){

                        $scope.fundsdetails = response;
                        $scope.gridFunds.data = response;
                        $log.debug("gridFunds.data:",$scope.gridFunds.data );
                        $scope.loading_data = false;

                    },
                    function(response) {
                        // If there is an error getting user statuses from datbase,
                        // this will have an error as well.  If so, put the message in the error modal.
                        $log.debug("AFTER GETING ERROR FROM DETAILS:", $scope.fundsdetails);
                        $log.debug("Error: "+response.status + " " + response.statusText);
                        modalMessageService.showMessage( "Error:", response.status + " " +
                            response.statusText + '. Please contact ' + agSupportEmail);
                        // Turn off loading data image


                    }
                );
            };

            // Do Initial User load
            $scope.getFundDetails();










// Get Fund Appropriation details API
     $scope.getFundAppropDetails = function() {

                $scope.gridFundsApprops.data = $scope.selectedFundAppropData;
//                console.log("grid funds approps",$scope.gridFundsApprops.data);

            };
            // Do Initial Fund Appropriation load
            $scope.getFundAppropDetails();









// Get Fund Transaction details API
     $scope.getFundTransDetails = function() {

                        $scope.gridFundsTrans.data = $scope.selectedFundTransData;

            };

//             Do Initial Fund Appropriation load
            $scope.getFundTransDetails();







            // Selected Fund
          var getFundSelection = function(){
                var selectedRows = $scope.gridApiFunds.selection.getSelectedRows();
                 var fundSelection = { selectedFund: {}};
                angular.forEach( selectedRows, function(row){
                    var fund_guid = row.fund_guid;
                    var fund_id = row.fund_id;
                    var fund_name = row.fund_name;
                    fundSelection.selectedFund[fund_guid] = row;

                });
                $log.debug("NEW SELECTED USERS:", fundSelection);
                return fundSelection;

            };

            var guid = $scope.getFundSelection;



















// Appropriations
$scope.gridApprops = {
            enableSorting :true,
            enablePaginationControls: true,
            paginationPageSize: 25,
            enableFiltering: true,
            saveSelection: true,
            enableRowHeaderSelection: true,
            selectionRowHeaderWidth: 50,
            multiSelect: false,
            rowHeight: 35,
            showGridFooter:true,
            selectedItems: [],
            columnDefs: [
                  { name:'Appropriation Name', field: 'appropriation_name', width: 250, enableHiding: false, pinnedLeft:false},
                  { name:'Appropriation Unit', field: 'appropriation_unit', width: 170, enableHiding: false, pinnedLeft:false},
                  { name:'Fund Name', field: 'fund_name', width: 250, enableHiding: false, pinnedLeft:false },
                  { name:'Grant Type', field: 'grant_type_desc', width: 125, enableHiding: false, pinnedLeft:false },
                  { name:'Program  Name', field: 'program_name', width: 250, enableHiding: false, pinnedLeft:false},
                  { name:'Initial Amount', field: 'initial_amount', width: 125, enableHiding: false, pinnedLeft:false },
                  { name:'Balance', field: 'balance', width: 125, enableHiding: false, pinnedLeft:false },
                  { name:'Appropriation Date', field: 'appropriation_date', width: 170, enableHiding: false, pinnedLeft:false },
                  { name:'Encumbered', field: 'encumbered', width: 125, enableHiding: false, pinnedLeft:false },
                  { name:'Spent', field: 'spent', width: 125, enableHiding: false, pinnedLeft:false },
                  { name:'Reappropriated Out', field: 'reappropriated_out', width: 170, enableHiding: false, pinnedLeft:false },
                  { name:'Reappropriated In', field: 'reappropriated_in', width: 170, enableHiding: false, pinnedLeft:false },
        ],

    };

    // Register the grid for API calls like clearSelectedRows() and getSelectedRows()
            $scope.gridApprops.onRegisterApi = function(gridApiApprops){
                $scope.gridApiApprops = gridApiApprops;

                gridApiApprops.selection.on.rowSelectionChanged($scope,function(row){
                var msg = 'row selected'+row.isSelected;
                 $scope.selectedRows = $scope.gridApiApprops.selection.getSelectedRows()[0];
                 $scope.selectedguidaprop = $scope.selectedRows.appropriation_guid;
//                 console.log($scope.selectedguidfund);
                });
            };

// Get Appropriations from service
     $scope.getAppropDetails = function() {
                // Display loading image while fetching data
                $scope.loading_data = true;
                GetAppropn.getappropn().query()
                    .$promise.then(
                    function(response){
                        $scope.appropdetails = response;
                        $scope.gridApprops.data = response;
                        $log.debug("gridFunds.data:",$scope.gridApprops.data );
                        $scope.loading_data = false;
                    },
                    function(response) {
                        // If there is an error getting user statuses from datbase,
                        // this will have an error as well.  If so, put the message in the error modal.
                        $log.debug("AFTER GETING ERROR FROM DETAILS:", $scope.fundsdetails);
                        $log.debug("Error: "+response.status + " " + response.statusText);
                        modalMessageService.showMessage( "Error:", response.status + " " +
                            response.statusText + '. Please contact ' + agSupportEmail);
                    }
                );
            };

            // Do Initial Apropriation load
            $scope.getAppropDetails();

     // Selected Appropriation
          var getAppropSelection = function(){
                var selectedRows = $scope.gridApiApprops.selection.getSelectedRows();
                 var appropSelection = { selectedApprop: {}};
                angular.forEach( selectedRows, function(row){
                    var approp_guid = row.appropriation_guid;
                    var approp_id = row.appropriation_id;
                    var approp_name = row.approp_name;
                    appropSelection.selectedApprop[approp_guid] = row;

                });
                $log.debug("NEW SELECTED USERS:", appropSelection);
                return appropSelection;

            };


// Get the Appropriation Payments here

$scope.gridAppropPayments = {
            enableSorting :true,
            enablePaginationControls: true,
            paginationPageSize: 25,
            enableFiltering: true,
            saveSelection: true,
            enableRowHeaderSelection: true,
            selectionRowHeaderWidth: 50,
            multiSelect: false,
            rowHeight: 35,
            showGridFooter:true,
            selectedItems: [],
            columnDefs: [
                  { name:'Expense Payment ID', field: 'expense_payment_guid', width: 250, enableHiding: false, pinnedLeft:false},
                  { name:'Expense Type', field: 'expense_type', width: 125, enableHiding: false, pinnedLeft:false },
                  { name:'Payment  Status', field: 'payment_status_desc', width: 150, enableHiding: false, pinnedLeft:false},
                  { name:'Payment Amount', field: 'payment_amount', width: 170, enableHiding: false, pinnedLeft:false },
                  { name:'Partner ', field: 'partner_name', width: 125, enableHiding: false, pinnedLeft:false },
                  { name:'Application ID', field: 'application_id', width: 150, enableHiding: false, pinnedLeft:false },
        ],

    };

    // Register the grid for API calls like clearSelectedRows() and getSelectedRows()
            $scope.gridAppropPayments.onRegisterApi = function(gridApiAppropsPay){
                $scope.gridApiAppropsPay = gridApiAppropsPay;

                gridApiAppropsPay.selection.on.rowSelectionChanged($scope,function(row){
                var msg = 'row selected'+row.isSelected;
                 $scope.selectedRows = $scope.gridApiAppropsPay.selection.getSelectedRows()[0];
                 $scope.selectedguidaprop = $scope.selectedRows.appropriation_guid;
//                 console.log($scope.selectedguidfund);
                });
            };

// Get Appropriation Payments details API
     $scope.getAppropPayDetails = function() {
//                        loading image

                        $scope.gridAppropPayments.data = $scope.selectedAppropPayment;

//                        console.log($scope.selectedAppropPayment);

            };
            // Do Initial Apropriation load
            $scope.getAppropPayDetails();





// Get the Appropriation Reappropriations here
$scope.gridAppropReapprops = {
            enableSorting :true,
            enablePaginationControls: true,
            paginationPageSize: 25,
            enableFiltering: true,
            saveSelection: true,
            enableRowHeaderSelection: true,
            selectionRowHeaderWidth: 50,
            multiSelect: false,
            rowHeight: 35,
            showGridFooter:true,
            selectedItems: [],
            columnDefs: [
                  { name:'Reappropriation GUID', field: 'reappropriation_guid', width: 250, enableHiding: false, pinnedLeft:false},
                  { name:'Source Appropriation Name', field: 'source_appropriation', width: 250, enableHiding: false, pinnedLeft:false },
                  { name:'Source Fund Name', field: 'source_fund', width: 250, enableHiding: false, pinnedLeft:false},
                  { name:'Source Fund GUID', field: 'fund_source_guid', width: 250, enableHiding: false, pinnedLeft:false },
                  { name:'Transfer Amount', field: 'transfer_amount', width: 170, enableHiding: false, pinnedLeft:false },
                  { name:'Balance', field: 'balance', width: 125, enableHiding: false, pinnedLeft:false },
        ],

    };

    // Register the grid for API calls like clearSelectedRows() and getSelectedRows()
            $scope.gridAppropReapprops.onRegisterApi = function(gridApiAppropsReapprop){
                $scope.gridApiAppropsReapprop = gridApiAppropsReapprop;

                gridApiAppropsReapprop.selection.on.rowSelectionChanged($scope,function(row){
                var msg = 'row selected'+row.isSelected;
                 $scope.selectedRows = $scope.gridApiAppropsReapprop.selection.getSelectedRows()[0];
                 $scope.selectedguidaprop = $scope.selectedRows.appropriation_guid;
//                 console.log($scope.selectedguidfund);
                });
            };

// Get Fund Transaction details API
     $scope.getAppropReappropDetails = function() {

                         $scope.gridAppropReapprops.data = $scope.selectedAppropReapprop;

            };


            // Do Initial Apropriation load
            $scope.getAppropReappropDetails();

























//Competitive Pool Grants
$scope.gridPool = {
            enableSorting :true,
            enablePaginationControls: true,
            paginationPageSize: 25,
            enableFiltering: true,
            saveSelection: true,
            enableRowHeaderSelection: true,
            selectionRowHeaderWidth: 50,
            multiSelect: false,
            rowHeight: 35,
            showGridFooter:true,
            selectedItems: [],
            columnDefs: [
                  { name:'Pool Name', field: 'pool_name', width: 170, enableHiding: false, pinnedLeft:false},
                  { name:'Year', field: 'year', width: 125, enableHiding: false, pinnedLeft:false },
                  { name:'Program Name', field: 'program_name', width: 250, enableHiding: false, pinnedLeft:false},
                  { name:'Initial Award', field: 'initial_award', width: 125, enableHiding: false, pinnedLeft:false },
                  { name:'Balance', field: 'balance', width: 125, enableHiding: false, pinnedLeft:false },
                  { name:'Spent', field: 'spent', width: 125, enableHiding: false, pinnedLeft:false },
                  { name:'Encumbered', field: 'encumbered', width: 125, enableHiding: false, pinnedLeft:false },
                  { name:'Competitive Limit', field: 'competitive_limit', width: 200, enableHiding: false, pinnedLeft:false },

        ],

    };



// Register the grid for API calls like clearSelectedRows() and getSelectedRows()
            $scope.gridPool.onRegisterApi = function(gridApiPool){
                $scope.gridApiPool = gridApiPool;

                gridApiPool.selection.on.rowSelectionChanged($scope,function(row){
                var msg = 'row selected'+row.isSelected;
                 $scope.selectedRows = $scope.gridApiPool.selection.getSelectedRows()[0];
                 $scope.selectedguidpool = $scope.selectedRows.competitive_pool_guid;
//                 console.log($scope.selectedguidfund);
                });
            };


// Get Competitive Pool grants from service
     $scope.getPoolDetails = function() {
                // Display loading image while fetching data

                GetCompetitiveGrant.getcompetitivegrant().query()
                    .$promise.then(
                    function(response){

                        $scope.pooldetails = response;
                        $scope.gridPool.data = response;
                        $log.debug("gridPool.data:",$scope.gridPool.data );



                    },
                    function(response) {
                        // If there is an error getting user statuses from datbase,
                        // this will have an error as well.  If so, put the message in the error modal.
                        $log.debug("AFTER GETING ERROR FROM DETAILS:", $scope.pooldetails);
                        $log.debug("Error: "+response.status + " " + response.statusText);
                        modalMessageService.showMessage( "Error:", response.status + " " +
                            response.statusText + '. Please contact ' + agSupportEmail);
                    }
                );
            };

            // Do Initial Pool grants  load
            $scope.getPoolDetails();




      // Selected Pool grant
          var getPoolSelection = function(){
                var selectedRows = $scope.gridApiPool.selection.getSelectedRows();
                 var poolSelection = { selectedPool: {}};
                angular.forEach( selectedRows, function(row){
                    var pool_guid = row.appropriation_guid;
                    var pool_id = row.appropriation_id;
                    var pool_name = row.approp_name;
                    poolSelection.selectedPool[pool_guid] = row;

                });
                $log.debug("NEW SELECTED USERS:", poolSelection);
                return poolSelection;

            };



//      Get Partner Grants Payment details
$scope.gridPoolPayments = {
            enableSorting :true,
            enablePaginationControls: true,
            paginationPageSize: 25,
            enableFiltering: true,
            saveSelection: true,
            enableRowHeaderSelection: true,
            selectionRowHeaderWidth: 50,
            multiSelect: false,
            rowHeight: 35,
            showGridFooter:true,
            selectedItems: [],
            columnDefs: [
                  { name:'Expense Guid', field: 'expense_guid', width: 270, enableHiding: false, pinnedLeft:false},
                  { name:'Expense Type', field: 'expense_type', width: 125, enableHiding: false, pinnedLeft:false },
                  { name:'Payment Status', field: 'payment_status_desc', width: 150, enableHiding: false, pinnedLeft:false},
                  { name:'Payment Amount', field: 'payment_amount', width: 150, enableHiding: false, pinnedLeft:false},
                  { name:'Appropriation Name', field: 'appropriation_name', width: 250, enableHiding: false, pinnedLeft:false },
        ],

    };



// Register the grid for API calls like clearSelectedRows() and getSelectedRows()
            $scope.gridPoolPayments.onRegisterApi = function(gridApiPoolPayments){
                $scope.gridApiPoolPayments = gridApiPoolPayments;

                gridApiPoolPayments.selection.on.rowSelectionChanged($scope,function(row){
                var msg = 'row selected'+row.isSelected;
                 $scope.selectedRows = $scope.gridApiPoolPayments.selection.getSelectedRows()[0];
                 $scope.selectedguidpool = $scope.selectedRows.partner_grant_guid;
//                 console.log($scope.selectedguidfund);
                });
            };

// Get Pool Payments details API
     $scope.getPoolPayDetails = function() {
//                        loading image

                        $scope.gridPoolPayments.data = $scope.selectedPoolPayment;

            };


            // Do Initial Pool Payments load
            $scope.getPoolPayDetails();























//       Partner Grants
$scope.gridPartner = {
            enableSorting :true,
            enablePaginationControls: true,
            paginationPageSize: 25,
            enableFiltering: true,
            saveSelection: true,
            enableRowHeaderSelection: true,
            selectionRowHeaderWidth: 50,
            multiSelect: false,
            rowHeight: 35,
            showGridFooter:true,
            selectedItems: [],
            columnDefs: [
                  { name:'Grant Name', field: 'grant_name', width: 250, enableHiding: false, pinnedLeft:false},
                  { name:'Year', field: 'year', width: 125, enableHiding: false, pinnedLeft:false },
                  { name:'Program Name', field: 'program_name', width: 250, enableHiding: false, pinnedLeft:false},
                  { name:'Partner', field: 'partner_name', width: 170, enableHiding: false, pinnedLeft:false},
                  { name:'Initial Award', field: 'initial_award', width: 125, enableHiding: false, pinnedLeft:false },
                  { name:'Base Balance', field: 'base_balance', width: 125, enableHiding: false, pinnedLeft:false },
                  { name:'Base Spent', field: 'base_spent', width: 125, enableHiding: false, pinnedLeft:false },
                  { name:'Base Encumbered', field: 'base_encumbered', width: 150, enableHiding: false, pinnedLeft:false },
                  { name:'Competitive Balance', field: 'competitive_balance', width: 170, enableHiding: false, pinnedLeft:false },
                  { name:'Competitive Spent', field: 'competitive_spent', width: 170, enableHiding: false, pinnedLeft:false },
                  { name:'Competitive Encumbered', field: 'competitive_encumbered', width: 200, enableHiding: false, pinnedLeft:false },
                  { name:'Reappropriated Out', field: 'reappropriated_out', width: 170, enableHiding: false, pinnedLeft:false },
        ],

    };



// Register the grid for API calls like clearSelectedRows() and getSelectedRows()
            $scope.gridPartner.onRegisterApi = function(gridApiPartner){
                $scope.gridApiPartner = gridApiPartner;

                gridApiPartner.selection.on.rowSelectionChanged($scope,function(row){
                var msg = 'row selected'+row.isSelected;
                 $scope.selectedRows = $scope.gridApiPartner.selection.getSelectedRows()[0];
                 $scope.selectedguidpool = $scope.selectedRows.partner_grant_guid;
//                 console.log($scope.selectedguidfund);
                });
            };




// Get Partner  grants from service
     $scope.getPartnerDetails = function() {
                // Display loading image while fetching data

                GetPartnerGrant.getpartnergrant().query()
                    .$promise.then(
                    function(response){

                        $scope.partnerdetails = response;
                        $scope.gridPartner.data = response;
                        $log.debug("gridPartner.data:",$scope.gridPartner.data );



                    },
                    function(response) {
                        // If there is an error getting user statuses from datbase,
                        // this will have an error as well.  If so, put the message in the error modal.
                        $log.debug("AFTER GETING ERROR FROM DETAILS:", $scope.partnerdetails);
                        $log.debug("Error: "+response.status + " " + response.statusText);
                        modalMessageService.showMessage( "Error:", response.status + " " +
                            response.statusText + '. Please contact ' + agSupportEmail);
                    }
                );
            };

            // Do Initial Pool grants  load
            $scope.getPartnerDetails();



      // Selected Partner Grant
          var getGrantSelection = function(){
                var selectedRows = $scope.gridApiPartner.selection.getSelectedRows();
                 var grantSelection = { selectedGrant: {}};
                angular.forEach( selectedRows, function(row){
                    var grant_guid = row.partner_grant_guid;
                    var grant_name = row.grant_name;
                    grantSelection.selectedGrant[grant_guid] = row;

                });
                $log.debug("NEW PARTNER GRANT:", grantSelection);
                return grantSelection;

            };





//      Get Partner Grants Payment details
$scope.gridPartnerPayments = {
            enableSorting :true,
            enablePaginationControls: true,
            paginationPageSize: 25,
            enableFiltering: true,
            saveSelection: true,
            enableRowHeaderSelection: true,
            selectionRowHeaderWidth: 50,
            multiSelect: false,
            rowHeight: 35,
            showGridFooter:true,
            selectedItems: [],
            columnDefs: [
                  { name:'Expense Guid', field: 'expense_guid', width: 275, enableHiding: false, pinnedLeft:false},
                  { name:'Expense Type', field: 'expense_type', width: 150, enableHiding: false, pinnedLeft:false },
                  { name:'Payment Status', field: 'payment_status_desc', width: 150, enableHiding: false, pinnedLeft:false},
                  { name:'Payment Amount', field: 'payment_amount', width: 150, enableHiding: false, pinnedLeft:false},
                  { name:'Appropriation Name', field: 'appropriation_name', width: 250, enableHiding: false, pinnedLeft:false },
        ],

    };



// Register the grid for API calls like clearSelectedRows() and getSelectedRows()
            $scope.gridPartnerPayments.onRegisterApi = function(gridApiPartnerPayments){
                $scope.gridApiPartnerPayments = gridApiPartnerPayments;

                gridApiPartnerPayments.selection.on.rowSelectionChanged($scope,function(row){
                var msg = 'row selected'+row.isSelected;
                 $scope.selectedRows = $scope.gridApiPartnerPayments.selection.getSelectedRows()[0];
                 $scope.selectedguidpool = $scope.selectedRows.partner_grant_guid;
//                 console.log($scope.selectedguidfund);
                });
            };

// Get Grants Payments details API
     $scope.getGrantsPayDetails = function() {
//                        loading image

                        $scope.gridPartnerPayments.data = $scope.selectedGrantPayment;

            };


            // Do Initial Grants Appropriation load
            $scope.getGrantsPayDetails();

















//       Reappropriations
$scope.gridReapprops = {
            enableSorting :true,
            enablePaginationControls:true,
            paginationPageSize: 10,
            enableFiltering: true,
            saveSelection: true,
            enableRowHeaderSelection: true,
            selectionRowHeaderWidth: 50,
            multiSelect: false,
            rowHeight: 35,
            showGridFooter:true,
            selectedItems: [],
            columnDefs: [
                  { name:'Reappropriation ID', field: 'reappropriation_guid', width: 300, enableHiding: false, pinnedLeft:false},
                  { name:'Source Appropriation', field: 'source_appropriation', width: 300, enableHiding: false, pinnedLeft:false},
                  { name:'Destination Appropriation', field: 'target_appropriation', width: 300, enableHiding: false, pinnedLeft:false},
                  { name:'Transfer Amount', field: 'transfer_amount', width: 170, enableHiding: false, pinnedLeft:false },
                  { name:'Balance', field: 'balance', width: 125, enableHiding: false, pinnedLeft:false },
                  { name:'Status', field: 'status_transfer_desc', width: 125, enableHiding: false, pinnedLeft:false },
                  { name:'Note', field: 'note', width: 125, enableHiding: false, pinnedLeft:false },
                  { name:'Reappropriation Date', field: 'reappropriation_date', width: 200, enableHiding: false, pinnedLeft:false },

        ],

    };





// Register the grid for API calls like clearSelectedRows() and getSelectedRows()
            $scope.gridReapprops.onRegisterApi = function(gridApiReapprops){
                $scope.gridApiReapprops = gridApiReapprops;

                gridApiReapprops.selection.on.rowSelectionChanged($scope,function(row){
                var msg = 'row selected'+row.isSelected;
                 $scope.selectedRows = $scope.gridApiReapprops.selection.getSelectedRows()[0];
                 $scope.selectedguidreapprops = $scope.selectedRows.reappropriation_guid;
//                 console.log($scope.selectedguidreapprops);
                });
            };


// Get Reappropriation   from service
     $scope.getReappropDetails = function() {
//                loading image
                $scope.loading_data = true;
                GetReappropn.getreappropn().query()

                    .$promise.then(
                    function(response){
                        $scope.reappropdetails = response;
                        $scope.gridReapprops.data = response;
                        $log.debug("gridReapprops.data:",$scope.gridReapprops.data );
                        $scope.loading_data = false;

                    },
                    function(response) {
                        // If there is an error getting user statuses from datbase,
                        // this will have an error as well.  If so, put the message in the error modal.
                        $log.debug("AFTER GETING ERROR FROM DETAILS:", $scope.partnerdetails);
                        $log.debug("Error: "+response.status + " " + response.statusText);
                        modalMessageService.showMessage( "Error:", response.status + " " +
                            response.statusText + '. Please contact ' + agSupportEmail);
                    }
                );
            };

            // Do Initial Pool grants  load
            $scope.getReappropDetails();



      // Selected Reappropriation
          var getReappropSelection = function(){
                var selectedRows = $scope.gridApiReapprops.selection.getSelectedRows();
                 var reappropSelection = { selectedReapprop: {}};
                angular.forEach( selectedRows, function(row){
                    var reappropriation_guid = row.reappropriation_guid;

                    reappropSelection.selectedReapprop[reappropriation_guid] = row;

                });
                $log.debug("Reappropraiation Details:", reappropSelection);
                return reappropSelection;

            };





//      Get Reappropriation  details
$scope.gridReappropsDetails = {
            enableSorting :true,
            enablePaginationControls: true,
            paginationPageSize: 25,
            enableFiltering: true,
            saveSelection: true,
            enableRowHeaderSelection: true,
            selectionRowHeaderWidth: 50,
            multiSelect: false,
            rowHeight: 35,
            showGridFooter:true,
            selectedItems: [],
            columnDefs: [
                  { name:'Partner Grant', field: 'grant_name', width: 170, enableHiding: false, pinnedLeft:false},
                  { name:'Competitive Pool', field: 'pool_name', width: 170, enableHiding: false, pinnedLeft:false },
                  { name:'Amount', field: 'amount', width: 125, enableHiding: false, pinnedLeft:false},
                  { name:'Notes', field: 'notes', width: 125, enableHiding: false, pinnedLeft:false},

        ],

    };



// Register the grid for API calls like clearSelectedRows() and getSelectedRows()
            $scope.gridReappropsDetails.onRegisterApi = function(gridApiReappropsDetails){
                $scope.gridApiReappropsDetails = gridApiReappropsDetails;

                gridApiReappropsDetails.selection.on.rowSelectionChanged($scope,function(row){
                var msg = 'row selected'+row.isSelected;
                 $scope.selectedRows = $scope.gridApiReappropsDetails.selection.getSelectedRows()[0];
                 $scope.selectedguidpool = $scope.selectedRows.partner_grant_guid;
//                 console.log($scope.selectedguidfund);
                });
            };

// Get Reappropriation Details API
     $scope.getReappropDetails = function() {
//                        loading image

                        $scope.gridReappropsDetails.data = $scope.selectedReappropDetails;

            };


            // Do Initial Pool Payments load
            $scope.getReappropDetails();










//       Track Expenses
$scope.gridExpenses = {
            enableSorting :true,
            enablePaginationControls: true,
            paginationPageSize: 25,
            enableFiltering: true,
            saveSelection: true,
            enableRowHeaderSelection: true,
            selectionRowHeaderWidth: 50,
            multiSelect: false,
            rowHeight: 35,
            showGridFooter:true,
            selectedItems: [],
            columnDefs: [
                  { name:'Expense Type', field: 'expense_type', width: 200, enableHiding: false, pinnedLeft:false},
                  { name:'Expense Description', field: 'expense_description', width: 200, enableHiding: false, pinnedLeft:false },
                  { name:'Municipality', field: 'municipality', width: 250, enableHiding: false, pinnedLeft:false},
                  { name:'County', field: 'county', width: 170, enableHiding: false, pinnedLeft:false},
                  { name:'Farm', field: 'farm_guid', width: 250, enableHiding: false, pinnedLeft:false },
                  { name:'Application', field: 'application_id', width: 125, enableHiding: false, pinnedLeft:false },
                  { name:'Status', field: 'expense_status_desc', width: 125, enableHiding: false, pinnedLeft:false },
                  { name:'Expense Amount', field: 'expense_amount', width: 200, enableHiding: false, pinnedLeft:false },

        ],

    };





// Register the grid for API calls like clearSelectedRows() and getSelectedRows()
            $scope.gridExpenses.onRegisterApi = function(gridApiExpenses){
                $scope.gridApiExpenses = gridApiExpenses;

                gridApiExpenses.selection.on.rowSelectionChanged($scope,function(row){
                var msg = 'row selected'+row.isSelected;
                 $scope.selectedRows = $scope.gridApiExpenses.selection.getSelectedRows()[0];
                 $scope.selectedguidreapprops = $scope.selectedRows.reappropriation_guid;
//                 console.log($scope.selectedguidreapprops);
                });
            };


// Get Expense details  from service
     $scope.getExpenseDetails = function() {


                GetExpense.getexpense().query()
                    .$promise.then(
                    function(response){

                        $scope.expensedetails = response;
                        $scope.gridExpenses.data = response;
                        $log.debug("gridReapprops.data:",$scope.gridExpenses.data );



                    },
                    function(response) {
                        // If there is an error getting user statuses from datbase,
                        // this will have an error as well.  If so, put the message in the error modal.
                        $log.debug("AFTER GETING ERROR FROM DETAILS:", $scope.expensedetails);
                        $log.debug("Error: "+response.status + " " + response.statusText);
                        modalMessageService.showMessage( "Error:", response.status + " " +
                            response.statusText + '. Please contact ' + agSupportEmail);
                    }
                );
            };

            // Do Initial Expense   load
            $scope.getExpenseDetails();



      // Selected Expenses
          var getExpenseSelection = function(){
                var selectedRows = $scope.gridExpenses.selection.getSelectedRows();
                 var expenseSelection = { selectedExpense: {}};
                angular.forEach( selectedRows, function(row){
                    var expense_guid = row.expense_guid;

                    expenseSelection.selectedExpense[expense_guid] = row;

                });
                $log.debug("Expense Details:", expenseSelection);
                return expenseSelection;

            };






        // Selected Pool/Grant row from the reappropriation table
           $scope.selectedCompetitiveGrant = GetCompetitiveGrant.getCompetitiveGrant();
             $scope.selectPoolReapprop = function(i){
                $scope.selectedIndex = i;
                $scope.selectedCompetitiveGrant = $scope.competitivegrantslist[i];
                GetCompetitiveGrant.setCompetitiveGrant($scope.competitivegrantslist[i]);
                $scope.isDisabled = false;
             }


//        Expenses Payments details
$scope.gridExpensePayments = {
            enableSorting :true,
            enablePaginationControls: true,
            paginationPageSize: 25,
            enableFiltering: true,
            saveSelection: true,
            enableRowHeaderSelection: true,
            selectionRowHeaderWidth: 50,
            multiSelect: false,
            rowHeight: 35,
            showGridFooter:true,
            selectedItems: [],
            columnDefs: [
                  { name:'Payment Amount', field: 'payment_amount', width: 300, enableHiding: false, pinnedLeft:false},
                  { name:'Payment Status', field: 'payment_status_desc', width: 170, enableHiding: false, pinnedLeft:false},
                  { name:'Payment Comment', field: 'payment_comment', width: 250, enableHiding: false, pinnedLeft:false },
                  { name:'Appropriation', field: 'appropriation_name', width: 250, enableHiding: false, pinnedLeft:false },
                  { name:'From Reappropriation', field: 'reapprop_flag', width: 170, enableHiding: false, pinnedLeft:false},
        ],

    };





// Register the grid for API calls like clearSelectedRows() and getSelectedRows()
            $scope.gridExpensePayments.onRegisterApi = function(gridApiExpensePayments){
                $scope.gridApiExpensePayments = gridApiExpensePayments;

                gridApiExpensePayments.selection.on.rowSelectionChanged($scope,function(row){
                var msg = 'row selected'+row.isSelected;
                 $scope.selectedRows = $scope.gridApiExpensePayments.selection.getSelectedRows()[0];
                 $scope.selectedguidreapprops = $scope.selectedRows.reappropriation_guid;
//                 console.log($scope.selectedguidreapprops);
                });
            };


// Get Expense payment details  from service
     $scope.getExpensePaymentDetails = function() {


                  $scope.gridExpensePayments.data = $scope.selectedExpensePayment;
            };

            // Do Initial Expense  Payments  load
            $scope.getExpensePaymentDetails();



      // Selected Expenses
          var getExpensePaymentSelection = function(){
                var selectedRows = $scope.gridExpensePayments.selection.getSelectedRows();
                 var expensePaymentSelection = { selectedExpensePayment: {}};
                angular.forEach( selectedRows, function(row){
                    var expense_guid = row.expense_guid;

                    expensePaymentSelection.selectedExpensePayment[expense_guid] = row;

                });
                $log.debug("Expense Payment Details:", expensePaymentSelection);
                return expensePaymentSelection;

            };





//        Expenses Payments Costshare details
$scope.gridExpenseCostshare = {
            enableSorting :true,
            enablePaginationControls: true,
            paginationPageSize: 25,
            enableFiltering: true,
            saveSelection: true,
            enableRowHeaderSelection: true,
            selectionRowHeaderWidth: 50,
            multiSelect: false,
            rowHeight: 35,
            showGridFooter:true,
            selectedItems: [],
            columnDefs: [
                  { name:'Source', field: 'payment_source', width: 300, enableHiding: false, pinnedLeft:false},
                  { name:'Amount', field: 'share_amount', width: 250, enableHiding: false, pinnedLeft:false },
                  { name:'Description', field: 'share_description', width: 170, enableHiding: false, pinnedLeft:false},
        ],

    };





// Register the grid for API calls like clearSelectedRows() and getSelectedRows()
            $scope.gridExpenseCostshare.onRegisterApi = function(gridApiExpenseCostshare){
                $scope.gridApiExpenseCostshare = gridApiExpenseCostshare;

                gridApiExpenseCostshare.selection.on.rowSelectionChanged($scope,function(row){
                var msg = 'row selected'+row.isSelected;
                 $scope.selectedRows = $scope.gridApiExpenseCostshare.selection.getSelectedRows()[0];
                 $scope.selectedguidreapprops = $scope.selectedRows.reappropriation_guid;
//                 console.log($scope.selectedguidreapprops);
                });
            };


// Get Expense payment details  from service
     $scope.gridExpenseCostshareDetails = function() {


                  $scope.gridExpenseCostshare.data = $scope.selectedExpenseCostshare;
            };

            // Do Initial Expense  Payments  load
            $scope.gridExpenseCostshareDetails();







//       Payment Details

$scope.gridPayments = {
            enableSorting :true,
            enablePaginationControls: true,
            paginationPageSize: 25,
            enableFiltering: true,
            saveSelection: true,
            enableRowHeaderSelection: true,
            selectionRowHeaderWidth: 50,
            multiSelect: false,
            rowHeight: 35,
            showGridFooter:true,
            selectedItems: [],
            columnDefs: [
                  { name:'Expense Type', field: 'expense_type', width: 200, enableHiding: false, pinnedLeft:false},
                  { name:'Payment Amount', field: 'payment_amount', width: 200, enableHiding: false, pinnedLeft:false },
                  { name:'Payment Status', field: 'payment_status_desc', width: 250, enableHiding: false, pinnedLeft:false},
                  { name:'Appropriation', field: 'appropriation_name', width: 250, enableHiding: false, pinnedLeft:false},
                  { name:'From Reappropriation', field: 'reapprop_flag', width: 250, enableHiding: false, pinnedLeft:false },
                  { name:'Farm ID', field: 'farm_id', width: 200, enableHiding: false, pinnedLeft:false },
                  { name:'Farm Name', field: 'farm_name', width: 250, enableHiding: false, pinnedLeft:false },
                  { name:'Application ID', field: 'application_id', width: 200, enableHiding: false, pinnedLeft:false },
                  { name:'Created Date', field: 'created_date', width: 250, enableHiding: false, pinnedLeft:false },
                  { name:'Paid Date', field: 'paid_date', width: 200, enableHiding: false, pinnedLeft:false },

        ],

    };





// Register the grid for API calls like clearSelectedRows() and getSelectedRows()
            $scope.gridPayments.onRegisterApi = function(gridApiPayments){
                $scope.gridApiPayments = gridApiPayments;

                gridApiPayments.selection.on.rowSelectionChanged($scope,function(row){
                var msg = 'row selected'+row.isSelected;
                 $scope.selectedRows = $scope.gridApiPayments.selection.getSelectedRows()[0];
                 $scope.selectedguidpayment = $scope.selectedRows.expense_payment_guid;
//                 console.log($scope.selectedguidreapprops);
                });
            };


// Get Payment details  from service
     $scope.getPaymentDetails = function() {


                GetPayment.getpayment().query()
                    .$promise.then(
                    function(response){

                        $scope.paymentdetails = response;
                        $scope.gridPayments.data = response;
                        $log.debug("gridPayments.data:",$scope.gridPayments.data );



                    },
                    function(response) {
                        // If there is an error getting user statuses from datbase,
                        // this will have an error as well.  If so, put the message in the error modal.
                        $log.debug("AFTER GETING ERROR FROM DETAILS:", $scope.paymentdetails);
                        $log.debug("Error: "+response.status + " " + response.statusText);
                        modalMessageService.showMessage( "Error:", response.status + " " +
                            response.statusText + '. Please contact ' + agSupportEmail);
                    }
                );
            };

            // Do Initial Payment   load
            $scope.getPaymentDetails();



      // Selected Expenses
          var getPaymentSelection = function(){
                var selectedRows = $scope.gridPayments.selection.getSelectedRows();
                 var paymentSelection = { selectedPayment: {}};
                angular.forEach( selectedRows, function(row){
                    var expense_payment_guid = row.expense_payment_guid;

                    paymentSelection.selectedPayment[expense_payment_guid] = row;

                });
                $log.debug("Payment Details:", paymentSelection);
                return paymentSelection;

            };






























    // Appropriation  is made editable
              $scope.editable = false;

               $scope.EditApprop = function(){
               $scope.editable = true;
               }


   // Submit Edited Appropriation
     $scope.submitEditApprop = function(){
      if($scope.editable == true){
          var data={
              "appropriation_guid": $scope.selectedAppropData.appropriation_guid,
              "appropriation_unit": $scope.selectedAppropData.appropriation_unit,
              "pl_type": $scope.selectedAppropData.pl_type,
              "appropriation_date": $scope.selectedAppropData.appropriation_date,
          }
          data.appropriation_date = $filter('date')($scope.selectedApprop.appropriation_date,'yyyy-MM-dd');
          console.log(data);
          UpdateApprop.updateapprop().update({guid:data.appropriation_guid},data);
          $state.reload();


      }
   }
}])














.controller('FundsModalInstanceCtrl', function($scope,$log,$state,$filter,FundDataService,$uibModalInstance,Getfund,UpdateFund,GetTransferStatus,GetAppropn,GetTransactiontype,GetExpensetype,GetExpensestatus,AddTrans,AddReapprop,GetPartnerGrant,GetCompetitiveGrant,GetReappropn, AddFund, AddApprop,AddPartnerGrant,AddCompetitivePool,AddExpense,GetProgramtype,GetGranttype,modalService,modalMessageService){



                // Fund Selection

                var getFundSelection = function(){
                var selectedRows = $scope.gridApiFunds.selection.getSelectedRows();
                var fundSelection = { selectedFund: {}};
                angular.forEach( selectedRows, function(row){
                var fund_guid = row.fund_guid;
                var fund_id = row.fund_id;
                var fund_name = row.fund_name;
                fundSelection.selectedFund[fund_guid] = row;
                });
                $log.debug("NEW SELECTED FUND:", fundSelection);
                return fundSelection;

            };

            // Fund details
           $scope.viewSelectedFund = function(){
              FundDataService.setSelectedFund($scope.gridApiFunds.selection.getSelectedRows());
              $state.go('app.finance.funddetail');
          }
             $scope.selectedFundData = FundDataService.getSelectedFund()[0];






               //Grant type list
             var grant = GetGranttype.getgranttype().query()
                  .$promise.then(
                    function(response){
                        $scope.granttype = response;
                    },
                    function(response) {
                        $log.debug("ERROR GETTING Grants List:", response);
                        if ( response.data === '{ "error": "Bad Request UE" }' ) {
                            modalMessageService.showMessage( "Error:", "Check the service");
                        } else {
                            modalMessageService.showMessage( "Error:", "An error occurred. ");
                        }
                        $log.debug("Error: "+response.status + " " + response.statusText);

                    }
                 );

            // Fund balance is made editable
              $scope.editable = false;

               $scope.EditFund = function(){
               $scope.editable = true;
                    }


            // Get Fund list
             var funddetails = Getfund.getfundlist().query()
                  .$promise.then(
                    function(response){
                        $scope.fundslist = response;
                    },
                 );

             //Get Approps details
             var appropdetails = GetAppropn.getappropn().query()
                  .$promise.then(
                    function(response){
                        $scope.appropslist = response;
                    },
                 );
                 $scope.selectedSourceApprop = GetAppropn.getApprop();
                $scope.selectsourceapprop = function(i){
                $scope.selectedIndex = i;
                $scope.selectedSourceApprop = $scope.appropslist[i];
                GetAppropn.setApprop($scope.appropslist[i]);
                console.log($scope.selectedSourceApprop);
                }


                //Partner Grants list
                var partnergrant = GetPartnerGrant.getpartnergrant().query()
                  .$promise.then(
                    function(response){
                        $scope.partnergrantslist = response;
                    },
                 );


             //Competitive Grant
            var competitivegrant = GetCompetitiveGrant.getcompetitivegrant().query()
                  .$promise.then(
                    function(response){
                        $scope.competitivegrantslist = response;
                    },
                 );


                //Reappropriations here
                var reappropriate  = GetReappropn.getreappropn().query()
                  .$promise.then(
                    function(response){
                        $scope.reappropriatelist = response;
                    },
                 );



           // Get Expense Types
             var expensetype = GetExpensetype.getexpensetype().query()
                  .$promise.then(
                    function(response){
                        $scope.expensetypelist = response;
                    },
                 );



           // Get Expense Status
             var expensestatus = GetExpensestatus.getexpensestatus().query()
                  .$promise.then(
                    function(response){
                        $scope.expenseststatuslist = response;
                    },
                 );




            // transaction types here
            var transactiontypes  = GetTransactiontype.gettransactiontype().query()
                  .$promise.then(
                    function(response){
                        $scope.transactiontypeslist = response;
                    },
                 );
            // Transfer Status
             var transferstatus  = GetTransferStatus.gettransferstatus().query()
                  .$promise.then(
                    function(response){
                        $scope.transferstatuslist = response;
                    },
                 );


              $scope.refresh = $scope.funddetails

              //Program type list
             var program = GetProgramtype.getprogramtype().query()
                  .$promise.then(
                    function(response){
                        $scope.programtypelist = response;
                    },
                    function(response) {
                        $log.debug("ERROR GETTING Program Type List:", response);
                        if ( response.data === '{ "error": "Bad Request UE" }' ) {
                            modalMessageService.showMessage( "Error:", "Check the service");
                        } else {
                            modalMessageService.showMessage( "Error:", "An error occurred. ");
                        }
                        $log.debug("Error: "+response.status + " " + response.statusText);

                    }
                 );


  $scope.close = function(){

        $uibModalInstance.dismiss();
    }

    // Post request for new fund
    $scope.submit = function(){
                          var response = {"fund_id":$scope.fundid, "fund_name":$scope.fundname,"fund_description":$scope.funddescription,"balance":$scope.fundbalance,}
                         AddFund.addfund().save(response)
                            .$promise.then(
                               function(response){
                                  console.log(response);
                                  $state.reload();


                               },
                               function(response) {
                                    $log.debug("ERROR ADDING NEWFUND:", response);
                                    if ( response.data === '{ "error": "Bad Request UE" }' ) {
                                        modalMessageService.showMessage( "Error:", "parameters not set correct");
                                        console.log("parameters not set correct");
                                    } else {
                                        modalMessageService.showMessage( "Error:", "An error occurred While Adding New Fund. ");
                                    }
                                    $log.debug("Error: "+response.status + " " + response.statusText);
                                }
                          );
                         $uibModalInstance.close(response);
                    };

      // Post request for new appropriation
    $scope.submitapr = function(){
                          var response = {"appropriation_unit":$scope.appropunit, "year":$scope.appropyear,"program_type_guid":$scope.program_type_guid.trim(),"fund_guid":$scope.source_fund,"pl_type":$scope.pltype,"grant_type_desc":$scope.grant_type_desc.trim(),"appropriation_date":$scope.appropdate,"initial_amount":$scope.initial_amount,}
                         response.appropriation_date = $filter('date')($scope.appropdate,'yyyy-MM-dd');
                         AddApprop.addapprop().save(response)
                            .$promise.then(
                               function(response){
                                  console.log(response);
                                  $state.reload();
                               },
                               function(response) {
                                    $log.debug("ERROR ADDING New Appropriation:", response);
                                    if ( response.data === '{ "error": "Bad Request UE" }' ) {
                                        modalMessageService.showMessage( "Error:", "parameters not set correct");
                                    } else {
                                        modalMessageService.showMessage( "Error:", "An error occurred. ");
                                    }
                                    $log.debug("Error: "+response.status + " " + response.statusText);
                                }
                          );
                         $uibModalInstance.close(response);
                    };

      // Post request for new partner grant
    $scope.submitpg = function(){
                          var response = {"program_type_guid":$scope.program_type, "year":$scope.grant_year,"partner_guid":$scope.partner_type,"initial_award":$scope.initial_award,"base_balance":$scope.base_balance, "base_spent":$scope.base_spent,"base_encumbered":$scope.base_encumbered,"competitive_balance":$scope.competitive_balance,"competitive_spent":$scope.competitive_spent,"competitive_encumbered":$scope.competitive_encumbered,}
                         AddPartnerGrant.addpartnergrant().save(response)
                            .$promise.then(
                               function(response){
                                  console.log(response);
                                  $state.reload();
                               },
                               function(response) {
                                    $log.debug("ERROR ADDING New Partner Grant:", response);
                                    if ( response.data === '{ "error": "Bad Request UE" }' ) {
                                        modalMessageService.showMessage( "Error:", "parameters not set correct");
                                    } else {
                                        modalMessageService.showMessage( "Error:", "An error occurred. ");
                                    }
                                    $log.debug("Error: "+response.status + " " + response.statusText);
                                }
                          );
                         $uibModalInstance.close(response);
                    };

     // Post request for new Competitive Pool
    $scope.submitcpg = function(){
                          var response = {"year":$scope.pool_year,"program_type_guid":$scope.pool_type.trim(),"initial_award":$scope.pool_award,"current_balance":$scope.pool_balance,"spent":$scope.pool_spent,"encumbered":$scope.pool_encumbered,"competitive_limit":$scope.pool_limit,}
                         AddCompetitivePool.addcompetitivepool().save(response)
                            .$promise.then(
                               function(response){
                                  console.log(response);
                                  $state.reload()
                               },
                               function(response) {
                                    $log.debug("ERROR ADDING New Competitive Pool:", response);
                                    if ( response.data === '{ "error": "Bad Request UE" }' ) {
                                        modalMessageService.showMessage( "Error:", "parameters not set correct");
                                    } else {
                                        modalMessageService.showMessage( "Error:", "An error occurred. ");
                                    }
                                    $log.debug("Error: "+response.status + " " + response.statusText);
                                }
                          );
                         $uibModalInstance.close(response);
                    };



//    Post request for new expeses
     $scope.submitExpense = function(){
                          var response = {"expense_type":$scope.expense_type,"expense_description":$scope.expense_desc.trim(),"expense_status_desc":$scope.expense_status,"expense_amount":$scope.expense_amount,"municipality":$scope.municipality,"county":$scope.expense_county,"application_guid":$scope.application_id,"farm_guid":$scope.farm_id}
                         AddExpense.addexpense().save(response)
                            .$promise.then(
                               function(response){
                                  console.log(response);
                                  $state.reload()
                               },
                               function(response) {
                                    $log.debug("ERROR ADDING New Expense :", response);
                                    if ( response.data === '{ "error": "Bad Request UE" }' ) {
                                        modalMessageService.showMessage( "Error:", "parameters not set correct");
                                    } else {
                                        modalMessageService.showMessage( "Error:", "An error occurred. ");
                                    }
                                    $log.debug("Error: "+response.status + " " + response.statusText);
                                }
                          );
                         $uibModalInstance.close(response);
                    };







    // Condition for disabling on source appropriation selection
            $scope.isDisableCompetitive = true;
            $scope.isDisableBase = true;

            $scope.sourceChange = function(){
//                alert("Selected Source " + $scope.appropriation_source_guid.grant_type_desc);
                $scope.isDisableCompetitive = true;
                $scope.isDisableBase = true;
//                console.log($scope.appropriation_source_guid.grant_type_desc);

                if($scope.appropriation_source_guid.grant_type_desc == "BASE")
                {
                    $scope.isDisableBase = false;
                }

                if ($scope.appropriation_source_guid.grant_type_desc == "COMPETITIVE")
                {
                    $scope.isDisableCompetitive = false;
                }
             }











    // Post request for reappropriate
        $scope.submitreap = function(){
                          $scope.reap_guid = $scope.appropriation_source_guid.appropriation_guid
                          console.log('reap_guid',$scope.reap_guid);
                          var response = {"appropriation_source_guid":$scope.appropriation_source_guid.appropriation_guid,"appropriation_target_guid":$scope.appropriation_target_guid,"status_transfer_desc":"PENDING","transfer_amount":$scope.transfer_amount,"note":$scope.note,"detail":$scope.cpdetail}
                         AddReapprop.addarepprop().save(response)
                            .$promise.then(
                               function(response){
                                  console.log(response);
                               },
                               function(response) {
                                    $log.debug("ERROR  Reappropriation:", response);
                                    if ( response.data === '{ "error": "Bad Request UE" }' ) {
                                        modalMessageService.showMessage( "Error:", "parameters not set correct");
                                    } else {
                                        modalMessageService.showMessage( "Error:", "An error occurred. ");
                                    }
                                    $log.debug("Error: "+response.status + " " + response.statusText);
                                }
                          );
                         $uibModalInstance.close(response);
                    };


      // Post request for reappropriate competitive
        $scope.submitreapcomp = function(){
                          $scope.reap_guid = $scope.appropriation_source_guid.appropriation_guid
                          console.log('reap_guid',$scope.reap_guid);
                          var response = {"appropriation_source_guid":$scope.appropriation_source_guid.appropriation_guid,"appropriation_target_guid":$scope.appropriation_target_guid,"status_transfer_desc":"PENDING","transfer_amount":$scope.transfer_amount,"note":$scope.note,"detail":$scope.grantdetail}
                         AddReapprop.addarepprop().save(response)
                            .$promise.then(
                               function(response){
                                  console.log(response);
                               },
                               function(response) {
                                    $log.debug("ERROR  Reappropriation:", response);
                                    if ( response.data === '{ "error": "Bad Request UE" }' ) {
                                        modalMessageService.showMessage( "Error:", "parameters not set correct");
                                    } else {
                                        modalMessageService.showMessage( "Error:", "An error occurred. ");
                                    }
                                    $log.debug("Error: "+response.status + " " + response.statusText);
                                }
                          );
                         $uibModalInstance.close(response);
                    };

     // Post request for reappropriate
        $scope.addTrans = function(){
                          //var response = {"fund_guid":$scope.selectedFundData.fund_guid,"description":$scope.trans_description,"transaction_type_desc":$scope.fund_transaction_type.trim(),"transaction_status":$scope.fund_transfer_status.trim(),"amount":$scope.trans_amount}
						  var response = {"fund_guid":$scope.selectedFundData.fund_guid,"transaction_type_desc":$scope.fund_transaction_type.trim(),"amount":$scope.trans_amount}
                         AddTrans.addtrans().save(response)
                            .$promise.then(
                               function(response){
                                  console.log(response);
                                  $state.reload();
                               },
                               function(response) {
                                    $log.debug("Error Adding New Fund Transaction", response);
                                    if ( response.data === '{ "error": "Bad Request UE" }' ) {
                                        modalMessageService.showMessage( "Error:", "Adding New Fund Transaction");
                                        console.log("parameters not set correct");
                                    } else {
                                        modalMessageService.showMessage( "Error:", "An error occurred. ");
                                    }
                                    $log.debug("Error: "+response.status + " " + response.statusText);
                                }
                          );
                         $uibModalInstance.close(response);
                    };


        //Add New Grant Details for the reappropriation

             $scope.addGrant = function(){

                  var data={
                      "reappropriation_guid": $scope.selectedFundData.fund_guid,
                      "fund_id": $scope.selectedFundData.fund_id,
                      "fund_name": $scope.selectedFundData.fund_name,
                      "fund_description": $scope.selectedFundData.fund_description,
                      "balance":$scope.selectedFundData.balance,
                      "encumbered":$scope.selectedFundData.encumbered,
                      "spent":$scope.selectedFundData.spent
                  }
                  console.log(data);
                  UpdateFund.updatefund().update({guid:data.fund_guid},data);

           };

// Adding Grant details in the reappropriate modal
                    $scope.addRow = function(){
                            $scope.reappropriatelist.push({ 'grant_name':$scope.grantnamereapp, 'amount': $scope.reapgrantamount,});
                        $scope.grantnamereapp='';
                        $scope.reapgrantamount='';

                    };
//     Remove Grant from the reappropriate modal

                         $scope.removeRow = function(name){
                            var index = -1;
                            var comArr = eval( $scope.reappropriatelist );
                            for( var i = 0; i < comArr.length; i++ ) {
                                if( comArr[i].name === name ) {
                                    index = i;
                                    break;
                                }
                            }
                            if( index === -1 ) {
                                alert( "Something gone wrong" );
                            }
                            $scope.reappropriatelist.splice( index, 1 );
                        };


//Add competitive pool detail in the modal

            $scope.cpdetail = [];
            $scope.addPool = function(){
                $scope.cpdetail.push({competitive_pool_guid:$scope.competitive_pool_reap.competitive_pool_guid,pool_name:$scope.competitive_pool_reap.pool_name, amount:$scope.amount1,});
                console.log($scope.cpdetail);
            }


            $scope.grantdetail = [];
            $scope.addGrant = function(){
                $scope.grantdetail.push({partner_grant_guid:$scope.partner_grant_detail.partner_grant_guid,grant_name:$scope.partner_grant_detail.grant_name, amount:$scope.amount1});
                console.log($scope.grantdetail);
            }
            //console.log($scope.partner_grant1);
// removing the grant row in the modal
             $scope.removePool = function(i){
             $scope.cpdetail.splice(i, 1);
            }

            $scope.removeGrant = function(i){
             $scope.grantdetail.splice(i, 1);
            }

});
;
