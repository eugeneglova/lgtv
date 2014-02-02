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
                version:            version,
                type:               type,
                data:               data,
                width:              width,
                height:             height,
                playTime:           playTime,
                playPosition:       playPosition,
                playState:          playState,
                error:              error,
                autoStart:          autoStart,
                isScannable:        isScannable,
                speed:              speed,
                bufferingProgress:  bufferingProgress,
                subtitleOn:         subtitleOn,
                subtitle:           subtitle,
                mode3D:             mode3D,
                audioLanguage:      audioLanguage
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
