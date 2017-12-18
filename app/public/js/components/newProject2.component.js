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


    // vm.proj.name = 'test';
    // vm.proj.object = 'test';
    // vm.proj.admin_user_id = 1;
    // vm.proj.cells = 4;
    // vm.proj.cells_w = 2;
    // vm.proj.cells_h = 2;
    // vm.proj.uncom_cells = 3;
    // vm.proj.tel_ota = 'test';
    // vm.proj.ota = 'Refractor';
    // vm.proj.tel_obj = 130;
    // vm.proj.focal_length = 2040;
    // vm.proj.focal_ratio = 7;
    // vm.proj.img_sensor = 'test';
    // vm.proj.cam = 'DSLR';
    // vm.proj.img_array_w = 3872;
    // vm.proj.img_array_h = 2592;
    // vm.proj.pix_sz = 6.10;
    // vm.proj.img_sz_w = 23.6;
    // vm.proj.img_sz_h = 15.8;
    // vm.proj.fov_w = 5349.68;
    // vm.proj.fov_h = 3581.40;
    // vm.proj.target_exp = 300;
    // vm.proj.total_exposures = 72;

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
      console.log('vm.proj.aladin_height: ', vm.proj.aladin_height);
      console.log(typeof(vm.proj.aladin_height));
    }

    vm.addProject = function() {
      vm.proj.admin_user_id = 1; //***** This needs to be changed
      vm.proj.fov_w = (vm.proj.img_sz_w * 3438 / vm.proj.focal_length / 60 * .8);
      vm.proj.fov_h = (vm.proj.img_sz_h * 3438 / vm.proj.focal_length / 60 * .8);
      // add Focal Ratio
      vm.proj.cells = (vm.aladin.col * 2);
      vm.proj.uncom_cells = 0;
      vm.proj.imgMosiac = vm.dataURL;

      let newCells = []
      // baseCenterRaDec [x, y] i.e. [0] [1]
      if (vm.aladin.col % 2 === 0) {
        firstCenterRaDec[0] = baseCenterRaDec[0] - ((vm.proj.fov_w / 2) + (vm.proj.fov_w * ((vm.aladin.col / 2) - 1)))
        firstCenterRaDec[1] = baseCenterRaDec[1] + ((vm.proj.fov_h / 2) + (vm.proj.fov_h * ((vm.aladin.col / 2) - 1)))
      } else {
        firstCenterRaDec[0] = baseCenterRaDec[0] - (vm.proj.fov_w * ((vm.aladin.col / 2) - .5))
        firstCenterRaDec[1] = baseCenterRaDec[1] + (vm.proj.fov_h * ((vm.aladin.col / 2) - .5))
      }

      // console.log('vm.proj.fov_w: ', vm.proj.fov_w);
      // console.log('vm.proj.fov_h: ', vm.proj.fov_h);
      // console.log('firstCenterRaDec: ', firstCenterRaDec);
      // console.log('baseCenterRaDec: ', baseCenterRaDec);
      for (let i = 0; i < vm.aladin.col; i++) {
        for (let j = 0; j < vm.aladin.col; j++) {
          let newObj = {}
          newObj = {
            cell_num: (String.fromCharCode(65 + i) + (j + 1)),
            center_ref_ra: (firstCenterRaDec[0] + (vm.proj.fov_h * i)).toFixed(5),
            center_ref_dec: (firstCenterRaDec[1] - (vm.proj.fov_h * j)).toFixed(5)
          }
          newCells.push(newObj)
        }
      }

      // console.log(newCells);

      $http.post('/api/projects', projServ)
        .then(project => {
          // console.log('@ routes.project.post');
          // console.log('projServ: ', projServ);
          // console.log('project: ', project);
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
      vm.setHeight = Math.round(600 / (vm.proj.img_sz_w * 3438 / vm.proj.focal_length / 60) * (vm.proj.img_sz_h * 3438 / vm.proj.focal_length / 60) * (vm.aladin.row / vm.aladin.col));
      // console.log('vm.setHeight: ', vm.setHeight);
      const fovSensorW = (vm.proj.img_sz_w * 3438 / vm.proj.focal_length / 60 * .8) * vm.aladin.col; // * aladinServ.aladin.row
      const fovSensorH = (vm.proj.img_sz_h * 3438 / vm.proj.focal_length / 60) * vm.aladin.col; // * aladinServ.aladin.row
      // console.log('@ new.Proj.updateAladin.fun vm.aladin: ', vm.aladin);
      // console.log('getFov: ',aladinServ.aladin.getFov());
      aladinServ.aladin.setFov(fovSensorW || aladinServ.aladin.getFov()); //<FoV-in-degrees>
      if (vm.aladin.catName) {
        console.log('catName: ', vm.aladin.catName);
        aladinServ.aladin.gotoObject(vm.aladin.catName); //.gotoObject .animateTo
      }
      else if (vm.aladin.RaDec) {
        const [ra, dec] = vm.aladin.RaDec.split(',')
        console.log('ra dec: ', [ra, dec]);
        aladinServ.aladin.gotoRaDec(ra.trim(), dec.trim());
        console.log('ra: ', ra.trim(), 'dec: ', dec.trim());
      }

      // aladinServ.aladin.getViewDataURL();
      // delete vm.aladin;
      // vm.aladinForm.$setPristine();
    }

    vm.moveUp = function() {
      // console.log('RaDec: ', aladinServ.aladin.getRaDec());
      currentRaDec = aladinServ.aladin.getRaDec();
      // console.log('FOV: ', aladinServ.aladin.getFov());
      currentFOV = aladinServ.aladin.getFov();
      newRa = currentRaDec[0];
      newDec = parseFloat(currentRaDec[1] + (currentFOV[0] / 20)).toFixed(5);
      // console.log('currentRaDec[0]: ', currentRaDec[0]);
      // console.log('currentRaDec[1]: ', currentRaDec[1]);
      // console.log('currentRaDec after math: ', currentRaDec);
      // console.log('currentRaDec[1]: ', currentRaDec[1]);
      aladinServ.aladin.animateToRaDec(newRa, newDec, .2); //animateToRaDec gotoRaDec
    }

    vm.moveDown = function() {
      // console.log('RaDec: ', aladinServ.aladin.getRaDec());
      currentRaDec = aladinServ.aladin.getRaDec();
      // console.log('FOV: ', aladinServ.aladin.getFov());
      currentFOV = aladinServ.aladin.getFov();
      newRa = currentRaDec[0];
      newDec = parseFloat(currentRaDec[1] - (currentFOV[0] / 20)).toFixed(5);
      // console.log('currentRaDec[0]: ', currentRaDec[0]);
      // console.log('currentRaDec[1]: ', currentRaDec[1]);
      // console.log('currentRaDec after math: ', currentRaDec);
      // console.log('currentRaDec[1]: ', currentRaDec[1]);
      aladinServ.aladin.animateToRaDec(newRa, newDec, .2);
    }

    vm.moveLeft = function() {
      // console.log('RaDec: ', aladinServ.aladin.getRaDec());
      currentRaDec = aladinServ.aladin.getRaDec();
      // console.log('FOV: ', aladinServ.aladin.getFov());
      currentFOV = aladinServ.aladin.getFov();
      newRa = parseFloat(currentRaDec[0] + (currentFOV[0] / 20)).toFixed(5);
      newDec = currentRaDec[1];
      // console.log('currentRaDec[0]: ', currentRaDec[0]);
      // console.log('currentRaDec[1]: ', currentRaDec[1]);
      // console.log('currentRaDec after math: ', currentRaDec);
      // console.log('currentRaDec[1]: ', currentRaDec[1]);
      aladinServ.aladin.animateToRaDec(newRa, newDec, .2);
    }

    vm.moveRight = function() {
      // console.log('RaDec: ', aladinServ.aladin.getRaDec());
      currentRaDec = aladinServ.aladin.getRaDec();
      // console.log('FOV: ', aladinServ.aladin.getFov());
      currentFOV = aladinServ.aladin.getFov();
      newRa = parseFloat(currentRaDec[0] - (currentFOV[0] / 20)).toFixed(5);
      newDec = currentRaDec[1];
      // console.log('currentRaDec[0]: ', currentRaDec[0]);
      // console.log('currentRaDec[1]: ', currentRaDec[1]);
      // console.log('currentRaDec after math: ', currentRaDec);
      // console.log('currentRaDec[1]: ', currentRaDec[1]);
      aladinServ.aladin.animateToRaDec(newRa, newDec, .2);
    }

    // {{$ctrl.proj.img_sz_w * 3438 / $ctrl.proj.focal_length / 60 * .8}} AR(B1)=AR(A1)-(1.97-0.20)/(15*cos(DEC(A1)-1,49/2).


    // {{$ctrl.proj.img_sz_h * 3438 / $ctrl.proj.focal_length / 60 * .8}} Math.cos()

    vm.grabImage = function() {
      // console.log('DataURL:', aladinServ.aladin.getViewDataURL());
      vm.proj.dataURL = aladinServ.aladin.getViewDataURL()
      vm.FOVW = vm.proj.img_sz_w * 3438 / vm.proj.focal_length / 60 * .8
      vm.FOVH = vm.proj.img_sz_h * 3438 / vm.proj.focal_length / 60 * .8
      vm.baseCenterRaDec = aladinServ.aladin.getRaDec()
      vm.BCRA = vm.baseCenterRaDec[0]
      vm.BCDec = vm.baseCenterRaDec[1]
      vm.cosValPlus = (vm.BCDec + (vm.FOVH/2))
      vm.cosValMinus = (vm.BCDec - (vm.FOVH/2))
      console.log(vm.cosVal);
      vm.A1RA = (vm.BCRA - (vm.FOVW/(15 * Math.cos(vm.cosValPlus))))
      vm.A1Dec = (vm.BCDec + (vm.FOVH/2))
      vm.B1RA = (vm.BCRA + (vm.FOVW/(15 * Math.cos(vm.cosValPlus))))
      vm.B1Dec = (vm.BCDec + (vm.FOVH/2))
      vm.A2RA = (vm.BCRA - (vm.FOVW/(15 * Math.cos(vm.cosValMinus))))
      vm.A2Dec = (vm.BCDec - (vm.FOVH/2))
      vm.B2RA = (vm.BCRA + (vm.FOVW/(15 * Math.cos(vm.cosValMinus))))
      vm.B2Dec = (vm.BCDec - (vm.FOVH/2))
      // console.log('ShareURL: ', aladinServ.aladin.getShareURL());
      // console.log('EmbedCode(): ', aladinServ.aladin.getEmbedCode());
      vm.proj.dataURL
      var imageToSlices = window.imageToSlices;
      imageToSlices(vm.proj.dataURL, [804/2], [600], {
        saveToDataUrl: true
      }, function(dataUrlList) {
        console.log('sliced', dataUrlList);
        vm.proj.images = dataUrlList;
      });
      const pix2worldA1 = aladinServ.aladin.pix2world(300, 201);
      const pix2worldA2 = aladinServ.aladin.pix2world(300, 603);
      const pix2worldB1 = aladinServ.aladin.pix2world(900, 201);
      const pix2worldB2 = aladinServ.aladin.pix2world(900, 603);
      console.log('A1: ', pix2worldA1);
      console.log('A2: ', pix2worldA2);
      console.log('B1: ', pix2worldB1);
      console.log('B2: ', pix2worldB2);
      vm.proj.pix2world = [];
      for (let i=0; i<2; i++) {
        const cntrW = Math.round(1200 * (((i * 2) + 1) / 4));
        for (let j=0; j<2; j++) {
          const cntrH = Math.round(804 * (((j * 2) + 1) / 4));
          const pix2world = aladinServ.aladin.pix2world(cntrW, cntrH);
          vm.proj.pix2world.push(pix2world);
        }
      }
      // vm.pix2world = aladinServ.aladin.pix2world(0, 0)
      console.log('vm.proj.pix2world: ', vm.proj.pix2world);
    }

  }
}());
