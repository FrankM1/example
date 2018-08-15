'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var config = require('../config');
var utils = require('../utils');

var domCreateElement = require('dom-create-element');
var domClasses = require('dom-classes');
var queryDomComponents = require('query-dom-components');
var pleaseAjax = require('please-ajax');
var underscore = require('underscore');

var componentsLogo = require('../components/logo');
var componentsMenu = require('../components/menu');
var componentsSvg = require('../components/svg');


TweenLite.defaultEase = Expo.easeOut;

var Preloader = (function () {
	function Preloader(onComplete) {
		_classCallCheck(this, Preloader);

		this.detect();

		this.view = config.$view;
		this.slug = 'preloader';
		this.el = null;
		this.menu = null;
		this.svg = null;
		this.pos = { x: 0, y: 0 };
		this.template = config.PATH + config.BASE + 'templates/components/' + this.slug + '.html';
		this.preloaded = onComplete;
	}

	_createClass(Preloader, [{
		key: 'detect',
		value: function detect() {

			this.isMobile = config.isMobile = config.width >= 769 ? false : true;
			// this.isMobile && classes.add(config.$body, 'is-mobile');

			config.UA = navigator.userAgent;

			!this.isMobile && domClasses.add(config.$body, 'has-vh-units');
		}
	}, {
		key: 'init',
		value: function init(req, done) {
			var _this = this;

			var svg = this.svg = new componentsSvg();
			var menu = this.menu = new componentsMenu();

			this.createDOM();

			pleaseAjax.get(this.template, {
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

			this.el = domCreateElement({
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

			this.ui = queryDomComponents({ el: this.el });
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

			this.isMobile && componentsLogo.animateIn();
		}
	}, {
		key: 'animateOut',
		value: function animateOut(req, done) {

			var images = $('.work-thumbs__inner');
			var l = images.length;
			var render = underscore.after(l, done);

			if (images.length > 0) {
				for (var i = 0; i < l; i++) {
					utils.js.loadImg(images[i].getAttribute('data-src'), render);
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
					domClasses.add(config.$body, 'preloaded');
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