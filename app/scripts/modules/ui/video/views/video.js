/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'hbs!../templates/video',
], function ($, _, Backbone, VideoTemplate) {
    'use strict';

    var VideoView = Backbone.View.extend({

        template: VideoTemplate,

        // Reference to the video model
        video: null,

        interval: null,

        events: {
            'mousemove':    'onMouseMove'
        },

        initialize: function() {
            this.openControls = _.throttle(this.openControls, 500);

            return this;
        },

        setVideo: function(video) {
            this.video = video;

            return true;
        },

        rewind: function() {
            var video = this.getVideoElement();

            video.seek(video.playPosition - 60000);
        },

        play: function() {
            this.getVideoElement().play(1);
        },

        pause: function() {
            this.getVideoElement().play(0);
        },

        forward: function() {
            var video = this.getVideoElement();

            video.seek(video.playPosition + 60000);
        },

        openControls: function() {
            this.trigger('controls:open');

            return true;
        },

        onMouseMove: function() {
            this.openControls();

            return true;
        },

        getVideoElement: function() {
            return this.$("#video").get(0);
        },

        render: function() {
            this.$el.html(this.template(this.video.toJSON()));

            return this;
        }

    });

    return VideoView;
});
