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

var _domCss = require('dom-css');

var _domCss2 = _interopRequireDefault(_domCss);

var _queryDomComponents = require('query-dom-components');

var _queryDomComponents2 = _interopRequireDefault(_queryDomComponents);

var _libSmoothProjects = require('../lib/smooth/projects');

var _libSmoothProjects2 = _interopRequireDefault(_libSmoothProjects);

var _componentsLogo = require('../components/logo');

var _componentsLogo2 = _interopRequireDefault(_componentsLogo);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _default = require('./default');

var _default2 = _interopRequireDefault(_default);

var Work = (function (_Default) {
	_inherits(Work, _Default);

	function Work(opt) {
		_classCallCheck(this, Work);

		_get(Object.getPrototypeOf(Work.prototype), 'constructor', this).call(this, opt);

		this.createExtraBound();

		this.slug = 'case';
		this.ui = null;
		this.smooth = null;

		this.prevRouteIsSingle = window.prevRoute && window.prevRoute.url != '/case' && window.prevRoute.slug.indexOf('case/') !== -1;

		console.log('work: constructor()', '');
	}

	_createClass(Work, [{
		key: 'createExtraBound',
		value: function createExtraBound() {
			var _this = this;

			['initSmooth', 'goProject'].forEach(function (fn) {
				return _this[fn] = _this[fn].bind(_this);
			});
		}
	}, {
		key: 'init',
		value: function init(req, done) {

			_get(Object.getPrototypeOf(Work.prototype), 'init', this).call(this, req, done);
		}
	}, {
		key: 'dataAdded',
		value: function dataAdded(done) {

			this.ui = (0, _queryDomComponents2['default'])({ el: this.page });

			if (this.prevRouteIsSingle) {
				TweenLite.set(this.page, { y: '-50%' });
				TweenLite.set(this.ui.overflow, { autoAlpha: 1, x: '0%' });
			}

			this.addEvents();

			done();
		}
	}, {
		key: 'initSmooth',
		value: function initSmooth() {

			window.scrollTo(0, 0);

			_domClasses2['default'].add(this.page, 'is-ready');

			this.smooth = new _libSmoothProjects2['default']({
				direction: 'horizontal',
				section: this.ui.overview,
				forceVS: true,
				touchMultiplier: 2,
				ease: 0.075
			});

			this.smooth.init();
		}
	}, {
		key: 'addEvents',
		value: function addEvents() {
			var _this2 = this;

			_utils2['default'].js.sliceArray(this.ui.el).forEach(function (el) {
				_domEvents2['default'].on(el, 'click', _this2.goProject);
			});
		}
	}, {
		key: 'removeEvents',
		value: function removeEvents() {
			var _this3 = this;

			_utils2['default'].js.sliceArray(this.ui.el).forEach(function (el) {
				_domEvents2['default'].off(el, 'click', _this3.goProject);
			});
		}
	}, {
		key: 'animateIn',
		value: function animateIn(req, done) {

			_domClasses2['default'].add(_config2['default'].$body, 'is-' + this.slug);

			var tl = new TimelineMax({ paused: true, onComplete: done });

			if (!window.prevRoute) {
				tl.to(this.page, 2, { y: '0%', autoAlpha: 1 }, 0);
			} else {
				tl.set(this.page, { autoAlpha: 1 });
			}

			tl.to(this.page, 1.3, { y: '0%', ease: Power4.easeInOut }, 0);

			if (!this.prevRouteIsSingle) tl.staggerTo(this.ui.overflow, 0.8, { autoAlpha: 1, x: '0%', ease: Expo.easeOut }, 0.1, 0);

			tl.restart();

			TweenMax.delayedCall(0.5, this.initSmooth);

			_utils2['default'].biggie.setPrevRoute(req);
		}
	}, {
		key: 'animateOut',
		value: function animateOut(req, done) {

			_domClasses2['default'].remove(_config2['default'].$body, 'is-' + this.slug);
			_domClasses2['default'].remove(this.page, 'is-ready');

			if (!req.route.indexOf('case') !== -1) {
				TweenLite.set(this.page, { clip: _utils2['default'].css.getRect(0, _config2['default'].width, _config2['default'].height, 0) });
			}

			TweenLite.set(this.page, { zIndex: 5 });

			done();
		}
	}, {
		key: 'resize',
		value: function resize(width, height) {

			_get(Object.getPrototypeOf(Work.prototype), 'resize', this).call(this, width, height);

			// this.setElements(width, height);
		}
	}, {
		key: 'setElements',
		value: function setElements(width, height) {

			if (width <= 1024) {

				var small = width < 550 ? true : false;

				var column = small ? width : width / 2;

				var clip = {
					top: 0,
					left: 0,
					right: width,
					bottom: small ? height / 2 : height
				};

				var transform = {
					x: small ? 0 : width / 4 + clip.left / 2,
					y: small ? 0 : height / 4,
					scale: small ? 1 : 0.5
				};
			} else {

				var column = width / 3;

				var clip = {
					top: 0,
					left: width / 3 / 2,
					right: width - width / 3 / 2,
					bottom: height
				};

				var transform = {
					x: width / 4 + clip.left / 2,
					y: height / 4,
					scale: 0.5
				};
			}

			var bounding = column * this.ui.el.length;

			// columns
			_utils2['default'].js.sliceArray(this.ui.el).forEach(function (el) {
				(0, _domCss2['default'])(el, 'width', column);
			});

			// image rect
			_utils2['default'].js.sliceArray(this.ui.bg).forEach(function (el) {
				(0, _domCss2['default'])(el, {
					width: _config2['default'].width,
					height: _config2['default'].height,
					clip: _utils2['default'].css.getRect(clip.top, clip.right, clip.bottom, clip.left),
					transform: 'translate3d(-' + transform.x + 'px,-' + transform.y + 'px,0) scale3d(' + transform.scale + ',' + transform.scale + ',' + transform.scale + ')'
				});
			});

			// wrapper
			(0, _domCss2['default'])(this.ui.overview, 'width', bounding);
		}
	}, {
		key: 'goProject',
		value: function goProject(e) {

			var target = e.currentTarget;

			var href = target.getAttribute('data-href');

			var image = (0, _jquery2['default'])('.work-bg', target);
			var content = (0, _jquery2['default'])('.work-content', target);

			var bounding = image.getBoundingClientRect();
			var x = _config2['default'].width <= 1024 ? bounding.left : bounding.left + _config2['default'].width / 3 / 4;

			this.smooth && (this.smooth.destroy(), this.smooth = null);

			var tl = new TimelineMax({ paused: true, onComplete: function onComplete() {
					_framework2['default'].go(href);
				} });

			tl.set(target, { zIndex: 5, overflow: 'inherit' });
			tl.to(content, 0.6, { autoAlpha: 0 }, 0);
			tl.to(image, 0.8, { x: -x, y: 0, clip: _utils2['default'].css.getRect(0, _config2['default'].width, _config2['default'].height, 0), scale: 1, ease: Expo.easeInOut }, 0);
			tl.restart();
		}
	}, {
		key: 'destroy',
		value: function destroy(req, done) {
			var _this4 = this;

			this.smooth && (this.smooth.destroy(), this.smooth = null);

			this.removeEvents();

			this.ui = null;

			var tl = new TimelineMax({ paused: true, onComplete: function onComplete() {
					done();
					_this4.view.removeChild(_this4.page);
				} });

			if (req.route.indexOf('case') !== -1 || req.route == '/cases' || req.route == '/culture' || req.route == '/contact') {
				tl.to(this.page, 0.5, { autoAlpha: 0 });
			} else {
				tl.to(this.page, 1, { y: '50%', clip: _utils2['default'].css.getRect(_config2['default'].height / 2, _config2['default'].width, _config2['default'].height, 0), ease: Expo.easeInOut });
			}

			tl.restart();
		}
	}]);

	return Work;
})(_default2['default']);

exports['default'] = Work;
module.exports = exports['default'];