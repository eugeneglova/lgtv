/*global define*/

define([
    'backbone'
], function (Backbone) {
    'use strict';

    var StateModel = Backbone.Model.extend({
        defaults: {
            'video-id':         null,
            'player-element':   null
        }
    });

    return StateModel;
});
