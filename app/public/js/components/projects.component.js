(function() {
  'use strict';

  angular.module('app').component('projects', { // 'sampleController',
    controller,
    templateUrl: '/js/components/projects.template.html'
  })
  controller.$inject = ['projects', '$http', '$scope','$state', 'auth'] // '$nutrition', '$scope',

  function controller(projects, $http, $scope, $state, auth){ // $nutrition,
    console.log('@ component.projects')
    const vm = this;

    vm.selected = [];

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

    vm.showProject = function(projectId, admin_user_id) {
      console.log('@ fun.showProj projectId: ', projectId);

      // $http.get('/api/projects/contributors/' + projectId)
      //   .then(contributors => {
      //     console.log(contributors.data);
      //     vm.contributors = contributors.data;
      //   })

      console.log(auth.user.id, admin_user_id)

      if (auth.user.id === admin_user_id) {
        $state.go('projectAdmin', {id: projectId})
      } else if (false) {

      }else {
        $state.go('project', {id: projectId})
      }
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
