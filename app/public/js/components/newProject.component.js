(function() {
  'use strict';

  angular.module('app')

  .component('newProject', {controller,
    templateUrl: '/js/components/newProject.template.html'
  })

  function controller(){
    const vm = this
    vm.showHints = true;

    vm.proj = {
      name: "default Name"
      // email: "",
      // social: "123456789",
      // phone: "N/A"
    }
  }
}());
