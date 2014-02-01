/*global define*/

define([
    'backbone',
    './models/state'
], function (Backbone, StateModel) {
    'use strict';

    var State = Backbone.Controller.extend({

        namespace: 'data:state',

        // Reference to the state model
        model: null,

        listeners: {
            ':get': 'onGet',
            ':set': 'onSet'
        },

        initialize: function() {
            // Initialize state model
            this.model = new StateModel();

            this.announce('ready');

            return this;
        },

        onGet: function(key, callback, context) {
            callback.call(context, this.get(key));

            return true;
        },

        onSet: function(key, value, options) {
            this.set(key, value, options);

            return true;
        },

        get: function(key) {
            return this.model.get(key);
        },

        set: function(key, value, options) {
            options = options || {};

            this.model.set(key, value);

            if (!options.silent) {
                this.announce('changed:' + key);
            }

            return true;
        }

    });

    return State;
});
