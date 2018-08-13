'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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

var _pleaseAjax = require('please-ajax');

var _pleaseAjax2 = _interopRequireDefault(_pleaseAjax);

var _domEvents = require('dom-events');

var _domEvents2 = _interopRequireDefault(_domEvents);

var _domCss = require('dom-css');

var _domCss2 = _interopRequireDefault(_domCss);

var _domCreateElement = require('dom-create-element');

var _domCreateElement2 = _interopRequireDefault(_domCreateElement);

var _queryDomComponents = require('query-dom-components');

var _queryDomComponents2 = _interopRequireDefault(_queryDomComponents);

var _libSpanify = require('../lib/spanify');

var _libSpanify2 = _interopRequireDefault(_libSpanify);

var _domSelect = require('dom-select');

var _domSelect2 = _interopRequireDefault(_domSelect);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var Menu = (function () {
	function Menu() {
		_classCallCheck(this, Menu);

		this.createBounds();
		this.isMobile = _config2['default'].isMobile || _config2['default'].isTablet;

		this.root = _config2['default'].$body;
		this.view = _config2['default'].$view;
		this.slug = 'menu';
		this.template = _config2['default'].PATH + _config2['default'].BASE + 'templates/components/' + this.slug + '.html';
		this.bg = '#fffffb';
		this.el = null;
		this.header = null;
		this.ui = null;
		this.bind = null;
		this.from = null;
		this.titleOut = null;
		this.state = false;
		this.open = false;

		this.init();
	}

	_createClass(Menu, [{
		key: 'createBounds',
		value: function createBounds() {
			var _this = this;

			['toggle', 'close', 'setState', 'hoverIn', 'hoverOut'].forEach(function (fn) {
				return _this[fn] = _this[fn].bind(_this);
			});
		}
	}, {
		key: 'init',
		value: function init() {
			var _this2 = this;

			this.createDOM();

			_pleaseAjax2['default'].get(this.template, {
				success: function success(object) {
					_this2.el.innerHTML = object.data;
					_this2.ui = (0, _queryDomComponents2['default'])({ el: _this2.el });

					var spans = (0, _libSpanify2['default'])({
						els: _this2.ui.span,
						maskClass: 'letter-mask',
						innerClass: 'letter-inner js-letters'
					});

					_this2.ui = (0, _queryDomComponents2['default'])({ el: _this2.el });
					_this2.addEvents();
				}
			});
		}
	}, {
		key: 'createDOM',
		value: function createDOM() {

			var page = this.view.firstChild;

			this.el = (0, _domCreateElement2['default'])({
				selector: 'div',
				id: 'js-menu',
				styles: 'page page-menu'
			});

			this.header = (0, _domCreateElement2['default'])({
				selector: 'header',
				styles: 'js-header'
			});

			this.logo = (0, _domCreateElement2['default'])({
				selector: 'a',
				link: '/cases',
				styles: 'logo',
				html: '<svg id="js-arrow" viewBox="0 0 20 20"><use xlink:href="#arrowLeft" x="0" y="0"/></svg><svg id="js-logo" viewBox="0 0 300 90" enable-background="new 0 0 300 90" xml:space="preserve"><path class="js-el" d="M11.18,2.443c6.232,0,9.897,3.666,9.897,8.752c0,3.436-2.016,6.002-4.811,7.01c3.436,0.916,5.819,3.895,5.819,7.743c0,5.224-4.032,8.981-10.08,8.981H0V2.443H11.18z M10.447,16.189c3.207,0,5.132-1.833,5.132-4.535c0-2.75-1.924-4.536-5.269-4.536H5.453v9.072H10.447z M11.042,30.256c3.299,0,5.453-1.788,5.453-4.674c0-2.795-1.879-4.765-5.269-4.765H5.453v9.439H11.042z"/><path class="js-alpha" d="M35.991,35.571c-5.315,0-8.43-3.94-8.43-8.889V12.615h5.315v13.104c0,2.749,1.283,5.085,4.49,5.085c3.07,0,4.674-2.061,4.674-4.994V12.615h5.315v18.235c0,1.833,0.137,3.254,0.229,4.078h-5.086c-0.092-0.504-0.184-1.558-0.184-2.474C41.214,34.471,38.603,35.571,35.991,35.571z"/><path class="js-alpha" d="M54.097,34.929V12.615h5.269v22.313H54.097z"/><path class="js-alpha" d="M66.056,34.929V2.696l5.315-0.94v33.173H66.056z"/><path class="js-alpha" d="M99.026,30.851c0,2.016,0.183,3.712,0.229,4.078h-5.086c-0.091-0.504-0.229-1.97-0.229-2.886c-1.054,1.878-3.391,3.436-6.552,3.436c-6.415,0-10.722-5.04-10.722-11.776c0-6.415,4.353-11.684,10.63-11.684c3.895,0,5.865,1.787,6.552,3.207V2.696l5.178-0.94V30.851z M87.983,30.805c3.482,0,5.911-2.886,5.911-7.147s-2.383-6.919-5.865-6.919c-3.482,0-6.048,2.704-6.048,6.965S84.364,30.805,87.983,30.805z"/><path class="js-el" d="M0,79.756V57.443h5.269v22.313H0z"/><path class="js-alpha" d="M17.337,79.756h-5.315V57.443H17.2v2.978c1.466-2.566,4.124-3.62,6.598-3.62c5.452,0,8.064,3.94,8.064,8.843v14.112h-5.315V66.56c0-2.749-1.237-4.949-4.582-4.949c-3.024,0-4.628,2.337-4.628,5.269V79.756z"/><path class="js-el" d="M57.232,47.27h6.979L75.24,79.756h-6.21l-2.437-7.433H54.483l-2.326,7.433h-6.091L57.232,47.27z M64.965,67.368L60.561,52.29l-4.492,15.077H64.965z"/><path class="js-alpha" d="M80.663,79.756V57.443h5.086v2.841c1.283-2.291,4.078-3.482,6.598-3.482c2.932,0,5.498,1.328,6.69,3.94c1.741-2.932,4.353-3.94,7.239-3.94c4.032,0,7.881,2.566,7.881,8.477v14.478h-5.132V66.148c0-2.612-1.329-4.582-4.307-4.582c-2.795,0-4.628,2.2-4.628,4.949v13.242h-5.223V66.148c0-2.566-1.283-4.582-4.307-4.582c-2.841,0-4.628,2.108-4.628,4.949v13.242H80.663z"/><path class="js-alpha" d="M123.703,72.425c0.183,2.016,1.695,3.803,4.536,3.803c2.2,0,3.345-1.191,3.345-2.566c0-1.191-0.825-2.107-2.612-2.473l-3.299-0.734c-3.94-0.87-6.002-3.436-6.002-6.507c0-3.895,3.574-7.193,8.201-7.193c6.231,0,8.247,4.032,8.614,6.231l-4.49,1.283c-0.183-1.283-1.145-3.345-4.124-3.345c-1.878,0-3.207,1.191-3.207,2.565c0,1.192,0.871,2.062,2.245,2.337l3.391,0.688c4.215,0.916,6.415,3.482,6.415,6.781c0,3.391-2.749,7.148-8.431,7.148c-6.46,0-8.934-4.216-9.209-6.736L123.703,72.425z"/><path class="js-alpha" d="M142.28,51.653l5.269-1.037v6.827h4.628v4.719h-4.628v10.355c0,1.97,0.871,2.795,2.841,2.795c0.733,0,1.603-0.138,1.833-0.184v4.399c-0.32,0.138-1.328,0.504-3.253,0.504c-4.124,0-6.69-2.474-6.69-6.643V51.653z"/><path class="js-alpha" d="M177.869,73.387c-1.191,3.895-4.719,7.056-10.08,7.056c-6.048,0-11.409-4.399-11.409-11.959c0-7.056,5.224-11.73,10.859-11.73c6.873,0,10.905,4.536,10.905,11.592c0,0.871-0.092,1.604-0.137,1.696h-16.312c0.138,3.391,2.795,5.819,6.094,5.819c3.207,0,4.857-1.696,5.59-3.895L177.869,73.387z M172.783,66.148c-0.092-2.612-1.833-4.949-5.498-4.949c-3.345,0-5.269,2.566-5.452,4.949H172.783z"/><path class="js-alpha" d="M196.588,62.712c-0.596-0.092-1.192-0.138-1.741-0.138c-4.124,0-6.003,2.382-6.003,6.552v10.63h-5.315V57.443h5.178v3.573c1.054-2.428,3.528-3.849,6.46-3.849c0.642,0,1.191,0.092,1.421,0.138V62.712z"/><path class="js-alpha" d="M221.922,75.677c0,2.016,0.183,3.712,0.229,4.078h-5.086c-0.091-0.504-0.229-1.97-0.229-2.887c-1.054,1.878-3.391,3.436-6.552,3.436c-6.415,0-10.722-5.04-10.722-11.776c0-6.415,4.353-11.684,10.63-11.684c3.895,0,5.865,1.787,6.552,3.207v-12.53l5.178-0.94V75.677z M210.88,75.632c3.482,0,5.911-2.886,5.911-7.147s-2.383-6.919-5.865-6.919c-3.482,0-6.048,2.704-6.048,6.965S207.26,75.632,210.88,75.632z"/><path class="js-alpha" d="M234.228,66.972l5.728-0.87c1.283-0.184,1.649-0.824,1.649-1.604c0-1.878-1.283-3.391-4.215-3.391c-2.795,0-4.353,1.787-4.582,4.032l-4.857-1.1c0.412-3.849,3.895-7.285,9.393-7.285c6.873,0,9.484,3.895,9.484,8.339v11.088c0,2.016,0.23,3.345,0.275,3.574h-4.948c-0.046-0.138-0.23-1.054-0.23-2.841c-1.054,1.695-3.253,3.528-6.872,3.528c-4.674,0-7.56-3.208-7.56-6.736C227.493,69.722,230.426,67.522,234.228,66.972z M241.605,70.5v-1.008l-5.819,0.87c-1.65,0.275-2.978,1.192-2.978,3.024c0,1.512,1.145,2.887,3.253,2.887C239.039,76.273,241.605,74.853,241.605,70.5z"/><path class="js-alpha" d="M253.518,79.756V57.442h5.086v2.841c1.283-2.291,4.078-3.482,6.598-3.482c2.932,0,5.499,1.328,6.69,3.94c1.741-2.932,4.353-3.94,7.239-3.94c4.032,0,7.881,2.566,7.881,8.477v14.478h-5.132V66.148c0-2.612-1.329-4.582-4.307-4.582c-2.795,0-4.628,2.2-4.628,4.949v13.242h-5.223V66.148c0-2.566-1.283-4.582-4.307-4.582c-2.841,0-4.628,2.108-4.628,4.949v13.242H253.518z"/><path class="js-el" d="M296.018,72.562c2.062,0,3.757,1.695,3.757,3.757c0,2.062-1.695,3.711-3.757,3.711c-2.062,0-3.711-1.649-3.711-3.711C292.307,74.257,293.957,72.562,296.018,72.562z"/></svg>'
			});

			this.bind = (0, _domCreateElement2['default'])({
				selector: 'div',
				id: 'js-bind',
				styles: 'menu-icon',
				html: '<div class="menu-icon__drawer menu"><div class="menu-icon__drawer__inner"><span>Menu</span></div></div><div class="menu-icon__drawer close"><div class="menu-icon__drawer__inner"><span>Close</span></div></div><div id="hamburger"><div></div><div></div><div></div></div>'
			});

			this.header.appendChild(this.logo);
			this.header.appendChild(this.bind);

			this.view.insertBefore(this.header, page);
			this.view.insertBefore(this.el, page);
		}
	}, {
		key: 'showDOM',
		value: function showDOM() {

			var tl = new TimelineMax({ paused: true });

			tl.to(this.logo, 1, { autoAlpha: 1 }, 0.75);
			tl.to(this.bind, 1, { autoAlpha: 1 }, 0.75);
			tl.restart();
		}
	}, {
		key: 'addEvents',
		value: function addEvents() {
			var _this3 = this;

			_domEvents2['default'].on(this.logo, 'click', function (e) {
				e.preventDefault();

				if (_this3.isMobile) return;

				_framework2['default'].go(e.currentTarget.getAttribute('href'));
			});

			_domEvents2['default'].on(this.bind, 'click', this.toggle);

			document.ontouchmove = function (event) {
				if (_domClasses2['default'].has(_config2['default'].$body, 'is-menu')) {
					event.preventDefault();
				}
			};

			_utils2['default'].js.sliceArray(this.ui.el).forEach(function (el) {
				_domEvents2['default'].on(el, 'click', _this3.toggle);

				if (!_this3.isMobile) {
					_domEvents2['default'].on(el, 'mouseenter', _this3.hoverIn);
					_domEvents2['default'].on(el, 'mouseleave', _this3.hoverOut);
				}
			});
		}
	}, {
		key: 'toggle',
		value: function toggle(e) {
			var _this4 = this;

			e.preventDefault();

			if (this.state && e.currentTarget.tagName != 'A') return;

			if (e.currentTarget.tagName == 'A') {
				(function () {

					var href = e.currentTarget.getAttribute('href');
					TweenMax.delayedCall(.5, function () {
						_framework2['default'].go(href);
					});
				})();
			}

			if (!this.isMobile && e.currentTarget.tagName == 'A') {
				// this.from = e.currentTarget.getAttribute('href').substr(3);
				this.titleOut = (0, _domSelect2['default'])('.title', e.currentTarget);
			} else {
				this.titleOut = null;
			}

			if (this.open) {
				setTimeout(function () {
					return _this4.animateOut();
				}, 300);
			} else {
				this.animateIn();
			}

			_domClasses2['default'].toggle(this.root, 'is-menu');
		}
	}, {
		key: 'close',
		value: function close() {

			this.animateOut();

			_domClasses2['default'].remove(this.root, 'is-menu');
		}
	}, {
		key: 'setState',
		value: function setState() {

			this.state = false;
		}
	}, {
		key: 'setActive',
		value: function setActive() {
			var currentPage = window.location.pathname.indexOf('case/') > -1 ? '/cases' : window.location.pathname;
			currentPage = currentPage.split('/')[1];
			var currentPanel = (0, _jquery2['default'])('.menu-el[href="/' + currentPage + '"]');
			(0, _jquery2['default'])('.menu-el').removeClass('is-active');
			(0, _jquery2['default'])(currentPanel).addClass('is-active');
		}
	}, {
		key: 'hoverIn',
		value: function hoverIn(e) {

			var title = (0, _domSelect2['default'])('.title', e.currentTarget);

			if (_config2['default'].isMobile) {
				(0, _domCss2['default'])(title, 'height', 'auto');
				return;
			}

			if (!_domClasses2['default'].has(this.el, 'is-ready')) return;

			var tl = new TimelineMax({ paused: true });

			TweenMax.killTweensOf(title);

			tl.to(title, 0.5, { height: 0, ease: Expo.easeOut });
			tl.restart();
		}
	}, {
		key: 'hoverOut',
		value: function hoverOut(e) {

			var title = (0, _domSelect2['default'])('.title', e.currentTarget);

			if (_config2['default'].isMobile) {
				(0, _domCss2['default'])(title, 'height', 'auto');
				return;
			}

			if (!_domClasses2['default'].has(this.el, 'is-ready')) return;

			TweenMax.killTweensOf(title);

			(0, _domCss2['default'])(title, 'height', 'auto');

			var tl = new TimelineMax({ paused: true });
			tl.from(title, 0.6, { height: 0, ease: Expo.easeOut }, 0.1);
			tl.restart();
		}
	}, {
		key: 'animateIn',
		value: function animateIn() {

			this.setActive();

			this.state = true;
			this.open = true;

			_domClasses2['default'].add(this.el, 'is-ready');

			var tl = new TimelineMax({ paused: true, onComplete: this.setState });
			tl.set(this.el, { autoAlpha: 1 });
			tl.staggerTo(this.ui.bg, 1, { x: '0%' }, 0.15, 0);
			tl.staggerTo(this.ui.letters, 0.4, { x: '0%' }, 0.025, 0.2);
			tl.to(this.el, 1, { background: this.bg });
			tl.restart();

			_domEvents2['default'].on(this.logo, 'click', this.close);
		}
	}, {
		key: 'animateOut',
		value: function animateOut() {

			this.state = true;
			this.open = false;

			_domClasses2['default'].remove(this.el, 'is-ready');

			this.titleOut && TweenLite.set(this.titleOut, { height: 'auto' });
			// TweenLite.set(this.el, {clip: utils.css.getRect(0, config.width, config.height, 0)});

			var tl = new TimelineMax({ paused: true, onComplete: this.setState });
			tl.set(this.el, { background: 'transparent', 'pointer-events': 'none' });
			this.titleOut && tl.from(this.titleOut, 1, { height: 0, ease: Expo.easeOut }, 0);
			tl.staggerTo(this.ui.letters, 0.8, { x: '-101%', ease: Expo.easeInOut, clearProps: 'all' }, -0.015, 0);
			tl.staggerTo(this.ui.bg, 1.4, { x: '100%', ease: Expo.easeInOut }, 0.08, 0.4);
			tl.to(this.el, 0.6, { autoAlpha: 0, clearProps: 'all' });
			tl.set(this.ui.bg, { clearProps: 'all' });
			tl.restart();

			_domEvents2['default'].off(this.logo, 'click', this.close);
		}
	}]);

	return Menu;
})();

exports['default'] = Menu;
module.exports = exports['default'];