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

        views: null,

        mouse_move_timeout_id: null,

        events: {
            'mousemove':    'onMouseMove'
        },

        initialize: function() {
            this.views = {};

            return this;
        },

        setVideo: function(video) {
            this.video = video;

            return true;
        },

        play: function() {
            this.$("#video").get(0).play(1);
        },

        pause: function() {
            this.$("#video").get(0).play(0);
        },

        onMouseMove: function() {
            this.trigger('controls:open');

            clearTimeout(this.mouse_move_timeout_id);

            this.mouse_move_timeout_id = setTimeout(function() {
                this.trigger('controls:close');
            }.bind(this), 5000);

            return true;
        },

        render: function() {
            this.$el.html(this.template(this.video.toJSON()));

            return this;
        },

        remove: function() {
            Object.keys(this.views).forEach(function(key) {
                this.views[key].remove();
                delete this.views[key];
            }, this);

            Backbone.View.prototype.remove.apply(this, arguments);

            return true;
        }

    });

    return VideoView;
});
