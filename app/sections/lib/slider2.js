var indexOf = [].indexOf;

var index = function(arr, obj){
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};

/**
 * Whitespace regexp.
 */

var whitespaceRe = /\s+/;

/**
 * toString reference.
 */

var toString = Object.prototype.toString;

function dom_classes (el) {
  if (el.classList) {
    return el.classList;
  }

  var str = el.className.replace(/^\s+|\s+$/g, '');
  var arr = str.split(whitespaceRe);
  if ('' === arr[0]) arr.shift();
  return arr;
}

function dom_classes_add (el, name) {
  // classList
  if (el.classList) {
    el.classList.add(name);
    return;
  }

  // fallback
  var arr = classes(el);
  var i = index(arr, name);
  if (!~i) arr.push(name);
  el.className = arr.join(' ');
}

function dom_classes_has (el, name) {
  return el.classList
    ? el.classList.contains(name)
    : !! ~index(classes(el), name);
}

function dom_classes_remove (el, name) {
  if ('[object RegExp]' == toString.call(name)) {
    return removeMatching(el, name);
  }

  // classList
  if (el.classList) {
    el.classList.remove(name);
    return;
  }

  // fallback
  var arr = classes(el);
  var i = index(arr, name);
  if (~i) arr.splice(i, 1);
  el.className = arr.join(' ');
}

function dom_classes_removeMatching (el, re, ref) {
  var arr = Array.prototype.slice.call(classes(el));
  for (var i = 0; i < arr.length; i++) {
    if (re.test(arr[i])) {
      remove(el, arr[i]);
    }
  }
}

function dom_classes_toggle (el, name) {
  // classList
  if (el.classList) {
    return el.classList.toggle(name);
  }

  // fallback
  if (has(el, name)) {
    remove(el, name);
  } else {
    add(el, name);
  }
}

var _domEvents = require('dom-events');

var _domEvents2 = _interopRequireDefault(_domEvents);

var _domSelect = require('dom-select');

var _domSelect2 = _interopRequireDefault(_domSelect);

var sliceArray = function sliceArray(opt) {
    return Array.prototype.slice.call(opt, 0);
};

var Slider = (function () {
	function Slider(opt) {
		_classCallCheck(this, Slider);

		opt = opt || {};

		this.createBound();
		this.isMobile = $('html').hasClass('is-phone').isMobile;

		this.ui = {
			container: opt.container,
			wrapper: (0, _domSelect2['default'])('.wrapper', opt.container),
			slides: sliceArray( _domSelect2['default'].all('.slide', opt.container)),
			arrows: sliceArray( _domSelect2['default'].all('.arrow', opt.container))
		};

		this.slide = 1;
		this.parallax = opt.parallax;

		this.cover = opt.cover;

		this.size = opt.size;
		this.length = this.ui.slides.length;
		this.bounding = 0;

		this.debouncedResize = _.debounce(this.resize, opt.debounced || 300);

		this.init();
	}

	_createClass(Slider, [{
		key: 'createBound',
		value: function createBound() {
			var _this = this;

			['resize', 'slideTo'].forEach(function (fn) {
				return _this[fn] = _this[fn].bind(_this);
			});
		}
	}, {
		key: 'init',
		value: function init() {

			this.resize();

			this.addEvents();

			dom_classes_add(this.ui.slides[0], 'is-current');

			// if((!this.cover && this.length <= 3) || (this.cover && this.length <= 1)) {
			if (!this.cover && this.length <= 3) {
				dom_classes_add(this.ui.arrows[0], 'hidden');
				dom_classes_add(this.ui.arrows[1], 'hidden');
			}

			TweenLite.set(this.ui.wrapper, { x: 0 });
		}
	}, {
		key: 'addEvents',
		value: function addEvents() {

			var self = this;

			this.ui.arrows.forEach(function (arrow) {
				return _domEvents2['default'].on(arrow, 'click', self.slideTo);
			});

			_domEvents2['default'].on(window, 'resize', this.debouncedResize);
		}
	}, {
		key: 'removeEvents',
		value: function removeEvents() {

			var self = this;

			this.ui.arrows.forEach(function (arrow) {
				return _domEvents2['default'].off(arrow, 'click', self.slideTo);
			});

			_domEvents2['default'].off(window, 'resize', this.debouncedResize);
		}
	}, {
		key: 'slideTo',
		value: function slideTo(e) {

			var arrow = e.currentTarget;
			var dir = arrow.getAttribute('data-arrow');
			var max = this.cover ? 0 : 1;

			if (dom_classes_has(arrow, 'is-disabled')) return;

			this.removeDisabled();

			if (dir === 'prev') {

				1 != this.slide && this.slide--;
			} else {

				this.slide != this.length - max && this.slide++;
			}

			if (this.slide == 1 || this.slide == this.length - max) dom_classes_add(arrow, 'is-disabled');

			var curSlide = this.ui.slides[this.slide - 1].querySelector('.frame');
			//pantone slider doesn't have .frame
			if (curSlide) {
				//if current is not video, pause video slide
				if (dom_classes_has(curSlide, 'video-frame') == false) {
					for (var i = 0; i < this.ui.slides.length; i++) {
						if ($(this.ui.slides[i]).find('.video-wrap').length > 0) {
							var video = this.ui.slides[i].querySelector('.video-wrap');
							var videoInstance = $(video).data('video-instance');
							if (videoInstance) videoInstance.pause();
						}
					}
					//else play video	
				} else {
						var video = curSlide.querySelector('.video-wrap');
						var videoInstance = $(video).data('video-instance');
						if (videoInstance) videoInstance.play();
					}
			}

			this.tween();
		}
	}, {
		key: 'removeDisabled',
		value: function removeDisabled() {

			this.ui.arrows.forEach(function (arrow) {
				return dom_classes_remove(arrow, 'is-disabled');
			});
		}
	}, {
		key: 'removeCurrent',
		value: function removeCurrent() {

			this.ui.slides.forEach(function (slide) {
				return dom_classes_remove(slide, 'is-current');
			});
		}
	}, {
		key: 'tween',
		value: function tween() {
			var view = this;

			var pos = -this.size * this.slide + this.size;

			this.removeCurrent();

			this.ui.slides[this.slide - 1] && dom_classes_add(this.ui.slides[this.slide - 1], 'is-current');

			if (this.parallax) {
				_.delay(function () {
					var current = $(view.ui.wrapper).find('.slide.is-current');
					var curFrame = current.find('.frame');
					var prev = current.prev().find('.frame');
					var next = current.next().find('.frame');

					TweenLite.to(view.ui.wrapper, 1, { x: pos, ease: Expo.easeInOut });
					TweenLite.to(curFrame, 1, { xPercent: 0, ease: Expo.easeInOut });
					TweenLite.to(prev, 1, { xPercent: 50, ease: Expo.easeInOut });
					TweenLite.to(next, 1, { xPercent: -50, ease: Expo.easeInOut });
				}, 200);
			} else {
				TweenLite.to(this.ui.wrapper, 1, { x: pos, ease: Expo.easeInOut });
			}
		}
	}, {
		key: 'resize',
		value: function resize() {
			// this.size = this.ui.container instanceof jQuery ? this.ui.container[0].querySelector('.slide').getBoundingClientRect().width : this.ui.container.querySelector('.slide').getBoundingClientRect().width;
			try {
				this.size = this.ui.container[0].querySelector('.slide').getBoundingClientRect().width;
			} catch (err) {
				this.size = this.ui.container.querySelector('.slide').getBoundingClientRect().width;
			}
			this.bounding = this.size * this.length;
		}
	}, {
		key: 'destroy',
		value: function destroy() {

			this.removeEvents();

			this.ui = null;
		}
	}]);

	return Slider;
})();

new Slider();