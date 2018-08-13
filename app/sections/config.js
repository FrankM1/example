'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _domSelect = require('dom-select');

var _domSelect2 = _interopRequireDefault(_domSelect);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _prefix = require('prefix');

var _prefix2 = _interopRequireDefault(_prefix);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var config = {

	PATH: '',
	BASE: '/app/themes/bia/',

	$body: document.body,
	$html: document.documentElement,
	$view: (0, _domSelect2['default'])('#js-view'),

	width: window.innerWidth,
	height: window.innerHeight,

	isMobile: (0, _jquery2['default'])('html').hasClass('is-phone'),
	isTablet: (0, _jquery2['default'])('html').hasClass('is-tablet'),

	prefix: (0, _prefix2['default'])('transform')

};

exports['default'] = config;
module.exports = exports['default'];