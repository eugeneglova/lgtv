/*global define*/

define([
    'backbone',
    '../models/video'
], function (Backbone, VideoModel) {
    'use strict';

    var VideosCollection = Backbone.Collection.extend({

        model: VideoModel,

        url: 'api/v1/videos'

    });

    return VideosCollection;
});
