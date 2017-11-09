(function() {
  'use strict';

  angular.module('app').component('projectAdmin', {
    controller,
    templateUrl: '/js/components/project.admin.template.html'
  })

  function controller(projects, $http, $stateParams){
    const vm = this;

    console.log('@ component.project.admin');
    console.log('$stateParams.id: ', $stateParams.id);
    // console.log(projectId);

    vm.$onInit = function() {
      // vm.project = projectsService.findById($stateParams.id)
      $http.get('/api/projects/' + $stateParams.id)
        .then(project => {
            console.log(project.data);
            vm.project = project.data;
        })

      $http.get('/api/projects/contributors/' + $stateParams.id)
        .then(contributors => {
          console.log(contributors.data);
          vm.contributors = contributors.data;
        })

        $http.get('/api/project/cells/' + $stateParams.id)
          .then(cells => {
            console.log(cells.data);
            vm.cells = cells.data;
          })

    }
  }
}());
