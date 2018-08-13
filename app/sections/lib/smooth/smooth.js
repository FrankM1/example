'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

var _domEvents = require('dom-events');

var _domEvents2 = _interopRequireDefault(_domEvents);

var _domCss = require('dom-css');

var _domCss2 = _interopRequireDefault(_domCss);

var _domCreateElement = require('dom-create-element');

var _domCreateElement2 = _interopRequireDefault(_domCreateElement);

var _domClasses = require('dom-classes');

var _domClasses2 = _interopRequireDefault(_domClasses);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _virtualScroll = require('virtual-scroll');

var _virtualScroll2 = _interopRequireDefault(_virtualScroll);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var Smooth = (function () {
    function Smooth(opt) {
        _classCallCheck(this, Smooth);

        opt = opt || {};

        this.createBound();
        this.isMobile = _config2['default'].isMobile;

        this.direction = opt.direction || 'vertical';
        this.forceVS = opt.forceVS || false;

        this.vs = !this.isMobile && !this.forceVS ? null : new _virtualScroll2['default']({
            touchMultiplier: opt.touchMultiplier || 1.8,
            mouseMultiplier: .6,
            firefoxMultiplier: 40,
            preventTouch: opt.preventTouch || true
        });

        this.pos = {
            current: opt.current ? opt.current : 0,
            lastCurrent: opt.current ? opt.current : 0,
            target: opt.current ? opt.current : 0,
            height: _config2['default'].height,
            width: _config2['default'].width,
            direction: null
        };

        this.ui = {
            listener: _config2['default'].$body,
            section: opt.section
        };

        this.debouncedResize = _underscore2['default'].debounce(this.resize, 300);

        this.timer = null;
        this.ticking = false;

        this.bounding = 0;
        this.ease = opt.ease || 0.1;
        this.rAF = undefined;

        this.prefix = _config2['default'].prefix;
        this.cache = null;
    }

    _createClass(Smooth, [{
        key: 'createBound',
        value: function createBound() {
            var _this = this;

            ['calc', 'debounce', 'resize'].forEach(function (fn) {
                return _this[fn] = _this[fn].bind(_this);
            });
        }
    }, {
        key: 'init',
        value: function init() {

            console.log("init smooth");

            this.initScroll();

            this.resize();

            this.addEvents();

            this.run();
        }
    }, {
        key: 'calc',
        value: function calc(e) {

            this.pos.current += this.direction == 'horizontal' ? (e.deltaX || e.deltaY) * -1 : e.deltaY * -1;
            this.pos.current = _utils2['default'].js.clamp(0, this.pos.current, this.bounding);

            this.getDirection();
        }
    }, {
        key: 'debounce',
        value: function debounce() {

            this.pos.current = this.direction == 'vertical' ? _utils2['default'].js.scrollTop() : _utils2['default'].js.scrollLeft();

            this.setPointerEvents();

            this.getDirection();
        }
    }, {
        key: 'getDirection',
        value: function getDirection() {

            this.pos.direction = this.pos.current > this.pos.lastCurrent ? 'down' : 'up';

            this.pos.lastCurrent = this.pos.current;
        }
    }, {
        key: 'getTransform',
        value: function getTransform(value) {

            return this.direction == 'vertical' ? 'translate3d(0,' + value + 'px,0)' : 'translate3d(' + value + 'px,0,0)';
        }
    }, {
        key: 'setPointerEvents',
        value: function setPointerEvents() {
            var _this2 = this;

            clearTimeout(this.timer);

            if (!this.ticking) {
                this.ticking = true;
                _domClasses2['default'].add(this.ui.listener, 'is-scrolling');
            }

            this.timer = setTimeout(function () {
                _this2.ticking = false;
                _domClasses2['default'].remove(_this2.ui.listener, 'is-scrolling');
            }, 200);
        }
    }, {
        key: 'run',
        value: function run() {
            this.transformRunning = this.pos.target.toFixed(1) != this.pos.current.toFixed(1);

            if (!(0, _jquery2['default'])('body').hasClass('overflow-hidden')) {
                this.pos.target += (this.pos.current - this.pos.target) * this.ease;
                this.pos.target < .1 && (this.pos.target = 0);
            }

            // if(window.innerWidth >= 640)
            this.rAF = requestAnimationFrame(this.run.bind(this));
        }
    }, {
        key: 'addEvents',
        value: function addEvents() {

            !this.isMobile && !this.forceVS ? _domEvents2['default'].on(window, 'scroll', this.debounce) : this.vs.on(this.calc);

            _domEvents2['default'].on(window, 'resize', this.debouncedResize);
        }
    }, {
        key: 'removeEvents',
        value: function removeEvents() {

            !this.isMobile && !this.forceVS ? _domEvents2['default'].off(window, 'scroll', this.debounce) : (this.vs.off(this.calc), this.vs.destroy(), this.vs = null);

            _domEvents2['default'].off(window, 'resize', this.debouncedResize);
        }
    }, {
        key: 'initScroll',
        value: function initScroll() {

            this.ui.scroll = (0, _domCreateElement2['default'])({
                selector: 'div',
                styles: 'scroll-view'
            });

            this.ui.listener.appendChild(this.ui.scroll);
        }
    }, {
        key: 'removeScroll',
        value: function removeScroll() {

            this.ui.scroll.style.display = 'none';
            this.ui.listener.removeChild(this.ui.scroll);
        }
    }, {
        key: 'resize',
        value: function resize() {

            this.pos.height = _config2['default'].height;
            this.pos.width = _config2['default'].width;

            if (!this.forceVS && this.ui.scroll) {

                var prop = this.direction == 'vertical' ? 'height' : 'width';
                (0, _domCss2['default'])(this.ui.scroll, prop, this.bounding);
            }

            // if(utils.js.crossBorder(640) === 'under') {
            //     cancelAnimationFrame(this.rAF);
            // }
            // if(utils.js.crossBorder(640) === 'over') {
            //     this.run();
            // }
        }
    }, {
        key: 'destroy',
        value: function destroy() {

            cancelAnimationFrame(this.rAF);
            clearTimeout(this.timer);

            this.ui.scroll && this.removeScroll();
            this.removeEvents();

            console.log("destroy");

            // $('.scroll-view').remove();
        }
    }]);

    return Smooth;
})();

exports['default'] = Smooth;
module.exports = exports['default'];