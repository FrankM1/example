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

var _gsap = require('gsap');

var _gsap2 = _interopRequireDefault(_gsap);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

var Custom = (function (_Smooth) {
    _inherits(Custom, _Smooth);

    function Custom(opt) {
        _classCallCheck(this, Custom);

        _get(Object.getPrototypeOf(Custom.prototype), 'constructor', this).call(this, opt);

        this.length = opt.length;
        this.ui.section = opt.section;
        this.ui.cases = opt.cases;
    }

    _createClass(Custom, [{
        key: 'run',
        value: function run() {
            _get(Object.getPrototypeOf(Custom.prototype), 'run', this).call(this);

            var sectionTargetX = this.transformRunning ? this.pos.target.toFixed(2) : Math.ceil(this.pos.target);
            //this.ui.section.style[this.prefix] = `translate3d(${-sectionTargetX}px,0,0)`
            TweenMax.set(this.ui.section, { x: -sectionTargetX });

            for (var i = 0; i < this.ui.cases.length; i++) {

                var offset = _config2['default'].width / 3 * (0.05 * i);
                var parallaxTarget = this.pos.target * -0.05 + offset;
                parallaxTarget = this.transformRunning ? parallaxTarget.toFixed(2) : Math.ceil(parallaxTarget);

                TweenMax.set(this.ui.cases[i], { x: parallaxTarget });
            }

            if (this.pos.current > 100) {
                (0, _jquery2['default'])('.round-next').addClass('stop-animate');
            }

            if (this.pos.current <= 100) {
                (0, _jquery2['default'])('.round-prev').addClass('is-disabled');
            } else {
                (0, _jquery2['default'])('.round-prev').removeClass('is-disabled');
            }

            if (this.pos.current >= this.bounding - 100) {
                (0, _jquery2['default'])('.round-next').addClass('is-disabled');
            } else {
                (0, _jquery2['default'])('.round-next').removeClass('is-disabled');
            }
        }
    }, {
        key: 'resize',
        value: function resize() {

            // if(utils.js.crossBorder(640) === 'under') {
            //     this.ui.section.style[this.prefix] = `translate3d(0,0,0)`
            //     for(var i=0; i<this.ui.cases.length; i++) {
            //         TweenMax.set(this.ui.cases[i], { clearProps: 'transform' });
            //     }
            // }

            this.bounding = _config2['default'].width / 3 * this.length - _config2['default'].width;

            _get(Object.getPrototypeOf(Custom.prototype), 'resize', this).call(this);
        }
    }, {
        key: 'destroy',
        value: function destroy() {

            _get(Object.getPrototypeOf(Custom.prototype), 'resize', this).call(this);
            _get(Object.getPrototypeOf(Custom.prototype), 'destroy', this).call(this);

            if (_utils2['default'].js.crossBorder(640) === 'under') {
                this.ui.section.style[this.prefix] = 'translate3d(0,0,0)';
                for (var i = 0; i < this.ui.cases.length; i++) {
                    TweenMax.set(this.ui.cases[i], { clearProps: 'transform' });
                }
            }
        }
    }]);

    return Custom;
})(_smooth2['default']);

exports['default'] = Custom;
module.exports = exports['default'];