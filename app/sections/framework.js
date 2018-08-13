'use strict';
var bigwheel = require('bigwheel');

var framework = bigwheel(function (done) {
	done({
		overlap: false,
		initSection: require('./preloader'),
		routes: require('./routes')
	});
});

module.exports = framework;
