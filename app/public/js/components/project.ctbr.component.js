(function() {
  'use strict';

  angular.module('app').component('projectCtbr', {
    controller,
    templateUrl: '/js/components/project.public.template.html'
  })

  function controller(projects, $http, $stateParams){
    const vm = this;

    console.log('here @ component.project.ctbr');
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
