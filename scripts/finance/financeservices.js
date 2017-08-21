(function () {
    'use strict';
}());

angular.module('agSADCeFarms')
    //.constant("baseURL", "http://oit-6gsgyv1.oit.state.nj.us/AG_SADCeFarmsWS/")
    .constant("baseURL", "/AG_SADCeFarms/")


    //service for get the financedetails List
     .service('Getfund', ['$resource',function($resource){
        var fundData = {};
        this.getfundlist = function(){
            return $resource('http://127.0.0.1/AG_SADCeFarms/fund',{method:'GET'});

        };
        this.setFund = function(fund){
                fundData = fund;
        };
        this.getFund = function(){
                return fundData;
        };

    }])

    // service for adding new fund
     .service('AddFund', ['$resource', function($resource) {

        this.addfund = function(){

            return $resource('http://127.0.0.1/AG_SADCeFarms/fund/:fund_guid', null, {'save':{method:'POST'}});
        };

    }])

    // service for Selected  Fund details
    .service('FundDataService', function() {
          this.store = {};
          this.getSelectedFund = function(){
            return this.store;
          };
          this.setSelectedFund = function(data){
            return this.store = data;
          };

    })


    // service for Selected  Appropriation details
    .service('AppropDataService', function() {
          this.store = {};
          this.getSelectedApprop = function(){
            return this.store;
          };
          this.setSelectedApprop = function(data){
            return this.store = data;
          };

    })

    // service for Selected  Partner grant details
    .service('PartnerDataService', function() {
          this.store = {};
          this.getSelectedPartner = function(){
            return this.store;
          };
          this.setSelectedPartner = function(data){
            return this.store = data;
          };

    })


    // service for Selected  Competitive Grant details
    .service('PoolDataService', function() {
          this.store = {};
          this.getSelectedPool = function(){
            return this.store;
          };
          this.setSelectedPool = function(data){
            return this.store = data;
          };

    })



     // service for Selected  Reappropriation  details
    .service('ReappropDataService', function() {
          this.store = {};
          this.getSelectedReapprop = function(){
            return this.store;
          };
          this.setSelectedReapprop = function(data){
            return this.store = data;
          };

    })



   // service for Selected  Expenses  details
    .service('ExpenseDataService', function() {
          this.store = {};
          this.getSelectedExpense = function(){
            return this.store;
          };
          this.setSelectedExpense = function(data){
            return this.store = data;
          };

    })


     // service for Selected  Payment  details
    .service('PaymentDataService', function() {
          this.store = {};
          this.getSelectedPayment = function(){
            return this.store;
          };
          this.setSelectedPayment = function(data){
            return this.store = data;
          };

    })






     // service for Selected  Expenses Payment details
    .service('ExpensePayDataService', function() {
          this.store = {};
          this.getSelectedExpensePay = function(){
            return this.store;
          };
          this.setSelectedExpensePay = function(data){
            return this.store = data;
          };

    })

















    // services for updating fund
     .service('UpdateFund', ['$resource', function($resource) {

        this.updatefund = function(){

            return $resource('http://127.0.0.1/AG_SADCeFarms/fund/:guid', null, {'update':{method:'PUT'}});
        };

    }])

    //Delete service for Fund
    .service('DeleteFund', ['$resource',function($resource){
        this.deletefund = function(){
            return $resource('http://127.0.0.1/AG_SADCeFarms/fund/:fund_guid',null, {'delete':{method:'DELETE'}});
        };
    }])

    //service for getting all the appropriation details
    .service('GetAppropn', ['$resource',function($resource){
        var Appropdata = {};
        this.getappropn = function(){
            return $resource('http://127.0.0.1/AG_SADCeFarms/appropriation',{method:'GET'});
        };
        this.setApprop = function(approp){
                Appropdata = approp;
        };
        this.getApprop = function(){
                return Appropdata;
        }
    }])

    //service for adding new appropriation
    .service('AddApprop', ['$resource', function($resource) {

        this.addapprop = function(){

            return $resource('http://127.0.0.1/AG_SADCeFarms/appropriation/:appropriation_guid', null, {'save':{method:'POST'}});
        };

    }])


    //service for Updating  appropriation
    .service('UpdateApprop', ['$resource', function($resource) {

        this.updateapprop = function(){

            return $resource('http://127.0.0.1/AG_SADCeFarms/appropriation/:guid', null, {'update':{method:'PUT'}});
        };

    }])



    //Delete Appropriation
    .service('DeleteAppropriation', ['$resource',function($resource){
        this.deleteappropriation = function(){
            return $resource('http://127.0.0.1/AG_SADCeFarms/appropriation/:appropriation_guid',null, {'delete':{method:'DELETE'}});
        };
    }])



    //Related appropriations
    .service('GetRelatedappropn', ['$resource',function($resource){
        this.getrelatedappropn = function(guid){
            return $resource('http://127.0.0.1/AG_SADCeFarms/appropriation/?fund_guid='+guid,{method:'GET'});

        };
    }])





    // Reappropriation services
    .service('GetReappropn', ['$resource',function($resource){
        var reappropData = {};
        this.getreappropn = function(){
            return $resource('http://127.0.0.1/AG_SADCeFarms/reappropriation',{method:'GET'});

        };
        this.setReaprop = function(reapprop){
                reappropData = reapprop;
        };
        this.getReapprop = function(){
                return reappropData;
        };
    }])




    //Delete service for reappropriation
    .service('DeleteReappropn', ['$resource',function($resource){
        this.deletereappropn = function(){
            return $resource('http://127.0.0.1/AG_SADCeFarms/reappropriation/:reappropriation_guid',null, {'delete':{method:'DELETE'}});
        };
    }])



    //Post Reappropriation Service
    .service('AddReapprop', ['$resource', function($resource) {

        this.addarepprop = function(){

            return $resource('http://127.0.0.1/AG_SADCeFarms/reappropriation/:reappropriation_guid', null, {'save':{method:'POST'}});
        };

    }])



     // services for updating Reappropriation
     .service('UpdateReapprop', ['$resource', function($resource) {

        this.updatereapprop = function(){

            return $resource('http://127.0.0.1/AG_SADCeFarms/reappropriation/:guid', null, {'update':{method:'PUT'}});
        };

    }])





    //partner grants
    .service('GetPartnerGrant', ['$resource',function($resource){
        var partnergrantData = {};
        this.getpartnergrant = function(){
            return $resource('http://127.0.0.1/AG_SADCeFarms/partnergrant',{method:'GET'});

        };
        this.setPartnerGrant = function(partnergrant){
                partnergrantData = partnergrant;
        };
        this.getPartnerGrant = function(){
                return partnergrantData;
        }
    }])




    //service for adding new Partner Grant
    .service('AddPartnerGrant', ['$resource', function($resource) {

        this.addpartnergrant = function(){

            return $resource('http://127.0.0.1/AG_SADCeFarms/partnergrant/:partnergrant_guid', null, {'save':{method:'POST'}});
        };
    }])




    //Delete service for Partner Grant
    .service('DeleteGrant', ['$resource',function($resource){
        this.deletegrant = function(){
            return $resource('http://127.0.0.1/AG_SADCeFarms/partnergrant/:partner_grant_guid',null, {'delete':{method:'DELETE'}});
        };
    }])




    //competitive pool grants
    .service('GetCompetitiveGrant', ['$resource',function($resource){
        var competitivegrantData = {};
        this.getcompetitivegrant = function(){
            return $resource('http://127.0.0.1/AG_SADCeFarms/competitivepool',{method:'GET'});

        };
        this.setCompetitiveGrant = function(competitivegrant){
                competitivegrantData = competitivegrant;
        };
        this.getCompetitiveGrant = function(){
                return competitivegrantData;
        }
    }])




    //Service for adding Competitive Pool
    .service('AddCompetitivePool', ['$resource', function($resource) {

        this.addcompetitivepool = function(){

            return $resource('http://127.0.0.1/AG_SADCeFarms/competitivepool/:competitive_pool_guid', null, {'save':{method:'POST'}});
        };
    }])




    //Delete service for Pool
    .service('DeletePool', ['$resource',function($resource){
        this.deletepool = function(){
            return $resource('http://127.0.0.1/AG_SADCeFarms/competitivepool/:competitive_pool_guid',null, {'delete':{method:'DELETE'}});
        };
    }])










    //Get program type services here
    .service('GetProgramtype', ['$resource',function($resource){
        this.getprogramtype = function(){
            return $resource('http://127.0.0.1/AG_SADCeFarms/programtype',{method:'GET'});

        };
    }])


     //Get Expense types  here
    .service('GetExpensetype', ['$resource',function($resource){
        this.getexpensetype = function(){
            return $resource('http://127.0.0.1/AG_SADCeFarms/expensetype',{method:'GET'});

        };
    }])




     //Get Expense status  here
    .service('GetExpensestatus', ['$resource',function($resource){
        this.getexpensestatus = function(){
            return $resource('http://127.0.0.1/AG_SADCeFarms/expensestatus',{method:'GET'});

        };
    }])


     //Delete service for Expenses
    .service('DeleteExpense', ['$resource',function($resource){
        this.deleteexpense = function(){
            return $resource('http://127.0.0.1/AG_SADCeFarms/expense/:expense_guid',null, {'delete':{method:'DELETE'}});
        };
    }])



    //Service for adding Expenses
    .service('AddExpense', ['$resource', function($resource) {

        this.addexpense = function(){

            return $resource('http://127.0.0.1/AG_SADCeFarms/expense/:expense_guid', null, {'save':{method:'POST'}});
        };
    }])

    //Get grant type services here
    .service('GetGranttype', ['$resource',function($resource){
        this.getgranttype = function(){
            return $resource('http://127.0.0.1/AG_SADCeFarms/granttype',{method:'GET'});

        };
    }])


    //Funds Payments History
    .service('GetPaymentsHistory', ['$resource',function($resource){
        this.getpaymentshistory = function(guid){
            return $resource('http://127.0.0.1/AG_SADCeFarms/payment/?fund_guid='+guid,{method:'GET'});

        };
    }])






    // Transaction types
    .service('GetTransactiontype', ['$resource',function($resource){
        this.gettransactiontype = function(guid){
            return $resource('http://127.0.0.1/AG_SADCeFarms/transactiontype',{method:'GET'});

        };
    }])

     //Appropriations Payments History
    .service('GetAppropPayHistory', ['$resource',function($resource){
        this.getapproppayhistory = function(appropguid){
            return $resource('http://127.0.0.1/AG_SADCeFarms/payment/?appropriation_guid='+appropguid,{method:'GET'});

        };
    }])

     // service for adding new fund
     .service('AddTrans', ['$resource', function($resource) {

        this.addtrans = function(){

            return $resource('http://127.0.0.1/AG_SADCeFarms/fundtrans/:fund_transaction_guid', null, {'save':{method:'POST'}});
        };

    }])


    // service for adding new fund
     .service('GetTransferStatus', ['$resource', function($resource) {

        this.gettransferstatus = function(){

            return $resource('http://127.0.0.1/AG_SADCeFarms/transferstatus',{method:'GET'});
        };

    }])


    //expense service
    .service('GetExpense', ['$resource',function($resource){
        var expenseData = {};
        this.getexpense = function(){
            return $resource('http://127.0.0.1/AG_SADCeFarms/expense',{method:'GET'});

        };
        this.setExpense = function(exp){
            expenseData = exp;
        };
        this.getExpense = function(){
                return expenseData;
        };
    }])



      //Service for Get Expenses based on guid   here
    .service('GetExpenseData', ['$resource',function($resource){
        this.getexpensedata = function(expguid){
            return $resource('http://127.0.0.1/AG_SADCeFarms/expense/'+expguid,{method:'GET'});

        };
    }])


      //Service for Get Reappropriations based on guid   here
    .service('GetReapproprData', ['$resource',function($resource){
        this.getreappropdata = function(reapguid){
            return $resource('http://127.0.0.1/AG_SADCeFarms/reappropriation/'+reapguid,{method:'GET'});

        };
    }])




     //Service for Get Payment   here
    .service('GetPayment', ['$resource',function($resource){
        this.getpayment = function(){
            return $resource('http://127.0.0.1/AG_SADCeFarms/payment',{method:'GET'});

        };
    }])

    //Service for Get Payment   here using payment_guid
    .service('GetPaymentInfo', ['$resource',function($resource){
        this.getpaymentinfo = function(payID){
            return $resource('http://127.0.0.1/AG_SADCeFarms/payment/'+payID,{method:'GET'});

        };
    }])


     // services for updating Payment
     .service('UpdatePayment', ['$resource', function($resource) {

        this.updatepayment = function(){

            return $resource('http://127.0.0.1/AG_SADCeFarms/payment/:guid', null, {'update':{method:'PUT'}});
        };

    }])





    //Modal services
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