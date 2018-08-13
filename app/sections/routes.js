
var nav = require('../ui/nav');
var landing = require('./landing/');
var home = require('./home/home');
var docs = require('./docs/');
var issues = require('./issues/');
var notfound = require('./notfound/');

var config = {
	'/': [nav, landing],
	'/home': [nav, home],
	'/docs': [nav, docs],
	'/issues': [nav, issues],
	'404': [nav, notfound]
};

exports['default'] = config;
module.exports = exports['default'];