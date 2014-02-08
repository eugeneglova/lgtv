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

        events: {
            'click':    'onClick'
        },

        setVideo: function(video) {
            this.video = video;

            return true;
        },

        onClick: function() {
            this.trigger('video:play');

            return true;
        },

        render: function() {
            this.$el.html(this.template(this.video.toJSON()));

            return this;
        }

    });

    return VideoView;
});
