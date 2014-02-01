/*global define*/

define([
    'components/data-remote-collection/index',
    './collections/remote-videos'
], function (DataRemoteCollection, RemoteVideos) {
    'use strict';

    var Videos = DataRemoteCollection.extend({

        namespace: 'data:videos',

        remote_collection_constructor: RemoteVideos

    });

    return Videos;
});
