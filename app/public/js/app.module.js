angular.module('app', ['ui.router','ngMaterial'])  // move this to new file called app.module.js and ref it first
.config(config)


function config($stateProvider, $urlRouterProvider, $locationProvider){

    $locationProvider.html5Mode(true)

    $stateProvider
      .state({
        component: 'root',
        name: 'root',
        abstract: true,
      })
      .state({
        name: 'home',
        url: '/',
        component: 'home',
        parent: 'root'
      })

  }
