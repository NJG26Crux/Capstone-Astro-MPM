(function() {
  'use strict';

  angular.module('app').component('root', {
    controller,
    templateUrl: 'js/components/root.template.html'
  })
  // controller.$inject = ['$mdDialog', '$http', 'auth']

  function controller($mdDialog, $http, auth) {
    const vm = this;


    vm.auth = auth;

    vm.$onInit = function() {

      $http.get('/users/firstName')
        .then((firstName) => {
          if (firstName) {
            // console.log('firstName: ', firstName);
            auth.firstName = 'Hello ' + firstName.data.firstName;
          } else {
            // console.log('no firstName');
          }
        })
        .catch((err) => {
          // console.log(err);;
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
    vm.logout = function() {
      // console.log('logging out');
      $http.delete('/token').then(data => {
        auth.firstName = '';
        auth.err = ';'
        // console.log('data: ', data);
      });
      // console.log('logged out?');
    }
  }

  angular.module('app').controller('login', ['$mdDialog', '$http', 'auth', '$scope', 'projects', function($mdDialog, $http, auth, $scope) {
    const vm = this;
    $scope.form = {};

    // vm.firstName = '';
    vm.footer = true; //***************** NEW
    console.log('vm.footer: ',vm.footer); //***************** NEW
    vm.logIn = true;
    vm.loggedin = false; // for nav bar
    // vm.firstName = "";

    vm.close = function() {
      console.log('close')
      $mdDialog.cancel();
    };
    // vm.hide = function() {
    //   console.log('hide');
    //   $mdDialog.hide();
    // };

    vm.login = function() {
      // console.log('fun.login: ', vm.form)
      $http.post('/token', vm.form).then(data => {
          // console.log('data: ', data)
          // console.log('firstName: ', data.data.firstName);
          auth.firstName = 'Hello ' + data.data.firstName;
          // console.log('auth.firstName: ', auth.firstName);
          $mdDialog.hide();
          delete vm.form;
        },
        err => {
          // console.log('err: ', err)
          vm.err = 'Incorect User Name or Password'
          return err;
        })
    };


    vm.signup = function() {
      console.log('fun.signup: ', vm.form)
      $http.post('/users', vm.form).then(user => {
          // if (user.data.firstName) {
          console.log('signup.user.data: ', user.data);
          auth.firstName = 'Hello ' + user.data.firstName;
          console.log('auth.firstName: ', auth.firstName);
          $mdDialog.hide();
          delete vm.form;
          // }
        },
        err => {
          console.log('err: ', err)
          vm.err = 'Email already exists'
          return err;
        })
    };

    vm.logInState = function() {

      if (vm.logIn === true) {
        console.log('clearing all login fields');
        vm.err = '';
        delete vm.form;
        vm.logIn = !vm.logIn;

        $scope.form.userName.$pristine = true;
        $scope.form.userName.$dirty = false;
        $scope.form.userName.$valid = true;
        $scope.form.userName.$invalid = false;

        $scope.form.password.$pristine = false;
        $scope.form.password.$dirty = false;
        $scope.form.password.$valid = false;
        $scope.form.password.$invalid = false;

      } else if (vm.logIn === false) {
        console.log('clearing all signup fields');
        vm.err = '';
        delete vm.form;
        vm.logIn = !vm.logIn;

        $scope.form.firstName.$pristine = true;
        $scope.form.firstName.$dirty = false;
        $scope.form.firstName.$valid = true;
        $scope.form.firstName.$invalid = false;

        $scope.form.lastName.$pristine = false;
        $scope.form.lastName.$dirty = false;
        $scope.form.lastName.$valid = false;
        $scope.form.lastName.$invalid = false;

        $scope.form.userName.$pristine = true;
        $scope.form.userName.$dirty = false;
        $scope.form.userName.$valid = true;
        $scope.form.userName.$invalid = false;

        $scope.form.email.$pristine = false;
        $scope.form.email.$dirty = false;
        $scope.form.email.$valid = false;
        $scope.form.email.$invalid = false;

        $scope.form.password.$pristine = false;
        $scope.form.password.$dirty = false;
        $scope.form.password.$valid = false;
        $scope.form.password.$invalid = false;
      }
    }

  }])

}());
