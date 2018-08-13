'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _framework = require('./framework');

var _framework2 = _interopRequireDefault(_framework);

var _pleaseAjax = require('please-ajax');

var _pleaseAjax2 = _interopRequireDefault(_pleaseAjax);

var _domCreateElement = require('dom-create-element');

var _domCreateElement2 = _interopRequireDefault(_domCreateElement);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

window.cacheWidth = window.innerWidth;
window.cacheTime = 0;
window.cacheMessage = false;

var Utils = {

	/* ----------
 CSS utils
 ---------- */
	css: {

		getRect: function getRect(top, right, bottom) {
			if (top === undefined) top = 0;
			var left = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

			return 'rect(' + top + 'px, ' + right + 'px, ' + bottom + 'px, ' + left + 'px)';
		}

	},

	/* ----------
 JS utils
 ---------- */
	js: {

		sliceArray: function sliceArray(opt) {

			return Array.prototype.slice.call(opt, 0);
		},

		crossBorder: function crossBorder(width) {

			var now = Date.now();

			if (window.cacheTime > now - 300) return window.cacheMessage;

			var curWidth = window.innerWidth;
			var broke = (window.cacheWidth - width) * (curWidth - width) < 0;
			broke = window.cacheMessage = broke ? curWidth < window.cacheWidth ? 'under' : 'over' : false;

			window.cacheWidth = curWidth;
			window.cacheTime = now;

			return broke;
		},

		clamp: function clamp(min, value, max) {

			return Math.max(min, Math.min(value, max));
		},

		scrollTop: function scrollTop() {

			return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
		},

		scrollLeft: function scrollLeft() {

			if (window.pageXOffset) return window.pageXOffset;
			return document.documentElement.clientHeight ? document.documentElement.scrollLeft : document.body.scrollLeft;
		},

		lockScroll: function lockScroll() {
			(0, _jquery2['default'])('body').addClass('scroll-lock');
		},

		unlockScroll: function unlockScroll() {
			(0, _jquery2['default'])('body').removeClass('scroll-lock');
		},

		lazyload: function lazyload() {
			var images = (0, _jquery2['default'])('img');
			_jquery2['default'].each(images, function () {
				(0, _jquery2['default'])(this).attr('src', (0, _jquery2['default'])(this).attr('data-lazy'));
			});

			var videos = (0, _jquery2['default'])('source');
			_jquery2['default'].each(videos, function (i) {
				(0, _jquery2['default'])(this).attr('src', (0, _jquery2['default'])(this).attr('data-lazy'));
				(0, _jquery2['default'])(this).parent().load();
			});

			var bgs = (0, _jquery2['default'])('.lazy-bg');
			_jquery2['default'].each(bgs, function () {
				(0, _jquery2['default'])(this).css({ 'background-image': 'url(' + (0, _jquery2['default'])(this).attr('data-lazy') + ')' });
			});
		},

		loadImg: function loadImg(source, callback) {

			(0, _jquery2['default'])('<img/>').load(_underscore2['default'].once(function (e) {
				typeof callback === 'function' && callback();
			})).attr('src', source);
		}

	},

	/* ----------
 biggie utils
 ---------- */
	biggie: {

		setPrevRoute: function setPrevRoute(req) {

			window.prevRoute = {
				url: req.params.id || req.route,
				slug: req.route
			};
		},

		getSlug: function getSlug(req) {

			var route = req.route;
			var routeDuplicate = req.params.id;

			// TODO :
			// - add 'default' route case
			if (route === "/") route = '/cases';
			// - replace :id in route by the current section's id to get the template
			// needs to be ':id' in routes.js
			if (routeDuplicate) {
				route = route.substring(0, route.length - 3);
				route += routeDuplicate;
			}

			var slug = route.substr(1); // .replace('/', '-')

			return slug;
		},

		createPage: function createPage(req, slug) {

			var tag = slug.replace('/', '-');

			var page = (0, _domCreateElement2['default'])({
				selector: 'div',
				id: 'page-' + tag,
				styles: 'page page-' + tag
			});

			return page;
		},

		loadHTML: function loadHTML(req, view, done) {

			var slug = Utils.biggie.getSlug(req);
			var page = Utils.biggie.createPage(req, slug);

			_pleaseAjax2['default'].get('/' + slug, {
				success: function success(object) {
					var $response = (0, _jquery2['default'])(object.data);

					var title = (0, _jquery2['default'])($response).filter('title').text();
					var pageHTML = (0, _jquery2['default'])($response).filter('.page-view').find('> .page').html();

					document.title = title;
					page.innerHTML = pageHTML;

					Utils.trackPageView();

					console.log('utils: loadHTML()', '');
					done();
				}
			});

			return view.appendChild(page);
		}

	},

	trackPageView: function trackPageView() {
		this.tracking.googleAnalytics();
	},

	tracking: {
		googleAnalytics: function googleAnalytics() {
			if (typeof ga !== 'undefined') {
				console.log('utils: tracking.googleAnalytics()', window.location.pathname);

				ga('set', 'page', window.location.pathname);
				ga('send', 'pageview');
			}
		}
	}

};

exports['default'] = Utils;
module.exports = exports['default'];