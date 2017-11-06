(function() {
  'use strict';

  angular.module('app').component('projects', { // 'sampleController',
    controller,
    templateUrl: '/js/components/projects.template.html'
  })
  // controller.$inject = ['projects', '$scope', '$http'] // '$nutrition',

  function controller(projects, $http, $scope){ // $nutrition,
    console.log('@ component.projects')
    const vm = this;

    vm.$onInit = function() {
      console.log("@ service.projects.getProjects");

      $http.get('/api/projects')
        .then((projects) => {
          if (projects) {
            console.log('component.projects: ', projects);
            vm.projects = projects.data;
            console.log('component.vm.projects: ', vm.projects);
          } else {
            console.log('no Projects');
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }

    vm.showProject = function(projectId) {
      console.log('@ fun.showProj projectId: ', projectId);
      $state.go(project, {id: projectId})
    }
  }
}());


// Assume we have a $nutrition service that provides an API for communicating with the server

// angular.module('demoApp').controller('sampleController', ['$nutrition', '$scope', function ($nutrition, $scope) {
//   'use strict';
//
//   $scope.selected = [];
//
//   $scope.query = {
//     order: 'name',
//     limit: 5,
//     page: 1
//   };
//
//   function success(desserts) {
//     $scope.desserts = desserts;
//   }
//
//   $scope.getDesserts = function () {
//     $scope.promise = $nutrition.desserts.get($scope.query, success).$promise;
//   };
//
// }]);
//**********************************************************************
// vm.projests = projects.projects;
// vm.footer = false;

// $scope.selected = [];

// $scope.query = {
//   order: 'name',
//   limit: 5,
//   page: 1
// };

// function success(desserts) {
//   $scope.desserts = desserts;
// }

// $scope.getDesserts = function () {
//   $scope.promise = $nutrition.desserts.get($scope.query, success).$promise;
// };
