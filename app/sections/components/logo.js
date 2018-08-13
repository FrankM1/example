'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _domSelect = require('dom-select');

var _domSelect2 = _interopRequireDefault(_domSelect);

var _domClasses = require('dom-classes');

var _domClasses2 = _interopRequireDefault(_domClasses);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _gsap = require('gsap');

var _gsap2 = _interopRequireDefault(_gsap);

var logo = {

	animateIn: function animateIn() {

		var logo = (0, _domSelect2['default'])('header .logo');
		var svg = (0, _domSelect2['default'])('header #js-logo', logo);
		var alpha = _domSelect2['default'].all('.js-alpha', svg);
		var el = _domSelect2['default'].all('.js-el', svg);

		TweenMax.killTweensOf(svg);

		setTimeout(function () {
			return _domClasses2['default'].add(logo, 'is-min');
		}, 1400);

		var tl = new TimelineMax({ paused: true });
		tl.staggerTo(alpha, 0.5, { autoAlpha: 0 }, 0.015, 1);
		tl.to(el[0], 0.6, { x: 0, y: 0, ease: Expo.easeInOut }, 1.1);
		tl.to(el[1], 0.7, { x: 30, y: -45, ease: Expo.easeInOut }, 1.1);
		tl.to(el[2], 0.8, { x: -4, y: -45, ease: Expo.easeInOut }, 1.1);
		tl.to(el[3], 0.9, { x: -213, y: -45, ease: Expo.easeInOut }, 1.1);
		tl.restart();
	},

	animateOut: function animateOut() {

		var logo = (0, _domSelect2['default'])('header .logo');
		var svg = (0, _domSelect2['default'])('header #js-logo', logo);
		var alpha = _domSelect2['default'].all('.js-alpha', svg);
		var el = _domSelect2['default'].all('.js-el', svg);

		TweenMax.killTweensOf(svg);

		setTimeout(function () {
			return _domClasses2['default'].remove(logo, 'is-min');
		}, 500);

		var tl = new TimelineMax({ paused: true });
		tl.staggerTo(alpha, 0.5, { autoAlpha: 1 }, 0.015, 0.5);
		tl.to(el[0], 0.6, { x: 0, y: 0, ease: Expo.easeInOut }, 0);
		tl.to(el[1], 0.7, { x: 0, y: 0, ease: Expo.easeInOut }, 0);
		tl.to(el[2], 0.8, { x: 0, y: 0, ease: Expo.easeInOut }, 0);
		tl.to(el[3], 0.9, { x: 0, y: 0, ease: Expo.easeInOut }, 0);
		tl.restart();
	},

	setDarkBackground: function setDarkBackground(state) {
		(0, _jquery2['default'])('header .logo').toggleClass('background--dark', state);
	},

	removeClass: function removeClass() {

		var logo = (0, _domSelect2['default'])('header .logo');

		_domClasses2['default'].remove(logo, 'is-min');
	}

};

exports['default'] = logo;
module.exports = exports['default'];