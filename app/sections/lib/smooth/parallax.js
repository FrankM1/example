'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _smooth = require('./smooth');

var _smooth2 = _interopRequireDefault(_smooth);

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

var _domClasses = require('dom-classes');

var _domClasses2 = _interopRequireDefault(_domClasses);

var _domCss = require('dom-css');

var _domCss2 = _interopRequireDefault(_domCss);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var Parallax = (function (_Smooth) {
    _inherits(Parallax, _Smooth);

    function Parallax(opt) {
        _classCallCheck(this, Parallax);

        _get(Object.getPrototypeOf(Parallax.prototype), 'constructor', this).call(this, opt);

        this.createExtraBound();

        this.sections = null;

        this.ui.sections = _utils2['default'].js.sliceArray(opt.sections);
        this.ui.els = _utils2['default'].js.sliceArray(opt.els);

        this.position = opt.position ? opt.position : 'fixed';
    }

    _createClass(Parallax, [{
        key: 'createExtraBound',
        value: function createExtraBound() {
            var _this = this;

            ['splitView', 'inViewport'].forEach(function (fn) {
                return _this[fn] = _this[fn].bind(_this);
            });
        }
    }, {
        key: 'resize',
        value: function resize() {
            var _this2 = this;

            // reset to default state
            // position relative, display block without transforms
            this.ui.sections.forEach(function (el) {
                return (0, _domCss2['default'])(el, {
                    'display': 'block',
                    'position': 'relative',
                    'top': '0',
                    'transform': 'none'
                });
            });

            // read the latest section bottom coordinates
            this.bounding = this.ui.sections[this.ui.sections.length - 1].getBoundingClientRect().bottom - window.innerHeight;

            // get the boundings
            this.getCache();
            this.getElements();

            // apply position: fixed and top position
            this.ui.sections.forEach(function (el, index) {
                return (0, _domCss2['default'])(el, {
                    'position': _this2.position,
                    'width': '100%',
                    'top': _this2.sections[index].top
                });
            });

            _get(Object.getPrototypeOf(Parallax.prototype), 'resize', this).call(this);
        }
    }, {
        key: 'getCache',
        value: function getCache() {
            var _this3 = this;

            this.sections = [];

            this.ui.sections.forEach(function (el, index) {
                var bounding = el.getBoundingClientRect();
                var bounds = {
                    top: _this3.position === 'absolute' && index === 0 ? 0 : bounding.top,
                    bottom: bounding.bottom
                };

                _this3.sections.push(bounds);
            });
        }
    }, {
        key: 'getElements',
        value: function getElements() {
            var _this4 = this;

            this.cache = [];

            this.ui.els.forEach(function (el, index) {

                var bounding = el.getBoundingClientRect();
                var bounds = {
                    top: bounding.top,
                    bottom: bounding.bottom
                };

                _this4.cache.push(bounds);
            });
        }
    }, {
        key: 'inViewport',
        value: function inViewport(el, index) {
            //console.log('parallax: inViewport()', '');
            var cache = this.cache[index];
            var transform = this.pos.target;
            var top = Math.round(cache.top - transform);
            var bottom = Math.round(cache.bottom - transform);
            var inview = bottom > -100 && top < this.pos.height + 100;

            if (inview) {

                if (_domClasses2['default'].has(el, 'video-lazy') && !cache.triggered) {
                    cache.triggered = true;

                    var videoInstance = (0, _jquery2['default'])(el).data('video-instance');
                    console.log(videoInstance);

                    if (videoInstance) videoInstance.play();
                }

                if (_domClasses2['default'].has(el, 'alpha-delay')) {
                    setTimeout(function () {
                        _domClasses2['default'].remove(el, 'is-up'), _domClasses2['default'].remove(el, 'is-down');
                    }, 300);
                } else {
                    if (_domClasses2['default'].has(el, 'video-lazy') == false) {
                        _domClasses2['default'].remove(el, 'is-up'), _domClasses2['default'].remove(el, 'is-down');
                    }
                }
            } else {

                if (_domClasses2['default'].has(el, 'video-lazy') == false) {
                    var classe = bottom < 0 && !_domClasses2['default'].has(el, 'alpha-down') ? 'is-up' : 'is-down';
                    _domClasses2['default'].add(el, classe);
                }
            }
        }
    }, {
        key: 'run',
        value: function run() {

            this.ui.sections.forEach(this.splitView);

            this.ui.els.forEach(this.inViewport);

            _get(Object.getPrototypeOf(Parallax.prototype), 'run', this).call(this);
        }
    }, {
        key: 'splitView',
        value: function splitView(el, index) {

            var cache = this.sections[index];
            var current = this.pos.target;
            var transform = current * -1;
            var top = Math.round(cache.top + transform);
            var bottom = Math.round(cache.bottom + transform);
            var inview = bottom > 0 && top < this.pos.height;

            if (inview) {

                // el.style.display = 'block';
                el.style[this.prefix] = this.getTransform(transform);
            } else {

                // el.style.display = 'none';
                el.style[this.prefix] = 'none';
            }
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            var view = this;

            _get(Object.getPrototypeOf(Parallax.prototype), 'destroy', this).call(this);

            setTimeout(function () {
                view.ui.sections.forEach(function (el, index) {
                    return (0, _domCss2['default'])(el, {
                        'display': 'block',
                        'position': 'relative',
                        'top': '0',
                        'transform': 'none'
                    });
                });

                view.ui.els.forEach(function (el, index) {
                    _domClasses2['default'].remove(el, 'is-down');
                    _domClasses2['default'].remove(el, 'is-up');
                });
            }, 300);
        }
    }]);

    return Parallax;
})(_smooth2['default']);

exports['default'] = Parallax;
module.exports = exports['default'];