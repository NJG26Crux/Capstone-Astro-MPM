(function() {
  'use strict';

  angular.module('app').directive('aladin', ['aladinServ', function(aladinServ) {

    function controller() {
      // const vm = this;
      console.log('@ directive.aladin.fun.controller');
      // let aladinServ.aladin.fov = 1;
      // let aladinServ.aladin.width = 600;
      // let aladinServ.aladin.height = 400;
      // console.log('w x h: ', aladinServ.aladin.width, aladinServ.aladin.height);

      const vm = this;
      // vm.style = {width: aladinServ.width + 'px', height: aladinServ.height + 'px'};
    }

    function link() {
      console.log('@ directive.aladin.fun.link');
      $('#screwAladin').bind('mousewheel DOMMouseScroll', function(e) { //#screwAladin
        e.preventDefault()
        console.log('preventDefault @ aladin');
      })
      // console.log('aladinServ.aladin.fov: ', aladinServ.aladin.fov);
      aladinServ.aladin = A.aladin('#aladin-lite-div', {survey: "P/DSS2/color", fov:1, target: "m42"}); //1.486 aladinServ.aladin.fov  || 2.4147857142857143
    }



    return {controller, link, template:`<div id="aladin-lite-div"></div>`} //800 600 {{$ctrl.aladin.width}} {{$ctrl.aladin.height}}
  }])

}());
