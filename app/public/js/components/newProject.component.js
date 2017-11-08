(function() {
  'use strict';

  angular.module('app')

  .component('newProject', {controller,
    templateUrl: '/js/components/newProject.template.html'
  })

  function controller($http){
    const vm = this
    vm.showHints = true;

    vm.proj = {
      // name: "default Name"
      // email: "",
      // social: "123456789",
      // phone: "N/A"
    }

    vm.addProject = function() {
      vm.proj.admin_user_id = 1; //***** This needs to be changed
      vm.proj.fov_w = (vm.proj.img_sz_w * 3438 / vm.proj.focal_length);
      vm.proj.fov_h = (vm.proj.img_sz_h * 3438 / vm.proj.focal_length);
      vm.proj.cells = (vm.proj.cells_w * vm.proj.cells_h);
      vm.proj.uncom_cells = 0;

      $http.post('/api/projects', vm.proj)
        .then(project => {
          console.log('vm.proj: ', vm.proj);
          delete vm.proj
        })
    }

  }
}());
