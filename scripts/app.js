(function () {
    'use strict';
}());

angular.module('agSADCeFarms', ['ui.router', 'ui.grid', 'ui.grid.selection', 'ui.grid.expandable',
    'ui.grid.saveState', 'ngResource', 'ui.bootstrap', 'ui.grid.pagination', 'ui.grid.pinning', 'ui.mask', 'angular-clipboard', 'esri.map','ngSanitize'])
    .config( ['$stateProvider', '$urlRouterProvider', '$logProvider', function($stateProvider, $urlRouterProvider, $logProvider) {
        // Do allow debugging via $log
        $logProvider.debugEnabled(true);
        $stateProvider
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                        controller  : 'HeaderController'
                    },
                    'content': {
                        templateUrl : 'views/home.html'
                        //controller  : 'UserAdminController'
                    }
                }
            })
            .state('app.home', {
                url:'home',
                views: {
                    'content@': {
                        templateUrl: 'views/home.html'
                        //controller  : 'PreregisterController'
                    }
                }
            })
            .state('app.mapping', {
                url:'map',
                views: {
                    'content@': {
                        templateUrl: 'views/mapping/mapbase.html',
                        controller  : 'MapController',
                        controllerAs: 'appMapCtrl'
                    }
                }
            })
            .state('app.about', {
                url:'about',
                views: {
                    'content@': {
                        templateUrl: 'views/about.html'
                        //controller  : 'PreregisterController'
                    }
                }
            })
            .state('app.workflows', {
                url:'workflows',
                views: {
                    'content@': {
                        templateUrl: 'views/workflows/workflows.html',
                        controller  : 'WorkflowQuestionController'
                    }
                }
            })

            //route for finance portal
            .state('app.finance', {
                url:'finance',
                views: {
                    'content@': {
                        templateUrl: 'views/finance/finance.html',
                        controller  : 'FinanceController'
                    },
                    'financeCommands@app.finance': {
                        templateUrl: 'views/finance/commands.html',
                        controller  : 'FinanceController'
                    }
                    //'dashboardContent@app.mydashboard': {
                    //    templateUrl: 'views/mydashboard/myaccount.html'
                    //
                    //}
                }
            })
            .state('app.finance.funds', {
                url:'/funds',
                views: {
                    'financeContent@app.finance': {
                        templateUrl: 'views/finance/funds.html',
                        controller  : 'FinanceController'
                    }
                }
            })
             .state('app.finance.appropriations', {
                url:'/appropriations',
                views: {
                    'financeContent@app.finance': {
                        templateUrl: 'views/finance/appropriations.html',
                        controller  : 'FinanceController'
                    }
                }
            })

            .state('app.finance.reappropriations', {
                url:'/reappropriations',
                views: {
                    'financeContent@app.finance': {
                        templateUrl: 'views/finance/reappropriations.html',
                        controller  : 'FinanceController'
                    }
                }
            })
             .state('app.finance.grants', {
                url:'/grants',
                views: {
                    'financeContent@app.finance': {
                        templateUrl: 'views/finance/grants.html',
                        controller  : 'FinanceController'
                    }
                }
            })

            .state('app.finance.pools', {
                url:'/pools',
                views: {
                    'financeContent@app.finance': {
                        templateUrl: 'views/finance/pools.html',
                        controller  : 'FinanceController'
                    }
                }
            })

             .state('app.finance.expenses', {
                url:'/expenses',
                views: {
                    'financeContent@app.finance': {
                        templateUrl: 'views/finance/expenses.html',
                        controller  : 'FinanceController'
                    }
                }
            })

             .state('app.finance.payments', {
                url:'/payments',
                views: {
                    'financeContent@app.finance': {
                        templateUrl: 'views/finance/payments.html',
                        controller  : 'FinanceController'
                    }
                }
            })

             .state('app.finance.reports', {
                url:'/reports',
                views: {
                    'financeContent@app.finance': {
                        templateUrl: 'views/finance/reports.html',
                        controller  : 'FinanceController'
                    }
                }
            })
            .state('app.finance.grantdetail', {
                url:'/grantdetail/:partner_grant_guid',
                views: {
                    'financeContent@app.finance': {
                        templateUrl: 'views/finance/grantdetail.html',
                        controller  : 'FinanceController'
                    }
                }
            })
            .state('app.finance.newcompetitivepool', {
                url:'/newcompetitivepool',
                views: {
                    'financeContent@app.finance': {
                        templateUrl: 'views/finance/newcompetitivepool.html',
                        controller  : 'FinanceController'
                    }
                }
            })
            .state('app.finance.pooldetails', {
                url:'/pooldetails/:competitive_pool_guid',
                views: {
                    'financeContent@app.finance': {
                        templateUrl: 'views/finance/pooldetails.html',
                        controller  : 'FinanceController'
                    }
                }
            })
              .state('app.finance.funddetail', {
                url:'/funddetail/:fund_guid',
                views: {
                    'financeContent@app.finance': {
                        templateUrl: 'views/finance/funddetail.html',
                        controller  : 'FinanceController'
                    }
                }
            })

            .state('app.finance.appropdetail', {
                url:'/appropdetail/:appropriation_guid',
                views: {
                    'financeContent@app.finance': {
                        templateUrl: 'views/finance/appropdetail.html',
                        controller  : 'FinanceController'
                    }
                }
            })
            .state('app.finance.paydetail', {
                url:'/paydetail/:expense_payment_guid',
                views: {
                    'financeContent@app.finance': {
                        templateUrl: 'views/finance/paydetail.html',
                        controller  : 'FinanceController'
                    }
                }
            })

            .state('app.finance.reappropdetails', {
                url:'/reappropdetails/:reappropriation_guid',
                views: {
                    'financeContent@app.finance': {
                        templateUrl: 'views/finance/reappropdetails.html',
                        controller  : 'FinanceController'
                    }
                }
            })
            .state('app.finance.fundreapdetails', {
                url:'/fundreapdetails/:fund_guid',
                views: {
                    'financeContent@app.finance': {
                        templateUrl: 'views/finance/fundreapdetails.html',
                        controller  : 'FinanceController'
                    }
                }
            })
            .state('app.finance.expensedetail',{
               url:'/expensedetail/:expense_guid',
               views: {
                    'financeContent@app.finance':{
                        templateUrl:'views/finance/expensedetail.html',
                        controller  : 'FinanceController'
                    }
               }
            })

            .state('app.finance.paymentdetail',{
               url:'/paymentdetail/:expense_payment_guid',
               views: {
                    'financeContent@app.finance':{
                        templateUrl:'views/finance/paymentdetail.html',
                        controller  : 'FinanceController'
                    }
               }
            })
                //route for farm portal
            .state('app.farm', {
                url:'farm/:farm_guid',
                views: {
                    'content@': {
                        templateUrl: 'views/farm/farm.html',
                        controller  : 'FarmController'
                    },
                    'farmCommands@app.farm': {
                        templateUrl: 'views/farm/commands.html',
                        controller  : 'FarmController'
                    },
                    'farmContent@app.farm': {
                        templateUrl: 'views/farm/information.html',
                        controller  : 'FarmInfoController',
                        controllerAs: 'FICtrl'

                    }
                }
            })
         .state('app.farm.information', {
                url:'/information',
                views: {
                    'farmContent@app.farm': {
                        templateUrl: 'views/farm/information.html',
                        controller  : 'FarmInfoController',
                        controllerAs: 'FICtrl'

                    }
                }
            })
         .state('app.farm.contacts', {
                url:'/contacts',
                views: {
                    'farmContent@app.farm': {
                        templateUrl: 'views/farm/contacts.html',
                        controller  : 'FarmContactsController',
                        controllerAs : 'FCC'
                    }
                }
            })
         .state('app.farm.applications', {
                url:'/applications',
                views: {
                    'farmContent@app.farm': {
                        templateUrl: 'views/farm/applications.html',
                        controller  : 'FarmApplicationsCtrl',
                        controllerAs : 'FAC'
                    }
                }
            })
         .state('app.farm.notes_documents', {
                url:'/notes_documents',
                views: {
                    'farmContent@app.farm': {
                        templateUrl: 'views/farm/notes_documents.html',
                        controller  : 'FarmNotesAndDocumentsCtrl'
                        ,controllerAs : 'FNADC'
                    }
                }
            })
         .state('app.farm.map', {
                url:'/map',
                views: {
                    'farmContent@app.farm': {
                        templateUrl: 'views/farm/map.html',
                        controller  : 'FarmController'
                    }
                }
            })
             //route for application portal
             .state('app.application', {
                url:'application/:GUID',
                params:{'GUID':'d3e48b84-af47-4767-b2b2-bbed7ee1bde3'},
                //abstract: true,
                default: '.appinfo',
                views: {
                    'content@': {
                        templateUrl: 'views/application/application.html',
                        controller  : 'AppDashboardController'
                    },
                    'applicationContent@app.application': {
                        templateUrl: 'views/application/appinfo.html',
                        controller  : 'AppInfoController'
                    },
                    'applicationCommands@app.application': {
                        templateUrl: 'views/application/commands.html',
                        controller  : 'AppDashboardController'
                    }
                }
            })
         .state('app.application.appinfo', {
                url:'/appinfo',
                views: {
                    'applicationContent@app.application': {
                        templateUrl: 'views/application/appinfo.html',
                        controller  : 'AppInfoController'
                    }
                }
            })
         .state('app.application.viewedit', {
                url:'/questionnaire',
                views: {
                    'applicationContent@app.application': {
                        templateUrl: 'views/application/viewedit.html',
                        controller  : 'AppDashboardController'
                    }
                }
            })
         .state('app.application.apptasks', {
                url:'/apptasks',
                views: {
                    'applicationContent@app.application': {
                        templateUrl: 'views/application/apptasks.html',
                        controller  : 'AppTasksController'
                    }
                }
            })
         .state('app.application.todoitems', {
                 url:'/todoitems',
                views: {
                    'applicationContent@app.application': {
                        templateUrl: 'views/application/todoitems.html',
                        controller  : 'AppToDoItemsController'
                    }
                }
            })
         .state('app.application.appnotesdoc', {
                 url:'/notesdoc',
                views: {
                    'applicationContent@app.application': {
                        templateUrl: 'views/application/appnotesdoc.html',
                        controller  : 'AppNotesDocController'
                    }
                }
            })
            .state('app.application.map', {
                 url:'/map',
                views: {
                    'applicationContent@app.application': {
                        templateUrl: 'views/application/map.html',
                        controller  : 'AppMapController'
                    }
                }
            })

            //dashboard here
            .state('app.mydashboard', {
                url:'mydashboard',
                views: {
                    'content@': {
                        templateUrl: 'views/mydashboard/mydashboard.html',
                        controller  : 'MyDashboardController'
                    },
                    'dashboardCommands@app.mydashboard': {
                        templateUrl: 'views/mydashboard/commands.html'
                    }
                    //'dashboardContent@app.mydashboard': {
                    //    templateUrl: 'views/mydashboard/myaccount.html'
                    //
                    //}
                }
            })
            .state('app.mydashboard.myaccount', {
                url:'/myaccount',
                views: {
                    'dashboardContent@app.mydashboard': {
                        templateUrl: 'views/mydashboard/myaccount.html'
                    }
                }
            })
            .state('app.mydashboard.notifications', {
                url:'/notifications',
                views: {
                    'dashboardContent@app.mydashboard': {
                        templateUrl: 'views/mydashboard/notifications.html'
                    }
                }
            })
            .state('app.mydashboard.todo', {
                url:'/todo',
                views: {
                    'dashboardContent@app.mydashboard': {
                        templateUrl: 'views/mydashboard/todo.html'
                    }
                }
            })
            .state('app.mydashboard.currentapplication', {
                url:'/currentapplication',
                views: {
                    'dashboardContent@app.mydashboard': {
                        templateUrl: 'views/mydashboard/currentApplication.html'
                    }
                }
            })
            .state('app.mydashboard.calendar', {
                url:'/calendar',
                views: {
                    'dashboardContent@app.mydashboard': {
                        templateUrl: 'views/mydashboard/calendar.html'
                    }
                }
            })
            .state('app.planning', {
                url:'planning',
                views: {
                    'content@': {
                        templateUrl: 'views/planning.html'
                        //controller  : 'PreregisterController'
                    }
                }
            })
            .state('app.acquisitions', {
                url:'acquisitions',
                views: {
                    'content@': {
                        templateUrl: 'views/acquisitions.html'
                        //controller  : 'PreregisterController'
                    }
                }
            })
            .state('app.stewardship', {
                url:'stewardship',
                views: {
                    'content@': {
                        templateUrl: 'views/stewardship.html'
                        //controller  : 'PreregisterController'
                    }
                }
            })
            .state('app.reports', {
                url:'reports',
                views: {
                    'content@': {
                        templateUrl: 'views/reports.html'
                        //controller  : 'PreregisterController'
                    }
                }
            })
            //.state('app.userinfo', {
            //    url:'userinfo',
            //    views: {
            //        'content@': {
            //            templateUrl: 'views/userinfo.html'
            //            //controller  : 'PreregisterController'
            //        }
            //    }
            //})
            //.state('app.logout', {
            //    url:'logout',
            //    views: {
            //        'content@': {
            //            templateUrl: 'views/logout.html'
            //            //controller  : 'PreregisterController'
            //        }
            //    }
            //})
            .state('app.manageusers', {
                url:'manageusers',
                views: {
                    'content@': {
                        templateUrl : 'views/authadmin/useradmin.html',
                        controller  : 'UserAdminController'
                    }
                }
            })

            // route for the Admin Tasklist Management
            .state('app.tasklistmanager', {
                url:'todomanager',
                views: {
                    'content@': {
                        templateUrl : 'views/authadmin/todomanager.html'
                        //controller  : 'UserAdminController'
                    }
                }
            })

            // route for the pre-register page
            .state('app.preregister', {
                url:'preregister',
                views: {
                    'content@': {
                        templateUrl: 'views/authadmin/preregister.html',
                        controller  : 'PreregisterController'
                    }
                }
            })

            .state('app.register', {
                url:'register',
                views: {
                    'content@': {
                        templateUrl: 'views/authadmin/register.html',
                        controller  : 'RegisterController'
                    }
                }
            });
        $urlRouterProvider.otherwise('/');
    }])

;