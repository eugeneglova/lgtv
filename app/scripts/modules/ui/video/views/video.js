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

        initialize: function() {
            this.views = {};

            return this;
        },

        setVideo: function(video) {
            this.video = video;

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
