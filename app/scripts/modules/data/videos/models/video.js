/*global define*/

define([
    'backbone'
], function (Backbone) {
    'use strict';

    var VideoModel = Backbone.Model.extend({

        urlRoot: 'api/v1/videos'

    });

    return VideoModel;
});
