/*global define*/

define([
    'backbone',
    './views/video'
], function (Backbone, VideoView) {
    'use strict';

    var Video = Backbone.UIController.extend({

        namespace: 'ui:video',

        listeners: {
            ':open':                'onOpen',
            ':rewind':              'onRewind',
            ':play':                'onPlay',
            ':pause':               'onPause',
            ':forward':             'onForward',
            'data:videos:ready':    'onDataVideosReady'
        },

        el: null,

        views: null,

        is_rendered: null,

        video: null,

        // Reference to the videos collection
        videos: null,

        initialize: function() {
            this.el = $('body');

            this.views = {};

            this.views.video = new VideoView();

            return this;
        },

        onOpen: function() {
            this.remove();

            this.request('data:state:get', 'video-id', this.onDataStateGetVideoId, this);

            return true;
        },

        onRewind: function() {
            this.views.video.rewind();

            return true;
        },

        onPlay: function() {
            this.views.video.play();

            return true;
        },

        onPause: function() {
            this.views.video.pause();

            return true;
        },

        onForward: function() {
            this.views.video.forward();

            return true;
        },

        isRendered: function() {
            return !!this.is_rendered;
        },

        onDataVideosReady: function() {
            this.request('data:videos:get', this.onDataVideosGet, this);

            return true;
        },

        onDataVideosGet: function(videos) {
            this.videos = videos;

            return true;
        },

        onDataStateGetVideoId: function(video_id) {
            this.video = this.videos.get(video_id);

            if (!this.video) return false;

            this.views.video.setVideo(this.video);

            // this.video.fetch().then(this.render.bind(this));
            this.render();

            return true;
        },

        listenToEvents: function() {
            this.listenTo(this.views.video, 'controls:open', this.requestCallback('ui:controls:open'), this);
            this.listenTo(this.views.video, 'controls:close', this.requestCallback('ui:controls:close'), this);
        },

        render: function() {
            this.listenToEvents();

            this.views.video.render();

            this.el.append(this.views.video.$el);

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

    return Video;
});
