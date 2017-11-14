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




    vm.proj.name = 'test';
    vm.proj.object = 'test';
    vm.proj.admin_user_id = 1;
    vm.proj.cells = 4;
    vm.proj.cells_w = 2;
    vm.proj.cells_h = 2;
    vm.proj.uncom_cells = 3;
    vm.proj.tel_ota = 'test';
    vm.proj.ota = 'Refractor';
    vm.proj.tel_obj = 130;
    vm.proj.focal_length = 2040;
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

    let firstCenterRaDec = []
    let baseCenterRaDec = [];
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
      vm.proj.fov_w = (vm.proj.img_sz_w * 3438 / vm.proj.focal_length / 60 * .8);
      vm.proj.fov_h = (vm.proj.img_sz_h * 3438 / vm.proj.focal_length / 60 * .8);
      // add Focal Ratio
      vm.proj.cells = (vm.aladin.col * 2);
      vm.proj.uncom_cells = 0;

      let newCells = []
      // baseCenterRaDec [x, y] i.e. [0] [1]
      if (vm.aladin.col % 2 === 0) {
        firstCenterRaDec[0] = baseCenterRaDec[0] - ((vm.proj.fov_w / 2) + (vm.proj.fov_w * ((vm.aladin.col/ 2) - 1)))
        firstCenterRaDec[1] = baseCenterRaDec[1] + ((vm.proj.fov_h / 2) + (vm.proj.fov_h * ((vm.aladin.col / 2) - 1)))
      } else {
        firstCenterRaDec[0] = baseCenterRaDec[0] - (vm.proj.fov_w * ((vm.aladin.col / 2) - .5))
        firstCenterRaDec[1] = baseCenterRaDec[1] + (vm.proj.fov_h * ((vm.aladin.col / 2) - .5))
      }

      console.log('vm.proj.fov_w: ', vm.proj.fov_w);
      console.log('vm.proj.fov_h: ', vm.proj.fov_h);
      console.log('firstCenterRaDec: ', firstCenterRaDec);
      console.log('baseCenterRaDec: ', baseCenterRaDec);
      for (let i=0; i<vm.aladin.col; i++) {
        for (let j=0; j<vm.aladin.col; j++) {
        let newObj = {}
        newObj = {cell: (String.fromCharCode(65+i) + (j+1)), centerRa: (firstCenterRaDec[0] + (vm.proj.fov_h * i)).toFixed(5), centerDec: (firstCenterRaDec[1] - (vm.proj.fov_h * j)).toFixed(5)}
        newCells.push(newObj)
        }
      }

      console.log(newCells);

      $http.post('/api/projects', vm.proj)
        .then(project => {
          console.log('vm.proj: ', vm.proj);
          // delete vm.proj

          return $http.post('/api/projects/:id/cells', newCells)
        })
        .then(() => {

        })
        .catch(() => {

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
      // else if (vm.aladin.RaDecName) {
      //   const [ra, dec] = vm.aladin.aladin.RaDec.split(',')
      //   aladinServ.aladin.gotoRaDec(parseInt(ra.trim()), parseInt(dec.trim()));
      // }

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
      baseCenterRaDec = aladinServ.aladin.getRaDec()
      // console.log('ShareURL: ', aladinServ.aladin.getShareURL());
      // console.log('EmbedCode(): ', aladinServ.aladin.getEmbedCode());
    }

  }
}());
