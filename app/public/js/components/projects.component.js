(function() {
  'use strict';

  angular.module('app').component('projects', {
    controller,
    templateUrl: '/js/components/projects.template.html'
  })
  // controller.$inject = ['projects']

  function controller(){
    console.log('here @ projects')
    const vm = this;
    // vm.footer = false;
  }
}());
