(function() {
  'use strict';

  angular.module('app')

  .component('newProject', {controller,
    templateUrl: '/js/components/newProject.template.html'
  })

  controller.$inject=['$http','aladinServ'];
  function controller($http, aladinServ){
    const vm = this;
    vm.showHints = true;

    vm.proj = {};

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

    vm.updateAladin = function() {
      console.log('@ new.Proj.updateAladin.fun');
      aladinServ.aladin.setFov(vm.aladin.fov) //<FoV-in-degrees>
      aladinServ.aladin.gotoObject(vm.aladin.catName) //.gotoObject .animateTo
      delete vm.aladin;
      // vm.aladinForm.$setPristine();
    }

  }
}());
