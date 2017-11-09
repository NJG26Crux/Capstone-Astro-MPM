(function() {
  'use strict';

  angular.module('app').directive('aladin', ['aladinServ', function(aladinServ) {

    function controller() {
      console.log('@ directive.aladin.fun.controller');
      console.log('w x h: ', aladinServ.width, aladinServ.height);

      const vm = this;
      // vm.style = {width: aladinServ.width + 'px', height: aladinServ.height + 'px'};
    }

    function link() {
      console.log('@ directive.aladin.fun.link');

      aladinServ.aladin = A.aladin('#aladin-lite-div', {survey: "P/DSS2/color", fov:3, target: "m31"});
    }
    return {controller, link, template:`<div id="aladin-lite-div" style="width:800px;height:600px;"></div>`}
  }])

}());
