'use strict';
var domready = require('detect-dom-ready');

var app = function () {

  var Jquery = require('jquery');
  var select = require('dom-select');
  var framework = require('./sections/framework');
  var sniffer = require('./sections/sniffer');
  var HBSPlugin = require('./com/plugins/HBSPlugin');
  var nav      = require('./ui/nav');

  HBSPlugin.setup(select('#container'));

  nav.setFramework(framework);

  window.$ = Jquery;

  sniffer.addClasses(document.documentElement);
  window.device = document.documentElement.className;

  framework.init();

  return framework;
}

domready(function () {
  window.app = new app();
});
