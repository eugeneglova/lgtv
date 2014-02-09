/*global define*/

define([
    'backbone',
    './video'
], function (Backbone, VideoView) {
    'use strict';

    var VideosView = Backbone.View.extend({

        tagName: 'ul',

        className: 'videos',

        // Reference to the videos collection
        videos: null,

        views: null,

        initialize: function() {
            this.views = {};

            return this;
        },

        setVideos: function(videos) {
            this.videos = videos;

            return true;
        },

        render: function() {
            this.videos.forEach(function(video) {
                var view = new VideoView({
                    model:  video,
                    parent: this
                });

                this.views[video.id] = view;

                view.render();

                this.$el.append(view.$el);
            }, this);

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

    return VideosView;
});
