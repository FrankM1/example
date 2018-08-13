'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _parallax = require('./parallax');

var _parallax2 = _interopRequireDefault(_parallax);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

var _imagesloaded = require('imagesloaded');

var _imagesloaded2 = _interopRequireDefault(_imagesloaded);

var _domClasses = require('dom-classes');

var _domClasses2 = _interopRequireDefault(_domClasses);

var _domEvents = require('dom-events');

var _domEvents2 = _interopRequireDefault(_domEvents);

var _domCss = require('dom-css');

var _domCss2 = _interopRequireDefault(_domCss);

var _domSelect = require('dom-select');

var _domSelect2 = _interopRequireDefault(_domSelect);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _componentsLogo = require('../../components/logo');

var _componentsLogo2 = _interopRequireDefault(_componentsLogo);

var Custom = (function (_Parallax) {
	_inherits(Custom, _Parallax);

	function Custom(opt) {
		_classCallCheck(this, Custom);

		_get(Object.getPrototypeOf(Custom.prototype), 'constructor', this).call(this, opt);

		this.ui.header = (0, _domSelect2['default'])('.js-header');
		this.ui.head = opt.head;
		this.ui.bg = opt.bg;
		this.headerDarkBg = opt.headerDarkBg;
		this.ui.anchor = opt.anchor;

		this.ui.clipsection = opt.clipsection;

		this.ui.sidebar = opt.sidebar;
		this.ui.trigger = opt.sidebartrigger;

		this.triggerpos = undefined;
		this.sidebarParallax = 0;
		this.headerHeight = 0;
		this.ui.overview = document.querySelector('.round-back');
	}

	_createClass(Custom, [{
		key: 'init',
		value: function init() {
			console.log('section: init()', '');
			this.loadImages();

			_get(Object.getPrototypeOf(Custom.prototype), 'init', this).call(this);
		}
	}, {
		key: 'loadImages',
		value: function loadImages() {

			var images = _domSelect2['default'].all('img', this.ui.section);

			(0, _imagesloaded2['default'])(images, this.resize);
		}
	}, {
		key: 'scrollTo',
		value: function scrollTo(e) {

			var y = _config2['default'].height;

			this.pos.target = y;
			window.scrollTo(0, y);
		}
	}, {
		key: 'resize',
		value: function resize() {

			_get(Object.getPrototypeOf(Custom.prototype), 'resize', this).call(this);

			if (this.ui.bg) {
				this.headerHeight = this.ui.bg.getBoundingClientRect().height;
			}
		}
	}, {
		key: 'addEvents',
		value: function addEvents() {

			_get(Object.getPrototypeOf(Custom.prototype), 'addEvents', this).call(this);

			this.ui.anchor && _domEvents2['default'].on(this.ui.anchor, 'click', this.scrollTo);
		}
	}, {
		key: 'removeEvents',
		value: function removeEvents() {

			_get(Object.getPrototypeOf(Custom.prototype), 'removeEvents', this).call(this);

			this.ui.anchor && _domEvents2['default'].off(this.ui.anchor, 'click', this.scrollTo);
		}
	}, {
		key: 'run',
		value: function run() {
			var limit = this.pos.height * 1.5;

			// if(this.pos.current > 100) {
			// 	classes.add(document.querySelector('.round'), 'hidden');
			// 	classes.add(document.querySelector('.round-next'), 'hidden');
			// } else {
			// 	classes.remove(document.querySelector('.round-prev'), 'hidden');
			// 	classes.remove(document.querySelector('.round-next'), 'hidden');
			// }

			if (this.ui.sidebar) {
				if (this.ui.trigger.getBoundingClientRect().top - window.innerHeight <= 0 || this.sidebarParallax < 0) {
					if (!this.triggerpos) this.triggerpos = this.pos.target;
					this.sidebarParallax = Math.max(0, ((this.pos.target - this.triggerpos) * 0.5).toFixed(2)) * -1;
					(0, _domCss2['default'])(this.ui.sidebar, { 'display': 'block', 'transform': this.getTransform(this.sidebarParallax) });
				}
			}

			if (this.ui.bg) (0, _domCss2['default'])(this.ui.bg, { 'display': 'block', 'transform': this.getTransform(-Math.abs((this.pos.target * 0.85).toFixed(2))) });
			if (this.ui.head) (0, _domCss2['default'])(this.ui.head, { 'display': 'block', 'transform': this.getTransform(-Math.abs((this.pos.target * 1.05).toFixed(2))) });

			if (this.headerDarkBg) {
				_componentsLogo2['default'].setDarkBackground(this.headerHeight - 300 > this.pos.target);
			}

			// console.log('section: run()', this.ui.clipsection);
			if (this.ui.clipsection) {

				this.ui.clipsection.forEach(function (el) {
					// console.log('section: run()', '');
					if (el.getBoundingClientRect().top < window.innerHeight - 200) {
						_domClasses2['default'].add(el, 'in-viewport');
					} else if (el.getBoundingClientRect().top > window.innerHeight) {
						_domClasses2['default'].remove(el, 'in-viewport');
					}
				});
			}

			// this.pos.target > limit && this.pos.direction == 'down' ? classes.add(this.ui.header, 'is-hidden') : classes.remove(this.ui.header, 'is-hidden');

			if (this.pos.current > window.innerHeight) {
				(0, _jquery2['default'])('.round-back').addClass('stop-animate');
			}

			if (this.pos.target > this.bounding - 100) {
				_domClasses2['default'].add(this.ui.overview, 'unfold');
			} else {
				_domClasses2['default'].remove(this.ui.overview, 'unfold');
			}

			_get(Object.getPrototypeOf(Custom.prototype), 'run', this).call(this);
		}
	}, {
		key: 'removeClass',
		value: function removeClass() {

			if (this.ui.header) _domClasses2['default'].remove(this.ui.header, 'is-top');
			if (this.ui.header) _domClasses2['default'].remove(this.ui.header, 'is-hidden');
		}
	}, {
		key: 'destroy',
		value: function destroy() {
			this.removeClass();
			_componentsLogo2['default'].setDarkBackground(false);

			_get(Object.getPrototypeOf(Custom.prototype), 'destroy', this).call(this);

			if (this.ui.sidebar) (0, _domCss2['default'])(this.ui.sidebar, { 'transform': this.getTransform(0) });
			if (this.ui.bg) (0, _domCss2['default'])(this.ui.bg, { 'transform': this.getTransform(0) });
			if (this.ui.head) (0, _domCss2['default'])(this.ui.head, { 'transform': this.getTransform(0) });
		}
	}]);

	return Custom;
})(_parallax2['default']);

exports['default'] = Custom;
module.exports = exports['default'];