/*global define*/

define([
    'backbone',
    './views/video'
], function (Backbone, VideoView) {
    'use strict';

    var Video = Backbone.UIController.extend({

        namespace: 'ui:video',

        listeners: {
            ':open':            'onOpen',
            'ui:player:open':   'remove'
        },

        el: null,

        views: null,

        is_rendered: null,

        video: null,

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

        isRendered: function() {
            return !!this.is_rendered;
        },

        onDataStateGetVideoId: function(video_id) {
            this.request('data:videos:getVideoById', video_id, this.onDataVideosGetVideoById, this);
        },

        onDataVideosGetVideoById: function(video) {
            this.video = video;

            if (!this.video) return false;

            this.views.video.setVideo(this.video);

            this.render();

            return true;
        },

        listenToEvents: function() {
            this.listenTo(this.views.video, 'video:play', this.requestCallback('ui:player:open'), this);
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
