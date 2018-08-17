'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var _domClasses = require('dom-classes');

var _domClasses2 = _interopRequireDefault(_domClasses);

var _domEvents = require('dom-events');

var _domEvents2 = _interopRequireDefault(_domEvents);

var _domSelect = require('dom-select');

var _domSelect2 = _interopRequireDefault(_domSelect);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _componentsLogo = require('../components/logo');

var _componentsLogo2 = _interopRequireDefault(_componentsLogo);

var Default = (function () {
    function Default(opt) {
        _classCallCheck(this, Default);

        opt = opt || {};

        this.isMobile = _config2['default'].isMobile;

        this.view = _config2['default'].$view;
        this.page = null;
        this.darkBackground = false;
    }

    _createClass(Default, [{
        key: 'init',
        value: function init(req, done) {

            var view = this.view;
            var page = this.page = window.prevRoute ? _utils2['default'].biggie.loadHTML(req, view, this.dataAdded.bind(this, done)) : (0, _domSelect2['default'])('#js-page-' + this.slug);

            if (!window.prevRoute) {
                _domClasses2['default'].remove(this.page, 'is-hidden');
                this.dataAdded(done);
            }
        }
    }, {
        key: 'dataAdded',
        value: function dataAdded() {

            _utils2['default'].js.sliceArray(_domSelect2['default'].all('a', this.page)).forEach(function (el) {

                _domEvents2['default'].on(el, 'click', function (e) {
                    if (_domClasses2['default'].has(e.currentTarget, 'no-route')) return;
                    e.preventDefault();
                    var href = e.currentTarget.getAttribute('href');
                    app.go(href);
                });
            });

            _componentsLogo2['default'].setDarkBackground(this.darkBackground);

            // $('body.scroll-lock').on('scroll', function(e) {
            //     e.preventDefault();
            // })
        }
    }, {
        key: 'resize',
        value: function resize(width, height) {

            _config2['default'].height = height;
            _config2['default'].width = width;

            if (window.device.indexOf('is-desktop') > -1) {
                if (width < 640) {
                    _domClasses2['default'].add(_config2['default'].$html, 'is-phone');
                    _domClasses2['default'].remove(_config2['default'].$html, 'is-tablet');
                } else {
                    _domClasses2['default'].remove(_config2['default'].$html, 'is-phone');
                    _domClasses2['default'].remove(_config2['default'].$html, 'is-tablet');
                }

                _config2['default'].isMobile = (0, _jquery2['default'])('html').hasClass('is-phone');
                _config2['default'].isTablet = (0, _jquery2['default'])('html').hasClass('is-tablet');
            }
        }
    }]);

    return Default;
})();

exports['default'] = Default;
module.exports = exports['default'];