/*global define*/

define([
    'backbone'
], function (Backbone) {
    'use strict';

    var VideoUrlModel = Backbone.Model.extend({

        url: function() {
            return 'api/v1/videos/' + this.id + '/url';
        }

    });

    return VideoUrlModel;
});
