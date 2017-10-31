(function() {
  'use strict';

  angular.module('app').component('root', {
    controller,
    templateUrl: 'js/components/root.template.html'
  })
  controller.$inject = ['$mdDialog']
  function controller($mdDialog){
    const vm = this;

    vm.showAdvanced = function (ev) {
      $mdDialog.show({
          controller: 'login as $ctrl',
          templateUrl: 'js/components/login.template.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          fullscreen: this.customFullscreen
      });
    };
  }

  angular.module('app').controller('login', ['$mdDialog', '$http', function($mdDialog, $http){
    const vm = this;

    vm.logIn = true;
    vm.close = function () {
      console.log('close')
        $mdDialog.cancel();
    };
    vm.hide = function () {
        $mdDialog.hide();
    };

    vm.login = function(){
      console.log(vm.form)
      $http.get('/token', vm.form).then();
      $mdDialog.hide();
      delete vm.form;
    }

    vm.signup = function(){
      console.log(vm.form)
      $http.post('/users', vm.form).then();
      $mdDialog.hide();
      delete vm.form;
    }

  }])

}());
