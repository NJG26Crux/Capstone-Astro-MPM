(function() {
  'use strict';

  angular.module('app')

  .component('newProject', {controller,
    templateUrl: '/js/components/newProject.template.html'
  })

  controller.$inject=['$http','aladinServ','projServ'];
  function controller($http, aladinServ, projServ){
    const vm = this;
    vm.showHints = true;

    vm.proj = projServ;
    vm.aladin = {};
    vm.setHeight = 420;




    vm.proj.name = 'test';
    vm.proj.object = 'test';
    vm.proj.admin_user_id = 1;
    vm.proj.cells = 1;
    vm.proj.cells_w = 1;
    vm.proj.cells_h = 1;
    vm.proj.uncom_cells = 1;
    vm.proj.tel_ota = 'test';
    vm.proj.ota = 'Refractor';
    vm.proj.tel_obj = 130;
    vm.proj.focal_length = 540; //2040
    vm.proj.focal_ratio = 7;
    vm.proj.img_sensor = 'test';
    vm.proj.cam = 'DSLR';
    vm.proj.img_array_w = 3872;
    vm.proj.img_array_h = 2592;
    vm.proj.pix_sz = 6.10;
    vm.proj.img_sz_w = 23.6;
    vm.proj.img_sz_h = 15.8;
    vm.proj.fov_w = 5349.68;
    vm.proj.fov_h = 3581.40;
    vm.proj.target_exp = 300;
    vm.proj.total_exposures = 72;


  }
}());
