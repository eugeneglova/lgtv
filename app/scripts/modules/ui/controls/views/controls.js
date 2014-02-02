/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'moment',
    'hbs!../templates/controls',
], function ($, _, Backbone, moment, ControlsTemplate) {
    'use strict';

    var ControlsView = Backbone.View.extend({

        className: 'controls',

        template: ControlsTemplate,

        video_info: null,

        events: {
            'click .rewind':    'onRewind',
            'click .play':      'onPlay',
            'click .pause':     'onPause',
            'click .forward':   'onForward'
        },

        setVideoInfo: function(video_info) {
            this.video_info = video_info;
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

            this.$el.html(this.template(_.extend({}, this.video_info, {
                position: moment.utc(this.video_info.playPosition).format('HH:mm:ss'),
                duration: moment.utc(this.video_info.playTime).format('HH:mm:ss')
            })));

            return this;
        }

    });

    return ControlsView;
});
