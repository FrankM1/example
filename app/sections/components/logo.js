'use strict';

var domSelect = require('dom-select');
var domClasses = require('dom-classes');

var logo = {

	animateIn: function animateIn() {

		var logo = domSelect('header .logo');
		var svg = domSelect('header #js-logo', logo);
		var alpha = domSelect.all('.js-alpha', svg);
		var el = domSelect.all('.js-el', svg);

		TweenMax.killTweensOf(svg);

		setTimeout(function () {
			return domClasses.add(logo, 'is-min');
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

		var logo = domSelect('header .logo');
		var svg = domSelect('header #js-logo', logo);
		var alpha = domSelect.all('.js-alpha', svg);
		var el = domSelect.all('.js-el', svg);

		TweenMax.killTweensOf(svg);

		setTimeout(function () {
			return domClasses.remove(logo, 'is-min');
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
		$('header .logo').toggleClass('background--dark', state);
	},

	removeClass: function removeClass() {

		var logo = domSelect('header .logo');

		domClasses.remove(logo, 'is-min');
	}

};

exports['default'] = logo;
module.exports = exports['default'];