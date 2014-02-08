/*global define*/

define([
    'components/data-remote-collection/index',
    './collections/remote-videos'
], function (DataRemoteCollection, RemoteVideos) {
    'use strict';

    var Videos = DataRemoteCollection.extend({

        namespace: 'data:videos',

        listeners: _.extend({}, DataRemoteCollection.prototype.listeners, {
            ':getVideoById': 'onGetVideoById'
        }),

        remote_collection_constructor: RemoteVideos,

        onGetVideoById: function(video_id, callback, context) {
            var video = this.collections.remote.get(video_id);

            callback.call(context, video);

            return true;
        }

    });

    return Videos;
});
