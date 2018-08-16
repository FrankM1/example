'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});

var config = require('./config');
var utils = require('./utils');
var domCreateElement = require('dom-create-element');
var domClasses = require('dom-classes');
var queryDomComponents = require('query-dom-components');
var pleaseAjax = require('please-ajax');
var componentsLogo = require('./components/logo');
var componentsMenu = require('./components/menu');
var componentsSvg = require('./components/svg');
var underscore = require('underscore');

TweenLite.defaultEase = Expo.easeOut;

var Preloader = {

    init: function (req, done) {

        this.detect();
        this.view = config.$view;
        this.slug = 'preloader';
        this.el = null;
        this.menu = null;
        this.svg = null;
        this.pos = { x: 0, y: 0 };
        this.template = config.PATH + config.BASE + 'templates/components/' + this.slug + '.html';
        this.preloaded = onComplete;

        var self = this;

        this.svg = new componentsSvg();
        this.menu = new componentsMenu();

        this.createDOM();

        console.log(this.template);

        pleaseAjax.get(this.template, {

            success: function success(object) {
                self.el.innerHTML = object.data;
                self.dataAdded();
                done();
            }
        });
    },

    detect: function () {

        this.isMobile = config.isMobile = config.width >= 769 ? false : true;
        // this.isMobile && classes.add(config.$body, 'is-mobile');

        config.UA = navigator.userAgent;

        !this.isMobile && domClasses.add(config.$body, 'has-vh-units');
    },

    createDOM: function () {

        var page = this.view.firstChild;
        console.log(page);

        this.el = domCreateElement({
            selector: 'div',
            styles: 'preloader'
        });

        this.view.insertBefore(this.el, page);
    },

    dataAdded: function () {

        this.split = new SplitText(this.el.querySelector('h1'), { type: 'lines, words, chars' });
        this.split.chars.forEach(function (char) {
            return char.innerHTML = '<div class="js-letter">' + char.innerHTML + '</div>';
        });

        this.ui = queryDomComponents({ el: this.el });
    },

    resize: function (width, height) {
    },

    animateIn: function (req, done) {
        var tl = new TimelineMax({ paused: true, onComplete: done });
        tl.to(this.ui.logo, 2, { opacity: 1 }, 0.1);
        tl.staggerTo(this.ui.letter, 1.1, { y: '0%', ease: Expo.easeOut }, 0.01, 0);
        tl.add(this.preloaded, 2);
        tl.restart();

        this.isMobile && componentsLogo.animateIn();
    },

    animateOut : function (req, done) {
        var images = window.$('.work-thumbs__inner');
        var l = images.length;
        var render = underscore.after(l, done);

        if (images.length > 0) {
            for (var i = 0; i < l; i++) {
                utils.js.loadImg(images[i].getAttribute('data-src'), render);
            }
        } else {
            done();
        }
    },

    destroy: function (req, done) {
        var self = this;

        this.menu.showDOM();

        var tl = new TimelineMax({
            paused: true, onComplete: function onComplete() {
                domClasses.add(config.$body, 'preloaded');
                self.view.removeChild(self.el);
                done();
            }
        });

        tl.staggerTo(this.ui.letter, 1.5, { x: '100%', ease: Power4.easeInOut, clearProps: 'all' }, -0.005, 0);
        tl.staggerTo(this.ui.bg, 1.1, { x: '101%', ease: Power4.easeInOut }, 0.08, .6);

        if(window.innerWidth >= 640) {
            tl.to(this.ui.logo, 1.1, { x: -window.innerWidth / 3, ease: Power4.easeInOut }, .6);
        } else {
            tl.to(this.ui.logo, 1.1, { opacity: 0 }, 0.5);
        }
    
        tl.restart();

}
};

module.exports = Preloader;
