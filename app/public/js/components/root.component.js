(function() {
  'use strict';

  angular.module('app').component('root', {
    controller,
    templateUrl: 'js/components/root.template.html'
  })
  controller.$inject = ['$mdDialog', '$http', 'auth']

  function controller($mdDialog, $http, auth) {
    const vm = this;

    vm.auth = auth;

    vm.$onInit = function() {

              $http.get('/users/firstName')
                .then((firstName) => {
                  if (firstName) {
                    console.log('firstName: ', firstName);
                    auth.firstName = firstName.data.firstName;
                  } else {
                    console.log('no firstName');
                  }
                })

    }

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
    vm.logout = function() {
      // console.log('logging out');
      $http.delete('/token').then(data => {
        auth.firstName = '';
        // console.log('data: ', data);
      });
      // console.log('logged out?');
    }
  }

  angular.module('app').controller('login', ['$mdDialog', '$http', 'auth', function($mdDialog, $http, auth) {
    const vm = this;

    // vm.firstName = '';
    vm.logIn = true;
    vm.loggedin = false; // for nav bar
    // vm.firstName = "";

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
          auth.firstName = data.data.firstName;
          console.log('auth.firstName: ', auth.firstName);
        },
        err => {
          console.log('err: ', err)
        });
      $mdDialog.hide();
      delete vm.form;
    }

    vm.signup = function() {
      console.log('fun.signup: ', vm.form)
      $http.post('/users', vm.form).then(user => {
        console.log('signup.user.data: ',user.data);
        auth.firstName = user.data.firstName;
        console.log('auth.firstName: ', auth.firstName);
        // $http.post('/token', vm.form).then(data => {
        //   // console.log('signup.login.data:', data);
        // })
      });
      $mdDialog.hide();
      delete vm.form;
    }

  }])

}());
