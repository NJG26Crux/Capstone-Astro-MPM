angular.module('app', ['ui.router','ngMaterial', 'md.data.table'])  // , 'material.svgAssetsCache' // , require('angular-material-data-table') //move this to new file called app.module.js and ref it first
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
        name: 'projectAdmin',
        url: '/projects/:id/admin',
        component: 'projectAdmin',
        parent: 'root'
      })
      .state({
        name: 'projectCtbr',
        url: '/projects/:id',
        component: 'projectCtbr',
        parent: 'root'
      })
      .state({
        name: 'newProject',
        url: '/projects/newProject',
        component: 'newProject',
        parent: 'root'
      })
      .state({
        name: 'newProject2',
        url: '/projects/newProject2',
        component: 'newProject2',
        parent: 'root'
      })
      .state({
        name: 'newProject3',
        url: '/projects/newProject3',
        component: 'newProject3',
        parent: 'root'
      })

  }
