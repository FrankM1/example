'use strict';
var bigwheel = require('bigwheel');
var router = require('./router')();

var nav = require('../ui/nav');
var landing = require('./landing/');
var home = require('./home/home');
var docs = require('./docs/');
var issues = require('./issues/');
var notfound = require('./notfound/');
var Preloader = require('./preloader');

router.addRoute('/', [nav, home] );
router.addRoute('/landing', [nav, landing] );
router.addRoute('/docs', [nav, docs] );
router.addRoute('/issues', [nav, issues] );
router.addRoute('/case/:id', [nav, issues] );
router.addRoute('404', [nav, notfound] );

var framework = bigwheel(function (done) {
	done({
		overlap: false,
	//	initSection: Preloader,
		routes: router.routeMap
	});
});

module.exports = framework;
