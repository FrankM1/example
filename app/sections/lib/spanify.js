"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function spanify(opt) {
	opt = opt || {};

	if (!opt.els) return;

	var els = opt.els.length ? _utils2["default"].js.sliceArray(opt.els) : [opt.els];
	var text = "";
	var letter = "";
	var letters = text.split('');
	var spanified = [];

	for (var n = 0; n < els.length; n++) {
		text = els[n].innerHTML;
		letters = text.split('');
		spanified = [];
		for (var i = 0; i < letters.length; i++) {
			if (letters[i] === ' ') {
				letters[i] = '</span><span class="space">&nbsp;</span><span class="word">';
			} else {
				letters[i] = '<span class="' + opt.maskClass + '"><span class="' + opt.innerClass + '">' + letters[i] + '</span></span>';
			}
			spanified.push(letters[i]);
		}
		els[n].innerHTML = '<span class="word">' + spanified.join('') + '</span>';
	}
};

exports["default"] = spanify;
module.exports = exports["default"];