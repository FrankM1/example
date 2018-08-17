'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var pleaseAjax = require('please-ajax');
var domCreateElement = require('dom-create-element');
var underscore = require('underscore');

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
			$('body').addClass('scroll-lock');
		},

		unlockScroll: function unlockScroll() {
			$('body').removeClass('scroll-lock');
		},

		lazyload: function lazyload() {
			var images = $('img');
			$.each(images, function () {
				$(this).attr('src', $(this).attr('data-lazy'));
			});

			var videos = $('source');
			$.each(videos, function (i) {
				$(this).attr('src', $(this).attr('data-lazy'));
				$(this).parent().load();
			});

			var bgs = $('.lazy-bg');
			$.each(bgs, function () {
				$(this).css({ 'background-image': 'url(' + $(this).attr('data-lazy') + ')' });
			});
		},

		loadImg: function loadImg(source, callback) {

			$('<img/>').load(underscore.once(function (e) {
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
			// needs to be ':id' in router.js
			if (routeDuplicate) {
				route = route.substring(0, route.length - 3);
				route += routeDuplicate;
			}

			var slug = route.substr(1); // .replace('/', '-')

			return slug;
		},

		createPage: function createPage(req, slug) {

			var tag = slug.replace('/', '-');

			var page = domCreateElement({
				selector: 'div',
				id: 'page-' + tag,
				styles: 'page page-' + tag
			});

			return page;
		},

		loadHTML: function loadHTML(req, view, done) {

			var slug = Utils.biggie.getSlug(req);
			var page = Utils.biggie.createPage(req, slug);
			
			console.log( slug );
			
			pleaseAjax.get('/' + slug, {
				success: function success(object) {
					var $response = $(object.data);

					var title = $($response).filter('title').text();
					var pageHTML = $($response).filter('.page-view').find('> .page').html();

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