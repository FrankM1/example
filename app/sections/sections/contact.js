'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _framework = require('../framework');

var _framework2 = _interopRequireDefault(_framework);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var _gsap = require('gsap');

var _gsap2 = _interopRequireDefault(_gsap);

var _domClasses = require('dom-classes');

var _domClasses2 = _interopRequireDefault(_domClasses);

var _domEvents = require('dom-events');

var _domEvents2 = _interopRequireDefault(_domEvents);

var _queryDomComponents = require('query-dom-components');

var _queryDomComponents2 = _interopRequireDefault(_queryDomComponents);

var _domCreateElement = require('dom-create-element');

var _domCreateElement2 = _interopRequireDefault(_domCreateElement);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _libSlider = require('../lib/slider');

var _libSlider2 = _interopRequireDefault(_libSlider);

var _libSpanify = require('../lib/spanify');

var _libSpanify2 = _interopRequireDefault(_libSpanify);

var _libSmoothSection = require('../lib/smooth/section');

var _libSmoothSection2 = _interopRequireDefault(_libSmoothSection);

var _componentsLogo = require('../components/logo');

var _componentsLogo2 = _interopRequireDefault(_componentsLogo);

var _default = require('./default');

var _default2 = _interopRequireDefault(_default);

var _libGreenSockSrcUncompressedUtilsSplitText = require('../lib/GreenSock/src/uncompressed/utils/SplitText');

var _libGreenSockSrcUncompressedUtilsSplitText2 = _interopRequireDefault(_libGreenSockSrcUncompressedUtilsSplitText);

var gms = [{ "featureType": "all", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape", "stylers": [{ "color": "#ecebea" }] }, { "featureType": "administrative", "stylers": [{ "color": "#ecebea" }] }, { "featureType": "poi", "stylers": [{ "color": "#ecebea" }] }, { "featureType": "poi.park", "stylers": [{ "color": "#d9e3cf" }] }, { "featureType": "water", "stylers": [{ "color": "#c3d8d8" }] }, { "featureType": "road", "stylers": [{ "color": "#ffffff" }] }];

var Contact = (function (_Default) {
	_inherits(Contact, _Default);

	function Contact(opt) {
		_classCallCheck(this, Contact);

		_get(Object.getPrototypeOf(Contact.prototype), 'constructor', this).call(this, opt);

		this.sliders = [];
		this.createExtraBound();

		this.slug = 'contact';
		this.ui = null;
		this.smooth = null;
	}

	_createClass(Contact, [{
		key: 'createExtraBound',
		value: function createExtraBound() {
			var _this = this;

			['initSmooth'].forEach(function (fn) {
				return _this[fn] = _this[fn].bind(_this);
			});
		}
	}, {
		key: 'init',
		value: function init(req, done) {

			_get(Object.getPrototypeOf(Contact.prototype), 'init', this).call(this, req, done);
		}
	}, {
		key: 'dataAdded',
		value: function dataAdded(done) {

			_get(Object.getPrototypeOf(Contact.prototype), 'dataAdded', this).call(this);

			this.ui = (0, _queryDomComponents2['default'])({ el: this.page });

			this.addEvents();

			done();
		}
	}, {
		key: 'initSmooth',
		value: function initSmooth() {

			window.scrollTo(0, 0);

			this.smooth = new _libSmoothSection2['default']({
				touchMultiplier: 1.8,
				forceVS: true,
				page: this.page,
				section: this.ui.overflow,
				sections: this.ui.section,
				head: this.ui.head,
				bg: this.ui.bg,
				els: this.ui.alphas,
				anchor: this.ui.arrow,
				ease: 0.075
			});

			this.smooth.init();
		}
	}, {
		key: 'addEvents',
		value: function addEvents() {
			var _this2 = this;

			window.scrollTo(0, 0);
			setTimeout(function () {
				return _this2.addSlides();
			}, 300);

			this.split = new _libGreenSockSrcUncompressedUtilsSplitText2['default']('h2 span', { type: "chars", position: "relative" });
		}
	}, {
		key: 'addSlides',
		value: function addSlides() {
			var view = this;

			var s = (0, _jquery2['default'])('.slider-screens', this.page);

			if (s) {
				_jquery2['default'].each(s, function (i, container) {

					var width = (0, _jquery2['default'])(container)[0].querySelector('.slide').getBoundingClientRect().width;
					var slider = new _libSlider2['default']({
						container: container,
						size: width,
						cover: true,
						parallax: true
					});

					view.sliders.push(slider);
				});
			}
		}
	}, {
		key: 'animateIn',
		value: function animateIn(req, done) {

			var firstRoute = typeof window.prevRoute === 'undefined';
			var delay = firstRoute ? 1.1 : 0.4;

			_domClasses2['default'].add(_config2['default'].$body, 'is-' + this.slug);

			_utils2['default'].js.lazyload();
			_utils2['default'].js.unlockScroll();

			var tl = new TimelineMax({ paused: true, onComplete: function onComplete() {
					done();
					(0, _jquery2['default'])('.round.arrow').removeClass('hidden');
				} });
			tl.to(this.page, 1, { autoAlpha: 1 });

			if (window.innerWidth > 768) {
				tl.from('.col-8 .slider-container', 1.5, { opacity: 0, x: -200, ease: Expo.easeOut, clearProps: 'transform' }, delay);
				tl.staggerFrom(this.split.chars, 1, { yPercent: -200, ease: Expo.easeOut, clearProps: 'transform' }, 0.001, delay);
				tl.staggerFrom('.js-animate', 1, { y: 50, opacity: 0, ease: Expo.easeOut, clearProps: 'all' }, 0.01, delay);
			}

			tl.restart();

			_utils2['default'].biggie.setPrevRoute(req);
		}
	}, {
		key: 'animateOut',
		value: function animateOut(req, done) {

			_domClasses2['default'].remove(_config2['default'].$body, 'is-' + this.slug);

			var tl = new TimelineMax({ paused: true, onComplete: done });
			tl.to(this.page, .1, { autoAlpha: 0 });
			tl.restart();
		}
	}, {
		key: 'removeEvents',
		value: function removeEvents() {

			if (!this.ui) return;

			this.removeSlides();

			this.ui = null;
		}
	}, {
		key: 'removeSlides',
		value: function removeSlides() {

			this.sliders.forEach(function (slider) {
				return slider.destroy();
			});
			this.sliders = null;
		}
	}, {
		key: 'resize',
		value: function resize(width, height) {

			_get(Object.getPrototypeOf(Contact.prototype), 'resize', this).call(this, width, height);

			if (_utils2['default'].js.crossBorder(640) === 'under') {
				this.smooth && (this.smooth.destroy(), this.smooth = null);
			}
			if (_utils2['default'].js.crossBorder(640) === 'over') {
				if (!this.smooth) this.initSmooth();
			}
		}
	}, {
		key: 'destroy',
		value: function destroy(req, done) {

			this.removeEvents();

			this.ui = null;

			this.view.removeChild(this.page);
			done();
		}
	}]);

	return Contact;
})(_default2['default']);

exports['default'] = Contact;
module.exports = exports['default'];