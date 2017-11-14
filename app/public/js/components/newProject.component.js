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
    vm.aladin = {};
    vm.setHeight = 420;
    vm.proj.img_sz_w = 23.6;
    vm.proj.img_sz_h = 15.8;
    vm.proj.focal_length = 2040;
    let currentRaDec = []
    let newRa = 0;
    let newDec = 0;
    let currentFOV = [];
    let DataURL = '';
    let ShareURL = '';
    let EmbedCode = '';

    vm.$onInit = function() {
      vm.aladin.col = 1;
      vm.aladin.row = 1;
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
          // delete vm.proj
        })
    }

    vm.updateAladin = function() {
      vm.setHeight = Math.round(600 / (vm.proj.img_sz_w * 3438 / vm.proj.focal_length / 60) * (vm.proj.img_sz_h * 3438 / vm.proj.focal_length / 60) * (vm.aladin.row / vm.aladin.col));
      console.log('vm.setHeight: ', vm.setHeight);
      const fovSensorW = (vm.proj.img_sz_w * 3438 / vm.proj.focal_length / 60) * vm.aladin.col; // * aladinServ.aladin.row
      const fovSensorH = (vm.proj.img_sz_h * 3438 / vm.proj.focal_length / 60) * vm.aladin.col; // * aladinServ.aladin.row
      console.log('@ new.Proj.updateAladin.fun vm.aladin: ', vm.aladin);
      console.log('getFov: ',aladinServ.aladin.getFov());
      aladinServ.aladin.setFov(fovSensorW  || aladinServ.aladin.getFov()); //<FoV-in-degrees> 
      if (vm.aladin.catName) {
        aladinServ.aladin.gotoObject(vm.aladin.catName);  //.gotoObject .animateTo
      }
      // aladinServ.aladin.getViewDataURL();
      // delete vm.aladin;
      // vm.aladinForm.$setPristine();
    }

    vm.moveUp = function() {
      console.log('RaDec: ', aladinServ.aladin.getRaDec());
      currentRaDec = aladinServ.aladin.getRaDec();
      console.log('FOV: ', aladinServ.aladin.getFov());
      currentFOV = aladinServ.aladin.getFov();
      newRa = currentRaDec[0];
      newDec = parseFloat(currentRaDec[1] + (currentFOV[0] / 20)).toFixed(5);
      console.log('currentRaDec[0]: ', currentRaDec[0]);
      console.log('currentRaDec[1]: ', currentRaDec[1]);
      console.log('currentRaDec after math: ', currentRaDec);
      console.log('currentRaDec[1]: ', currentRaDec[1]);
      aladinServ.aladin.animateToRaDec(newRa, newDec, .2); //animateToRaDec gotoRaDec
    }

    vm.moveDown = function() {
      console.log('RaDec: ', aladinServ.aladin.getRaDec());
      currentRaDec = aladinServ.aladin.getRaDec();
      console.log('FOV: ', aladinServ.aladin.getFov());
      currentFOV = aladinServ.aladin.getFov();
      newRa = currentRaDec[0];
      newDec = parseFloat(currentRaDec[1] - (currentFOV[0] / 20)).toFixed(5);
      console.log('currentRaDec[0]: ', currentRaDec[0]);
      console.log('currentRaDec[1]: ', currentRaDec[1]);
      console.log('currentRaDec after math: ', currentRaDec);
      console.log('currentRaDec[1]: ', currentRaDec[1]);
      aladinServ.aladin.animateToRaDec(newRa, newDec, .2);
    }

    vm.moveLeft = function() {
      console.log('RaDec: ', aladinServ.aladin.getRaDec());
      currentRaDec = aladinServ.aladin.getRaDec();
      console.log('FOV: ', aladinServ.aladin.getFov());
      currentFOV = aladinServ.aladin.getFov();
      newRa = parseFloat(currentRaDec[0] + (currentFOV[0] / 20)).toFixed(5);
      newDec = currentRaDec[1];
      console.log('currentRaDec[0]: ', currentRaDec[0]);
      console.log('currentRaDec[1]: ', currentRaDec[1]);
      console.log('currentRaDec after math: ', currentRaDec);
      console.log('currentRaDec[1]: ', currentRaDec[1]);
      aladinServ.aladin.animateToRaDec(newRa, newDec, .2);
    }

    vm.moveRight = function() {
      console.log('RaDec: ', aladinServ.aladin.getRaDec());
      currentRaDec = aladinServ.aladin.getRaDec();
      console.log('FOV: ', aladinServ.aladin.getFov());
      currentFOV = aladinServ.aladin.getFov();
      newRa = parseFloat(currentRaDec[0] - (currentFOV[0] / 20)).toFixed(5);
      newDec = currentRaDec[1];
      console.log('currentRaDec[0]: ', currentRaDec[0]);
      console.log('currentRaDec[1]: ', currentRaDec[1]);
      console.log('currentRaDec after math: ', currentRaDec);
      console.log('currentRaDec[1]: ', currentRaDec[1]);
      aladinServ.aladin.animateToRaDec(newRa, newDec, .2);
    }

    vm.grabImage = function() {
      console.log('DataURL:', aladinServ.aladin.getViewDataURL());
      vm.dataURL = aladinServ.aladin.getViewDataURL()
      // console.log('ShareURL: ', aladinServ.aladin.getShareURL());
      // console.log('EmbedCode(): ', aladinServ.aladin.getEmbedCode());
    }

  }
}());
