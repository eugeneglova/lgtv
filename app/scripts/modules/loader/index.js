/*global define*/

define([
    'backbone',

    // Service

    // UI
    'modules/ui/video/index',
    'modules/ui/controls/index',

    // Data
    'modules/data/state/index',
    'modules/data/videos/index'
], function (
    Backbone,

    // Service

    // UI
    Video,
    Controls,

    // Data
    DataState,
    DataVideos
) {
    'use strict';

    var Loader = Backbone.Controller.extend({

        namespace: 'app:loader',

        // Reference to module definitions
        definitions: null,

        // Reference to loaded modules
        modules: null,

        data_loaded_count: 0,

        initialize: function() {
            this.definitions = {};

            this.definitions.service = {
            };

            this.definitions.ui = {
                video:      Video,
                controls:   Controls
            };

            this.definitions.data = {
                state:  DataState,
                videos: DataVideos
            };

            this.modules            = {};
            this.modules.service    = {};
            this.modules.ui         = {};
            this.modules.data       = {};

            // Listen to ready event of each data module
            Object.keys(this.definitions.data).forEach(function(module) {
                this.listenToOnce(this.mediator, this.definitions.data[module].prototype.namespace + ':ready', this.onDataModuleReady, this);
            }, this);

            // Load all modules
            this.load();

            return this;
        },


        /**
         * Loads modules by its type
         * @param  {string} type can be service, ui or data
         * @return {boolean}
         */
        loadByType: function(type) {
            Object.keys(this.definitions[type]).forEach(function(module) {
                this.modules[type][module] = new this.definitions[type][module]();
            }, this);

            return true;
        },


        /**
         * Loads all modules
         * @return {boolean}
         */
        load: function() {
            this.loadByType('service');

            this.loadByType('ui');

            this.loadByType('data');

            return true;
        },


        /**
         * Callback on each data module ready state
         * to announce event about all async data modules are loaded
         * @return {boolean}
         */
        onDataModuleReady: function() {
            this.data_loaded_count += 1;

            if (Object.keys(this.definitions.data).length === this.data_loaded_count) {
                // Move ready event to the end of event loop
                setTimeout(function() {
                    this.announce('ready');
                }.bind(this), 0);
            }

            return true;
        }

    });

    return Loader;
});
