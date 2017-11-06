(function() {
  'use strict';

  angular.module('app')
    .service('projects', function () {
      const vm = this;
      vm.projects = [];
      console.log('@ service.projets');

      // vm.getProjects = function() {
        // console.log("@ service.projects.getProjects");
        // $http.get('/api/projects')
        // .then((projects) => {
        //   if (projects) {
        //     vm.projects = projects;
        //     console.log('services.projects: ', projects);
        //   } else {
        //     console.log('no Projects');
        //   }
        // })
        // .catch((err) => {
        //   console.log(err);
        // })
      // }
    });

}());
