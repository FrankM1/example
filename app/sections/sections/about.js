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

var _libGreenSockSrcMinifiedPluginsScrollToPluginMin = require('../lib/GreenSock/src/minified/plugins/ScrollToPlugin.min');

var _libGreenSockSrcMinifiedPluginsScrollToPluginMin2 = _interopRequireDefault(_libGreenSockSrcMinifiedPluginsScrollToPluginMin);

var _libGreenSockSrcUncompressedUtilsDraggable = require('../lib/GreenSock/src/uncompressed/utils/Draggable');

var _libGreenSockSrcUncompressedUtilsDraggable2 = _interopRequireDefault(_libGreenSockSrcUncompressedUtilsDraggable);

var _libGreenSockSrcUncompressedPluginsThrowPropsPlugin = require('../lib/GreenSock/src/uncompressed/plugins/ThrowPropsPlugin');

var _libGreenSockSrcUncompressedPluginsThrowPropsPlugin2 = _interopRequireDefault(_libGreenSockSrcUncompressedPluginsThrowPropsPlugin);

var About = (function (_Default) {
	_inherits(About, _Default);

	function About(opt) {
		_classCallCheck(this, About);

		_get(Object.getPrototypeOf(About.prototype), 'constructor', this).call(this, opt);

		this.sliders = [];
		this.createExtraBound();
		this.ww = window.innerWidth;
		this.slideW = 0;
		this.slides = [];
		this.rAF = undefined;

		this.slug = 'culture';
		this.ui = null;
		this.smooth = null;
	}

	_createClass(About, [{
		key: 'createExtraBound',
		value: function createExtraBound() {
			var _this = this;

			['addEvents', 'removeEvents', 'initSmooth', 'expand'].forEach(function (fn) {
				return _this[fn] = _this[fn].bind(_this);
			});
		}
	}, {
		key: 'init',
		value: function init(req, done) {

			_get(Object.getPrototypeOf(About.prototype), 'init', this).call(this, req, done);
		}
	}, {
		key: 'dataAdded',
		value: function dataAdded(done) {

			_get(Object.getPrototypeOf(About.prototype), 'dataAdded', this).call(this);

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
				sidebar: document.querySelector('.about-overview__side'),
				sidebartrigger: document.querySelector('.sidebartrigger'),
				clipsection: document.querySelectorAll('.what-section'),
				els: this.ui.alphas,
				anchor: this.ui.arrow,
				ease: 0.075
			});

			// console.log('about: initSmooth()', document.querySelectorAll('.what-section'));

			this.smooth.init();
		}
	}, {
		key: 'addEvents',
		value: function addEvents() {
			var _this2 = this;

			if (!this.ui) return;

			window.scrollTo(0, 0);

			(0, _jquery2['default'])('.round:not(.expand)').addClass('hidden');

			this.split = new SplitText('.work-section h2 span', { type: "words", position: "relative" });

			setTimeout(function () {
				return _this2.addSlides();
			}, 300);
			this.initDraggable();
			// this.run();

			setTimeout(function () {
				return (0, _jquery2['default'])('.round.expand').on('click', _this2.expand);
			}, 300);
			setTimeout(function () {
				return (0, _jquery2['default'])('.round.close').on('click', _this2.close);
			}, 300);
		}
	}, {
		key: 'mapRange',
		value: function mapRange(from, to, s) {
			return to[0] + (s - from[0]) * (to[1] - to[0]) / (from[1] - from[0]);
		}
	}, {
		key: 'addSlides',
		value: function addSlides() {
			var view = this;

			var s = (0, _jquery2['default'])('.slider-screens', this.page);

			if (s) {
				_jquery2['default'].each(s, function (i, container) {

					var width = (0, _jquery2['default'])(container)[0].querySelector('.slide').getBoundingClientRect().width;
					var options = [];

					if (i == 0) {
						options = {
							container: container,
							size: width,
							cover: true,
							parallax: true
						};
					} else {
						options = {
							container: container,
							size: width
						};
					}

					var slider = new _libSlider2['default'](options);

					view.sliders.push(slider);
				});
			}
		}
	}, {
		key: 'run',
		value: function run() {
			var view = this;

			this.rAF = requestAnimationFrame(function () {

				// var top = document.querySelector('.what-section .bg-anchor').getBoundingClientRect().top;
				// var br = window.innerWidth < 640 ? config.height*1.5 : config.height;
				// if(top - br <= -100) {
				// 	// $('.toggle-section').removeClass('white-background').addClass('dark-background');
				// 	$('.about-overview__side-images').addClass('fade');
				// } else {
				// 	// $('.toggle-section').removeClass('dark-background').addClass('white-background');
				// 	$('.about-overview__side-images').removeClass('fade');
				// }

				view.run();
			});
		}
	}, {
		key: 'expand',
		value: function expand() {
			var toggle = (0, _jquery2['default'])('.about-overview__side-images');
			if (!toggle.hasClass('fullscreen')) {
				toggle.addClass('fullscreen');
				_domClasses2['default'].add(_config2['default'].$body, 'overflow-hidden');
			}
		}
	}, {
		key: 'close',
		value: function close() {
			var toggle = (0, _jquery2['default'])('.about-overview__side-images');
			toggle.removeClass('fullscreen');
			_domClasses2['default'].remove(_config2['default'].$body, 'overflow-hidden');
		}
	}, {
		key: 'initDraggable',
		value: function initDraggable() {
			var view = this;
			this.slides = (0, _jquery2['default'])('.team').find('.slide');
			this.slideW = (0, _jquery2['default'])('.team .slide').width() * -1;

			if (window.innerWidth < 768 && !this.draggable) {
				// TweenLite.set('.team-section .wrapper', {css: {x: 0}});
				this.parallaxFrames(0, 30);

				this.draggable = _libGreenSockSrcUncompressedUtilsDraggable2['default'].create('.team-section .wrapper', {
					type: "x",
					edgeResistance: 0.85,
					edgeTolerance: 0.25,
					bounds: '.team-section .slider-container',
					zIndexBoost: false,
					cursor: 'inherit',
					throwProps: true,
					snap: {
						x: function x(endValue) {
							return Math.round(endValue / view.ww) * view.ww;
						}
					},
					onDrag: function onDrag(e) {
						view.parallaxFrames(view.draggable[0].x, 30);
					},
					onThrowUpdate: function onThrowUpdate(e) {
						view.parallaxFrames(view.draggable[0].x, 30);
					}
				});
			} else if (window.innerWidth < 1024 && !this.draggable) {
				// TweenLite.set('.team-section .wrapper', {css: {x: 0}});
				this.parallaxFrames(0, 15);

				this.draggable = _libGreenSockSrcUncompressedUtilsDraggable2['default'].create('.team-section .wrapper', {
					type: "x",
					edgeResistance: 0.85,
					edgeTolerance: 0.25,
					bounds: '.team-section .slider-container',
					zIndexBoost: false,
					cursor: 'inherit',
					throwProps: true,
					snap: {
						x: function x(endValue) {
							return Math.round(endValue / (view.ww / 2)) * (view.ww / 2);
						}
					},
					onDrag: function onDrag(e) {
						view.parallaxFrames(view.draggable[0].x, 15);
					},
					onThrowUpdate: function onThrowUpdate(e) {
						view.parallaxFrames(view.draggable[0].x, 15);
					}
				});
			} else if (window.innerWidth >= 1024 && !this.draggable) {
				// TweenLite.set('.team-section .wrapper', {css: {x: 0}});
				TweenMax.set('.frame', { xPercent: 0 });

				this.draggable = _libGreenSockSrcUncompressedUtilsDraggable2['default'].create('.team-section .wrapper', {
					type: "x",
					edgeResistance: 0.85,
					edgeTolerance: 0.25,
					bounds: '.team-section .slider-container',
					zIndexBoost: false,
					cursor: 'inherit',
					throwProps: true,
					snap: {
						x: function x(endValue) {
							return Math.round(endValue / (view.ww / 3)) * (view.ww / 3);
						}
					},
					onThrowComplete: function onThrowComplete(e) {
						var slide = Math.round((0, _jquery2['default'])('.team-section .wrapper')[0]._gsTransform.x / view.slideW) + 1;
						view.sliders[1].slide = slide;

						(0, _jquery2['default'])('.team-section .arrow').removeClass('is-disabled');

						if (slide == 1) (0, _jquery2['default'])('.team-section .arrow[data-arrow="prev"]').addClass('is-disabled');
						if (slide == view.slides.length - 1) (0, _jquery2['default'])('.team-section .arrow[data-arrow="next"]').addClass('is-disabled');
					}
				});
			}
		}
	}, {
		key: 'parallaxFrames',
		value: function parallaxFrames(e, p) {
			var _this3 = this;

			TweenMax.staggerTo('.team-section .frame', 0, { cycle: {
					xPercent: function xPercent(i) {
						if (i == 0) {
							var pos = _this3.mapRange([0, _this3.slideW], [0, p], e);
						} else {
							var pos = _this3.mapRange([0, _this3.slideW * i], [-p * i, 0], e);
						}
						return pos;
					}
				} });
		}
	}, {
		key: 'animateIn',
		value: function animateIn(req, done) {

			var firstRoute = typeof window.prevRoute === 'undefined';
			var delay = firstRoute ? 1.1 : 0.4;

			_domClasses2['default'].add(_config2['default'].$body, 'is-' + this.slug);

			_utils2['default'].js.lazyload();
			_utils2['default'].js.unlockScroll();

			var tl = new TimelineMax({ paused: true, onComplete: done });
			tl.to(this.page, 1, { autoAlpha: 1 });
			tl.restart();

			if (window.innerWidth > 768) {
				tl.from('.about-overview__side', 1.5, { opacity: 0, x: -200, ease: Expo.easeOut }, delay);
				tl.staggerFrom(this.split.chars, 1, { yPercent: -200, ease: Expo.easeOut, clearProps: 'transform' }, 0.001, delay);
				tl.staggerFrom('.work-section .block .col-6', 1, { y: 50, opacity: 0, ease: Expo.easeOut, clearProps: 'all' }, 0.01, delay);
			}

			if (!this.smooth && !_config2['default'].isMobile && !_config2['default'].isTablet) this.initSmooth();

			(0, _jquery2['default'])('.round.expand').removeClass('hidden');

			_utils2['default'].biggie.setPrevRoute(req);
		}
	}, {
		key: 'removeEvents',
		value: function removeEvents() {

			if (!this.ui) return;

			this.removeSlides();
			this.draggable[0].kill();

			(0, _jquery2['default'])('.round.expand').off('click', this.expand);

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
		key: 'animateOut',
		value: function animateOut(req, done) {

			_domClasses2['default'].remove(_config2['default'].$body, 'is-' + this.slug);

			var tl = new TimelineMax({ paused: true, onComplete: done });
			tl.to(this.page, .1, { autoAlpha: 0 });
			tl.restart();
		}
	}, {
		key: 'resize',
		value: function resize(width, height) {

			_get(Object.getPrototypeOf(About.prototype), 'resize', this).call(this, width, height);

			if (this.ww != width) {
				this.draggable[0].kill();
				this.draggable = false;
				this.initDraggable();
			}

			this.ww = window.innerWidth;

			this.slideW = (0, _jquery2['default'])('.team .slide').width() * -1;

			if (_utils2['default'].js.crossBorder(640) === 'under') {
				this.smooth && (this.smooth.destroy(), this.smooth = null);
			}
			if (_utils2['default'].js.crossBorder(640) === 'over') {
				if (!this.smooth) this.initSmooth();
			}

			// $('.round.expand').off('click', this.expand);
			// $('.round.expand').on('click', this.expand);
		}
	}, {
		key: 'destroy',
		value: function destroy(req, done) {

			cancelAnimationFrame(this.rAF);
			this.removeEvents();

			this.view.removeChild(this.page);
			done();
		}
	}]);

	return About;
})(_default2['default']);

exports['default'] = About;
module.exports = exports['default'];