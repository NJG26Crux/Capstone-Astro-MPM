angular.module('app', ['ui.router','ngMaterial', 'md.data.table'])  // , require('angular-material-data-table') //move this to new file called app.module.js and ref it first
.config(config)
// angular.module('myApp', ['ngMaterial', 'md.data.table']);

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
        url: '/projects/:id',
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
