/*global define*/

define([
    'backbone',
    './collections/videos',
    './models/video',
    './models/video-url'
], function (Backbone, VideoCollection, VideoModel, VideoUrlModel) {
    'use strict';

    var Videos = Backbone.Controller.extend({

        namespace: 'data:videos',

        listeners: {
            ':get':             'onGet',
            ':getVideoById':    'onGetVideoById',
            ':getVideoUrlById': 'onGetVideoUrlById'
        },

        initialize: function() {
            this.announce('ready');

            return this;
        },

        onGet: function(callback, context) {
            var videos = new VideoCollection();

            videos.fetch().then(function() {
                callback.call(context, videos.clone());
            });

            return true;
        },

        onGetVideoById: function(video_id, callback, context) {
            var video = new VideoModel({
                id: video_id
            });

            video.fetch().then(function() {
                callback.call(context, video.clone());
            });

            return true;
        },

        onGetVideoUrlById: function(video_id, callback, context) {
            var video_url = new VideoUrlModel({
                id: video_id
            });

            video_url.fetch().then(function() {
                callback.call(context, video_url.clone());
            });

            return true;
        }

    });

    return Videos;
});
