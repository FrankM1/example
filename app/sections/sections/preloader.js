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

var _gsap = require('gsap');

var _gsap2 = _interopRequireDefault(_gsap);

var _domCreateElement = require('dom-create-element');

var _domCreateElement2 = _interopRequireDefault(_domCreateElement);

var _domClasses = require('dom-classes');

var _domClasses2 = _interopRequireDefault(_domClasses);

var _domCss = require('dom-css');

var _domCss2 = _interopRequireDefault(_domCss);

var _queryDomComponents = require('query-dom-components');

var _queryDomComponents2 = _interopRequireDefault(_queryDomComponents);

var _pleaseAjax = require('please-ajax');

var _pleaseAjax2 = _interopRequireDefault(_pleaseAjax);

var _libSpanify = require('../lib/spanify');

var _libSpanify2 = _interopRequireDefault(_libSpanify);

var _componentsLogo = require('../components/logo');

var _componentsLogo2 = _interopRequireDefault(_componentsLogo);

var _componentsMenu = require('../components/menu');

var _componentsMenu2 = _interopRequireDefault(_componentsMenu);

var _componentsSvg = require('../components/svg');

var _componentsSvg2 = _interopRequireDefault(_componentsSvg);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

TweenLite.defaultEase = Expo.easeOut;

var Preloader = (function () {
	function Preloader(onComplete) {
		_classCallCheck(this, Preloader);

		this.detect();

		this.view = _config2['default'].$view;
		this.slug = 'preloader';
		this.el = null;
		this.menu = null;
		this.svg = null;
		this.pos = { x: 0, y: 0 };
		this.template = _config2['default'].PATH + _config2['default'].BASE + 'templates/components/' + this.slug + '.html';
		this.preloaded = onComplete;
	}

	_createClass(Preloader, [{
		key: 'detect',
		value: function detect() {

			this.isMobile = _config2['default'].isMobile = _config2['default'].width >= 769 ? false : true;
			// this.isMobile && classes.add(config.$body, 'is-mobile');

			_config2['default'].UA = navigator.userAgent;

			!this.isMobile && _domClasses2['default'].add(_config2['default'].$body, 'has-vh-units');
		}
	}, {
		key: 'init',
		value: function init(req, done) {
			var _this = this;

			var svg = this.svg = new _componentsSvg2['default']();
			var menu = this.menu = new _componentsMenu2['default']();

			this.createDOM();

			_pleaseAjax2['default'].get(this.template, {
				success: function success(object) {
					_this.el.innerHTML = object.data;
					_this.dataAdded();
					done();
				}
			});
		}
	}, {
		key: 'createDOM',
		value: function createDOM() {

			var page = this.view.firstChild;

			this.el = (0, _domCreateElement2['default'])({
				selector: 'div',
				styles: 'preloader'
			});

			this.view.insertBefore(this.el, page);
		}
	}, {
		key: 'dataAdded',
		value: function dataAdded() {

			this.split = new SplitText(this.el.querySelector('h1'), { type: 'lines, words, chars' });
			this.split.chars.forEach(function (char) {
				return char.innerHTML = '<div class="js-letter">' + char.innerHTML + '</div>';
			});

			this.ui = (0, _queryDomComponents2['default'])({ el: this.el });
		}
	}, {
		key: 'resize',
		value: function resize(width, height) {}
	}, {
		key: 'animateIn',
		value: function animateIn(req, done) {

			var tl = new TimelineMax({ paused: true, onComplete: done });
			tl.to(this.ui.logo, 2, { opacity: 1 }, 0.1);
			tl.staggerTo(this.ui.letter, 1.1, { y: '0%', ease: Expo.easeOut }, 0.01, 0);
			tl.add(this.preloaded, 2);
			tl.restart();

			this.isMobile && _componentsLogo2['default'].animateIn();
		}
	}, {
		key: 'animateOut',
		value: function animateOut(req, done) {

			var images = (0, _jquery2['default'])('.work-thumbs__inner');
			var l = images.length;
			var render = _underscore2['default'].after(l, done);

			if (images.length > 0) {
				for (var i = 0; i < l; i++) {
					_utils2['default'].js.loadImg(images[i].getAttribute('data-src'), render);
				}
			} else {
				done();
			}
		}
	}, {
		key: 'destroy',
		value: function destroy(req, done) {
			var _this2 = this;

			this.menu.showDOM();

			var tl = new TimelineMax({ paused: true, onComplete: function onComplete() {
					_domClasses2['default'].add(_config2['default'].$body, 'preloaded');
					_this2.view.removeChild(_this2.el);
					done();
				} });
			tl.staggerTo(this.ui.letter, 1.5, { x: '100%', ease: Power4.easeInOut, clearProps: 'all' }, -0.005, 0);
			tl.staggerTo(this.ui.bg, 1.1, { x: '101%', ease: Power4.easeInOut }, 0.08, .6);
			if (window.innerWidth >= 640) {
				tl.to(this.ui.logo, 1.1, { x: -window.innerWidth / 3, ease: Power4.easeInOut }, .6);
			} else {
				tl.to(this.ui.logo, 1.1, { opacity: 0 }, 0.5);
			}
			tl.restart();
		}
	}]);

	return Preloader;
})();

exports['default'] = Preloader;
module.exports = exports['default'];