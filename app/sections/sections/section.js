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

var _hammerjs = require('hammerjs');

var _hammerjs2 = _interopRequireDefault(_hammerjs);

var _libGreenSockSrcMinifiedPluginsScrollToPluginMin = require('../lib/GreenSock/src/minified/plugins/ScrollToPlugin.min');

var _libGreenSockSrcMinifiedPluginsScrollToPluginMin2 = _interopRequireDefault(_libGreenSockSrcMinifiedPluginsScrollToPluginMin);

var _libGreenSockSrcUncompressedUtilsDraggable = require('../lib/GreenSock/src/uncompressed/utils/Draggable');

var _libGreenSockSrcUncompressedUtilsDraggable2 = _interopRequireDefault(_libGreenSockSrcUncompressedUtilsDraggable);

var _libGreenSockSrcUncompressedPluginsThrowPropsPlugin = require('../lib/GreenSock/src/uncompressed/plugins/ThrowPropsPlugin');

var _libGreenSockSrcUncompressedPluginsThrowPropsPlugin2 = _interopRequireDefault(_libGreenSockSrcUncompressedPluginsThrowPropsPlugin);

var _libGreenSockSrcUncompressedUtilsSplitText = require('../lib/GreenSock/src/uncompressed/utils/SplitText');

var _libGreenSockSrcUncompressedUtilsSplitText2 = _interopRequireDefault(_libGreenSockSrcUncompressedUtilsSplitText);

var _videoJs = require('video.js');

var _videoJs2 = _interopRequireDefault(_videoJs);

var _videojsVimeo = require('videojs-vimeo');

var _videojsVimeo2 = _interopRequireDefault(_videojsVimeo);

var Section = (function (_Default) {
	_inherits(Section, _Default);

	function Section(opt) {
		_classCallCheck(this, Section);

		_get(Object.getPrototypeOf(Section.prototype), 'constructor', this).call(this, opt);

		this.createExtraBound();

		this.slug = 'single';
		this.ui = null;
		this.smooth = null;
		this.sliders = [];
		this.lazyloaded = false;
		this.scrolled = 0;
		this.dragged = false;
		this.speed = 0.6;
		this.sideHref = {
			left: '/',
			right: '/'
		};
		this.arrowTL = null;
		this.isScrolling = false;
		this.loaded = false;
		this.ww = window.innerWidth;
		this.wh = window.innerHeight;

		this.lastScrollTop = 0;
		this.delta = 20;

		this.direction = null;
		this.isFromHome = window.prevRoute && window.prevRoute.slug == '/cases';
		this.isFromSingle = window.prevRoute && window.prevRoute.slug.indexOf('case/') !== -1;

		console.log('section: constructor()', '');
	}

	_createClass(Section, [{
		key: 'createExtraBound',
		value: function createExtraBound() {
			var _this = this;

			// ['addEvents', 'removeEvents', 'initSmooth', 'mouseEnter', 'mouseLeave' , 'switchCase', 'ontouchstart', 'ontouchmove', 'ontouchend', 'onPan']
			['addEvents', 'removeEvents', 'initSmooth', 'keyPressed', 'scrollDown', 'switchCase', 'ontouchstart', 'ontouchmove', 'ontouchend', 'onPan', 'loopCheck'].forEach(function (fn) {
				return _this[fn] = _this[fn].bind(_this);
			});
		}
	}, {
		key: 'init',
		value: function init(req, done) {

			_get(Object.getPrototypeOf(Section.prototype), 'init', this).call(this, req, done);
		}
	}, {
		key: 'dataAdded',
		value: function dataAdded(done) {
			var $single = (0, _jquery2['default'])(this.page).find('.work-single');
			this.darkBackground = $single.data('dark');

			_get(Object.getPrototypeOf(Section.prototype), 'dataAdded', this).call(this);

			this.ui = (0, _queryDomComponents2['default'])({ el: this.page });

			this.next = $single.attr('data-next');
			this.prev = $single.attr('data-prev');

			console.log('section: dataAdded()', this.ui);

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
				headerDarkBg: this.darkBackground,
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

			if (!this.ui) return;

			setTimeout(function () {
				return _this2.addSlides();
			}, 300);

			if (this.ww >= 640) {
				this.split = new _libGreenSockSrcUncompressedUtilsSplitText2['default']('.work-head span', { type: "words,chars", position: "relative" });
				this.sidesplit = new _libGreenSockSrcUncompressedUtilsSplitText2['default']('.js-side .work-head span', { type: "words,chars", position: "relative" });
			}

			if (!this.ui.side.length) this.ui.side = [this.ui.side];

			if (!_config2['default'].isMobile && !_config2['default'].isTablet) {
				// $('.js-round').on('mouseenter', this.mouseEnter);
				// $('.js-round').on('mouseleave', this.mouseLeave);
			} else {
					this.rAF();
				}

			(0, _jquery2['default'])('.js-round').on('click', this.switchCase);
			// $('.round-back').off('click', this.goHome);
			// $('.round-back').on('click', this.goHome);

			(0, _jquery2['default'])(window).on('keydown', this.keyPressed);
			if (!(0, _jquery2['default'])('.round-back').hasClass('stop-animate')) {
				(0, _jquery2['default'])('.round-back').off('click', this.scrollDown);
				(0, _jquery2['default'])('.round-back').on('click', this.scrollDown);
			} else {
				(0, _jquery2['default'])('.round-back').off('click', this.goHome);
				(0, _jquery2['default'])('.round-back').on('click', this.goHome);
			}

			this.readVerticalDragging();

			this.initVideos();
		}
	}, {
		key: 'readVerticalDragging',
		value: function readVerticalDragging() {

			(0, _jquery2['default'])(window).on('touchstart', this.ontouchstart);
			(0, _jquery2['default'])(window).on('touchmove', this.ontouchmove);
			(0, _jquery2['default'])(window).on('touchend', this.ontouchend);
		}
	}, {
		key: 'unReadVerticalDragging',
		value: function unReadVerticalDragging() {

			(0, _jquery2['default'])(window).off('touchstart', this.ontouchstart);
			(0, _jquery2['default'])(window).off('touchmove', this.ontouchmove);
			(0, _jquery2['default'])(window).off('touchend', this.ontouchend);
		}
	}, {
		key: 'scrollDown',
		value: function scrollDown() {
			var heroBottom = document.querySelector('.work-thumbs').getBoundingClientRect().bottom * 1.05;
			if (!this.smooth) {
				TweenMax.to(window, .8, { scrollTo: { y: heroBottom }, ease: this.ease }, 0);
			} else {
				TweenMax.to(this.smooth.pos, .8, { current: heroBottom, ease: this.ease }, 0);
			}
		}
	}, {
		key: 'animateArrow',
		value: function animateArrow() {
			this.arrowTL = new TimelineMax({ repeat: -1 }).set('.js-arrowDown', { yPercent: -200 }).to('.animation-arrow-down', .4, { yPercent: 200, transformOrigin: "left", ease: Expo.easeIn }, 1).to('.animation-arrow-down__line', .4, { yPercent: 200, ease: Expo.easeIn }, 1.04).to('.js-arrowDown', .4, { yPercent: 0, ease: Expo.easeOut }, 1.4).set('.animation-arrow-down, .animation-arrow-down__line', { display: 'none' }, 1.8).call(this.loopCheck);
		}
	}, {
		key: 'loopCheck',
		value: function loopCheck() {
			if ((0, _jquery2['default'])('.round-back').hasClass('stop-animate')) {
				this.arrowTL.pause();
				(0, _jquery2['default'])('.round-back').removeClass('no-hover');
				(0, _jquery2['default'])('.round-back').off('click', this.scrollDown);
				(0, _jquery2['default'])('.round-back').on('click', this.goHome);
			}
		}
	}, {
		key: 'initVideos',
		value: function initVideos() {
			var _this3 = this;

			this.videos = [];

			(0, _jquery2['default'])(this.page).find('.video-js').each(function (i, videoEl) {

				var $originalParent = (0, _jquery2['default'])(videoEl).parent();
				var src = (0, _jquery2['default'])(videoEl).data('src');

				var videoInstance = (0, _videoJs2['default'])(videoEl, {
					"controls": true,
					"techOrder": ["vimeo"],
					"sources": [{
						"type": "video/vimeo",
						"src": src
					}],
					"vimeo": {
						"autoplay": 1,
						"iv_load_policy": 1
					}
				});

				videoInstance.muted(true);
				var looping = false;

				videoInstance.on('timeupdate', function () {
					if (videoInstance.remainingTime() < 0.25 && videoInstance.remainingTime() !== 0 && looping === false) {
						looping = true;
						videoInstance.currentTime(0.15);

						setTimeout(function () {
							looping = false;
						}, 500);
					}
				});

				$originalParent.data('video-instance', videoInstance);
				_this3.videos.push(videoInstance);
			});
		}
	}, {
		key: 'ontouchstart',
		value: function ontouchstart(ev) {

			this.touchScreenY = ev.originalEvent.touches[0].screenY;
			this.touchScreenX = ev.originalEvent.touches[0].screenX;
		}
	}, {
		key: 'ontouchmove',
		value: function ontouchmove(ev) {

			if (!(0, _jquery2['default'])('body').hasClass('scroll-lock')) {
				var touchMovedY = Math.abs(ev.originalEvent.touches[0].screenY - this.touchScreenY);
				var touchMovedX = Math.abs(ev.originalEvent.touches[0].screenX - this.touchScreenX);

				if (touchMovedY > touchMovedX) this.isScrolling = true;
			}
		}
	}, {
		key: 'ontouchend',
		value: function ontouchend() {

			this.isScrolling = false;
		}
	}, {
		key: 'goHome',
		value: function goHome(e) {
			e.preventDefault();
			_framework2['default'].go((0, _jquery2['default'])(this).attr('data-href'));
		}
	}, {
		key: 'handleHammer',
		value: function handleHammer() {

			this.hammertime = new _hammerjs2['default'](this.page, {
				direction: _hammerjs2['default'].DIRECTION_HORIZONTAL,
				dragLockToAxis: true,
				dragBlockHorizontal: true
			});

			this.hammertime.on('panup pandown panleft panright panend swipeleft swiperight', this.onPan);
		}
	}, {
		key: 'onPan',
		value: function onPan(ev) {

			var view = this;
			var target = view.smooth ? view.smooth.pos.target : _utils2['default'].js.scrollTop();
			var endPos = 0;
			var delta = 0;
			var tl = undefined;

			var tr = view.page._gsTransform ? view.page._gsTransform.xPercent : 0;
			var dragLeft = ev.type == 'panleft' || ev.type == 'swipeleft';
			var dragRight = ev.type == 'panright' || ev.type == 'swiperight';
			var blockPrev = this.prev == '' && tr >= 0;
			var resetPrev = this.prev == '' && tr > 0;
			var blockNext = this.next == '' && tr <= 0;
			var resetNext = this.next == '' && tr < 0;

			if (view.isScrolling == false && target < window.innerHeight * 0.2 && !(dragLeft && (blockNext || resetPrev)) && !(dragRight && (blockPrev || resetNext))) {

				_utils2['default'].js.lockScroll();
				delta = view.next == '' ? Math.max(0, ev.deltaX / this.ww) : view.prev == '' ? Math.min(0, ev.deltaX / this.ww) : ev.deltaX / this.ww;
				TweenMax.set(view.page, { xPercent: delta * 100 });
				TweenMax.set('.work-thumbs__inner', { xPercent: delta * -50 });
				TweenMax.set('.project-side.right .project-side__img', { xPercent: delta * -50 });
				TweenMax.set('.project-side.left .project-side__img', { xPercent: delta * -50 });

				if (ev.type == 'panend' || ev.type == 'swipeleft' || ev.type == 'swiperight') {

					if (ev.deltaX * -1 > this.ww / 2 && this.next != '' || ev.type == 'swipeleft') {
						view.animateOutDir('right');
						tl = new TimelineMax({ paused: true, onComplete: view.switchCase('right') });
						endPos = -100;
						view.dragged = true;
					} else if (ev.deltaX > this.ww / 2 && this.prev != '' || ev.type == 'swiperight') {
						view.animateOutDir('left');
						tl = new TimelineMax({ paused: true, onComplete: view.switchCase('left') });
						endPos = 100;
						view.dragged = true;
					} else {
						tl = new TimelineMax({ paused: true });
						endPos = 0;
						_utils2['default'].js.unlockScroll();
					}

					tl.to(view.page, 0.3, { xPercent: endPos }, 0);
					tl.to('.work-thumbs__inner', 0.3, { xPercent: endPos * -0.5 }, 0);
					tl.to('.project-side.right .project-side__img', 0.3, { xPercent: endPos * -0.5 }, 0);
					tl.to('.project-side.left .project-side__img', 0.3, { xPercent: endPos * -0.5 }, 0);
					tl.restart();
				}
			}
		}
	}, {
		key: 'removeEvents',
		value: function removeEvents() {
			console.log("remove events");

			if (!this.ui) return;

			this.removeSlides();

			// $('.js-round').off('mouseenter', this.mouseEnter);
			// $('.js-round').off('mouseleave', this.mouseLeave);
			(0, _jquery2['default'])('.js-round').off('click', this.switchCase);
			(0, _jquery2['default'])('.video-wrap').off('click', this.controlVideo);
			(0, _jquery2['default'])(window).off('keydown', this.keyPressed);
			// $('.round-back').off('click', this.goHome);

			this.unReadVerticalDragging();
			cancelAnimationFrame(this.homeAnimation);
			// $('.round').removeClass('hidden');

			this.ui = null;
		}
	}, {
		key: 'rAF',
		value: function rAF() {
			if (this.isFromSingle) {
				this.smooth && (this.smooth.pos.current = 0);
				// window.scrollTo(0,0);
			}

			var view = this;

			function run() {

				view.homeAnimation = requestAnimationFrame(run);

				if (!view.loaded) view.touchDrag();
				if (view.ww < 640) view.toggleButtons();

				if (window.pageYOffset > view.wh) {
					(0, _jquery2['default'])('.round-back').addClass('stop-animate');
					(0, _jquery2['default'])('.round-back').removeClass('no-hover');
				}
			}

			run();
		}
	}, {
		key: 'touchDrag',
		value: function touchDrag() {

			var current = this.smooth ? this.smooth.pos.target : window.pageYOffset;

			if (current >= 200) {
				// cancelAnimationFrame(this.homeAnimation);

				if (!this.loaded) {
					_utils2['default'].js.lazyload();
					this.loaded = true;
				}
			}
		}
	}, {
		key: 'toggleButtons',
		value: function toggleButtons() {
			var st = window.pageYOffset;

			if (Math.abs(this.lastScrollTop - st) <= this.delta) return;

			// If they scrolled down and are past the navbar, add class .nav-up.
			// This is necessary so you never see what is "behind" the navbar.
			if (st > this.lastScrollTop && st > 75) {
				// Scroll Down
				(0, _jquery2['default'])('.round').addClass('hidden');
			} else {
				// Scroll Up
				if (st + (0, _jquery2['default'])(window).height() < (0, _jquery2['default'])(document).height()) {
					(0, _jquery2['default'])('.round').removeClass('hidden');
				}
			}

			this.lastScrollTop = st;
		}
	}, {
		key: 'addSlides',
		value: function addSlides() {
			var view = this;
			console.log('section: addSlides()', '');

			var p = (0, _jquery2['default'])(this.page).find('.slider-pantone');
			var s = (0, _jquery2['default'])(this.page).find('.slider-screens');

			if (p) {
				var slider = new _libSlider2['default']({
					container: p,
					cover: this.isMobile ? true : false,
					size: 250
				});

				this.sliders.push(slider);
			}

			if (s) {
				_jquery2['default'].each(s, function (i, container) {
					var width = (0, _jquery2['default'])(container)[0].querySelector('.slide').getBoundingClientRect().width;
					// const parallax = classes.has( $(container)[0].querySelector('.slider-container'), 'parallax' );
					// console.log(parallax);
					var slider = new _libSlider2['default']({
						container: container,
						cover: true,
						size: width,
						parallax: true
					});

					view.sliders.push(slider);
				});
			}
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
		key: 'updateArrows',
		value: function updateArrows() {
			var el = (0, _jquery2['default'])(this.page).find('.work-single');

			if (el.attr('data-prev').length > 0) {
				(0, _jquery2['default'])('.round-prev').removeClass('is-disabled');
			} else {
				(0, _jquery2['default'])('.round-prev').addClass('is-disabled');
			}

			if (el.attr('data-next').length > 0) {
				(0, _jquery2['default'])('.round-next').removeClass('is-disabled');
			} else {
				(0, _jquery2['default'])('.round-next').addClass('is-disabled');
			}

			this.sideHref.right = (0, _jquery2['default'])(this.page).find('.project-side.right').attr('data-href');
			this.sideHref.left = (0, _jquery2['default'])(this.page).find('.project-side.left').attr('data-href');
		}

		// mouseEnter(e) {

		// 	const slideX = 15;
		// 	const target = e.currentTarget;
		// 	if( !$(target).hasClass('is-disabled') && !$(target).hasClass('round-back') && !config.isMobile && !config.isTablet ) {

		// 		const direction = this.direction = window.transitionProject = target.getAttribute('data-dir');
		// 		const left = direction === 'left';
		// 		const index = direction === 'left' ? 0 : 1;
		// 		const offset = (slideX / this.ww) * 100;
		// 		const side = this.ui.side.length == 2 ? this.ui.side[index] : this.ui.side[0]

		// 		const tl = new TimelineMax({ paused: true });
		// 		tl.to(this.page, this.speed, { xPercent: left ? offset : -offset, ease: Expo.easeOut }, 0);
		// 		tl.to(side, this.speed, { xPercent: left ? offset/5 : -offset/5, ease: Expo.easeOut }, 0);
		// 		tl.to('.work-head.js-head h1', this.speed, { x: left ? -slideX : slideX, ease: Expo.easeOut }, 0);
		// 		tl.to(side.querySelector('.project-side__img'), this.speed, { x: left ? '48%' : '-48%', ease: Expo.easeOut }, 0);
		// 		tl.restart();
		// 	}
		// }

		// mouseLeave(e) {

		// 	const target = e.currentTarget;
		// 	const direction = this.direction = window.transitionProject = e.currentTarget.getAttribute('data-dir');
		// 	const left = direction === 'left';
		// 	const index = direction === 'left' ? 0 : 1;
		// 	const side = this.ui.side.length == 2 ? this.ui.side[index] : this.ui.side[0]

		// 	const tl = new TimelineMax({ paused: true });
		// 	tl.to(this.page, this.speed/2, { xPercent: 0, ease: Power1.easeOut }, 0);
		// 	tl.to(side, this.speed/2, { xPercent: 0, ease: Power1.easeOut }, 0);
		// 	tl.to('.work-head.js-head h1', this.speed/2, { x: 0, ease: Power1.easeOut }, 0);
		// 	tl.to(side.querySelector('.project-side__img'), this.speed/2, { x: left ? '50%' : '-50%', ease: Power1.easeOut }, 0);
		// 	tl.restart();
		// }

	}, {
		key: 'keyPressed',
		value: function keyPressed(e) {
			if (e.keyCode == 39) this.switchCase('right');
			if (e.keyCode == 37) this.switchCase('left');
		}
	}, {
		key: 'switchCase',
		value: function switchCase(e) {

			// window.saves = e.currentTarget ? this.page._gsTransform.xPercent : transform;
			// window.timestamp = new Date().getTime();

			this.needsScroll = (this.smooth ? this.smooth.pos.current : _utils2['default'].js.scrollTop()) > 0;

			if (this.hammertime) {
				this.hammertime.off('panup pandown panleft panright panend swipeleft swiperight', this.onPan);
				this.hammertime.destroy();
			}

			// $('.js-round').off('mouseenter', this.mouseEnter);
			// $('.js-round').off('mouseleave', this.mouseLeave);

			var direction = e.currentTarget ? window.transitionProject = (0, _jquery2['default'])(e.currentTarget).attr('data-dir') : window.transitionProject = e;
			if (direction == 'left') _framework2['default'].go(this.sideHref.left);
			if (direction == 'right') _framework2['default'].go(this.sideHref.right);
		}
	}, {
		key: 'animateIn',
		value: function animateIn(req, done) {
			var view = this;

			window.scrollTo(0, 0);

			_domClasses2['default'].add(_config2['default'].$body, 'is-' + this.slug);
			_domClasses2['default'].add(this.ui.bg, 'is-ready');

			(0, _jquery2['default'])('.round-back').removeClass('hidden');

			var firstRoute = typeof window.prevRoute === 'undefined';
			var tl = new TimelineMax({ paused: true, onComplete: function onComplete() {
					_utils2['default'].js.unlockScroll();
					view.handleHammer();
					done();
					// TweenMax.set('.caseAnimation, .caseAnimation__inner, .caseAnimation__img, .caseAnimation .work-details', {clearProps: 'all'});
				} });
			// tl.to('.project-side.left .project-side__img', 1.1, { xPercent: 50, ease:Power4.easeInOut }, 0);
			// tl.to('.project-side.right .project-side__img', 1.1, { xPercent: -50, ease:Power4.easeInOut }, 0);

			// mask effect
			if (firstRoute) {
				// || isFromWork
				tl.to(this.page, 1.2, { autoAlpha: 1 }, 0);
			} else if (this.isFromSingle) {
				// tl.to(this.page, 1.1, { xPercent: 0, ease: Power4.easeInOut }, 0);
				tl.to('.work-thumbs__inner', 0.001, { xPercent: 0, ease: Power4.easeInOut }, 0);
				tl.set(this.page, { autoAlpha: 1 }, 0);
			} else if (this.isFromHome) {
				tl.set(this.page, { autoAlpha: 1 }, 0);

				tl.to('.caseAnimation', 0.5, { opacity: 0, delay: 0.2 }, 0);
				tl.set('.caseAnimation', { display: 'none', clearProps: 'opacity' });
			}

			if (!this.isFromSingle && this.ww >= 640) {
				tl.staggerFrom(this.split.chars, 1, { yPercent: 200, ease: Expo.easeOut, clearProps: 'transform' }, 0.01, firstRoute ? 1 : .1);
			}

			tl.restart();

			window.transitionProject = null;

			if (!_config2['default'].isMobile && !_config2['default'].isTablet) {
				this.lazyloaded = true;
				_utils2['default'].js.lazyload();
				this.initSmooth();
			}

			this.updateArrows();

			if (!_config2['default'].isMobile) _componentsLogo2['default'].animateIn();

			if (!(0, _jquery2['default'])('.round-back').hasClass('stop-animate')) this.animateArrow();

			_utils2['default'].biggie.setPrevRoute(req);
		}
	}, {
		key: 'animateOutDir',
		value: function animateOutDir(e) {

			var direction = this.direction = window.transitionProject = e.currentTarget ? e.currentTarget.getAttribute('data-dir') : e;
		}
	}, {
		key: 'animateOut',
		value: function animateOut(req, done) {

			_utils2['default'].js.lockScroll();

			var isNextSingle = req.route != '/projects' && req.route.indexOf('case/') !== -1;
			var needsScrollTop = this.smooth ? this.smooth.pos.lastCurrent : _utils2['default'].js.scrollTop();

			_domClasses2['default'].remove(_config2['default'].$body, 'is-' + this.slug);
			_domClasses2['default'].remove(this.ui.bg, 'is-ready');
			// classes.add(this.ui.nav, 'is-hidden-force');

			if (!isNextSingle) (0, _jquery2['default'])('.round-back').addClass('hidden');

			if (isNextSingle) {

				// $('body').addClass('is-loading');

				if (!this.dragged) {

					var left = window.transitionProject === 'left';
					var value = left ? 100 : -100;
					var tl = new TimelineMax({ paused: true, onComplete: function onComplete() {
							console.log('calling done()');
							done();
						} }); //, onComplete: done
					var index = left ? 0 : 1;
					var side = this.ui.side.length == 2 ? this.ui.side[index] : this.ui.side[0];

					if (!this.smooth) {
						tl.set(side, { y: window.pageYOffset }, 0);
					}

					tl.to(this.page, 1.2, { xPercent: value, ease: Expo.easeInOut }, 0);
					tl.to((0, _jquery2['default'])(this.page).find('.work-thumbs__inner'), 1.2, { xPercent: value * -0.5, ease: Expo.easeInOut }, 0);
					tl.to(side, 1.5, { xPercent: 0, ease: Expo.easeInOut }, 0);
					tl.to(side.querySelector('.project-side__img'), 1.2, { x: '0%', ease: Expo.easeInOut }, 0);

					// if(needsScrollTop) {
					//    	if(!this.smooth) {
					// 		TweenMax.to(window, .8, {scrollTo:{y:0}, ease:this.ease, onComplete: () => tl.restart() });
					// 	} else {
					// 		TweenMax.to(this.smooth.pos, .8, {current:0, ease:this.ease, onComplete: () => tl.restart() });
					// 	}
					//    } else {
					tl.restart();
					// }
				} else {
						done();
					}
			} else if (req.route == '/cases') {

				var img = (0, _jquery2['default'])('.work-thumbs__inner').css('background-image');
				var img_pos = (0, _jquery2['default'])('.work-thumbs__inner').attr('data-centerset');
				var delay = 0;

				(0, _jquery2['default'])('.caseAnimation__img').css({ 'background-image': img, 'background-position': img_pos + '%' });
				(0, _jquery2['default'])('.caseAnimation__inner .work-head').remove();
				(0, _jquery2['default'])('.caseAnimation__inner .work-details').remove();

				var tl = new TimelineMax({ paused: true, onComplete: function onComplete() {
						TweenMax.set('.caseAnimation, .caseAnimation__inner, .caseAnimation__img, .caseAnimation .work-details', { clearProps: 'transform' });
						TweenMax.set('.caseAnimation', { display: 'block', yPercent: 0 });
						(0, _jquery2['default'])('.caseAnimation__inner .work-head').remove();

						done();
					} });

				if (Math.abs(needsScrollTop) > (0, _jquery2['default'])('.work-thumbs__inner.single').height() + 100) {
					var workhead = (0, _jquery2['default'])('.work-single .work-head.js-head');
					(0, _jquery2['default'])(workhead).clone().appendTo('.caseAnimation__inner');
					tl.set('.caseAnimation__inner .work-head', { y: 0 });
					tl.set('.caseAnimation', { display: 'block' }, 0);
					this.split = new _libGreenSockSrcUncompressedUtilsSplitText2['default']('.caseAnimation__inner .work-head span', { type: "words,chars", position: "relative" });

					if (!this.smooth) {
						var offset = window.pageYOffset - 150;
						tl.to(window, 0.4, { scrollTo: { y: offset }, ease: Expo.easeInOut }, 0);
					} else {
						var offset = this.smooth.pos.current - 150;
						tl.to(this.smooth.pos, 0.4, { current: offset, ease: Expo.easeInOut }, 0);
					}

					tl.from('.caseAnimation', 0.7, { yPercent: -100, ease: Expo.easeInOut }, 0);

					if (this.ww >= 640) tl.staggerTo(this.split.chars, .4, { yPercent: -100, ease: Power4.easeInOut }, 0.001, 0.5);
				} else {

					if (needsScrollTop > 0) {
						if (!this.smooth) {
							tl.to(window, .8, { scrollTo: { y: 0 }, ease: this.ease }, 0);
							delay = 0.8;
						} else {
							tl.to(this.smooth.pos, .8, { current: 0, ease: this.ease }, 0);
							delay = 1.35;
						}
					}

					tl.to('.w', 0.0001, { opacity: 0 }, delay);

					if (this.ww >= 640) {

						tl.staggerTo(this.split.chars, .4, { yPercent: -100, ease: Power4.easeInOut }, 0.001, delay / 2);
						tl.set(this.ui.details, { display: 'block', x: '100%' });
					}

					tl.set('.caseAnimation', { display: 'block' });
				}

				tl.restart();
			} else if (req.route == '/culture') {

				var tl = new TimelineMax({ paused: true, onComplete: done });
				tl.to(this.page, 1, { autoAlpha: '0' });
				tl.restart();
			} else {

				console.warn('no animateOut in section');
				console.log('calling done()');
				done();
			}

			if (!_config2['default'].isMobile && !isNextSingle) {
				_componentsLogo2['default'].animateOut();
			}
		}
	}, {
		key: 'resize',
		value: function resize(width, height) {

			this.ww = window.innerWidth;
			this.wh = window.innerHeight;

			// super.resize();

			// if(width < 640) {
			//           this.smooth && (this.smooth.destroy(), this.smooth = null);
			//       } else {
			//           if(this.smooth) {
			//               this.smooth.resize();
			//           } else {
			//               this.initSmooth();
			//           }
			//       }
		}
	}, {
		key: 'destroy',
		value: function destroy(req, done) {
			var _this4 = this;

			console.log('section: destroy()', '');
			this.videos.forEach(function (video) {
				console.log('section: destroy()', video);
				video.pause();
				setTimeout(function () {
					video.dispose();
					video = null;
				}, 1);
			});
			this.videos = [];

			var left = this.direction === 'left';

			this.smooth && (this.smooth.destroy(), this.smooth = null);

			this.removeEvents();

			// if(!config.isMobile) logo.removeClass();

			if (req.route == '/cases') {

				TweenLite.set(this.page, { autoAlpha: 0, delay: 0.6, onComplete: function onComplete() {
						_this4.view.removeChild(_this4.page);
						done();
					} });
			} else if (req.route.indexOf('case/') !== -1) {

				var translateX = left ? 100 : -100;

				TweenLite.to(this.page, 0.8, { xPercent: translateX, ease: Power4.easeInOut, onComplete: function onComplete() {
						_this4.view.removeChild(_this4.page);
						done();
					} });
			} else {

				this.view.removeChild(this.page);
				done();
			}
		}
	}]);

	return Section;
})(_default2['default']);

exports['default'] = Section;
module.exports = exports['default'];