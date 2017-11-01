(function() {
  'use strict';

  angular.module('app').component('root', {
    controller,
    templateUrl: 'js/components/root.template.html'
  })
  controller.$inject = ['$mdDialog']

  function controller($mdDialog) {
    const vm = this;

    vm.showAdvanced = function(ev) {
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

  angular.module('app').controller('login', ['$mdDialog', '$http', function($mdDialog, $http) {
    const vm = this;

    // vm.firstName = '';
    vm.logIn = true;
    vm.loggedin = false; // for nav bar

    vm.close = function() {
      console.log('close')
      $mdDialog.cancel();
    };
    vm.hide = function() {
      console.log('hide');
      $mdDialog.hide();
    };

    vm.login = function() {
      console.log('fun.login: ', vm.form)
      $http.post('/token', vm.form).then(data => {
          console.log('data: ', data)
          console.log('firstName: ', data.data.firstName);
          const firstName = data.data.firstName;
        },
        err => {
          console.log('err: ', err)
        });
      $mdDialog.hide();
      delete vm.form;
    }

    vm.signup = function() {
      console.log('fun.signup: ', vm.form)
      $http.post('/users', vm.form).then();
      $mdDialog.hide();
      delete vm.form;
    }

    vm.logout = function() {
      console.log('logging out');
      $http.delete('/token').then();
      console.log('logged out');
    }


  }])

}());
