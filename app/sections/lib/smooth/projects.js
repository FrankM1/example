'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _smooth = require('./smooth');

var _smooth2 = _interopRequireDefault(_smooth);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _domEvents = require('dom-events');

var _domEvents2 = _interopRequireDefault(_domEvents);

var _domCss = require('dom-css');

var _domCss2 = _interopRequireDefault(_domCss);

var Custom = (function (_Smooth) {
	_inherits(Custom, _Smooth);

	function Custom(opt) {
		_classCallCheck(this, Custom);

		_get(Object.getPrototypeOf(Custom.prototype), 'constructor', this).call(this, opt);
	}

	_createClass(Custom, [{
		key: 'resize',
		value: function resize() {

			this.bounding = this.ui.section.getBoundingClientRect().width - _config2['default'].width;

			_get(Object.getPrototypeOf(Custom.prototype), 'resize', this).call(this);
		}
	}, {
		key: 'run',
		value: function run() {

			(0, _domCss2['default'])(this.ui.section, 'transform', 'translate3d(-' + this.pos.target.toFixed(2) + 'px,0,0)');

			_get(Object.getPrototypeOf(Custom.prototype), 'run', this).call(this);
		}
	}]);

	return Custom;
})(_smooth2['default']);

exports['default'] = Custom;
module.exports = exports['default'];