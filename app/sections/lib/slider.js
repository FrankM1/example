'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _domEvents = require('dom-events');

var _domEvents2 = _interopRequireDefault(_domEvents);

var _domClasses = require('dom-classes');

var _domClasses2 = _interopRequireDefault(_domClasses);

var _domCss = require('dom-css');

var _domCss2 = _interopRequireDefault(_domCss);

var _gsap = require('gsap');

var _gsap2 = _interopRequireDefault(_gsap);

var _domSelect = require('dom-select');

var _domSelect2 = _interopRequireDefault(_domSelect);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var Slider = (function () {
	function Slider(opt) {
		_classCallCheck(this, Slider);

		opt = opt || {};

		this.createBound();
		this.isMobile = _config2['default'].isMobile;

		this.ui = {
			container: opt.container,
			wrapper: (0, _domSelect2['default'])('.wrapper', opt.container),
			slides: _utils2['default'].js.sliceArray(_domSelect2['default'].all('.slide', opt.container)),
			arrows: _utils2['default'].js.sliceArray(_domSelect2['default'].all('.arrow', opt.container))
		};

		this.slide = 1;
		this.parallax = opt.parallax;

		this.cover = opt.cover;

		this.size = opt.size;
		this.length = this.ui.slides.length;
		this.bounding = 0;

		this.debouncedResize = _underscore2['default'].debounce(this.resize, opt.debounced || 300);

		this.init();
	}

	_createClass(Slider, [{
		key: 'createBound',
		value: function createBound() {
			var _this = this;

			['resize', 'slideTo'].forEach(function (fn) {
				return _this[fn] = _this[fn].bind(_this);
			});
		}
	}, {
		key: 'init',
		value: function init() {

			this.resize();

			this.addEvents();

			_domClasses2['default'].add(this.ui.slides[0], 'is-current');

			// if((!this.cover && this.length <= 3) || (this.cover && this.length <= 1)) {
			if (!this.cover && this.length <= 3) {
				_domClasses2['default'].add(this.ui.arrows[0], 'hidden');
				_domClasses2['default'].add(this.ui.arrows[1], 'hidden');
			}

			TweenLite.set(this.ui.wrapper, { x: 0 });
		}
	}, {
		key: 'addEvents',
		value: function addEvents() {

			var self = this;

			this.ui.arrows.forEach(function (arrow) {
				return _domEvents2['default'].on(arrow, 'click', self.slideTo);
			});

			_domEvents2['default'].on(window, 'resize', this.debouncedResize);
		}
	}, {
		key: 'removeEvents',
		value: function removeEvents() {

			var self = this;

			this.ui.arrows.forEach(function (arrow) {
				return _domEvents2['default'].off(arrow, 'click', self.slideTo);
			});

			_domEvents2['default'].off(window, 'resize', this.debouncedResize);
		}
	}, {
		key: 'slideTo',
		value: function slideTo(e) {

			var arrow = e.currentTarget;
			var dir = arrow.getAttribute('data-arrow');
			var max = this.cover ? 0 : 1;

			if (_domClasses2['default'].has(arrow, 'is-disabled')) return;

			this.removeDisabled();

			if (dir === 'prev') {

				1 != this.slide && this.slide--;
			} else {

				this.slide != this.length - max && this.slide++;
			}

			if (this.slide == 1 || this.slide == this.length - max) _domClasses2['default'].add(arrow, 'is-disabled');

			var curSlide = this.ui.slides[this.slide - 1].querySelector('.frame');
			//pantone slider doesn't have .frame
			if (curSlide) {
				//if current is not video, pause video slide
				if (_domClasses2['default'].has(curSlide, 'video-frame') == false) {
					for (var i = 0; i < this.ui.slides.length; i++) {
						if ((0, _jquery2['default'])(this.ui.slides[i]).find('.video-wrap').length > 0) {
							var video = this.ui.slides[i].querySelector('.video-wrap');
							var videoInstance = (0, _jquery2['default'])(video).data('video-instance');
							if (videoInstance) videoInstance.pause();
						}
					}
					//else play video	
				} else {
						var video = curSlide.querySelector('.video-wrap');
						var videoInstance = (0, _jquery2['default'])(video).data('video-instance');
						if (videoInstance) videoInstance.play();
					}
			}

			this.tween();
		}
	}, {
		key: 'removeDisabled',
		value: function removeDisabled() {

			this.ui.arrows.forEach(function (arrow) {
				return _domClasses2['default'].remove(arrow, 'is-disabled');
			});
		}
	}, {
		key: 'removeCurrent',
		value: function removeCurrent() {

			this.ui.slides.forEach(function (slide) {
				return _domClasses2['default'].remove(slide, 'is-current');
			});
		}
	}, {
		key: 'tween',
		value: function tween() {
			var view = this;

			var pos = -this.size * this.slide + this.size;

			this.removeCurrent();

			this.ui.slides[this.slide - 1] && _domClasses2['default'].add(this.ui.slides[this.slide - 1], 'is-current');

			if (this.parallax) {
				_underscore2['default'].delay(function () {
					var current = (0, _jquery2['default'])(view.ui.wrapper).find('.slide.is-current');
					var curFrame = current.find('.frame');
					var prev = current.prev().find('.frame');
					var next = current.next().find('.frame');

					TweenLite.to(view.ui.wrapper, 1, { x: pos, ease: Expo.easeInOut });
					TweenLite.to(curFrame, 1, { xPercent: 0, ease: Expo.easeInOut });
					TweenLite.to(prev, 1, { xPercent: 50, ease: Expo.easeInOut });
					TweenLite.to(next, 1, { xPercent: -50, ease: Expo.easeInOut });
				}, 200);
			} else {
				TweenLite.to(this.ui.wrapper, 1, { x: pos, ease: Expo.easeInOut });
			}
		}
	}, {
		key: 'resize',
		value: function resize() {
			// this.size = this.ui.container instanceof jQuery ? this.ui.container[0].querySelector('.slide').getBoundingClientRect().width : this.ui.container.querySelector('.slide').getBoundingClientRect().width;
			try {
				this.size = this.ui.container[0].querySelector('.slide').getBoundingClientRect().width;
			} catch (err) {
				this.size = this.ui.container.querySelector('.slide').getBoundingClientRect().width;
			}
			this.bounding = this.size * this.length;
		}
	}, {
		key: 'destroy',
		value: function destroy() {

			this.removeEvents();

			this.ui = null;
		}
	}]);

	return Slider;
})();

exports['default'] = Slider;
module.exports = exports['default'];