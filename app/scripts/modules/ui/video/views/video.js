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

        mouse_move_timeout_id: null,

        events: {
            'mousemove':    'onMouseMove'
        },

        initialize: function() {
            this.openControls = _.throttle(this.openControls, 1000);

            return this;
        },

        setVideo: function(video) {
            this.video = video;

            return true;
        },

        rewind: function() {
            var video = this.$("#video").get(0);

            video.seek(video.playPosition - 60000);
        },

        play: function() {
            this.$("#video").get(0).play(1);
        },

        pause: function() {
            this.$("#video").get(0).play(0);
        },

        forward: function() {
            var video = this.$("#video").get(0);

            video.seek(video.playPosition + 60000);
        },

        openControls: function() {
            var video = this.$("#video").get(0);

            this.trigger('controls:open', {
                version:            video.version,
                type:               video.type,
                data:               video.data,
                width:              video.width,
                height:             video.height,
                playTime:           video.playTime,
                playPosition:       video.playPosition,
                playState:          video.playState,
                error:              video.error,
                autoStart:          video.autoStart,
                isScannable:        video.isScannable,
                speed:              video.speed,
                bufferingProgress:  video.bufferingProgress,
                subtitleOn:         video.subtitleOn,
                subtitle:           video.subtitle,
                mode3D:             video.mode3D,
                audioLanguage:      video.audioLanguage
            });

            this.mouse_move_timeout_id = setTimeout(function() {
                this.trigger('controls:close');
            }.bind(this), 5000);

            return true;
        },

        onMouseMove: function() {
            clearTimeout(this.mouse_move_timeout_id);

            this.openControls();

            return true;
        },

        render: function() {
            this.$el.html(this.template(this.video.toJSON()));

            return this;
        }

    });

    return VideoView;
});
