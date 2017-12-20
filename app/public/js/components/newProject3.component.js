(function() {
  'use strict';

  angular.module('app')

  .component('newProject3', {controller,
    templateUrl: '/js/components/newProject3.template.html'
  })

  controller.$inject=['$http','aladinServ','projServ'];
  function controller($http, aladinServ, projServ){
    const vm = this;
    vm.showHints = true;

    // vm.proj = {};
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
      // vm.aladin.col = 1;
    }

    vm.addProject = function() {
      vm.proj.admin_user_id = 1; //***** This needs to be changed
      vm.proj.fov_w = (vm.proj.img_sz_w * 3438 / vm.proj.focal_length / 60 * .8 * vm.proj.col);
      vm.proj.fov_h = (vm.proj.img_sz_h * 3438 / vm.proj.focal_length / 60 * .8);
      // add Focal Ratio
      vm.proj.cells = (vm.aladin.col * 2);
      vm.proj.uncom_cells = 0;
      vm.proj.imgMosiac = vm.proj.dataURL;

      // let newCells = []
      // // baseCenterRaDec [x, y] i.e. [0] [1]
      // if (vm.aladin.col % 2 === 0) {
      //   firstCenterRaDec[0] = baseCenterRaDec[0] - ((vm.proj.fov_w / 2) + (vm.proj.fov_w * ((vm.aladin.col/ 2) - 1)))
      //   firstCenterRaDec[1] = baseCenterRaDec[1] + ((vm.proj.fov_h / 2) + (vm.proj.fov_h * ((vm.aladin.col / 2) - 1)))
      // } else {
      //   firstCenterRaDec[0] = baseCenterRaDec[0] - (vm.proj.fov_w * ((vm.aladin.col / 2) - .5))
      //   firstCenterRaDec[1] = baseCenterRaDec[1] + (vm.proj.fov_h * ((vm.aladin.col / 2) - .5))
      // }



      // for (let i=0; i<vm.aladin.col; i++) {
      //   for (let j=0; j<vm.aladin.col; j++) {
      //   let newObj = {}
      //   newObj = {cell_num: (String.fromCharCode(65+i) + (j+1)), center_ref_ra: (firstCenterRaDec[0] + (vm.proj.fov_h * i)).toFixed(5), center_ref_dec: (firstCenterRaDec[1] - (vm.proj.fov_h * j)).toFixed(5)}
      //   newCells.push(newObj)
      //   }
      // }

      // console.log(newCells);

      $http.post('/api/projects', vm.proj)
        .then(project => {
          // console.log('@ routes.project.post');
          // console.log('vm.proj: ', vm.proj);
          // console.log('project: ', project);
          const proj_id = project.data.id;
          for (const cell of vm.proj.cells) (
            cell.proj_id = proj_id
          )
          // delete vm.proj

          return $http.post('/api/projects/:id/cells', vm.proj.cells)
        })
        .then(() => {

        })
        .catch(() => {

        })
    }

  }
}());
