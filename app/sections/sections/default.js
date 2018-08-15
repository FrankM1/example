
var config = require('../config');
var utils = require('../utils');
var componentsLogo = require('../components/logo');

var domClasses = require('dom-classes');
var domEvents = require('dom-events');
var domSelect = require('dom-select');
var jquery = require('jquery');


function Default(opt) {
    opt = opt || {};

    this.isMobile = config.isMobile;

    this.view = config.$view;
    this.page = null;
    this.darkBackground = false;
}

Default.prototype = {
    init: function(req, done) {
        var view = this.view;
        
        this.page = window.prevRoute ? utils.biggie.loadHTML(req, view, this.dataAdded.bind(this, done)) : (0, domSelect)('#js-page-' + this.slug);

        if (!window.prevRoute) {
            domClasses.remove(this.page, 'is-hidden');
            this.dataAdded(done);
        }
    },

    dataAdded: function () {

        utils.js.sliceArray(domSelect.all('a', this.page)).forEach(function (el) {

            domEvents.on(el, 'click', function (e) {
                if (domClasses.has(e.currentTarget, 'no-route')) return;
                e.preventDefault();
                var href = e.currentTarget.getAttribute('href');
                app.go(href);
            });
        });

        componentsLogo.setDarkBackground(this.darkBackground);

        // $('body.scroll-lock').on('scroll', function(e) {
        //     e.preventDefault();
        // })
    },
    
    resize: function(width, height) {
      
        config.height = height;
        config.width = width;

        if (window.device.indexOf('is-desktop') > -1) {
            if (width < 640) {
                domClasses.add(config.$html, 'is-phone');
                domClasses.remove(config.$html, 'is-tablet');
            } else {
                domClasses.remove(config.$html, 'is-phone');
                domClasses.remove(config.$html, 'is-tablet');
            }

            config.isMobile = (0, jquery)('html').hasClass('is-phone');
            config.isTablet = (0, jquery)('html').hasClass('is-tablet');
        }
    },

    animateIn: function(req, done) {
      // In animateIn:
      // 
      // 1. animate in your content which was defined in init. 
      //    eg. change the opacity of your dom elements to 1

      done();
    },

    animateOut: function(req, done) {
      // In animateOut:
      // 
      // 1. animate out your content which was defined in init. 
      //    eg. change the opacity of your dom elements to 0

      done();
    },

    destroy: function(req, done) {
      // In destroy:
      // 
      // 1. destroy the content which was created in init. 
      //    eg. remove dom elements from the dom

      done();
    }
};

module.exports = Default;
