(function() {
  'use strict';

  // angular.module('nutritionApp').controller('addItemController', ['$mdDialog', '$nutrition', '$scope', function ($mdDialog, $nutrition, $scope) {
  // 'use strict';

  angular.module('app').component('projectAdmin', {
    controller,
    templateUrl: '/js/components/project.admin.template.html'
  })

  function controller(projects, $http, $mdDialog, $stateParams) {
    const vm = this;

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
    };

  }
}());
