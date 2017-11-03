(function() {
  'use strict';

  angular.module('app')
    .service('projects', function () {
      const vm = this;
      vm.projects = {};

      vm.getProjects = function() {
        $http.get('/projects')
        .then((projects) => {
          if (projects) {
            vm.projects = projects;
          } else {
            console.log('no Projects');
          }
        })
        .catch((err) => {
          console.log(err);
        })
      }
    });

}());
