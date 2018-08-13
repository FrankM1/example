'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var _pleaseAjax = require('please-ajax');

var _pleaseAjax2 = _interopRequireDefault(_pleaseAjax);

var _domCreateElement = require('dom-create-element');

var _domCreateElement2 = _interopRequireDefault(_domCreateElement);

var SVG = (function () {
	function SVG() {
		_classCallCheck(this, SVG);

		this.root = _config2['default'].$body;
		this.view = _config2['default'].$view;
		this.slug = 'svg';
		this.template = _config2['default'].PATH + _config2['default'].BASE + 'templates/components/' + this.slug + '.html';

		this.init();
	}

	_createClass(SVG, [{
		key: 'init',
		value: function init() {
			var _this = this;

			this.createDOM();

			_pleaseAjax2['default'].get(this.template, {
				success: function success(object) {
					_this.el.innerHTML = object.data;
				}
			});
		}
	}, {
		key: 'createDOM',
		value: function createDOM() {

			this.el = (0, _domCreateElement2['default'])({
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