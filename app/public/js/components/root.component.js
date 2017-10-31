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
      $http.get('/token', vm.form).then(); //console.log('Holy Crap Batman !!!')
      $mdDialog.hide();
      delete vm.form;
    }

    vm.signup = function(){
      console.log(vm.form)
      $http.post('/users', vm.form).then(); //.fail(console.log(err)) console.log(response.data)

    //   const options = {
    //     contentType: 'application/json',
    //     data: JSON.stringify({ firstName, lastName, email, userName, password }),
    //     dataType: 'json',
    //     type: 'POST',
    //     url: '/users'
    //   };
    //
    //   $.ajax(options)
    //     .done((user) => {
    //       window.location.href = '/jobs.html';
    //     })
    //     .fail(($xhr) => {
    //       Materialize.toast($xhr.responseText, 3000);
    //     });
    // });

      $mdDialog.hide();
      delete vm.form;
    }

    // vm.answer = function (answer) {
    //   console.log('hello')
    //   if(vm.form){
    //     console.log('First Name: ' + vm.form.firstname);
    //     console.log('Last Name: ' + vm.form.lastname);
    //     console.log('User Name: ' + vm.form.username);
    //     console.log('email: ' + vm.form.email);
    //     console.log('Password: ' + vm.form.password);
    //     console.log('Password Again: ' + vm.form.passwordagain);
    //   }
    //
    //   if (answer === 'SignUp') {
    //     console.log('answer: ' + answer);
    //     // vm.logIn = !vm.logIn;
    //     delete vm.form;
    //     return;
    //   }
    //
    //     // $mdDialog.hide(answer);
    // };
  }])

}());
