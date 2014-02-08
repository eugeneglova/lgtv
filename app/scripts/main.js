/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        'backbone-original': {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }
    },
    // hbs plugin settings, listing here just as a reference
    hbs : {
        // if disableI18n is `true` it won't load locales and the i18n helper
        // won't work as well.
        disableI18n : true
    },
    paths: {
        jquery:                 '../bower_components/jquery/jquery',
        'backbone-original':    '../bower_components/backbone/backbone',
        backbone:               'core/backbone',
        underscore:             '../bower_components/underscore/underscore',
        // require-handlebars-plugin setup
        'handlebars':           '../bower_components/require-handlebars-plugin/Handlebars',
        'hbs':                  '../bower_components/require-handlebars-plugin/hbs',
        'i18nprecompile':       '../bower_components/require-handlebars-plugin/hbs/i18nprecompile',
        'json2':                '../bower_components/require-handlebars-plugin/hbs/json2'
    },
    urlArgs: 'bust=' +  (new Date()).getTime()
});

require([
    'core/app',
    'core/mediator'
], function (App, mediator) {
    window.app = new App();
    mediator.on('app:loader:ready', function() {
        mediator.trigger('data:state:set', 'video-id', 'i109uoOHk3tDAFgJNvjxx6');
        mediator.trigger('ui:video:open');
    })
});
