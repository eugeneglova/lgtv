/*global define*/

define([
    'backbone',
    './views/controls'
], function (Backbone, ControlsView) {
    'use strict';

    var Controls = Backbone.UIController.extend({

        namespace: 'ui:controls',

        listeners: {
            ':open':                            'render',
            ':close':                           'remove',
            'data:state:changed:player-element': 'onPlayerElementChanged'
        },

        el: null,

        views: null,

        is_rendered: null,

        timeout_id: null,

        initialize: function() {
            this.el = $('body');

            this.views = {};

            this.views.controls = new ControlsView();

            return this;
        },

        isRendered: function() {
            return !!this.is_rendered;
        },

        onPlayerElementChanged: function(player) {
            this.request('data:state:get', 'player-element', this.views.controls.setPlayerElement.bind(this.views.controls));
        },

        listenToEvents: function() {
            this.listenTo(this.views.controls, 'rewind', this.requestCallback('ui:player:rewind'), this);
            this.listenTo(this.views.controls, 'play', this.requestCallback('ui:player:play'), this);
            this.listenTo(this.views.controls, 'pause', this.requestCallback('ui:player:pause'), this);
            this.listenTo(this.views.controls, 'forward', this.requestCallback('ui:player:forward'), this);
            this.listenTo(this.views.controls, 'clear-timeout', this.clearTimeout, this);

            return true;
        },

        render: function() {
            if (this.isRendered()) return false;

            this.listenToEvents();

            this.views.controls.render();

            this.el.append(this.views.controls.$el);

            this.is_rendered = true;

            this.clearTimeout();

            return this;
        },

        clearTimeout: function() {
            clearTimeout(this.timeout_id);

            this.timeout_id = setTimeout(function() {
                this.remove();
            }.bind(this), 5000);

            return true;
        },

        remove: function() {
            if (!this.isRendered()) return false;

            this.stopListening();

            Object.keys(this.views).forEach(function(key) {
                this.views[key].remove();
            }, this);

            this.is_rendered = false;

            return true;
        }

    });

    return Controls;
});
