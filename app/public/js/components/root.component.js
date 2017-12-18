(function() {
  'use strict';

  angular.module('app').component('root', {
    controller,
    templateUrl: 'js/components/root.template.html'
  })
  controller.$inject = ['$mdDialog', '$http', 'auth', '$state']

  function controller($mdDialog, $http, auth, $state) {
    const vm = this;


    vm.auth = auth;

    vm.$onInit = function() {

      $http.get('/api/users/firstName')
        .then((user) => {
          console.log('@ component.root get/firstname user: ', user.data[0]);
          if (user.data[0]) {
            console.log(user.data[0].first_name);
            user.data[0].hello_first_name = ('Hello ' + user.data[0].first_name);
            console.log(user.data[0]);
            vm.auth.user = user.data[0]
            console.log(auth.user)
          }
        })
        .catch((err) => {
        });
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

    vm.signupForm = function(ev) {
      console.log('clicked on signupForm fun');
      $mdDialog.show({
        controller: 'login as $ctrl',
        templateUrl: 'js/components/signup.template.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: this.customFullscreen
      });
    };

    vm.logout = function() {
      $http.delete('/api/token').then(data => {
        vm.auth.user = '';
        auth.firstName = '';
        auth.err = '';
      });
      $state.go('home')
    }
  }

  angular.module('app').controller('login', ['$mdDialog', '$http', 'auth', '$scope', function($mdDialog, $http, auth, $scope) {
    const vm = this;
    $scope.form = {};

    vm.footer = true; //***************** NEW
    console.log('vm.footer: ',vm.footer); //***************** NEW
    vm.logIn = true;
    vm.loggedin = false; // for nav bar

    vm.close = function() {
      console.log('close')
      $mdDialog.cancel();
    };

    vm.login = function() {
      $http.post('/api/token', vm.form).then(data => {
          auth.firstName = 'Hello ' + data.data.firstName;
          $mdDialog.hide();
          delete vm.form;
        },
        err => {
          vm.err = 'Incorect User Name or Password'
          return err;
        })
    };


    vm.signup = function() {
      console.log('fun.signup: ', vm.form)
      $http.post('/api/users', vm.form).then(user => {
          console.log('signup.user.data: ', user.data);
          auth.firstName = 'Hello ' + user.data.firstName;
          console.log('auth.firstName: ', auth.firstName);
          $mdDialog.hide();
          delete vm.form;
        },
        err => {
          console.log('err: ', err)
          vm.err = 'Email already exists'
          return err;
        })
    };

    vm.switchToSignup = function(ev) {
      console.log('clicked on switch to signupForm fun');
      vm.close();
      console.log('clicked on signupForm fun');
      $mdDialog.show({
        controller: 'login as $ctrl',
        templateUrl: 'js/components/signup.template.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: this.customFullscreen
      });
    };

    vm.switchToLogin = function(ev) {
      console.log('clicked on switch to loginForm fun');
      vm.close();
      $mdDialog.show({
        controller: 'login as $ctrl',
        templateUrl: 'js/components/login.template.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: this.customFullscreen
      });
    };

  }])

}());
