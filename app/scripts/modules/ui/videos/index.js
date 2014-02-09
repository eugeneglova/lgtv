/*global define*/

define([
    'backbone',
    './views/videos'
], function (Backbone, VideosView) {
    'use strict';

    var Videos = Backbone.UIController.extend({

        namespace: 'ui:videos',

        listeners: {
            ':open':    'onOpen'
        },

        el: null,

        views: null,

        is_rendered: null,

        // Reference to the videos collection
        videos: null,

        initialize: function() {
            this.el = $('body');

            this.views = {};

            this.views.videos = new VideosView();

            return this;
        },

        onOpen: function() {
            this.remove();

            this.request('data:videos:get', this.onDataVideosGet, this);

            return true;
        },

        isRendered: function() {
            return !!this.is_rendered;
        },

        onDataVideosGet: function(videos) {
            this.videos = videos;

            this.views.videos.setVideos(this.videos);

            this.render();

            return true;
        },

        listenToEvents: function() {
            this.listenTo(this.views.videos, 'open', this.onVideoOpen, this);
            this.listenTo(this.views.videos, 'play', this.onVideoPlay, this);

            return true;
        },

        setVideoId: function(video_id) {
            this.request('data:state:set', 'video-id', video_id);

            return true;
        },

        onVideoOpen: function(video_id) {
            this.setVideoId(video_id);

            this.request('ui:video:open');

            this.remove();

            return true;
        },

        onVideoPlay: function(video_id) {
            this.setVideoId(video_id);

            this.request('ui:player:open');

            this.remove();

            return true;
        },

        render: function() {
            this.listenToEvents();

            this.views.videos.render();

            this.el.append(this.views.videos.$el);

            this.is_rendered = true;

            return this;
        },

        remove: function() {
            if (!this.isRendered()) return false;

            Object.keys(this.views).forEach(function(key) {
                this.views[key].remove();
            }, this);

            this.is_rendered = false;

            return true;
        }

    });

    return Videos;
});
