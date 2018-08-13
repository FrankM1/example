'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var _gsap = require('gsap');

var _gsap2 = _interopRequireDefault(_gsap);

var _domClasses = require('dom-classes');

var _domClasses2 = _interopRequireDefault(_domClasses);

var _domCss = require('dom-css');

var _domCss2 = _interopRequireDefault(_domCss);

var _queryDomComponents = require('query-dom-components');

var _queryDomComponents2 = _interopRequireDefault(_queryDomComponents);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _default = require('./default');

var _default2 = _interopRequireDefault(_default);

var _libSmoothHome = require('../lib/smooth/home');

var _libSmoothHome2 = _interopRequireDefault(_libSmoothHome);

var Home = (function (_Default) {
    _inherits(Home, _Default);

    function Home(opt) {
        _classCallCheck(this, Home);

        _get(Object.getPrototypeOf(Home.prototype), 'constructor', this).call(this, opt);

        this.createExtraBound();

        this.slug         = 'cases';
        this.page         = null;
        this.ui           = null;
        this.sp           = null;
        this.smooth       = null;
        this.indexCurrent = 0;
        this.cases        = '';

        this.ww = window.innerWidth;
        this.wh = window.innerHeight;

        this.ready   = false;
        this.arrowTL = null;

        this.caseAnimationLeft = 0;
        this.prevCases         = 0;
        this.nextCases         = 0;
        this.scrollWidth       = 0;
        this.speed             = 1;
        this.ease              = Expo.easeInOut;

        this.isInitial = window.prevRoute == undefined;

        this.isPrevWork      = window.prevRoute && window.prevRoute.slug == '/case';
        this.isPrevSingle    = window.prevRoute && window.prevRoute.url != '/case' && window.prevRoute.slug.indexOf('case/') !== -1;
        this.singlePrevRoute = window.prevRoute && window.prevRoute.url != '/case' && window.prevRoute.slug.indexOf('case/') !== -1 ? 'case/' + window.prevRoute.url : false;
    }

    _createClass(Home, [{
        key  : 'createExtraBound',
        value: function createExtraBound() {
            var _this = this;

            ['initSmooth', 'slideTo', 'switchArrows', 'loopCheck'].forEach(function (fn) {
                return _this[fn] = _this[fn].bind(_this);
            });
        }
    }, {
        key  : 'init',
        value: function init(req, done) {

            _get(Object.getPrototypeOf(Home.prototype), 'init', this).call(this, req, done);
        }
    }, {
        key  : 'dataAdded',
        value: function dataAdded(done) {

            _get(Object.getPrototypeOf(Home.prototype), 'dataAdded', this).call(this);

            var ui = this.ui = (0, _queryDomComponents2['default'])({ el: this.page });

            this.cases = (0, _jquery2['default'])('.item-view');

            this.setParallaxStart();

            this.addEvents();

            // this.resize();

            done();

            // if(this.ww < 640) {

            //     if(this.isPrevSingle) {
            //         framework.go(this.singlePrevRoute);
            //     } else {
            //         var url = $('.item-view[data-item="0"]').attr('href');
            //         framework.go(url);
            //     }
            // }
        }
    }, {
        key  : 'addEvents',
        value: function addEvents() {

            if (this.isPrevSingle) {
                (0, _jquery2['default'])('.item-view').addClass('onscreen');
            }

            (0, _jquery2['default'])('.js-round').on('click', this.slideTo);

            this.scrollWidth = _config2['default'].isMobile ? this.cases.length * this.ww : this.cases.length * this.ww / 3;

            this.scaleThumbs();

            window.addEventListener('orientationchange', this.onOrientationChange);
        }
    }, {
        key  : 'onOrientationChange',
        value: function onOrientationChange() {

            switch (window.orientation) {
                case -90: 
                case 90 : 
                    // to landscape, do nothing
                    break;
                default: 
                    // to portrait
                    // trigger scroll to reset position when at the end
                    _config2['default'].$body.scrollLeft = _config2['default'].$body.scrollLeft;
                    break;
            }
        }
    }, {
        key  : 'setParallaxStart',
        value: function setParallaxStart() {

            if (this.ww > 640 && !_config2['default'].isMobile && !_config2['default'].isTablet) {
                for (var i = 0; i < this.cases.length; i++) {
                    var offset = this.ww / 3 * (0.05 * i);
                    TweenMax.set(this.ui.thumbs[i], { x: offset });
                }
            }
        }
    }, {
        key  : 'scaleThumbs',
        value: function scaleThumbs() {

            for (var i = 0; i < this.cases.length; i++) {
                var scale = this.ww < 1024 ? 0.8 : 0.667;
                var bg = (0, _jquery2['default'])(this.cases[i]).find('.js-bg');

                TweenMax.set(bg, { scale: scale });
            }
        }
    }, {
        key  : 'removeEvents',
        value: function removeEvents() {

            (0, _jquery2['default'])('.round-next').addClass('stop-animate');
            (0, _jquery2['default'])('.js-round').off('click', this.slideTo);
            window.removeEventListener('orientationchange', this.onOrientationChange);
        }
    }, {
        key  : 'setContainerOffset',
        value: function setContainerOffset(percent, animate) {
            this.container.removeClass("animate");

            if (animate) {
                this.container.addClass("animate");
            }

            if (Modernizr.csstransforms3d) {
                this.container.css("transform", "translate3d(" + percent + "%,0,0) scale3d(1,1,1)");
            } else if (Modernizr.csstransforms) {
                this.container.css("transform", "translate(" + percent + "%,0)");
            } else {
                var px = pane_width * pane_count / 100 * percent;
                this.container.css("left", px + "px");
            }
        }
    }, {
        key  : 'initSmooth',
        value: function initSmooth(offset) {

            var smooth = this.smooth = new _libSmoothHome2['default']({
                forceVS  : true,
                length   : (0, _jquery2['default'])('.item-view').length,
                section  : this.page.querySelector('.section'),
                cases    : (0, _jquery2['default'])('.item-bg'),
                direction: 'horizontal',
                ease     : .1,
                current  : offset
            });

            this.smooth.init();

            // this.scrollWidth = $('.scroll-view').width();
        }
    }, {
        key  : 'slideTo',
        value: function slideTo(e) {

            e.stopPropagation();

            if ((0, _jquery2['default'])(e.currentTarget).hasClass('is-disabled')) return;

            var target = e.currentTarget;
            var dir    = target.getAttribute('data-dir');

            if (this.ww < 640 && this.indexCurrent == 0 && dir == 'left') return;
            if (this.ww < 640 && this.indexCurrent == this.cases.length - 1 && dir == 'right') return;

            var delta = 0;

            if (this.ww < 640) {

                if (dir == 'right') {
                    this.indexCurrent++;
                } else {
                    this.indexCurrent--;
                }

                delta = this.indexCurrent * this.ww;

                TweenMax.to('.section', 1.1, { x: delta * -1, ease: this.ease });

                // this.setSlides();
            } else {

                    if (dir == 'right') {
                        for (var i = this.cases.length - 1; i > -1; i--) {
                            var left   = this.cases[i].getBoundingClientRect().left;
                            var offset = (0, _jquery2['default'])(this.cases[i]).offset().left;

                            if (left > this.ww * 0.667 + 100) {
                                delta = offset;
                            }
                        }
                    } else {
                        for (var i = 0; i < this.cases.length; i++) {
                            var left   = this.cases[i].getBoundingClientRect().left;
                            var offset = (0, _jquery2['default'])(this.cases[i]).offset().left;

                            if (left < -this.ww * 0.667 - 100) {
                                delta = offset;
                            }
                        }

                        if (delta == 0 && this.smooth) delta = this.smooth.pos.target * -1;
                    }

                    if (this.smooth) {
                        var scrollto = Math.min(this.scrollWidth - this.ww, this.smooth.pos.target + delta);
                        TweenMax.to(this.smooth.pos, 0.6, { current: scrollto, ease: this.ease });
                    } else {
                        TweenMax.to(window, 0.6, { scrollTo: { x: delta }, ease: this.ease });
                    }
                }
        }

        // setSlides() {
        //     var current = $('.item-view[data-item="'+this.indexCurrent+'"]').find('.work-thumbs');
        //     TweenMax.to(current, 1.1, {xPercent: 0, ease:this.ease});

        //     if(this.indexCurrent > 0) {
        //         var prev = $('.item-view[data-item="'+ parseInt(this.indexCurrent-1) +'"]').find('.work-thumbs');
        //         TweenMax.to(prev, 1.1, {xPercent: 50, ease:this.ease});
        //     }
        //     if(this.indexCurrent < this.cases.length-1) {
        //         var next = $('.item-view[data-item="'+ parseInt(this.indexCurrent+1) +'"]').find('.work-thumbs');
        //         TweenMax.to(next, 1.1, {xPercent: -50, ease:this.ease});
        //     }
        // }

    }, {
        key  : 'switchArrows',
        value: function switchArrows(state) {
            if (state == 'kill') (0, _jquery2['default'])('.round:not(.round-back)').addClass('hidden');
            if (state == 'revive') (0, _jquery2['default'])('.round:not(.round-back)').removeClass('hidden');
        }
    }, {
        key  : 'arrowAnimation',
        value: function arrowAnimation() {
            this.arrowTL = new TimelineMax({ repeat: -1 }).set('.js-nextProject', { xPercent: -180 }).to('.animation-arrow', .4, { xPercent: 180, transformOrigin: "left", ease: Expo.easeIn }, 1).to('.animation-arrow__line', .4, { xPercent: 200, ease: Expo.easeIn }, 1.04).to('.js-nextProject', .4, { xPercent: 0, ease: Expo.easeOut }, 1.4).set('.animation-arrow, .animation-arrow__line', { display: 'none' }, 1.8).call(this.loopCheck);
        }
    }, {
        key  : 'loopCheck',
        value: function loopCheck() {
            if ((0, _jquery2['default'])('.round-next').hasClass('stop-animate')) {
                this.arrowTL.pause();
            }
        }
    }, {
        key  : 'animateIn',
        value: function animateIn(req, done) {
            var _this2 = this;

            var view = this;
            _domClasses2['default'].add(_config2['default'].$body, 'is-' + this.slug);

            this.switchArrows('revive');

            var tl = new TimelineMax({ paused: true, onComplete: function onComplete() {
                    done();
                    _utils2['default'].js.unlockScroll();
                    // $('.caseAnimation .work-head').remove();
                    view.ready = true;
                } });

            if (this.isPrevSingle) {

                var offset              = 0;
                var columns             = 3;
                var caseAnimationOffset = 0;

                var current = (0, _jquery2['default'])('.js-els[data-slug="' + window.prevRoute.url + '"]');
                var index   = this.indexCurrent = current.attr('data-item');
                var titles  = current.find('.work-details');

                (0, _jquery2['default'])('.caseAnimation').removeClass('animate-in');
                (0, _jquery2['default'])('.caseAnimation__inner .work-details').remove();
                (0, _jquery2['default'])(titles).clone().appendTo('.caseAnimation__inner');

                this.prevCases = current.prevAll();
                this.nextCases = current.nextAll();

                if (this.ww < 560) {
                    var center;

                    (function () {
                        center = current.find('.work-thumbs__inner').attr('data-centerset');

                        center = _this2.mapRange([0, 100], [0, -60], center);

                        //calculate thumbnail position
                        //1st project: left. last project: right. else center
                        offset              = _this2.wh * 0.4 * index - _this2.wh * 0.4;
                        offset              = index == _this2.cases.length - 1 ? offset - _this2.wh * 0.4 : index == 0 ? 0 : offset;
                        caseAnimationOffset = index == 0 ? 0 : index == _this2.cases.length - 1 ? _this2.wh * 0.4 * 2 : _this2.wh * 0.4;
                        caseAnimationOffset = caseAnimationOffset - _this2.wh * 0.4;

                        //calculate scroll position
                        if (!_this2.smooth && !_config2['default'].isMobile && !_config2['default'].isTablet && _config2['default'].width >= 560) {
                            TweenMax.set('.section', { y: offset * -1 });
                            _this2.initSmooth(offset);
                        }
                        window.scrollTo(0, offset);

                        //Animate prev and next covers
                        var row = _this2.wh * 0.4;

                        tl.staggerFrom(_this2.prevCases, _this2.speed, { cycle: {
                                y: function y(i) {
                                    if (i >= 2) return;
                                    return _this2.nextCases.length > 0 ? -row * (i + 1) : -row * (i + 1) - row * (1 - i);
                                }
                            }, ease: _this2.ease }, 0, 0);

                        tl.staggerFrom(_this2.nextCases, _this2.speed, { cycle: {
                                y: function y(i) {
                                    if (i >= 2) return;
                                    return _this2.prevCases.length > 0 ? row * (i + 1) : row * (i + 1) + row * (1 - i);
                                }
                            }, ease: _this2.ease }, 0, 0);

                        //animate current cover
                        tl.to('.caseAnimation', _this2.speed, { y: caseAnimationOffset, ease: _this2.ease }, 0);
                        tl.from('.caseAnimation__inner', _this2.speed, { y: 0, ease: _this2.ease }, 0);
                        tl.from('.caseAnimation__img', _this2.speed, { y: 0, scale: 1, x: 0, xPercent: center, ease: _this2.ease }, 0);
                        tl.from('.caseAnimation .work-details', _this2.speed, { y: -_this2.wh * 0.36, ease: _this2.ease }, 0);
                    })();
                } else {
                    var center;

                    (function () {

                        //calculate thumbnail position
                        //1st project: left. last project: right. else center
                        offset               = _this2.ww / 3 * index - _this2.ww / 3;
                        offset               = index == _this2.cases.length - 1 ? offset - _this2.ww / 3 : index == 0 ? 0 : offset;
                        caseAnimationOffset  = index == 0 ? 0 : index == _this2.cases.length - 1 ? _this2.ww / 3 * 2 : _this2.ww / 3;
                        caseAnimationOffset -= 1;

                        //calculate scroll position
                        offset += 1;
                        if (!_this2.smooth && !_config2['default'].isMobile && !_config2['default'].isTablet && _config2['default'].width >= 560) {
                            TweenMax.set('.section', { x: offset * -1 });
                            _this2.initSmooth(offset);
                        }
                        window.scrollTo(offset, 0);

                        //Animate prev and next covers
                        var col = _this2.ww / columns;

                        tl.staggerFrom(_this2.prevCases, _this2.speed, { cycle: {
                                x: function x(i) {
                                    if (i >= 2) return;
                                    return _this2.nextCases.length > 0 ? -col * (i + 1) : -col * (i + 1) - col * (1 - i);
                                }
                            }, ease: _this2.ease }, 0, 0);

                        tl.staggerFrom(_this2.nextCases, _this2.speed, { cycle: {
                                x: function x(i) {
                                    if (i >= 2) return;
                                    return _this2.prevCases.length > 0 ? col * (i + 1) : col * (i + 1) + col * (1 - i);
                                }
                            }, ease: _this2.ease }, 0, 0);

                        //animate current cover
                        if (_this2.ww < 1024) {
                            var _center = Math.floor((current.find('.work-thumbs__inner').attr('data-centerset') * -1 + 100) * 0.667);
                            tl.to('.caseAnimation__img', _this2.speed, { xPercent: _center, scale: 0.8, ease: _this2.ease }, 0);
                        } else {
                            center = (current.find('.work-thumbs__inner').attr('data-centerset') * -1 + 100) * 0.667;

                            if (_this2.smooth) {
                                var parallaxOffset  = current.find('.work-thumbs')[0]._gsTransform.x / _this2.ww * 100;
                                    center         += parallaxOffset;
                            }
                            tl.to('.caseAnimation__img', _this2.speed, { xPercent: center, scale: 0.667, ease: _this2.ease }, 0);
                        }

                        tl.to('.caseAnimation__inner', _this2.speed, { xPercent: -66.666666, ease: _this2.ease }, 0);
                        // tl.to('.work-head span', 0.4, {opacity: 0, scale:0.9, ease:Sine.easeInOut},0);
                        tl.from('.caseAnimation .work-details', _this2.speed, { xPercent: -100, yPercent: 50, ease: _this2.ease }, 0);
                        tl.from('.caseAnimation .work-details', _this2.speed / 2, { opacity: 0, ease: _this2.ease }, 0);
                        tl.to('.caseAnimation', _this2.speed, { x: caseAnimationOffset, ease: _this2.ease }, 0);
                    })();
                }

                //remove cover animation overlay
                tl.set('.caseAnimation', { display: 'none' });
                tl.set('.caseAnimation, .caseAnimation__inner, .caseAnimation__img', { clearProps: 'all' });

                tl.set(this.ui.els, { autoAlpha: 1 }, 0);
                tl.to(this.page, 1, { autoAlpha: 1 }, 0);
            } else {

                if (this.isPrevWork) {

                    tl.to(this.page, 1, { y: '0%' });
                    tl.from(this.ui.details, 1.1, { x: '100%', ease: Power4.easeOut, clearProps: 'transform' }, 0);
                } else {

                    tl.to(this.page, 2, { autoAlpha: 1 });
                }

                if (this.isInitial) {
                    tl.staggerFrom(this.ui.bg, 1.5, { rotationY: 15, scale: 1.05, xPercent: 15, ease: Expo.easeOut }, .25, .5);

                    if (this.ww >= 640) {
                        this.arrowAnimation();
                    }
                } else {
                    tl.staggerFrom(this.ui.bg, .8, { rotationY: 2, scale: 0.68, xPercent: 1, ease: Sine.easeOut }, .2, .25);
                }

                if (!this.smooth && !_config2['default'].isMobile && !_config2['default'].isTablet && _config2['default'].width >= 560) {
                    TweenMax.delayedCall(1, this.initSmooth);
                }
            }

            tl.restart();

            _utils2['default'].biggie.setPrevRoute(req);
        }
    }, {
        key  : 'animateOut',
        value: function animateOut(req, done) {
            var _this3 = this;

            _utils2['default'].js.lockScroll();
            _domClasses2['default'].add(_config2['default'].$body, 'overflow-hidden');
            _domClasses2['default'].remove(_config2['default'].$body, 'is-' + this.slug);

            this.smooth && this.smooth.destroy();

            var tl = new TimelineMax({ paused: true, onComplete: done });

            if (req.route != '/case' && req.route.indexOf('case') !== -1) {

                var columns = 3;

                var reqCase = (0, _jquery2['default'])('.item-view[data-slug="' + req.params.id + '"]');
                var img     = reqCase.find('.work-thumbs__inner').css('background-image');
                var img_pos = reqCase.find('.work-thumbs__inner').css('background-position');
                var titles  = reqCase.find('.work-details');

                this.caseAnimationLeft = reqCase[0].getBoundingClientRect().left;
                this.prevCases         = reqCase.prevAll();
                this.nextCases         = reqCase.nextAll();

                //set animation cover image and details
                (0, _jquery2['default'])('.caseAnimation__img').css({ 'background-image': img, 'background-position': img_pos });
                (0, _jquery2['default'])('.caseAnimation__inner .work-details').remove();
                (0, _jquery2['default'])(titles).clone().appendTo('.caseAnimation__inner');

                (0, _jquery2['default'])('.caseAnimation').addClass('animate-in');
                tl.set('.caseAnimation', { display: 'block' }, 0);

                if (this.ww >= 560) {
                    var center;

                    (function () {
                        center = (reqCase.find('.work-thumbs__inner').attr('data-centerset') * -1 + 100) * 0.667;

                        var scale = _this3.ww < 1024 ? 0.8 : 0.667;

                        if (_this3.ww >= 1024 && _this3.smooth) {
                            var parallaxOffset  = reqCase.find('.work-thumbs')[0]._gsTransform.x / _this3.ww * 100;
                                center         += parallaxOffset;
                        }

                        tl.set('.caseAnimation__img', { scale: scale, xPercent: center }, 0);
                        tl.set('.caseAnimation', { x: _this3.caseAnimationLeft }, 0);
                        tl.set('.caseAnimation__inner', { xPercent: -66.66666 }, 0);

                        //Animate prev and next covers
                        var col = _this3.ww / columns;

                        tl.staggerTo(_this3.prevCases, _this3.speed, { cycle: {
                                x: function x(i) {
                                    if (i >= 3) return;

                                    var offset = _this3.prevCases[i].getBoundingClientRect().left;
                                    return -col * (i + 1) - offset;
                                }
                            }, ease: _this3.ease }, 0, 0);

                        tl.staggerTo(_this3.nextCases, _this3.speed, { cycle: {
                                x: function x(i) {
                                    if (i >= 3) return;

                                    var offset = _this3.ww - _this3.nextCases[i].getBoundingClientRect().left;
                                    return col * i + offset;
                                }
                            }, ease: _this3.ease }, 0, 0);

                        //animate current cover
                        tl.to('.caseAnimation .work-details', _this3.speed, { xPercent: -100, yPercent: 50, ease: _this3.ease }, 0);
                        tl.to('.caseAnimation .work-details', _this3.speed / 2, { opacity: 0, ease: _this3.ease }, 0);
                        tl.to('.caseAnimation', _this3.speed, { x: 0, ease: _this3.ease }, 0);
                        tl.to('.caseAnimation__inner', _this3.speed, { xPercent: 0, ease: _this3.ease }, 0);
                        tl.to('.caseAnimation__img', _this3.speed, { xPercent: 0, scale: 1, ease: _this3.ease }, 0);
                    })();
                } else {
                    var center;
                    var top;

                    (function () {
                        center = reqCase.find('.work-thumbs__inner').attr('data-centerset');

                        center = _this3.mapRange([0, 100], [0, -60], center);
                        top    = reqCase[0].getBoundingClientRect().top - reqCase.height();

                        tl.set('.caseAnimation', { y: top }, 0);

                        //Animate prev and next covers
                        var row = _this3.wh * 0.4;

                        tl.staggerTo(_this3.prevCases, _this3.speed, { cycle: {
                                y: function y(i) {
                                    if (i >= 2) return;

                                    var offset = _this3.prevCases[i].getBoundingClientRect().top;
                                    return -row * (i + 1) - offset;
                                }
                            }, ease: _this3.ease }, 0, 0);

                        tl.staggerTo(_this3.nextCases, _this3.speed, { cycle: {
                                y: function y(i) {
                                    if (i >= 2) return;

                                    var offset = _this3.wh - _this3.nextCases[i].getBoundingClientRect().top;
                                    return row * i + offset;
                                }
                            }, ease: _this3.ease }, 0, 0);

                        //animate current cover
                        tl.to('.caseAnimation', _this3.speed, { y: 0, ease: _this3.ease }, 0);
                        tl.to('.caseAnimation__inner', _this3.speed, { y: 0, ease: _this3.ease }, 0);
                        tl.to('.caseAnimation__img', _this3.speed, { y: 0, scale: 1, x: 0, xPercent: center, ease: _this3.ease }, 0);
                        tl.to('.caseAnimation .work-details', _this3.speed, { y: -_this3.wh * 0.36, ease: _this3.ease }, 0);
                    })();
                }

                //to About or Contact
            } else {

                    this.switchArrows('kill');
                    tl.to(this.page, .1, { autoAlpha: 0 });
                }

            tl.restart();
        }
    }, {
        key  : 'mapRange',
        value: function mapRange(from, to, s) {
            return to[0] + (s - from[0]) * (to[1] - to[0]) / (from[1] - from[0]);
        }
    }, {
        key  : 'resize',
        value: function resize(width, height) {
            var _this4 = this;

            var view = this;

            this.ww = window.innerWidth;
            this.wh = window.innerHeight;

            _get(Object.getPrototypeOf(Home.prototype), 'resize', this).call(this, width, height);

            this.scaleThumbs();

            for (var i = 0; i < this.ui.details.length; i++) {
                var detail         = this.ui.details[i];
                var title          = detail.querySelector('h1');
                var excerpt_height = detail.querySelector('.work-details__excerpt').clientHeight;
                (0, _domCss2['default'])(title, { 'transform': 'translateY(' + excerpt_height + 'px)' });
            }

            // section should be divisible by 3
            var wwMod        = this.ww % 3;
            var sectionWidth = (wwMod == 0 ? this.ww : this.ww + (3 - wwMod)) + "px";  // round to nearest 3

            if (_utils2['default'].js.crossBorder(640) === 'under') {
                this.smooth && (this.smooth.destroy(), this.smooth = null);
                this.page.querySelector('.section').style[this.prefix] = 'translate3d(0,0,0)';
                TweenMax.set('.item-bg', { clearProps: 'transform' });
                this.page.querySelector('.section').style.width = '100%';
            }
            if (_utils2['default'].js.crossBorder(640) === 'over') {
                TweenMax.set('.work-thumbs__inner', { clearProps: 'transform' });

                if (!this.smooth) this.initSmooth();
            }

            if (this.ww >= 560) {
                var scale = this.ww >= 1024 ? 0.8 : 0.667;
                TweenMax.staggerTo(this.ui.bg, 0, { cycle: {
                        x: function x(i) {
                            var center = _this4.ui.bg[i].getAttribute('data-centerset') * -1;
                            return view.ww * scale / 100 * center;
                        }
                    }, ease: this.ease }, 0, 0);

                this.page.querySelector('.section').style.width = sectionWidth;
            }
        }
    }, {
        key  : 'destroy',
        value: function destroy(req, done) {
            var _this5 = this;

            _domClasses2['default'].remove(_config2['default'].$body, 'overflow-hidden');
            this.removeEvents();

            this.ui = null;

            TweenLite.to(this.page, 0.1, { autoAlpha: 0, onComplete: function onComplete() {
                    _this5.view.removeChild(_this5.page);
                    done();
                } });
        }
    }]);

    return Home;
})(_default2['default']);

exports['default']     = Home;
        module.exports = exports['default'];