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

        media_play_info: null,

        events: {
            'click .rewind':    'onRewind',
            'click .play':      'onPlay',
            'click .pause':     'onPause',
            'click .forward':   'onForward'
        },

        setMediaPlayInfo: function(media_play_info) {
            this.media_play_info = media_play_info;
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

            this.$el.html(this.template(this.media_play_info));

            return this;
        }

    });

    return ControlsView;
});
