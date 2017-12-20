(function() {
  'use strict';

  angular.module('app')

    .component('newProject2', {
      controller,
      templateUrl: '/js/components/newProject2.template.html'
    })

  controller.$inject = ['$http', 'aladinServ', 'projServ'];

  function controller($http, aladinServ, projServ) {
    const vm = this;
    vm.showHints = true;

    // projServ = {};
    vm.aladin = {};
    vm.setHeight = 420;

    console.log('@ Proj2 projServ: ', projServ);

    vm.proj = projServ;

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
      vm.proj.aladin_height = (Math.round(600 / (vm.proj.img_sz_w * 3438 / vm.proj.focal_length / 60) * (vm.proj.img_sz_h * 3438 / vm.proj.focal_length / 60)) + 'px')
    }

    vm.addProject = function() {
      vm.proj.admin_user_id = 1; //***** This needs to be changed
      vm.proj.fov_w = (vm.proj.img_sz_w * 3438 / vm.proj.focal_length / 60 * .8);
      vm.proj.fov_h = (vm.proj.img_sz_h * 3438 / vm.proj.focal_length / 60 * .8);
      // add Focal Ratio
      // vm.proj.cells = (vm.aladin.col * 2);
      vm.proj.uncom_cells = 0;
      vm.proj.imgMosiac = vm.dataURL;

      $http.post('/api/projects', projServ)
        .then(project => {
          const proj_id = project.data.id;
          for (const cell of newCells)(
            cell.proj_id = proj_id
          )
          // delete projServ

          return $http.post('/api/projects/:id/cells', newCells)
        })
        .then(() => {

        })
        .catch(() => {

        })
    }

    vm.updateAladin = function() {
      vm.setHeight = Math.round(1200 / (vm.proj.img_sz_w * 3438 / vm.proj.focal_length / 60) * (vm.proj.img_sz_h * 3438 / vm.proj.focal_length / 60) * (vm.aladin.row / vm.aladin.col));
      // console.log('vm.setHeight: ', vm.setHeight);
      const fovSensorW = (vm.proj.img_sz_w * 3438 / vm.proj.focal_length / 60 * .8) * vm.aladin.col; // ***************** sets FOV
      // const fovSensorH = (vm.proj.img_sz_h * 3438 / vm.proj.focal_length / 60) * vm.aladin.col; // * aladinServ.aladin.row
      // console.log('@ new.Proj.updateAladin.fun vm.aladin: ', vm.aladin);
      // console.log('getFov: ',aladinServ.aladin.getFov());
      aladinServ.aladin.setFov(fovSensorW || aladinServ.aladin.getFov()); //<FoV-in-degrees>
      if (vm.aladin.catName) {
        // console.log('catName: ', vm.aladin.catName);
        aladinServ.aladin.gotoObject(vm.aladin.catName); //.gotoObject .animateTo
        vm.aladin.catName = '';
      }
      else if (vm.aladin.RaDec) {
        const [ra, dec] = vm.aladin.RaDec.split(',')
        // console.log('ra dec: ', [ra, dec]);
        aladinServ.aladin.gotoRaDec(ra.trim(), dec.trim());
        // console.log('ra: ', ra.trim(), 'dec: ', dec.trim());
      }

    }

    vm.moveUp = function() {

      currentRaDec = aladinServ.aladin.getRaDec();
      currentFOV = aladinServ.aladin.getFov();
      newRa = currentRaDec[0];
      newDec = parseFloat(currentRaDec[1] + (currentFOV[0] / 20)).toFixed(5);
      aladinServ.aladin.animateToRaDec(newRa, newDec, .2);
    }

    vm.moveDown = function() {
      currentRaDec = aladinServ.aladin.getRaDec();
      currentFOV = aladinServ.aladin.getFov();
      newRa = currentRaDec[0];
      newDec = parseFloat(currentRaDec[1] - (currentFOV[0] / 20)).toFixed(5);
      aladinServ.aladin.animateToRaDec(newRa, newDec, .2);
    }

    vm.moveLeft = function() {
      currentRaDec = aladinServ.aladin.getRaDec();
      currentFOV = aladinServ.aladin.getFov();
      newRa = parseFloat(currentRaDec[0] + (currentFOV[0] / 20)).toFixed(5);
      newDec = currentRaDec[1];
      aladinServ.aladin.animateToRaDec(newRa, newDec, .2);
    }

    vm.moveRight = function() {
      currentRaDec = aladinServ.aladin.getRaDec();
      currentFOV = aladinServ.aladin.getFov();
      newRa = parseFloat(currentRaDec[0] - (currentFOV[0] / 20)).toFixed(5);
      newDec = currentRaDec[1];
      aladinServ.aladin.animateToRaDec(newRa, newDec, .2);
    }

    // {{$ctrl.proj.img_sz_w * 3438 / $ctrl.proj.focal_length / 60 * .8}}


    // {{$ctrl.proj.img_sz_h * 3438 / $ctrl.proj.focal_length / 60 * .8}}

    vm.grabImage = function() {
      // console.log('DataURL:', aladinServ.aladin.getViewDataURL());

      // let fovSensorW = ((vm.proj.img_sz_w * 3438 / vm.proj.focal_length / 60 * .8) * vm.aladin.col) + (vm.proj.img_sz_w * 3438 / vm.proj.focal_length / 60 * .2);
      // aladinServ.aladin.setFov(fovSensorW);

      vm.proj.dataURL = aladinServ.aladin.getViewDataURL();

      vm.FOVW = vm.proj.img_sz_w * 3438 / vm.proj.focal_length / 60 * .8
      vm.FOVH = vm.proj.img_sz_h * 3438 / vm.proj.focal_length / 60 * .8
      vm.baseCenterRaDec = aladinServ.aladin.getRaDec()
      vm.BCRA = vm.baseCenterRaDec[0]
      vm.BCDec = vm.baseCenterRaDec[1]
      vm.proj.images = []
      vm.proj.cells = vm.aladin.col * vm.aladin.col
      vm.proj.cellsData = []

      for (let i=0; i<vm.aladin.col; i++) {
        const y = Math.round(804 * (((i * 2) + 1) / (vm.aladin.col * 2)));
        for (let j=0; j<vm.aladin.col; j++) {
          let newCell = {};
          const x = Math.round(1200 * (((j * 2) + 1) / (vm.aladin.col * 2)));
          let pix2world = [];
          pix2world = aladinServ.aladin.pix2world(x, y);
          newCell = {
            cell_num: (String.fromCharCode(65 + j) + (i + 1)),
            center_ref_ra: (pix2world[0]).toFixed(5),
            center_ref_dec: (pix2world[1]).toFixed(5)
          }
          vm.proj.cellsData.push(newCell);
        }
        console.log('vm.proj.cellsData: ', vm.proj.cellsData);
      }

      if (vm.aladin.col > 1) {
        var imageToSlices = window.imageToSlices;
        let heightSlice = [];
        let widthSlice = [];
        for (let k=1; k<vm.aladin.col; k++) {
          const heightPush = 804 * (k) / (vm.aladin.col)
          const widthPush = 1200 * (k) / (vm.aladin.col)
          heightSlice.push(heightPush);
          widthSlice.push(widthPush);
        }

        imageToSlices(vm.proj.dataURL, heightSlice, widthSlice, {
          saveToDataUrl: true
        }, function(dataUrlList) {
          vm.proj.images = dataUrlList;
          console.log('vm.proj.images: ', vm.proj.images);
        });
      }
      // console.log('vm.proj.dataURL: ', vm.proj.dataURL);
      // console.log('vm.proj.images: ', vm.proj.images);
    }

  }
}());
