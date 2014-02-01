/*global define*/

define([
    'components/data-remote-collection/collections/remote',
    '../models/video'
], function (RemoteCollection, VideoModel) {
    'use strict';

    var RemoteVideosCollection = RemoteCollection.extend({

        model: VideoModel,

        url: 'api/v1/videos'

    });

    return RemoteVideosCollection;
});
