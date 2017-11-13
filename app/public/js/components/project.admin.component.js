(function() {
  'use strict';

  // angular.module('nutritionApp').controller('addItemController', ['$mdDialog', '$nutrition', '$scope', function ($mdDialog, $nutrition, $scope) {
  // 'use strict';

  angular.module('app').component('projectAdmin', {
    controller,
    templateUrl: '/js/components/project.admin.template.html'
  })

  controller.$inject = ['projects', '$http', '$mdDialog', '$stateParams', 'aladinServ']

  function controller(projects, $http, $mdDialog, $stateParams, aladinServ) {
    const vm = this;

    // vm.aladin.fov = 1;
    // vm.aladin.width = 600;
    // vm.aladin.height = 400;

    console.log('@ component.project.admin');
    console.log('$stateParams.id: ', $stateParams.id);
    // console.log(projectId);

    vm.$onInit = function() {
      $mdDialog.hide(); //cell
      // vm.project = projectsService.findById($stateParams.id)
      $http.get('/api/projects/' + $stateParams.id)
        .then(project => {
          console.log(project.data);
          vm.project = project.data;
          if (vm.project.ota === "Refractor") {
            vm.project.optDiag = "REFRACTOR-Diagram.jpg";
            vm.project.otaImg = "REF-FSQ106N-1.JPG";
          } else if (vm.project.ota === "Reflector") {
            vm.project.optDiag = "REFLECTOR-Diagram.jpg";
            vm.project.otaImg = "REFLECTOR-epsilon-180ed.jpeg";
          } else if (vm.project.ota === "Schmidt-Cassigrain") {
            vm.project.optDiag = "Catadioptric.png";
            vm.project.otaImg = "SCHMIDT-CASS-lx80-8.jpg";
          } else if (vm.project.ota === "Ritchey-Chrétiens") {
            vm.project.optDiag = "Catadioptric.png";
            vm.project.otaImg = "RITCHEY-CRIT-16in-ota.jpg";
          } else if (vm.project.ota === "Dall-Kirkham") {
            vm.project.optDiag = "Catadioptric.png";
            vm.project.otaImg = "DALL-KIRKHAM-CDK14.jpg";
          }
          if (vm.project.cam === "DSLR") {
          vm.project.camImg = "DSLR-Canon-60Da.jpg";
          } else if (vm.project.cam === "cooled DSLR"){
          vm.project.camImg = "DSLR-COOLED-A7s.jpg";
          } else if (vm.project.cam === "CCD Monochrome"){
          vm.project.camImg = "CCD-SBIG.jpg";
          } else if (vm.project.cam === "CCD Color"){
          vm.project.camImg = "CCD-SBIG.jpg";
          } else if (vm.project.cam === "CMOS Monochrome"){
          vm.project.camImg = "CMOS-ZWO-ASI1600.jpg";
          } else if (vm.project.cam === "CMOS Color"){
          vm.project.camImg = "CMOS-ZWO-ASI1600.jpg";
          }

        })

      $http.get('/api/projects/contributors/' + $stateParams.id)
        .then(contributors => {
          console.log(contributors.data);
          vm.contributors = contributors.data;
        })

      $http.get('/api/project/cells/' + $stateParams.id)
        .then(cells => {
          console.log('cells: ', cells.data);
          vm.cells = cells.data;
        })
    }

    vm.cancel = $mdDialog.cancel;
    console.log('Add Cell Form Cancel Btn');

    function success(cell) {
      $mdDialog.hide(cell);
    }

    vm.showAdvanced = function(ev) {
      $mdDialog.show({
        controller: 'add.cell as $ctrl',
        templateUrl: 'js/components/add.cell.template.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: this.customFullscreen
      })
    }

    vm.showAddCtbr = function(ev) {
      $mdDialog.show({
        controller: 'add.ctbr as $ctrl',
        templateUrl: 'js/components/add.ctbr.template.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: this.customFullscreen
      })
    }

  }

  angular.module('app').controller('add.cell', ['$mdDialog', '$http', '$scope', '$stateParams', 'aladinServ', function($mdDialog, $http, $scope, $stateParams, aladinServ) {
    const vm = this;

    vm.close = function() {
      console.log('close')
      $mdDialog.cancel();
    };

    // vm.hide = function() {
    //   console.log('hide');
    //   $mdDialog.hide();
    // };

    vm.addCell = function() {
      console.log('Add Cell Form Submit Btn', $stateParams);
      vm.cell.proj_id = parseInt($stateParams.id);
      console.log('vm.cell: ', vm.cell);


      // vm.cell.form.$setSubmitted();

      // if (vm.cell.form.$valid) {
        $http.post('/api/cells/', vm.cell)
          .then(cells => {
            console.log('cells: ', cells);
            delete vm.cells;
          }),
          err => {
            console.log('err: ', err)
            return err;
          }
      // }
    }

  }])

  angular.module('app').controller('add.ctbr', ['$mdDialog', '$http', '$scope', '$stateParams', 'aladinServ', function($mdDialog, $http, $scope, $stateParams, aladinServ) {
    const vm = this;

    vm.closeCtbr = function() {
      console.log('close')
      $mdDialog.cancel();
    };

    // vm.hide = function() {
    //   console.log('hide');
    //   $mdDialog.hide();
    // };

    vm.addCtbr = function() {
      console.log($stateParams);
      vm.ctbr.proj_id = $stateParams.id;
      $http.post('/api/proj_user', vm.ctbr)
        .then((addCtbr) => {
          console.log('addCtbr: ', addCtbr);
          delete vm.addCtbr;
        })
    }

    vm.deleteCtbr = function() {

    }

  }])

}());
