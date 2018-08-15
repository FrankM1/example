'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var config = require('../config');
var pleaseAjax = require('please-ajax');
var domCreateElement = require('dom-create-element');

var SVG = (function () {
	function SVG() {
		_classCallCheck(this, SVG);

		this.root = confi.$body;
		this.view = confi.$view;
		this.slug = 'svg';
		this.template = config.PATH + config.BASE + 'templates/components/' + this.slug + '.html';

		this.init();
	}

	_createClass(SVG, [{
		key: 'init',
		value: function init() {
			var self = this;

			this.createDOM();

			pleaseAjax.get(this.template, {
				success: function success(object) {
					self.el.innerHTML = object.data;
				}
			});
		}
	}, {
		key: 'createDOM',
		value: function createDOM() {

			this.el = domCreateElement({
				selector: 'div',
				id: 'js-defs',
				styles: 'svg-defs'
			});

			this.root.insertBefore(this.el, this.view);
		}
	}]);

	return SVG;
})();

exports['default'] = SVG;
module.exports = exports['default'];