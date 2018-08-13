'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _bigwheel = require('bigwheel');

var _bigwheel2 = _interopRequireDefault(_bigwheel);

/* ----------
create our framework instance
see https://github.com/bigwheel-framework/documentation/blob/master/quickstart.md#bigwheel-quick-start
---------- */
var framework = (0, _bigwheel2['default'])(function (done) {
	done({
		overlap: false,
		initSection: require('./sections/preloader'),
		routes: require('./routes')
	});
});

exports['default'] = framework;
module.exports = exports['default'];