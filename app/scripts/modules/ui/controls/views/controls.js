/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'hbs!../templates/controls',
], function ($, _, Backbone, ControlsTemplate) {
    'use strict';

    var ControlsView = Backbone.View.extend({

        className: 'controls',

        template: ControlsTemplate,

        events: {
            'click .rewind':    'onRewind',
            'click .play':      'onPlay',
            'click .pause':     'onPause',
            'click .forward':   'onForward'
        },

        onRewind: function() {
            this.trigger('rewind');

            return true;
        },

        onPlay: function() {
            this.trigger('play');

            return true;
        },

        onPause: function() {
            this.trigger('pause');

            return true;
        },

        onForward: function() {
            this.trigger('forward');

            return true;
        },

        render: function() {
            this.delegateEvents();

            this.$el.html(this.template());

            return this;
        }

    });

    return ControlsView;
});
