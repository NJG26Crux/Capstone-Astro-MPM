(function() {
  'use strict';

  angular.module('app').component('project', {
    controller,
    templateUrl: '/js/components/project.template.html'
  })

  function controller(projects, $http, $stateParams){
    const vm = this;

    console.log('here @ component.project');
    console.log('$stateParams.id: ', $stateParams.id);
    // console.log(projectId);

    vm.$onInit = function() {
      // vm.project = projectsService.findById($stateParams.id)
      $http.get('/api/projects/' + $stateParams.id)
        .then(project => {
            console.log(project.data);
            vm.project = project.data;
        })

    }
  }
}());
