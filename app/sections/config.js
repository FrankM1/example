'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var domSelect = require('dom-select');
var prefix = require('prefix');

var jquery = require('jquery');

var config = {

	PATH: '',
	BASE: '/app/themes/bia/',

	$body: document.body,
	$html: document.documentElement,
	$view: jquery('#js-view').get(0),

	width: window.innerWidth,
	height: window.innerHeight,

	isMobile: jquery('html').hasClass('is-phone'),
	isTablet: jquery('html').hasClass('is-tablet'),

	prefix: prefix('transform')

};

exports['default'] = config;
module.exports = exports['default'];