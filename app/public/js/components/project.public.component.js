(function() {
  'use strict';

  angular.module('app').component('project', {
    controller,
    templateUrl: '/js/components/project.public.template.html'
  })

  function controller(projects, $http, $stateParams){
    const vm = this;

    console.log('here @ component.project');
    console.log('$stateParams.id: ', $stateParams.id);
    // console.log(projectId);

    vm.$onInit = function() {
      // vm.project = projectsService.findById($stateParams.id)
      $http.get('/api/projects/' + $stateParams.id)
        .then(project => {
            console.log(project.data);
            vm.project = project.data;
        })

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

    }
  }
}());
