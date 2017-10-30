// angular.module("app", ['ngMaterial','modalModule'])
//
//
// // modal module //
// var modalModules = angular.module('modalModule',[]);
//
// // modal Controller  //
// modalModules.controller('navController', function ($mdDialog) {
//   const vm = this;
//   vm.logIn = true;
//
//   vm.$onInit = function() {
//     console.log('onInit is being run logIn is set to ' + vm.logIn);
//   }
//
//     this.showAdvanced = function (ev) {
//         $mdDialog.show({
//             controller: navController2,
//             templateUrl: 'loginModal.tmpl.html',
//             parent: angular.element(document.body),
//             targetEvent: ev,
//             clickOutsideToClose: true,
//             fullscreen: this.customFullscreen
//         });
//
//     };
//
//     // modal con
//     function navController2($scope, $mdDialog) {
//
//         $scope.close = function () {
//             $mdDialog.cancel();
//         };
//         $scope.hide = function () {
//             $mdDialog.hide();
//         };
//         $scope.answer = function (answer, form) {
//           console.log('First Name: ' + form.firstname);
//           console.log('Last Name: ' + form.lastname);
//           console.log('User Name: ' + form.username);
//           console.log('email: ' + form.email);
//           console.log('Password: ' + form.password);
//           console.log('Password Again: ' + form.passwordagain);
//
//           if (answer === 'SignUp') {
//             console.log('answer: ' + answer);
//             // vm.logIn = !vm.logIn;
//             delete vm.form;
//             return;
//           }
//
//             // $mdDialog.hide(answer);
//         };
//     }//end modal
//
//
// });
//
// // controller.$inject = ['$http']
// //   function controller($http) {
// //     const vm = this
// //
// //     vm.$onInit = function () {
// //       $http.get('/things.json').then(function (response) {
// //         vm.things = response.data
// //       })
// //     }
// //   }
