angular.module('app', ['ui.router','ngMaterial'])  // , require('angular-material-data-table') //move this to new file called app.module.js and ref it first
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
      .state({
        name: 'projects',
        url: '/projects',
        component: 'projects',
        parent: 'root'
      })
      .state({
        name: 'project',
        url: '/projects/project',
        component: 'project',
        parent: 'root'
      })
      .state({
        name: 'newProject',
        url: '/projects/newProject',
        component: 'newProject',
        parent: 'root'
      })

  }
